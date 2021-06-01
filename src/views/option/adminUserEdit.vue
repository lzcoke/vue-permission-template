<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="100px" :rules="rules">
      <el-form-item label="姓名" prop="name">
        <el-col :span="6">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="账号" prop="username">
        <el-col :span="6">
          <el-input v-model="form.username" placeholder="请输入账号"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="密码" prop="password" v-if="!form.id">
        <el-col :span="6">
          <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <el-upload class="avatar-uploader" action="http://127.0.0.1:8000/backend/uploadImg" :show-file-list="false"
                   name="files" :on-success="handlePictureSuccess" :before-upload="beforePictureUpload"
        >
          <img v-if="form.avatar" :src="form.avatar" class="ip_logo">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="账号类型" prop="type">
        <el-col :span="6">
          <el-select v-model="form.type" placeholder="请选择" @change="bindTypeChange">
            <el-option label="系统管理员" :value="0"></el-option>
            <el-option label="普通管理员" :value="1"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
        <el-button @click="cancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { holdAdminUser, getAdminUser } from '@/api/table'

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        const passwordTest = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/
        if (!passwordTest.test(value)) {
          callback(new Error('密码须包含数字、字母两种元素，且密码位数为6-16位'))
        }
        callback()
      }
    }
    return {
      loading: false,
      form: {
        id: 0,
        name: '',
        username: '',
        password: '',
        avatar: '',
        type: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '情输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        avatar: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择账号类型', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      const id = this.$route.query.id
      if (id) {
        getAdminUser({ id: id }).then(response => {
          this.form.id = id
          this.form.avatar = response.data.avatar
          this.form.name = response.data.nickname
          this.form.username = response.data.username
          this.form.type = response.data.type
        })
      }
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          /* 提交保存商品*/
          const that = this
          console.log(that.form)
          holdAdminUser(that.form).then(response => {
            // eslint-disable-next-line eqeqeq
            if (response.code === 20000) {
              // eslint-disable-next-line eqeqeq
              if (response.message == 'failture') {
                that.$message({
                  message: response.content,
                  type: 'error',
                  duration: 1000,
                  onClose: function() {
                  }
                })
              } else {
                that.$message({
                  message: '编辑保存成功！',
                  type: 'success',
                  duration: 1000,
                  onClose: function() {
                    that.$router.push('/option/index')
                  }
                })
              }
            } else {
              that.$message.error('网络错误')
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /* 取消*/
    cancel() {
      this.$router.push('/option/index')
    },
    beforePictureUpload(file) {
      const typeItem = ['image/jpeg', 'image/png']
      const isJPG = typeItem.indexOf(file.type)
      const isLt2M = file.size / 1024 / 1024 < 5

      if (isJPG < 0) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 5MB!')
      }
      return isJPG && isLt2M
    },
    /* 上传成功*/
    handlePictureSuccess(res, file, fileList) {
      this.form.avatar = res.data
    },
    bindTypeChange(event) {
      this.form.type = event
    }
  }
}
</script>
