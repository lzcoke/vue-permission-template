<template>
  <div class="app-container">
    <el-form :inline="true" :model="searchFrom" class="demo-form-inline" size="small">
      <el-form-item>
        <el-button type="primary" @click="create">添加子账号</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="账号编号" width="100">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="头像" width="120" align="center">
        <template slot-scope="scope">
          <el-avatar shape="square" :size="50" fit="contain" :src="scope.row.avatar" />
        </template>
      </el-table-column>
      <el-table-column label="管理者" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>

      <el-table-column label="账号">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="账号类型" width="120" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type == 0" type="danger">总管理员</el-tag>
          <el-tag v-else-if="scope.row.type == 1">子管理员</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="创建时间" width="200" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.create_date }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="btn" label="基础操作" width="250">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="editPassword(scope.row)">修改密码</el-button>
          <el-button size="mini" type="primary" @click="edit(scope.row)">编辑</el-button>
          <el-button v-if="scope.row.username != 'admin'" size="mini" type="danger" @click="deleteAdminUser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="app-pagination">
      <el-pagination background layout="prev, pager, next" :page-size="limit" :total="total" @prev-click="handlePrevChange" @next-click="handleNextChange" @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script>
import { getAdminUserList, deleteAdminUser, editPassword } from '@/api/table'
export default {
  filters: {
    statusSex(status) {
      const statusMap = {
        0: '待支付',
        1: '待发货',
        2: '待收货',
        3: '待评价',
        4: '已完成'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      searchFrom: {
        name: '',
        number: '',
        ip: ''
      },
      list: null,
      listLoading: true,
      total: 0,
      limit: 10,
      page: 1
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      const searchParams = this.searchFrom
      searchParams['page'] = this.page
      searchParams['limit'] = this.limit
      getAdminUserList(searchParams).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    onSearch() {
      this.fetchData()
    },
    edit(event) {
      this.$router.push('/option/adminEdit?id=' + event.id)
    },
    /* 上一页*/
    handlePrevChange(event) {
      this.page = event
      this.fetchData()
    },
    /* 下一页*/
    handleNextChange(event) {
      this.page = event
      this.fetchData()
    },
    /* 数字点击*/
    handleCurrentChange(event) {
      this.page = event
      this.fetchData()
    },
    create() {
      this.$router.push('/option/adminEdit')
    },
    deleteAdminUser(event) {
      this.$confirm('此操作将该账号永久删除, 是否继续?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        deleteAdminUser({ id: event.id }).then(response => {
          if (response.code == 20000) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.fetchData()
          } else {
            this.$message({
              type: 'error',
              message: '删除失败!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除!'
        })
      })
    },
    editPassword(event) {
      this.$prompt('请输入密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/,
        inputErrorMessage: '密码格式不正确',
        inputType: 'password'
      }).then(({ value }) => {
        editPassword({ id: event.id, value: value }).then(response => {
          if (response.code == 20000) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
          } else {
            this.$message({
              type: 'error',
              message: '修改失败!'
            })
          }
        })
      })
    }
  }
}
</script>
