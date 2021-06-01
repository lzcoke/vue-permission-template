<template>
  <div class="app-container">
    <el-form :inline="true" :model="searchFrom" class="demo-form-inline" size="small">
      <el-form-item>
        <el-input v-model="searchFrom.name" placeholder="管理员昵称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="操作编号" width="95">
        <template slot-scope="scope">
          {{ scope.row.log_id }}
        </template>
      </el-table-column>
      <el-table-column label="头像" width="110" align="center">
        <template slot-scope="scope">
          <el-avatar shape="square" :size="40" fit="fit" :src="scope.row.avatar"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="管理员昵称" width="200">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column label="操作账号" width="200">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="操作记录">
        <template slot-scope="scope">
          {{ scope.row.log_note }}
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="操作时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.log_date }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="app-pagination">
      <el-pagination background layout="prev, pager, next" :page-size="limit" :total="total"
                     @prev-click="handlePrevChange" @next-click="handleNextChange" @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getAdminLog } from '@/api/table'
import { getToken } from '@/utils/auth'

export default {
  data() {
    return {
      searchFrom: {
        name: ''
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

      var adminId = getToken()
      const searchParams = this.searchFrom
      searchParams['page'] = this.page
      searchParams['limit'] = this.limit
      searchParams['id'] = adminId

      getAdminLog(searchParams).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    onSearch() {
      this.fetchData()
    },
    /*上一页*/
    handlePrevChange(event) {
      this.page = event
      this.fetchData()
    },
    /*下一页*/
    handleNextChange(event) {
      this.page = event
      this.fetchData()
    },
    /*数字点击*/
    handleCurrentChange(event) {
      this.page = event
      this.fetchData()
    }
  }
}
</script>
