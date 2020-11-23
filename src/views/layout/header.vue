<template>
  <el-header class="header" height="60px">
    <div class="header-title">管理平台</div>
    <div>
      <render-menus :menus="menus"/>
    </div>
    <div>
      <el-dropdown @command="handleCommand">
        <avatar class="header-avatar" :size="40" :username="profile.name||''"/>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>
<script>
import { mapGetters } from 'vuex'
import Avatar from 'vue-avatar'
import { delToken } from '@/utils/auth'
import RenderMenus from '@/components/render-menus'
export default {
  name: 'Header',
  components: {
    Avatar,
    RenderMenus
  },
  data () {
    return {
      activeIndex: 'user'
    }
  },
  computed: {
    ...mapGetters(['profile', 'menus'])
  },
  created () {
    // console.log(this.profile)
  },
  methods: {
    handleSelect (select) {
    },
    handleCommand (code) {
      delToken()
      window.location.href = '/login'
    }
  }
}
</script>
<style lang="scss">
.header{
  background: linear-gradient(to right bottom,rgb(64, 158, 255),rgb(121, 187, 255));
  display: flex;
  .header-title{
    color: #fff;
    line-height: 60px;
    min-width: 400px;
    flex: 1;
  }
  .header-el-menu.el-menu--horizontal{
    background-color: transparent;
    &>.el-menu-item.is-active{
      color: #fff;
      &:hover{
        background-color: rgb(64, 158, 255);
      }
    }
    &>.el-menu-item{
      color: rgb(231, 231, 231);
      &:hover{
        background-color: rgb(64, 158, 255);
      }
      &:focus{
        background-color: rgb(64, 158, 255);
      }
    }
    &>.el-submenu .el-submenu__title{
      color: rgb(231, 231, 231);
      &:hover{
        background-color: rgb(64, 158, 255);
      }
    }
  }
  .header-avatar{
    margin: 10px 0;
    cursor: pointer;
  }
}
</style>
