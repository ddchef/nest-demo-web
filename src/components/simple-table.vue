<template>
  <div class="simple-table">
    <div class="simple-table-header">
      <slot name="table-header"/>
    </div>
    <el-table :data="data">
      <el-table-column v-for="col in columns" :key="col.prop" :label="col.label" :prop="col.prop" :type="col.type">
        <template v-if="col.slot" slot-scope="{$index,row}">
          <slot :slot="col.prop" :$index="$index" :row="row"/>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      hide-on-single-page
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'SimpleTable',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    pageSizes: {
      type: Array,
      default: () => [20, 40, 80, 100]
    },
    pageSize: {
      type: Number,
      default: 20
    },
    total: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleSizeChange (size) {
      this.$emit('size-change', size)
    },
    handleCurrentChange (currentPage) {
      this.$emit('current-page', currentPage)
    }
  }
}
</script>
