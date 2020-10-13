/** layuiAdmin.pro-v1.4.0 LPPL License By https://www.layui.com/admin/ */
layui
  .extend({
    setter: "config",
    admin: "lib/admin",
    view: "lib/view",
  })
  .define(["setter", "admin"], function (exports) {
    var setter = layui.setter,
      ele = layui.element,
      admin = layui.admin,
      tabsPage = admin.tabsPage,
      view = layui.view,
      render = function () {
        var router = layui.router(),
          path = router.path,
          correctRouter = admin.correctRouter(router.path.join("/"));

        path.length || (path = [""]),
          "" === path[path.length - 1] &&
            (path[path.length - 1] = setter.entry);

        var h = function (e) {
          render.haveInit &&
            jquery(".layui-layer").each(function () {
              var $this = jquery(this),
                a = $this.attr("times");
              $this.hasClass("layui-layim") || layer.close(a);
            }),
            (render.haveInit = !0),
            jquery(layAppBody).scrollTop(0),
            delete tabsPage.type;
        };

        return "tab" === tabsPage.type &&
          ("/" !== correctRouter ||
            ("/" === correctRouter && admin.tabsBody().html()))
          ? (admin.tabsBodyChange(tabsPage.index), h(tabsPage.type))
          : (view()
              .render(path.join("/"))
              .then(function (l) {
                var o,
                  r = jquery("#LAY_app_tabsheader>li");
                r.each(function (e) {
                  var a = jquery(this),
                    n = a.attr("lay-id");
                  n === correctRouter && ((o = !0), (tabsPage.index = e));
                }),
                  setter.pageTabs &&
                    "/" !== correctRouter &&
                    (o ||
                      (jquery(layAppBody).append(
                        '<div class="layadmin-tabsbody-item layui-show"></div>'
                      ),
                      (tabsPage.index = r.length),
                      ele.tabAdd(layadminLayoutTabs, {
                        title: "<span>" + (l.title || "新标签页") + "</span>",
                        id: correctRouter,
                        attr: router.href,
                      }))),
                  (this.container = admin.tabsBody(tabsPage.index)),
                  setter.pageTabs || this.container.scrollTop(0),
                  ele.tabChange(layadminLayoutTabs, correctRouter),
                  admin.tabsBodyChange(tabsPage.index);
              })
              .done(function () {
                layui.use("common", layui.cache.callback.common),
                  win.on("resize", layui.data.resize),
                  ele.render("breadcrumb", "breadcrumb"),
                  admin.tabsBody(tabsPage.index).on("scroll", function () {
                    var e = jquery(this),
                      a = jquery(".layui-laydate"),
                      n = jquery(".layui-layer")[0];
                    a[0] &&
                      (a.each(function () {
                        var e = jquery(this);
                        e.hasClass("layui-laydate-static") || e.remove();
                      }),
                      e.find("input").blur()),
                      n && layer.closeAll("tips");
                  });
              }),
            void h());
      },
      doRouter = function (e) {
        var n,
          router = layui.router(),
          v = view(setter.container),
          correctRouter = admin.correctRouter(router.path.join("/"));
        if (
          (layui.each(setter.indPage, function (e, a) {
            if (correctRouter === a) return (n = !0);
          }),
          layui.config({
            base: setter.base + "controller/",
          }),
          n || "/user/login" === correctRouter)
        )
          v.render(router.path.join("/")).done(function () {
            admin.pageType = "alone";
          });
        else {
          if (setter.interceptor) {
            var u = layui.data(setter.tableName);
            if (!u[setter.request.tokenName])
              return (location.hash = "/user/login/redirect=" + encodeURIComponent(correctRouter));
          }
          if ("console" === admin.pageType) {
            render();
          } else {
            v.render("layout").done(function () {
              render();
              layui.element.render();
              admin.screen() < 2 && admin.sideFlexible();
              admin.pageType = "console";
            });
          }
        }
      },
      layAppBody = "#LAY_app_body",
      layadminLayoutTabs = "layadmin-layout-tabs",
      jquery = layui.$,
      win = jquery(window);
    layui.link(
      setter.base + "style/admin.css?v=" + (admin.v + "-1"),
      function () {
        doRouter();
      },
      "layuiAdmin"
    ),
      (window.onhashchange = function () {
        doRouter(),
          layui.event.call(this, setter.MOD_NAME, "hash({*})", layui.router());
      }),
      layui.each(setter.extend, function (e, n) {
        var i = {};
        (i[n] = "{/}" + setter.base + "lib/extend/" + n), layui.extend(i);
      }),
      exports("index", {
        render: render,
      });
  });
