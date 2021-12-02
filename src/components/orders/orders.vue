<!-- 订单管理/订单列表 -->
<template>
  <div>
    <div class="home">
      <span>首页</span>
      <i class="el-icon-arrow-right"></i>
      <span>订单管理</span>
      <i class="el-icon-arrow-right"></i>
      <span>订单列表</span>
    </div>
    <div class="box">
      <div class="primary">
        <div>
          <el-input placeholder="请输入内容" v-model="input" clearable>
          </el-input>
          <i @click="sousun" class="el-icon-search"></i>
        </div>
      </div>
      <el-table :data="list.goods" style="width: 100%" border stripe>
        <el-table-column label="#" width="60">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>

        <el-table-column label="订单编号" width="300">
          <template slot-scope="scope">
            <span>{{ scope.row.order_number }}</span>
          </template>
        </el-table-column>

        <el-table-column label="订单价格" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.order_price }}</span>
          </template>
        </el-table-column>

        <el-table-column label="是否付款" width="150">
          <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.pay_status == '0'"
              >未付款</el-tag
            >
            <el-tag type="success" v-else>已付款</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="是否发货" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.is_send }}</span>
          </template>
        </el-table-column>

        <el-table-column label="下单时间" width="200">
          <template slot-scope="scope">
            <span>{{
              new Date(scope.row.update_time)
                .toLocaleString("chinese", { hour12: false })
                .replaceAll("/", "-")
            }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="handleEdits(scope.row)"
              circle
            ></el-button>

            <el-button type="success" icon="el-icon-location-outline" circle>
            </el-button>

            <el-button type="danger" icon="el-icon-s-order" circle> </el-button>

            <el-button type="warning" icon="el-icon-s-tools" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="fenye">
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[5, 10, 15, 20, 25]"
            :page-size="tiao"
            layout="total, sizes, prev, pager, next, jumper"
            :total="list.total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 修改 -->
    <div class="tianjia" v-show="iso">
      <el-form
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <div class="uer">
          修改地址 <i class="el-icon-close" @click="iso = !iso"></i>
        </div>

        <el-form-item label="详细地址" prop="name">
          <el-input v-model="username" clearable></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="iso = !iso">取消</el-button>
          <el-button @click="xiugai()">确定</el-button>
        </el-form-item>
      </el-form>
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
      iso: false,
      ye: 1,
      tiao: 5,
      input: "",
      username: "",
    };
  },
  mounted() {
    this.fn();
  },
  methods: {
    fn() {
      http({
        url: "orders",
        params: {
          query: "",
          pagenum: this.ye,
          pagesize: this.tiao,
        },
      }).then((res) => {
        console.log(res.data);
        this.list = res.data;
      });
    },
    sousun() {},
    handleEdits(row) {
      console.log(row);
      this.iso = !this.iso;
    },
    xiugai() {},
    handleSizeChange(val) {
      this.tiao = val;
      this.fn();
    },
    handleCurrentChange(val) {
      this.ye = val;
      this.fn();
    },
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
.el-button {
  border-radius: 5px;
  padding: 8px 15px;
}
.box {
  background-color: #fff;
  padding: 20px;
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
.el-table--fit {
  margin-top: 20px;
}
.fenye {
  display: flex;
  padding: 20px 0;
}
.tianjia {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  .uer {
    padding: 30px 40px;
    font-size: 18px;
    font-weight: bold;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    i {
      position: absolute;
      top: 15px;
      right: -20px;
      font-size: 24px;
    }
  }
  .demo-ruleForm {
    width: 750px;
    padding-right: 40px;
    background-color: #fff;
    border-radius: 5px;
    position: relative;
    .el-button--primary {
      margin-left: 500px;
    }
    .el-button--default {
      background-color: #909399;
      color: #fff;
    }
  }
  .el-button--default {
    margin-left: 30px;
  }
  .el-form-item {
    margin-bottom: 30px;
  }
}
</style>
