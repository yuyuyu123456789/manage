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
          <i @click="sousun" class="el-icon-search"></i>
        </div>
        <el-button type="primary" @click="is = !is">添加用户</el-button>
      </div>

      <el-table :data="list.users" style="width: 100%" border>
        <el-table-column label="#" width="100">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>

        <el-table-column label="姓名" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>

        <el-table-column label="邮箱" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.email }}</span>
          </template>
        </el-table-column>

        <el-table-column label="电话" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.mobile }}</span>
          </template>
        </el-table-column>

        <el-table-column label="角色" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.role_name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="状态" width="120">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#409eff"
              inactive-color="#dcdfe6"
              @change="handleEdit(scope.$index)"
            >
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="handleEdits(scope.$index, scope.row)"
              circle
            ></el-button>

            <el-button
              type="danger"
              @click="open(scope.row)"
              icon="el-icon-delete"
              circle
            >
            </el-button>

            <el-button
              type="warning"
              @click="warning(scope.row)"
              icon="el-icon-s-tools"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="fenye">
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[1, 2, 3, 4, 5]"
            :page-size="tiao"
            layout="total, sizes, prev, pager, next, jumper"
            :total="list.total"
          >
          </el-pagination>
        </div>
      </div>
    </div>

    <!-- 添加 -->
    <div class="tianjia" v-show="is">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <div class="uer">
          添加用户 <i class="el-icon-close" @click="is = !is"></i>
        </div>
        <el-form-item label="用户名" prop="name">
          <el-input
            v-model="ruleForm.name"
            prefix-icon="el-icon-user-solid"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="mima">
          <el-input
            v-model="ruleForm.mima"
            prefix-icon="el-icon-lock"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="mailbox">
          <el-input
            v-model="ruleForm.mailbox"
            prefix-icon="el-icon-message"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="ruleForm.phone"
            prefix-icon="el-icon-mobile"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="is = !is">取消</el-button>
          <el-button @click="con()">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 修改 -->
    <div class="tianjia" v-show="iso">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <div class="uer">
          修改用户 <i class="el-icon-close" @click="iso = !iso"></i>
        </div>

        <el-form-item label="用户名" prop="name">
          <el-input
            v-model="username"
            prefix-icon="el-icon-user-solid"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="mailbox">
          <el-input
            v-model="email"
            prefix-icon="el-icon-message"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="mobile"
            prefix-icon="el-icon-mobile"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="iso = !iso">取消</el-button>
          <el-button @click="xiugai()">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 角色 -->
    <div class="jiese" v-show="isos">
      <div class="add">
        <div class="uer">
          分配角色 <i class="el-icon-close" @click="isos = !isos"></i>
        </div>
        <p>当前的用户：{{ role_name }}</p>
        <p>当前的角色：{{ names }}</p>
        <div class="fen">
          分配新角色：
          <el-select v-model="value" placeholder="请选择" @change="change">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="btn">
          <el-button type="primary" @click="isos = !isos">取消</el-button>
          <el-button @click="queren">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "../../http/index.js";
