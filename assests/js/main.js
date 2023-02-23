if (
  navigator.userAgent.match(/MSIE|Internet Explorer/i) ||
  navigator.userAgent.match(/Trident\/7\..*?rv:11/i)
) {
  var href = document.location.href;
  if (!href.match(/[?&]nowprocket/)) {
    if (href.indexOf("?") == -1) {
      if (href.indexOf("#") == -1) {
        document.location.href = href + "?nowprocket=1";
      } else {
        document.location.href = href.replace("#", "?nowprocket=1#");
      }
    } else {
      if (href.indexOf("#") == -1) {
        document.location.href = href + "&nowprocket=1";
      } else {
        document.location.href = href.replace("#", "&nowprocket=1#");
      }
    }
  }
}

class RocketLazyLoadScripts {
  constructor() {
    (this.triggerEvents = [
      "keydown",
      "mousedown",
      "mousemove",
      "touchmove",
      "touchstart",
      "touchend",
      "wheel",
    ]),
      (this.userEventHandler = this._triggerListener.bind(this)),
      (this.touchStartHandler = this._onTouchStart.bind(this)),
      (this.touchMoveHandler = this._onTouchMove.bind(this)),
      (this.touchEndHandler = this._onTouchEnd.bind(this)),
      (this.clickHandler = this._onClick.bind(this)),
      (this.interceptedClicks = []),
      window.addEventListener("pageshow", (e) => {
        this.persisted = e.persisted;
      }),
      window.addEventListener("DOMContentLoaded", () => {
        this._preconnect3rdParties();
      }),
      (this.delayedScripts = { normal: [], async: [], defer: [] }),
      (this.allJQueries = []);
  }
  _addUserInteractionListener(e) {
    document.hidden
      ? e._triggerListener()
      : (this.triggerEvents.forEach((t) =>
          window.addEventListener(t, e.userEventHandler, { passive: !0 })
        ),
        window.addEventListener("touchstart", e.touchStartHandler, {
          passive: !0,
        }),
        window.addEventListener("mousedown", e.touchStartHandler),
        document.addEventListener("visibilitychange", e.userEventHandler));
  }
  _removeUserInteractionListener() {
    this.triggerEvents.forEach((e) =>
      window.removeEventListener(e, this.userEventHandler, {
        passive: !0,
      })
    ),
      document.removeEventListener("visibilitychange", this.userEventHandler);
  }
  _onTouchStart(e) {
    "HTML" !== e.target.tagName &&
      (window.addEventListener("touchend", this.touchEndHandler),
      window.addEventListener("mouseup", this.touchEndHandler),
      window.addEventListener("touchmove", this.touchMoveHandler, {
        passive: !0,
      }),
      window.addEventListener("mousemove", this.touchMoveHandler),
      e.target.addEventListener("click", this.clickHandler),
      this._renameDOMAttribute(e.target, "onclick", "rocket-onclick"));
  }
  _onTouchMove(e) {
    window.removeEventListener("touchend", this.touchEndHandler),
      window.removeEventListener("mouseup", this.touchEndHandler),
      window.removeEventListener("touchmove", this.touchMoveHandler, {
        passive: !0,
      }),
      window.removeEventListener("mousemove", this.touchMoveHandler),
      e.target.removeEventListener("click", this.clickHandler),
      this._renameDOMAttribute(e.target, "rocket-onclick", "onclick");
  }
  _onTouchEnd(e) {
    window.removeEventListener("touchend", this.touchEndHandler),
      window.removeEventListener("mouseup", this.touchEndHandler),
      window.removeEventListener("touchmove", this.touchMoveHandler, {
        passive: !0,
      }),
      window.removeEventListener("mousemove", this.touchMoveHandler);
  }
  _onClick(e) {
    e.target.removeEventListener("click", this.clickHandler),
      this._renameDOMAttribute(e.target, "rocket-onclick", "onclick"),
      this.interceptedClicks.push(e),
      e.preventDefault(),
      e.stopPropagation(),
      e.stopImmediatePropagation();
  }
  _replayClicks() {
    window.removeEventListener("touchstart", this.touchStartHandler, {
      passive: !0,
    }),
      window.removeEventListener("mousedown", this.touchStartHandler),
      this.interceptedClicks.forEach((e) => {
        e.target.dispatchEvent(
          new MouseEvent("click", {
            view: e.view,
            bubbles: !0,
            cancelable: !0,
          })
        );
      });
  }
  _renameDOMAttribute(e, t, n) {
    e.hasAttribute &&
      e.hasAttribute(t) &&
      (event.target.setAttribute(n, event.target.getAttribute(t)),
      event.target.removeAttribute(t));
  }
  _triggerListener() {
    this._removeUserInteractionListener(this),
      "loading" === document.readyState
        ? document.addEventListener(
            "DOMContentLoaded",
            this._loadEverythingNow.bind(this)
          )
        : this._loadEverythingNow();
  }
  _preconnect3rdParties() {
    let e = [];
    document
      .querySelectorAll("script[type=rocketlazyloadscript]")
      .forEach((t) => {
        if (t.hasAttribute("src")) {
          const n = new URL(t.src).origin;
          n !== location.origin &&
            e.push({
              src: n,
              crossOrigin:
                t.crossOrigin ||
                "module" === t.getAttribute("data-rocket-type"),
            });
        }
      }),
      (e = [...new Map(e.map((e) => [JSON.stringify(e), e])).values()]),
      this._batchInjectResourceHints(e, "preconnect");
  }
  async _loadEverythingNow() {
    (this.lastBreath = Date.now()),
      this._delayEventListeners(),
      this._delayJQueryReady(this),
      this._handleDocumentWrite(),
      this._registerAllDelayedScripts(),
      this._preloadAllScripts(),
      await this._loadScriptsFromList(this.delayedScripts.normal),
      await this._loadScriptsFromList(this.delayedScripts.defer),
      await this._loadScriptsFromList(this.delayedScripts.async);
    try {
      await this._triggerDOMContentLoaded(), await this._triggerWindowLoad();
    } catch (e) {}
    window.dispatchEvent(new Event("rocket-allScriptsLoaded")),
      this._replayClicks();
  }
  _registerAllDelayedScripts() {
    document
      .querySelectorAll("script[type=rocketlazyloadscript]")
      .forEach((e) => {
        e.hasAttribute("src")
          ? e.hasAttribute("async") && !1 !== e.async
            ? this.delayedScripts.async.push(e)
            : (e.hasAttribute("defer") && !1 !== e.defer) ||
              "module" === e.getAttribute("data-rocket-type")
            ? this.delayedScripts.defer.push(e)
            : this.delayedScripts.normal.push(e)
          : this.delayedScripts.normal.push(e);
      });
  }
  async _transformScript(e) {
    return (
      await this._littleBreath(),
      new Promise((t) => {
        const n = document.createElement("script");
        [...e.attributes].forEach((e) => {
          let t = e.nodeName;
          "type" !== t &&
            ("data-rocket-type" === t && (t = "type"),
            n.setAttribute(t, e.nodeValue));
        }),
          e.hasAttribute("src")
            ? (n.addEventListener("load", t), n.addEventListener("error", t))
            : ((n.text = e.text), t());
        try {
          e.parentNode.replaceChild(n, e);
        } catch (e) {
          t();
        }
      })
    );
  }
  async _loadScriptsFromList(e) {
    const t = e.shift();
    return t
      ? (await this._transformScript(t), this._loadScriptsFromList(e))
      : Promise.resolve();
  }
  _preloadAllScripts() {
    this._batchInjectResourceHints(
      [
        ...this.delayedScripts.normal,
        ...this.delayedScripts.defer,
        ...this.delayedScripts.async,
      ],
      "preload"
    );
  }
  _batchInjectResourceHints(e, t) {
    var n = document.createDocumentFragment();
    e.forEach((e) => {
      if (e.src) {
        const i = document.createElement("link");
        (i.href = e.src),
          (i.rel = t),
          "preconnect" !== t && (i.as = "script"),
          e.getAttribute &&
            "module" === e.getAttribute("data-rocket-type") &&
            (i.crossOrigin = !0),
          e.crossOrigin && (i.crossOrigin = e.crossOrigin),
          n.appendChild(i);
      }
    }),
      document.head.appendChild(n);
  }
  _delayEventListeners() {
    let e = {};
    function t(t, n) {
      !(function (t) {
        function n(n) {
          return e[t].eventsToRewrite.indexOf(n) >= 0 ? "rocket-" + n : n;
        }
        e[t] ||
          ((e[t] = {
            originalFunctions: {
              add: t.addEventListener,
              remove: t.removeEventListener,
            },
            eventsToRewrite: [],
          }),
          (t.addEventListener = function () {
            (arguments[0] = n(arguments[0])),
              e[t].originalFunctions.add.apply(t, arguments);
          }),
          (t.removeEventListener = function () {
            (arguments[0] = n(arguments[0])),
              e[t].originalFunctions.remove.apply(t, arguments);
          }));
      })(t),
        e[t].eventsToRewrite.push(n);
    }
    function n(e, t) {
      let n = e[t];
      Object.defineProperty(e, t, {
        get: () => n || function () {},
        set(i) {
          e["rocket" + t] = n = i;
        },
      });
    }
    t(document, "DOMContentLoaded"),
      t(window, "DOMContentLoaded"),
      t(window, "load"),
      t(window, "pageshow"),
      t(document, "readystatechange"),
      n(document, "onreadystatechange"),
      n(window, "onload"),
      n(window, "onpageshow");
  }
  _delayJQueryReady(e) {
    let t = window.jQuery;
    Object.defineProperty(window, "jQuery", {
      get: () => t,
      set(n) {
        if (n && n.fn && !e.allJQueries.includes(n)) {
          n.fn.ready = n.fn.init.prototype.ready = function (t) {
            e.domReadyFired
              ? t.bind(document)(n)
              : document.addEventListener("rocket-DOMContentLoaded", () =>
                  t.bind(document)(n)
                );
          };
          const t = n.fn.on;
          (n.fn.on = n.fn.init.prototype.on =
            function () {
              if (this[0] === window) {
                function e(e) {
                  return e
                    .split(" ")
                    .map((e) =>
                      "load" === e || 0 === e.indexOf("load.")
                        ? "rocket-jquery-load"
                        : e
                    )
                    .join(" ");
                }
                "string" == typeof arguments[0] ||
                arguments[0] instanceof String
                  ? (arguments[0] = e(arguments[0]))
                  : "object" == typeof arguments[0] &&
                    Object.keys(arguments[0]).forEach((t) => {
                      delete Object.assign(arguments[0], {
                        [e(t)]: arguments[0][t],
                      })[t];
                    });
              }
              return t.apply(this, arguments), this;
            }),
            e.allJQueries.push(n);
        }
        t = n;
      },
    });
  }
  async _triggerDOMContentLoaded() {
    (this.domReadyFired = !0),
      await this._littleBreath(),
      document.dispatchEvent(new Event("rocket-DOMContentLoaded")),
      await this._littleBreath(),
      window.dispatchEvent(new Event("rocket-DOMContentLoaded")),
      await this._littleBreath(),
      document.dispatchEvent(new Event("rocket-readystatechange")),
      await this._littleBreath(),
      document.rocketonreadystatechange && document.rocketonreadystatechange();
  }
  async _triggerWindowLoad() {
    await this._littleBreath(),
      window.dispatchEvent(new Event("rocket-load")),
      await this._littleBreath(),
      window.rocketonload && window.rocketonload(),
      await this._littleBreath(),
      this.allJQueries.forEach((e) => e(window).trigger("rocket-jquery-load")),
      await this._littleBreath();
    const e = new Event("rocket-pageshow");
    (e.persisted = this.persisted),
      window.dispatchEvent(e),
      await this._littleBreath(),
      window.rocketonpageshow &&
        window.rocketonpageshow({ persisted: this.persisted });
  }
  _handleDocumentWrite() {
    const e = new Map();
    document.write = document.writeln = function (t) {
      const n = document.currentScript,
        i = document.createRange(),
        r = n.parentElement;
      let o = e.get(n);
      void 0 === o && ((o = n.nextSibling), e.set(n, o));
      const s = document.createDocumentFragment();
      i.setStart(s, 0),
        s.appendChild(i.createContextualFragment(t)),
        r.insertBefore(s, o);
    };
  }
  async _littleBreath() {
    Date.now() - this.lastBreath > 45 &&
      (await this._requestAnimFrame(), (this.lastBreath = Date.now()));
  }
  async _requestAnimFrame() {
    return document.hidden
      ? new Promise((e) => setTimeout(e))
      : new Promise((e) => requestAnimationFrame(e));
  }
  static run() {
    const e = new RocketLazyLoadScripts();
    e._addUserInteractionListener(e);
  }
}
RocketLazyLoadScripts.run();

