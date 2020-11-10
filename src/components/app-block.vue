<template>
  <div class="app-blcok" :style="{'padding':padding}">
    <slot/>
  </div>
</template>
<script>
export default {
  name: 'AppBlock',
  props: {
    padding: {
      type: String,
      default: '16px'
    }
  }
}
</script>
<style lang="scss" scoped>
.app-blcok{
  background-color: #fff;
  border-radius: 4px;
  margin: 0 8px;
}
</style>
