import{_ as e,c as i,o as l,a as t}from"./app.cc1c1bc6.js";const h=JSON.parse('{"title":"Vue 指令篇","description":"","frontmatter":{},"headers":[{"level":2,"title":"描述下 Vue 自定义指令","slug":"描述下-vue-自定义指令","link":"#描述下-vue-自定义指令","children":[]}],"relativePath":"vue/directive.md","lastUpdated":null}'),a={name:"vue/directive.md"},o=t('<h1 id="vue-指令篇" tabindex="-1">Vue 指令篇 <a class="header-anchor" href="#vue-指令篇" aria-hidden="true">#</a></h1><h2 id="描述下-vue-自定义指令" tabindex="-1">描述下 Vue 自定义指令 <a class="header-anchor" href="#描述下-vue-自定义指令" aria-hidden="true">#</a></h2><p>在 Vue2.0 中，代码复用和抽象的主要形式是组件。然而，有的情况下，你仍然需要对普通 DOM 元素进行底层操作，这时候就会用到自定义指令。 一般需要对 DOM 元素进行底层操作时使用，尽量只用来操作 DOM 展示，不修改内部的值。当使用自定义指令直接修改 value 值时绑定 v-model 的值也不会同步更新；如必须修改可以在自定义指令中使用 keydown 事件，在 vue 组件中使用 change 事件，回调中修改 vue 数据;</p><p><strong>（1）自定义指令基本内容</strong></p><ul><li><p>全局定义：Vue.directive(&quot;focus&quot;,{})</p></li><li><p>局部定义：directives:{focus:</p></li><li><p>钩子函数：指令定义对象提供钩子函数</p><ul><li>bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。</li><li>inSerted：被绑定元素插入父节点时调用（仅保证父节点存在，但不一定已被插入文档中）。</li><li>update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前调用。指令的值可能发生了改变，也可能没有。但是可以通过比较更新前后的值来忽略不必要的模板更新。</li><li>ComponentUpdate：指令所在组件的 VNode 及其子 VNode 全部更新后调用。</li><li>unbind：只调用一次，指令与元素解绑时调用。</li></ul></li><li><p>钩子函数参数</p><ul><li>el：绑定元素</li><li>bing： 指令核心对象，描述指令全部信息属性</li><li>name</li><li>value</li><li>oldValue</li><li>expression</li><li>arg</li><li>modifers</li><li>vnode   虚拟节点</li><li>oldVnode：上一个虚拟节点（更新钩子函数中才有用）</li></ul></li></ul><p><strong>（2）使用场景</strong></p><ul><li>普通 DOM 元素进行底层操作的时候，可以使用自定义指令</li><li>自定义指令是用来操作 DOM 的。尽管 Vue 推崇数据驱动视图的理念，但并非所有情况都适合数据驱动。自定义指令就是一种有效的补充和扩展，不仅可用于定义任何的 DOM 操作，并且是可复用的。</li></ul><p><strong>（3）使用案例</strong> 初级应用：</p><ul><li>鼠标聚焦</li><li>下拉菜单</li><li>相对时间转换</li><li>滚动动画</li></ul><p>高级应用：</p><ul><li>自定义指令实现图片懒加载</li><li>自定义指令集成第三方插件</li></ul>',11),u=[o];function d(n,r,s,p,c,_){return l(),i("div",null,u)}const V=e(a,[["render",d]]);export{h as __pageData,V as default};
