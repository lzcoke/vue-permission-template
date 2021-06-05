<template>
  <div class="app-container">
    <el-form :inline="true" :model="searchFrom" class="demo-form-inline" size="small">
      <el-form-item>
        <el-input v-model="searchFrom.number" placeholder="用户编号" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchFrom.name" placeholder="用户名称" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchFrom.email" placeholder="邮箱" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-row class="tool">
      <el-col :span="24">
        <el-button type="primary" size="mini" @click="create()">新增用户</el-button>
      </el-col>
    </el-row>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="编号" width="80">
        <template slot-scope="scope">
          {{ scope.row.userId }}
        </template>
      </el-table-column>
      <el-table-column label="用户头像" width="110" align="center">
        <template slot-scope="scope">
          <el-avatar shape="square" :size="40" fit="fit" :src="scope.row.avatar" />
        </template>
      </el-table-column>
      <el-table-column label="昵称" align="center">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="邮箱" align="center">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="位置" align="center">
        <template slot-scope="scope">
          {{ scope.row.prov }} {{ scope.row.city }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="学校" align="center">
        <template slot-scope="scope">
          {{ scope.row.school }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="性别" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.sex | statusFilter">{{ scope.row.sex | statusSex }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createDate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="状态" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.block === 0" type="primary">使用中</el-tag>
          <el-tag v-else type="danger">已冻结</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="基本操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="updatePassword(scope.row)">修改密码</el-button>
          <el-button v-if="scope.row.block === 0" type="danger" size="mini" @click="blocking(scope.row)">冻结</el-button>
          <el-button v-else type="danger" size="mini" @click="cancelBlocking(scope.row)">解冻</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="app-pagination">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :current-page="page"
        :page-sizes="[limit, 20, 50, 100]"
        :page-size="limit"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        @prev-click="handlePrevChange"
        @next-click="handleNextChange"
      />
    </div>
  </div>
</template>

<script>
import { getUserList, userBlock, userCancelBlock, userUpdatePassword } from '@/api/user'
import md5 from 'js-md5'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        0: 'danger'
      }
      return statusMap[status]
    },
    statusSex(status) {
      const statusMap = {
        1: '女',
        0: '男'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      searchFrom: {
        name: '',
        number: '',
        email: ''
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
      getUserList(searchParams).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    onSearch() {
      this.fetchData()
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
    handleSizeChange(event) {
      this.limit = event
      this.fetchData()
    },
    blocking(event) {
      this.$confirm('此操作将冻结该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        userBlock({ userId: event.userId }).then(res => {
          if (res.code === 200) {
            this.$message.success('冻结成功')
            this.fetchData()
          } else {
            this.$message.error('网络错误')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    cancelBlocking(event) {
      this.$confirm('此操作将解冻该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        userCancelBlock({ userId: event.userId }).then(res => {
          if (res.code === 200) {
            this.$message.success('解冻成功')
            this.fetchData()
          } else {
            this.$message.error('网络错误')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    updatePassword(event) {
      this.$prompt('请输入新密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'password'
      }).then(({ value }) => {
        // eslint-disable-next-line no-undef
        userUpdatePassword({ userId: event.userId, password: md5(value) }).then(res => {
          if (res.code === 200) {
            this.$message.success('修改成功')
            this.fetchData()
          } else {
            this.$message.error('网络错误')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    create() {
      this.$router.push('/user/create')
    }
  }
}
</script>
