<template>
  <div class="app-container">
    <el-form :inline="true" :model="searchFrom" class="demo-form-inline" size="small">
      <el-form-item>
        <el-input v-model="searchFrom.number" placeholder="用户编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchFrom.name" placeholder="用户名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          {{ scope.row.user_id }}
        </template>
      </el-table-column>
      <el-table-column label="头像" width="110" align="center">
        <template slot-scope="scope">
          <el-avatar shape="square" :size="40" fit="fit" :src="scope.row.avatar"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="昵称">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column label="优惠券" width="130" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.userCouponNum }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="下单量" width="120" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.orderNum }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="性别" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.sex | statusFilter">{{ scope.row.sex | statusSex }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.create_date }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="app-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[limit, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        @prev-click="handlePrevChange"
        @next-click="handleNextChange"
        :page-size="limit"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        2: 'gray',
        0: 'danger'
      }
      return statusMap[status]
    },
    statusSex(status) {
      const statusMap = {
        1: '男',
        2: '女',
        0: '保密'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      searchFrom: {
        name: '',
        number: ''
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
      getList(searchParams).then(response => {
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
    },
    handleSizeChange(event) {
      this.limit = event
      this.fetchData()
    }
  }
}
</script>
