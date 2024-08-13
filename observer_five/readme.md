# 事件监听和 Observer 介绍

在网页开发中，我们经常需要处理用户交互。我们会用 `addEventListener` 添加事件监听器来监听各种用户操作，比如 `click`、`mousedown`、`mousemove`、`input` 等，这些都是由用户直接触发的事件。

---

## 监听非用户直接触发的事件

对于一些不是由用户直接触发的事件，比如元素从不可见到可见、元素大小的改变、元素的属性和子节点的修改等，这类事件如何监听呢？

浏览器提供了 5 种 Observer 来监听这些变动：

- `MutationObserver`
- `IntersectionObserver`
- `PerformanceObserver`
- `ResizeObserver`
- `ReportingObserver`

---

### IntersectionObserver

一个元素从不可见到可见，从可见到不可见，这种变化如何监听呢？用 `IntersectionObserver`。

`IntersectionObserver` 可以监听一个元素和可视区域相交部分的比例，然后在可视比例达到某个阈值的时候触发回调。我们在做一些数据采集的时候，希望知道某个元素是否是可见的，什么时候可见的，就可以用这个 API 来监听。还有做图片的懒加载的时候，可以当可视比例达到某个比例再触发加载。

---

### MutationObserver

监听一个普通 JS 对象的变化，我们会用 `Object.defineProperty` 或者 `Proxy`；而监听元素的属性和子节点的变化，我们可以用 `MutationObserver`。

这个可以用来做什么呢？比如文章水印被人通过 DevTools 去掉了，那么就可以通过 `MutationObserver` 监听这个变化，然后重新加上，让水印去不掉。

---

### ResizeObserver

窗口我们可以用 `addEventListener` 监听 `resize` 事件，那元素呢？元素可以用 `ResizeObserver` 监听大小的改变，当 `width`、`height` 被修改时会触发回调。可以拿到元素和它的位置、尺寸。

---

### PerformanceObserver

浏览器提供了 `performance` 的 API 用于记录一些时间点、某个时间段、资源加载的耗时等。我们希望记录了 `performance` 那就马上上报，可是怎么知道啥时候会记录 `performance` 数据呢？用 `PerformanceObserver`。

`PerformanceObserver` 用于监听记录 `performance` 数据的行为，一旦记录了就会触发回调，这样我们就可以在回调里把这些数据上报。

比如 `performance` 可以用 `mark` 方法记录某个时间点：

```javascript
performance.mark("registered-observer");
```

用 `measure` 方法记录某个时间段：

```javascript
performance.measure("button clicked", "from", "to");
```

后两个参数是时间点，不传代表从开始到现在。
有了这些数据，就可以上报上去做性能分析了。

---

### ReportingObserver

当浏览器运行到过时（deprecation）的 api 的时候，会在控制台打印一个过时的报告
浏览器还会在一些情况下对网页行为做一些干预（intervention），比如会把占用 cpu 太多的广告的 iframe 删掉：
这些干预或者过时的 api 并不是报错，所以不能用错误监听的方式来拿到，但这些情况对网页 app 来说可能也是很重要的：

比如我这个网页就是为了展示广告的，但浏览器一干预给我把广告删掉了，我却不知道。如果我知道的话或许可以优化下 iframe。

比如我这个网页的图片很重要，结果浏览器一干预给我换成占位图了，我却不知道。如果我知道的话可能会优化下图片大小。

所以自然也要监听，所以浏览器提供了 `ReportingObserver` 的 api 用来监听这些报告的打印，我们可以拿到这些报告然后上传。
