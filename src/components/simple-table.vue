<template>
  <div class="simple-table">
    <div class="simple-table-header">
      <slot name="table-header"/>
    </div>
    <el-table :data="data">
      <template v-for="col in columns">
        <el-table-column v-if="col.columnSlot" :key="col.prop" v-bind="col">
          <template slot-scope="scope">
            <slot :name="col.prop" v-bind="scope"/>
          </template>
        </el-table-column>
        <el-table-column v-else :key="col.prop" v-bind="col" />
      </template>
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
