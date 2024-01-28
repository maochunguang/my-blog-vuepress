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
    text: "博客精选",
    icon: "pen-to-square",
    prefix: "/posts/",
    children: [
      {
        text: "开发工具",
        icon: "pen-to-square",
        prefix: "dev-tool/",
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
      "tomato",
      "strawberry",
    ],
  },
  {
    text: "V2 文档",
    icon: "book",
    link: "https://theme-hope.vuejs.press/zh/",
  },
  // {
  //   text: "java面试",
  //   icon: "book",
  //   link: "https://theme-hope.vuejs.press/zh/",
  // },
]);
