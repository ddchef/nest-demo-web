<template>
  <div>
    <layout-header/>
    <el-container>
      <router-view/>
    </el-container>
  </div>
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
