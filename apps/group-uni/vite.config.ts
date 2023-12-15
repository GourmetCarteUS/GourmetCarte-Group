import { ConfigEnv, loadEnv, UserConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import UnoCSS from 'unocss/vite';
import { resolve } from 'path';
import TransformPages from 'uni-read-pages-vite';

export default ({ mode }: ConfigEnv): UserConfig => {
    const root = process.cwd();
    const env = loadEnv(mode, root);

    return {
        plugins: [uni(), UnoCSS()],
        resolve: {
            alias: {
                '@': resolve('./src'),
            },
            extensions: ['.js', '.json', '.ts', '.vue'], // 使用路径别名时想要省略的后缀名，可以自己 增减
        },
        define: {
            ROUTES: new TransformPages().routes, // 注入路由表
        },
        server: {
            host: true,
            // open: true,
            port: env.VITE_PORT as any,
            proxy: {
                '^/(api)': {
                    target: env.VITE_PROXY_TARGET,
                    changeOrigin: true,
                    secure: false,
                },
            },
        },
    };
};
