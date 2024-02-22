import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "玩转AI",
      icon: "laptop-code",
      prefix: "aigc/",
      children: "structure",
    },

    {
      text: "开发工具",
      icon: "toolbox",
      prefix: "dev-tool/",
      children: "structure",
    },
    {
      text: "五分钟学java",
      icon: "laptop-code",
      prefix: "java-five-study/",
      children: "structure",
    },
    {
      text: "玩转Mac",
      icon: "apple",
      prefix: "mac-tips/",
      children: "structure",
    },
    {
      text: "rust入门到放弃",
      icon: "laptop-code",
      prefix: "rust-study/",
      children: "structure",
    },
    "intro",
    // {
    //   text: "幻灯片",
    //   icon: "person-chalkboard",
    //   link: "https://plugin-md-enhance.vuejs.press/zh/guide/content/revealjs/demo.html",
    // },
  ],
});
