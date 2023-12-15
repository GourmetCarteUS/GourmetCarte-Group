import { createRouter } from 'uni-mini-router';
import type { App } from 'vue';
import { createAfterEachGuard, createBeforeEachGuard } from '@/router/guard';

const router = createRouter({
    routes: [...ROUTES], // 路由表信息
});

export function setupRouter(app: App<Element>) {
    app.use(router);
    createBeforeEachGuard(router);
    createAfterEachGuard(router);
}

export { router };
