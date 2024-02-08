import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  "/demo/",
  {
    text: "rust实战",
    icon: "pen-to-square",
    prefix: "/posts/rust-study/",
    children: [
      { text: "rust宏编程", icon: "pen-to-square", link: "rust-macro-mapstruct" },
      { text: "rust命令行工具", icon: "pen-to-square", link: "rust-command-tool-1" },
    ],
  },
  {
    text: "开发工具",
    icon: "pen-to-square",
    prefix: "/posts/dev-tool/",
    children: [
      {
        text: "博客工具",
        icon: "pen-to-square",
        link: "blog-tool",
      },
      {
        text: "命令行工具",
        icon: "pen-to-square",
        link: "command-tool",
      },
    ],
  },
  {
    text: "玩转Mac",
    icon: "pen-to-square",
    prefix: "/posts/mac-tips",
    children: [
      {
        text: "必备软件",
        icon: "pen-to-square",
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