("use strict");
var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      (descriptor.enumerable = descriptor.enumerable || !1),
        (descriptor.configurable = !0),
        "value" in descriptor && (descriptor.writable = !0),
        Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    return (
      protoProps && defineProperties(Constructor.prototype, protoProps),
      staticProps && defineProperties(Constructor, staticProps),
      Constructor
    );
  };
})();
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
var RocketBrowserCompatibilityChecker = (function () {
  function RocketBrowserCompatibilityChecker(options) {
    _classCallCheck(this, RocketBrowserCompatibilityChecker),
      (this.passiveSupported = !1),
      this._checkPassiveOption(this),
      (this.options = !!this.passiveSupported && options);
  }
  return (
    _createClass(RocketBrowserCompatibilityChecker, [
      {
        key: "_checkPassiveOption",
        value: function (self) {
          try {
            var options = {
              get passive() {
                return !(self.passiveSupported = !0);
              },
            };
            window.addEventListener("test", null, options),
              window.removeEventListener("test", null, options);
          } catch (err) {
            self.passiveSupported = !1;
          }
        },
      },
      {
        key: "initRequestIdleCallback",
        value: function () {
          !1 in window &&
            (window.requestIdleCallback = function (cb) {
              var start = Date.now();
              return setTimeout(function () {
                cb({
                  didTimeout: !1,
                  timeRemaining: function () {
                    return Math.max(0, 50 - (Date.now() - start));
                  },
                });
              }, 1);
            }),
            !1 in window &&
              (window.cancelIdleCallback = function (id) {
                return clearTimeout(id);
              });
        },
      },
      {
        key: "isDataSaverModeOn",
        value: function () {
          return (
            "connection" in navigator && !0 === navigator.connection.saveData
          );
        },
      },
      {
        key: "supportsLinkPrefetch",
        value: function () {
          var elem = document.createElement("link");
          return (
            elem.relList &&
            elem.relList.supports &&
            elem.relList.supports("prefetch") &&
            window.IntersectionObserver &&
            "isIntersecting" in IntersectionObserverEntry.prototype
          );
        },
      },
      {
        key: "isSlowConnection",
        value: function () {
          return (
            "connection" in navigator &&
            "effectiveType" in navigator.connection &&
            ("2g" === navigator.connection.effectiveType ||
              "slow-2g" === navigator.connection.effectiveType)
          );
        },
      },
    ]),
    RocketBrowserCompatibilityChecker
  );
})();

