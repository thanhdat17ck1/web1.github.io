!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){function i(){var b,c,d={height:f.innerHeight,width:f.innerWidth};return d.height||(b=e.compatMode,(b||!a.support.boxModel)&&(c="CSS1Compat"===b?g:e.body,d={height:c.clientHeight,width:c.clientWidth})),d}function j(){return{top:f.pageYOffset||g.scrollTop||e.body.scrollTop,left:f.pageXOffset||g.scrollLeft||e.body.scrollLeft}}function k(){if(b.length){var e=0,f=a.map(b,function(a){var b=a.data.selector,c=a.$element;return b?c.find(b):c});for(c=c||i(),d=d||j();e<b.length;e++)if(a.contains(g,f[e][0])){var h=a(f[e]),k={height:h[0].offsetHeight,width:h[0].offsetWidth},l=h.offset(),m=h.data("inview");if(!d||!c)return;l.top+k.height>d.top&&l.top<d.top+c.height&&l.left+k.width>d.left&&l.left<d.left+c.width?m||h.data("inview",!0).trigger("inview",[!0]):m&&h.data("inview",!1).trigger("inview",[!1])}}}var c,d,h,b=[],e=document,f=window,g=e.documentElement;a.event.special.inview={add:function(c){b.push({data:c,$element:a(this),element:this}),!h&&b.length&&(h=setInterval(k,250))},remove:function(a){for(var c=0;c<b.length;c++){var d=b[c];if(d.element===this&&d.data.guid===a.guid){b.splice(c,1);break}}b.length||(clearInterval(h),h=null)}},a(f).on("scroll resize scrollstop",function(){c=d=null}),!g.addEventListener&&g.attachEvent&&g.attachEvent("onfocusin",function(){d=null})});

//要素のMoveUpとFade
$(".MoveUp").on("inview", function (event, isInView, visiblePartX, visiblePartY) {//
	if (isInView) {
		$(this).stop().addClass("MoveUpDone");
	}
});

//要素のMoveRightとFade
$(".MoveRight").on("inview", function (event, isInView, visiblePartX, visiblePartY) {//
	if (isInView) {
		$(this).stop().addClass("MoveRightDone");
	}
});

//要素のMoveLeftとFade
$(".MoveLeft").on("inview", function (event, isInView, visiblePartX, visiblePartY) {//
	if (isInView) {
		$(this).stop().addClass("MoveLeftDone");
	}
});

//ズームイン表示
$(".ZoomIn").on("inview", function (event, isInView, visiblePartX, visiblePartY) {//
	if (isInView) {
		$(this).stop().addClass("ZoomInDone");
	}
});

//フェードイン表示
$(".FadeIn").on("inview", function (event, isInView, visiblePartX, visiblePartY) {//
	if (isInView) {
		$(this).stop().addClass("FadeInDone");
	}
});

//要素のカバー（色はCSSで設定）
$(".CoverInview").on("inview", function (c, b, a, d) {
	if (b) {
		$(this).stop().addClass("CoverInviewDone");
	}
});


