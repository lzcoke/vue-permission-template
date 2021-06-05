<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="form.name" placeholder="请输入用户名称"/>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" placeholder="请输入邮箱"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="form.password"
            auto-complete="new-password"
            placeholder="请输入密码"
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item label="学校">
          <el-input v-model="form.school" placeholder="请输入学校"/>
        </el-form-item>
        <el-form-item label="籍贯">
          <el-cascader
            v-model="selectedOptions"
            size="large"
            :options="regionData"
            filterable
            @change="handleChange"
          />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option value="0" label="男"/>
            <el-option value="1" label="女"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="onSubmit">立即保存</el-button>
          <el-button size="small" @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import md5 from 'js-md5'
// eslint-disable-next-line no-unused-vars
import { provinceAndCityData, CodeToText } from 'element-china-area-data'
import { createUser } from '@/api/user'

export default {
  data() {
    return {
      regionData: provinceAndCityData,
      selectedOptions: [],
      form: {
        userId: '',
        name: '',
        password: '',
        email: '',
        school: '',
        sex: '',
        provString: []
      }
    }
  },
  methods: {
    cancel() {
      this.$router.push('/user')
    },
    onSubmit() {
      let form = {
        userId: this.form.userId,
        nickname: this.form.name,
        password: md5(this.form.password),
        email: this.form.email,
        school: this.form.school,
        sex: this.form.sex,
        prov: this.form.provString[0],
        city: this.form.provString[1]
      }
      if (form.userId) {

      } else {
        // eslint-disable-next-line no-undef
        createUser(form).then(res => {
          if (res.code === 200) {
            this.$message.success('保存成功')
            this.$router.push('/user')
          } else {
            this.$message.error('网络错误')
          }
        })
      }
    },
    handleChange() {
      this.form.provString = []
      for (let i = 0; i < this.selectedOptions.length; i++) {
        this.form.provString.push(CodeToText[this.selectedOptions[i]])
      }
    }
  }
}
</script>