/* <![CDATA[ */ var RocketPreloadLinksConfig = {
  excludeUris:
    "/(?:.+/)?feed(?:/(?:.+/?)?)?$|/(?:.+/)?embed/|/(index\\.php/)?wp\\-json(/.*|$)|/wp-admin/|/logout/|/wp-login.php|/refer/|/go/|/recommend/|/recommends/",
  usesTrailingSlash: "1",
  imageExt: "jpg|jpeg|gif|png|tiff|bmp|webp|avif|pdf|doc|docx|xls|xlsx|php",
  fileExt:
    "jpg|jpeg|gif|png|tiff|bmp|webp|avif|pdf|doc|docx|xls|xlsx|php|html|htm",
  siteUrl: "https://www.silvertouch.com",
  onHoverDelay: "100",
  rateThrottle: "3",
}; /* ]]> */

(function () {
  "use strict";
  var r =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          },
    e = (function () {
      function i(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          (i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            "value" in i && (i.writable = !0),
            Object.defineProperty(e, i.key, i);
        }
      }
      return function (e, t, n) {
        return t && i(e.prototype, t), n && i(e, n), e;
      };
    })();
  function i(e, t) {
    if (!(e instanceof t))
      throw new TypeError("Cannot call a class as a function");
  }
  var t = (function () {
    function n(e, t) {
      i(this, n),
        (this.browser = e),
        (this.config = t),
        (this.options = this.browser.options),
        (this.prefetched = new Set()),
        (this.eventTime = null),
        (this.threshold = 1111),
        (this.numOnHover = 0);
    }
    return (
      e(
        n,
        [
          {
            key: "init",
            value: function () {
              !this.browser.supportsLinkPrefetch() ||
                this.browser.isDataSaverModeOn() ||
                this.browser.isSlowConnection() ||
                ((this.regex = {
                  excludeUris: RegExp(this.config.excludeUris, "i"),
                  images: RegExp(".(" + this.config.imageExt + ")$", "i"),
                  fileExt: RegExp(".(" + this.config.fileExt + ")$", "i"),
                }),
                this._initListeners(this));
            },
          },
          {
            key: "_initListeners",
            value: function (e) {
              -1 < this.config.onHoverDelay &&
                document.addEventListener(
                  "mouseover",
                  e.listener.bind(e),
                  e.listenerOptions
                ),
                document.addEventListener(
                  "mousedown",
                  e.listener.bind(e),
                  e.listenerOptions
                ),
                document.addEventListener(
                  "touchstart",
                  e.listener.bind(e),
                  e.listenerOptions
                );
            },
          },
          {
            key: "listener",
            value: function (e) {
              var t = e.target.closest("a"),
                n = this._prepareUrl(t);
              if (null !== n)
                switch (e.type) {
                  case "mousedown":
                  case "touchstart":
                    this._addPrefetchLink(n);
                    break;
                  case "mouseover":
                    this._earlyPrefetch(t, n, "mouseout");
                }
            },
          },
          {
            key: "_earlyPrefetch",
            value: function (t, e, n) {
              var i = this,
                r = setTimeout(function () {
                  if (((r = null), 0 === i.numOnHover))
                    setTimeout(function () {
                      return (i.numOnHover = 0);
                    }, 1e3);
                  else if (i.numOnHover > i.config.rateThrottle) return;
                  i.numOnHover++, i._addPrefetchLink(e);
                }, this.config.onHoverDelay);
              t.addEventListener(
                n,
                function e() {
                  t.removeEventListener(n, e, { passive: !0 }),
                    null !== r && (clearTimeout(r), (r = null));
                },
                { passive: !0 }
              );
            },
          },
          {
            key: "_addPrefetchLink",
            value: function (i) {
              return (
                this.prefetched.add(i.href),
                new Promise(function (e, t) {
                  var n = document.createElement("link");
                  (n.rel = "prefetch"),
                    (n.href = i.href),
                    (n.onload = e),
                    (n.onerror = t),
                    document.head.appendChild(n);
                }).catch(function () {})
              );
            },
          },
          {
            key: "_prepareUrl",
            value: function (e) {
              if (
                null === e ||
                "object" !== (void 0 === e ? "undefined" : r(e)) ||
                !1 in e ||
                -1 === ["http:", "https:"].indexOf(e.protocol)
              )
                return null;
              var t = e.href.substring(0, this.config.siteUrl.length),
                n = this._getPathname(e.href, t),
                i = {
                  original: e.href,
                  protocol: e.protocol,
                  origin: t,
                  pathname: n,
                  href: t + n,
                };
              return this._isLinkOk(i) ? i : null;
            },
          },
          {
            key: "_getPathname",
            value: function (e, t) {
              var n = t ? e.substring(this.config.siteUrl.length) : e;
              return (
                n.startsWith("/") || (n = "/" + n),
                this._shouldAddTrailingSlash(n) ? n + "/" : n
              );
            },
          },
          {
            key: "_shouldAddTrailingSlash",
            value: function (e) {
              return (
                this.config.usesTrailingSlash &&
                !e.endsWith("/") &&
                !this.regex.fileExt.test(e)
              );
            },
          },
          {
            key: "_isLinkOk",
            value: function (e) {
              return (
                null !== e &&
                "object" === (void 0 === e ? "undefined" : r(e)) &&
                !this.prefetched.has(e.href) &&
                e.origin === this.config.siteUrl &&
                -1 === e.href.indexOf("?") &&
                -1 === e.href.indexOf("#") &&
                !this.regex.excludeUris.test(e.href) &&
                !this.regex.images.test(e.href)
              );
            },
          },
        ],
        [
          {
            key: "run",
            value: function () {
              "undefined" != typeof RocketPreloadLinksConfig &&
                new n(
                  new RocketBrowserCompatibilityChecker({
                    capture: !0,
                    passive: !0,
                  }),
                  RocketPreloadLinksConfig
                ).init();
            },
          },
        ]
      ),
      n
    );
  })();
  t.run();
})();
