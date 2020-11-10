<template>
  <el-header class="header" height="50px">
    <div class="header-title">管理平台</div>
    <el-menu
      class="header-el-menu"
      :default-active="activeIndex"
      mode="horizontal"
      router
      @select="handleSelect"
    >
      <el-menu-item index="/user">用户管理</el-menu-item>
      <el-menu-item index="/role">角色管理</el-menu-item>
    </el-menu>
  </el-header>
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {
      activeIndex: 'user'
    }
  },
  methods: {
    handleSelect (select) {
      console.log(select)
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
    line-height: 50px;
    width: 400px;
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
}
</style>
