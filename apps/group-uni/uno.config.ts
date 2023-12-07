import { defineConfig, presetUno } from "unocss";

const remRE = /(-?[.\d]+)(rem)/g;

export default defineConfig({
  presets: [
    presetUno({
      arbitraryVariants: false,
    }),
  ],
  shortcuts: [
    {
      "border-base": "border border-gray-500_10",
      center: "flex justify-center items-center",
    },
  ],
  theme: {
    // 解决小程序不支持 * 选择器
    preflightRoot: ["page,::before,::after"],
  },
  postprocess: [
    (obj) => {
      obj.entries.forEach((i) => {
        const value = i[1];
        if (typeof value === "string" && remRE.test(value)) {
          i[1] = value.replace(remRE, (_, p1) => `${p1 * 4}rpx`);
        }
      });
    },
  ],
});
