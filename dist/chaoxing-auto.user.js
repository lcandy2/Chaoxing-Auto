// ==UserScript==
// @name         超兴学习通自动化 ——— Chaoxing Auto
// @namespace    https://github.com/lcandy2/Chaoxing-Auto
// @version      0.9
// @author       lcandy2 (甜檸Cirtron)
// @description  超兴学习通自动化脚本，能自动完成讨论，具备自动完成讨论任务、一键回复指定话题、批量回复和创建话题等功能，让讨论任务变得轻松简单。
// @license      None
// @homepage     https://greasyfork.org/scripts/489933
// @homepageURL  https://github.com/lcandy2/user.js
// @source       https://github.com/lcandy2/user.js
// @match        https://mooc1.chaoxing.com/bbscircle/grouptopic*
// @match        https://mooc1.chaoxing.com/mooc-ans/bbscircle/grouptopic*
// @match        https://mooc1.chaoxing.com/bbscircle/gettopicdetail*
// @match        https://mooc1.chaoxing.com/mooc-ans/bbscircle/gettopicdetail*
// @match        https://groupweb.chaoxing.com/course/topic/topicList*
// @match        https://groupweb.chaoxing.com/course/topic/v3/bbs*
// @require      https://registry.npmmirror.com/react/18.2.0/files/umd/react.production.min.js
// @require      https://registry.npmmirror.com/react-dom/18.2.0/files/umd/react-dom.production.min.js
// @require      https://registry.npmmirror.com/react-draggable/4.4.6/files/build/web/react-draggable.min.js
// @require      https://registry.npmmirror.com/@emotion/react/11.11.4/files/dist/emotion-react.umd.min.js
// @require      https://registry.npmmirror.com/@emotion/styled/11.11.0/files/dist/emotion-styled.umd.min.js
// @require      https://registry.npmmirror.com/@mui/material/5.15.13/files/umd/material-ui.production.min.js
// @grant        GM_addStyle
// @grant        GM_deleteValue
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(t=>{if(typeof GM_addStyle=="function"){GM_addStyle(t);return}const o=document.createElement("style");o.textContent=t,document.head.append(o)})(' .floating-overlay{position:fixed;top:0;left:0;z-index:1001}.floating-overlay .MuiDialog-root{position:static}@font-face{font-family:Material Icons;font-style:normal;font-weight:400;src:url(https://fonts.gstatic.googlefonts.cn/s/materialicons/v141/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2) format("woff2")}.material-icons{font-family:Material Icons;font-weight:400;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased} ');

