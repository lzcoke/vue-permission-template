<template>
  <el-row class="goodTable-group">
    <el-col :span="12" class="card-goodTable-col">
      <el-table :data="goodItem" style="width: 100%">
        <el-table-column prop="good_id" label="商品编号" width="100" align="center">
        </el-table-column>
        <el-table-column prop="good_name" label="商品名称">
        </el-table-column>
        <el-table-column label="销量" width="100" align="center">
          <template slot-scope="scope">
            <el-tag type="danger">{{ scope.row.good_sales }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="12" class="card-goodTable-col">
      <el-table :data="userItem" style="width: 100%">
        <el-table-column prop="user_id" label="用户编号" width="100" align="center">
        </el-table-column>
        <el-table-column prop="nickname" label="姓名">
        </el-table-column>
        <el-table-column label="下单量" align="center">
          <template slot-scope="scope">
            <el-tag type="danger">{{ scope.row.orderNum }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
import { getTableData } from '@/api/table'

export default {
  name: 'GoodTable',
  data() {
    return {
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
      }],
      userItem: [],
      goodItem: []
    }
  },
  methods: {
    getData() {
      getTableData().then(response => {
        this.goodItem = response.data.goodItem
        this.userItem = response.data.userItem
      })
    }
  },
  created: function() {
    this.getData()
  },
  mounted() {
  }
}
</script>
<style lang="scss" scoped>
.goodTable-group {
  margin-top: 18px;
  margin: 0px -20px;

  .card-goodTable-col {
    margin-bottom: 32px;
    padding: 0px 20px;
  }
}
</style>

