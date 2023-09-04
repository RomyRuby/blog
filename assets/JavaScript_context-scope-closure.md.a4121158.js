import{_ as e,c as a,o as t,a as r}from"./app.2d43daee.js";const f=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":3,"title":"1. 对执行上下文的理解","slug":"_1-对执行上下文的理解","link":"#_1-对执行上下文的理解","children":[]},{"level":3,"title":"2. 对作用域、作用域链的理解","slug":"_2-对作用域、作用域链的理解","link":"#_2-对作用域、作用域链的理解","children":[]},{"level":3,"title":"3. 对闭包的理解","slug":"_3-对闭包的理解","link":"#_3-对闭包的理解","children":[]}],"relativePath":"JavaScript/context-scope-closure.md","lastUpdated":1693810075000}'),i={name:"JavaScript/context-scope-closure.md"},d=r('<h3 id="_1-对执行上下文的理解" tabindex="-1">1. 对执行上下文的理解 <a class="header-anchor" href="#_1-对执行上下文的理解" aria-hidden="true">#</a></h3><ol><li><h5 id="类型" tabindex="-1">类型： <a class="header-anchor" href="#类型" aria-hidden="true">#</a></h5><p>全局执行上下文：不在函数中执行都在这，会创建一个window对象，this指向window，一个程序中只有一个全局执行上下文。</p><p>函数执行上下文：函数调用时创建的执行上下文，函数上下文可以有任意多个。</p></li><li><h5 id="执行上下文栈" tabindex="-1">执行上下文栈 <a class="header-anchor" href="#执行上下文栈" aria-hidden="true">#</a></h5><p>js引擎用执行上下文栈来管理执行上下文，当js执行时，首先会遇到全局代码，创建全局执行上下文压入执行栈中，遇到函数调用，创建函数执行上下文，压入栈顶，执行完毕从栈顶弹出，继续执行下一个上下文。全部代码执行完毕，弹出全局执行上下文。</p></li></ol><h3 id="_2-对作用域、作用域链的理解" tabindex="-1">2. 对作用域、作用域链的理解 <a class="header-anchor" href="#_2-对作用域、作用域链的理解" aria-hidden="true">#</a></h3><p>作用域类型：</p><p>​ 全局作用域、函数作用域、块级作用域</p><p>作用域链：在当前作用域中查找所需变量，该作用域没有，就会向上查找父作用域查找，直到找在window对象为止。</p><h3 id="_3-对闭包的理解" tabindex="-1">3. 对闭包的理解 <a class="header-anchor" href="#_3-对闭包的理解" aria-hidden="true">#</a></h3><p>闭包是指有权访问另一个函数作用域的变量的函数。通常发生在一个函数内部创建另一个函数的情况，子函数可以访问父函数的变量。</p><p>闭包的作用：</p><p>​ 在函数外部能够访问到函数内部的变量</p><p>​ 延长变量的寿命</p>',11),n=[d];function s(c,l,o,h,_,p){return t(),a("div",null,n)}const x=e(i,[["render",s]]);export{f as __pageData,x as default};
