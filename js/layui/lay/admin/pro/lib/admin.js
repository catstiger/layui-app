/** layuiAdmin.pro-v1.4.0 LPPL License By https://www.layui.com/admin/ */
layui.define("view", function (e) {
  var jquery = layui.jquery,
    layTpl = layui.laytpl,
    ele = layui.element,
    setter = layui.setter,
    view = layui.view,
    device = layui.device(),
    win = jquery(window),
    body = jquery("body"),
    container = jquery("#" + setter.container),
    layuiShow = "layui-show",
    layuiThis = "layui-this",
    layuiDisabled = "layui-disabled",
    layAppBody = "#LAY_app_body",
    layAppFlexible = "LAY_app_flexible",
    layadminSideSpreadSm = "layadmin-side-spread-sm",
    layadminTabsbodyItem = "layadmin-tabsbody-item",
    layuiIconShrinkRight = "layui-icon-shrink-right",
    layuiIconSpreadLeft = "layui-icon-spread-left",
    layadminSideShrink = "layadmin-side-shrink",
    laySystemSideMenu = "LAY-system-side-menu",
    C = {
      v: "1.4.0 pro",
      req: view.req,
      exit: view.exit,
      escape: function (e) {
        return String(e || "")
          .replace(/&(?!#?[a-zA-Z0-9]+;)/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/'/g, "&#39;")
          .replace(/"/g, "&quot;");
      },
      on: function (e, a) {
        return layui.onevent.call(this, setter.MOD_NAME, e, a);
      },
      popup: view.popup,
      popupRight: function (e) {
        return (C.popup.index = layer.open(
          jquery.extend(
            {
              type: 1,
              id: "LAY_adminPopupR",
              anim: -1,
              title: !1,
              closeBtn: !1,
              offset: "r",
              shade: 0.1,
              shadeClose: !0,
              skin: "layui-anim layui-anim-rl layui-layer-adminRight",
              area: "300px",
            },
            e
          )
        ));
      },
      sendAuthCode: function (e) {
        e = jquery.extend(
          {
            seconds: 60,
            elemPhone: "#LAY_phone",
            elemVercode: "#LAY_vercode",
          },
          e
        );
        var t,
          i = e.seconds,
          n = function (l) {
            var s = jquery(e.elem);
            i--,
              i < 0
                ? (s.removeClass(layuiDisabled).html("获取验证码"),
                  (i = e.seconds),
                  clearInterval(t))
                : s.addClass(layuiDisabled).html(i + "秒后重获"),
              l ||
                (t = setInterval(function () {
                  n(!0);
                }, 1e3));
          };
        body.off("click", e.elem).on("click", e.elem, function () {
          (e.elemPhone = jquery(e.elemPhone)),
            (e.elemVercode = jquery(e.elemVercode));
          var t = e.elemPhone,
            l = t.val();
          if (i === e.seconds && !jquery(this).hasClass(layuiDisabled)) {
            if (!/^1\d{10}$/.test(l))
              return t.focus(), layer.msg("请输入正确的手机号");
            if ("object" == typeof e.ajax) {
              var s = e.ajax.success;
              delete e.ajax.success;
            }
            C.req(
              jquery.extend(
                !0,
                {
                  url: "/auth/code",
                  type: "get",
                  data: {
                    phone: l,
                  },
                  success: function (a) {
                    layer.msg("验证码已发送至你的手机，请注意查收", {
                      icon: 1,
                      shade: 0,
                    }),
                      e.elemVercode.focus(),
                      n(),
                      s && s(a);
                  },
                },
                e.ajax
              )
            );
          }
        });
      },
      screen: function () {
        var e = win.width();
        return e > 1200 ? 3 : e > 992 ? 2 : e > 768 ? 1 : 0;
      },
      sideFlexible: function (e) {
        var t = container,
          i = jquery("#" + layAppFlexible),
          l = C.screen();
        "spread" === e
          ? (i.removeClass(layuiIconSpreadLeft).addClass(layuiIconShrinkRight),
            l < 2
              ? t.addClass(layadminSideSpreadSm)
              : t.removeClass(layadminSideSpreadSm),
            t.removeClass(layadminSideShrink))
          : (i.removeClass(layuiIconShrinkRight).addClass(layuiIconSpreadLeft),
            l < 2
              ? t.removeClass(layadminSideShrink)
              : t.addClass(layadminSideShrink),
            t.removeClass(layadminSideSpreadSm)),
          layui.event.call(this, setter.MOD_NAME, "side({*})", {
            status: e,
          });
      },
      resizeTable: function (e) {
        var t = this,
          i = function () {
            t.tabsBody(C.tabsPage.index)
              .find(".layui-table-view")
              .each(function () {
                var e = jquery(this).attr("lay-id");
                layui.table.resize(e);
              });
          };
        layui.table && (e ? setTimeout(i, e) : i());
      },
      theme: function (e) {
        var i = (setter.theme, layui.data(setter.tableName)),
          l = "LAY_layadmin_theme",
          s = document.createElement("style"),
          r = layTpl(
            [
              ".layui-side-menu,",
              ".layadmin-pagetabs .layui-tab-title li:after,",
              ".layadmin-pagetabs .layui-tab-title li.layui-this:after,",
              ".layui-layer-admin .layui-layer-title,",
              ".layadmin-side-shrink .layui-side-menu .layui-nav>.layui-nav-item>.layui-nav-child",
              "{background-color:{{d.color.main}} !important;}",
              ".layui-nav-tree .layui-this,",
              ".layui-nav-tree .layui-this>a,",
              ".layui-nav-tree .layui-nav-child dd.layui-this,",
              ".layui-nav-tree .layui-nav-child dd.layui-this a",
              "{background-color:{{d.color.selected}} !important;}",
              ".layui-layout-admin .layui-logo{background-color:{{d.color.logo || d.color.main}} !important;}",
              "{{# if(d.color.header){ }}",
              ".layui-layout-admin .layui-header{background-color:{{ d.color.header }};}",
              ".layui-layout-admin .layui-header a,",
              ".layui-layout-admin .layui-header a cite{color: #f8f8f8;}",
              ".layui-layout-admin .layui-header a:hover{color: #fff;}",
              ".layui-layout-admin .layui-header .layui-nav .layui-nav-more{border-top-color: #fbfbfb;}",
              ".layui-layout-admin .layui-header .layui-nav .layui-nav-mored{border-color: transparent; border-bottom-color: #fbfbfb;}",
              ".layui-layout-admin .layui-header .layui-nav .layui-this:after, .layui-layout-admin .layui-header .layui-nav-bar{background-color: #fff; background-color: rgba(255,255,255,.5);}",
              ".layadmin-pagetabs .layui-tab-title li:after{display: none;}",
              "{{# } }}",
            ].join("")
          ).render((e = jquery.extend({}, i.theme, e))),
          u = document.getElementById(l);
        "styleSheet" in s
          ? (s.setAttribute("type", "text/css"), (s.styleSheet.cssText = r))
          : (s.innerHTML = r),
          (s.id = l),
          u && body[0].removeChild(u),
          body[0].appendChild(s),
          body.attr("layadmin-themealias", e.color.alias),
          (i.theme = i.theme || {}),
          layui.each(e, function (e, a) {
            i.theme[e] = a;
          }),
          layui.data(setter.tableName, {
            key: "theme",
            value: i.theme,
          });
      },
      initTheme: function (e) {
        var a = setter.theme;
        (e = e || 0),
          a.color[e] &&
            ((a.color[e].index = e),
            C.theme({
              color: a.color[e],
            }));
      },
      tabsPage: {},
      tabsHeader: function (e) {
        return jquery("#LAY_app_tabsheader")
          .children("li")
          .eq(e || 0);
      },
      tabsBody: function (e) {
        return jquery(layAppBody)
          .find("." + layadminTabsbodyItem)
          .eq(e || 0);
      },
      tabsBodyChange: function (e) {
        C.tabsHeader(e).attr("lay-attr", layui.router().href),
          C.tabsBody(e).addClass(layuiShow).siblings().removeClass(layuiShow),
          k.rollPage("auto", e);
      },
      resize: function (e) {
        var a = layui.router(),
          t = a.path.join("-");
        C.resizeFn[t] &&
          (win.off("resize", C.resizeFn[t]), delete C.resizeFn[t]),
          "off" !== e &&
            (e(), (C.resizeFn[t] = e), win.on("resize", C.resizeFn[t]));
      },
      resizeFn: {},
      runResize: function () {
        var e = layui.router(),
          a = e.path.join("-");
        C.resizeFn[a] && C.resizeFn[a]();
      },
      delResize: function () {
        this.resize("off");
      },
      closeThisTabs: function () {
        C.tabsPage.index &&
          jquery(z)
            .eq(C.tabsPage.index)
            .find(".layui-tab-close")
            .trigger("click");
      },
      fullScreen: function () {
        var e = document.documentElement,
          a =
            e.requestFullScreen ||
            e.webkitRequestFullScreen ||
            e.mozRequestFullScreen ||
            e.msRequestFullscreen;
        "undefined" != typeof a && a && a.call(e);
      },
      exitScreen: function () {
        document.documentElement;
        document.exitFullscreen
          ? document.exitFullscreen()
          : document.mozCancelFullScreen
          ? document.mozCancelFullScreen()
          : document.webkitCancelFullScreen
          ? document.webkitCancelFullScreen()
          : document.msExitFullscreen && document.msExitFullscreen();
      },
      correctRouter: function (e) {
        return (
          /^\//.test(e) || (e = "/" + e),
          e
            .replace(/^(\/+)/, "/")
            .replace(new RegExp("/" + setter.entry + "$"), "/")
        );
      },
    },
    k = (C.events = {
      flexible: function (e) {
        var a = e.find("#" + layAppFlexible),
          t = a.hasClass(layuiIconSpreadLeft);
        C.sideFlexible(t ? "spread" : null), C.resizeTable(350);
      },
      refresh: function () {
        layui.index.render();
      },
      serach: function (e) {
        e.off("keypress").on("keypress", function (a) {
          if (this.value.replace(/\s/g, "") && 13 === a.keyCode) {
            var t = e.attr("lay-action"),
              i = e.attr("lay-text") || "搜索";
            (t += this.value),
              (i =
                i +
                ' <span style="color: #FF5722;">' +
                C.escape(this.value) +
                "</span>"),
              (location.hash = C.correctRouter(t)),
              k.serach.keys || (k.serach.keys = {}),
              (k.serach.keys[C.tabsPage.index] = this.value),
              this.value === k.serach.keys[C.tabsPage.index] && k.refresh(e),
              (this.value = "");
          }
        });
      },
      message: function (e) {
        e.find(".layui-badge-dot").remove();
      },
      theme: function () {
        C.popupRight({
          id: "LAY_adminPopupTheme",
          success: function () {
            view(this.id).render("system/theme");
          },
        });
      },
      note: function (e) {
        var a = C.screen() < 2,
          t = layui.data(setter.tableName).note;
        k.note.index = C.popup({
          title: "便签",
          shade: 0,
          offset: ["41px", a ? null : e.offset().left - 250 + "px"],
          anim: -1,
          id: "LAY_adminNote",
          skin: "layadmin-note layui-anim layui-anim-upbit",
          content: '<textarea placeholder="内容"></textarea>',
          resize: !1,
          success: function (e, a) {
            var i = e.find("textarea"),
              l =
                void 0 === t
                  ? "便签中的内容会存储在本地，这样即便你关掉了浏览器，在下次打开时，依然会读取到上一次的记录。是个非常小巧实用的本地备忘录"
                  : t;
            i.val(l)
              .focus()
              .on("keyup", function () {
                layui.data(setter.tableName, {
                  key: "note",
                  value: this.value,
                });
              });
          },
        });
      },
      fullscreen: function (e) {
        var a = "layui-icon-screen-full",
          t = "layui-icon-screen-restore",
          i = e.children("i");
        i.hasClass(a)
          ? (C.fullScreen(), i.addClass(t).removeClass(a))
          : (C.exitScreen(), i.addClass(a).removeClass(t));
      },
      about: function () {
        C.popupRight({
          id: "LAY_adminPopupAbout",
          success: function () {
            view(this.id).render("system/about");
          },
        });
      },
      more: function () {
        C.popupRight({
          id: "LAY_adminPopupMore",
          success: function () {
            view(this.id).render("system/more");
          },
        });
      },
      back: function () {
        history.back();
      },
      setTheme: function (e) {
        var a = e.data("index");
        e.siblings(".layui-this").data("index");
        e.hasClass(layuiThis) ||
          (e.addClass(layuiThis).siblings(".layui-this").removeClass(layuiThis),
          C.initTheme(a));
      },
      rollPage: function (e, t) {
        var i = jquery("#LAY_app_tabsheader"),
          n = i.children("li"),
          l = (i.prop("scrollWidth"), i.outerWidth()),
          s = parseFloat(i.css("left"));
        if ("left" === e) {
          if (!s && s <= 0) return;
          var r = -s - l;
          n.each(function (e, t) {
            var n = jquery(t),
              l = n.position().left;
            if (l >= r) return i.css("left", -l), !1;
          });
        } else
          "auto" === e
            ? !(function () {
                var e,
                  r = n.eq(t);
                if (r[0]) {
                  if (((e = r.position().left), e < -s))
                    return i.css("left", -e);
                  if (e + r.outerWidth() >= l - s) {
                    var o = e + r.outerWidth() - (l - s);
                    n.each(function (e, t) {
                      var n = jquery(t),
                        l = n.position().left;
                      if (l + s > 0 && l - s > o) return i.css("left", -l), !1;
                    });
                  }
                }
              })()
            : n.each(function (e, t) {
                var n = jquery(t),
                  r = n.position().left;
                if (r + n.outerWidth() >= l - s) return i.css("left", -r), !1;
              });
      },
      leftPage: function () {
        k.rollPage("left");
      },
      rightPage: function () {
        k.rollPage();
      },
      closeThisTabs: function () {
        C.closeThisTabs();
      },
      closeOtherTabs: function (e) {
        var t = "LAY-system-pagetabs-remove";
        "all" === e
          ? (jquery(z + ":gt(0)").remove(),
            jquery(layAppBody)
              .find("." + layadminTabsbodyItem + ":gt(0)")
              .remove())
          : (jquery(z).each(function (e, i) {
              e &&
                e != C.tabsPage.index &&
                (jquery(i).addClass(t), C.tabsBody(e).addClass(t));
            }),
            jquery("." + t).remove());
      },
      closeAllTabs: function () {
        k.closeOtherTabs("all"), (location.hash = "");
      },
      shade: function () {
        C.sideFlexible();
      },
      update: function () {
        jquery.ajax({
          type: "get",
          dataType: "jsonp",
          data: {
            name: "layuiAdmin",
            version: C.v,
          },
          url: "https://fly.layui.com/api/product_update/",
          success: function (e) {
            0 === e.status
              ? e.version === C.v.replace(/\s|pro|std/g, "")
                ? layer.alert("当前版本已经是最新版本")
                : layer.alert(
                    "检查到更新，是否前往下载？",
                    {
                      btn: ["更新", "暂不"],
                    },
                    function (e) {
                      layer.close(e),
                        layer.open({
                          type: 2,
                          content: "https://fly.layui.com/user/product/",
                          area: ["100%", "100%"],
                          title: "检查更新",
                        });
                    }
                  )
              : 1 == e.status
              ? layer.alert(
                  e.msg,
                  {
                    btn: ["登入", "暂不"],
                  },
                  function (e) {
                    layer.close(e),
                      layer.open({
                        type: 2,
                        content: "https://fly.layui.com/user/login/",
                        area: ["100%", "100%"],
                        title: "检查更新",
                      });
                  }
                )
              : layer.msg(e.msg || e.code, {
                  shift: 6,
                });
          },
          error: function (e) {
            layer.msg("请求异常，请重试", {
              shift: 6,
            });
          },
        });
      },
    });
  !(function () {
    var e = layui.data(setter.tableName);
    e.theme
      ? C.theme(e.theme)
      : setter.theme && C.initTheme(setter.theme.initColorIndex),
      body.addClass("layui-layout-body"),
      C.screen() < 1 && delete setter.pageTabs,
      setter.pageTabs || container.addClass("layadmin-tabspage-none"),
      device.ie &&
        device.ie < 10 &&
        view.error(
          "IE" +
            device.ie +
            "下访问可能不佳，推荐使用：Chrome / Firefox / Edge 等高级浏览器",
          {
            offset: "auto",
            id: "LAY_errorIE",
          }
        );
  })(),
    C.on("hash(side)", function (e) {
      var t = e.path,
        i = function (e) {
          return {
            list: e.children(".layui-nav-child"),
            name: e.data("name"),
            jump: e.data("jump"),
          };
        },
        n = jquery("#" + laySystemSideMenu),
        l = "layui-nav-itemed",
        s = function (e) {
          var n = C.correctRouter(t.join("/"));
          e.each(function (e, s) {
            var r = jquery(s),
              o = i(r),
              u = o.list.children("dd"),
              c =
                t[0] == o.name ||
                (0 === e && !t[0]) ||
                (o.jump && n == C.correctRouter(o.jump));
            if (
              (u.each(function (e, s) {
                var r = jquery(s),
                  u = i(r),
                  c = u.list.children("dd"),
                  y =
                    (t[0] == o.name && t[1] == u.name) ||
                    (u.jump && n == C.correctRouter(u.jump));
                if (
                  (c.each(function (e, s) {
                    var r = jquery(s),
                      c = i(r),
                      y =
                        (t[0] == o.name && t[1] == u.name && t[2] == c.name) ||
                        (c.jump && n == C.correctRouter(c.jump));
                    if (y) {
                      var m = c.list[0] ? l : layuiThis;
                      return r.addClass(m).siblings().removeClass(m), !1;
                    }
                  }),
                  y)
                ) {
                  var m = u.list[0] ? l : layuiThis;
                  return r.addClass(m).siblings().removeClass(m), !1;
                }
              }),
              c)
            ) {
              var y = o.list[0] ? l : layuiThis;
              return r.addClass(y).siblings().removeClass(y), !1;
            }
          });
        };
      n.find("." + layuiThis).removeClass(layuiThis),
        C.screen() < 2 && C.sideFlexible(),
        s(n.children("li"));
    }),
    ele.on("nav(layadmin-system-side-menu)", function (e) {
      e.siblings(".layui-nav-child")[0] &&
        container.hasClass(layadminSideShrink) &&
        (C.sideFlexible("spread"), layer.close(e.data("index"))),
        (C.tabsPage.type = "nav");
    }),
    ele.on("nav(layadmin-pagetabs-nav)", function (e) {
      var a = e.parent();
      a.removeClass(layuiThis), a.parent().removeClass(layuiShow);
    });
  var F = function (e) {
      var a = e.attr("lay-id"),
        t = e.attr("lay-attr"),
        i = e.index();
      (location.hash = a === setter.entry ? "/" : t || "/"),
        C.tabsBodyChange(i);
    },
    z = "#LAY_app_tabsheader>li";
  body.on("click", z, function () {
    var e = jquery(this),
      t = e.index();
    return (
      (C.tabsPage.type = "tab"),
      (C.tabsPage.index = t),
      "iframe" === e.attr("lay-attr")
        ? C.tabsBodyChange(t)
        : (F(e), C.runResize(), void C.resizeTable())
    );
  }),
    ele.on("tabDelete(layadmin-layout-tabs)", function (e) {
      var t = jquery(z + ".layui-this");
      e.index && C.tabsBody(e.index).remove(), F(t), C.delResize();
    }),
    body.on("click", "*[lay-href]", function () {
      var e = jquery(this),
        t = e.attr("lay-href"),
        i = layui.router();
      (C.tabsPage.elem = e),
        (location.hash = C.correctRouter(t)),
        C.correctRouter(t) === i.href && C.events.refresh();
    }),
    body.on("click", "*[layadmin-event]", function () {
      var e = jquery(this),
        t = e.attr("layadmin-event");
      k[t] && k[t].call(this, e);
    }),
    body
      .on("mouseenter", "*[lay-tips]", function () {
        var e = jquery(this);
        if (
          !e.parent().hasClass("layui-nav-item") ||
          container.hasClass(layadminSideShrink)
        ) {
          var t = e.attr("lay-tips"),
            i = e.attr("lay-offset"),
            n = e.attr("lay-direction"),
            l = layer.tips(t, this, {
              tips: n || 1,
              time: -1,
              success: function (e, a) {
                i && e.css("margin-left", i + "px");
              },
            });
          e.data("index", l);
        }
      })
      .on("mouseleave", "*[lay-tips]", function () {
        layer.close(jquery(this).data("index"));
      });
  var A = (layui.data.resizeSystem = function () {
    layer.closeAll("tips"),
      A.lock ||
        setTimeout(function () {
          C.sideFlexible(C.screen() < 2 ? "" : "spread"), delete A.lock;
        }, 100),
      (A.lock = !0);
  });
  win.on("resize", layui.data.resizeSystem), e("admin", C);
});