(function (e, material, R, react, P, M) {
  'use strict';

  function _interopNamespaceDefault(e) {
    const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
    if (e) {
      for (const k in e) {
        if (k !== 'default') {
          const d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: () => e[k]
          });
        }
      }
    }
    n.default = e;
    return Object.freeze(n);
  }

  const e__namespace = /*#__PURE__*/_interopNamespaceDefault(e);

  function I(e) {
      return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
  }

  function B(e) {
      if (e.__esModule) return e;
      var t = e.default;
      if ("function" == typeof t) {
          var r = function e() {
              return this instanceof e ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
          };
          r.prototype = t.prototype;
      } else r = {};
      return Object.defineProperty(r, "__esModule", {
          value: !0
      }), Object.keys(e).forEach((function(t) {
          var n = Object.getOwnPropertyDescriptor(e, t);
          Object.defineProperty(r, t, n.get ? n : {
              enumerable: !0,
              get: function() {
                  return e[t];
              }
          });
      })), r;
  }

  var F = {
      exports: {}
  }, N = {}, L = e, z = Symbol.for("react.element"), D = Symbol.for("react.fragment"), W = Object.prototype.hasOwnProperty, V = L.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, H = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
  };

  function K(e, t, r) {
      var n, o = {}, i = null, a = null;
      for (n in void 0 !== r && (i = "" + r), void 0 !== t.key && (i = "" + t.key), void 0 !== t.ref && (a = t.ref), 
      t) W.call(t, n) && !H.hasOwnProperty(n) && (o[n] = t[n]);
      if (e && e.defaultProps) for (n in t = e.defaultProps) void 0 === o[n] && (o[n] = t[n]);
      return {
          $$typeof: z,
          type: e,
          key: i,
          ref: a,
          props: o,
          _owner: V.current
      };
  }

  N.Fragment = D, N.jsx = K, N.jsxs = K, F.exports = N;

  var q = F.exports;

  const X = new URL("https://mooc1.chaoxing.com/bbscircle/grouptopic"), U = new URL("https://mooc1.chaoxing.com/mooc-ans/bbscircle/grouptopic"), G = new URL("https://mooc1.chaoxing.com/bbscircle/gettopicdetail"), Y = new URL("https://mooc1.chaoxing.com/mooc-ans/bbscircle/gettopicdetail"), J = new URL("https://groupweb.chaoxing.com/course/topic/topicList"), Z = new URL("https://groupweb.chaoxing.com/course/topic/v3/bbs"), Q = "div.topicDetail_detail div.replyBtn", ee = "div.topicDetail_editContainer div.replyEdit textarea", te = "div.replyEditBtnGroup div.addReply", re = "div.oneDiv p.clearfix a.tl1", ne = "div.plDiv div.hfpl textarea", oe = "div.plDiv div.hfpl input.grenBtn", ie = window.location.href, ae = () => ue() || fe(), se = () => de() || pe(), le = () => ue() || de(), ce = () => fe() || pe(), ue = () => {
      const e = J.href;
      return ie.includes(e);
  }, de = () => {
      const e = X.href, t = U.href;
      return ie.includes(e) || ie.includes(t);
  }, fe = () => {
      const e = Z.href;
      return ie.includes(e);
  }, pe = () => {
      const e = G.href, t = Y.href;
      return ie.includes(e) || ie.includes(t);
  };

  var he = {
      BASE_URL: "/",
      MODE: "production",
      DEV: !1,
      PROD: !0,
      SSR: !1
  };

  const me = e => {
      let t;
      const r = new Set, n = (e, n) => {
          const o = "function" == typeof e ? e(t) : e;
          if (!Object.is(o, t)) {
              const e = t;
              t = (null != n ? n : "object" != typeof o || null === o) ? o : Object.assign({}, t, o), 
              r.forEach((r => r(t, e)));
          }
      }, o = () => t, i = {
          setState: n,
          getState: o,
          getInitialState: () => a,
          subscribe: e => (r.add(e), () => r.delete(e)),
          destroy: () => {
              "production" !== (he ? "production" : void 0) && console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."), 
              r.clear();
          }
      }, a = t = e(n, o, i);
      return i;
  };

  var ge = {
      exports: {}
  }, ye = {}, be = {
      exports: {}
  }, ve = {}, xe = e;

  var Se = "function" == typeof Object.is ? Object.is : function(e, t) {
      return e === t && (0 !== e || 1 / e == 1 / t) || e != e && t != t;
  }, we = xe.useState, Ce = xe.useEffect, ke = xe.useLayoutEffect, je = xe.useDebugValue;

  function Ee(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
          var r = t();
          return !Se(e, r);
      } catch (n) {
          return !0;
      }
  }

  var Re = "undefined" == typeof window || void 0 === window.document || void 0 === window.document.createElement ? function(e, t) {
      return t();
  } : function(e, t) {
      var r = t(), n = we({
          inst: {
              value: r,
              getSnapshot: t
          }
      }), o = n[0].inst, i = n[1];
      return ke((function() {
          o.value = r, o.getSnapshot = t, Ee(o) && i({
              inst: o
          });
      }), [ e, r, t ]), Ce((function() {
          return Ee(o) && i({
              inst: o
          }), e((function() {
              Ee(o) && i({
                  inst: o
              });
          }));
      }), [ e ]), je(r), r;
  };

  ve.useSyncExternalStore = void 0 !== xe.useSyncExternalStore ? xe.useSyncExternalStore : Re, 
  be.exports = ve;

  var Oe = be.exports, Te = e, Ae = Oe;

  var $e = "function" == typeof Object.is ? Object.is : function(e, t) {
      return e === t && (0 !== e || 1 / e == 1 / t) || e != e && t != t;
  }, _e = Ae.useSyncExternalStore, Pe = Te.useRef, Me = Te.useEffect, Ie = Te.useMemo, Be = Te.useDebugValue;

  ye.useSyncExternalStoreWithSelector = function(e, t, r, n, o) {
      var i = Pe(null);
      if (null === i.current) {
          var a = {
              hasValue: !1,
              value: null
          };
          i.current = a;
      } else a = i.current;
      i = Ie((function() {
          function e(e) {
              if (!l) {
                  if (l = !0, i = e, e = n(e), void 0 !== o && a.hasValue) {
                      var t = a.value;
                      if (o(t, e)) return s = t;
                  }
                  return s = e;
              }
              if (t = s, $e(i, e)) return t;
              var r = n(e);
              return void 0 !== o && o(t, r) ? t : (i = e, s = r);
          }
          var i, s, l = !1, c = void 0 === r ? null : r;
          return [ function() {
              return e(t());
          }, null === c ? void 0 : function() {
              return e(c());
          } ];
      }), [ t, r, n, o ]);
      var s = _e(e, i[0], i[1]);
      return Me((function() {
          a.hasValue = !0, a.value = s;
      }), [ s ]), Be(s), s;
  }, ge.exports = ye;

  const Fe = I(ge.exports);

  var Ne = {
      BASE_URL: "/",
      MODE: "production",
      DEV: !1,
      PROD: !0,
      SSR: !1
  };

  const {useDebugValue: Le} = e, {useSyncExternalStoreWithSelector: ze} = Fe;

  let De = !1;

  const We = e => e;

  const Ve = e => {
      "production" !== (Ne ? "production" : void 0) && "function" != typeof e && console.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");
      const t = "function" == typeof e ? (e => e ? me(e) : me)(e) : e, r = (e, r) => function(e, t = We, r) {
          "production" !== (Ne ? "production" : void 0) && r && !De && (console.warn("[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"), 
          De = !0);
          const n = ze(e.subscribe, e.getState, e.getServerState || e.getInitialState, t, r);
          return Le(n), n;
      }(t, e, r);
      return Object.assign(r, t), r;
  }, He = e => e ? Ve(e) : Ve;

  var Ke = {
      BASE_URL: "/",
      MODE: "production",
      DEV: !1,
      PROD: !0,
      SSR: !1
  };

  const qe = (e, t) => (...r) => Object.assign({}, e, t(...r));

  function Xe(e, t) {
      let r;
      try {
          r = e();
      } catch (n) {
          return;
      }
      return {
          getItem: e => {
              var n;
              const o = e => null === e ? null : JSON.parse(e, null == t ? void 0 : t.reviver), i = null != (n = r.getItem(e)) ? n : null;
              return i instanceof Promise ? i.then(o) : o(i);
          },
          setItem: (e, n) => r.setItem(e, JSON.stringify(n, null == t ? void 0 : t.replacer)),
          removeItem: e => r.removeItem(e)
      };
  }

  const Ue = e => t => {
      try {
          const r = e(t);
          return r instanceof Promise ? r : {
              then: e => Ue(e)(r),
              catch(e) {
                  return this;
              }
          };
      } catch (r) {
          return {
              then(e) {
                  return this;
              },
              catch: e => Ue(e)(r)
          };
      }
  }, Ge = (e, t) => "getStorage" in t || "serialize" in t || "deserialize" in t ? ("production" !== (Ke ? "production" : void 0) && console.warn("[DEPRECATED] `getStorage`, `serialize` and `deserialize` options are deprecated. Use `storage` option instead."), 
  ((e, t) => (r, n, o) => {
      let i = {
          getStorage: () => localStorage,
          serialize: JSON.stringify,
          deserialize: JSON.parse,
          partialize: e => e,
          version: 0,
          merge: (e, t) => ({
              ...t,
              ...e
          }),
          ...t
      }, a = !1;
      const s = new Set, l = new Set;
      let c;
      try {
          c = i.getStorage();
      } catch (g) {}
      if (!c) return e(((...e) => {
          console.warn(`[zustand persist middleware] Unable to update item '${i.name}', the given storage is currently unavailable.`), 
          r(...e);
      }), n, o);
      const u = Ue(i.serialize), d = () => {
          const e = i.partialize({
              ...n()
          });
          let t;
          const r = u({
              state: e,
              version: i.version
          }).then((e => c.setItem(i.name, e))).catch((e => {
              t = e;
          }));
          if (t) throw t;
          return r;
      }, f = o.setState;
      o.setState = (e, t) => {
          f(e, t), d();
      };
      const p = e(((...e) => {
          r(...e), d();
      }), n, o);
      let h;
      const m = () => {
          var e;
          if (!c) return;
          a = !1, s.forEach((e => e(n())));
          const t = (null == (e = i.onRehydrateStorage) ? void 0 : e.call(i, n())) || void 0;
          return Ue(c.getItem.bind(c))(i.name).then((e => {
              if (e) return i.deserialize(e);
          })).then((e => {
              if (e) {
                  if ("number" != typeof e.version || e.version === i.version) return e.state;
                  if (i.migrate) return i.migrate(e.state, e.version);
                  console.error("State loaded from storage couldn't be migrated since no migrate function was provided");
              }
          })).then((e => {
              var t;
              return h = i.merge(e, null != (t = n()) ? t : p), r(h, !0), d();
          })).then((() => {
              null == t || t(h, void 0), a = !0, l.forEach((e => e(h)));
          })).catch((e => {
              null == t || t(void 0, e);
          }));
      };
      return o.persist = {
          setOptions: e => {
              i = {
                  ...i,
                  ...e
              }, e.getStorage && (c = e.getStorage());
          },
          clearStorage: () => {
              null == c || c.removeItem(i.name);
          },
          getOptions: () => i,
          rehydrate: () => m(),
          hasHydrated: () => a,
          onHydrate: e => (s.add(e), () => {
              s.delete(e);
          }),
          onFinishHydration: e => (l.add(e), () => {
              l.delete(e);
          })
      }, m(), h || p;
  })(e, t)) : ((e, t) => (r, n, o) => {
      let i = {
          storage: Xe((() => localStorage)),
          partialize: e => e,
          version: 0,
          merge: (e, t) => ({
              ...t,
              ...e
          }),
          ...t
      }, a = !1;
      const s = new Set, l = new Set;
      let c = i.storage;
      if (!c) return e(((...e) => {
          console.warn(`[zustand persist middleware] Unable to update item '${i.name}', the given storage is currently unavailable.`), 
          r(...e);
      }), n, o);
      const u = () => {
          const e = i.partialize({
              ...n()
          });
          return c.setItem(i.name, {
              state: e,
              version: i.version
          });
      }, d = o.setState;
      o.setState = (e, t) => {
          d(e, t), u();
      };
      const f = e(((...e) => {
          r(...e), u();
      }), n, o);
      let p;
      o.getInitialState = () => f;
      const h = () => {
          var e, t;
          if (!c) return;
          a = !1, s.forEach((e => {
              var t;
              return e(null != (t = n()) ? t : f);
          }));
          const o = (null == (t = i.onRehydrateStorage) ? void 0 : t.call(i, null != (e = n()) ? e : f)) || void 0;
          return Ue(c.getItem.bind(c))(i.name).then((e => {
              if (e) {
                  if ("number" != typeof e.version || e.version === i.version) return e.state;
                  if (i.migrate) return i.migrate(e.state, e.version);
                  console.error("State loaded from storage couldn't be migrated since no migrate function was provided");
              }
          })).then((e => {
              var t;
              return p = i.merge(e, null != (t = n()) ? t : f), r(p, !0), u();
          })).then((() => {
              null == o || o(p, void 0), p = n(), a = !0, l.forEach((e => e(p)));
          })).catch((e => {
              null == o || o(void 0, e);
          }));
      };
      return o.persist = {
          setOptions: e => {
              i = {
                  ...i,
                  ...e
              }, e.storage && (c = e.storage);
          },
          clearStorage: () => {
              null == c || c.removeItem(i.name);
          },
          getOptions: () => i,
          rehydrate: () => h(),
          hasHydrated: () => a,
          onHydrate: e => (s.add(e), () => {
              s.delete(e);
          }),
          onFinishHydration: e => (l.add(e), () => {
              l.delete(e);
          })
      }, i.skipHydration || h(), p || f;
  })(e, t);

  var Ye = (() => "undefined" != typeof GM_deleteValue ? GM_deleteValue : void 0)(), Je = (() => "undefined" != typeof GM_getValue ? GM_getValue : void 0)(), Ze = (() => "undefined" != typeof GM_setValue ? GM_setValue : void 0)();

  const Qe = {
      getItem: async e => await Je(e) || null,
      setItem: async (e, t) => {
          await Ze(e, t);
      },
      removeItem: async e => {
          await Ye(e);
      }
  }, et = He(qe({
      logItems: []
  }, (e => ({
      addLogItem: t => {
          e((e => ({
              logItems: [ ...e.logItems, t ]
          })));
      }
  })))), tt = He(Ge(qe({
      standbyTime: 200,
      countTimes: 1,
      _hasHydrated: !1
  }, (e => ({
      setStandbyTime: t => {
          e({
              standbyTime: t
          });
      },
      setCountTimes: t => {
          e({
              countTimes: t
          });
      },
      setHasHydrated: t => {
          e({
              _hasHydrated: t
          });
      }
  }))), {
      name: "topic_settings",
      storage: Xe((() => Qe)),
      onRehydrateStorage: () => e => {
          e && e.setHasHydrated(!0);
      }
  })), rt = He(qe({
      currentStatus: null,
      currentPage: null,
      isInActionFrame: !1,
      actionFrameStatus: {},
      topicDetail: {},
      topicList: []
  }, (e => ({
      setCurrentStatus: t => {
          e({
              currentStatus: t
          });
      },
      setCurrentPage: t => {
          e({
              currentPage: t
          });
      },
      setIsInActionFrame: t => {
          e({
              isInActionFrame: t
          });
      },
      setActionFrameStatus: t => {
          e({
              actionFrameStatus: t
          });
      },
      setActionFrameStatusStatus: t => {
          e((e => ({
              actionFrameStatus: {
                  ...e.actionFrameStatus,
                  status: t
              }
          })));
      },
      setActionFrameStatusIndex: t => {
          e((e => ({
              actionFrameStatus: {
                  ...e.actionFrameStatus,
                  index: t
              }
          })));
      },
      setActionFrameStatusTotal: t => {
          e((e => ({
              actionFrameStatus: {
                  ...e.actionFrameStatus,
                  total: t
              }
          })));
      },
      setActionFrameStatusSrc: t => {
          e((e => ({
              actionFrameStatus: {
                  ...e.actionFrameStatus,
                  src: t
              }
          })));
      },
      setTopicDetail: t => {
          e({
              topicDetail: t
          });
      },
      setTopicList: t => {
          e({
              topicList: t
          });
      }
  }))));

  async function nt(e = 1) {
      const t = await tt.getState().standbyTime;
      return new Promise((r => setTimeout(r, t * e)));
  }

  async function ot() {
      const e = fe(), t = pe(), r = et.getState().addLogItem, n = {
          title: void 0,
          content: void 0,
          replies: void 0
      };
      if (e && !t) try {
          const e = document.querySelector(".topicDetail_detail"), t = document.querySelector(".topicDetail_replyList");
          if (!e || !t) return;
          const r = it(e), o = st(e), i = await lt(t);
          n.title = r, n.content = o, n.replies = i;
      } catch (o) {
          console.error(o), r(`获取讨论详情失败：${o}`);
      } else if (t && !e) try {
          const e = document.querySelectorAll("div");
          let t;
          for (let n = 0; n < e.length; n++) if (e[n].className.match(/content\d{4}/)) {
              t = e[n];
              break;
          }
          if (!t) return;
          const r = ct(t), o = ut(t), i = dt(t);
          n.title = r, n.content = o, n.replies = i;
      } catch (o) {
          console.error(o), r(`获取讨论详情失败：${o}`);
      }
      return n;
  }

  const it = e => {
      var t;
      const r = e.querySelector(".topicDetail_title");
      return r ? null == (t = r.textContent) ? void 0 : t.trim() : void 0;
  }, at = e => {
      const t = document.querySelector(".topicDetail_replyList");
      if (!t) return void console.error("Element not found");
      if (t.children.length > 1) return void e();
      const r = new MutationObserver(((t, r) => {
          for (let n of t) "childList" === n.type && e();
      }));
      return r.observe(t, {
          attributes: !1,
          childList: !0,
          subtree: !0
      }), () => r.disconnect();
  }, st = e => {
      const t = e.querySelector(".topicDetail_main");
      if (!t) return;
      return Array.from(t.children).filter((e => !e.classList.contains("topicDetail_info"))).map((e => {
          var t;
          return null == (t = e.textContent) ? void 0 : t.trim();
      })).join(" ");
  }, lt = async e => {
      const t = document.querySelector(".classReplyCount span"), r = Number((null == t ? void 0 : t.textContent) || 0);
      let n = (() => {
          nt(.5);
          return Array.from(e.querySelectorAll(".topicDetail_replyItem")).map((e => {
              var t, r;
              const n = e.querySelector(".author"), o = e.querySelector(".replyContent");
              return {
                  author: n ? null == (t = n.textContent) ? void 0 : t.trim() : "",
                  content: o ? null == (r = o.textContent) ? void 0 : r.trim() : ""
              };
          }));
      })();
      return 0 === r || n.length > 0 ? n : [ {
          content: "NEED_OBSERVE"
      } ];
  }, ct = e => {
      var t;
      const r = e.querySelector(".oneDiv");
      let n;
      if (r) {
          let e = r.querySelector("h3");
          if (e) {
              let r = e.querySelector("em");
              r && r.remove(), n = null == (t = e.textContent) ? void 0 : t.trim();
          }
      }
      return n;
  }, ut = e => {
      var t;
      const r = e.querySelector("#topicContent");
      return r ? null == (t = r.textContent) ? void 0 : t.trim() : void 0;
  }, dt = e => {
      var t, r;
      let n, o = [];
      if (e && e.children.length > 1) {
          n = e.children[1];
          let i = n.querySelectorAll("div");
          for (let e = 0; e < i.length; e++) {
              if (i[e].parentElement !== n) continue;
              let a = {}, s = i[e].querySelector("p > span.name"), l = i[e].querySelector("h3");
              s && (a.author = null == (t = s.textContent) ? void 0 : t.trim()), l && (a.content = null == (r = l.textContent) ? void 0 : r.trim()), 
              a.content && o.push(a);
          }
      }
      return o;
  }, ft = window.location.hash, pt = e => {
      ft.includes(e) || window.history.replaceState(null, "", `${ft}#${e}`);
  }, ht = () => ft.includes("cxauto_start"), mt = () => ft.includes("cxauto_success"), gt = () => ft.includes("cxauto_action"), yt = e => {
      const t = "cxauto_success";
      return e ? `${e}#${t}` : (pt(t), !0);
  }, bt = e => {
      const t = "cxauto_action";
      return e ? `${e}#${t}` : (pt(t), !0);
  }, vt = ae() && !se() ? "new" : se() && !ae() ? "legacy" : null;

  function xt(e) {
      const t = et.getState().addLogItem;
      t("----- 执行失败 -----"), t(e.toString()), t(`-v=${vt}`), console.error(e, vt);
  }

  const St = () => Array.from(document.querySelectorAll("div#showTopics div.content1118")).filter((e => Array.from(e.children).some((e => e.classList.contains("oneRight"))))).map((e => {
      var t, r, n;
      const o = e.querySelector("h3 a"), i = (null == (t = null == o ? void 0 : o.textContent) ? void 0 : t.trim()) || "", a = e.querySelector("p.clearfix");
      return {
          title: i,
          author: (null == (r = null == a ? void 0 : a.children[0].textContent) ? void 0 : r.trim()) || "",
          replyCount: (null == (n = null == a ? void 0 : a.children[1].textContent) ? void 0 : n.trim()) || "",
          url: (null == o ? void 0 : o.getAttribute("href")) || ""
      };
  })), wt = () => Array.from(document.querySelectorAll("div.dataCon ul.dataBody li.dataBody_topic")).map((e => {
      var t, r, n;
      const o = e.querySelector("span.author"), i = (null == (t = null == o ? void 0 : o.textContent) ? void 0 : t.trim()) || "", a = e.querySelector("div.topic_interactive div.comment span"), s = (null == (r = null == a ? void 0 : a.textContent) ? void 0 : r.trim()) || "", l = e.querySelector("a.topicli_link"), c = (null == l ? void 0 : l.getAttribute("href")) || "";
      return {
          title: (null == (n = null == l ? void 0 : l.textContent) ? void 0 : n.trim()) || "",
          author: i,
          replyCount: s,
          url: c
      };
  })), Ct = fe() && !pe() ? "new" : pe() && !fe() ? "legacy" : null, kt = "new" === Ct, jt = et.getState().addLogItem;

  const Et = (e, t) => {
      if (!e.replies) throw new Error("topicDetail.replies is undefined");
      const r = e.replies.map((e => e.content || "")), n = [];
      if (r.length <= t) {
          for (let r = 0; r < t; r++) n.push(e.content || e.title || "");
          return n;
      }
      let o = !0;
      r.length <= t && (o = !1);
      for (let i = 0; i < t; i++) {
          const e = Math.floor(Math.random() * r.length);
          n.push(r[e]), o && r.splice(e, 1);
      }
      return n;
  }, Rt = async e => {
      try {
          const t = document.querySelector(e);
          if (console.log(t, e), !t) throw new Error("无法找到进行回复的按钮。");
          return t.click(), jt("已点击进行回复的按钮，即将继续..."), await nt(.1), !0;
      } catch (t) {
          return xt(t), !1;
      }
  }, Ot = async e => {
      try {
          const t = document.querySelector(e);
          if (!t) throw new Error("无法找到用于回复的文本区域。");
          return t.click(), t.focus(), jt("已找到用于回复的文本区域，等待回复..."), await nt(.1), t;
      } catch (t) {
          xt(t);
      }
  }, Tt = async ({selector: e, textarea: t, contextToReply: r}) => {
      try {
          const n = document.querySelector(e);
          if (!n || !t) throw new Error("Required elements not found.");
          for (let e = 0; e < r.length; e++) t.value = r[e], jt(`Reply ${r[e]} filled, waiting to submit...`), 
          "legacy" === Ct && n.addEventListener("click", (function(e) {
              e.preventDefault();
          })), await nt(.8), n.click(), t.value = "", e !== r.length - 1 && (await nt(1), 
          jt("Reply submitted, waiting to continue..."));
          return !0;
      } catch (n) {
          xt(n);
      }
  };

  function At({topicDetail: e$1, setCurrentStatus: t, currentStatus: n, setIsButtonDisabled: o}) {
      const {addLogItem: i} = et();
      e.useEffect((() => {
          e$1 && (e$1.title && i(`获取到讨论标题：${e$1.title}`), e$1.content && i(`获取到讨论内容：${e$1.content}`), 
          e$1.replies && i(`获取到讨论回复：共 ${e$1.replies.length} 条`));
      }), [ e$1 ]), e.useEffect((() => {
          const e = async () => {
              const e = await async function() {
                  const {countTimes: e} = tt.getState(), {topicDetail: t} = rt.getState(), r = Et(t, e);
                  console.debug("currentVersion", Ct);
                  try {
                      if (r.length <= 0) throw new Error("未获取到回复评论。");
                      const e = kt ? Q : re, t = kt ? ee : ne, n = kt ? te : oe, o = await Rt(e), i = await Ot(t), a = await Tt({
                          selector: n,
                          textarea: i,
                          contextToReply: r
                      });
                      if (o && i && a) return !0;
                  } catch (n) {
                      return xt(n), !1;
                  }
              }();
              t(e ? "success" : "failed");
          };
          switch (n) {
            case "running":
            default:
              o(!0);
              break;

            case "triggered":
              o(!0), t("running"), e();
              break;

            case "success":
              o(!1), yt(), i("All done!");
              break;

            case "idle":
            case "failed":
              o(!1);
          }
      }), [ n ]);
  }

  const $t = ({setCurrentStatus: e}) => async () => {
      e("triggered");
  }, _t = () => {
      console.debug("PostMessageSuccess"), window.parent.postMessage({
          type: "cxauto_action_frame",
          status: "success"
      }, "*");
  }, Pt = () => {
      window.addEventListener("message", (e => {
          if ("cxauto_action_frame" === e.data.type) {
              const t = rt.getState().actionFrameStatus.status;
              "success" === e.data.status && "running" === t && rt.getState().setActionFrameStatusStatus("success");
          }
      }));
  }, Mt = rt.getState().setActionFrameStatusStatus, It = rt.getState().setActionFrameStatusIndex, Bt = rt.getState().setActionFrameStatusTotal, Ft = rt.getState().setActionFrameStatusSrc, Nt = et.getState().addLogItem;

  const Lt = () => {
      const {topicList: e} = rt.getState();
      return e.length, It(0), Bt(e.length), Ft(""), !0;
  }, zt = async (e, t) => (Ft(""), e === t - 1 || (It(e + 1), nt(.5), Mt("waitingToStart"), 
  !1));

  function Dt() {
      const {currentPage: e$1, setCurrentPage: t} = rt(), {topicDetail: o, setTopicDetail: i} = rt(), {topicList: a, setTopicList: s} = rt(), {currentStatus: f, setCurrentStatus: p} = rt(), {isInActionFrame: h, setIsInActionFrame: m} = rt(), [g, y] = e.useState(!0), {addLogItem: b} = et(), {actionFrameStatus: v, setActionFrameStatus: x, setActionFrameStatusStatus: S} = rt(), w = v.status;
      e.useEffect((() => {
          const e = mt(), r = gt(), n = ht() || r;
          ce() ? (t("detail"), r && m(!0), n && (e || p("triggered"))) : le() && t("list"), 
          e && p("success");
      }), []), e.useEffect((() => {
          if ("list" === e$1 || "detail" === e$1) {
              let t;
              switch (e$1) {
                case "detail":
                  t = "讨论详情", (async () => {
                      const e = await ot();
                      if (e) if (e.replies && "NEED_OBSERVE" === e.replies[0].content) {
                          let e;
                          console.debug("NEED_OBSERVE"), e = at((async () => {
                              console.log("Replies changed"), e && e();
                              const t = await ot();
                              t && (console.debug("topicDetail", t), i(t), f || p("idle"));
                          }));
                      } else i(e), f || p("idle");
                  })();
                  break;

                case "list":
                  t = "讨论列表";
                  const e = function() {
                      const e = "new" === (ue() && !de() ? "new" : de() && !ue() ? "legacy" : null);
                      try {
                          if (e) {
                              const e = wt();
                              return console.debug("getNewItems", e), e;
                          }
                          {
                              const e = St();
                              return console.debug("getLegacyItems", e), e;
                          }
                      } catch (t) {
                          xt(t);
                      }
                  }();
                  e && (s(e), w || f || S("idle"));
                  break;

                default:
                  t = "未知页面";
              }
              b(`检测到当前为 [${t}]`);
          }
      }), [ e$1 ]), At({
          topicDetail: o,
          setCurrentStatus: p,
          currentStatus: f,
          setIsButtonDisabled: y
      });
      const C = $t({
          setCurrentStatus: p
      });
      e.useEffect((() => {
          a.length && b(`获取到发起的讨论：共 ${a.length} 条`);
      }), [ a ]), e.useEffect((() => {
          h && "success" === f && (console.debug("PostMessageSuccess"), _t());
      }), [ h, f ]);
      return e.useEffect((() => {
          const e = w;
          e && console.debug("PanelActions useEffect actionFrameStatus", v);
          const t = async () => {
              if (e) {
                  const t = await async function(e) {
                      const {actionFrameStatus: t} = rt.getState(), r = t.total, {topicList: n} = rt.getState();
                      console.debug("RunningTopicListReply Status", e), "triggered" === e && (Lt(), Nt("开始：批量回复讨论"), 
                      nt(.1), Mt("waitingToStart"));
                      const o = t.index || 0;
                      try {
                          if ("waitingToStart" === e) {
                              const e = n[o].url;
                              if (e) {
                                  const t = bt(e).toString();
                                  Ft(t), Nt(`正在回复讨论：${n[o].title}`), nt(.1), Pt(), nt(.3), Mt("running");
                              } else xt("未找到讨论链接"), Mt("failed");
                          }
                          if ("failed" === e && Mt("waitingToNext"), "success" === e) {
                              const e = n[o].title;
                              Nt(`已回复讨论：${e}`), nt(.4), Mt("waitingToNext");
                          }
                          const t = r || 0;
                          if ("waitingToNext" === e) return await zt(o, t);
                      } catch (i) {
                          xt(i), Mt("failed");
                      }
                      return !1;
                  }(e);
                  t && S("finished");
              }
          };
          "triggered" === e || "waitingToStart" === e || "waitingToNext" === e || "failed" === e || "success" === e ? (t(), 
          p("running")) : "finished" === e ? p("success") : "idle" === e && p("idle");
      }), [ w ]), q.jsxs(q.Fragment, {
          children: [ g && q.jsx(material.CircularProgress, {
              size: "2em"
          }), "success" === f && "detail" === e$1 && q.jsxs(q.Fragment, {
              children: [ q.jsx(material.Icon, {
                  color: "success",
                  children: "done"
              }), q.jsx(material.Typography, {
                  variant: "body2",
                  children: "已完成"
              }) ]
          }), "failed" === f && q.jsxs(q.Fragment, {
              children: [ q.jsx(material.Icon, {
                  color: "error",
                  children: "error"
              }), q.jsx(material.Typography, {
                  variant: "body2",
                  children: "错误"
              }) ]
          }), "detail" === e$1 && !h && q.jsxs(material.Button, {
              autoFocus: "success" !== f,
              disabled: g,
              onClick: C,
              children: [ ("success" === f || "failed" === f) && "再次", "回复讨论" ]
          }), "list" === e$1 && q.jsxs(q.Fragment, {
              children: [ q.jsx(material.Button, {
                  autoFocus: !0,
                  disabled: !0,
                  children: "批量发起讨论"
              }), q.jsxs(material.Button, {
                  autoFocus: "success" !== f,
                  disabled: g,
                  onClick: async () => {
                      S("triggered");
                  },
                  children: [ "success" === f && q.jsx(material.Icon, {
                      color: "success",
                      children: "done"
                  }), "success" === f || "failed" === f ? "再次批量回复" : "批量回复讨论" ]
              }) ]
          }) ]
      });
  }

  function Wt(e, t) {
      if (null == e) return {};
      var r, n, o = {}, i = Object.keys(e);
      for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) >= 0 || (o[r] = e[r]);
      return o;
  }

  function Vt() {
      return Vt = Object.assign ? Object.assign.bind() : function(e) {
          for (var t = 1; t < arguments.length; t++) {
              var r = arguments[t];
              for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
      }, Vt.apply(this, arguments);
  }

  var Ht, Kt = {
      exports: {}
  }, qt = {}, Xt = Symbol.for("react.element"), Ut = Symbol.for("react.portal"), Gt = Symbol.for("react.fragment"), Yt = Symbol.for("react.strict_mode"), Jt = Symbol.for("react.profiler"), Zt = Symbol.for("react.provider"), Qt = Symbol.for("react.context"), er = Symbol.for("react.server_context"), tr = Symbol.for("react.forward_ref"), rr = Symbol.for("react.suspense"), nr = Symbol.for("react.suspense_list"), or = Symbol.for("react.memo"), ir = Symbol.for("react.lazy"), ar = Symbol.for("react.offscreen");

  function sr(e) {
      if ("object" == typeof e && null !== e) {
          var t = e.$$typeof;
          switch (t) {
            case Xt:
              switch (e = e.type) {
                case Gt:
                case Jt:
                case Yt:
                case rr:
                case nr:
                  return e;

                default:
                  switch (e = e && e.$$typeof) {
                    case er:
                    case Qt:
                    case tr:
                    case ir:
                    case or:
                    case Zt:
                      return e;

                    default:
                      return t;
                  }
              }

            case Ut:
              return t;
          }
      }
  }

  Ht = Symbol.for("react.module.reference"), qt.ContextConsumer = Qt, qt.ContextProvider = Zt, 
  qt.Element = Xt, qt.ForwardRef = tr, qt.Fragment = Gt, qt.Lazy = ir, qt.Memo = or, 
  qt.Portal = Ut, qt.Profiler = Jt, qt.StrictMode = Yt, qt.Suspense = rr, qt.SuspenseList = nr, 
  qt.isAsyncMode = function() {
      return !1;
  }, qt.isConcurrentMode = function() {
      return !1;
  }, qt.isContextConsumer = function(e) {
      return sr(e) === Qt;
  }, qt.isContextProvider = function(e) {
      return sr(e) === Zt;
  }, qt.isElement = function(e) {
      return "object" == typeof e && null !== e && e.$$typeof === Xt;
  }, qt.isForwardRef = function(e) {
      return sr(e) === tr;
  }, qt.isFragment = function(e) {
      return sr(e) === Gt;
  }, qt.isLazy = function(e) {
      return sr(e) === ir;
  }, qt.isMemo = function(e) {
      return sr(e) === or;
  }, qt.isPortal = function(e) {
      return sr(e) === Ut;
  }, qt.isProfiler = function(e) {
      return sr(e) === Jt;
  }, qt.isStrictMode = function(e) {
      return sr(e) === Yt;
  }, qt.isSuspense = function(e) {
      return sr(e) === rr;
  }, qt.isSuspenseList = function(e) {
      return sr(e) === nr;
  }, qt.isValidElementType = function(e) {
      return "string" == typeof e || "function" == typeof e || e === Gt || e === Jt || e === Yt || e === rr || e === nr || e === ar || "object" == typeof e && null !== e && (e.$$typeof === ir || e.$$typeof === or || e.$$typeof === Zt || e.$$typeof === Qt || e.$$typeof === tr || e.$$typeof === Ht || void 0 !== e.getModuleId);
  }, qt.typeOf = sr, Kt.exports = qt;

  var lr = Kt.exports;

  function cr(e) {
      var t, r, n = "";
      if ("string" == typeof e || "number" == typeof e) n += e; else if ("object" == typeof e) if (Array.isArray(e)) {
          var o = e.length;
          for (t = 0; t < o; t++) e[t] && (r = cr(e[t])) && (n && (n += " "), n += r);
      } else for (r in e) e[r] && (n && (n += " "), n += r);
      return n;
  }

  function ur() {
      for (var e, t, r = 0, n = "", o = arguments.length; r < o; r++) (e = arguments[r]) && (t = cr(e)) && (n && (n += " "), 
      n += t);
      return n;
  }

  function dr(e) {
      if ("object" != typeof e || null === e) return !1;
      const t = Object.getPrototypeOf(e);
      return !(null !== t && t !== Object.prototype && null !== Object.getPrototypeOf(t) || Symbol.toStringTag in e || Symbol.iterator in e);
  }

  function fr(e) {
      if (!dr(e)) return e;
      const t = {};
      return Object.keys(e).forEach((r => {
          t[r] = fr(e[r]);
      })), t;
  }

  function pr(e, t, r = {
      clone: !0
  }) {
      const n = r.clone ? Vt({}, e) : e;
      return dr(e) && dr(t) && Object.keys(t).forEach((o => {
          "__proto__" !== o && (dr(t[o]) && o in e && dr(e[o]) ? n[o] = pr(e[o], t[o], r) : r.clone ? n[o] = dr(t[o]) ? fr(t[o]) : t[o] : n[o] = t[o]);
      })), n;
  }

  const hr = Object.freeze(Object.defineProperty({
      __proto__: null,
      default: pr,
      isPlainObject: dr
  }, Symbol.toStringTag, {
      value: "Module"
  }));

  function mr(e) {
      let t = "https://mui.com/production-error/?code=" + e;
      for (let r = 1; r < arguments.length; r += 1) t += "&args[]=" + encodeURIComponent(arguments[r]);
      return "Minified MUI error #" + e + "; visit " + t + " for the full message.";
  }

  const gr = Object.freeze(Object.defineProperty({
      __proto__: null,
      default: mr
  }, Symbol.toStringTag, {
      value: "Module"
  })), yr = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;

  function br(e) {
      const t = `${e}`.match(yr);
      return t && t[1] || "";
  }

  function vr(e, t = "") {
      return e.displayName || e.name || br(e) || t;
  }

  function xr(e, t, r) {
      const n = vr(t);
      return e.displayName || ("" !== n ? `${r}(${n})` : r);
  }

  const Sr = Object.freeze(Object.defineProperty({
      __proto__: null,
      default: function(e) {
          if (null != e) {
              if ("string" == typeof e) return e;
              if ("function" == typeof e) return vr(e, "Component");
              if ("object" == typeof e) switch (e.$$typeof) {
                case lr.ForwardRef:
                  return xr(e, e.render, "ForwardRef");

                case lr.Memo:
                  return xr(e, e.type, "memo");

                default:
                  return;
              }
          }
      },
      getFunctionName: br
  }, Symbol.toStringTag, {
      value: "Module"
  }));

  function wr(e) {
      if ("string" != typeof e) throw new Error(mr(7));
      return e.charAt(0).toUpperCase() + e.slice(1);
  }

  const Cr = Object.freeze(Object.defineProperty({
      __proto__: null,
      default: wr
  }, Symbol.toStringTag, {
      value: "Module"
  }));

  function kr(e, t = 166) {
      let r;
      function n(...n) {
          clearTimeout(r), r = setTimeout((() => {
              e.apply(this, n);
          }), t);
      }
      return n.clear = () => {
          clearTimeout(r);
      }, n;
  }

  function jr(e) {
      return e && e.ownerDocument || document;
  }

  function Er(e) {
      return jr(e).defaultView || window;
  }

  const Rr = "undefined" != typeof window ? e__namespace.useLayoutEffect : e__namespace.useEffect;

  function Or(t) {
      const r = e__namespace.useRef(t);
      return Rr((() => {
          r.current = t;
      })), e__namespace.useRef(((...e) => (0, r.current)(...e))).current;
  }

  function Tr(...t) {
      return e__namespace.useMemo((() => t.every((e => null == e)) ? null : e => {
          t.forEach((t => {
              !function(e, t) {
                  "function" == typeof e ? e(t) : e && (e.current = t);
              }(t, e);
          }));
      }), t);
  }

  const Ar = {};

  const $r = [];

  class _r {
      constructor() {
          this.currentId = null, this.clear = () => {
              null !== this.currentId && (clearTimeout(this.currentId), this.currentId = null);
          }, this.disposeEffect = () => this.clear;
      }
      static create() {
          return new _r;
      }
      start(e, t) {
          this.clear(), this.currentId = setTimeout((() => {
              this.currentId = null, t();
          }), e);
      }
  }

  function Pr() {
      const t = function(t, r) {
          const n = e__namespace.useRef(Ar);
          return n.current === Ar && (n.current = t(r)), n;
      }(_r.create).current;
      var r;
      return r = t.disposeEffect, e__namespace.useEffect(r, $r), t;
  }

  let Mr = !0, Ir = !1;

  const Br = new _r, Fr = {
      text: !0,
      search: !0,
      url: !0,
      tel: !0,
      email: !0,
      password: !0,
      number: !0,
      date: !0,
      month: !0,
      week: !0,
      time: !0,
      datetime: !0,
      "datetime-local": !0
  };

  function Nr(e) {
      e.metaKey || e.altKey || e.ctrlKey || (Mr = !0);
  }

  function Lr() {
      Mr = !1;
  }

  function zr() {
      "hidden" === this.visibilityState && Ir && (Mr = !0);
  }

  function Dr(e) {
      const {target: t} = e;
      try {
          return t.matches(":focus-visible");
      } catch (r) {}
      return Mr || function(e) {
          const {type: t, tagName: r} = e;
          return !("INPUT" !== r || !Fr[t] || e.readOnly) || "TEXTAREA" === r && !e.readOnly || !!e.isContentEditable;
      }(t);
  }

  function Wr() {
      const t = e__namespace.useCallback((e => {
          var t;
          null != e && ((t = e.ownerDocument).addEventListener("keydown", Nr, !0), t.addEventListener("mousedown", Lr, !0), 
          t.addEventListener("pointerdown", Lr, !0), t.addEventListener("touchstart", Lr, !0), 
          t.addEventListener("visibilitychange", zr, !0));
      }), []), r = e__namespace.useRef(!1);
      return {
          isFocusVisibleRef: r,
          onFocus: function(e) {
              return !!Dr(e) && (r.current = !0, !0);
          },
          onBlur: function() {
              return !!r.current && (Ir = !0, Br.start(100, (() => {
                  Ir = !1;
              })), r.current = !1, !0);
          },
          ref: t
      };
  }

  let Vr;

  function Hr() {
      if (Vr) return Vr;
      const e = document.createElement("div"), t = document.createElement("div");
      return t.style.width = "10px", t.style.height = "1px", e.appendChild(t), e.dir = "rtl", 
      e.style.fontSize = "14px", e.style.width = "4px", e.style.height = "1px", e.style.position = "absolute", 
      e.style.top = "-1000px", e.style.overflow = "scroll", document.body.appendChild(e), 
      Vr = "reverse", e.scrollLeft > 0 ? Vr = "default" : (e.scrollLeft = 1, 0 === e.scrollLeft && (Vr = "negative")), 
      document.body.removeChild(e), Vr;
  }

  function Kr(e, t) {
      const r = e.scrollLeft;
      if ("rtl" !== t) return r;
      switch (Hr()) {
        case "negative":
          return e.scrollWidth - e.clientWidth + r;

        case "reverse":
          return e.scrollWidth - e.clientWidth - r;

        default:
          return r;
      }
  }

  function qr(e, t) {
      const r = Vt({}, t);
      return Object.keys(e).forEach((n => {
          if (n.toString().match(/^(components|slots)$/)) r[n] = Vt({}, e[n], r[n]); else if (n.toString().match(/^(componentsProps|slotProps)$/)) {
              const o = e[n] || {}, i = t[n];
              r[n] = {}, i && Object.keys(i) ? o && Object.keys(o) ? (r[n] = Vt({}, i), Object.keys(o).forEach((e => {
                  r[n][e] = qr(o[e], i[e]);
              }))) : r[n] = i : r[n] = o;
          } else void 0 === r[n] && (r[n] = e[n]);
      })), r;
  }

  function Xr(e, t, r = void 0) {
      const n = {};
      return Object.keys(e).forEach((o => {
          n[o] = e[o].reduce(((e, n) => {
              if (n) {
                  const o = t(n);
                  "" !== o && e.push(o), r && r[n] && e.push(r[n]);
              }
              return e;
          }), []).join(" ");
      })), n;
  }

  const Ur = e => e, Gr = (() => {
      let e = Ur;
      return {
          configure(t) {
              e = t;
          },
          generate: t => e(t),
          reset() {
              e = Ur;
          }
      };
  })(), Yr = {
      active: "active",
      checked: "checked",
      completed: "completed",
      disabled: "disabled",
      error: "error",
      expanded: "expanded",
      focused: "focused",
      focusVisible: "focusVisible",
      open: "open",
      readOnly: "readOnly",
      required: "required",
      selected: "selected"
  };

  function Jr(e, t, r = "Mui") {
      const n = Yr[t];
      return n ? `${r}-${n}` : `${Gr.generate(e)}-${t}`;
  }

  function Zr(e, t, r = "Mui") {
      const n = {};
      return t.forEach((t => {
          n[t] = Jr(e, t, r);
      })), n;
  }

  const Qr = Object.freeze(Object.defineProperty({
      __proto__: null,
      default: function(e, t = Number.MIN_SAFE_INTEGER, r = Number.MAX_SAFE_INTEGER) {
          return Math.max(t, Math.min(e, r));
      }
  }, Symbol.toStringTag, {
      value: "Module"
  }));

  function en(e) {
      if (void 0 === e) return {};
      const t = {};
      return Object.keys(e).filter((t => !(t.match(/^on[A-Z]/) && "function" == typeof e[t]))).forEach((r => {
          t[r] = e[r];
      })), t;
  }

  function tn(e) {
      const {getSlotProps: t, additionalProps: r, externalSlotProps: n, externalForwardedProps: o, className: i} = e;
      if (!t) {
          const e = ur(null == r ? void 0 : r.className, i, null == o ? void 0 : o.className, null == n ? void 0 : n.className), t = Vt({}, null == r ? void 0 : r.style, null == o ? void 0 : o.style, null == n ? void 0 : n.style), a = Vt({}, r, o, n);
          return e.length > 0 && (a.className = e), Object.keys(t).length > 0 && (a.style = t), 
          {
              props: a,
              internalRef: void 0
          };
      }
      const a = function(e, t = []) {
          if (void 0 === e) return {};
          const r = {};
          return Object.keys(e).filter((r => r.match(/^on[A-Z]/) && "function" == typeof e[r] && !t.includes(r))).forEach((t => {
              r[t] = e[t];
          })), r;
      }(Vt({}, o, n)), s = en(n), l = en(o), c = t(a), u = ur(null == c ? void 0 : c.className, null == r ? void 0 : r.className, i, null == o ? void 0 : o.className, null == n ? void 0 : n.className), d = Vt({}, null == c ? void 0 : c.style, null == r ? void 0 : r.style, null == o ? void 0 : o.style, null == n ? void 0 : n.style), f = Vt({}, c, r, l, s);
      return u.length > 0 && (f.className = u), Object.keys(d).length > 0 && (f.style = d), 
      {
          props: f,
          internalRef: c.ref
      };
  }

  const rn = [ "elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps" ];

  function nn(e) {
      var t;
      const {elementType: r, externalSlotProps: n, ownerState: o, skipResolvingSlotProps: i = !1} = e, a = Wt(e, rn), s = i ? {} : function(e, t, r) {
          return "function" == typeof e ? e(t, r) : e;
      }(n, o), {props: l, internalRef: c} = tn(Vt({}, a, {
          externalSlotProps: s
      })), u = function(e, t, r) {
          return void 0 === e || "string" == typeof e ? t : Vt({}, t, {
              ownerState: Vt({}, t.ownerState, r)
          });
      }(r, Vt({}, l, {
          ref: Tr(c, null == s ? void 0 : s.ref, null == (t = e.additionalProps) ? void 0 : t.ref)
      }), o);
      return u;
  }

  const on = e__namespace.createContext(), an = () => {
      const t = e__namespace.useContext(on);
      return null != t && t;
  };

  var sn, ln = {}, cn = {
      exports: {}
  };

  (sn = cn).exports = function(e) {
      return e && e.__esModule ? e : {
          default: e
      };
  }, sn.exports.__esModule = !0, sn.exports.default = sn.exports;

  var un, dn = cn.exports, fn = {
      exports: {}
  };

  var pn, hn = {
      exports: {}
  };

  var mn = function() {
      function e(e) {
          var t = this;
          this._insertTag = function(e) {
              var r;
              r = 0 === t.tags.length ? t.insertionPoint ? t.insertionPoint.nextSibling : t.prepend ? t.container.firstChild : t.before : t.tags[t.tags.length - 1].nextSibling, 
              t.container.insertBefore(e, r), t.tags.push(e);
          }, this.isSpeedy = void 0 === e.speedy || e.speedy, this.tags = [], this.ctr = 0, 
          this.nonce = e.nonce, this.key = e.key, this.container = e.container, this.prepend = e.prepend, 
          this.insertionPoint = e.insertionPoint, this.before = null;
      }
      var t = e.prototype;
      return t.hydrate = function(e) {
          e.forEach(this._insertTag);
      }, t.insert = function(e) {
          this.ctr % (this.isSpeedy ? 65e3 : 1) == 0 && this._insertTag(function(e) {
              var t = document.createElement("style");
              return t.setAttribute("data-emotion", e.key), void 0 !== e.nonce && t.setAttribute("nonce", e.nonce), 
              t.appendChild(document.createTextNode("")), t.setAttribute("data-s", ""), t;
          }(this));
          var t = this.tags[this.tags.length - 1];
          if (this.isSpeedy) {
              var r = function(e) {
                  if (e.sheet) return e.sheet;
                  for (var t = 0; t < document.styleSheets.length; t++) if (document.styleSheets[t].ownerNode === e) return document.styleSheets[t];
              }(t);
              try {
                  r.insertRule(e, r.cssRules.length);
              } catch (n) {}
          } else t.appendChild(document.createTextNode(e));
          this.ctr++;
      }, t.flush = function() {
          this.tags.forEach((function(e) {
              return e.parentNode && e.parentNode.removeChild(e);
          })), this.tags = [], this.ctr = 0;
      }, e;
  }(), gn = "-ms-", yn = "-moz-", bn = "-webkit-", vn = "comm", xn = "rule", Sn = "decl", wn = "@keyframes", Cn = Math.abs, kn = String.fromCharCode, jn = Object.assign;

  function En(e) {
      return e.trim();
  }

  function Rn(e, t, r) {
      return e.replace(t, r);
  }

  function On(e, t) {
      return e.indexOf(t);
  }

  function Tn(e, t) {
      return 0 | e.charCodeAt(t);
  }

  function An(e, t, r) {
      return e.slice(t, r);
  }

  function $n(e) {
      return e.length;
  }

  function _n(e) {
      return e.length;
  }

  function Pn(e, t) {
      return t.push(e), e;
  }

  var Mn = 1, In = 1, Bn = 0, Fn = 0, Nn = 0, Ln = "";

  function zn(e, t, r, n, o, i, a) {
      return {
          value: e,
          root: t,
          parent: r,
          type: n,
          props: o,
          children: i,
          line: Mn,
          column: In,
          length: a,
          return: ""
      };
  }

  function Dn(e, t) {
      return jn(zn("", null, null, "", null, null, 0), e, {
          length: -e.length
      }, t);
  }

  function Wn() {
      return Nn = Fn < Bn ? Tn(Ln, Fn++) : 0, In++, 10 === Nn && (In = 1, Mn++), Nn;
  }

  function Vn() {
      return Tn(Ln, Fn);
  }

  function Hn() {
      return Fn;
  }

  function Kn(e, t) {
      return An(Ln, e, t);
  }

  function qn(e) {
      switch (e) {
        case 0:
        case 9:
        case 10:
        case 13:
        case 32:
          return 5;

        case 33:
        case 43:
        case 44:
        case 47:
        case 62:
        case 64:
        case 126:
        case 59:
        case 123:
        case 125:
          return 4;

        case 58:
          return 3;

        case 34:
        case 39:
        case 40:
        case 91:
          return 2;

        case 41:
        case 93:
          return 1;
      }
      return 0;
  }

  function Xn(e) {
      return Mn = In = 1, Bn = $n(Ln = e), Fn = 0, [];
  }

  function Un(e) {
      return Ln = "", e;
  }

  function Gn(e) {
      return En(Kn(Fn - 1, Zn(91 === e ? e + 2 : 40 === e ? e + 1 : e)));
  }

  function Yn(e) {
      for (;(Nn = Vn()) && Nn < 33; ) Wn();
      return qn(e) > 2 || qn(Nn) > 3 ? "" : " ";
  }

  function Jn(e, t) {
      for (;--t && Wn() && !(Nn < 48 || Nn > 102 || Nn > 57 && Nn < 65 || Nn > 70 && Nn < 97); ) ;
      return Kn(e, Hn() + (t < 6 && 32 == Vn() && 32 == Wn()));
  }

  function Zn(e) {
      for (;Wn(); ) switch (Nn) {
        case e:
          return Fn;

        case 34:
        case 39:
          34 !== e && 39 !== e && Zn(Nn);
          break;

        case 40:
          41 === e && Zn(e);
          break;

        case 92:
          Wn();
      }
      return Fn;
  }

  function Qn(e, t) {
      for (;Wn() && e + Nn !== 57 && (e + Nn !== 84 || 47 !== Vn()); ) ;
      return "/*" + Kn(t, Fn - 1) + "*" + kn(47 === e ? e : Wn());
  }

  function eo(e) {
      for (;!qn(Vn()); ) Wn();
      return Kn(e, Fn);
  }

  function to(e) {
      return Un(ro("", null, null, null, [ "" ], e = Xn(e), 0, [ 0 ], e));
  }

  function ro(e, t, r, n, o, i, a, s, l) {
      for (var c = 0, u = 0, d = a, f = 0, p = 0, h = 0, m = 1, g = 1, y = 1, b = 0, v = "", x = o, S = i, w = n, C = v; g; ) switch (h = b, 
      b = Wn()) {
        case 40:
          if (108 != h && 58 == Tn(C, d - 1)) {
              -1 != On(C += Rn(Gn(b), "&", "&\f"), "&\f") && (y = -1);
              break;
          }

        case 34:
        case 39:
        case 91:
          C += Gn(b);
          break;

        case 9:
        case 10:
        case 13:
        case 32:
          C += Yn(h);
          break;

        case 92:
          C += Jn(Hn() - 1, 7);
          continue;

        case 47:
          switch (Vn()) {
            case 42:
            case 47:
              Pn(oo(Qn(Wn(), Hn()), t, r), l);
              break;

            default:
              C += "/";
          }
          break;

        case 123 * m:
          s[c++] = $n(C) * y;

        case 125 * m:
        case 59:
        case 0:
          switch (b) {
            case 0:
            case 125:
              g = 0;

            case 59 + u:
              -1 == y && (C = Rn(C, /\f/g, "")), p > 0 && $n(C) - d && Pn(p > 32 ? io(C + ";", n, r, d - 1) : io(Rn(C, " ", "") + ";", n, r, d - 2), l);
              break;

            case 59:
              C += ";";

            default:
              if (Pn(w = no(C, t, r, c, u, o, s, v, x = [], S = [], d), i), 123 === b) if (0 === u) ro(C, t, w, w, x, i, d, s, S); else switch (99 === f && 110 === Tn(C, 3) ? 100 : f) {
                case 100:
                case 108:
                case 109:
                case 115:
                  ro(e, w, w, n && Pn(no(e, w, w, 0, 0, o, s, v, o, x = [], d), S), o, S, d, s, n ? x : S);
                  break;

                default:
                  ro(C, w, w, w, [ "" ], S, 0, s, S);
              }
          }
          c = u = p = 0, m = y = 1, v = C = "", d = a;
          break;

        case 58:
          d = 1 + $n(C), p = h;

        default:
          if (m < 1) if (123 == b) --m; else if (125 == b && 0 == m++ && 125 == (Nn = Fn > 0 ? Tn(Ln, --Fn) : 0, 
          In--, 10 === Nn && (In = 1, Mn--), Nn)) continue;
          switch (C += kn(b), b * m) {
            case 38:
              y = u > 0 ? 1 : (C += "\f", -1);
              break;

            case 44:
              s[c++] = ($n(C) - 1) * y, y = 1;
              break;

            case 64:
              45 === Vn() && (C += Gn(Wn())), f = Vn(), u = d = $n(v = C += eo(Hn())), b++;
              break;

            case 45:
              45 === h && 2 == $n(C) && (m = 0);
          }
      }
      return i;
  }

  function no(e, t, r, n, o, i, a, s, l, c, u) {
      for (var d = o - 1, f = 0 === o ? i : [ "" ], p = _n(f), h = 0, m = 0, g = 0; h < n; ++h) for (var y = 0, b = An(e, d + 1, d = Cn(m = a[h])), v = e; y < p; ++y) (v = En(m > 0 ? f[y] + " " + b : Rn(b, /&\f/g, f[y]))) && (l[g++] = v);
      return zn(e, t, r, 0 === o ? xn : s, l, c, u);
  }

  function oo(e, t, r) {
      return zn(e, t, r, vn, kn(Nn), An(e, 2, -2), 0);
  }

  function io(e, t, r, n) {
      return zn(e, t, r, Sn, An(e, 0, n), An(e, n + 1, -1), n);
  }

  function ao(e, t) {
      for (var r = "", n = _n(e), o = 0; o < n; o++) r += t(e[o], o, e, t) || "";
      return r;
  }

  function so(e, t, r, n) {
      switch (e.type) {
        case "@layer":
          if (e.children.length) break;

        case "@import":
        case Sn:
          return e.return = e.return || e.value;

        case vn:
          return "";

        case wn:
          return e.return = e.value + "{" + ao(e.children, n) + "}";

        case xn:
          e.value = e.props.join(",");
      }
      return $n(r = ao(e.children, n)) ? e.return = e.value + "{" + r + "}" : "";
  }

  var lo = function(e, t, r) {
      for (var n = 0, o = 0; n = o, o = Vn(), 38 === n && 12 === o && (t[r] = 1), !qn(o); ) Wn();
      return Kn(e, Fn);
  }, co = function(e, t) {
      return Un(function(e, t) {
          var r = -1, n = 44;
          do {
              switch (qn(n)) {
                case 0:
                  38 === n && 12 === Vn() && (t[r] = 1), e[r] += lo(Fn - 1, t, r);
                  break;

                case 2:
                  e[r] += Gn(n);
                  break;

                case 4:
                  if (44 === n) {
                      e[++r] = 58 === Vn() ? "&\f" : "", t[r] = e[r].length;
                      break;
                  }

                default:
                  e[r] += kn(n);
              }
          } while (n = Wn());
          return e;
      }(Xn(e), t));
  }, uo = new WeakMap, fo = function(e) {
      if ("rule" === e.type && e.parent && !(e.length < 1)) {
          for (var t = e.value, r = e.parent, n = e.column === r.column && e.line === r.line; "rule" !== r.type; ) if (!(r = r.parent)) return;
          if ((1 !== e.props.length || 58 === t.charCodeAt(0) || uo.get(r)) && !n) {
              uo.set(e, !0);
              for (var o = [], i = co(t, o), a = r.props, s = 0, l = 0; s < i.length; s++) for (var c = 0; c < a.length; c++, 
              l++) e.props[l] = o[s] ? i[s].replace(/&\f/g, a[c]) : a[c] + " " + i[s];
          }
      }
  }, po = function(e) {
      if ("decl" === e.type) {
          var t = e.value;
          108 === t.charCodeAt(0) && 98 === t.charCodeAt(2) && (e.return = "", e.value = "");
      }
  };

  function ho(e, t) {
      switch (function(e, t) {
          return 45 ^ Tn(e, 0) ? (((t << 2 ^ Tn(e, 0)) << 2 ^ Tn(e, 1)) << 2 ^ Tn(e, 2)) << 2 ^ Tn(e, 3) : 0;
      }(e, t)) {
        case 5103:
          return bn + "print-" + e + e;

        case 5737:
        case 4201:
        case 3177:
        case 3433:
        case 1641:
        case 4457:
        case 2921:
        case 5572:
        case 6356:
        case 5844:
        case 3191:
        case 6645:
        case 3005:
        case 6391:
        case 5879:
        case 5623:
        case 6135:
        case 4599:
        case 4855:
        case 4215:
        case 6389:
        case 5109:
        case 5365:
        case 5621:
        case 3829:
          return bn + e + e;

        case 5349:
        case 4246:
        case 4810:
        case 6968:
        case 2756:
          return bn + e + yn + e + gn + e + e;

        case 6828:
        case 4268:
          return bn + e + gn + e + e;

        case 6165:
          return bn + e + gn + "flex-" + e + e;

        case 5187:
          return bn + e + Rn(e, /(\w+).+(:[^]+)/, bn + "box-$1$2" + gn + "flex-$1$2") + e;

        case 5443:
          return bn + e + gn + "flex-item-" + Rn(e, /flex-|-self/, "") + e;

        case 4675:
          return bn + e + gn + "flex-line-pack" + Rn(e, /align-content|flex-|-self/, "") + e;

        case 5548:
          return bn + e + gn + Rn(e, "shrink", "negative") + e;

        case 5292:
          return bn + e + gn + Rn(e, "basis", "preferred-size") + e;

        case 6060:
          return bn + "box-" + Rn(e, "-grow", "") + bn + e + gn + Rn(e, "grow", "positive") + e;

        case 4554:
          return bn + Rn(e, /([^-])(transform)/g, "$1" + bn + "$2") + e;

        case 6187:
          return Rn(Rn(Rn(e, /(zoom-|grab)/, bn + "$1"), /(image-set)/, bn + "$1"), e, "") + e;

        case 5495:
        case 3959:
          return Rn(e, /(image-set\([^]*)/, bn + "$1$`$1");

        case 4968:
          return Rn(Rn(e, /(.+:)(flex-)?(.*)/, bn + "box-pack:$3" + gn + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + bn + e + e;

        case 4095:
        case 3583:
        case 4068:
        case 2532:
          return Rn(e, /(.+)-inline(.+)/, bn + "$1$2") + e;

        case 8116:
        case 7059:
        case 5753:
        case 5535:
        case 5445:
        case 5701:
        case 4933:
        case 4677:
        case 5533:
        case 5789:
        case 5021:
        case 4765:
          if ($n(e) - 1 - t > 6) switch (Tn(e, t + 1)) {
            case 109:
              if (45 !== Tn(e, t + 4)) break;

            case 102:
              return Rn(e, /(.+:)(.+)-([^]+)/, "$1" + bn + "$2-$3$1" + yn + (108 == Tn(e, t + 3) ? "$3" : "$2-$3")) + e;

            case 115:
              return ~On(e, "stretch") ? ho(Rn(e, "stretch", "fill-available"), t) + e : e;
          }
          break;

        case 4949:
          if (115 !== Tn(e, t + 1)) break;

        case 6444:
          switch (Tn(e, $n(e) - 3 - (~On(e, "!important") && 10))) {
            case 107:
              return Rn(e, ":", ":" + bn) + e;

            case 101:
              return Rn(e, /(.+:)([^;!]+)(;|!.+)?/, "$1" + bn + (45 === Tn(e, 14) ? "inline-" : "") + "box$3$1" + bn + "$2$3$1" + gn + "$2box$3") + e;
          }
          break;

        case 5936:
          switch (Tn(e, t + 11)) {
            case 114:
              return bn + e + gn + Rn(e, /[svh]\w+-[tblr]{2}/, "tb") + e;

            case 108:
              return bn + e + gn + Rn(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;

            case 45:
              return bn + e + gn + Rn(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
          }
          return bn + e + gn + e + e;
      }
      return e;
  }

  var mo = [ function(e, t, r, n) {
      if (e.length > -1 && !e.return) switch (e.type) {
        case Sn:
          e.return = ho(e.value, e.length);
          break;

        case wn:
          return ao([ Dn(e, {
              value: Rn(e.value, "@", "@" + bn)
          }) ], n);

        case xn:
          if (e.length) return function(e, t) {
              return e.map(t).join("");
          }(e.props, (function(t) {
              switch (function(e, t) {
                  return (e = t.exec(e)) ? e[0] : e;
              }(t, /(::plac\w+|:read-\w+)/)) {
                case ":read-only":
                case ":read-write":
                  return ao([ Dn(e, {
                      props: [ Rn(t, /:(read-\w+)/, ":-moz-$1") ]
                  }) ], n);

                case "::placeholder":
                  return ao([ Dn(e, {
                      props: [ Rn(t, /:(plac\w+)/, ":" + bn + "input-$1") ]
                  }), Dn(e, {
                      props: [ Rn(t, /:(plac\w+)/, ":-moz-$1") ]
                  }), Dn(e, {
                      props: [ Rn(t, /:(plac\w+)/, gn + "input-$1") ]
                  }) ], n);
              }
              return "";
          }));
      }
  } ];

  let go;

  function yo(e, t) {
      return R(e, t);
  }

  "object" == typeof document && (go = function(e) {
      var t = e.key;
      if ("css" === t) {
          var r = document.querySelectorAll("style[data-emotion]:not([data-s])");
          Array.prototype.forEach.call(r, (function(e) {
              -1 !== e.getAttribute("data-emotion").indexOf(" ") && (document.head.appendChild(e), 
              e.setAttribute("data-s", ""));
          }));
      }
      var n, o, i = e.stylisPlugins || mo, a = {}, s = [];
      n = e.container || document.head, Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="' + t + ' "]'), (function(e) {
          for (var t = e.getAttribute("data-emotion").split(" "), r = 1; r < t.length; r++) a[t[r]] = !0;
          s.push(e);
      }));
      var l, c, u, d, f = [ so, (d = function(e) {
          l.insert(e);
      }, function(e) {
          e.root || (e = e.return) && d(e);
      }) ], p = (c = [ fo, po ].concat(i, f), u = _n(c), function(e, t, r, n) {
          for (var o = "", i = 0; i < u; i++) o += c[i](e, t, r, n) || "";
          return o;
      });
      o = function(e, t, r, n) {
          l = r, ao(to(e ? e + "{" + t.styles + "}" : t.styles), p), n && (h.inserted[t.name] = !0);
      };
      var h = {
          key: t,
          sheet: new mn({
              key: t,
              container: n,
              nonce: e.nonce,
              speedy: e.speedy,
              prepend: e.prepend,
              insertionPoint: e.insertionPoint
          }),
          nonce: e.nonce,
          inserted: a,
          registered: {},
          insert: o
      };
      return h.sheet.hydrate(s), h;
  }({
      key: "css",
      prepend: !0
  }));

  const bo = B(Object.freeze(Object.defineProperty({
      __proto__: null,
      GlobalStyles: function(e) {
          const {styles: t, defaultTheme: r = {}} = e, n = "function" == typeof t ? e => {
              return t(null == (n = e) || 0 === Object.keys(n).length ? r : e);
              var n;
          } : t;
          return q.jsx(react.Global, {
              styles: n
          });
      },
      StyledEngineProvider: function(e) {
          const {injectFirst: t, children: r} = e;
          return t && go ? q.jsx(react.CacheProvider, {
              value: go,
              children: r
          }) : r;
      },
      ThemeContext: react.ThemeContext,
      css: react.css,
      default: yo,
      internal_processStyles: (e, t) => {
          Array.isArray(e.__emotion_styles) && (e.__emotion_styles = t(e.__emotion_styles));
      },
      keyframes: react.keyframes
  }, Symbol.toStringTag, {
      value: "Module"
  }))), vo = B(hr), xo = B(Cr), So = B(Sr), wo = [ "values", "unit", "step" ], Co = e => {
      const t = Object.keys(e).map((t => ({
          key: t,
          val: e[t]
      }))) || [];
      return t.sort(((e, t) => e.val - t.val)), t.reduce(((e, t) => Vt({}, e, {
          [t.key]: t.val
      })), {});
  };

  function ko(e) {
      const {values: t = {
          xs: 0,
          sm: 600,
          md: 900,
          lg: 1200,
          xl: 1536
      }, unit: r = "px", step: n = 5} = e, o = Wt(e, wo), i = Co(t), a = Object.keys(i);
      function s(e) {
          return `@media (min-width:${"number" == typeof t[e] ? t[e] : e}${r})`;
      }
      function l(e) {
          return `@media (max-width:${("number" == typeof t[e] ? t[e] : e) - n / 100}${r})`;
      }
      function c(e, o) {
          const i = a.indexOf(o);
          return `@media (min-width:${"number" == typeof t[e] ? t[e] : e}${r}) and (max-width:${(-1 !== i && "number" == typeof t[a[i]] ? t[a[i]] : o) - n / 100}${r})`;
      }
      return Vt({
          keys: a,
          values: i,
          up: s,
          down: l,
          between: c,
          only: function(e) {
              return a.indexOf(e) + 1 < a.length ? c(e, a[a.indexOf(e) + 1]) : s(e);
          },
          not: function(e) {
              const t = a.indexOf(e);
              return 0 === t ? s(a[1]) : t === a.length - 1 ? l(a[t]) : c(e, a[a.indexOf(e) + 1]).replace("@media", "@media not all and");
          },
          unit: r
      }, o);
  }

  const jo = {
      borderRadius: 4
  };

  function Eo(e, t) {
      return t ? pr(e, t, {
          clone: !1
      }) : e;
  }

  const Ro = {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
  }, Oo = {
      keys: [ "xs", "sm", "md", "lg", "xl" ],
      up: e => `@media (min-width:${Ro[e]}px)`
  };

  function To(e, t, r) {
      const n = e.theme || {};
      if (Array.isArray(t)) {
          const e = n.breakpoints || Oo;
          return t.reduce(((n, o, i) => (n[e.up(e.keys[i])] = r(t[i]), n)), {});
      }
      if ("object" == typeof t) {
          const e = n.breakpoints || Oo;
          return Object.keys(t).reduce(((n, o) => {
              if (-1 !== Object.keys(e.values || Ro).indexOf(o)) {
                  n[e.up(o)] = r(t[o], o);
              } else {
                  const e = o;
                  n[e] = t[e];
              }
              return n;
          }), {});
      }
      return r(t);
  }

  function Ao(e, t, r = !0) {
      if (!t || "string" != typeof t) return null;
      if (e && e.vars && r) {
          const r = `vars.${t}`.split(".").reduce(((e, t) => e && e[t] ? e[t] : null), e);
          if (null != r) return r;
      }
      return t.split(".").reduce(((e, t) => e && null != e[t] ? e[t] : null), e);
  }

  function $o(e, t, r, n = r) {
      let o;
      return o = "function" == typeof e ? e(r) : Array.isArray(e) ? e[r] || n : Ao(e, r) || n, 
      t && (o = t(o, n, e)), o;
  }

  function _o(e) {
      const {prop: t, cssProperty: r = e.prop, themeKey: n, transform: o} = e, i = e => {
          if (null == e[t]) return null;
          const i = e[t], a = Ao(e.theme, n) || {};
          return To(e, i, (e => {
              let n = $o(a, o, e);
              return e === n && "string" == typeof e && (n = $o(a, o, `${t}${"default" === e ? "" : wr(e)}`, e)), 
              !1 === r ? n : {
                  [r]: n
              };
          }));
      };
      return i.propTypes = {}, i.filterProps = [ t ], i;
  }

  const Po = {
      m: "margin",
      p: "padding"
  }, Mo = {
      t: "Top",
      r: "Right",
      b: "Bottom",
      l: "Left",
      x: [ "Left", "Right" ],
      y: [ "Top", "Bottom" ]
  }, Io = {
      marginX: "mx",
      marginY: "my",
      paddingX: "px",
      paddingY: "py"
  }, Bo = function(e) {
      const t = {};
      return r => (void 0 === t[r] && (t[r] = e(r)), t[r]);
  }((e => {
      if (e.length > 2) {
          if (!Io[e]) return [ e ];
          e = Io[e];
      }
      const [t, r] = e.split(""), n = Po[t], o = Mo[r] || "";
      return Array.isArray(o) ? o.map((e => n + e)) : [ n + o ];
  })), Fo = [ "m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd" ], No = [ "p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd" ];

  function Lo(e, t, r, n) {
      var o;
      const i = null != (o = Ao(e, t, !1)) ? o : r;
      return "number" == typeof i ? e => "string" == typeof e ? e : i * e : Array.isArray(i) ? e => "string" == typeof e ? e : i[e] : "function" == typeof i ? i : () => {};
  }

  function zo(e) {
      return Lo(e, "spacing", 8);
  }

  function Do(e, t) {
      if ("string" == typeof t || null == t) return t;
      const r = e(Math.abs(t));
      return t >= 0 ? r : "number" == typeof r ? -r : `-${r}`;
  }

  function Wo(e, t, r, n) {
      if (-1 === t.indexOf(r)) return null;
      const o = function(e, t) {
          return r => e.reduce(((e, n) => (e[n] = Do(t, r), e)), {});
      }(Bo(r), n);
      return To(e, e[r], o);
  }

  function Vo(e, t) {
      const r = zo(e.theme);
      return Object.keys(e).map((n => Wo(e, t, n, r))).reduce(Eo, {});
  }

  function Ho(e) {
      return Vo(e, Fo);
  }

  function Ko(e) {
      return Vo(e, No);
  }

  function qo(...e) {
      const t = e.reduce(((e, t) => (t.filterProps.forEach((r => {
          e[r] = t;
      })), e)), {}), r = e => Object.keys(e).reduce(((r, n) => t[n] ? Eo(r, t[n](e)) : r), {});
      return r.propTypes = {}, r.filterProps = e.reduce(((e, t) => e.concat(t.filterProps)), []), 
      r;
  }

  function Xo(e) {
      return "number" != typeof e ? e : `${e}px solid`;
  }

  function Uo(e, t) {
      return _o({
          prop: e,
          themeKey: "borders",
          transform: t
      });
  }

  Ho.propTypes = {}, Ho.filterProps = Fo, Ko.propTypes = {}, Ko.filterProps = No;

  const Go = Uo("border", Xo), Yo = Uo("borderTop", Xo), Jo = Uo("borderRight", Xo), Zo = Uo("borderBottom", Xo), Qo = Uo("borderLeft", Xo), ei = Uo("borderColor"), ti = Uo("borderTopColor"), ri = Uo("borderRightColor"), ni = Uo("borderBottomColor"), oi = Uo("borderLeftColor"), ii = Uo("outline", Xo), ai = Uo("outlineColor"), si = e => {
      if (void 0 !== e.borderRadius && null !== e.borderRadius) {
          const t = Lo(e.theme, "shape.borderRadius", 4), r = e => ({
              borderRadius: Do(t, e)
          });
          return To(e, e.borderRadius, r);
      }
      return null;
  };

  si.propTypes = {}, si.filterProps = [ "borderRadius" ], qo(Go, Yo, Jo, Zo, Qo, ei, ti, ri, ni, oi, si, ii, ai);

  const li = e => {
      if (void 0 !== e.gap && null !== e.gap) {
          const t = Lo(e.theme, "spacing", 8), r = e => ({
              gap: Do(t, e)
          });
          return To(e, e.gap, r);
      }
      return null;
  };

  li.propTypes = {}, li.filterProps = [ "gap" ];

  const ci = e => {
      if (void 0 !== e.columnGap && null !== e.columnGap) {
          const t = Lo(e.theme, "spacing", 8), r = e => ({
              columnGap: Do(t, e)
          });
          return To(e, e.columnGap, r);
      }
      return null;
  };

  ci.propTypes = {}, ci.filterProps = [ "columnGap" ];

  const ui = e => {
      if (void 0 !== e.rowGap && null !== e.rowGap) {
          const t = Lo(e.theme, "spacing", 8), r = e => ({
              rowGap: Do(t, e)
          });
          return To(e, e.rowGap, r);
      }
      return null;
  };

  ui.propTypes = {}, ui.filterProps = [ "rowGap" ];

  function di(e, t) {
      return "grey" === t ? t : e;
  }

  qo(li, ci, ui, _o({
      prop: "gridColumn"
  }), _o({
      prop: "gridRow"
  }), _o({
      prop: "gridAutoFlow"
  }), _o({
      prop: "gridAutoColumns"
  }), _o({
      prop: "gridAutoRows"
  }), _o({
      prop: "gridTemplateColumns"
  }), _o({
      prop: "gridTemplateRows"
  }), _o({
      prop: "gridTemplateAreas"
  }), _o({
      prop: "gridArea"
  }));

  function fi(e) {
      return e <= 1 && 0 !== e ? 100 * e + "%" : e;
  }

  qo(_o({
      prop: "color",
      themeKey: "palette",
      transform: di
  }), _o({
      prop: "bgcolor",
      cssProperty: "backgroundColor",
      themeKey: "palette",
      transform: di
  }), _o({
      prop: "backgroundColor",
      themeKey: "palette",
      transform: di
  }));

  const pi = _o({
      prop: "width",
      transform: fi
  }), hi = e => {
      if (void 0 !== e.maxWidth && null !== e.maxWidth) {
          const t = t => {
              var r, n;
              const o = (null == (r = e.theme) || null == (r = r.breakpoints) || null == (r = r.values) ? void 0 : r[t]) || Ro[t];
              return o ? "px" !== (null == (n = e.theme) || null == (n = n.breakpoints) ? void 0 : n.unit) ? {
                  maxWidth: `${o}${e.theme.breakpoints.unit}`
              } : {
                  maxWidth: o
              } : {
                  maxWidth: fi(t)
              };
          };
          return To(e, e.maxWidth, t);
      }
      return null;
  };

  hi.filterProps = [ "maxWidth" ];

  const mi = _o({
      prop: "minWidth",
      transform: fi
  }), gi = _o({
      prop: "height",
      transform: fi
  }), yi = _o({
      prop: "maxHeight",
      transform: fi
  }), bi = _o({
      prop: "minHeight",
      transform: fi
  });

  _o({
      prop: "size",
      cssProperty: "width",
      transform: fi
  }), _o({
      prop: "size",
      cssProperty: "height",
      transform: fi
  });

  qo(pi, hi, mi, gi, yi, bi, _o({
      prop: "boxSizing"
  }));

  const vi = {
      border: {
          themeKey: "borders",
          transform: Xo
      },
      borderTop: {
          themeKey: "borders",
          transform: Xo
      },
      borderRight: {
          themeKey: "borders",
          transform: Xo
      },
      borderBottom: {
          themeKey: "borders",
          transform: Xo
      },
      borderLeft: {
          themeKey: "borders",
          transform: Xo
      },
      borderColor: {
          themeKey: "palette"
      },
      borderTopColor: {
          themeKey: "palette"
      },
      borderRightColor: {
          themeKey: "palette"
      },
      borderBottomColor: {
          themeKey: "palette"
      },
      borderLeftColor: {
          themeKey: "palette"
      },
      outline: {
          themeKey: "borders",
          transform: Xo
      },
      outlineColor: {
          themeKey: "palette"
      },
      borderRadius: {
          themeKey: "shape.borderRadius",
          style: si
      },
      color: {
          themeKey: "palette",
          transform: di
      },
      bgcolor: {
          themeKey: "palette",
          cssProperty: "backgroundColor",
          transform: di
      },
      backgroundColor: {
          themeKey: "palette",
          transform: di
      },
      p: {
          style: Ko
      },
      pt: {
          style: Ko
      },
      pr: {
          style: Ko
      },
      pb: {
          style: Ko
      },
      pl: {
          style: Ko
      },
      px: {
          style: Ko
      },
      py: {
          style: Ko
      },
      padding: {
          style: Ko
      },
      paddingTop: {
          style: Ko
      },
      paddingRight: {
          style: Ko
      },
      paddingBottom: {
          style: Ko
      },
      paddingLeft: {
          style: Ko
      },
      paddingX: {
          style: Ko
      },
      paddingY: {
          style: Ko
      },
      paddingInline: {
          style: Ko
      },
      paddingInlineStart: {
          style: Ko
      },
      paddingInlineEnd: {
          style: Ko
      },
      paddingBlock: {
          style: Ko
      },
      paddingBlockStart: {
          style: Ko
      },
      paddingBlockEnd: {
          style: Ko
      },
      m: {
          style: Ho
      },
      mt: {
          style: Ho
      },
      mr: {
          style: Ho
      },
      mb: {
          style: Ho
      },
      ml: {
          style: Ho
      },
      mx: {
          style: Ho
      },
      my: {
          style: Ho
      },
      margin: {
          style: Ho
      },
      marginTop: {
          style: Ho
      },
      marginRight: {
          style: Ho
      },
      marginBottom: {
          style: Ho
      },
      marginLeft: {
          style: Ho
      },
      marginX: {
          style: Ho
      },
      marginY: {
          style: Ho
      },
      marginInline: {
          style: Ho
      },
      marginInlineStart: {
          style: Ho
      },
      marginInlineEnd: {
          style: Ho
      },
      marginBlock: {
          style: Ho
      },
      marginBlockStart: {
          style: Ho
      },
      marginBlockEnd: {
          style: Ho
      },
      displayPrint: {
          cssProperty: !1,
          transform: e => ({
              "@media print": {
                  display: e
              }
          })
      },
      display: {},
      overflow: {},
      textOverflow: {},
      visibility: {},
      whiteSpace: {},
      flexBasis: {},
      flexDirection: {},
      flexWrap: {},
      justifyContent: {},
      alignItems: {},
      alignContent: {},
      order: {},
      flex: {},
      flexGrow: {},
      flexShrink: {},
      alignSelf: {},
      justifyItems: {},
      justifySelf: {},
      gap: {
          style: li
      },
      rowGap: {
          style: ui
      },
      columnGap: {
          style: ci
      },
      gridColumn: {},
      gridRow: {},
      gridAutoFlow: {},
      gridAutoColumns: {},
      gridAutoRows: {},
      gridTemplateColumns: {},
      gridTemplateRows: {},
      gridTemplateAreas: {},
      gridArea: {},
      position: {},
      zIndex: {
          themeKey: "zIndex"
      },
      top: {},
      right: {},
      bottom: {},
      left: {},
      boxShadow: {
          themeKey: "shadows"
      },
      width: {
          transform: fi
      },
      maxWidth: {
          style: hi
      },
      minWidth: {
          transform: fi
      },
      height: {
          transform: fi
      },
      maxHeight: {
          transform: fi
      },
      minHeight: {
          transform: fi
      },
      boxSizing: {},
      fontFamily: {
          themeKey: "typography"
      },
      fontSize: {
          themeKey: "typography"
      },
      fontStyle: {
          themeKey: "typography"
      },
      fontWeight: {
          themeKey: "typography"
      },
      letterSpacing: {},
      textTransform: {},
      lineHeight: {},
      textAlign: {},
      typography: {
          cssProperty: !1,
          themeKey: "typography"
      }
  };

  function xi() {
      function e(e, t, r, n) {
          const o = {
              [e]: t,
              theme: r
          }, i = n[e];
          if (!i) return {
              [e]: t
          };
          const {cssProperty: a = e, themeKey: s, transform: l, style: c} = i;
          if (null == t) return null;
          if ("typography" === s && "inherit" === t) return {
              [e]: t
          };
          const u = Ao(r, s) || {};
          if (c) return c(o);
          return To(o, t, (t => {
              let r = $o(u, l, t);
              return t === r && "string" == typeof t && (r = $o(u, l, `${e}${"default" === t ? "" : wr(t)}`, t)), 
              !1 === a ? r : {
                  [a]: r
              };
          }));
      }
      return function t(r) {
          var n;
          const {sx: o, theme: i = {}} = r || {};
          if (!o) return null;
          const a = null != (n = i.unstable_sxConfig) ? n : vi;
          function s(r) {
              let n = r;
              if ("function" == typeof r) n = r(i); else if ("object" != typeof r) return r;
              if (!n) return null;
              const o = function(e = {}) {
                  var t;
                  return (null == (t = e.keys) ? void 0 : t.reduce(((t, r) => (t[e.up(r)] = {}, t)), {})) || {};
              }(i.breakpoints), s = Object.keys(o);
              let l = o;
              return Object.keys(n).forEach((r => {
                  const o = (s = n[r], c = i, "function" == typeof s ? s(c) : s);
                  var s, c;
                  if (null != o) if ("object" == typeof o) if (a[r]) l = Eo(l, e(r, o, i, a)); else {
                      const e = To({
                          theme: i
                      }, o, (e => ({
                          [r]: e
                      })));
                      !function(...e) {
                          const t = e.reduce(((e, t) => e.concat(Object.keys(t))), []), r = new Set(t);
                          return e.every((e => r.size === Object.keys(e).length));
                      }(e, o) ? l = Eo(l, e) : l[r] = t({
                          sx: o,
                          theme: i
                      });
                  } else l = Eo(l, e(r, o, i, a));
              })), c = l, s.reduce(((e, t) => {
                  const r = e[t];
                  return (!r || 0 === Object.keys(r).length) && delete e[t], e;
              }), c);
              var c;
          }
          return Array.isArray(o) ? o.map(s) : s(o);
      };
  }

  const Si = xi();

  Si.filterProps = [ "sx" ];

  const wi = Si;

  function Ci(e, t) {
      const r = this;
      if (r.vars && "function" == typeof r.getColorSchemeSelector) {
          return {
              [r.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/, "*:where($1)")]: t
          };
      }
      return r.palette.mode === e ? t : {};
  }

  const ki = [ "breakpoints", "palette", "spacing", "shape" ];

  function ji(e = {}, ...t) {
      const {breakpoints: r = {}, palette: n = {}, spacing: o, shape: i = {}} = e, a = Wt(e, ki), s = ko(r), l = function(e = 8) {
          if (e.mui) return e;
          const t = zo({
              spacing: e
          }), r = (...e) => (0 === e.length ? [ 1 ] : e).map((e => {
              const r = t(e);
              return "number" == typeof r ? `${r}px` : r;
          })).join(" ");
          return r.mui = !0, r;
      }(o);
      let c = pr({
          breakpoints: s,
          direction: "ltr",
          components: {},
          palette: Vt({
              mode: "light"
          }, n),
          spacing: l,
          shape: Vt({}, jo, i)
      }, a);
      return c.applyStyles = Ci, c = t.reduce(((e, t) => pr(e, t)), c), c.unstable_sxConfig = Vt({}, vi, null == a ? void 0 : a.unstable_sxConfig), 
      c.unstable_sx = function(e) {
          return wi({
              sx: e,
              theme: this
          });
      }, c;
  }

  const Ei = B(Object.freeze(Object.defineProperty({
      __proto__: null,
      default: ji,
      private_createBreakpoints: ko,
      unstable_applyStyles: Ci
  }, Symbol.toStringTag, {
      value: "Module"
  }))), Ri = [ "sx" ], Oi = e => {
      var t, r;
      const n = {
          systemProps: {},
          otherProps: {}
      }, o = null != (t = null == e || null == (r = e.theme) ? void 0 : r.unstable_sxConfig) ? t : vi;
      return Object.keys(e).forEach((t => {
          o[t] ? n.systemProps[t] = e[t] : n.otherProps[t] = e[t];
      })), n;
  };

  function Ti(e) {
      const {sx: t} = e, r = Wt(e, Ri), {systemProps: n, otherProps: o} = Oi(r);
      let i;
      return i = Array.isArray(t) ? [ n, ...t ] : "function" == typeof t ? (...e) => {
          const r = t(...e);
          return dr(r) ? Vt({}, n, r) : n;
      } : Vt({}, n, t), Vt({}, o, {
          sx: i
      });
  }

  const Ai = B(Object.freeze(Object.defineProperty({
      __proto__: null,
      default: wi,
      extendSxProp: Ti,
      unstable_createStyleFunctionSx: xi,
      unstable_defaultSxConfig: vi
  }, Symbol.toStringTag, {
      value: "Module"
  })));

  var $i = dn;

  Object.defineProperty(ln, "__esModule", {
      value: !0
  });

  var _i = ln.default = function(e = {}) {
      const {themeId: t, defaultTheme: r = Ki, rootShouldForwardProp: n = Hi, slotShouldForwardProp: o = Hi} = e, i = e => (0, Li.default)((0, Mi.default)({}, e, {
          theme: Xi((0, Mi.default)({}, e, {
              defaultTheme: r,
              themeId: t
          }))
      }));
      return i.__mui_systemSx = !0, (e, a = {}) => {
          (0, Bi.internal_processStyles)(e, (e => e.filter((e => !(null != e && e.__mui_systemSx)))));
          const {name: s, slot: l, skipVariantsResolver: c, skipSx: u, overridesResolver: d = Ui(qi(l))} = a, f = (0, Ii.default)(a, Wi), p = void 0 !== c ? c : l && "Root" !== l && "root" !== l || !1, h = u || !1;
          let m = Hi;
          "Root" === l || "root" === l ? m = n : l ? m = o : function(e) {
              return "string" == typeof e && e.charCodeAt(0) > 96;
          }(e) && (m = void 0);
          const g = (0, Bi.default)(e, (0, Mi.default)({
              shouldForwardProp: m,
              label: undefined
          }, f)), y = e => "function" == typeof e && e.__emotion_real !== e || (0, Fi.isPlainObject)(e) ? n => Gi(e, (0, Mi.default)({}, n, {
              theme: Xi({
                  theme: n.theme,
                  defaultTheme: r,
                  themeId: t
              })
          })) : e, b = (n, ...o) => {
              let a = y(n);
              const l = o ? o.map(y) : [];
              s && d && l.push((e => {
                  const n = Xi((0, Mi.default)({}, e, {
                      defaultTheme: r,
                      themeId: t
                  }));
                  if (!n.components || !n.components[s] || !n.components[s].styleOverrides) return null;
                  const o = n.components[s].styleOverrides, i = {};
                  return Object.entries(o).forEach((([t, r]) => {
                      i[t] = Gi(r, (0, Mi.default)({}, e, {
                          theme: n
                      }));
                  })), d(e, i);
              })), s && !p && l.push((e => {
                  var n;
                  const o = Xi((0, Mi.default)({}, e, {
                      defaultTheme: r,
                      themeId: t
                  }));
                  return Gi({
                      variants: null == o || null == (n = o.components) || null == (n = n[s]) ? void 0 : n.variants
                  }, (0, Mi.default)({}, e, {
                      theme: o
                  }));
              })), h || l.push(i);
              const c = l.length - o.length;
              if (Array.isArray(n) && c > 0) {
                  const e = new Array(c).fill("");
                  a = [ ...n, ...e ], a.raw = [ ...n.raw, ...e ];
              }
              const u = g(a, ...l);
              return e.muiName && (u.muiName = e.muiName), u;
          };
          return g.withConfig && (b.withConfig = g.withConfig), b;
      };
  }, Pi = ln.shouldForwardProp = Hi;

  ln.systemDefaultTheme = void 0;

  var Mi = $i((un || (un = 1, function(e) {
      function t() {
          return e.exports = t = Object.assign ? Object.assign.bind() : function(e) {
              for (var t = 1; t < arguments.length; t++) {
                  var r = arguments[t];
                  for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
              }
              return e;
          }, e.exports.__esModule = !0, e.exports.default = e.exports, t.apply(this, arguments);
      }
      e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
  }(fn)), fn.exports)), Ii = $i((pn || (pn = 1, function(e) {
      e.exports = function(e, t) {
          if (null == e) return {};
          var r, n, o = {}, i = Object.keys(e);
          for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) >= 0 || (o[r] = e[r]);
          return o;
      }, e.exports.__esModule = !0, e.exports.default = e.exports;
  }(hn)), hn.exports)), Bi = function(e, t) {
      if (!t && e && e.__esModule) return e;
      if (null === e || "object" != typeof e && "function" != typeof e) return {
          default: e
      };
      var r = Vi(t);
      if (r && r.has(e)) return r.get(e);
      var n = {
          __proto__: null
      }, o = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var i in e) if ("default" !== i && Object.prototype.hasOwnProperty.call(e, i)) {
          var a = o ? Object.getOwnPropertyDescriptor(e, i) : null;
          a && (a.get || a.set) ? Object.defineProperty(n, i, a) : n[i] = e[i];
      }
      return n.default = e, r && r.set(e, n), n;
  }(bo), Fi = vo;

  $i(xo), $i(So);

  var Ni = $i(Ei), Li = $i(Ai);

  const zi = [ "ownerState" ], Di = [ "variants" ], Wi = [ "name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver" ];

  function Vi(e) {
      if ("function" != typeof WeakMap) return null;
      var t = new WeakMap, r = new WeakMap;
      return (Vi = function(e) {
          return e ? r : t;
      })(e);
  }

  function Hi(e) {
      return "ownerState" !== e && "theme" !== e && "sx" !== e && "as" !== e;
  }

  const Ki = ln.systemDefaultTheme = (0, Ni.default)(), qi = e => e ? e.charAt(0).toLowerCase() + e.slice(1) : e;

  function Xi({defaultTheme: e, theme: t, themeId: r}) {
      return n = t, 0 === Object.keys(n).length ? e : t[r] || t;
      var n;
  }

  function Ui(e) {
      return e ? (t, r) => r[e] : null;
  }

  function Gi(e, t) {
      let {ownerState: r} = t, n = (0, Ii.default)(t, zi);
      const o = "function" == typeof e ? e((0, Mi.default)({
          ownerState: r
      }, n)) : e;
      if (Array.isArray(o)) return o.flatMap((e => Gi(e, (0, Mi.default)({
          ownerState: r
      }, n))));
      if (o && "object" == typeof o && Array.isArray(o.variants)) {
          const {variants: e = []} = o;
          let t = (0, Ii.default)(o, Di);
          return e.forEach((e => {
              let o = !0;
              "function" == typeof e.props ? o = e.props((0, Mi.default)({
                  ownerState: r
              }, n, r)) : Object.keys(e.props).forEach((t => {
                  (null == r ? void 0 : r[t]) !== e.props[t] && n[t] !== e.props[t] && (o = !1);
              })), o && (Array.isArray(t) || (t = [ t ]), t.push("function" == typeof e.style ? e.style((0, Mi.default)({
                  ownerState: r
              }, n, r)) : e.style));
          })), t;
      }
      return o;
  }

  var Yi = {};

  const Ji = B(gr), Zi = B(Qr);

  var Qi = dn;

  Object.defineProperty(Yi, "__esModule", {
      value: !0
  }), Yi.alpha = fa, Yi.blend = function(e, t, r, n = 1) {
      const o = (e, t) => Math.round((e ** (1 / n) * (1 - r) + t ** (1 / n) * r) ** n), i = sa(e), a = sa(t);
      return ca({
          type: "rgb",
          values: [ o(i.values[0], a.values[0]), o(i.values[1], a.values[1]), o(i.values[2], a.values[2]) ]
      });
  }, Yi.colorChannel = void 0;

  var ea = Yi.darken = pa;

  Yi.decomposeColor = sa, Yi.emphasize = function(e, t = .15) {
      return da(e) > .5 ? pa(e, t) : ha(e, t);
  };

  var ta = Yi.getContrastRatio = function(e, t) {
      const r = da(e), n = da(t);
      return (Math.max(r, n) + .05) / (Math.min(r, n) + .05);
  };

  Yi.getLuminance = da, Yi.hexToRgb = aa, Yi.hslToRgb = ua;

  var ra = Yi.lighten = ha;

  Yi.private_safeAlpha = function(e, t, r) {
      try {
          return fa(e, t);
      } catch (n) {
          return e;
      }
  }, Yi.private_safeColorChannel = void 0, Yi.private_safeDarken = function(e, t, r) {
      try {
          return pa(e, t);
      } catch (n) {
          return e;
      }
  }, Yi.private_safeEmphasize = function e(t, r, n) {
      try {
          return e(t, r);
      } catch (o) {
          return t;
      }
  }, Yi.private_safeLighten = function(e, t, r) {
      try {
          return ha(e, t);
      } catch (n) {
          return e;
      }
  }, Yi.recomposeColor = ca, Yi.rgbToHex = function(e) {
      if (0 === e.indexOf("#")) return e;
      const {values: t} = sa(e);
      return `#${t.map(((e, t) => function(e) {
        const t = e.toString(16);
        return 1 === t.length ? `0${t}` : t;
    }(3 === t ? Math.round(255 * e) : e))).join("")}`;
  };

  var na = Qi(Ji), oa = Qi(Zi);

  function ia(e, t = 0, r = 1) {
      return (0, oa.default)(e, t, r);
  }

  function aa(e) {
      e = e.slice(1);
      const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
      let r = e.match(t);
      return r && 1 === r[0].length && (r = r.map((e => e + e))), r ? `rgb${4 === r.length ? "a" : ""}(${r.map(((e, t) => t < 3 ? parseInt(e, 16) : Math.round(parseInt(e, 16) / 255 * 1e3) / 1e3)).join(", ")})` : "";
  }

  function sa(e) {
      if (e.type) return e;
      if ("#" === e.charAt(0)) return sa(aa(e));
      const t = e.indexOf("("), r = e.substring(0, t);
      if (-1 === [ "rgb", "rgba", "hsl", "hsla", "color" ].indexOf(r)) throw new Error((0, na.default)(9, e));
      let n, o = e.substring(t + 1, e.length - 1);
      if ("color" === r) {
          if (o = o.split(" "), n = o.shift(), 4 === o.length && "/" === o[3].charAt(0) && (o[3] = o[3].slice(1)), 
          -1 === [ "srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020" ].indexOf(n)) throw new Error((0, na.default)(10, n));
      } else o = o.split(",");
      return o = o.map((e => parseFloat(e))), {
          type: r,
          values: o,
          colorSpace: n
      };
  }

  const la = e => {
      const t = sa(e);
      return t.values.slice(0, 3).map(((e, r) => -1 !== t.type.indexOf("hsl") && 0 !== r ? `${e}%` : e)).join(" ");
  };

  Yi.colorChannel = la;

  function ca(e) {
      const {type: t, colorSpace: r} = e;
      let {values: n} = e;
      return -1 !== t.indexOf("rgb") ? n = n.map(((e, t) => t < 3 ? parseInt(e, 10) : e)) : -1 !== t.indexOf("hsl") && (n[1] = `${n[1]}%`, 
      n[2] = `${n[2]}%`), n = -1 !== t.indexOf("color") ? `${r} ${n.join(" ")}` : `${n.join(", ")}`, 
      `${t}(${n})`;
  }

  function ua(e) {
      e = sa(e);
      const {values: t} = e, r = t[0], n = t[1] / 100, o = t[2] / 100, i = n * Math.min(o, 1 - o), a = (e, t = (e + r / 30) % 12) => o - i * Math.max(Math.min(t - 3, 9 - t, 1), -1);
      let s = "rgb";
      const l = [ Math.round(255 * a(0)), Math.round(255 * a(8)), Math.round(255 * a(4)) ];
      return "hsla" === e.type && (s += "a", l.push(t[3])), ca({
          type: s,
          values: l
      });
  }

  function da(e) {
      let t = "hsl" === (e = sa(e)).type || "hsla" === e.type ? sa(ua(e)).values : e.values;
      return t = t.map((t => ("color" !== e.type && (t /= 255), t <= .03928 ? t / 12.92 : ((t + .055) / 1.055) ** 2.4))), 
      Number((.2126 * t[0] + .7152 * t[1] + .0722 * t[2]).toFixed(3));
  }

  function fa(e, t) {
      return e = sa(e), t = ia(t), "rgb" !== e.type && "hsl" !== e.type || (e.type += "a"), 
      "color" === e.type ? e.values[3] = `/${t}` : e.values[3] = t, ca(e);
  }

  function pa(e, t) {
      if (e = sa(e), t = ia(t), -1 !== e.type.indexOf("hsl")) e.values[2] *= 1 - t; else if (-1 !== e.type.indexOf("rgb") || -1 !== e.type.indexOf("color")) for (let r = 0; r < 3; r += 1) e.values[r] *= 1 - t;
      return ca(e);
  }

  function ha(e, t) {
      if (e = sa(e), t = ia(t), -1 !== e.type.indexOf("hsl")) e.values[2] += (100 - e.values[2]) * t; else if (-1 !== e.type.indexOf("rgb")) for (let r = 0; r < 3; r += 1) e.values[r] += (255 - e.values[r]) * t; else if (-1 !== e.type.indexOf("color")) for (let r = 0; r < 3; r += 1) e.values[r] += (1 - e.values[r]) * t;
      return ca(e);
  }

  Yi.private_safeColorChannel = (e, t) => {
      try {
          return la(e);
      } catch (r) {
          return e;
      }
  };

  const ma = {
      black: "#000",
      white: "#fff"
  }, ga = {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
      A100: "#f5f5f5",
      A200: "#eeeeee",
      A400: "#bdbdbd",
      A700: "#616161"
  }, ya = {
      50: "#f3e5f5",
      100: "#e1bee7",
      200: "#ce93d8",
      300: "#ba68c8",
      400: "#ab47bc",
      500: "#9c27b0",
      600: "#8e24aa",
      700: "#7b1fa2",
      800: "#6a1b9a",
      900: "#4a148c",
      A100: "#ea80fc",
      A200: "#e040fb",
      A400: "#d500f9",
      A700: "#aa00ff"
  }, ba = {
      50: "#ffebee",
      100: "#ffcdd2",
      200: "#ef9a9a",
      300: "#e57373",
      400: "#ef5350",
      500: "#f44336",
      600: "#e53935",
      700: "#d32f2f",
      800: "#c62828",
      900: "#b71c1c",
      A100: "#ff8a80",
      A200: "#ff5252",
      A400: "#ff1744",
      A700: "#d50000"
  }, va = {
      50: "#fff3e0",
      100: "#ffe0b2",
      200: "#ffcc80",
      300: "#ffb74d",
      400: "#ffa726",
      500: "#ff9800",
      600: "#fb8c00",
      700: "#f57c00",
      800: "#ef6c00",
      900: "#e65100",
      A100: "#ffd180",
      A200: "#ffab40",
      A400: "#ff9100",
      A700: "#ff6d00"
  }, xa = {
      50: "#e3f2fd",
      100: "#bbdefb",
      200: "#90caf9",
      300: "#64b5f6",
      400: "#42a5f5",
      500: "#2196f3",
      600: "#1e88e5",
      700: "#1976d2",
      800: "#1565c0",
      900: "#0d47a1",
      A100: "#82b1ff",
      A200: "#448aff",
      A400: "#2979ff",
      A700: "#2962ff"
  }, Sa = {
      50: "#e1f5fe",
      100: "#b3e5fc",
      200: "#81d4fa",
      300: "#4fc3f7",
      400: "#29b6f6",
      500: "#03a9f4",
      600: "#039be5",
      700: "#0288d1",
      800: "#0277bd",
      900: "#01579b",
      A100: "#80d8ff",
      A200: "#40c4ff",
      A400: "#00b0ff",
      A700: "#0091ea"
  }, wa = {
      50: "#e8f5e9",
      100: "#c8e6c9",
      200: "#a5d6a7",
      300: "#81c784",
      400: "#66bb6a",
      500: "#4caf50",
      600: "#43a047",
      700: "#388e3c",
      800: "#2e7d32",
      900: "#1b5e20",
      A100: "#b9f6ca",
      A200: "#69f0ae",
      A400: "#00e676",
      A700: "#00c853"
  }, Ca = [ "mode", "contrastThreshold", "tonalOffset" ], ka = {
      text: {
          primary: "rgba(0, 0, 0, 0.87)",
          secondary: "rgba(0, 0, 0, 0.6)",
          disabled: "rgba(0, 0, 0, 0.38)"
      },
      divider: "rgba(0, 0, 0, 0.12)",
      background: {
          paper: ma.white,
          default: ma.white
      },
      action: {
          active: "rgba(0, 0, 0, 0.54)",
          hover: "rgba(0, 0, 0, 0.04)",
          hoverOpacity: .04,
          selected: "rgba(0, 0, 0, 0.08)",
          selectedOpacity: .08,
          disabled: "rgba(0, 0, 0, 0.26)",
          disabledBackground: "rgba(0, 0, 0, 0.12)",
          disabledOpacity: .38,
          focus: "rgba(0, 0, 0, 0.12)",
          focusOpacity: .12,
          activatedOpacity: .12
      }
  }, ja = {
      text: {
          primary: ma.white,
          secondary: "rgba(255, 255, 255, 0.7)",
          disabled: "rgba(255, 255, 255, 0.5)",
          icon: "rgba(255, 255, 255, 0.5)"
      },
      divider: "rgba(255, 255, 255, 0.12)",
      background: {
          paper: "#121212",
          default: "#121212"
      },
      action: {
          active: ma.white,
          hover: "rgba(255, 255, 255, 0.08)",
          hoverOpacity: .08,
          selected: "rgba(255, 255, 255, 0.16)",
          selectedOpacity: .16,
          disabled: "rgba(255, 255, 255, 0.3)",
          disabledBackground: "rgba(255, 255, 255, 0.12)",
          disabledOpacity: .38,
          focus: "rgba(255, 255, 255, 0.12)",
          focusOpacity: .12,
          activatedOpacity: .24
      }
  };

  function Ea(e, t, r, n) {
      const o = n.light || n, i = n.dark || 1.5 * n;
      e[t] || (e.hasOwnProperty(r) ? e[t] = e[r] : "light" === t ? e.light = ra(e.main, o) : "dark" === t && (e.dark = ea(e.main, i)));
  }

  function Ra(e) {
      const {mode: t = "light", contrastThreshold: r = 3, tonalOffset: n = .2} = e, o = Wt(e, Ca), i = e.primary || function(e = "light") {
          return "dark" === e ? {
              main: xa[200],
              light: xa[50],
              dark: xa[400]
          } : {
              main: xa[700],
              light: xa[400],
              dark: xa[800]
          };
      }(t), a = e.secondary || function(e = "light") {
          return "dark" === e ? {
              main: ya[200],
              light: ya[50],
              dark: ya[400]
          } : {
              main: ya[500],
              light: ya[300],
              dark: ya[700]
          };
      }(t), s = e.error || function(e = "light") {
          return "dark" === e ? {
              main: ba[500],
              light: ba[300],
              dark: ba[700]
          } : {
              main: ba[700],
              light: ba[400],
              dark: ba[800]
          };
      }(t), l = e.info || function(e = "light") {
          return "dark" === e ? {
              main: Sa[400],
              light: Sa[300],
              dark: Sa[700]
          } : {
              main: Sa[700],
              light: Sa[500],
              dark: Sa[900]
          };
      }(t), c = e.success || function(e = "light") {
          return "dark" === e ? {
              main: wa[400],
              light: wa[300],
              dark: wa[700]
          } : {
              main: wa[800],
              light: wa[500],
              dark: wa[900]
          };
      }(t), u = e.warning || function(e = "light") {
          return "dark" === e ? {
              main: va[400],
              light: va[300],
              dark: va[700]
          } : {
              main: "#ed6c02",
              light: va[500],
              dark: va[900]
          };
      }(t);
      function d(e) {
          return ta(e, ja.text.primary) >= r ? ja.text.primary : ka.text.primary;
      }
      const f = ({color: e, name: t, mainShade: r = 500, lightShade: o = 300, darkShade: i = 700}) => {
          if (!(e = Vt({}, e)).main && e[r] && (e.main = e[r]), !e.hasOwnProperty("main")) throw new Error(mr(11, t ? ` (${t})` : "", r));
          if ("string" != typeof e.main) throw new Error(mr(12, t ? ` (${t})` : "", JSON.stringify(e.main)));
          return Ea(e, "light", o, n), Ea(e, "dark", i, n), e.contrastText || (e.contrastText = d(e.main)), 
          e;
      }, p = {
          dark: ja,
          light: ka
      };
      return pr(Vt({
          common: Vt({}, ma),
          mode: t,
          primary: f({
              color: i,
              name: "primary"
          }),
          secondary: f({
              color: a,
              name: "secondary",
              mainShade: "A400",
              lightShade: "A200",
              darkShade: "A700"
          }),
          error: f({
              color: s,
              name: "error"
          }),
          warning: f({
              color: u,
              name: "warning"
          }),
          info: f({
              color: l,
              name: "info"
          }),
          success: f({
              color: c,
              name: "success"
          }),
          grey: ga,
          contrastThreshold: r,
          getContrastText: d,
          augmentColor: f,
          tonalOffset: n
      }, p[t]), o);
  }

  const Oa = [ "fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem" ];

  const Ta = {
      textTransform: "uppercase"
  }, Aa = '"Roboto", "Helvetica", "Arial", sans-serif';

  function $a(e, t) {
      const r = "function" == typeof t ? t(e) : t, {fontFamily: n = Aa, fontSize: o = 14, fontWeightLight: i = 300, fontWeightRegular: a = 400, fontWeightMedium: s = 500, fontWeightBold: l = 700, htmlFontSize: c = 16, allVariants: u, pxToRem: d} = r, f = Wt(r, Oa), p = o / 14, h = d || (e => e / c * p + "rem"), m = (e, t, r, o, i) => {
          return Vt({
              fontFamily: n,
              fontWeight: e,
              fontSize: h(t),
              lineHeight: r
          }, n === Aa ? {
              letterSpacing: (a = o / t, Math.round(1e5 * a) / 1e5) + "em"
          } : {}, i, u);
          var a;
      }, g = {
          h1: m(i, 96, 1.167, -1.5),
          h2: m(i, 60, 1.2, -.5),
          h3: m(a, 48, 1.167, 0),
          h4: m(a, 34, 1.235, .25),
          h5: m(a, 24, 1.334, 0),
          h6: m(s, 20, 1.6, .15),
          subtitle1: m(a, 16, 1.75, .15),
          subtitle2: m(s, 14, 1.57, .1),
          body1: m(a, 16, 1.5, .15),
          body2: m(a, 14, 1.43, .15),
          button: m(s, 14, 1.75, .4, Ta),
          caption: m(a, 12, 1.66, .4),
          overline: m(a, 12, 2.66, 1, Ta),
          inherit: {
              fontFamily: "inherit",
              fontWeight: "inherit",
              fontSize: "inherit",
              lineHeight: "inherit",
              letterSpacing: "inherit"
          }
      };
      return pr(Vt({
          htmlFontSize: c,
          pxToRem: h,
          fontFamily: n,
          fontSize: o,
          fontWeightLight: i,
          fontWeightRegular: a,
          fontWeightMedium: s,
          fontWeightBold: l
      }, g), f, {
          clone: !1
      });
  }

  function _a(...e) {
      return [ `${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,0.2)`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,0.14)`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,0.12)` ].join(",");
  }

  const Pa = [ "none", _a(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), _a(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), _a(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), _a(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), _a(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), _a(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), _a(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), _a(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), _a(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), _a(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), _a(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), _a(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), _a(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), _a(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), _a(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), _a(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), _a(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), _a(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), _a(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), _a(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), _a(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), _a(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), _a(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), _a(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8) ], Ma = [ "duration", "easing", "delay" ], Ia = {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
  }, Ba = {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195
  };

  function Fa(e) {
      return `${Math.round(e)}ms`;
  }

  function Na(e) {
      if (!e) return 0;
      const t = e / 36;
      return Math.round(10 * (4 + 15 * t ** .25 + t / 5));
  }

  function La(e) {
      const t = Vt({}, Ia, e.easing), r = Vt({}, Ba, e.duration);
      return Vt({
          getAutoHeightDuration: Na,
          create: (e = [ "all" ], n = {}) => {
              const {duration: o = r.standard, easing: i = t.easeInOut, delay: a = 0} = n;
              return Wt(n, Ma), (Array.isArray(e) ? e : [ e ]).map((e => `${e} ${"string" == typeof o ? o : Fa(o)} ${i} ${"string" == typeof a ? a : Fa(a)}`)).join(",");
          }
      }, e, {
          easing: t,
          duration: r
      });
  }

  const za = {
      mobileStepper: 1e3,
      fab: 1050,
      speedDial: 1050,
      appBar: 1100,
      drawer: 1200,
      modal: 1300,
      snackbar: 1400,
      tooltip: 1500
  }, Da = [ "breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape" ];

  function Wa(e = {}, ...t) {
      const {mixins: r = {}, palette: n = {}, transitions: o = {}, typography: i = {}} = e, a = Wt(e, Da);
      if (e.vars) throw new Error(mr(18));
      const s = Ra(n), l = ji(e);
      let c = pr(l, {
          mixins: (u = l.breakpoints, d = r, Vt({
              toolbar: {
                  minHeight: 56,
                  [u.up("xs")]: {
                      "@media (orientation: landscape)": {
                          minHeight: 48
                      }
                  },
                  [u.up("sm")]: {
                      minHeight: 64
                  }
              }
          }, d)),
          palette: s,
          shadows: Pa.slice(),
          typography: $a(s, i),
          transitions: La(o),
          zIndex: Vt({}, za)
      });
      var u, d;
      return c = pr(c, a), c = t.reduce(((e, t) => pr(e, t)), c), c.unstable_sxConfig = Vt({}, vi, null == a ? void 0 : a.unstable_sxConfig), 
      c.unstable_sx = function(e) {
          return wi({
              sx: e,
              theme: this
          });
      }, c;
  }

  const Va = Wa(), Ha = "$$material", Ka = _i({
      themeId: Ha,
      defaultTheme: Va,
      rootShouldForwardProp: e => Pi(e) && "classes" !== e
  });

  function qa(e) {
      const {theme: t, name: r, props: n} = e;
      return t && t.components && t.components[r] && t.components[r].defaultProps ? qr(t.components[r].defaultProps, n) : n;
  }

  function Xa(t = null) {
      const r = e__namespace.useContext(react.ThemeContext);
      return r && (n = r, 0 !== Object.keys(n).length) ? r : t;
      var n;
  }

  const Ua = ji();

  function Ga(e = Ua) {
      return Xa(e);
  }

  function Ya({props: e, name: t}) {
      return function({props: e, name: t, defaultTheme: r, themeId: n}) {
          let o = Ga(r);
          return n && (o = o[n] || o), qa({
              theme: o,
              name: t,
              props: e
          });
      }({
          props: e,
          name: t,
          defaultTheme: Va,
          themeId: Ha
      });
  }

  const Ja = [ "className", "component" ];

  function Za(e) {
      return (1 + Math.sin(Math.PI * e - Math.PI / 2)) / 2;
  }

  function Qa(e) {
      return Jr("MuiSvgIcon", e);
  }

  Zr("MuiSvgIcon", [ "root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge" ]);

  const es = [ "children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox" ], ts = Ka("svg", {
      name: "MuiSvgIcon",
      slot: "Root",
      overridesResolver: (e, t) => {
          const {ownerState: r} = e;
          return [ t.root, "inherit" !== r.color && t[`color${wr(r.color)}`], t[`fontSize${wr(r.fontSize)}`] ];
      }
  })((({theme: e, ownerState: t}) => {
      var r, n, o, i, a, s, l, c, u, d, f, p, h;
      return {
          userSelect: "none",
          width: "1em",
          height: "1em",
          display: "inline-block",
          fill: t.hasSvgAsChild ? void 0 : "currentColor",
          flexShrink: 0,
          transition: null == (r = e.transitions) || null == (n = r.create) ? void 0 : n.call(r, "fill", {
              duration: null == (o = e.transitions) || null == (o = o.duration) ? void 0 : o.shorter
          }),
          fontSize: {
              inherit: "inherit",
              small: (null == (i = e.typography) || null == (a = i.pxToRem) ? void 0 : a.call(i, 20)) || "1.25rem",
              medium: (null == (s = e.typography) || null == (l = s.pxToRem) ? void 0 : l.call(s, 24)) || "1.5rem",
              large: (null == (c = e.typography) || null == (u = c.pxToRem) ? void 0 : u.call(c, 35)) || "2.1875rem"
          }[t.fontSize],
          color: null != (d = null == (f = (e.vars || e).palette) || null == (f = f[t.color]) ? void 0 : f.main) ? d : {
              action: null == (p = (e.vars || e).palette) || null == (p = p.action) ? void 0 : p.active,
              disabled: null == (h = (e.vars || e).palette) || null == (h = h.action) ? void 0 : h.disabled,
              inherit: void 0
          }[t.color]
      };
  })), rs = e__namespace.forwardRef((function(t, r) {
      const n = Ya({
          props: t,
          name: "MuiSvgIcon"
      }), {children: o, className: i, color: a = "inherit", component: s = "svg", fontSize: l = "medium", htmlColor: c, inheritViewBox: u = !1, titleAccess: d, viewBox: f = "0 0 24 24"} = n, p = Wt(n, es), h = e__namespace.isValidElement(o) && "svg" === o.type, m = Vt({}, n, {
          color: a,
          component: s,
          fontSize: l,
          instanceFontSize: t.fontSize,
          inheritViewBox: u,
          viewBox: f,
          hasSvgAsChild: h
      }), g = {};
      u || (g.viewBox = f);
      const y = (e => {
          const {color: t, fontSize: r, classes: n} = e;
          return Xr({
              root: [ "root", "inherit" !== t && `color${wr(t)}`, `fontSize${wr(r)}` ]
          }, Qa, n);
      })(m);
      return q.jsxs(ts, Vt({
          as: s,
          className: ur(y.root, i),
          focusable: "false",
          color: c,
          "aria-hidden": !d || void 0,
          role: d ? "img" : void 0,
          ref: r
      }, g, p, h && o.props, {
          ownerState: m,
          children: [ h ? o.props.children : o, d ? q.jsx("title", {
              children: d
          }) : null ]
      }));
  }));

  function ns(t, r) {
      function n(e, n) {
          return q.jsx(rs, Vt({
              "data-testid": `${r}Icon`,
              ref: n
          }, e, {
              children: t
          }));
      }
      return n.muiName = rs.muiName, e__namespace.memo(e__namespace.forwardRef(n));
  }

  rs.muiName = "SvgIcon";

  const os = [ "onChange" ], is = {
      width: 99,
      height: 99,
      position: "absolute",
      top: -9999,
      overflow: "scroll"
  };

  const as = ns(q.jsx("path", {
      d: "M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"
  }), "KeyboardArrowLeft"), ss = ns(q.jsx("path", {
      d: "M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"
  }), "KeyboardArrowRight");

  function ls(e, t) {
      return (ls = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
          return e.__proto__ = t, e;
      })(e, t);
  }

  const cs = e.createContext(null);

  function us(e$1, t) {
      var r = Object.create(null);
      return e$1 && e.Children.map(e$1, (function(e) {
          return e;
      })).forEach((function(e$1) {
          r[e$1.key] = function(e$1) {
              return t && e.isValidElement(e$1) ? t(e$1) : e$1;
          }(e$1);
      })), r;
  }

  function ds(e, t, r) {
      return null != r[t] ? r[t] : e.props[t];
  }

  function fs(e$1, t, r) {
      var n = us(e$1.children), o = function(e, t) {
          function r(r) {
              return r in t ? t[r] : e[r];
          }
          e = e || {}, t = t || {};
          var n, o = Object.create(null), i = [];
          for (var a in e) a in t ? i.length && (o[a] = i, i = []) : i.push(a);
          var s = {};
          for (var l in t) {
              if (o[l]) for (n = 0; n < o[l].length; n++) {
                  var c = o[l][n];
                  s[o[l][n]] = r(c);
              }
              s[l] = r(l);
          }
          for (n = 0; n < i.length; n++) s[i[n]] = r(i[n]);
          return s;
      }(t, n);
      return Object.keys(o).forEach((function(s) {
          var l = o[s];
          if (e.isValidElement(l)) {
              var c = s in t, u = s in n, d = t[s], f = e.isValidElement(d) && !d.props.in;
              !u || c && !f ? u || !c || f ? u && c && e.isValidElement(d) && (o[s] = e.cloneElement(l, {
                  onExited: r.bind(null, l),
                  in: d.props.in,
                  exit: ds(l, "exit", e$1),
                  enter: ds(l, "enter", e$1)
              })) : o[s] = e.cloneElement(l, {
                  in: !1
              }) : o[s] = e.cloneElement(l, {
                  onExited: r.bind(null, l),
                  in: !0,
                  exit: ds(l, "exit", e$1),
                  enter: ds(l, "enter", e$1)
              });
          }
      })), o;
  }

  var ps = Object.values || function(e) {
      return Object.keys(e).map((function(t) {
          return e[t];
      }));
  }, hs = function(e$1) {
      var r, n;
      function o(t, r) {
          var n, o = (n = e$1.call(this, t, r) || this).handleExited.bind(function(e) {
              if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return e;
          }(n));
          return n.state = {
              contextValue: {
                  isMounting: !0
              },
              handleExited: o,
              firstRender: !0
          }, n;
      }
      n = e$1, (r = o).prototype = Object.create(n.prototype), r.prototype.constructor = r, 
      ls(r, n);
      var i = o.prototype;
      return i.componentDidMount = function() {
          this.mounted = !0, this.setState({
              contextValue: {
                  isMounting: !1
              }
          });
      }, i.componentWillUnmount = function() {
          this.mounted = !1;
      }, o.getDerivedStateFromProps = function(e$1, t) {
          var r, n, o = t.children, i = t.handleExited;
          return {
              children: t.firstRender ? (r = e$1, n = i, us(r.children, (function(e$1) {
                  return e.cloneElement(e$1, {
                      onExited: n.bind(null, e$1),
                      in: !0,
                      appear: ds(e$1, "appear", r),
                      enter: ds(e$1, "enter", r),
                      exit: ds(e$1, "exit", r)
                  });
              }))) : fs(e$1, o, i),
              firstRender: !1
          };
      }, i.handleExited = function(e, t) {
          var r = us(this.props.children);
          e.key in r || (e.props.onExited && e.props.onExited(t), this.mounted && this.setState((function(t) {
              var r = Vt({}, t.children);
              return delete r[e.key], {
                  children: r
              };
          })));
      }, i.render = function() {
          var e$1 = this.props, r = e$1.component, n = e$1.childFactory, o = Wt(e$1, [ "component", "childFactory" ]), i = this.state.contextValue, a = ps(this.state.children).map(n);
          return delete o.appear, delete o.enter, delete o.exit, null === r ? e.createElement(cs.Provider, {
              value: i
          }, a) : e.createElement(cs.Provider, {
              value: i
          }, e.createElement(r, o, a));
      }, o;
  }(e.Component);

  hs.propTypes = {}, hs.defaultProps = {
      component: "div",
      childFactory: function(e) {
          return e;
      }
  };

  const ms = hs;

  const gs = Zr("MuiTouchRipple", [ "root", "ripple", "rippleVisible", "ripplePulsate", "child", "childLeaving", "childPulsate" ]), ys = [ "center", "classes", "className" ];

  let bs, vs, xs, Ss, ws = e => e;

  const Cs = react.keyframes(bs || (bs = ws`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`)), ks = react.keyframes(vs || (vs = ws`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`)), js = react.keyframes(xs || (xs = ws`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`)), Es = Ka("span", {
      name: "MuiTouchRipple",
      slot: "Root"
  })({
      overflow: "hidden",
      pointerEvents: "none",
      position: "absolute",
      zIndex: 0,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      borderRadius: "inherit"
  }), Rs = Ka((function(t) {
      const {className: r, classes: n, pulsate: o = !1, rippleX: i, rippleY: a, rippleSize: s, in: l, onExited: c, timeout: u} = t, [d, f] = e__namespace.useState(!1), p = ur(r, n.ripple, n.rippleVisible, o && n.ripplePulsate), h = {
          width: s,
          height: s,
          top: -s / 2 + a,
          left: -s / 2 + i
      }, m = ur(n.child, d && n.childLeaving, o && n.childPulsate);
      return l || d || f(!0), e__namespace.useEffect((() => {
          if (!l && null != c) {
              const e = setTimeout(c, u);
              return () => {
                  clearTimeout(e);
              };
          }
      }), [ c, l, u ]), q.jsx("span", {
          className: p,
          style: h,
          children: q.jsx("span", {
              className: m
          })
      });
  }), {
      name: "MuiTouchRipple",
      slot: "Ripple"
  })(Ss || (Ss = ws`
  opacity: 0;
  position: absolute;

  &.${0} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  &.${0} {
    animation-duration: ${0}ms;
  }

  & .${0} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${0} {
    opacity: 0;
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  & .${0} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${0};
    animation-duration: 2500ms;
    animation-timing-function: ${0};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`), gs.rippleVisible, Cs, 550, (({theme: e}) => e.transitions.easing.easeInOut), gs.ripplePulsate, (({theme: e}) => e.transitions.duration.shorter), gs.child, gs.childLeaving, ks, 550, (({theme: e}) => e.transitions.easing.easeInOut), gs.childPulsate, js, (({theme: e}) => e.transitions.easing.easeInOut)), Os = e__namespace.forwardRef((function(t, r) {
      const n = Ya({
          props: t,
          name: "MuiTouchRipple"
      }), {center: o = !1, classes: i = {}, className: a} = n, s = Wt(n, ys), [l, c] = e__namespace.useState([]), u = e__namespace.useRef(0), d = e__namespace.useRef(null);
      e__namespace.useEffect((() => {
          d.current && (d.current(), d.current = null);
      }), [ l ]);
      const f = e__namespace.useRef(!1), p = Pr(), h = e__namespace.useRef(null), m = e__namespace.useRef(null), g = e__namespace.useCallback((e => {
          const {pulsate: t, rippleX: r, rippleY: n, rippleSize: o, cb: a} = e;
          c((e => [ ...e, q.jsx(Rs, {
              classes: {
                  ripple: ur(i.ripple, gs.ripple),
                  rippleVisible: ur(i.rippleVisible, gs.rippleVisible),
                  ripplePulsate: ur(i.ripplePulsate, gs.ripplePulsate),
                  child: ur(i.child, gs.child),
                  childLeaving: ur(i.childLeaving, gs.childLeaving),
                  childPulsate: ur(i.childPulsate, gs.childPulsate)
              },
              timeout: 550,
              pulsate: t,
              rippleX: r,
              rippleY: n,
              rippleSize: o
          }, u.current) ])), u.current += 1, d.current = a;
      }), [ i ]), y = e__namespace.useCallback(((e = {}, t = {}, r = (() => {})) => {
          const {pulsate: n = !1, center: i = o || t.pulsate, fakeElement: a = !1} = t;
          if ("mousedown" === (null == e ? void 0 : e.type) && f.current) return void (f.current = !1);
          "touchstart" === (null == e ? void 0 : e.type) && (f.current = !0);
          const s = a ? null : m.current, l = s ? s.getBoundingClientRect() : {
              width: 0,
              height: 0,
              left: 0,
              top: 0
          };
          let c, u, d;
          if (i || void 0 === e || 0 === e.clientX && 0 === e.clientY || !e.clientX && !e.touches) c = Math.round(l.width / 2), 
          u = Math.round(l.height / 2); else {
              const {clientX: t, clientY: r} = e.touches && e.touches.length > 0 ? e.touches[0] : e;
              c = Math.round(t - l.left), u = Math.round(r - l.top);
          }
          if (i) d = Math.sqrt((2 * l.width ** 2 + l.height ** 2) / 3), d % 2 == 0 && (d += 1); else {
              const e = 2 * Math.max(Math.abs((s ? s.clientWidth : 0) - c), c) + 2, t = 2 * Math.max(Math.abs((s ? s.clientHeight : 0) - u), u) + 2;
              d = Math.sqrt(e ** 2 + t ** 2);
          }
          null != e && e.touches ? null === h.current && (h.current = () => {
              g({
                  pulsate: n,
                  rippleX: c,
                  rippleY: u,
                  rippleSize: d,
                  cb: r
              });
          }, p.start(80, (() => {
              h.current && (h.current(), h.current = null);
          }))) : g({
              pulsate: n,
              rippleX: c,
              rippleY: u,
              rippleSize: d,
              cb: r
          });
      }), [ o, g, p ]), b = e__namespace.useCallback((() => {
          y({}, {
              pulsate: !0
          });
      }), [ y ]), v = e__namespace.useCallback(((e, t) => {
          if (p.clear(), "touchend" === (null == e ? void 0 : e.type) && h.current) return h.current(), 
          h.current = null, void p.start(0, (() => {
              v(e, t);
          }));
          h.current = null, c((e => e.length > 0 ? e.slice(1) : e)), d.current = t;
      }), [ p ]);
      return e__namespace.useImperativeHandle(r, (() => ({
          pulsate: b,
          start: y,
          stop: v
      })), [ b, y, v ]), q.jsx(Es, Vt({
          className: ur(gs.root, i.root, a),
          ref: m
      }, s, {
          children: q.jsx(ms, {
              component: null,
              exit: !0,
              children: l
          })
      }));
  }));

  function Ts(e) {
      return Jr("MuiButtonBase", e);
  }

  const As = Zr("MuiButtonBase", [ "root", "disabled", "focusVisible" ]), $s = [ "action", "centerRipple", "children", "className", "component", "disabled", "disableRipple", "disableTouchRipple", "focusRipple", "focusVisibleClassName", "LinkComponent", "onBlur", "onClick", "onContextMenu", "onDragLeave", "onFocus", "onFocusVisible", "onKeyDown", "onKeyUp", "onMouseDown", "onMouseLeave", "onMouseUp", "onTouchEnd", "onTouchMove", "onTouchStart", "tabIndex", "TouchRippleProps", "touchRippleRef", "type" ], _s = Ka("button", {
      name: "MuiButtonBase",
      slot: "Root",
      overridesResolver: (e, t) => t.root
  })({
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      boxSizing: "border-box",
      WebkitTapHighlightColor: "transparent",
      backgroundColor: "transparent",
      outline: 0,
      border: 0,
      margin: 0,
      borderRadius: 0,
      padding: 0,
      cursor: "pointer",
      userSelect: "none",
      verticalAlign: "middle",
      MozAppearance: "none",
      WebkitAppearance: "none",
      textDecoration: "none",
      color: "inherit",
      "&::-moz-focus-inner": {
          borderStyle: "none"
      },
      [`&.${As.disabled}`]: {
          pointerEvents: "none",
          cursor: "default"
      },
      "@media print": {
          colorAdjust: "exact"
      }
  }), Ps = e__namespace.forwardRef((function(t, r) {
      const n = Ya({
          props: t,
          name: "MuiButtonBase"
      }), {action: o, centerRipple: i = !1, children: a, className: s, component: l = "button", disabled: c = !1, disableRipple: u = !1, disableTouchRipple: d = !1, focusRipple: f = !1, LinkComponent: p = "a", onBlur: h, onClick: m, onContextMenu: g, onDragLeave: y, onFocus: b, onFocusVisible: v, onKeyDown: x, onKeyUp: S, onMouseDown: w, onMouseLeave: C, onMouseUp: k, onTouchEnd: j, onTouchMove: E, onTouchStart: R, tabIndex: O = 0, TouchRippleProps: T, touchRippleRef: A, type: $} = n, _ = Wt(n, $s), P = e__namespace.useRef(null), M = e__namespace.useRef(null), I = Tr(M, A), {isFocusVisibleRef: B, onFocus: F, onBlur: N, ref: L} = Wr(), [z, D] = e__namespace.useState(!1);
      c && z && D(!1), e__namespace.useImperativeHandle(o, (() => ({
          focusVisible: () => {
              D(!0), P.current.focus();
          }
      })), []);
      const [W, V] = e__namespace.useState(!1);
      e__namespace.useEffect((() => {
          V(!0);
      }), []);
      const H = W && !u && !c;
      function K(e, t, r = d) {
          return Or((n => {
              t && t(n);
              return !r && M.current && M.current[e](n), !0;
          }));
      }
      e__namespace.useEffect((() => {
          z && f && !u && W && M.current.pulsate();
      }), [ u, f, z, W ]);
      const X = K("start", w), U = K("stop", g), G = K("stop", y), Y = K("stop", k), J = K("stop", (e => {
          z && e.preventDefault(), C && C(e);
      })), Z = K("start", R), Q = K("stop", j), ee = K("stop", E), te = K("stop", (e => {
          N(e), !1 === B.current && D(!1), h && h(e);
      }), !1), re = Or((e => {
          P.current || (P.current = e.currentTarget), F(e), !0 === B.current && (D(!0), v && v(e)), 
          b && b(e);
      })), ne = () => {
          const e = P.current;
          return l && "button" !== l && !("A" === e.tagName && e.href);
      }, oe = e__namespace.useRef(!1), ie = Or((e => {
          f && !oe.current && z && M.current && " " === e.key && (oe.current = !0, M.current.stop(e, (() => {
              M.current.start(e);
          }))), e.target === e.currentTarget && ne() && " " === e.key && e.preventDefault(), 
          x && x(e), e.target === e.currentTarget && ne() && "Enter" === e.key && !c && (e.preventDefault(), 
          m && m(e));
      })), ae = Or((e => {
          f && " " === e.key && M.current && z && !e.defaultPrevented && (oe.current = !1, 
          M.current.stop(e, (() => {
              M.current.pulsate(e);
          }))), S && S(e), m && e.target === e.currentTarget && ne() && " " === e.key && !e.defaultPrevented && m(e);
      }));
      let se = l;
      "button" === se && (_.href || _.to) && (se = p);
      const le = {};
      "button" === se ? (le.type = void 0 === $ ? "button" : $, le.disabled = c) : (_.href || _.to || (le.role = "button"), 
      c && (le["aria-disabled"] = c));
      const ce = Tr(r, L, P), ue = Vt({}, n, {
          centerRipple: i,
          component: l,
          disabled: c,
          disableRipple: u,
          disableTouchRipple: d,
          focusRipple: f,
          tabIndex: O,
          focusVisible: z
      }), de = (e => {
          const {disabled: t, focusVisible: r, focusVisibleClassName: n, classes: o} = e, i = Xr({
              root: [ "root", t && "disabled", r && "focusVisible" ]
          }, Ts, o);
          return r && n && (i.root += ` ${n}`), i;
      })(ue);
      return q.jsxs(_s, Vt({
          as: se,
          className: ur(de.root, s),
          ownerState: ue,
          onBlur: te,
          onClick: m,
          onContextMenu: U,
          onFocus: re,
          onKeyDown: ie,
          onKeyUp: ae,
          onMouseDown: X,
          onMouseLeave: J,
          onMouseUp: Y,
          onDragLeave: G,
          onTouchEnd: Q,
          onTouchMove: ee,
          onTouchStart: Z,
          ref: ce,
          tabIndex: c ? -1 : O,
          type: $
      }, le, _, {
          children: [ a, H ? q.jsx(Os, Vt({
              ref: I,
              center: i
          }, T)) : null ]
      }));
  }));

  function Ms(e) {
      return Jr("MuiTabScrollButton", e);
  }

  const Is = Zr("MuiTabScrollButton", [ "root", "vertical", "horizontal", "disabled" ]), Bs = [ "className", "slots", "slotProps", "direction", "orientation", "disabled" ], Fs = Ka(Ps, {
      name: "MuiTabScrollButton",
      slot: "Root",
      overridesResolver: (e, t) => {
          const {ownerState: r} = e;
          return [ t.root, r.orientation && t[r.orientation] ];
      }
  })((({ownerState: e}) => Vt({
      width: 40,
      flexShrink: 0,
      opacity: .8,
      [`&.${Is.disabled}`]: {
          opacity: 0
      }
  }, "vertical" === e.orientation && {
      width: "100%",
      height: 40,
      "& svg": {
          transform: `rotate(${e.isRtl ? -90 : 90}deg)`
      }
  }))), Ns = e__namespace.forwardRef((function(e, t) {
      var r, n;
      const o = Ya({
          props: e,
          name: "MuiTabScrollButton"
      }), {className: i, slots: a = {}, slotProps: s = {}, direction: l} = o, c = Wt(o, Bs), u = Vt({
          isRtl: an()
      }, o), d = (e => {
          const {classes: t, orientation: r, disabled: n} = e;
          return Xr({
              root: [ "root", r, n && "disabled" ]
          }, Ms, t);
      })(u), f = null != (r = a.StartScrollButtonIcon) ? r : as, p = null != (n = a.EndScrollButtonIcon) ? n : ss, h = nn({
          elementType: f,
          externalSlotProps: s.startScrollButtonIcon,
          additionalProps: {
              fontSize: "small"
          },
          ownerState: u
      }), m = nn({
          elementType: p,
          externalSlotProps: s.endScrollButtonIcon,
          additionalProps: {
              fontSize: "small"
          },
          ownerState: u
      });
      return q.jsx(Fs, Vt({
          component: "div",
          className: ur(d.root, i),
          ref: t,
          role: null,
          ownerState: u,
          tabIndex: null
      }, c, {
          children: "left" === l ? q.jsx(f, Vt({}, h)) : q.jsx(p, Vt({}, m))
      }));
  }));

  function Ls(e) {
      return Jr("MuiTabs", e);
  }

  const zs = Zr("MuiTabs", [ "root", "vertical", "flexContainer", "flexContainerVertical", "centered", "scroller", "fixed", "scrollableX", "scrollableY", "hideScrollbar", "scrollButtons", "scrollButtonsHideMobile", "indicator" ]), Ds = [ "aria-label", "aria-labelledby", "action", "centered", "children", "className", "component", "allowScrollButtonsMobile", "indicatorColor", "onChange", "orientation", "ScrollButtonComponent", "scrollButtons", "selectionFollowsFocus", "slots", "slotProps", "TabIndicatorProps", "TabScrollButtonProps", "textColor", "value", "variant", "visibleScrollbar" ], Ws = (e, t) => e === t ? e.firstChild : t && t.nextElementSibling ? t.nextElementSibling : e.firstChild, Vs = (e, t) => e === t ? e.lastChild : t && t.previousElementSibling ? t.previousElementSibling : e.lastChild, Hs = (e, t, r) => {
      let n = !1, o = r(e, t);
      for (;o; ) {
          if (o === e.firstChild) {
              if (n) return;
              n = !0;
          }
          const t = o.disabled || "true" === o.getAttribute("aria-disabled");
          if (o.hasAttribute("tabindex") && !t) return void o.focus();
          o = r(e, o);
      }
  }, Ks = Ka("div", {
      name: "MuiTabs",
      slot: "Root",
      overridesResolver: (e, t) => {
          const {ownerState: r} = e;
          return [ {
              [`& .${zs.scrollButtons}`]: t.scrollButtons
          }, {
              [`& .${zs.scrollButtons}`]: r.scrollButtonsHideMobile && t.scrollButtonsHideMobile
          }, t.root, r.vertical && t.vertical ];
      }
  })((({ownerState: e, theme: t}) => Vt({
      overflow: "hidden",
      minHeight: 48,
      WebkitOverflowScrolling: "touch",
      display: "flex"
  }, e.vertical && {
      flexDirection: "column"
  }, e.scrollButtonsHideMobile && {
      [`& .${zs.scrollButtons}`]: {
          [t.breakpoints.down("sm")]: {
              display: "none"
          }
      }
  }))), qs = Ka("div", {
      name: "MuiTabs",
      slot: "Scroller",
      overridesResolver: (e, t) => {
          const {ownerState: r} = e;
          return [ t.scroller, r.fixed && t.fixed, r.hideScrollbar && t.hideScrollbar, r.scrollableX && t.scrollableX, r.scrollableY && t.scrollableY ];
      }
  })((({ownerState: e}) => Vt({
      position: "relative",
      display: "inline-block",
      flex: "1 1 auto",
      whiteSpace: "nowrap"
  }, e.fixed && {
      overflowX: "hidden",
      width: "100%"
  }, e.hideScrollbar && {
      scrollbarWidth: "none",
      "&::-webkit-scrollbar": {
          display: "none"
      }
  }, e.scrollableX && {
      overflowX: "auto",
      overflowY: "hidden"
  }, e.scrollableY && {
      overflowY: "auto",
      overflowX: "hidden"
  }))), Xs = Ka("div", {
      name: "MuiTabs",
      slot: "FlexContainer",
      overridesResolver: (e, t) => {
          const {ownerState: r} = e;
          return [ t.flexContainer, r.vertical && t.flexContainerVertical, r.centered && t.centered ];
      }
  })((({ownerState: e}) => Vt({
      display: "flex"
  }, e.vertical && {
      flexDirection: "column"
  }, e.centered && {
      justifyContent: "center"
  }))), Us = Ka("span", {
      name: "MuiTabs",
      slot: "Indicator",
      overridesResolver: (e, t) => t.indicator
  })((({ownerState: e, theme: t}) => Vt({
      position: "absolute",
      height: 2,
      bottom: 0,
      width: "100%",
      transition: t.transitions.create()
  }, "primary" === e.indicatorColor && {
      backgroundColor: (t.vars || t).palette.primary.main
  }, "secondary" === e.indicatorColor && {
      backgroundColor: (t.vars || t).palette.secondary.main
  }, e.vertical && {
      height: "100%",
      width: 2,
      right: 0
  }))), Gs = Ka((function(t) {
      const {onChange: r} = t, n = Wt(t, os), o = e__namespace.useRef(), i = e__namespace.useRef(null), a = () => {
          o.current = i.current.offsetHeight - i.current.clientHeight;
      };
      return Rr((() => {
          const e = kr((() => {
              const e = o.current;
              a(), e !== o.current && r(o.current);
          })), t = Er(i.current);
          return t.addEventListener("resize", e), () => {
              e.clear(), t.removeEventListener("resize", e);
          };
      }), [ r ]), e__namespace.useEffect((() => {
          a(), r(o.current);
      }), [ r ]), q.jsx("div", Vt({
          style: is,
          ref: i
      }, n));
  }))({
      overflowX: "auto",
      overflowY: "hidden",
      scrollbarWidth: "none",
      "&::-webkit-scrollbar": {
          display: "none"
      }
  }), Ys = {}, Js = e__namespace.forwardRef((function(t, r) {
      const n = Ya({
          props: t,
          name: "MuiTabs"
      }), o = function() {
          const e = Ga(Va);
          return e[Ha] || e;
      }(), i = an(), {"aria-label": a, "aria-labelledby": s, action: l, centered: c = !1, children: u, className: d, component: f = "div", allowScrollButtonsMobile: p = !1, indicatorColor: h = "primary", onChange: m, orientation: g = "horizontal", ScrollButtonComponent: y = Ns, scrollButtons: b = "auto", selectionFollowsFocus: v, slots: x = {}, slotProps: S = {}, TabIndicatorProps: w = {}, TabScrollButtonProps: C = {}, textColor: k = "primary", value: j, variant: E = "standard", visibleScrollbar: R = !1} = n, O = Wt(n, Ds), T = "scrollable" === E, A = "vertical" === g, $ = A ? "scrollTop" : "scrollLeft", _ = A ? "top" : "left", P = A ? "bottom" : "right", M = A ? "clientHeight" : "clientWidth", I = A ? "height" : "width", B = Vt({}, n, {
          component: f,
          allowScrollButtonsMobile: p,
          indicatorColor: h,
          orientation: g,
          vertical: A,
          scrollButtons: b,
          textColor: k,
          variant: E,
          visibleScrollbar: R,
          fixed: !T,
          hideScrollbar: T && !R,
          scrollableX: T && !A,
          scrollableY: T && A,
          centered: c && !T,
          scrollButtonsHideMobile: !p
      }), F = (e => {
          const {vertical: t, fixed: r, hideScrollbar: n, scrollableX: o, scrollableY: i, centered: a, scrollButtonsHideMobile: s, classes: l} = e;
          return Xr({
              root: [ "root", t && "vertical" ],
              scroller: [ "scroller", r && "fixed", n && "hideScrollbar", o && "scrollableX", i && "scrollableY" ],
              flexContainer: [ "flexContainer", t && "flexContainerVertical", a && "centered" ],
              indicator: [ "indicator" ],
              scrollButtons: [ "scrollButtons", s && "scrollButtonsHideMobile" ],
              scrollableX: [ o && "scrollableX" ],
              hideScrollbar: [ n && "hideScrollbar" ]
          }, Ls, l);
      })(B), N = nn({
          elementType: x.StartScrollButtonIcon,
          externalSlotProps: S.startScrollButtonIcon,
          ownerState: B
      }), L = nn({
          elementType: x.EndScrollButtonIcon,
          externalSlotProps: S.endScrollButtonIcon,
          ownerState: B
      }), [z, D] = e__namespace.useState(!1), [W, V] = e__namespace.useState(Ys), [H, K] = e__namespace.useState(!1), [X, U] = e__namespace.useState(!1), [G, Y] = e__namespace.useState(!1), [J, Z] = e__namespace.useState({
          overflow: "hidden",
          scrollbarWidth: 0
      }), Q = new Map, ee = e__namespace.useRef(null), te = e__namespace.useRef(null), re = () => {
          const e = ee.current;
          let t, r;
          if (e) {
              const r = e.getBoundingClientRect();
              t = {
                  clientWidth: e.clientWidth,
                  scrollLeft: e.scrollLeft,
                  scrollTop: e.scrollTop,
                  scrollLeftNormalized: Kr(e, i ? "rtl" : "ltr"),
                  scrollWidth: e.scrollWidth,
                  top: r.top,
                  bottom: r.bottom,
                  left: r.left,
                  right: r.right
              };
          }
          if (e && !1 !== j) {
              const e = te.current.children;
              if (e.length > 0) {
                  const t = e[Q.get(j)];
                  r = t ? t.getBoundingClientRect() : null;
              }
          }
          return {
              tabsMeta: t,
              tabMeta: r
          };
      }, ne = Or((() => {
          const {tabsMeta: e, tabMeta: t} = re();
          let r, n = 0;
          if (A) r = "top", t && e && (n = t.top - e.top + e.scrollTop); else if (r = i ? "right" : "left", 
          t && e) {
              const o = i ? e.scrollLeftNormalized + e.clientWidth - e.scrollWidth : e.scrollLeft;
              n = (i ? -1 : 1) * (t[r] - e[r] + o);
          }
          const o = {
              [r]: n,
              [I]: t ? t[I] : 0
          };
          if (isNaN(W[r]) || isNaN(W[I])) V(o); else {
              const e = Math.abs(W[r] - o[r]), t = Math.abs(W[I] - o[I]);
              (e >= 1 || t >= 1) && V(o);
          }
      })), oe = (e, {animation: t = !0} = {}) => {
          t ? function(e, t, r, n = {}, o = (() => {})) {
              const {ease: i = Za, duration: a = 300} = n;
              let s = null;
              const l = t[e];
              const d = n => {
                  null === s && (s = n);
                  const u = Math.min(1, (n - s) / a);
                  t[e] = i(u) * (r - l) + l, u >= 1 ? requestAnimationFrame((() => {
                      o(null);
                  })) : requestAnimationFrame(d);
              };
              l === r ? o(new Error("Element already at target position")) : requestAnimationFrame(d);
          }($, ee.current, e, {
              duration: o.transitions.duration.standard
          }) : ee.current[$] = e;
      }, ie = e => {
          let t = ee.current[$];
          A ? t += e : (t += e * (i ? -1 : 1), t *= i && "reverse" === Hr() ? -1 : 1), oe(t);
      }, ae = () => {
          const e = ee.current[M];
          let t = 0;
          const r = Array.from(te.current.children);
          for (let n = 0; n < r.length; n += 1) {
              const o = r[n];
              if (t + o[M] > e) {
                  0 === n && (t = e);
                  break;
              }
              t += o[M];
          }
          return t;
      }, se = () => {
          ie(-1 * ae());
      }, le = () => {
          ie(ae());
      }, ce = e__namespace.useCallback((e => {
          Z({
              overflow: null,
              scrollbarWidth: e
          });
      }), []), ue = Or((e => {
          const {tabsMeta: t, tabMeta: r} = re();
          if (r && t) if (r[_] < t[_]) {
              const n = t[$] + (r[_] - t[_]);
              oe(n, {
                  animation: e
              });
          } else if (r[P] > t[P]) {
              const n = t[$] + (r[P] - t[P]);
              oe(n, {
                  animation: e
              });
          }
      })), de = Or((() => {
          T && !1 !== b && Y(!G);
      }));
      e__namespace.useEffect((() => {
          const e = kr((() => {
              ee.current && ne();
          }));
          let t;
          const r = r => {
              r.forEach((e => {
                  e.removedNodes.forEach((e => {
                      var r;
                      null == (r = t) || r.unobserve(e);
                  })), e.addedNodes.forEach((e => {
                      var r;
                      null == (r = t) || r.observe(e);
                  }));
              })), e(), de();
          }, n = Er(ee.current);
          let o;
          return n.addEventListener("resize", e), "undefined" != typeof ResizeObserver && (t = new ResizeObserver(e), 
          Array.from(te.current.children).forEach((e => {
              t.observe(e);
          }))), "undefined" != typeof MutationObserver && (o = new MutationObserver(r), o.observe(te.current, {
              childList: !0
          })), () => {
              var r, i;
              e.clear(), n.removeEventListener("resize", e), null == (r = o) || r.disconnect(), 
              null == (i = t) || i.disconnect();
          };
      }), [ ne, de ]), e__namespace.useEffect((() => {
          const e = Array.from(te.current.children), t = e.length;
          if ("undefined" != typeof IntersectionObserver && t > 0 && T && !1 !== b) {
              const r = e[0], n = e[t - 1], o = {
                  root: ee.current,
                  threshold: .99
              }, i = new IntersectionObserver((e => {
                  K(!e[0].isIntersecting);
              }), o);
              i.observe(r);
              const a = new IntersectionObserver((e => {
                  U(!e[0].isIntersecting);
              }), o);
              return a.observe(n), () => {
                  i.disconnect(), a.disconnect();
              };
          }
      }), [ T, b, G, null == u ? void 0 : u.length ]), e__namespace.useEffect((() => {
          D(!0);
      }), []), e__namespace.useEffect((() => {
          ne();
      })), e__namespace.useEffect((() => {
          ue(Ys !== W);
      }), [ ue, W ]), e__namespace.useImperativeHandle(l, (() => ({
          updateIndicator: ne,
          updateScrollButtons: de
      })), [ ne, de ]);
      const fe = q.jsx(Us, Vt({}, w, {
          className: ur(F.indicator, w.className),
          ownerState: B,
          style: Vt({}, W, w.style)
      }));
      let pe = 0;
      const he = e__namespace.Children.map(u, (t => {
          if (!e__namespace.isValidElement(t)) return null;
          const r = void 0 === t.props.value ? pe : t.props.value;
          Q.set(r, pe);
          const n = r === j;
          return pe += 1, e__namespace.cloneElement(t, Vt({
              fullWidth: "fullWidth" === E,
              indicator: n && !z && fe,
              selected: n,
              selectionFollowsFocus: v,
              onChange: m,
              textColor: k,
              value: r
          }, 1 !== pe || !1 !== j || t.props.tabIndex ? {} : {
              tabIndex: 0
          }));
      })), me = (() => {
          const e = {};
          e.scrollbarSizeListener = T ? q.jsx(Gs, {
              onChange: ce,
              className: ur(F.scrollableX, F.hideScrollbar)
          }) : null;
          const t = T && ("auto" === b && (H || X) || !0 === b);
          return e.scrollButtonStart = t ? q.jsx(y, Vt({
              slots: {
                  StartScrollButtonIcon: x.StartScrollButtonIcon
              },
              slotProps: {
                  startScrollButtonIcon: N
              },
              orientation: g,
              direction: i ? "right" : "left",
              onClick: se,
              disabled: !H
          }, C, {
              className: ur(F.scrollButtons, C.className)
          })) : null, e.scrollButtonEnd = t ? q.jsx(y, Vt({
              slots: {
                  EndScrollButtonIcon: x.EndScrollButtonIcon
              },
              slotProps: {
                  endScrollButtonIcon: L
              },
              orientation: g,
              direction: i ? "left" : "right",
              onClick: le,
              disabled: !X
          }, C, {
              className: ur(F.scrollButtons, C.className)
          })) : null, e;
      })();
      return q.jsxs(Ks, Vt({
          className: ur(F.root, d),
          ownerState: B,
          ref: r,
          as: f
      }, O, {
          children: [ me.scrollButtonStart, me.scrollbarSizeListener, q.jsxs(qs, {
              className: F.scroller,
              ownerState: B,
              style: {
                  overflow: J.overflow,
                  [A ? "margin" + (i ? "Left" : "Right") : "marginBottom"]: R ? void 0 : -J.scrollbarWidth
              },
              ref: ee,
              children: [ q.jsx(Xs, {
                  "aria-label": a,
                  "aria-labelledby": s,
                  "aria-orientation": "vertical" === g ? "vertical" : null,
                  className: F.flexContainer,
                  ownerState: B,
                  onKeyDown: e => {
                      const t = te.current, r = jr(t).activeElement;
                      if ("tab" !== r.getAttribute("role")) return;
                      let n = "horizontal" === g ? "ArrowLeft" : "ArrowUp", o = "horizontal" === g ? "ArrowRight" : "ArrowDown";
                      switch ("horizontal" === g && i && (n = "ArrowRight", o = "ArrowLeft"), e.key) {
                        case n:
                          e.preventDefault(), Hs(t, r, Vs);
                          break;

                        case o:
                          e.preventDefault(), Hs(t, r, Ws);
                          break;

                        case "Home":
                          e.preventDefault(), Hs(t, null, Ws);
                          break;

                        case "End":
                          e.preventDefault(), Hs(t, null, Vs);
                      }
                  },
                  ref: te,
                  role: "tablist",
                  children: he
              }), z && fe ]
          }), me.scrollButtonEnd ]
      }));
  }));

  function Zs(e) {
      return Jr("MuiTab", e);
  }

  const Qs = Zr("MuiTab", [ "root", "labelIcon", "textColorInherit", "textColorPrimary", "textColorSecondary", "selected", "disabled", "fullWidth", "wrapped", "iconWrapper" ]), el = [ "className", "disabled", "disableFocusRipple", "fullWidth", "icon", "iconPosition", "indicator", "label", "onChange", "onClick", "onFocus", "selected", "selectionFollowsFocus", "textColor", "value", "wrapped" ], tl = Ka(Ps, {
      name: "MuiTab",
      slot: "Root",
      overridesResolver: (e, t) => {
          const {ownerState: r} = e;
          return [ t.root, r.label && r.icon && t.labelIcon, t[`textColor${wr(r.textColor)}`], r.fullWidth && t.fullWidth, r.wrapped && t.wrapped ];
      }
  })((({theme: e, ownerState: t}) => Vt({}, e.typography.button, {
      maxWidth: 360,
      minWidth: 90,
      position: "relative",
      minHeight: 48,
      flexShrink: 0,
      padding: "12px 16px",
      overflow: "hidden",
      whiteSpace: "normal",
      textAlign: "center"
  }, t.label && {
      flexDirection: "top" === t.iconPosition || "bottom" === t.iconPosition ? "column" : "row"
  }, {
      lineHeight: 1.25
  }, t.icon && t.label && {
      minHeight: 72,
      paddingTop: 9,
      paddingBottom: 9,
      [`& > .${Qs.iconWrapper}`]: Vt({}, "top" === t.iconPosition && {
          marginBottom: 6
      }, "bottom" === t.iconPosition && {
          marginTop: 6
      }, "start" === t.iconPosition && {
          marginRight: e.spacing(1)
      }, "end" === t.iconPosition && {
          marginLeft: e.spacing(1)
      })
  }, "inherit" === t.textColor && {
      color: "inherit",
      opacity: .6,
      [`&.${Qs.selected}`]: {
          opacity: 1
      },
      [`&.${Qs.disabled}`]: {
          opacity: (e.vars || e).palette.action.disabledOpacity
      }
  }, "primary" === t.textColor && {
      color: (e.vars || e).palette.text.secondary,
      [`&.${Qs.selected}`]: {
          color: (e.vars || e).palette.primary.main
      },
      [`&.${Qs.disabled}`]: {
          color: (e.vars || e).palette.text.disabled
      }
  }, "secondary" === t.textColor && {
      color: (e.vars || e).palette.text.secondary,
      [`&.${Qs.selected}`]: {
          color: (e.vars || e).palette.secondary.main
      },
      [`&.${Qs.disabled}`]: {
          color: (e.vars || e).palette.text.disabled
      }
  }, t.fullWidth && {
      flexShrink: 1,
      flexGrow: 1,
      flexBasis: 0,
      maxWidth: "none"
  }, t.wrapped && {
      fontSize: e.typography.pxToRem(12)
  }))), rl = e__namespace.forwardRef((function(t, r) {
      const n = Ya({
          props: t,
          name: "MuiTab"
      }), {className: o, disabled: i = !1, disableFocusRipple: a = !1, fullWidth: s, icon: l, iconPosition: c = "top", indicator: u, label: d, onChange: f, onClick: p, onFocus: h, selected: m, selectionFollowsFocus: g, textColor: y = "inherit", value: b, wrapped: v = !1} = n, x = Wt(n, el), S = Vt({}, n, {
          disabled: i,
          disableFocusRipple: a,
          selected: m,
          icon: !!l,
          iconPosition: c,
          label: !!d,
          fullWidth: s,
          textColor: y,
          wrapped: v
      }), w = (e => {
          const {classes: t, textColor: r, fullWidth: n, wrapped: o, icon: i, label: a, selected: s, disabled: l} = e;
          return Xr({
              root: [ "root", i && a && "labelIcon", `textColor${wr(r)}`, n && "fullWidth", o && "wrapped", s && "selected", l && "disabled" ],
              iconWrapper: [ "iconWrapper" ]
          }, Zs, t);
      })(S), C = l && d && e__namespace.isValidElement(l) ? e__namespace.cloneElement(l, {
          className: ur(w.iconWrapper, l.props.className)
      }) : l;
      return q.jsxs(tl, Vt({
          focusRipple: !a,
          className: ur(w.root, o),
          ref: r,
          role: "tab",
          "aria-selected": m,
          disabled: i,
          onClick: e => {
              !m && f && f(e, b), p && p(e);
          },
          onFocus: e => {
              g && !m && f && f(e, b), h && h(e);
          },
          ownerState: S,
          tabIndex: m ? 0 : -1
      }, x, {
          children: [ "top" === c || "start" === c ? q.jsxs(e__namespace.Fragment, {
              children: [ C, d ]
          }) : q.jsxs(e__namespace.Fragment, {
              children: [ d, C ]
          }), u ]
      }));
  })), nl = Zr("MuiBox", [ "root" ]), ol = Wa(), il = function(t = {}) {
      const {themeId: r, defaultTheme: n, defaultClassName: o = "MuiBox-root", generateClassName: i} = t, a = yo("div", {
          shouldForwardProp: e => "theme" !== e && "sx" !== e && "as" !== e
      })(wi);
      return e__namespace.forwardRef((function(e, t) {
          const s = Ga(n), l = Ti(e), {className: c, component: u = "div"} = l, d = Wt(l, Ja);
          return q.jsx(a, Vt({
              as: u,
              ref: t,
              className: ur(c, i ? i(o) : o),
              theme: r && s[r] || s
          }, d));
      }));
  }({
      themeId: Ha,
      defaultTheme: ol,
      defaultClassName: nl.root,
      generateClassName: Gr.generate
  });

  function al() {
      const {logItems: e$1} = et(), t = e.useRef(null);
      return e.useEffect((() => {
          t.current && t.current.scrollIntoView({
              behavior: "smooth"
          });
      }), [ e$1 ]), q.jsxs(material.List, {
          dense: !0,
          sx: {},
          children: [ e$1.map(((e, t) => q.jsx(material.ListItem, {
              children: q.jsx(material.ListItemText, {
                  primary: e,
                  sx: {
                      typography: "overline",
                      lineHeight: "normal",
                      px: 0,
                      my: 0
                  },
                  disableTypography: !0
              })
          }, t))), q.jsx("div", {
              ref: t
          }) ]
      });
  }

  const sl = ({value: e$1, min: t = 0, max: r = 1 / 0, step: o = 1, decimalScale: i = 0, unit: a, singularUnit: s, helperText: l, textAlign: d = "center", hideActionButtons: f = !1, onChange: p, ...h}) => {
      var w, C;
      const [k, j] = e.useState(null == e$1 ? void 0 : e$1.toString()), E = Math.max(...[ t, r, o ].map((e => (e % 1 || 0).toString().length - 2)), 0), R = i > 0 || E > 0;
      i = i > 0 ? i : E;
      const O = cl(t, r, R), T = e => ll(e, t, r, i), A = T(k).toString() === k && void 0 !== e$1 ? T(e$1).toString() : k, $ = e => {
          j(e);
          const t = T(e);
          t.toString() === e && (null == p || p(t));
      }, _ = e => () => $(T(T(A) + e).toString());
      h ?? (h = {}), h.inputProps ?? (h.inputProps = {}), (w = h.inputProps).style ?? (w.style = {}), 
      (C = h.inputProps.style).textAlign ?? (C.textAlign = d), h.placeholder ?? (h.placeholder = Math.min(r, Math.max(t, 0)).toString());
      const P = ul(h);
      return f = f || h.readOnly || !1, s ?? (s = a), a ?? (a = s), q.jsx(material.Box, {
          children: q.jsxs(material.FormControl, {
              ...P,
              variant: "outlined",
              children: [ q.jsx(material.InputLabel, {
                  shrink: !0,
                  htmlFor: "number-input",
                  children: h.label
              }), q.jsx(material.OutlinedInput, {
                  notched: !0,
                  error: h.error || Number(k) < t || Number(k) > r,
                  ...h,
                  value: A,
                  id: "number-input",
                  onChange: e => $(e.target.value),
                  onBlur: e => $(T(e.target.value).toString()),
                  onKeyDown: e => {
                      const n = (e => {
                          if (e.ctrlKey || e.shiftKey || e.altKey) return;
                          if ("ArrowUp" === e.key) return void _(o)();
                          if ("ArrowDown" === e.key) return void _(-o)();
                          const t = e.key;
                          if (t.length > 1) return;
                          const r = t.charCodeAt(0);
                          return r < 32 || r > 126 && r < 160 || r > 255 ? void 0 : t;
                      })(e);
                      if (!n) return;
                      const i = e.target;
                      if (null == i.selectionStart || null == i.selectionEnd) return;
                      const a = i.value.substring(0, i.selectionStart) + n + i.value.substring(i.selectionEnd);
                      a.match(O) ? (Number(a) < t || Number(a) > r) && e.preventDefault() : e.preventDefault();
                  },
                  onPaste: e => {
                      var n;
                      const o = null == (n = e.clipboardData) ? void 0 : n.getData("Text");
                      (null == o ? void 0 : o.trim().match(O)) ? (Number(!(null == o ? void 0 : o.trim())) < t || Number(!(null == o ? void 0 : o.trim())) > r) && e.preventDefault() : e.preventDefault();
                  },
                  startAdornment: f ? void 0 : q.jsx(material.InputAdornment, {
                      position: "start",
                      children: q.jsx(material.IconButton, {
                          "aria-label": "decrease value",
                          onClick: _(-o),
                          edge: "start",
                          disabled: h.disabled || T(A) <= t,
                          children: q.jsx(material.Icon, {
                              children: "do_not_disturb_on"
                          })
                      })
                  }),
                  endAdornment: (a || !f) && q.jsxs(material.InputAdornment, {
                      position: "end",
                      children: [ a && q.jsx(material.Typography, {
                          className: "cursor-default select-none",
                          children: 1 === T(A) ? s : a
                      }), !f && q.jsx(material.IconButton, {
                          "aria-label": "increase value",
                          onClick: _(o),
                          edge: "end",
                          disabled: h.disabled || T(A) >= r,
                          color: void 0,
                          sx: {
                              "&:hover": {
                                  color: e => h.color || e.palette.primary.main
                              },
                              "&:focus": {
                                  color: e => h.color || e.palette.primary.main
                              },
                              transition: e => e.transitions.create("color")
                          },
                          children: q.jsx(material.Icon, {
                              children: "add_circle"
                          })
                      }) ]
                  })
              }), l && q.jsx(material.FormHelperText, {
                  children: l
              }) ]
          })
      });
  }, ll = (e, t = -1 / 0, r = 1 / 0, n = 0) => {
      let o = "number" == typeof e ? e : Number(e);
      return o = Math.min(r, Math.max(t, isNaN(o) ? 0 : o)), Number(o.toFixed(n));
  }, cl = (e, t, r) => {
      let n = "^";
      return n += t < 0 ? "-[0-9]*" : e > 0 ? "[0-9]+" : "-?[0-9]*", r && (n += "(\\.[0-9]*)?"), 
      n += "$", new RegExp(n);
  }, ul = e => ({
      color: e.color,
      disabled: e.disabled,
      error: e.error,
      fullWidth: e.fullWidth,
      required: e.required,
      variant: e.variant
  });

  function dl() {
      const {countTimes: e, standbyTime: t, setCountTimes: r, setStandbyTime: n} = tt();
      return tt((e => e._hasHydrated)) ? q.jsxs(material.List, {
          sx: {},
          children: [ q.jsx(material.ListItem, {
              sx: {
                  pt: 3
              },
              children: q.jsx(sl, {
                  label: "评论数量",
                  min: 1,
                  max: 10,
                  value: e,
                  onChange: r,
                  size: "small",
                  style: {
                      width: 130
                  }
              })
          }), q.jsx(material.ListItem, {
              sx: {
                  pt: 3
              },
              children: q.jsx(sl, {
                  label: "间隔时间（ms）",
                  min: 100,
                  max: 1e4,
                  value: t,
                  step: 100,
                  onChange: n,
                  size: "small",
                  style: {
                      width: 200
                  }
              })
          }), q.jsx(material.ListItem, {
              sx: {
                  pt: 3
              }
          }) ]
      }) : q.jsx("p", {
          children: "Loading..."
      });
  }

  function fl() {
      return q.jsxs(q.Fragment, {
          children: [ q.jsx(material.Typography, {
              variant: "body1",
              gutterBottom: !0,
              children: "本脚本用于自动化学习通讨论区的评论操作。"
          }), q.jsxs(material.Typography, {
              variant: "body2",
              gutterBottom: !0,
              children: [ "作者：", q.jsx("a", {
                  href: "http://github.com/lcandy2",
                  target: "_blank",
                  children: "@lcandy2"
              }) ]
          }) ]
      });
  }

  function pl(e) {
      const {children: t, value: r, index: n, ...o} = e;
      return q.jsx("div", {
          role: "tabpanel",
          hidden: r !== n,
          id: `cx-auto-tabpanel-${n}`,
          "aria-labelledby": `cx-auto-tab-${n}`,
          ...o,
          children: r === n && q.jsx(il, {
              sx: {
                  p: 0,
                  maxWidth: 280,
                  maxHeight: 300,
                  minWidth: 260,
                  minHeight: 200,
                  overflow: "auto"
              },
              children: t
          })
      });
  }

  function hl(e) {
      return {
          id: `cx-auto-tab-${e}`,
          "aria-controls": `cx-auto-tabpanel-${e}`
      };
  }

  function ml() {
      const [e$1, t] = e.useState(0), {isInActionFrame: r} = rt();
      return q.jsxs(il, {
          sx: {
              width: "100%"
          },
          children: [ q.jsx(il, {
              sx: {
                  borderBottom: 1,
                  borderColor: "divider"
              },
              children: q.jsxs(Js, {
                  value: e$1,
                  onChange: (e, r) => {
                      t(r);
                  },
                  "aria-label": "basic tabs example",
                  children: [ q.jsx(rl, {
                      disabled: r,
                      label: "状态",
                      ...hl(0)
                  }), q.jsx(rl, {
                      disabled: r,
                      label: "设定",
                      ...hl(1)
                  }), q.jsx(rl, {
                      disabled: r,
                      label: "关于",
                      ...hl(2)
                  }) ]
              })
          }), q.jsx(pl, {
              value: e$1,
              index: 0,
              children: q.jsx(al, {})
          }), q.jsx(pl, {
              value: e$1,
              index: 1,
              children: q.jsx(dl, {})
          }), q.jsx(pl, {
              value: e$1,
              index: 2,
              children: q.jsx(fl, {})
          }) ]
      });
  }

  function gl({title: e$1, canBeClosed: r = !0, handleClose: o, actions: i, draggableProps: a, dialogProps: s, maxWidth: l, children: u}) {
      const [d, f] = e.useState(!0), p = e.useRef(null);
      return d && q.jsx(P, {
          handle: "#draggable-dialog-title",
          cancel: '[class*="MuiDialogContent-root"]',
          nodeRef: p,
          ...a,
          children: q.jsx("div", {
              className: "floating-overlay",
              ref: p,
              children: q.jsxs(material.Dialog, {
                  open: !0,
                  hideBackdrop: !0,
                  disableEnforceFocus: !0,
                  disableAutoFocus: !0,
                  disableScrollLock: !0,
                  disablePortal: !0,
                  maxWidth: l || "xs",
                  "aria-labelledby": "draggable-dialog-title",
                  container: () => document.querySelector(".floating-overlay"),
                  ...s,
                  children: [ q.jsx(material.DialogTitle, {
                      style: {
                          cursor: "move"
                      },
                      id: "draggable-dialog-title",
                      children: e$1
                  }), r && q.jsx(material.IconButton, {
                      "aria-label": "close",
                      onClick: () => {
                          f(!1), o && o();
                      },
                      sx: {
                          position: "absolute",
                          right: 8,
                          top: 8,
                          color: e => e.palette.grey[500]
                      },
                      children: q.jsx(material.Icon, {
                          children: "close"
                      })
                  }), q.jsx(material.DialogContent, {
                      dividers: !0,
                      sx: {
                          p: 0
                      },
                      children: q.jsx(material.DialogContentText, {
                          component: "div",
                          children: u
                      })
                  }), i && q.jsx(material.DialogActions, {
                      children: i
                  }) ]
              })
          })
      });
  }

  function yl() {
      const [e$1, r] = e.useState(!0);
      e.useRef(null);
      const {isInActionFrame: o, actionFrameStatus: i, setCurrentStatus: a, setCurrentPage: s} = rt(), l = i.src;
      return e$1 && q.jsxs(q.Fragment, {
          children: [ q.jsx(gl, {
              title: "学习通自动化",
              actions: q.jsx(Dt, {}),
              canBeClosed: !o,
              handleClose: () => {
                  r(!1), a(null), s(null);
              },
              children: q.jsx(ml, {})
          }), l && q.jsxs(gl, {
              title: "--执行讨论回复中--",
              canBeClosed: !1,
              draggableProps: {
                  positionOffset: {
                      x: "300px",
                      y: "30px"
                  }
              },
              maxWidth: "sm",
              children: [ q.jsx("iframe", {
                  id: "cxauto_action",
                  src: l,
                  width: "600",
                  height: "460"
              }), q.jsx("div", {
                  id: "cxauto_action"
              }) ]
          }) ]
      });
  }

  var bl = {}, vl = M;

  bl.createRoot = vl.createRoot, bl.hydrateRoot = vl.hydrateRoot, console.log("Chaoxing auto start!!!"), 
  (ae() || se()) && (console.log("Topic Match"), bl.createRoot((() => {
      const e = document.createElement("div");
      return document.body.append(e), e;
  })()).render(q.jsx(e.StrictMode, {
      children: q.jsx(yl, {})
  })));

})(React, MaterialUI, emotionStyled, emotionReact, ReactDraggable, ReactDOM);