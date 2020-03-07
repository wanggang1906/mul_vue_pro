<template>
    <div id="app">
        <h2>{{message}}</h2>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: "App",
        data () {
            return {
                message: 'manage模块的内容'
            }
        }
    }
</script>

<style scoped>

</style>