export default {
  props: {},
  data() {
    return {
      is: false,
      iso: false,
      isos: false,
      isover: false,
      inx: 0,
      input: "admin",
      list: {},
      lists: [],
      ye: 1,
      tiao: 2,
      id: "",
      email: "",
      mobile: "",
      username: "",
      num: 0,
      role_name: "",
      names: "",
      idd: "",
      ruleForm: {
        name: "admin",
        mima: "123456",
        mailbox: "123456789@qq.com",
        phone: "18888888888",
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "长度在 3 到 12 个字符",
            trigger: "blur",
          },
        ],
        mima: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "blur",
          },
        ],
        mailbox: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 13,
            max: 22,
            message: "长度在 13 到 22 个字符",
            trigger: "blur",
          },
        ],
        phone: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "长度在 11 个字符",
            trigger: "blur",
          },
        ],
      },
      options: [
        {
          value: "30",
          label: "主管",
        },
        {
          value: "40",
          label: "副主管",
        },
        {
          value: "-1",
          label: "超级管理员",
        },
        {
          value: "70",
          label: "测试角色",
        },
      ],
      value: "",
    };
  },
  mounted() {
    this.fn();
  },
  methods: {
    warning(row) {
      this.isos = !this.isos;
      this.role_name = row.role_name;
      this.names = row.username;
      this.idd = row.id;
    },
    change(v) {
      this.num = v;
    },
    queren() {
      http({
        url: "users/" + this.idd + "/role",
        method: "put",
        data: {
          rid: this.num,
        },
      }).then((res) => {
        console.log(res);
        this.$message({
          type: "success",
          message: res.meta.msg,
        });
        this.isos = !this.isos;
        this.fn();
      });
    },
    fn() {
      http({
        url: "users",
        params: {
          query: "",
          pagenum: this.ye,
          pagesize: this.tiao,
        },
      }).then((res) => {
        this.list = res.data;
      });
    },
    open(row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          http({
            url: `users/${row.id}`,
            method: "delete",
          }).then((res) => {
            this.$message({
              type: "success",
              message: res.meta.msg,
            });
            this.fn();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    xiugai() {
      console.log(this.id, this.email, this.mobile);
      http({
        url: `users/${this.id}`,
        data: {
          email: this.email,
          mobile: this.mobile,
        },
        method: "put",
      }).then((res) => {
        console.log(res);
        if (res.data == null) {
          this.$message({
            message: res.meta.msg,
            type: "warning",
          });
        } else {
          this.iso = !this.iso;
          this.$message({
            message: res.meta.msg,
            type: "success",
            duration: 2000,
          });
          this.fn();
        }
      });
    },
    sousun() {
      http({
        url: "users",
        params: {
          query: "",
          pagenum: 1,
          pagesize: 999,
        },
      }).then((res) => {
        this.lists = res.data.users;
        this.lists.filter((res, inx) => {
          if (this.input == res.username) {
            this.isover = true;
            this.inx = inx;
          }
        });
        if (this.isover) {
          this.list.users=[]
          http({
            url: "users/" + this.lists[this.inx].id,
          }).then((res) => {
            this.list.users.push(res.data)
            this.$message({
              message: "查询用户信息成功",
              type: "success",
              duration: 2000,
            });
          });
          this.isover = false;
        } else {
          this.$message({
            message: "查询用户信息失败",
            type: "error",
            duration: 2000,
          });
        }
      });
    },
    handleEdits(index, rows) {
      console.log(index, rows);
      this.id = rows.id;
      this.email = rows.email;
      this.mobile = rows.mobile;
      this.iso = !this.iso;
      this.username = rows.username;
    },
    handleEdit(index) {
      http({
        url: `users/${this.list.users[index].id}/state/${this.list.users[index].mg_state}`,
        method: "put",
      }).then((res) => {
        this.$message({
          message: res.meta.msg,
          type: "success",
          duration: 1000,
        });
      });
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      this.tiao = val;
      this.fn();
    },
    handleCurrentChange(val) {
      this.ye = val;
      this.fn();
    },
    con() {
      http({
        url: "users",
        method: "post",
        data: {
          username: this.ruleForm.name,
          password: this.ruleForm.mima,
          email: this.ruleForm.mailbox,
          mobile: this.ruleForm.phone,
        },
      }).then((res) => {
        console.log(res);
        if (res.data == null) {
          this.$message({
            message: res.meta.msg,
            type: "warning",
          });
        } else {
          this.is = !this.is;
          this.$message({
            message: res.meta.msg,
            type: "success",
            duration: 2000,
          });
        }
      });
    },
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
.el-button {
  border-radius: 5px;
  padding: 8px 15px;
}

.el-table::before {
  height: 0;
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
.jiese {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  .add {
    width: 750px;
    background-color: #fff;
    border-radius: 5px;
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
        right: 20px;
        font-size: 24px;
      }
    }
    p {
      font-size: 16px;
      padding: 10px 40px;
      color: rgb(99, 99, 99);
    }
    .fen {
      font-size: 16px;
      padding: 10px 40px;
      color: rgb(99, 99, 99);
    }
    .btn {
      display: flex;
      justify-content: flex-end;
      padding: 10px 40px 50px 40px;
    }
  }
}
.el-table--fit{
  margin-top: 20px;
}
</style>
