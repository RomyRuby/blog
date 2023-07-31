import { DefaultTheme } from "vitepress";
import vueConfig from "./vue";
export const defaultSidebar: DefaultTheme.Sidebar = [
  {
    text: "Introduction",
    collapsible: true,
    items: [
      {
        text: "Getting Started",
        link: "/getting-started",
      },
    ],
  },
  {
    text: `Vuejs ${vueConfig.length}篇`,
    collapsed: true,
    collapsible: true,
    items: vueConfig,
  }
];
