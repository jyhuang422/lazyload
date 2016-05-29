# lazyload
画像の遅延ロード

## 基本的な使い方

* html
```html
<img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="<image url>" />
```

* javascript
```js
var lazyload = $(window).imgLazyLoad();
```

```js
var lazyload = $(window).imgLazyLoad(params);
```

## params
### container
* default: window
* windowと他の元素を一緒に使う時: $(window).add(selector)

### dataAttr
* default: 'data-src'

元素属性です、そこで画像のリンクを設定します

### node
* default: 'img'

遅延ロードの画像元素のセレクタ

### excludeClass
* default: 'loaded'

画像レンダリング後、元素につけるclass

## methods
### refreshNode
遅延ロードの画像元素の更新
### processImg
遅延ロードの画像元素レンダリングします
### renewAttr(params)
遅延ロード設定を変わります




