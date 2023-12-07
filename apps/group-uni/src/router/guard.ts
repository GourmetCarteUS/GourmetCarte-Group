import type { Router } from "uni-mini-router/lib/interfaces";

export function createBeforeEachGuard(router: Router) {
  // 全局前置守卫 beforeEach: 主要用来通过跳转或取消的方式守卫导航
  router.beforeEach((to, from, next) => {
    next();
  });
}

export function createAfterEachGuard(router: Router) {
  // 全全局后置钩子 afterEach: 对于分析、更改页面标题、声明页面等辅助功能以及许多其他事情都很有用
  router.afterEach((to, from) => {});
}
