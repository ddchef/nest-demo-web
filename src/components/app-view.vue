<template>
  <div class="app-view">
    <div class="app-view-content">
      <div v-if="backBtn" class="app-view-header">
        <el-page-header @back="goBack">
          <el-breadcrumb style="line-height: 24px;" slot="content" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="(item,i) in breadcrumbs" :key="i" :to="{ path: item.path }">{{item.title}}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-page-header>
      </div>
      <div v-else  class="app-view-header">
        <el-breadcrumb style="line-height: 24px;" slot="content" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="(item,i) in breadcrumbs" :key="i" :to="{ path: item.path }">{{item.title}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <slot/>
      <router-view/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AppView',
  props: {
    backBtn: {
      type: Boolean
    }
  },
  computed: {
    breadcrumbs () {
      return this.$route.matched.map(item => {
        return { title: item.meta.title || '首页', path: item.path || '/' }
      })
    }
  },
  created () {
    console.log(this.$route)
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.app-view{
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color:#DCDFE6;
  z-index: 1;
  .app-view-content{
    position: relative;
    height: 100%;
    .app-view-header{
      background-color: #fff;
      height: 24px;
      padding: 10px 8px;
      margin-bottom: 8px;
    }
  }
}
</style>
