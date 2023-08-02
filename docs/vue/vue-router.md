# Vue-Router

## 基础知识回顾

#### 安装 vue-router

1. vue-cli 创建项目时勾选上 vue-router
2. 已有的 vue 项目安装 vue-router 依赖

#### 创建 vue 的实例要加入 router 做了什么？

​ 会挂载$router和$route 这两个对象到 vue 对象上。

#### 动态路由传参的方式

1. routes 中用：路径/:id 传参

   在组件中用$route.params.id 接收

2. route 中用：路径/:id

   prop:true 传参

   在组件中用 props:['id']接收

​ 更推荐使用第二种

#### 嵌套路由

​ 嵌套路由可以把页面公共部分提取出来，写到一个公共组件，变换的部分用 router-view 占位。

#### $router.push和$router.replace 的区别

​ push 会记录跳转，浏览器可退回，relace 不会

#### Hash 和 History 的区别

​ 首先，这俩都是客户端的转跳，不请求后端，请求后端内容需要发起 ajax 请求

不同：

1. hash 有#，history 没有，但 history 需要后端配置支持

2. Hah 是基于锚点，用 onhashchange 事件

   history 用 HTML5 的 history API：history.pushState()、history.replaceState()，并且仅支持 IE 10 以后

#### History 模式为什么需要后端配置？

​ 单页面应用中，在正常的跳转情况下，history 和 hash 一样，没什么问题。但是，当浏览器刷新页面的时候就会有问题了，浏览器想服务端发起请求的时候不会带上 hash 的#后面的内容，但是 history 没有#，所以 history 会像服务端发送整个请求地址，服务端没有配置，就可能会返回 404，但是有的内容需要在前端用 url 处理，所以需要后端在找不到该地址的时候，返回 index.html。

​ 另外，vue-router 默认是 hash 模式，如果需要切换为 history 模式，那么需要在创建 router 实例的时候，配置 mode:history

​ 需要注意的是，vue-cli 自带的 webServer 已经支持好了对 history 的配置，所以看不出来问题，但打包部署到 node 或是 nginx 的服务器中，就会出问题了。

## 手写 vue-router

#### VueRouter 类有些什么？

1. 3 个属性

   options：记录传入的对象

   data：记录路由地址，有一个 current 属性记录当前地址

   routeMap：记录路由规则

2. 6 个方法：

   一个静态方法：install（vue.use 接收函数或对象，接收函数直接执行，接收对象则调用对象的 install 方法）

   公开方法：

   ​ Constructor：初始化

   ​ init：用来调用下面三个方法

   ​ initEvent：注册 popState 监听浏览器变化

   ​ createRouteMap：初始化 routeMap，映射传入的路由和组件

   ​ initComponent：创建 router-link 和 router-view

#### 手写 Vue-Router 代码

```js
let _Vue = null;

export default class VueRouter {
  //install方法
  static install(Vue) {
    //1.判断方法是否已经被安装，已经被安装就不需要再次安装了
    if (VueRouter.install.installed) {
      return;
    }
    VueRouter.install.installed = true;
    //2.记录vue构造函数到全局中，方便后面的方法使用
    _Vue = Vue;
    //3.把传入的router对象注入到Vue实例上
    //混入,因为静态方法调用的this指向的是vueRouter这个类，而我们在创建vue实例的时候传入的router，所以我们需要this指向vue实例
    _Vue.mixin({
      beforeCreate() {
        //Vue的组件都是Vue实例，所有组件beforeCreate的时候都能执行
        if (this.$options.router) {
          //只有Vue创建的时候的实例有router，其余组件没有
          _Vue.prototype.$router = this.$options.router;
          //调用初始化方法
          this.$options.router.init();
        }
      },
    });
  }

  //构造函数
  constructor(options) {
    this.options = options;
    this.routeMap = {};
    //Vue.observable用来创建响应式对象
    this.data = _Vue.observable({
      current: "/",
    });
  }

  //初始化方法
  init() {
    this.createRouteMap();
    this.initComponents(_Vue);
    this.initEvent();
  }

  //创建路径与组件的映射关系
  createRouteMap() {
    //遍历所有的路由规则，把路由规则解析成键值对的形式，存储到routeMap中
    this.options.routes.forEach((route) => {
      this.routeMap[route.path] = route.component;
    });
  }

  //创建router-link和router-view两个组件
  initComponents(Vue) {
    //需要创建router-link和router-view这两个组件
    // Vue.component("router-link", {
    //   props: {
    //     to: String,
    //   },
    //   template: '<a :href="to"><slot></slot></a>',
    // });
    //如果使用运行时版本的vue-cli，那template不会被编译成渲染函数，会报错
    //解决方法1：在vue.config.js中去设置runtimeCompiler: true,
    //解决办法2：不用template，自己写个render函数，如下
    Vue.component("router-link", {
      props: {
        to: String,
      },
      render(h) {
        //h的作用是用来创建虚拟dom
        return h(
          "a",
          {
            attrs: {
              href: this.to,
            },
            on: {
              click: this.clickHandler,
            },
          },
          [this.$slots.default]
        );
      },

      methods: {
        clickHandler(e) {
          history.pushState({}, "", this.to);
          this.$router.data.current = this.to;
          e.preventDefault();
        },
      },
    });

    const self = this;
    Vue.component("router-view", {
      render(h) {
        const component = self.routeMap[self.data.current];
        return h(component);
      },
    });
  }

  //处理浏览器前进后退
  initEvent() {
    window.addEventListener("popstate", () => {
      this.data.current = window.location.pathname;
    });
  }
}
```
