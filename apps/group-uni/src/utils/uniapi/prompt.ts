/**
 * 交互反馈
 * https://uniapp.dcloud.io/api/ui/prompt.html
 */

/**
 * 显示消息提示框
 * @param title
 * @param options
 * @constructor
 */
export function toast(
  title: string,
  options?: Partial<UniApp.ShowToastOptions>,
) {
  uni.showToast({
    title,
    duration: 1500,
    icon: "none",
    mask: true,
    ...options,
  });
}

/**
 * 隐藏消息提示框
 */
export function hideToast() {
  uni.hideToast();
}

/**
 * 显示 loading 提示框
 * @param title
 * @param options
 * @constructor
 */
export function loading(
  title: string = "",
  options?: Partial<UniApp.ShowLoadingOptions>,
) {
  uni.showLoading({
    title,
    mask: true,
    ...options,
  });
}

/**
 * 隐藏 loading 提示框
 */
export function hideLoading() {
  uni.hideLoading();
}

/**
 * 显示模态弹窗，可以只有一个确定按钮，也可以同时有确定和取消按钮
 * @param options
 * @constructor
 */
export function modal(options: UniApp.ShowModalOptions) {
  return new Promise((resolve, reject) => {
    uni.showModal({
      success: (res) => {
        resolve(res);
      },
      fail: (res) => {
        reject(res);
      },
      ...options,
    });
  });
}

/**
 * 从底部向上弹出操作菜单
 * @param options
 * @constructor
 */
export function actionSheet(options: UniApp.ShowActionSheetOptions) {
  return new Promise((resolve, reject) => {
    uni.showActionSheet({
      success: (res) => {
        resolve(res);
      },
      fail: (res) => {
        reject(res);
      },
      ...options,
    });
  });
}
