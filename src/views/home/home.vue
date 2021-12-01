<template>
  <el-container>
    <el-header>电商后台管理系统 <button @click="tiuchu">退出</button></el-header>
    <el-container>
      <el-aside width="250px">
        <div class="san">Ⅲ</div>

        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b" 
          :unique-opened="isover"
          :router='is'
        >
          <el-submenu :index="''+item.id" v-for="item in list" :key="item.id">
            <template slot="title">
              <i :class="lcon[item.order]"></i> 
              <span>{{item.authName}}</span> 
            </template>
              <el-menu-item :index="''+itm.id" 
              v-for="itm in item.children" 
              :key="itm.id"
              :route='{path:"/home/"+itm.path}'
              >
              <i class="el-icon-menu"></i> 
              {{itm.authName}}</el-menu-item> 
          </el-submenu>
        </el-menu>

      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import http from "../../http/index.js";
export default {
  props: {},
  data() {
    return {
      list: [],
      isover:true,
      is:true,
      lcon:[
        '',
        'el-icon-s-custom',
        'el-icon-s-grid',
        'el-icon-s-goods',
        'el-icon-s-order',
        'el-icon-s-data'
      ]
    };
  },
  mounted() {
    http({
      url: "menus",
    }).then((res) => {
      // console.log(res.data);
      this.list = res.data;
    });
  },
  methods: {
    tiuchu(){
      this.$confirm('此操作会退出登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push("/login");
          sessionStorage.removeItem("token")
          this.$message({
            type: 'success',
            message: '退出登录成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出登录'
          });          
        });
    }
  },
  components: {},
};
</script>

<style scoped lang="scss">
.el-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  .el-header {
    background-color: #373d41;
    font-size: 20px;
    color: #fff;
    height: 80px !important;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      width: 70px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      color: #fff;
      background-color: #4A5064;
      border-radius: 5px;
    }
  }
  .el-aside {
    overflow: hidden;
    background-color: #333744;
    width: 250px !important;
    .san {
      width: 100%;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 18px;
      color: #fff;
      background-color: #4a5064;
    }
  }
  .el-main {
    overflow: auto;
    background-color: #eaedf1;
  }
}
.el-menu-vertical-demo {
  width: 250px;
}
</style>
