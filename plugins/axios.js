import { Message } from 'element-ui'
// axios拦截插件
//每个nuxt的插件都会暴露出一个函数
// 插件的第一个参数是默认的nuxt对象
export default ({ $axios }) => {
    //axios的错误拦截
    $axios.onError(res => {
        const { statusCode, message } = res.response.data
        if (statusCode) {
            Message.warning(message)
        }
    })
    // console.log(store)
}