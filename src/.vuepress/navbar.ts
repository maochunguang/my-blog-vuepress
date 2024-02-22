import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "玩转AI",
    icon: "laptop-code",
    prefix: "/aigc/",
    link: "/aigc/",
    children: [
      { text: "搭建知识库", icon: "pen-to-square", link: "run-knowledge-base" },
    ],
  },
  {
    text: "rust实战",
    icon: "plain-up",
    prefix: "/posts/rust-study/",
    children: [
      { text: "rust宏编程", icon: "pen-to-square", link: "rust-macro-mapstruct" },
      { text: "rust命令行工具", icon: "pen-to-square", link: "rust-command-tool-1" },
    ],
  },
  {
    text: "开发工具",
    icon: "toolbox",
    prefix: "/posts/dev-tool/",
    children: [
      {
        text: "博客工具",
        icon: "school",
        link: "blog-tool",
      },
      {
        text: "命令行工具",
        icon: "hammer",
        link: "command-tool",
      },
    ],
  },
  {
    text: "玩转Mac",
    icon: "apple",
    prefix: "/posts/mac-tips",
    children: [
      {
        text: "必备软件",
        icon: "soft",
        link: "mac-must-soft",
      },
      {
        text: "定制输入法",
        icon: "pen-to-square",
        link: "mac-recommend-input",
      },
    ],
  },
  {
    text: "java面试宝典",
    icon: "book",
    link: "https://codingmore.site/interview",
  },
  // {
  //   text: "java面试",
  //   icon: "book",
  //   link: "https://theme-hope.vuejs.press/zh/",
  // },
]);
