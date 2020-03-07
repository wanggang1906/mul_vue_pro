<template>
    <div>
        <P>Menu菜单</P>

    </div>
</template>

<script>
    import qs from 'qs'
    export default {
        name: "Menu",
        created(){
            this.findMenuOptions();
            this.searchMenus(1);
        },
        computed:{
            icons(){
                return this.$store.getters.icons;
            },
        },
        data: function () {
            var $this = this;
            var addPathValidator = function (rule, value, callback) {
                if($this.addForm.type=='2'){
                    if (value === '') {
                        callback(new Error('请输入请求路径'));
                    } else {
                        callback();
                    }
                }else{
                    callback();
                }
            };
            var editPathValidator = function (rule, value, callback) {


                if($this.editMenuForm.type=='2'){
                    if (value === '') {
                        callback(new Error('请输入请求路径'));
                    } else {
                        callback();
                    }
                }else{
                    callback();
                }
            };
            var addIconValidator = function (rule, value, callback) {
                // debugger
                // if(this.addForm.parentId=='0'){
                //     if (value === '') {
                //         callback(new Error('请选择图标'));
                //     } else {
                //         callback();
                //     }

                // }else{
                callback();
                // }
            };
            return {
                menuTypes:[{'id':1, 'name':'目录'},{'id':2, 'name':'页面'}],
                tableData:[],
                menuOptions:[],
                name:'',
                parentId:'',
                defaultSearchForm:{name:'', parentId:''},
                submitLoading:false,
                addFormFlag:false,
                addForm:{name:'', type:'', parentId:'', url:'', icon:'', order:1},
                addFormRules:{
                    name: [{ required: true, message: '请输入资源名称', trigger: ['blur','change'] }],
                    type: [{ required: true, message: '请输入菜单类型', trigger: ['blur','change'] }],
                    parentId: [{ required: true, message: '请选择父菜单', trigger: ['blur','change'] }],
                    url: [{ validator:addPathValidator, trigger: ['blur','change'] }],
                    icon: [{ validator:addIconValidator, trigger: ['blur','change'] }],
                },
                editIcon:'',
                editIndex:2000,
                editMenuForm:{id:'', name:'', type:'', parentId:'', url:'', icon:'', order:1},
                editMenuFormRules:{
                    name: [{ required: true, message: '请输入资源名称', trigger: ['blur','change'] }],
                    type: [{ required: true, message: '请输入菜单类型', trigger: ['blur','change'] }],
                    parentId: [{ required: true, message: '请选择父菜单', trigger: ['blur','change'] }],
                    url: [{ validator:editPathValidator, trigger: ['blur','change'] }],
                },
                total:0,

            };
        },
        methods:{
            searchBtnClick:function(){
                var $this =this;
                $this.defaultSearchForm = {'name':$this.name, 'parentId':$this.parentId};
                $this.searchMenus(1);
            },
            searchMenus:function(pageNum){

                this.$axios.post('/api/menu/menus',qs.stringify({
                    'name':this.defaultSearchForm.name,
                    'parentId':this.defaultSearchForm.parentId,
                    'pageNum':pageNum
                })).then(res=>{

                    // 成功后执行
                    if(res.data.errCode===0){
                        this.tableData = res.data.data.list;
                        this.total = res.data.data.total;
                    }else{
                        // todo 错误处理
                    }
                }).catch(err=>{
                    // 失败后执行
                    this.$message.error('服务器有异常，请稍后重试');
                });
            },
            handleCurrentChange:function(val){
                var $this =this;
                $this.searchMenus(val);
            },
            openAddMenuForm:function(){
                var $this =this;
                $this.addForm={name:'',url:'', type:'', parentId:'', icon:'el-icon-arrow-right', order:1};
                $this.addFormFlag = true;
            },
            closeAddMenu:function(){
                var $this =this;
                $this.addForm={name:'',url:'',type:'', parentId:'', icon:'el-icon-arrow-right', order:1};
                $this.addFormFlag=false;
            },
            addMenu:function(){
                var $this = this;
                this.$refs['addForm'].validate(function(valid){
                    if (valid) {


                        $this.$axios.post('/api/menu/add/',{
                            'name':$this.addForm.name,
                            'type':$this.addForm.type,
                            'parentId':$this.addForm.parentId,
                            'url':$this.addForm.url,
                            'icon':$this.addForm.icon,
                            'order':$this.addForm.order,
                        }).then(res=>{

                            // 成功后执行
                            if(res.data.errCode===0){
                                $this.$message.success('添加成功');
                                $this.findMenuOptions();
                                $this.searchMenus(1);
                            }else{
                                // todo 错误处理
                            }
                        }).catch(err=>{
                            // 失败后执行
                            $this.$message.error('服务器有异常，请稍后重试');
                        });
                    }else{
                        return false;
                    }
                });
            },
            handleOpenEdit:function(index, row){
                var $this = this;
                $this.editMenuForm = {id:row.id,name:row.name,url:row.url,
                    type:row.type, parentId:row.parentId, icon:row.icon, order:row.order};
                $this.editIndex = index;
            },
            handleCloseEdit:function(){
                var $this = this;
                $this.editMenuForm = {id:'',name:'',url:'',type:'', parentId:'', icon:'el-icon-arrow-right', order:1};
                $this.editIndex = 2000;

            },
            handleDel:function(index,row){

                var $this = this;
                $this.$confirm('此操作将永久删除'+row.url+'菜单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function(){
                    $this.$axios.post('/api/menu/del/',qs.stringify({
                        'id':row.id,
                    })).then(res=>{

                        // 成功后执行
                        if(res.data.errCode===0){
                            $this.tableData.splice(index, 1);
                            $this.$message.success('删除成功');
                            $this.findMenuOptions();
                            $this.searchMenus(1);
                        }else{
                            // todo 错误处理
                        }
                    }).catch(err=>{
                        // 失败后执行
                        $this.$message.error('服务器有异常，请稍后重试');
                    });
                }).catch(function(){
                    $this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleSaveEdit:function(row){
                var $this = this;
                if(this.editMenuForm.name==row.name
                    && $this.editMenuForm.type==row.type
                    && $this.editMenuForm.parentId==row.parentId
                    && $this.editMenuForm.order==row.order
                    && $this.editMenuForm.icon==row.icon
                    && $this.editMenuForm.url==row.url){
                    $this.editIndex=2000;
                    $this.$message.success('修改成功');
                }else{
                    this.$refs['editMenuForm'].validate(function(valid){

                        if (valid) {
                            $this.$axios.post('/api/menu/edit/',({
                                'id':$this.editMenuForm.id,
                                'name':$this.editMenuForm.name,
                                'type':$this.editMenuForm.type,
                                'parentId':$this.editMenuForm.parentId,
                                'url':$this.editMenuForm.url,
                                'icon':$this.editMenuForm.icon,
                                'order':$this.editMenuForm.order,
                            })).then(res=>{
                                // 成功后执行
                                if(res.data.errCode===0){
                                    row.name=$this.editMenuForm.name;
                                    row.type=$this.editMenuForm.type;
                                    row.parentId=$this.editMenuForm.parentId;
                                    row.url=$this.editMenuForm.url;
                                    row.icon=$this.editMenuForm.icon;
                                    row.order=$this.editMenuForm.order;
                                    $this.editIndex=2000;
                                    $this.$message.success('修改成功');
                                    $this.findMenuOptions();
                                }else{
                                    // todo 错误处理
                                }
                            }).catch(err=>{
                                // 失败后执行
                                $this.$message.error('服务器有异常，请稍后重试');
                            });
                        }else{
                            return false;
                        }
                    });


                }
            },
            getMenuLabel(id){
                for(let menuIndex in this.menuOptions){
                    let menu = this.menuOptions[menuIndex];
                    if(menu['id']==id){
                        return menu['name'];
                    }
                }
            },
            findMenuOptions(){
                var $this = this;
                $this.$axios.post('/api/menu/options/',qs.stringify({
                })).then(res=>{

                    // 成功后执行
                    if(res.data.errCode===0){
                        $this.menuOptions = res.data.data;
                    }else{
                        // todo 错误处理
                    }
                }).catch(err=>{
                    // 失败后执行
                    $this.$message.error('服务器有异常，请稍后重试');
                });

            },
            updIcon:function(row){
                var $this = this;
                row.icon = $this.editIcon;
                $this.editIndex = 2000;
                $this.$axios.post('/api/menu/icon/upd/',({
                    'id':row.id,
                    'icon': row.icon
                })).then(res=>{
                    // 成功后执行
                    if(res.data.errCode===0){
                        // this.menuOptions = res.data.data;
                    }else{
                        // todo 错误处理
                    }
                }).catch(err=>{
                    // 失败后执行
                    $this.$message.error('服务器有异常，请稍后重试');
                });
            }
        }
    }
</script>

<style lang="scss">
    .search-form{
    .el-form-item div{
        padding-right: 5px;
    }
    }

</style>