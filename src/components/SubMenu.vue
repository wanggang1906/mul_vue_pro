<template>
    <el-submenu :index="preId+''" v-if="menu.children.length>0">
        <template slot="title" style="padding-left: 12px">
            <i :class="menu.icon" v-if="menu.icon"></i>
            <span>{{ menu.name }}</span>
        </template>
        <template v-for="subMenu in menu.children">
            <template v-if="subMenu.type===1">
                <el-menu-item :key="preId+'-'+subMenu.id" :index="preId+'-'+subMenu.id" v-if="subMenu.children.length<=0">
                    <i :class="subMenu.icon" v-if="subMenu.icon"></i>
                    {{ subMenu.name }}
                </el-menu-item>
                <flow-sub-menu :menu="subMenu" :pre-id="preId+'-'+subMenu.id" :key="subMenu.id" @linkChange="linkChange" v-if="subMenu.children.length>0"></flow-sub-menu>
            </template>
            <router-link :key="preId+''+subMenu.id" @click.native="$emit('linkChange')" :to="subMenu.url" v-if="subMenu.type===2">
                <el-menu-item :index="preId+'-'+subMenu.id">
                    <i :class="subMenu.icon" v-if="subMenu.icon"></i>
                    {{ subMenu.name }}
                </el-menu-item>
            </router-link>
        </template>
    </el-submenu>
</template>

<script>
    export default {
        name: "SubMenu",
        props: ['menu', 'preId'],
        methods:{
            linkChange(){
                this.$emit('linkChange');
            }
        }
    }
</script>

<style scoped>

</style>