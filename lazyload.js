/*
 * jQuery image lazy load
 * params(Object):
 *   | container - scroll container
 *   | node - node to trigger lazy load
 *   | dataAttr - data attribute for real image url
 *   | excludeClass - class added when image was loaded
 * method:
 *   | refreshNode: used when node was dynamically added by js
 *   | renewAttr: used when images change
 *   | processImg: load the images if in scroll ontainer
 */
(function(){
  /* https://remysharp.com/2010/07/21/throttling-function-calls */
  function throttle(fn, threshhold, scope) {
    threshhold || (threshhold = 250);
    var last,
        deferTimer;
    return function () {
      var context = scope || this;

      var now = +new Date,
          args = arguments;
      if (last && now < last + threshhold) {
        // hold on to it
        clearTimeout(deferTimer);
        deferTimer = setTimeout(function () {
          last = now;
          fn.apply(context, args);
        }, threshhold);
      } else {
        last = now;
        fn.apply(context, args);
      }
    };
  }
  function imgLazyLoad(params, container) {
    params = params || {};
    this.$container = container ? $(container) : $(window);
    this.dataAttr = params.dataAttr || 'data-src';
    this.node = params.node || 'img';
    this.excludeClass = params.excludeClass || 'loaded';
    this.imgArray = {};

    this._init();
  }

  imgLazyLoad.prototype._init = function(userParams) {
    var that = this;

    this.refreshNode().processImg();
    this.$container.off('.lazyLoad').on('scroll.lazyLoad', throttle(function() {
        that.processImg();
      }, 200)
    );
    return this;
  };

  imgLazyLoad.prototype.refreshNode = function() {
    this.imgArray = Array.prototype.slice.call($(this.node).not('.'+this.excludeClass));
    return this;
  };

  imgLazyLoad.prototype.renewAttr = function(params) {
    for(key in params) {
      if(params.hasOwnProperty(key)) {
        this[key] = params[key];
      }
    }
    this.refreshNode();
    return this;
  };

  imgLazyLoad.prototype.processImg = function() {
    var that = this;

    $.each(this.imgArray, function(index, value) {
      if(that._elementInViewport(value)) {
        that._loadImage(value, function() {
          var index = that.imgArray.indexOf(value);
          if(index > -1)
            that.imgArray.splice(index, 1);
        });
      }
    });
    return this;
  };

  imgLazyLoad.prototype._loadImage = function(el, fn) {
    var img = new Image(),
        src = el.getAttribute(this.dataAttr),
        that = this;
    img.onload = function() {
      $(el).attr('src', src).addClass(that.excludeClass).hide().fadeIn();
      fn? fn() : null;
    }
    img.src = src;
  };

  imgLazyLoad.prototype._elementInViewport = function(el) {
    var rect = el.getBoundingClientRect();

    return (
       rect.top    >= 0
    && rect.left   >= 0
    && rect.top <= (window.innerHeight || document.documentElement.clientHeight)
    );
  };

  $.fn.imgLazyLoad = function(params) {
    return new imgLazyLoad(params, this);
  };
})();