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
            {label: '会员', name: 'userId', index: 'user_id', width: 20},
            {label: '日期', name: 'date', index: 'create_date', width: 20,formatter: function (value) {
                    return transDate(value);}},
            {label: '体重', name: 'weight', index: 'weight', width: 20}

        ]
    });
});
    var vm=new Vue({
        el:"#rrapp",
        data:{
            isReadOnly:true,
            showList:true,
            title:null,
            userWeight:{},
            ruleValidate: {
                weight: [
                    {required: true, message: '体重不能为空', trigger: 'blur'}
                ]
            },
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
                var url = vm.userWeight.id == null ? "../weight/save" : "../weight/update";
                Ajax.request({
                    type: "POST",
                    url: url,
                    contentType: "application/json",
                    params: JSON.stringify(vm.userWeight),
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
                        vm.userWeight = r.weight;
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

        },
            handleSubmit: function (name) {
                handleSubmitValidate(this, name, function () {
                    vm.saveOrUpdate()
                });
            },
            handleReset: function (name) {
                handleResetForm(this, name);
            }
    }
})