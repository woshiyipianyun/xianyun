import { Message } from 'element-ui'
// axios拦截插件
//每个nuxt的插件都会暴露出一个函数
// 插件的第一个参数是默认的nuxt对象
export default ({ $axios, redirect }) => {
    //axios的错误拦截
    $axios.onError(res => {
        //判断错误信息，提示错误的返回
        const { statusCode, message } = res.response.data
        //401||403没有权限的错误
        if (statusCode === 401 || statusCode === 403) {
            //跳转到登陆页
            redirect('/user/login')
        }
        if (statusCode === 400) {
            Message.warning(message)
        }
    })
    // console.log(store)
}