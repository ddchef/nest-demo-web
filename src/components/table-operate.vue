<template>
  <div>
    <template v-for="operate in operates">
      <el-button
        v-if="!operate.popover"
        :key="operate.code"
        type="text"
        size="small"
        :class="{'el-button_danger':operate.code==='danger'}"
        @click="handleOperate(operate)"
      >
        {{operate.label}}
      </el-button>
      <el-popconfirm
        v-else
        class="table-operate-popconfirm"
        placement="top"
        :key="operate.code"
        :title="operate.title"
        @confirm="handleOperate(operate)"
      >
        <el-button
          slot="reference"
          type="text"
          size="small"
          :class="{'el-button_danger':operate.type==='danger'}"
        >
          {{operate.label}}
        </el-button>
      </el-popconfirm>
    </template>
  </div>
</template>
<script>
export default {
  name: 'TableOperate',
  props: {
    operates: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleOperate (operate) {
      console.log(operate)
      this.$emit('click', operate)
    }
  }
}
</script>
<style lang="scss" scoped>
.el-button+.table-operate-popconfirm,.table-operate-popconfirm+.el-button{
  margin-left: 15px;
}
</style>
