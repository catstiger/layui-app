/** layuiAdmin.pro-v1.4.0 LPPL License By https://www.layui.com/admin/ */
layui.define(["table", "form"], function (exports) {
  var e = (layui.$, layui.admin),
    view = layui.view,
    table = layui.table,
    form = layui.form;
  table.render({
    elem: "#LAY-app-content-list",
    url: "./json/content/list.json",
    cols: [
      [
        { type: "checkbox", fixed: "left" },
        { field: "id", width: 100, title: "文章ID", sort: !0 },
        { field: "label", title: "文章标签", minWidth: 100 },
        { field: "title", title: "文章标题" },
        { field: "author", title: "作者" },
        { field: "uploadtime", title: "上传时间", sort: !0 },
        {
          field: "status",
          title: "发布状态",
          templet: "#buttonTpl",
          minWidth: 80,
          align: "center",
        },
        {
          title: "操作",
          minWidth: 150,
          align: "center",
          fixed: "right",
          toolbar: "#table-content-list",
        },
      ],
    ],
    page: !0,
    limit: 10,
    limits: [10, 15, 20, 25, 30],
    text: "对不起，加载出现异常！",
    height: 'full-280'
  });

  table.on("tool(LAY-app-content-list)", function (t) {
    var data = t.data;
    "del" === t.event
      ? layer.confirm("确定删除此文章？", function (e) {
          t.del(), layer.close(e);
        })
      : "edit" === t.event &&
        layui.admin.popupRight({
          title: "编辑文章",
          area: "550px",
          id: "LAY-popup-content-edit",
          success: function (t, e) {
            view(this.id)
              .render("app/content/listform", data)
              .done(function () {
                form.render(null, "layuiadmin-app-form-list"),
                  form.on("submit(layuiadmin-app-form-submit)", function (t) {
                    t.field;
                    layui.table.reload("LAY-app-content-list"), layer.close(e);
                  });
              });
          },
        });
  });
  table.render({
    elem: "#LAY-app-content-tags",
    url: "./json/content/tags.js",
    cols: [
      [
        { type: "numbers", fixed: "left" },
        { field: "id", width: 100, title: "ID", sort: !0 },
        { field: "tags", title: "分类名", minWidth: 100 },
        {
          title: "操作",
          width: 150,
          align: "center",
          fixed: "right",
          toolbar: "#layuiadmin-app-cont-tagsbar",
        },
      ],
    ],
    text: "对不起，加载出现异常！",
  });
  table.on("tool(LAY-app-content-tags)", function (t) {
    var n = t.data;
    "del" === t.event
      ? layer.confirm("确定删除此分类？", function (e) {
          t.del(), layer.close(e);
        })
      : "edit" === t.event &&
        e.popup({
          title: "编辑分类",
          area: ["450px", "200px"],
          id: "LAY-popup-content-tags",
          success: function (t, e) {
            view(this.id)
              .render("app/content/tagsform", n)
              .done(function () {
                form.render(null, "layuiadmin-form-tags"),
                  form.on("submit(layuiadmin-app-tags-submit)", function (t) {
                    t.field;
                    layui.table.reload("LAY-app-content-tags"), layer.close(e);
                  });
              });
          },
        });
  });
  table.render({
    elem: "#LAY-app-content-comm",
    url: "./json/content/comment.js",
    cols: [
      [
        { type: "checkbox", fixed: "left" },
        { field: "id", width: 100, title: "ID", sort: !0 },
        { field: "reviewers", title: "评论者", minWidth: 100 },
        { field: "content", title: "评论内容", minWidth: 100 },
        { field: "commtime", title: "评论时间", minWidth: 100, sort: !0 },
        {
          title: "操作",
          width: 150,
          align: "center",
          fixed: "right",
          toolbar: "#table-content-com",
        },
      ],
    ],
    page: !0,
    limit: 10,
    limits: [10, 15, 20, 25, 30],
    text: "对不起，加载出现异常！",
    height: 'full-30'
  });
  table.on("tool(LAY-app-content-comm)", function (t) {
    var n = t.data;
    "del" === t.event
      ? layer.confirm("确定删除此条评论？", function (e) {
          t.del(), layer.close(e);
        })
      : "edit" === t.event &&
        e.popup({
          title: "编辑评论",
          area: ["450px", "300px"],
          id: "LAY-popup-content-comm",
          success: function (t, e) {
            view(this.id)
              .render("app/content/contform", n)
              .done(function () {
                form.render(null, "layuiadmin-form-comment"),
                  form.on("submit(layuiadmin-app-com-submit)", function (t) {
                    t.field;
                    layui.table.reload("LAY-app-content-comm"), layer.close(e);
                  });
              });
          },
        });
  });
  exports("contlist", {});
});
