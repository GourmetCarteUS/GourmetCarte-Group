import { defineStore } from 'pinia';
import useTokenStorage from '@/storage/token';
import { IUser, LOCATIONS, LocationUtils } from 'group-common';
import { user_info } from '@/api/user-info/user-info';
import { toast } from '@/utils/uniapi/prompt';

export const useUserInfoStore = defineStore('user-info', {
    state: () => ({
        user: undefined as IUser | undefined,
        location: null as {
            latitude: number;
            longitude: number;
        } | null,
        currentCity: '',
    }),
    actions: {
        async initUserInfo() {
            if (!this.user && useTokenStorage.getToken()) {
                try {
                    await this.getUserInfo();
                } catch (e) {
                    this.logout();
                    return false;
                }
                return true;
            }
            return true;
        },
        async getUserInfo() {
            if (this.user?.id) return this.user;
            try {
                const { data } = await user_info();
                if (data?.success) {
                    const userInfo = data.data;
                    this.user = userInfo;
                    return userInfo;
                }
            } catch (e) {
                // this.logout()
                return false;
            }
        },
        async updateUserInfo() {
            const { data } = await user_info();
            if (data?.success) {
                const userInfo = data.data;
                this.user = userInfo;
                return userInfo;
            }
        },
        removeUserInfo() {
            this.user = undefined;
        },
        logout() {
            this.removeUserInfo();
            useTokenStorage.removeToken();
        },
        async getLocation(): Promise<{
            location?: {
                latitude: number;
                longitude: number;
            };
            currentCity: string;
        }> {
            let that = this;
            if (this.location) {
                return new Promise((resolve) => {
                    resolve({
                        location: this.location!,
                        currentCity: this.currentCity,
                    });
                });
            }
            return await new Promise((resolve, reject) => {
                uni.getFuzzyLocation({
                    type: 'gcj02',
                    success(res) {
                        const location = {
                            latitude: res.latitude,
                            longitude: res.longitude,
                        };
                        let currentCity = '';
                        LOCATIONS.map((item) => {
                            if (LocationUtils.isWithin([location.longitude, location.latitude], item.location, 10000)) {
                                that.currentCity = item.name;
                                currentCity = item.name;
                            }
                        });
                        that.location = location;
                        resolve({ location, currentCity });
                    },
                    fail(err) {
                        console.log(err);
                        //用户拒绝
                        if (
                            err.errMsg == 'getFuzzyLocation:fail auth deny' ||
                            err.errMsg == 'getFuzzyLocation:fail:auth denied' ||
                            err.errMsg == 'getFuzzyLocation:fail system permission denied'
                        ) {
                            toast('需要授权位置信息，请删除小程序重新进入');
                            resolve({
                                location: undefined,
                                currentCity: '',
                            });
                            //未开启手机定位
                        } else if (err.errMsg == 'getFuzzyLocation:fail:ERROR_NOCELL&WIFI_LOCATIONSWITCHOFF') {
                            uni.showModal({
                                title: '温馨提示',
                                content: '请打开手机定位',
                                confirmText: '已打开',
                                confirmColor: '#BCA474',
                                cancelColor: '#ccc',
                                cancelText: '否',
                                success: function (res) {
                                    if (res.confirm) {
                                        that.getLocation();
                                    } else if (res.cancel) {
                                        console.log('用户点击取消');
                                    }
                                },
                            });
                        }
                    },
                });
            });
        },
    },
});
