import { defineStore } from "pinia";
import useTokenStorage from "@/storage/token";
import type { UserInfo } from "@/api/user-info/user-info.types";
import { user_info } from "@/api/user-info/user-info";
import { toast } from "@/utils/uniapi/prompt";

export const useUserInfoStore = defineStore("user-info", {
  state: () => ({
    user: null as UserInfo | null,
    location: null as {
      latitude: number;
      longitude: number;
    } | null,
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
        const res = await user_info();
        const userInfo: UserInfo = res.data.data;
        this.user = userInfo;
        return userInfo;
      } catch (e) {
        // this.logout()
        return false;
      }
    },
    async updateUserInfo() {
      const res = await user_info();
      const userInfo: UserInfo = res.data.data;
      this.user = userInfo;
      return userInfo;
    },
    removeUserInfo() {
      this.user = null;
    },
    logout() {
      this.removeUserInfo();
      useTokenStorage.removeToken();
    },
    async getLocation() {
      if (this.location) return this.location;
      let that = this;
      return await new Promise((resolve, reject) => {
        uni.getLocation({
          isHighAccuracy: true,
          altitude: true,
          type: "gcj02",
          success(res) {
            const location = {
              latitude: res.latitude,
              longitude: res.longitude,
            };
            that.location = location;
            resolve(location);
          },
          fail(err) {
            //用户拒绝
            if (
              err.errMsg == "getLocation:fail auth deny" ||
              err.errMsg == "getLocation:fail:auth denied" ||
              err.errMsg == "getLocation:fail system permission denied"
            ) {
              toast("需要授权位置信息，请删除小程序重新进入");
              //未开启手机定位
            } else if (
              err.errMsg ==
              "getLocation:fail:ERROR_NOCELL&WIFI_LOCATIONSWITCHOFF"
            ) {
              uni.showModal({
                title: "温馨提示",
                content: "请打开手机定位",
                confirmText: "已打开",
                confirmColor: "#BCA474",
                cancelColor: "#ccc",
                cancelText: "否",
                success: function (res) {
                  if (res.confirm) {
                    that.getLocation();
                  } else if (res.cancel) {
                    console.log("用户点击取消");
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