/*! npm.im/object-fit-images 3.2.4 */
var objectFitImages = (function () {
  'use strict';

  var OFI = 'fregante:object-fit-images';
  var propRegex = /(object-fit|object-position)\s*:\s*([-.\w\s%]+)/g;
  var testImg = typeof Image === 'undefined' ? {style: {'object-position': 1}} : new Image();
  var supportsObjectFit = 'object-fit' in testImg.style;
  var supportsObjectPosition = 'object-position' in testImg.style;
  var supportsOFI = 'background-size' in testImg.style;
  var supportsCurrentSrc = typeof testImg.currentSrc === 'string';
  var nativeGetAttribute = testImg.getAttribute;
  var nativeSetAttribute = testImg.setAttribute;
  var autoModeEnabled = false;

  function createPlaceholder(w, h) {
    return ("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" + w + "' height='" + h + "'%3E%3C/svg%3E");
  }

  function polyfillCurrentSrc(el) {
    if (el.srcset && !supportsCurrentSrc && window.picturefill) {
      var pf = window.picturefill._;
      // parse srcset with picturefill where currentSrc isn't available
      if (!el[pf.ns] || !el[pf.ns].evaled) {
        // force synchronous srcset parsing
        pf.fillImg(el, {reselect: true});
      }

      if (!el[pf.ns].curSrc) {
        // force picturefill to parse srcset
        el[pf.ns].supported = false;
        pf.fillImg(el, {reselect: true});
      }

      // retrieve parsed currentSrc, if any
      el.currentSrc = el[pf.ns].curSrc || el.src;
    }
  }

  function getStyle(el) {
    var style = getComputedStyle(el).fontFamily;
    var parsed;
    var props = {};
    while ((parsed = propRegex.exec(style)) !== null) {
      props[parsed[1]] = parsed[2];
    }
    return props;
  }

  function setPlaceholder(img, width, height) {
    // Default: fill width, no height
    var placeholder = createPlaceholder(width || 1, height || 0);

    // Only set placeholder if it's different
    if (nativeGetAttribute.call(img, 'src') !== placeholder) {
      nativeSetAttribute.call(img, 'src', placeholder);
    }
  }

  function onImageReady(img, callback) {
    // naturalWidth is only available when the image headers are loaded,
    // this loop will poll it every 100ms.
    if (img.naturalWidth) {
      callback(img);
    } else {
      setTimeout(onImageReady, 100, img, callback);
    }
  }

  function fixOne(el) {
    var style = getStyle(el);
    var ofi = el[OFI];
    style['object-fit'] = style['object-fit'] || 'fill'; // default value

    // Avoid running where unnecessary, unless OFI had already done its deed
    if (!ofi.img) {
      // fill is the default behavior so no action is necessary
      if (style['object-fit'] === 'fill') {
        return;
      }

      // Where object-fit is supported and object-position isn't (Safari < 10)
      if (
        !ofi.skipTest && // unless user wants to apply regardless of browser support
        supportsObjectFit && // if browser already supports object-fit
        !style['object-position'] // unless object-position is used
      ) {
        return;
      }
    }

    // keep a clone in memory while resetting the original to a blank
    if (!ofi.img) {
      ofi.img = new Image(el.width, el.height);
      ofi.img.srcset = nativeGetAttribute.call(el, "data-ofi-srcset") || el.srcset;
      ofi.img.src = nativeGetAttribute.call(el, "data-ofi-src") || el.src;

      // preserve for any future cloneNode calls
      // https://github.com/fregante/object-fit-images/issues/53
      nativeSetAttribute.call(el, "data-ofi-src", el.src);
      if (el.srcset) {
        nativeSetAttribute.call(el, "data-ofi-srcset", el.srcset);
      }

      setPlaceholder(el, el.naturalWidth || el.width, el.naturalHeight || el.height);

      // remove srcset because it overrides src
      if (el.srcset) {
        el.srcset = '';
      }
      try {
        keepSrcUsable(el);
      } catch (err) {
        if (window.console) {
          console.warn('https://bit.ly/ofi-old-browser');
        }
      }
    }

    polyfillCurrentSrc(ofi.img);

    el.style.backgroundImage = "url(\"" + ((ofi.img.currentSrc || ofi.img.src).replace(/"/g, '\\"')) + "\")";
    el.style.backgroundPosition = style['object-position'] || 'center';
    el.style.backgroundRepeat = 'no-repeat';
    el.style.backgroundOrigin = 'content-box';

    if (/scale-down/.test(style['object-fit'])) {
      onImageReady(ofi.img, function () {
        if (ofi.img.naturalWidth > el.width || ofi.img.naturalHeight > el.height) {
          el.style.backgroundSize = 'contain';
        } else {
          el.style.backgroundSize = 'auto';
        }
      });
    } else {
      el.style.backgroundSize = style['object-fit'].replace('none', 'auto').replace('fill', '100% 100%');
    }

    onImageReady(ofi.img, function (img) {
      setPlaceholder(el, img.naturalWidth, img.naturalHeight);
    });
  }

  function keepSrcUsable(el) {
    var descriptors = {
      get: function get(prop) {
        return el[OFI].img[prop ? prop : 'src'];
      },
      set: function set(value, prop) {
        el[OFI].img[prop ? prop : 'src'] = value;
        nativeSetAttribute.call(el, ("data-ofi-" + prop), value); // preserve for any future cloneNode
        fixOne(el);
        return value;
      }
    };
    Object.defineProperty(el, 'src', descriptors);
    Object.defineProperty(el, 'currentSrc', {
      get: function () { return descriptors.get('currentSrc'); }
    });
    Object.defineProperty(el, 'srcset', {
      get: function () { return descriptors.get('srcset'); },
      set: function (ss) { return descriptors.set(ss, 'srcset'); }
    });
  }

  function hijackAttributes() {
    function getOfiImageMaybe(el, name) {
      return el[OFI] && el[OFI].img && (name === 'src' || name === 'srcset') ? el[OFI].img : el;
    }
    if (!supportsObjectPosition) {
      HTMLImageElement.prototype.getAttribute = function (name) {
        return nativeGetAttribute.call(getOfiImageMaybe(this, name), name);
      };

      HTMLImageElement.prototype.setAttribute = function (name, value) {
        return nativeSetAttribute.call(getOfiImageMaybe(this, name), name, String(value));
      };
    }
  }

  function fix(imgs, opts) {
    var startAutoMode = !autoModeEnabled && !imgs;
    opts = opts || {};
    imgs = imgs || 'img';

    if ((supportsObjectPosition && !opts.skipTest) || !supportsOFI) {
      return false;
    }

    // use imgs as a selector or just select all images
    if (imgs === 'img') {
      imgs = document.getElementsByTagName('img');
    } else if (typeof imgs === 'string') {
      imgs = document.querySelectorAll(imgs);
    } else if (!('length' in imgs)) {
      imgs = [imgs];
    }

    // apply fix to all
    for (var i = 0; i < imgs.length; i++) {
      imgs[i][OFI] = imgs[i][OFI] || {
        skipTest: opts.skipTest
      };
      fixOne(imgs[i]);
    }

    if (startAutoMode) {
      document.body.addEventListener('load', function (e) {
        if (e.target.tagName === 'IMG') {
          fix(e.target, {
            skipTest: opts.skipTest
          });
        }
      }, true);
      autoModeEnabled = true;
      imgs = 'img'; // reset to a generic selector for watchMQ
    }

    // if requested, watch media queries for object-fit change
    if (opts.watchMQ) {
      window.addEventListener('resize', fix.bind(null, imgs, {
        skipTest: opts.skipTest
      }));
    }
  }

  fix.supportsObjectFit = supportsObjectFit;
  fix.supportsObjectPosition = supportsObjectPosition;

  hijackAttributes();

  return fix;

}());

$(document).ready(function(){
  objectFitImages();
});
