$(function () {
    let userId = getQueryString("userId");
    let url = '../weight/list';
    if (userId) {
        url += '?userId=' + userId;
    }
    $("#jqGrid").Grid({
        url: url,
        colModel: [
            {label: 'id', name: 'id', index: 'id', key: true, hidden: true},
            {label: '会员', name: 'userName', index: 'user_name', width: 20},
            {label: '日期', name: 'date', index: 'create_date', width: 20},
            {label: '体重', name: 'weight', index: 'weight', width: 20}

        ]
    });
});
    var vm=new Vue({
        el:"#rrapp",
        data:{
            showList:true,
            title:null,
            weight:{},
            q:{
                name:''
            }
        },
        methods:{
            query:function () {
                vm.reload()
            },
            add:function () {
                vm.showList = false;
                vm.title = "新增";
                vm.weight = {};
            },
            update:function () {
                var id = getSelectedRow("#jqGrid");
                if (id == null) {
                    return;
                }
                vm.showList = false;
                vm.title = "修改";

                vm.getInfo(id)
            },
            saveOrUpdate: function (event) {
                var url = vm.cart.id == null ? "../weight/save" : "../weight/update";
                Ajax.request({
                    type: "POST",
                    url: url,
                    contentType: "application/json",
                    params: JSON.stringify(vm.cart),
                    successCallback: function (r) {
                        alert('操作成功', function (index) {
                            vm.reload();
                        });
                    }
                });
            },
            del: function (event) {
                var ids = getSelectedRows("#jqGrid");
                if (ids == null) {
                    return;
                }

                confirm('确定要删除选中的记录？', function () {
                    Ajax.request({
                        type: "POST",
                        url: "../weight/delete",
                        contentType: "application/json",
                        params: JSON.stringify(ids),
                        successCallback: function (r) {
                            alert('操作成功', function (index) {
                                vm.reload();
                            });
                        }
                    });
                });
            },
            getInfo: function (id) {
                Ajax.request({
                    url: "../weight/info/" + id,
                    async: true,
                    successCallback: function (r) {
                        vm.weight = r.weight;
                    }
                });
            },
            reload: function (event) {
                vm.showList = true;
                var page = $("#jqGrid").jqGrid('getGridParam', 'page');
                $("#jqGrid").jqGrid('setGridParam', {
                    postData: {'name': vm.q.name},
                    page: page
                }).trigger("reloadGrid");

        }
    }
})