import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "Coding More",
  description: "Tommy的技术博客",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
  // 所有的插件配置

});
