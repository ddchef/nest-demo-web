<template>
  <app-view>
    <app-block>
      <simple-table :data="data" :columns="columns">
        <div slot="table-header" class="table-header-operate">
          <el-button v-for="operate in headerOperates" :key="operate.code" :type="operate.type||'primary'" size="small" @click="handeHeaderOperate(operate.code)">
            {{operate.label}}
          </el-button>
        </div>
      </simple-table>
    </app-block>
  </app-view>
</template>
<script>
import base from '@/components/mixin/base'
import { getBuilderRules } from './api'
export default {
  name: 'BuilderTask',
  mixins: [base],
  data () {
    return {
      data: [],
      columns: [
        { label: '规则名称', prop: 'name' },
        { label: '目标仓库URL', prop: 'repository' },
        { label: '分支规则', prop: 'branch' },
        { label: '目标仓库用户名', prop: 'repository_user' },
        { label: '目标仓库密码', prop: 'repository_password' },
        { label: '提交仓库', prop: 'dist_repository' },
        { label: '提交仓库用户名', prop: 'dist_repository_user' },
        { label: '提交仓库密码', prop: 'dist_repository_password' },
        { label: '操作', prop: 'operate' }
      ]
    }
  },
  created () {
    this.getData()
    this.eventBus.on('refresh', this.getData)
  },
  methods: {
    handeHeaderOperate (code) {
      this.$router.push({ name: code })
    },
    getData () {
      getBuilderRules().then(data => {
        this.data = data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.table-header-operate{
  text-align:left;
  margin-bottom: 8px;
}
</style>
