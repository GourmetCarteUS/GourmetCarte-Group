import axios, { AxiosInstance } from 'axios';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { existsSync, writeFile } from 'fs';
import FormData from 'form-data';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ACCESS_TOKEN_FILE: string = join(__dirname, '_access_token_miniprogram.json');
const SESSION_KEY_FILE: string = join(__dirname, '_session_key_miniprogram.json');

interface BaseOptions {
    appId: string;
    appSecret: string;
    baseURL?: string;
    timeout?: number;
    debug?: boolean;
}

interface TokenObj {
    access_token?: string;
    _time?: number;
    expire_in?: number;
}

interface SessionKeyObj {
    [key: string]: string;
}

/**
 * 基础类
 * @constructor
 */
export default class Base {
    public appId: string;
    public appSecret: string;
    public baseURL: string;
    public axios: AxiosInstance;
    public debug: boolean;
    public tokenObj: TokenObj;
    public sessionKeyObj: SessionKeyObj;

    /**
     * 创建
     * @param {object} options
     * @param {string} options.appId 微信小程序的 appId
     * @param {string} options.appSecret 微信小程序的 appSecret
     * @param {string} options.baseURL 请求的基地址
     * @param {string} options.timeout 请求的超时时间，默认为 40 秒
     *
     * @param {string} options.debug 是否输出请求日志，供内部开发调试使用
     *
     * 请求基地址默认为 `https://api.weixin.qq.com`，会指向就近路口
     * 通常情况下不需要修改该参数
     * 在该服务器不稳定的时候，可以切换到 `https://api2.weixin.qq.com` 备用服务器
     */
    constructor({ appId, appSecret, baseURL = 'https://api.weixin.qq.com', timeout = 40000, debug = false }: BaseOptions) {
        this.appId = appId;
        this.appSecret = appSecret;
        this.baseURL = baseURL;

        this.axios = axios.create({ baseURL, timeout });

        this.debug = debug;

        this.tokenObj = {};
        this.sessionKeyObj = {};

        this.init();
    }

    public init(): void {
        // 从缓存文件中加载 token 和 session 信息，模拟中继服务器
        // 可以修改为采用 redis 或者 mongodb 等方式
        if (existsSync(ACCESS_TOKEN_FILE)) {
            this.tokenObj = createRequire(ACCESS_TOKEN_FILE) as TokenObj;
        }

        if (existsSync(SESSION_KEY_FILE)) {
            this.sessionKeyObj = createRequire(SESSION_KEY_FILE) as unknown as SessionKeyObj;
        }
    }

    public log(...args: any[]): void {
        if (this.debug) console.log.apply(null, args);
    }

    /**
     * 文件上传方法
     *
     * @param {object} options 传递给 request 方法的参数
     *
     * 本方法将会对 options.data 进行劫持并转换为表单方式进行提交
     */
    public _upload(options: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            for (let key in options.data) {
                const value = options.data[key];
                if (value && value.hasOwnProperty('value') && value.hasOwnProperty('options')) {
                    form.append(key, value.value, value.options);
                } else {
                    form.append(key, value);
                }
            }

            const headers = {
                'content-type': 'application/x-www-form-urlencoded',
            };

            Object.assign(headers, form.getHeaders());

            form.getLength((err, length) => {
                if (err) {
                    reject(err);
                } else {
                    if (!isNaN(length)) {
                        headers['content-length'] = length;
                    }
                    options.data = form;
                    options.headers = headers;
                    this.request(options)
                        .then((res) => {
                            resolve(res);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                }
            });
        });
    }

    /**
     * 发送请求
     * 不带 access_token，内部使用
     * @param {*} options
     */
    public _request(options: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.axios(options)
                .then((response) => {
                    const res = { ...response.data };

                    if (+res.errcode) {
                        reject(res);
                    } else {
                        resolve(res);
                    }
                    this.log('then', response);
                })
                .catch((error) => {
                    reject(error);
                    this.log('catch', error);
                });
        });
    }

    /**
     * 发送请求
     * 带有 access_token
     * @param {*} options
     */
    public request(options: any): Promise<any> {
        if (!options.method) {
            options.method = 'post';
        }

        return new Promise((resolve, reject) => {
            this.getAccessToken()
                .then(({ access_token }) => {
                    if (options.params) {
                        options.params.access_token = access_token;
                    } else {
                        options.params = { access_token };
                    }
                    this._request(options)
                        .then((res) => {
                            resolve(res);
                        })
                        .catch((error2) => {
                            reject(error2);
                        });
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /**
     * 获取 accessToken
     */
    public getAccessToken(): Promise<TokenObj> {
        // 如果缓存中有有效 token，则直接获取并返回
        if (this.tokenObj.access_token && Date.now() - this.tokenObj._time <= (this.tokenObj.expire_in || 7200) * 1000 - 5000) {
            return Promise.resolve(this.tokenObj);
        }

        return new Promise((resolve, reject) => {
            this._request({
                url: '/cgi-bin/token',
                params: {
                    grant_type: 'client_credential',
                    appid: this.appId,
                    secret: this.appSecret,
                },
            })
                .then((data) => {
                    // 获取 access_token 之后更新缓存
                    data._time = Date.now();
                    this.tokenObj = data;
                    writeFile(ACCESS_TOKEN_FILE, JSON.stringify(data), () => {});
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /**
     * 登录凭证校验
     * @param {String} code 登录时获取的 code
     */
    public code2Session(code: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._request({
                url: `/sns/jscode2session`,
                params: {
                    appid: this.appId,
                    secret: this.appSecret,
                    js_code: code,
                    grant_type: 'authorization_code',
                },
            })
                .then((data) => {
                    // 存入缓存
                    this.sessionKeyObj[data.openid] = data.session_key;
                    writeFile(SESSION_KEY_FILE, JSON.stringify(this.sessionKeyObj), () => {});
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}
