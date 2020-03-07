<template>
    <el-aside :class="{'el-aside-close':isCollapse,'el-aside-open':!isCollapse,'flow-aside':true}">
        <div class="logo">
            <p>侧边栏</p>

            <span class="logo-content"><img src="/static/logo.png" alt=""></span>
            <span class="logo-content2"><img src="/static/logo.png" alt=""></span>
        </div>
        <el-menu style="margin-top:46px" :collapse="isCollapse" :default-active="defaultActive" :unique-opened="true" :collapse-transition="false">
            <template v-for="menu in sideBarMenus">
                <template v-if="menu.children.length<=0">
                    <router-link :to="menu.url">
                        <el-menu-item :index="menu.id+''" v-if="menu.type===1" style="padding-left: 12px">
                            <i :class="menu.icon" v-if="menu.icon"></i>
                            <span slot="title">{{ menu.name}}</span>
                        </el-menu-item>
                    </router-link>
                    <template :index="menu.id+''" v-if="menu.type===2">
                        <router-link @click.native="linkChange" :to="menu.url" v-if="menu.type===2">
                            <el-menu-item :index="menu.id+''" style="padding-left: 12px">
                                <i :class="menu.icon" v-if="menu.icon" style="margin-right: 10px"></i>
                                <span slot="title">{{ menu.name }}</span>
                            </el-menu-item>
                        </router-link>
                    </template>
                </template>
                <SubMenu :menu="menu" :pre-id="menu.id" @linkChange="linkChange" v-if="menu.children.length>0"></SubMenu>
            </template>
        </el-menu>
    </el-aside>
</template>

<script>
    import SubMenu from '../components/SubMenu';
    export default {
        name: "SideBar",
        props:[],
        components:{SubMenu},
        mounted(){
            this.initLocalUserMenus();
            this.initUserMenus();
        },
        data(){
            return {
                sideBarMenus:this.$store.getters.sideBarMenus
            };
        },
        computed:{
            isCollapse(){
                return this.$store.getters.isCollapse;
            },
            defaultActive(){
                return this.$store.getters.defaultActive;
            },
        },
        methods:{
            linkChange:function(){
                this.initLocalUserMenus();
            },
            initUserMenus:function(){
                // mock地址 http://yapi.demo.qunar.com/mock/82116/api/menu/user/menus
                this.$axios.post('api/menu/user/menus').then(res=>{
                    if(res.data && res.data.errCode===0){
                        console.log(res.data)
                        this.$store.dispatch('setSideBarMenus',res.data.data);

                        this.sideBarMenus = res.data.data
                        // 更新defaultActive
                        let pathname = window.location.pathname;
                        this.getMenuExtend(pathname, null, [], res.data.data);
                    }else {
                        // this.handleError(res, this);
                    }
                });
            },
            initLocalUserMenus:function(){
                // 更新defaultActive
                let pathname = window.location.pathname;
                this.getMenuExtend(pathname, null, [], this.sideBarMenus);
            },
            getMenuExtend(pathname, preId, preNames, menus){
                for(let menu of menus){
                    if(pathname === menu['url']) {
                        preNames.push(menu['name']);
                        this.$store.dispatch("setBreadcrumbs", preNames);
                        if(preId){
                            this.$store.dispatch("setDefaultActive", preId+'-'+menu['id']);
                        }else{
                            this.$store.dispatch("setDefaultActive", String(menu['id']));
                        }
                        break;
                    }else if(menu.children){
                        let newPreId = null;
                        if(preId){
                            newPreId = preId+'-'+menu['id'];
                        }else {
                            newPreId = String(menu['id']);
                        }
                        let newPreNames = [];
                        Object.assign(newPreNames, newPreNames);
                        newPreNames.push(menu['name']);
                        this.getMenuExtend(pathname, newPreId, newPreNames, menu.children);
                    }
                }
            }
        }
    }
</script>

<style lang="scss">

    $base_background_color:#eee;
    $hover_background_color:#eee;
    $logo_background_color:rgb(1, 73, 158);
    $active_background_color:#009688;
    $base_color:#333;
    $base_height:46px;
    .logo{
        line-height: $base_height;
        height: $base_height;
        position: fixed;
        z-index:99;
        left: 0;
        top: 0;
        padding: 0;
        box-sizing: border-box;
        overflow: hidden;
        font-weight: 300;
        background-repeat: no-repeat;
        background-position: center center;
        background-color: $logo_background_color !important;
        text-align: center;
        box-shadow: 0 1px 2px 0 rgba(0,0,0,.15);
    img{
        vertical-align: middle;
    }
    .logo-content2 img{
        width: 73px;
    }
    }

    .el-aside-close{
        width: 64px!important;
    .logo{
        width:64px;
    .logo-content {
        display: none;
    }
    .logo-content2 {
        display: initial;
        color: #fff;
    }

    }
    .is-active{
        background-color:$active_background_color !important;
    .el-submenu__title i{
        color:#fff;
    }
    }
    }
    .el-aside-open{
        width: 220px!important;
    .logo{
        width:220px;
    .logo-content2 {
        display: none;
    }

    .logo-content{
        line-height: 34px;
        text-align: center;
        font-size: 16px;
        color: #ffffffcc;
    }
    }
    }

    .el-aside{
        height: 100%;
        min-height: 100%;
    &>.el-menu{
         height: 100%;
         min-height: 100%;
     }
    }
    .el-aside{
        box-sizing: border-box;
        position: relative;
        overflow-x: hidden;
        top: 0;
        bottom: 0;
        left: 0;
        transform: none;
        display: inline;
    }

    .el-aside .el-menu{
        background-color: $base_background_color;
        border-right: 0;
        color:$base_color;
    }
    .el-menu a{
        text-decoration: none;
    }
    .el-aside>.el-menu>.el-menu-item [class^=el-icon-]{
        margin-right:0;
    }
    .el-aside>.el-menu>.el-submenu>.el-submenu__title{
        padding-left: 12px !important;
    [class^=el-icon-]{
        margin-right:0;
    }
    }
    .el-aside>.el-menu>a>.el-menu-item>.el-tooltip {
        padding-left: 12px !important;
    }
    .el-aside>.el-menu>.el-menu-item{
        background-color: $base_background_color;
    }
    .el-aside>.el-menu>.el-submenu{
        background-color: $base_background_color;
    }
    .el-submenu__title{
        color:$base_color;
    &:hover{
         background-color: $hover_background_color;
         color:#1E9FFF;

     }
    }
    .el-menu-item{
        color: $base_color;
    &:focus,&:hover{
                 background-color: $hover_background_color;
                 color:#1E9FFF;
             }
    }
    .el-menu.el-menu--popup{
        background-color: $base_background_color;
    }
    .el-menu-item.is-active{
        background-color: $active_background_color !important;
        color: #fff;
    }
    .el-submenu{
    .el-menu-item{
        height: 40px;
        line-height: 40px;
    }
    }
    .el-submenu__title i{
        margin-right: 10px;
    }
    .flow-aside {
    .el-icon-arrow-down:before {
        content: "\e6de";
        font-size: 16px;
    }
    .el-submenu.is-opened>.el-submenu__title .el-submenu__icon-arrow {
        -webkit-transform: rotateZ(-90deg);
        transform: rotateZ(-90deg);
    }
    }
    .el-submenu__title{
        font-size: 12px;
    }
    .el-menu-item{
        font-size: 12px;
    }
</style>