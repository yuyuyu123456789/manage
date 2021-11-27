<!-- 用户管理/用户列表 -->
<template>
  <div>
    <div class="home">
      <span>首页</span>
      <i class="el-icon-arrow-right"></i>
      <span>用户管理</span>
      <i class="el-icon-arrow-right"></i>
      <span>用户列表</span>
    </div>
    <div class="box">
      <div class="primary">
        <div>
          <el-input placeholder="请输入内容" v-model="input" clearable>
          </el-input>
          <i class="el-icon-search"></i>
        </div>
        <el-button type="primary">添加用户</el-button>
      </div>

      <el-table :data="tableData" style="width: 100%" >
        <el-table-column label="#" width="100">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>

        <el-table-column label="姓名" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>

        <el-table-column label="邮箱" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>

        <el-table-column label="电话" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>

        <el-table-column label="角色" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>

        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
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
      input: "",
      list:[],
      tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
    };
  },
  mounted() {
    http({
      url: "users",
      params:{
          query:'',
          pagenum:1,
          pagesize:2
      }
    }).then((res) => {
      console.log(res.data);
      this.list = res.data;
    });
  },
  methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
  },
  components: {},
};
</script>

<style scoped lang="scss">
.box {
  background-color: #fff;
  padding: 20px;
}
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
.primary {
  width: 500px;
  display: flex;
  justify-content: space-between;
  div {
    width: 400px;
    display: flex;
    align-items: center;
    background-color: #e9eff8;
    i {
      width: 100px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #dcdfe6;
      border-left: none;
      box-sizing: border-box;
    }
  }
  .el-button {
    margin-left: 20px;
  }
}
</style>
