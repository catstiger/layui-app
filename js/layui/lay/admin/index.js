/** layuiAdmin.pro-v1.4.0 LPPL License By https://www.layui.com/admin/ */
;layui.extend({
  setter: "config",
  admin: "lib/admin",
  view: "lib/view"
}).define(["setter", "admin"], function(e) {
  var setter = layui.setter
    , ele = layui.element
    , admin = layui.admin
    , tabsPage = admin.tabsPage
    , view = layui.view
    , o = function() {
      var router = layui.router()
        , path = router.path
        , correctRouter = admin.correctRouter(router.path.join("/"));
      path.length || (path = [""]),
      "" === path[path.length - 1] && (path[path.length - 1] = setter.entry);
      var h = function(e) {
          o.haveInit && d(".layui-layer").each(function() {
              var e = d(this)
                , a = e.attr("times");
              e.hasClass("layui-layim") || layer.close(a)
          }),
          o.haveInit = !0,
          d(s).scrollTop(0),
          delete tabsPage.type
      };
      return "tab" === tabsPage.type && ("/" !== correctRouter || "/" === correctRouter && admin.tabsBody().html()) ? (admin.tabsBodyChange(tabsPage.index),
      h(tabsPage.type)) : (view().render(path.join("/")).then(function(l) {
          var o, r = d("#LAY_app_tabsheader>li");
          r.each(function(e) {
              var a = d(this)
                , n = a.attr("lay-id");
              n === correctRouter && (o = !0,
              tabsPage.index = e)
          }),
          setter.pageTabs && "/" !== correctRouter && (o || (d(s).append('<div class="layadmin-tabsbody-item layui-show"></div>'),
          tabsPage.index = r.length,
          ele.tabAdd(u, {
              title: "<span>" + (l.title || "新标签页") + "</span>",
              id: correctRouter,
              attr: router.href
          }))),
          this.container = admin.tabsBody(tabsPage.index),
          setter.pageTabs || this.container.scrollTop(0),
          ele.tabChange(u, correctRouter),
          admin.tabsBodyChange(tabsPage.index)
      }).done(function() {
          layui.use("common", layui.cache.callback.common),
          c.on("resize", layui.data.resize),
          ele.render("breadcrumb", "breadcrumb"),
          admin.tabsBody(tabsPage.index).on("scroll", function() {
              var e = d(this)
                , a = d(".layui-laydate")
                , n = d(".layui-layer")[0];
              a[0] && (a.each(function() {
                  var e = d(this);
                  e.hasClass("layui-laydate-static") || e.remove()
              }),
              e.find("input").blur()),
              n && layer.closeAll("tips")
          })
      }),
      void h())
  }
    , r = function(e) {
      var n, router = layui.router(), v = view(setter.container), correctRouter = admin.correctRouter(router.path.join("/"));
      if (layui.each(setter.indPage, function(e, a) {
          if (correctRouter === a)
              return n = !0
      }),
      layui.config({
          base: setter.base + "controller/"
      }),
      n || "/user/login" === correctRouter)
          v.render(router.path.join("/")).done(function() {
              admin.pageType = "alone"
          });
      else {
          if (setter.interceptor) {
              var u = layui.data(setter.tableName);
              if (!u[setter.request.tokenName])
                  return location.hash = "/user/login/redirect=" + encodeURIComponent(correctRouter)
          }
          "console" === admin.pageType ? o() : v.render("layout").done(function() {
              o(),
              layui.element.render(),
              admin.screen() < 2 && admin.sideFlexible(),
              admin.pageType = "console"
          })
      }
  }
    , s = "#LAY_app_body"
    , u = "layadmin-layout-tabs"
    , d = layui.$
    , c = d(window);
  layui.link(setter.base + "style/admin.css?v=" + (admin.v + "-1"), function() {
      r()
  }, "layuiAdmin"),
  window.onhashchange = function() {
      r(),
      layui.event.call(this, setter.MOD_NAME, "hash({*})", layui.router())
  }
  ,
  layui.each(setter.extend, function(e, n) {
      var i = {};
      i[n] = "{/}" + setter.base + "lib/extend/" + n,
      layui.extend(i)
  }),
  e("index", {
      render: o
  })
});
