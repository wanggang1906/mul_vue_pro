<template>
  <div>
    <h2>这是ccccc模块下受前端路由控制的子模块</h2>
    <div>这一块的内容才是受前端路由控制的</div>
    <hello-world></hello-world>
  </div>
</template>

<script>
import HelloWorld from '../../../components/HelloWorld'
export default {
  name: 'sub',
  components: {HelloWorld},
  data () {
    return {
    }
  },
  methods: {},
  created () {}
}
</script>
<style scoped>
</style>
