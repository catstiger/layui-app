/** layuiAdmin.pro-v1.4.0 LPPL License By https://www.layui.com/admin/ */
layui.define(function (exports) {
  var i =
    (layui.$, layui.layer, layui.laytpl, layui.setter, layui.view, layui.admin);
  (i.events.logout = function () {
    i.req({
      url: "./json/user/logout.json",
      type: "get",
      data: {},
      done: function (e) {
        i.exit();
      },
    });
  }),
    exports("common", {});
});
