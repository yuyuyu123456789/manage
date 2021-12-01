<!-- 权限管理/角色列表 -->
<template>
  <div>
    <div class="home">
      <span>首页</span>
      <i class="el-icon-arrow-right"></i>
      <span>权限管理</span>
      <i class="el-icon-arrow-right"></i>
      <span>角色列表</span>
    </div>
    <div class="box">
      <div class="btn">
        <el-button type="primary" @click="is = !is">添加角色</el-button>
      </div>
      <el-table :data="list" style="width: 100%" border>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" class="demo-table-expand">
              <el-form-item label="">
                <el-row
                  v-for="(item1, l1) in props.row.children"
                  :key="item1.id"
                  :class="['bdb', l1 === 0 ? 'btop' : '']"
                >
                  <!-- 这一列，专门渲染 一级权限 -->
                  <el-col :span="5">
                    <el-tag closable @close="remove(props.row,item1.id)">{{ item1.authName }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 还剩余 19 列，分配给二三级权限 -->
                  <el-col :span="19">
                    <el-row
                      v-for="(item2, l2) in item1.children"
                      :key="item2.id"
                      :class="[l2 === 0 ? 'btop' : '']"
                    >
                      <el-col :span="6">
                        <el-tag closable type="success"
                        @close="remove(props.row,item2.id)"
                        >{{
                          item2.authName
                        }}</el-tag>
                        <i class="el-icon-caret-right"></i>
                      </el-col>
                      <el-col :span="18">
                        <el-tag
                          v-for="item3 in item2.children"
                          :key="item3.id"
                          @close="remove(props.row,item3.id)"
                          closable
                          type="warning"
                          >{{ item3.authName }}</el-tag
                        >
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column label="#" width="70">
          <template slot-scope="scope">
            <span style="margin-left: 15px">{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>

        <el-table-column label="角色名称" width="400">
          <template slot-scope="scope">
            <span>{{ scope.row.roleName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="角色描述" width="400">
          <template slot-scope="scope">
            <span>{{ scope.row.roleDesc }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="400">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="handleEdits(scope.row)"
              circle
              >编辑</el-button
            >

            <el-button
              type="danger"
              @click="open(scope.row)"
              icon="el-icon-delete"
              circle
            >
              删除
            </el-button>

            <el-button
              type="warning"
              @click="warning(scope.row)"
              icon="el-icon-s-tools"
              circle
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
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
          添加角色 <i class="el-icon-close" @click="is = !is"></i>
        </div>
        <el-form-item label="角色描述" prop="name">
          <el-input
            v-model="ruleForm.name"
            prefix-icon="el-icon-user-solid"
            clearable
          ></el-input>
        </el-form-item>

        <div class="fen">
          角色名称：
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

        <el-form-item>
          <el-button type="primary" @click="is = !is">取消</el-button>
          <el-button @click="tianjia">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 修改 -->
    <div class="jiese" v-show="isos">
      <div class="add">
        <div class="uer">
          分配角色 <i class="el-icon-close" @click="isos = !isos"></i>
        </div>
        <p>当前的角色：{{ roleName }}</p>
        <div class="roleDesc">
          当前的描述：
          <el-input v-model="roleDesc" placeholder="请输入内容"></el-input>
        </div>
        <div class="fen">
          分配新角色：
          <el-select v-model="value" placeholder="请选择" @change="changes">
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
          <el-button @click="xiugei">确定</el-button>
        </div>
      </div>
    </div>
    <!-- 分配权限 -->
    <div class="quanxian" v-show="isover">
      <div class="add">
        <div class="uer">
          分配权限 <i class="el-icon-close" @click="isover = !isover"></i>
        </div>
        <el-tree
          show-checkbox
          :data="lists"
          :props="def"
          ref="treeref"
          node-key="id"
          default-expand-all
          :default-checked-keys="defks"
        ></el-tree>
        <div class="btn">
          <el-button type="primary" @click="isover = !isover">取消</el-button>
          <el-button @click="fenpai">确定</el-button>
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
      activeNames: ["1"],
      list: [],
      lists: [],
      def: {
        label: "authName",
        children: "children",
      },
      defks: [],
      is: false,
      isos: false,
      isover: false,
      ads: 0,
      num: "",
      value: "",
      ruleForm: {
        name: "技术负责人",
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
      },
      options: [
        {
          value: "总经理",
          label: "总经理",
        },
        {
          value: "主管",
          label: "主管",
        },
        {
          value: "副主管",
          label: "副主管",
        },
        {
          value: "超级管理员",
          label: "超级管理员",
        },
        {
          value: "测试角色",
          label: "测试角色",
        },
      ],
      id: "",
      roleName: "",
      roleDesc: "",
    };
  },
  mounted() {
    this.fn();
  },
  methods: {
    fn() {
      http({
        url: "roles",
      }).then((res) => {
        this.list = res.data;
        console.log(res.data);
      });
    },
    remove(row,item3) {
      console.log(row,item3);
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          http({
            url:`roles/${row.id}/rights/${item3}`,
            method:'delete'
          }).then((res)=>{
            row.children=res.data
            this.$message({
            type: 'success',
            message: res.meta.msg
          });
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    fenpai() {
      let keys = [
        ...this.$refs.treeref.getCheckedKeys(),
        ...this.$refs.treeref.getHalfCheckedNodes(),
      ];
      console.log(keys);
      let ids = keys.join(",");
      http({
        url: `roles/${this.ads}/rights`,
        method: "post",
        data: {
          rids: ids,
        },
      }).then((res) => {
        this.isover = !this.isover;
        this.fn();
        this.$message({
          message: res.meta.msg,
          type: "success",
          duration: 2000,
        });
      });
    },
    warning(row) {
      console.log(row);
      this.ads = row.id;
      this.isover = !this.isover;
      http({
        url: "rights/tree",
      })
        .then((res) => {
          // console.log(res.data);
          this.lists = res.data;
        })
        .then(() => {
          this.defks = [];
          row.children.filter((arr) => {
            arr.children.filter((item) => {
              item.children.filter((itn) => {
                this.defks.push(itn.id);
              });
            });
          });
        });
    },
    handleChange(val) {
      console.log(val);
    },
    change(v) {
      this.num = v;
    },
    changes(v) {
      this.roleName = v;
    },
    tianjia() {
      http({
        url: "roles",
        method: "post",
        data: {
          roleName: this.num,
          roleDesc: this.ruleForm.name,
        },
      }).then((res) => {
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
          this.fn();
        }
      });
    },
    open(row) {
      console.log(row);
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          http({
            url: `roles/${row.id}`,
            method: "delete",
          }).then((res) => {
            console.log(res);
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
    handleEdits(row) {
      this.id = row.id;
      this.roleName = row.roleName;
      this.roleDesc = row.roleDesc;
      this.isos = !this.isos;
    },
    xiugei() {
      console.log(this.roleName, this.roleDesc);
      http({
        url: `roles/${this.id}`,
        method: "put",
        data: {
          roleName: this.roleName,
          roleDesc: this.roleDesc,
        },
      }).then(() => {
        this.isos = !this.isos;
        this.$message({
          type: "success",
          message: "修改成功",
        });
        this.fn();
      });
    },
  },
  components: {},
};
</script>

<style scoped lang="scss">
.btop {
  border-top: 1px solid #eee;
}
.bdb {
  border-bottom: 1px solid #eee;
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
.box {
  background-color: #fff;
  padding: 20px;
}
.el-button.is-circle {
  height: 32px;
  border-radius: 5px;
  padding: 5px 15px;
}

.el-table::before {
  height: 0;
}
.btn {
  margin-bottom: 20px;
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
      margin-left: 480px;
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
.fen {
  font-size: 16px;
  padding: 10px 30px;
  color: rgb(99, 99, 99);
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
    .roleDesc {
      font-size: 16px;
      padding: 20px 40px;
      color: rgb(99, 99, 99);
      display: flex;
      align-items: center;
      .el-input {
        margin-left: 5px;
        width: 200px;
      }
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
.quanxian {
  position: fixed;
  overflow: auto;
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
    height: 100%;
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
    .el-tree {
      padding: 0px 0px 0px 30px;
    }
    .btn {
      display: flex;
      justify-content: flex-end;
      padding: 10px 40px 50px 40px;
      background-color: #fff;
    }
  }
}
</style>
