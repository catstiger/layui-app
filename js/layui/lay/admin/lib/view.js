/** layuiAdmin.pro-v1.4.0 LPPL License By https://www.layui.com/admin/ */
layui.define(["laytpl", "layer"], function (exports) {
  var jquery = layui.jquery,
    laytpl = layui.laytpl,
    layer = layui.layer,
    setter = layui.setter,
    o = (layui.device(), layui.hint()),
    view = function (e) {
      return new viewInner(e);
    },
    layAppBody = "LAY_app_body",
    viewInner = function (id) {
      (this.id = id), (this.container = jquery("#" + (id || layAppBody)));
    };
  (view.loading = function (e) {
    e.append(
      (this.elemLoad = jquery(
        '<i class="layui-anim layui-anim-rotate layui-anim-loop layui-icon layui-icon-loading layadmin-loading"></i>'
      ))
    );
  }),
    (view.removeLoad = function () {
      this.elemLoad && this.elemLoad.remove();
    }),
    (view.exit = function () {
      layui.data(setter.tableName, {
        key: setter.request.tokenName,
        remove: !0,
      }),
        (location.hash = "/user/login");
    }),
    (view.req = function (options) {
      var success = options.success,
        error = options.error,
        request = setter.request,
        response = setter.response,
        errMsg = function () {
          return setter.debug ? "<br><cite>URL：</cite>" + options.url : "";
        };
      if (
        ((options.data = options.data || {}),
        (options.headers = options.headers || {}),
        request.tokenName)
      ) {
        var params =
          "string" == typeof options.data
            ? JSON.parse(options.data)
            : options.data;
        (options.data[request.tokenName] =
          request.tokenName in params
            ? options.data[request.tokenName]
            : layui.data(setter.tableName)[request.tokenName] || ""),
          (options.headers['authorization']  = layui.data(setter.tableName)[request.tokenName] || "");
      }
      return (
        delete options.success,
        delete options.error,
        jquery.ajax(
          jquery.extend(
            {
              type: "get",
              dataType: "json",
              success: function (resp) {
                if (setter.debug) {
                  console.log(resp);
                }
                var statusCode = response.statusCode;
                if (resp[response.statusName] == statusCode.ok)
                  "function" == typeof options.done && options.done(resp);
                else if (resp[response.statusName] == statusCode.logout)
                  view.exit();
                else {
                  var r = [
                    "<cite>Error：</cite> " +
                      (resp[response.msgName] || "返回状态码异常"),
                    errMsg(),
                  ].join("");
                  view.error(r);
                }
                "function" == typeof success && success(resp);
              },
              error: function (e, t) {
                if (setter.debug) {
                  console.log(e, t);
                }
                var a = [
                  "请求异常，请重试<br><cite>错误信息：</cite>" + t,
                  errMsg(),
                ].join("");
                view.error(a), "function" == typeof error && error(res);
              },
            },
            options
          )
        )
      );
    }),
    (view.popup = function (options) {
      var success = options.success,
        skin = options.skin;
      return (
        delete options.success,
        delete options.skin,
        layer.open(
          jquery.extend(
            {
              type: 1,
              title: "提示",
              content: "",
              id: "LAY-system-view-popup",
              skin: "layui-layer-admin" + (skin ? " " + skin : ""),
              shadeClose: !0,
              closeBtn: !1,
              success: function (e, r) {
                var o = jquery('<i class="layui-icon" close>&#x1006;</i>');
                e.append(o),
                  o.on("click", function () {
                    layer.close(r);
                  }),
                  "function" == typeof success &&
                    success.apply(this, arguments);
              },
            },
            options
          )
        )
      );
    }),
    (view.error = function (content, a) {
      return view.popup(
        jquery.extend(
          {
            content: content,
            maxWidth: 300,
            offset: "t",
            anim: 6,
            id: "LAY_adminError",
          },
          a
        )
      );
    }),
    (viewInner.prototype.render = function (viewPath, a) {
      var that = this;
      layui.router();
      return (
        (viewPath = setter.views + viewPath + setter.engine),
        jquery("#" + layAppBody)
          .children(".layadmin-loading")
          .remove(),
        view.loading(that.container),
        jquery.ajax({
          url: viewPath,
          type: "get",
          dataType: "html",
          data: {
            v: layui.cache.version,
          },
          success: function (body) {
            body = "<div>" + body + "</div>";
            var title = jquery(body).find("title");
            let titleText = title.text() || (body.match(/\<title\>([\s\S]*)\<\/title>/) || [])[1];
            let struct = {
                title: titleText,
                body: body,
            };
            title.remove();
            (that.params = a || {});
            that.then && (that.then(struct), delete that.then);
            that.parse(body);
            view.removeLoad();
            that.done && (that.done(struct), delete that.done);
          },
          error: function (e) {
            return (
              view.removeLoad(),
              that.render.isError
                ? view.error("请求视图文件异常，状态：" + e.status)
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
    (viewInner.prototype.parse = function (target, n, r) {
      var that = this,
        isObj = "object" == typeof target,
        $target = isObj ? target : jquery(target),
        templates = isObj ? target : $target.find("*[template]"),
        c = function (e) {
          var n = laytpl(e.dataElem.html()),
            o = jquery.extend(
              {
                params: router.params,
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
        router = layui.router();
      $target.find("title").remove(),
        that.container[n ? "after" : "html"]($target.children()),
        (router.params = that.params || {});
      for (var p = templates.length; p > 0; p--)
        !(function () {
          var e = templates.eq(p - 1),
            done = e.attr("lay-done") || e.attr("lay-then"),
            url = laytpl(e.attr("lay-url") || "").render(router),
            data = laytpl(e.attr("lay-data") || "").render(router),
            headers = laytpl(e.attr("lay-headers") || "").render(router);
          try {
            data = new Function("return " + data + ";")();
          } catch (d) {
            o.error("lay-data: " + d.message), (data = {});
          }
          try {
            headers = new Function("return " + headers + ";")();
          } catch (d) {
            o.error("lay-headers: " + d.message), (headers = headers || {});
          }
          url
            ? view.req({
                type: e.attr("lay-type") || "get",
                url: url,
                data: data,
                dataType: "json",
                headers: headers,
                success: function (resp) {
                  c({
                    dataElem: e,
                    res: resp,
                    done: done,
                  });
                },
              })
            : c({
                dataElem: e,
                done: done,
              });
        })();
      return that;
    }),
    (viewInner.prototype.send = function (e, t) {
      var n = laytpl(e || this.container.html()).render(t || {});
      return this.container.html(n), this;
    }),
    (viewInner.prototype.refresh = function (e) {
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
    (viewInner.prototype.then = function (e) {
      return (this.then = e), this;
    }),
    (viewInner.prototype.done = function (e) {
      return (this.done = e), this;
    }),
    exports("view", view);
});
