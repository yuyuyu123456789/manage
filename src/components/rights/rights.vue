<!-- 权限管理/权限列表 -->
<template>
  <div>
    <div class="home">
      <span>首页</span>
      <i class="el-icon-arrow-right"></i>
      <span>权限管理</span>
      <i class="el-icon-arrow-right"></i>
      <span>权限列表</span>
    </div>
    <div class="box">
      <el-table :data="list" style="width: 100%" border stripe>
        <el-table-column label="#" width="60">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>

        <el-table-column label="权限名称" width="350">
          <template slot-scope="scope">
            <span>{{ scope.row.authName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="路径" width="350">
          <template slot-scope="scope">
            <span>{{ scope.row.path }}</span>
          </template>
        </el-table-column>


        <el-table-column label="权限等级" width="350">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level==='0'">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.level==='1'">二级</el-tag>
            <el-tag type="warning" v-else>三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import http from "../../http/index.js";
export default {
  props: {},
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    http({
      url: "rights/list",
    }).then((res) => {
      console.log(res);
      this.list = res.data;
    });
  },
  methods: {
      open(row){
          console.log(row);
      }
  },
  components: {},
};
</script>

<style scoped lang="scss">
.home {
  display: flex;
  align-items: center;
  padding: 0 0 20px 5px;
  span:nth-child(1) {
    font-weight: bold;
    font-size: 16px;
    color: #000;
  }
  i {
    padding: 0 10px;
    color: #c4ccdd;
  }
  span {
    color: #606266;
    font-size: 15px;
  }
}
.box {
  background-color: #fff;
  padding: 20px;
}
.el-table td.el-table__cell{
    border: 1px solid #EBEEF5 !important;
}
.el-table__row{
    border: 1px solid #EBEEF5 !important;
}
</style>
