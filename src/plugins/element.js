import { app } from '../main'
import {
    ElButton,
    ElDialog,
    ElForm,
    ElFormItem,
    ElInput,
    ElSwitch,
    ElPopconfirm,
    ElRow,
    ElCol,
    ElColorPicker,
} from 'element-plus'

const components = [
    ElButton,
    ElDialog,
    ElForm,
    ElFormItem,
    ElInput,
    ElSwitch,
    ElPopconfirm,
    ElRow,
    ElCol,
    ElColorPicker,
]

// const plugins = [
//     ElInfiniteScroll,
//     ElLoading,
//     ElMessage,
//     ElMessageBox,
//     ElNotification,
// ]

// plugins.forEach(plugin => {
//     app.use(plugin)
// })

// app.config.globalProperties.$ELEMENT = {
//     size: 'small',
// }

export default () => {
    components.forEach(component => {
        app.component(component.name, component)
    })
}
