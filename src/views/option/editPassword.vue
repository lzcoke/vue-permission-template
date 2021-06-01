<template>
    <div class="app-container">
        <el-form ref="form" :model="form" label-width="100px" :rules="rules" >
            <el-form-item label="账号">
                <el-col :span="6">
                    <el-input v-model="form.username" placeholder="请输入账号" :disabled="true"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-col :span="6">
                    <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="重复密码" prop="newPassword">
                <el-col :span="6">
                    <el-input placeholder="请输入密码" v-model="form.newPassword" show-password></el-input>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">立即修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { holdAdminUser,getAdminUser,editPassword } from '@/api/table'
    import { getInfo } from '@/api/user'
    import { getToken } from '@/utils/auth'
    export default {
        data() {
            var passwordTest = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.form.newPassword !== '') {
                        this.$refs.form.validateField('newPassword');
                    }else if (!passwordTest.test(value)) {
                        callback(new Error('密码须包含数字、字母两种元素，且密码位数为6-16位'));
                    }
                    callback();
                }
            }
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.password) {
                    callback(new Error('两次输入密码不一致!'));
                }else if (!passwordTest.test(value)) {
                    callback(new Error('密码须包含数字、字母两种元素，且密码位数为6-16位'));
                } else {
                    callback();
                }
            };
            return {
                loading: false,
                form: {
                    id: 0,
                    username: '',
                    password: '',
                    newPassword: '',
                },
                rules: {
                    password: [
                    { validator: validatePass, trigger: 'blur' }
                    ],
                    newPassword: [
                    { validator: validatePass2, trigger: 'blur' }
                    ],
                }
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                this.listLoading = true
                const token = getToken()
                getInfo(token).then(response => {
                    const { data } = response
                    this.form.username = data.username
                    this.form.id = data.id
                })
            },
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        /*提交保存商品*/
                        const that = this
                        editPassword({id:that.form.id,value:that.form.password,newPassword:that.form.newPassword}).then(response=>{
                            if(response.code == 20000){
                                if(response.message == 'failture'){
                                    that.$message({
                                        message: response.content,
                                        type: 'error',
                                        duration:1000,
                                        onClose:function(){
                                        }
                                    })
                                }else{
                                    that.$message({
                                        message: '修改成功！',
                                        type: 'success',
                                        duration:1000,
                                        onClose:function(){
                                            that.$router.push('/home')
                                        }
                                    })
                                }
                            }else{
                                that.$message.error('网络错误');
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        }
    }
</script>
