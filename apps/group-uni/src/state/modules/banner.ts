import { defineStore } from "pinia";

export const useHomeInfoStore = defineStore("home-info", {
  state: () => ({
    banners: null as Array<Object> | null,
    categories: Array<string>,
    devices: Array<string>,
  }),
  actions: {
    async getBanners() {
      if (this.banners) return this.banners;
      this.banners = [{ id: 1 }];
    },
    async getCategories() {
      if (this.categories) return this.categories;
    },
    async getDevices(update: boolean = false, params?: Object) {
      if (!update) {
        if (this.categories) return this.categories;
      }
    },
  },
});
