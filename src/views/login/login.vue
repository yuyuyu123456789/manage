<template>
  <div class="login">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="mima">
        <el-input v-model="ruleForm.mima" show-password></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >登录</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
      <div class="logo">
        <img src="../../assets/logo.png" alt="" />
      </div>
    </el-form>
  </div>
</template>

<script>
import http from "../../http/index.js";
export default {
  props: {},
  data() {
    return {
      ruleForm: {
        name: "admin",
        mima: "123456",
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
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          http({
            url: "login",
            method: "post",
            data: {
              username: this.ruleForm.name,
              password: this.ruleForm.mima,
            },
          }).then((res) => {
            if (res.data == null) {
              this.$message({
                message: "账号或密码错误",
                type: "warning",
              });
            } else {
              sessionStorage.setItem("token", res.data.token);
              this.$message({
                message: res.meta.msg,
                type: "success",
                duration: 2000,
              });
              this.$router.push("/home");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields(() => {
        (this.mima = ""), (this.name = "");
      });
    },
  },
  components: {},
};
</script>

<style scoped lang="scss">
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2b4b6b;
  .demo-ruleForm {
    width: 600px;
    height: 220px;
    padding-top: 130px;
    padding-right: 40px;
    background-color: #fff;
    border-radius: 5px;
    position: relative;
    .el-button--primary {
      margin-left: 350px;
    }
    .el-button--default {
      background-color: #909399;
      color: #fff;
    }
  }
}
.logo {
  position: absolute;
  top: -65px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #eeeeee;
  border: 10px solid #ffffff;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0px 0px 8px #fff;
  img {
    width: 130px;
  }
}
.el-form-item{
  margin-bottom: 30px;
}
</style>
