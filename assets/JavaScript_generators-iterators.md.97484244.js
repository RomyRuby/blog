import{_ as s,c as n,o as a,a as l}from"./app.5f4df9cd.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"迭代","slug":"迭代","link":"#迭代","children":[]},{"level":2,"title":"JS的迭代器","slug":"js的迭代器","link":"#js的迭代器","children":[]},{"level":2,"title":"体验迭代器","slug":"体验迭代器","link":"#体验迭代器","children":[]},{"level":2,"title":"实现一个可迭代对象","slug":"实现一个可迭代对象","link":"#实现一个可迭代对象","children":[]},{"level":2,"title":"For-of","slug":"for-of","link":"#for-of","children":[]},{"level":2,"title":"生成器","slug":"生成器","link":"#生成器","children":[]}],"relativePath":"JavaScript/generators-iterators.md","lastUpdated":null}'),e={name:"JavaScript/generators-iterators.md"},p=l(`<h2 id="迭代" tabindex="-1">迭代 <a class="header-anchor" href="#迭代" aria-hidden="true">#</a></h2><p><strong>一些概念：</strong></p><p><strong>迭代：从一个数据集合中，按一定顺序取出数据。不在意是否取完。</strong></p><p><strong>遍历：强调把数据集合所有数据依次取完。</strong></p><p><strong>迭代器：迭代过程的封装。</strong></p><p><strong>迭代模式：一种设计模式，规范了迭代器的每一次迭代，都应该具备获取下次迭代数据，以及判断是否还有数据可以迭代的能力。</strong></p><h2 id="js的迭代器" tabindex="-1">JS的迭代器 <a class="header-anchor" href="#js的迭代器" aria-hidden="true">#</a></h2><p><strong>JS中的可迭代对象都有一个symbol.iterator()方法，执行这个方法返回一个迭代器。</strong></p><p><strong>迭代器拥有next方法，每执行一次取出下一个数据，并返回{value:值,done:false(后续还有数据)/true(后续已无数据)}</strong></p><p><strong>可迭代对象：Array、String、Map、DOMs、arguments</strong></p><p><strong>不可迭代对象：Object</strong></p><h2 id="体验迭代器" tabindex="-1">体验迭代器 <a class="header-anchor" href="#体验迭代器" aria-hidden="true">#</a></h2><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;">const arr = [&quot;Romy&quot;, &quot;Fato&quot;, &quot;Chocoly&quot;];</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;">const iter = arr[Symbol.iterator]();//生成一个迭代器</span></span>
<span class="line"><span style="color:#abb2bf;">console.log(iter.next());//{ value: &#39;Romy&#39;, done: false }</span></span>
<span class="line"><span style="color:#abb2bf;">console.log(iter.next());//{ value: &#39;Fato&#39;, done: false }</span></span>
<span class="line"><span style="color:#abb2bf;">console.log(iter.next());//{ value: &#39;Chocoly&#39;, done: false }</span></span>
<span class="line"><span style="color:#abb2bf;">console.log(iter.next());//{ value: undefined, done: true }</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki min-dark vp-code-light"><code><span class="line"><span style="color:#b392f0;">const arr = [&quot;Romy&quot;, &quot;Fato&quot;, &quot;Chocoly&quot;];</span></span>
<span class="line"><span style="color:#b392f0;"></span></span>
<span class="line"><span style="color:#b392f0;">const iter = arr[Symbol.iterator]();//生成一个迭代器</span></span>
<span class="line"><span style="color:#b392f0;">console.log(iter.next());//{ value: &#39;Romy&#39;, done: false }</span></span>
<span class="line"><span style="color:#b392f0;">console.log(iter.next());//{ value: &#39;Fato&#39;, done: false }</span></span>
<span class="line"><span style="color:#b392f0;">console.log(iter.next());//{ value: &#39;Chocoly&#39;, done: false }</span></span>
<span class="line"><span style="color:#b392f0;">console.log(iter.next());//{ value: undefined, done: true }</span></span>
<span class="line"><span style="color:#b392f0;"></span></span>
<span class="line"><span style="color:#b392f0;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="实现一个可迭代对象" tabindex="-1">实现一个可迭代对象 <a class="header-anchor" href="#实现一个可迭代对象" aria-hidden="true">#</a></h2><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;">let obj = {</span></span>
<span class="line"><span style="color:#abb2bf;">  values: [&quot;Romy&quot;, &quot;Fato&quot;, &quot;Chocoly&quot;],</span></span>
<span class="line"><span style="color:#abb2bf;">  [Symbol.iterator]() {</span></span>
<span class="line"><span style="color:#abb2bf;">    let index = 0;</span></span>
<span class="line"><span style="color:#abb2bf;">    const _this = this;</span></span>
<span class="line"><span style="color:#abb2bf;">    return {</span></span>
<span class="line"><span style="color:#abb2bf;">      next() {</span></span>
<span class="line"><span style="color:#abb2bf;">        if (index &lt; _this.values.length) {</span></span>
<span class="line"><span style="color:#abb2bf;">          const result = { value: _this.values[index], done: false };</span></span>
<span class="line"><span style="color:#abb2bf;">          index++;</span></span>
<span class="line"><span style="color:#abb2bf;">          return result;</span></span>
<span class="line"><span style="color:#abb2bf;">        } else {</span></span>
<span class="line"><span style="color:#abb2bf;">          return { value: undefined, done: true };</span></span>
<span class="line"><span style="color:#abb2bf;">        }</span></span>
<span class="line"><span style="color:#abb2bf;">      },</span></span>
<span class="line"><span style="color:#abb2bf;">    };</span></span>
<span class="line"><span style="color:#abb2bf;">  },</span></span>
<span class="line"><span style="color:#abb2bf;">};</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;">let iter = obj[Symbol.iterator]();</span></span>
<span class="line"><span style="color:#abb2bf;">console.log(iter.next());</span></span>
<span class="line"><span style="color:#abb2bf;">console.log(iter.next());</span></span>
<span class="line"><span style="color:#abb2bf;">console.log(iter.next());</span></span>
<span class="line"><span style="color:#abb2bf;">console.log(iter.next());</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki min-dark vp-code-light"><code><span class="line"><span style="color:#b392f0;">let obj = {</span></span>
<span class="line"><span style="color:#b392f0;">  values: [&quot;Romy&quot;, &quot;Fato&quot;, &quot;Chocoly&quot;],</span></span>
<span class="line"><span style="color:#b392f0;">  [Symbol.iterator]() {</span></span>
<span class="line"><span style="color:#b392f0;">    let index = 0;</span></span>
<span class="line"><span style="color:#b392f0;">    const _this = this;</span></span>
<span class="line"><span style="color:#b392f0;">    return {</span></span>
<span class="line"><span style="color:#b392f0;">      next() {</span></span>
<span class="line"><span style="color:#b392f0;">        if (index &lt; _this.values.length) {</span></span>
<span class="line"><span style="color:#b392f0;">          const result = { value: _this.values[index], done: false };</span></span>
<span class="line"><span style="color:#b392f0;">          index++;</span></span>
<span class="line"><span style="color:#b392f0;">          return result;</span></span>
<span class="line"><span style="color:#b392f0;">        } else {</span></span>
<span class="line"><span style="color:#b392f0;">          return { value: undefined, done: true };</span></span>
<span class="line"><span style="color:#b392f0;">        }</span></span>
<span class="line"><span style="color:#b392f0;">      },</span></span>
<span class="line"><span style="color:#b392f0;">    };</span></span>
<span class="line"><span style="color:#b392f0;">  },</span></span>
<span class="line"><span style="color:#b392f0;">};</span></span>
<span class="line"><span style="color:#b392f0;"></span></span>
<span class="line"><span style="color:#b392f0;">let iter = obj[Symbol.iterator]();</span></span>
<span class="line"><span style="color:#b392f0;">console.log(iter.next());</span></span>
<span class="line"><span style="color:#b392f0;">console.log(iter.next());</span></span>
<span class="line"><span style="color:#b392f0;">console.log(iter.next());</span></span>
<span class="line"><span style="color:#b392f0;">console.log(iter.next());</span></span>
<span class="line"><span style="color:#b392f0;"></span></span>
<span class="line"><span style="color:#b392f0;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><h2 id="for-of" tabindex="-1">For-of <a class="header-anchor" href="#for-of" aria-hidden="true">#</a></h2><p><strong>For-of可以用来迭代一个可迭代对象。</strong></p><p><strong>原理是，执行可迭代对象的Symbol.iterator方法，得到一个迭代器。然后执行迭代器的next方法，并返回next返回结果中的value，直到next返回结果中的done值为true时为止。</strong></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;">for (const 变量 of 可迭代对象) {</span></span>
<span class="line"><span style="color:#abb2bf;">  console.log(变量);//这里的变量接收每次执行next的结果中的value值</span></span>
<span class="line"><span style="color:#abb2bf;">}</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki min-dark vp-code-light"><code><span class="line"><span style="color:#b392f0;">for (const 变量 of 可迭代对象) {</span></span>
<span class="line"><span style="color:#b392f0;">  console.log(变量);//这里的变量接收每次执行next的结果中的value值</span></span>
<span class="line"><span style="color:#b392f0;">}</span></span>
<span class="line"><span style="color:#b392f0;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="生成器" tabindex="-1">生成器 <a class="header-anchor" href="#生成器" aria-hidden="true">#</a></h2><p>*<em>JS内部可以使用生成器构造函数Generator，我们可以使用function <em>函数名，创建生成器函数。生成器函数的第一次执行，可以创建出一个迭代器。生成器函数内部使用yield关键字可以指定每次next的返回值。迭代器的每一次执行next都会在下一个yield关键字语句处暂停。</em></em></p><p><strong>生成器函数的一些特点：</strong></p><ol><li><strong>生成器函数创建的迭代器执行next方法的返回值的value为yield后面的值</strong></li><li><strong>由生成器函数若有返回值，那么由它创建的迭代器执行到done为true时，value为返回值。</strong></li><li><strong>next可以接收一个参数，作为yield执行后的返回值。但一个迭代器第一次执行next的时候，传参无用。以及当迭代器done为true时，next传参无用。</strong></li><li><strong>生成器函数创建的迭代对象有一个throw方法，与next作用类似，但next参数可以作为返回值的value，但throw的参数会在生成器内部抛出一个错误。done为true后依然可以抛错，但抛错后生成器后面的迭代代码将停止。</strong></li></ol><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;">function* generator() {</span></span>
<span class="line"><span style="color:#abb2bf;">  console.log(0);</span></span>
<span class="line"><span style="color:#abb2bf;">  let val = yield 0;</span></span>
<span class="line"><span style="color:#abb2bf;">  console.log(1);</span></span>
<span class="line"><span style="color:#abb2bf;">  val = yield \`接收到next传值\${val}\`;</span></span>
<span class="line"><span style="color:#abb2bf;">  console.log(2);</span></span>
<span class="line"><span style="color:#abb2bf;">  val = yield \`接收到next传值\${val}\`;</span></span>
<span class="line"><span style="color:#abb2bf;">  console.log(3);</span></span>
<span class="line"><span style="color:#abb2bf;">  return &quot;提前结束迭代&quot;;</span></span>
<span class="line"><span style="color:#abb2bf;">}</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;">let iter = generator();</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;">console.log(iter.next(100));//{ value: 0, done: false }</span></span>
<span class="line"><span style="color:#abb2bf;">console.log(iter.next(200));//{ value: &#39;接收到next传值200&#39;, done: false }</span></span>
<span class="line"><span style="color:#abb2bf;">console.log(iter.next(300));//{ value: &#39;接收到next传值300&#39;, done: false }</span></span>
<span class="line"><span style="color:#abb2bf;">console.log(iter.next(400));//{ value: &#39;提前结束迭代&#39;, done: true }</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;">function* generator() {</span></span>
<span class="line"><span style="color:#abb2bf;">  console.log(0);</span></span>
<span class="line"><span style="color:#abb2bf;">  let val = yield 0;</span></span>
<span class="line"><span style="color:#abb2bf;">  console.log(1);</span></span>
<span class="line"><span style="color:#abb2bf;">  val = yield \`接收到next传值\${val}\`;</span></span>
<span class="line"><span style="color:#abb2bf;">  console.log(2);</span></span>
<span class="line"><span style="color:#abb2bf;">  val = yield \`接收到next传值\${val}\`;</span></span>
<span class="line"><span style="color:#abb2bf;">  console.log(3);</span></span>
<span class="line"><span style="color:#abb2bf;">  return &quot;提前结束迭代&quot;;</span></span>
<span class="line"><span style="color:#abb2bf;">  val = yield \`接收到next传值\${val}\`;</span></span>
<span class="line"><span style="color:#abb2bf;">  console.log(4);</span></span>
<span class="line"><span style="color:#abb2bf;">}</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;">let iter = generator();</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;">console.log(iter.next(100));//{ value: 0, done: false }</span></span>
<span class="line"><span style="color:#abb2bf;">console.log(iter.next(200));//{ value: &#39;接收到next传值200&#39;, done: false }</span></span>
<span class="line"><span style="color:#abb2bf;">console.log(iter.next(300));//{ value: &#39;接收到next传值300&#39;, done: false }</span></span>
<span class="line"><span style="color:#abb2bf;">console.log(iter.next(400));//{ value: &#39;提前结束迭代&#39;, done: true }</span></span>
<span class="line"><span style="color:#abb2bf;">console.log(iter.throw(&quot;error&quot;));//抛错</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki min-dark vp-code-light"><code><span class="line"><span style="color:#b392f0;">function* generator() {</span></span>
<span class="line"><span style="color:#b392f0;">  console.log(0);</span></span>
<span class="line"><span style="color:#b392f0;">  let val = yield 0;</span></span>
<span class="line"><span style="color:#b392f0;">  console.log(1);</span></span>
<span class="line"><span style="color:#b392f0;">  val = yield \`接收到next传值\${val}\`;</span></span>
<span class="line"><span style="color:#b392f0;">  console.log(2);</span></span>
<span class="line"><span style="color:#b392f0;">  val = yield \`接收到next传值\${val}\`;</span></span>
<span class="line"><span style="color:#b392f0;">  console.log(3);</span></span>
<span class="line"><span style="color:#b392f0;">  return &quot;提前结束迭代&quot;;</span></span>
<span class="line"><span style="color:#b392f0;">}</span></span>
<span class="line"><span style="color:#b392f0;"></span></span>
<span class="line"><span style="color:#b392f0;">let iter = generator();</span></span>
<span class="line"><span style="color:#b392f0;"></span></span>
<span class="line"><span style="color:#b392f0;">console.log(iter.next(100));//{ value: 0, done: false }</span></span>
<span class="line"><span style="color:#b392f0;">console.log(iter.next(200));//{ value: &#39;接收到next传值200&#39;, done: false }</span></span>
<span class="line"><span style="color:#b392f0;">console.log(iter.next(300));//{ value: &#39;接收到next传值300&#39;, done: false }</span></span>
<span class="line"><span style="color:#b392f0;">console.log(iter.next(400));//{ value: &#39;提前结束迭代&#39;, done: true }</span></span>
<span class="line"><span style="color:#b392f0;"></span></span>
<span class="line"><span style="color:#b392f0;">function* generator() {</span></span>
<span class="line"><span style="color:#b392f0;">  console.log(0);</span></span>
<span class="line"><span style="color:#b392f0;">  let val = yield 0;</span></span>
<span class="line"><span style="color:#b392f0;">  console.log(1);</span></span>
<span class="line"><span style="color:#b392f0;">  val = yield \`接收到next传值\${val}\`;</span></span>
<span class="line"><span style="color:#b392f0;">  console.log(2);</span></span>
<span class="line"><span style="color:#b392f0;">  val = yield \`接收到next传值\${val}\`;</span></span>
<span class="line"><span style="color:#b392f0;">  console.log(3);</span></span>
<span class="line"><span style="color:#b392f0;">  return &quot;提前结束迭代&quot;;</span></span>
<span class="line"><span style="color:#b392f0;">  val = yield \`接收到next传值\${val}\`;</span></span>
<span class="line"><span style="color:#b392f0;">  console.log(4);</span></span>
<span class="line"><span style="color:#b392f0;">}</span></span>
<span class="line"><span style="color:#b392f0;"></span></span>
<span class="line"><span style="color:#b392f0;">let iter = generator();</span></span>
<span class="line"><span style="color:#b392f0;"></span></span>
<span class="line"><span style="color:#b392f0;">console.log(iter.next(100));//{ value: 0, done: false }</span></span>
<span class="line"><span style="color:#b392f0;">console.log(iter.next(200));//{ value: &#39;接收到next传值200&#39;, done: false }</span></span>
<span class="line"><span style="color:#b392f0;">console.log(iter.next(300));//{ value: &#39;接收到next传值300&#39;, done: false }</span></span>
<span class="line"><span style="color:#b392f0;">console.log(iter.next(400));//{ value: &#39;提前结束迭代&#39;, done: true }</span></span>
<span class="line"><span style="color:#b392f0;">console.log(iter.throw(&quot;error&quot;));//抛错</span></span>
<span class="line"><span style="color:#b392f0;"></span></span>
<span class="line"><span style="color:#b392f0;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br></div></div><p><strong>生成器的应用：</strong></p><ol><li><strong>优化封装数组迭代器</strong><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;">const arr1 = [1, 2, 3, 4, 5];</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;">function* iter(arr) {</span></span>
<span class="line"><span style="color:#abb2bf;">  for (const item of arr) {</span></span>
<span class="line"><span style="color:#abb2bf;">    yield item;</span></span>
<span class="line"><span style="color:#abb2bf;">  }</span></span>
<span class="line"><span style="color:#abb2bf;">}</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;">const iter1 = iter(arr1);</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki min-dark vp-code-light"><code><span class="line"><span style="color:#b392f0;">const arr1 = [1, 2, 3, 4, 5];</span></span>
<span class="line"><span style="color:#b392f0;"></span></span>
<span class="line"><span style="color:#b392f0;"></span></span>
<span class="line"><span style="color:#b392f0;">function* iter(arr) {</span></span>
<span class="line"><span style="color:#b392f0;">  for (const item of arr) {</span></span>
<span class="line"><span style="color:#b392f0;">    yield item;</span></span>
<span class="line"><span style="color:#b392f0;">  }</span></span>
<span class="line"><span style="color:#b392f0;">}</span></span>
<span class="line"><span style="color:#b392f0;"></span></span>
<span class="line"><span style="color:#b392f0;">const iter1 = iter(arr1);</span></span>
<span class="line"><span style="color:#b392f0;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div></li><li><strong>生成器模拟await</strong><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;">function* generator() {</span></span>
<span class="line"><span style="color:#abb2bf;">  yield Promise.resolve(1);</span></span>
<span class="line"><span style="color:#abb2bf;">  console.log(&quot;执行1&quot;);</span></span>
<span class="line"><span style="color:#abb2bf;">  yield Promise.resolve(2);</span></span>
<span class="line"><span style="color:#abb2bf;">  console.log(&quot;执行2&quot;);</span></span>
<span class="line"><span style="color:#abb2bf;">  yield Promise.resolve(3);</span></span>
<span class="line"><span style="color:#abb2bf;">  console.log(&quot;执行3&quot;);</span></span>
<span class="line"><span style="color:#abb2bf;">  console.log(&quot;执行4&quot;);</span></span>
<span class="line"><span style="color:#abb2bf;">}</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;">function ayncFunc(iterator) {</span></span>
<span class="line"><span style="color:#abb2bf;">  let iter = iterator();</span></span>
<span class="line"><span style="color:#abb2bf;">  const next = (val) =&gt; {</span></span>
<span class="line"><span style="color:#abb2bf;">    let { value, done } = iter.next(val);</span></span>
<span class="line"><span style="color:#abb2bf;">    if (done) return;</span></span>
<span class="line"><span style="color:#abb2bf;">    value.then(next);</span></span>
<span class="line"><span style="color:#abb2bf;">    console.log(\`\${value}执行\`);</span></span>
<span class="line"><span style="color:#abb2bf;">  };</span></span>
<span class="line"><span style="color:#abb2bf;">  next();</span></span>
<span class="line"><span style="color:#abb2bf;">}</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;">ayncFunc(generator);</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki min-dark vp-code-light"><code><span class="line"><span style="color:#b392f0;">function* generator() {</span></span>
<span class="line"><span style="color:#b392f0;">  yield Promise.resolve(1);</span></span>
<span class="line"><span style="color:#b392f0;">  console.log(&quot;执行1&quot;);</span></span>
<span class="line"><span style="color:#b392f0;">  yield Promise.resolve(2);</span></span>
<span class="line"><span style="color:#b392f0;">  console.log(&quot;执行2&quot;);</span></span>
<span class="line"><span style="color:#b392f0;">  yield Promise.resolve(3);</span></span>
<span class="line"><span style="color:#b392f0;">  console.log(&quot;执行3&quot;);</span></span>
<span class="line"><span style="color:#b392f0;">  console.log(&quot;执行4&quot;);</span></span>
<span class="line"><span style="color:#b392f0;">}</span></span>
<span class="line"><span style="color:#b392f0;"></span></span>
<span class="line"><span style="color:#b392f0;">function ayncFunc(iterator) {</span></span>
<span class="line"><span style="color:#b392f0;">  let iter = iterator();</span></span>
<span class="line"><span style="color:#b392f0;">  const next = (val) =&gt; {</span></span>
<span class="line"><span style="color:#b392f0;">    let { value, done } = iter.next(val);</span></span>
<span class="line"><span style="color:#b392f0;">    if (done) return;</span></span>
<span class="line"><span style="color:#b392f0;">    value.then(next);</span></span>
<span class="line"><span style="color:#b392f0;">    console.log(\`\${value}执行\`);</span></span>
<span class="line"><span style="color:#b392f0;">  };</span></span>
<span class="line"><span style="color:#b392f0;">  next();</span></span>
<span class="line"><span style="color:#b392f0;">}</span></span>
<span class="line"><span style="color:#b392f0;"></span></span>
<span class="line"><span style="color:#b392f0;">ayncFunc(generator);</span></span>
<span class="line"><span style="color:#b392f0;"></span></span>
<span class="line"><span style="color:#b392f0;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div></li></ol>`,26),o=[p];function r(c,b,t,i,u,f){return a(),n("div",null,o)}const m=s(e,[["render",r]]);export{d as __pageData,m as default};
