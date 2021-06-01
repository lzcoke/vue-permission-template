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
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="编号" width="80">
        <template slot-scope="scope">
          {{ scope.row.user_id }}
        </template>
      </el-table-column>
      <el-table-column label="用户头像" width="110" align="center">
        <template slot-scope="scope">
          <el-avatar shape="square" :size="40" fit="fit" :src="scope.row.avatar" />
        </template>
      </el-table-column>
      <el-table-column label="昵称">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.driver_name }}
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.driver_phone }}
        </template>
      </el-table-column>
      <el-table-column label="行驶证" width="150" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 60px; max-height: 60px"
            :src="scope.row.driver_licence"
            :preview-src-list="[scope.row.driver_licence]"
          />
        </template>
      </el-table-column>
      <el-table-column label="驾驶证" width="150" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 60px; max-height: 60px"
            :src="scope.row.driver_licence"
            :preview-src-list="[scope.row.driver_licence]"
          />
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="进度" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.driver_progress | progressFilter">{{
            scope.row.driver_progress | progressText
          }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="最新更新时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.driver_update_date }}</span>
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
import { getUserDriver } from '@/api/user'

export default {
  filters: {
    progressFilter(status) {
      const statusMap = {
        10: 'success',
        0: 'gray',
        20: 'danger'
      }
      return statusMap[status]
    },
    progressText(status) {
      const statusMap = {
        10: '通过',
        0: '审核中',
        20: '失败'
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
      getUserDriver(searchParams).then(response => {
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
    }
  }
}
</script>
