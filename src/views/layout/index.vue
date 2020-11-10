<template>
  <el-container direction="vertical">
    <layout-header/>
    <el-main style="position: relative;padding:8px;">
      <router-view/>
    </el-main>
  </el-container>
</template>
<script>
import LayoutHeader from './header'
export default {
  name: 'Layout',
  components: {
    LayoutHeader
  }
}
</script>
