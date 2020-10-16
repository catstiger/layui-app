/** layuiAdmin.pro-v1.4.0 LPPL License By https://www.layui.com/admin/ */
layui.define(["table", "form"], function (exports) {
  var i = (layui.$, layui.admin),
    view = layui.view,
    table = layui.table,
    form = layui.form;
  let setter = layui.setter;
  table.render({
    elem: "#LAY-user-manage",
    url: "./json/useradmin/webuser.json",
    
    cols: [
      [
        { type: "checkbox", fixed: "left" },
        { field: "id", width: 100, title: "ID", sort: !0 },
        { field: "username", title: "用户名", minWidth: 100 },
        { field: "avatar", title: "头像", width: 100, templet: "#imgTpl" },
        { field: "phone", title: "手机" },
        { field: "email", title: "邮箱" },
        { field: "sex", width: 80, title: "性别" },
        { field: "ip", title: "IP" },
        { field: "jointime", title: "加入时间", sort: !0 },
        {
          title: "操作",
          width: 150,
          align: "center",
          fixed: "right",
          toolbar: "#table-useradmin-webuser",
        },
      ],
    ],
    page: !0,
    limit: 30,
    height: "full-320",
    text: "对不起，加载出现异常！",
  }),
    table.on("tool(LAY-user-manage)", function (e) {
      var l = e.data;
      "del" === e.event
        ? layer.prompt(
            { formType: 1, title: "敏感操作，请验证口令" },
            function (i, t) {
              layer.close(t),
                layer.confirm("真的删除行么", function (i) {
                  e.del(), layer.close(i);
                });
            }
          )
        : "edit" === e.event &&
          i.popup({
            title: "编辑用户",
            area: ["500px", "450px"],
            id: "LAY-popup-user-add",
            success: function (e, i) {
              view(this.id)
                .render("user/user/userform", l)
                .done(function () {
                  form.render(null, "layuiadmin-form-useradmin"),
                    form.on("submit(LAY-user-front-submit)", function (e) {
                      e.field;
                      layui.table.reload("LAY-user-manage"), layer.close(i);
                    });
                });
            },
          });
    }),
    table.render({
      elem: "#LAY-user-back-manage",
      url: "./json/useradmin/mangadmin.js",
      cols: [
        [
          { type: "checkbox", fixed: "left" },
          { field: "id", width: 80, title: "ID", sort: !0 },
          { field: "loginname", title: "登录名" },
          { field: "telphone", title: "手机" },
          { field: "email", title: "邮箱" },
          { field: "role", title: "角色" },
          { field: "jointime", title: "加入时间", sort: !0 },
          {
            field: "check",
            title: "审核状态",
            templet: "#buttonTpl",
            minWidth: 80,
            align: "center",
          },
          {
            title: "操作",
            width: 150,
            align: "center",
            fixed: "right",
            toolbar: "#table-useradmin-admin",
          },
        ],
      ],
      text: "对不起，加载出现异常！",
    }),
    table.on("tool(LAY-user-back-manage)", function (e) {
      var l = e.data;
      "del" === e.event
        ? layer.prompt(
            { formType: 1, title: "敏感操作，请验证口令" },
            function (i, t) {
              layer.close(t),
                layer.confirm("确定删除此管理员？", function (i) {
                  console.log(e), e.del(), layer.close(i);
                });
            }
          )
        : "edit" === e.event &&
          i.popup({
            title: "编辑管理员",
            area: ["420px", "450px"],
            id: "LAY-popup-user-add",
            success: function (e, i) {
              view(this.id)
                .render("user/administrators/adminform", l)
                .done(function () {
                  form.render(null, "layuiadmin-form-admin"),
                    form.on("submit(LAY-user-back-submit)", function (e) {
                      e.field;
                      layui.table.reload("LAY-user-back-manage"),
                        layer.close(i);
                    });
                });
            },
          });
    }),
    table.render({
      elem: "#LAY-user-back-role",
      url: setter.apiHost + "/roles/index",
      parseData: layui.setter.parseData,
      cols: [
        [
          { type: "checkbox", fixed: "left" },
          { field: "id", width: 80, title: "ID", sort: !0 },
          { field: "name", title: "角色名" },
          { field: "limits", title: "拥有权限" },
          { field: "descn", title: "具体描述" },
          {
            title: "操作",
            width: 180,
            align: "center",
            fixed: "right",
            toolbar: "#table-useradmin-admin",
          },
        ],
      ],
      text: "对不起，加载出现异常！",
    }),
    table.on("tool(LAY-user-back-role)", function (e) {
      var l = e.data;
      "del" === e.event
        ? layer.confirm("确定删除此角色？", function (i) {
            e.del(), layer.close(i);
          })
        : "edit" === e.event &&
          i.popup({
            title: "添加新角色",
            area: ["500px", "480px"],
            id: "LAY-popup-user-add",
            success: function (e, i) {
              view(this.id)
                .render("user/administrators/roleform", l)
                .done(function () {
                  form.render(null, "layuiadmin-form-role"),
                    form.on("submit(LAY-user-role-submit)", function (e) {
                      e.field;
                      layui.table.reload("LAY-user-back-role"), layer.close(i);
                    });
                });
            },
          });
    }),
    exports("useradmin", {});
});
