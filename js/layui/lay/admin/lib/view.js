/** layuiAdmin.pro-v1.4.0 LPPL License By https://www.layui.com/admin/ */
layui.define(["laytpl", "layer"], function (e) {
  var jquery = layui.jquery,
    laytpl = layui.laytpl,
    layer = layui.layer,
    setter = layui.setter,
    o = (layui.device(), layui.hint()),
    i = function (e) {
      return new d(e);
    },
    layAppBody = "LAY_app_body",
    d = function (e) {
      (this.id = e), (this.container = jquery("#" + (e || layAppBody)));
    };
  (i.loading = function (e) {
    e.append(
      (this.elemLoad = jquery(
        '<i class="layui-anim layui-anim-rotate layui-anim-loop layui-icon layui-icon-loading layadmin-loading"></i>'
      ))
    );
  }),
    (i.removeLoad = function () {
      this.elemLoad && this.elemLoad.remove();
    }),
    (i.exit = function () {
      layui.data(setter.tableName, {
        key: setter.request.tokenName,
        remove: !0,
      }),
        (location.hash = "/user/login");
    }),
    (i.req = function (e) {
      var success = e.success,
        error = e.error,
        request = setter.request,
        response = setter.response,
        d = function () {
          return setter.debug ? "<br><cite>URL：</cite>" + e.url : "";
        };
      if (
        ((e.data = e.data || {}),
        (e.headers = e.headers || {}),
        request.tokenName)
      ) {
        var l = "string" == typeof e.data ? JSON.parse(e.data) : e.data;
        (e.data[request.tokenName] =
          request.tokenName in l
            ? e.data[request.tokenName]
            : layui.data(setter.tableName)[request.tokenName] || ""),
          (e.headers[request.tokenName] =
            request.tokenName in e.headers
              ? e.headers[request.tokenName]
              : layui.data(setter.tableName)[request.tokenName] || "");
      }
      return (
        delete e.success,
        delete e.error,
        jquery.ajax(
          jquery.extend(
            {
              type: "get",
              dataType: "json",
              success: function (t) {
                var n = response.statusCode;
                if (t[response.statusName] == n.ok)
                  "function" == typeof e.done && e.done(t);
                else if (t[response.statusName] == n.logout) i.exit();
                else {
                  var r = [
                    "<cite>Error：</cite> " +
                      (t[response.msgName] || "返回状态码异常"),
                    d(),
                  ].join("");
                  i.error(r);
                }
                "function" == typeof success && success(t);
              },
              error: function (e, t) {
                var a = [
                  "请求异常，请重试<br><cite>错误信息：</cite>" + t,
                  d(),
                ].join("");
                i.error(a), "function" == typeof error && error(res);
              },
            },
            e
          )
        )
      );
    }),
    (i.popup = function (e) {
      var a = e.success,
        r = e.skin;
      return (
        delete e.success,
        delete e.skin,
        layer.open(
          jquery.extend(
            {
              type: 1,
              title: "提示",
              content: "",
              id: "LAY-system-view-popup",
              skin: "layui-layer-admin" + (r ? " " + r : ""),
              shadeClose: !0,
              closeBtn: !1,
              success: function (e, r) {
                var o = jquery('<i class="layui-icon" close>&#x1006;</i>');
                e.append(o),
                  o.on("click", function () {
                    layer.close(r);
                  }),
                  "function" == typeof a && a.apply(this, arguments);
              },
            },
            e
          )
        )
      );
    }),
    (i.error = function (e, a) {
      return i.popup(
        jquery.extend(
          {
            content: e,
            maxWidth: 300,
            offset: "t",
            anim: 6,
            id: "LAY_adminError",
          },
          a
        )
      );
    }),
    (d.prototype.render = function (e, a) {
      var that = this;
      layui.router();
      return (
        (e = setter.views + e + setter.engine),
        jquery("#" + layAppBody)
          .children(".layadmin-loading")
          .remove(),
        i.loading(that.container),
        jquery.ajax({
          url: e,
          type: "get",
          dataType: "html",
          data: {
            v: layui.cache.version,
          },
          success: function (e) {
            e = "<div>" + e + "</div>";
            var r = jquery(e).find("title"),
              o =
                r.text() || (e.match(/\<title\>([\s\S]*)\<\/title>/) || [])[1],
              s = {
                title: o,
                body: e,
              };
            r.remove(),
              (that.params = a || {}),
              that.then && (that.then(s), delete that.then),
              that.parse(e),
              i.removeLoad(),
              that.done && (that.done(s), delete that.done);
          },
          error: function (e) {
            return (
              i.removeLoad(),
              that.render.isError
                ? i.error("请求视图文件异常，状态：" + e.status)
                : (404 === e.status
                    ? that.render("template/tips/404")
                    : that.render("template/tips/error"),
                  void (that.render.isError = !0))
            );
          },
        }),
        that
      );
    }),
    (d.prototype.parse = function (e, n, r) {
      var s = this,
        d = "object" == typeof e,
        l = d ? e : jquery(e),
        u = d ? e : l.find("*[template]"),
        c = function (e) {
          var n = laytpl(e.dataElem.html()),
            o = jquery.extend(
              {
                params: y.params,
              },
              e.res
            );
          e.dataElem.after(n.render(o)), "function" == typeof r && r();
          try {
            e.done && new Function("d", e.done)(o);
          } catch (i) {
            console.error(e.dataElem[0], "\n存在错误回调脚本\n\n", i);
          }
        },
        y = layui.router();
      l.find("title").remove(),
        s.container[n ? "after" : "html"](l.children()),
        (y.params = s.params || {});
      for (var p = u.length; p > 0; p--)
        !(function () {
          var e = u.eq(p - 1),
            t = e.attr("lay-done") || e.attr("lay-then"),
            n = laytpl(e.attr("lay-url") || "").render(y),
            r = laytpl(e.attr("lay-data") || "").render(y),
            s = laytpl(e.attr("lay-headers") || "").render(y);
          try {
            r = new Function("return " + r + ";")();
          } catch (d) {
            o.error("lay-data: " + d.message), (r = {});
          }
          try {
            s = new Function("return " + s + ";")();
          } catch (d) {
            o.error("lay-headers: " + d.message), (s = s || {});
          }
          n
            ? i.req({
                type: e.attr("lay-type") || "get",
                url: n,
                data: r,
                dataType: "json",
                headers: s,
                success: function (a) {
                  c({
                    dataElem: e,
                    res: a,
                    done: t,
                  });
                },
              })
            : c({
                dataElem: e,
                done: t,
              });
        })();
      return s;
    }),
    (d.prototype.send = function (e, t) {
      var n = laytpl(e || this.container.html()).render(t || {});
      return this.container.html(n), this;
    }),
    (d.prototype.refresh = function (e) {
      var t = this,
        a = t.container.next(),
        n = a.attr("lay-templateid");
      return t.id != n
        ? t
        : (t.parse(t.container, "refresh", function () {
            t.container
              .siblings('[lay-templateid="' + t.id + '"]:last')
              .remove(),
              "function" == typeof e && e();
          }),
          t);
    }),
    (d.prototype.then = function (e) {
      return (this.then = e), this;
    }),
    (d.prototype.done = function (e) {
      return (this.done = e), this;
    }),
    e("view", i);
});
