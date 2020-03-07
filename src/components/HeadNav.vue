<template>
    <el-header style="height:46px;position: relative">
        <p>定栏</p>
        <ul :class="{'emit-nav':true,'emit-layout-left':true,'emit-nav-close':isCollapse,'emit-nav-open':!isCollapse}">
            <li class="emit-nav-item emit-nav-flexible emit-nav-collapse">
                <el-button :icon="isCollapse?'fa fa-list':'fa fa-list-ul'" size="mini" @click="cuttleAside(!isCollapse)"></el-button>
            </li>
            <li class="emit-nav-item">
                CVSS 简历解析系统
            </li>
        </ul>
        <ul class="emit-nav emit-layout-right">
            <li class="emit-nav-item">
                <el-button :class="{'active':$i18n.locale==='zh'}" type="text" @click="changeLocale('zh')">中文</el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button :class="{'active':$i18n.locale==='en'}" type="text" @click="changeLocale('en')">English</el-button>
            </li>
            <li class="emit-nav-item">
                <el-dropdown>
                    <span>
                        {{ user.name }}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <a href="/changepassword"><el-dropdown-item>修改密码</el-dropdown-item></a>
                        <a @click="logout"><el-dropdown-item>退出</el-dropdown-item></a>
                    </el-dropdown-menu>
                </el-dropdown>
            </li>
        </ul>
    </el-header>
</template>

<script>
    export default {
        name: "HeadNav",
        props:[],
        computed:{
            user() {
                return {name:localStorage.getItem("name")};
            },
            isCollapse(){
                return this.$store.getters.isCollapse;
            },
        },
        methods:{
            cuttleAside:function(_isCollapse){
                this.$store.dispatch('setIsCollapse',_isCollapse);
                localStorage.setItem("isCollapse", _isCollapse);
            },
            logout:function(){
                localStorage.removeItem("flowToken");
                this.$store.dispatch("setIsAutnenticated", false);
                this.$store.dispatch("setUser", null);
                window.location.href="/login";
            },
            changeLocale(locale){
                this.$i18n.locale = locale;
            }
        }
    }
</script>

<style lang="scss">

    $base_background_color:#344058;
    $hover_background_color:#2f3a50;
    $base_color:#fff;
    $base_height:50px;
    // $base_header_background_color:#1E9FFF;
    $base_header_background_color:rgb(1, 73, 158);

    .el-header {
        background-color: $base_header_background_color;
        color: #fff;
        line-height: $base_height;
        font-size: 12px;
        padding: 0;
    }
    .emit-nav,.emit-nav-item,.el-menu{
        transition: all .3s;
        -webkit-transition: all .3s;
        -webkit-transition: -webkit-transform .3s;
        transition: -webkit-transform .3s;
        transition: transform .3s,-webkit-transform .3s;
    }
    .emit-nav{
        position: relative;
        padding: 0 20px;
        background: 0 0;
        color: #fff;
        font-size: 14px;
        box-sizing: border-box;
        margin: 0;
    .el-dropdown{
        color: #fff;
    }
    .el-dropdown-link {
        cursor: pointer;
    }
    .emit-nav-item {
        height: 46px;
        line-height: 46px;
        position: relative;
        display: inline-block;
        *display: inline;
        *zoom: 1;
        vertical-align: middle;
    &.emit-nav-collapse .el-button{
         background: rgba(255,255,255,0.1);
         color: #fff;
         width: 32px;
         height: 32px;
         border: 0;
     }
    .active{
        color: #fff;
    }
    }
    .emit-nav-item+.emit-nav-item{
        padding-left:12px;
    }
    }
    .emit-nav-open {

    .emit-layout-left{
        left:220px;
        padding-left: 0;
    }
    }
    .emit-nav-close .emit-layout-left{
        left:64px;
    }
    .emit-layout-left {
        padding: 0 10px;
        position: absolute!important;
        top: 0;
    }

    .emit-layout-admin .emit-layout-right {
        padding: 0;
    }
    .emit-layout-right {
        height: 46px;
        line-height: 46px;
        position: absolute!important;
        right: 0;
        top: 0;
    .el-icon-arrow-down:before {
        content: "\e790";
        font-size: 16px;
    }
    }
    .emit-nav-flexible .el-button{
        background-color: transparent;
        color: #fff;
        font-size: 20px;
        padding: 3px;
    }
</style>