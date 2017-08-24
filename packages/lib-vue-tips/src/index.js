/* eslint-disable */
import Tips from './tips.vue'
export default {
    install(Vue, options) {
        const CONSTRUCTOR = Vue.extend(Tips)
        let   body = document.body
        let   vm        
        let   tid 
        let   ptr 
        
        const showTips = function({ 
            msg='',
            isLoading=false, 
            autoHide=true, 
            hideTime=1200,
            iconClass }) {

            if (!vm) {
                let el = document.createElement('div')
                // body.appendChild(el)
                vm = new CONSTRUCTOR().$mount(el)
            }

            if (vm.open && tid) {
                clearTimeout(tid)
            }
            
            vm.msg  = msg 
            vm.isLoading = isLoading
            vm.open = true   
            vm.iconClass = iconClass             
            
            if (autoHide) {                
                tid = setTimeout(function () {
                    vm.open = false
                    tid = null
                }, hideTime)
            }
        }

        const showLoading = function (msg='努力加载中...', iconClass='rotate-icon') {
            this.$showTips({
                msg : msg,
                isLoading: true,
                autoHide: false,
                iconClass
            })
        }

        const showError = function (msg) {
            this.$showTips({
                msg: msg
            }) 
        }

        const hideTips = function (msg) {
            vm.open = false
        }

        Vue.$showTips = showTips
        Vue.$showLoading = showLoading
        Vue.$showError = showError 
        Vue.$hideTips = hideTips

        Vue.prototype.$showTips = showTips
        Vue.prototype.$showLoading = showLoading
        Vue.prototype.$showError = showError 
        Vue.prototype.$hideTips = hideTips
    }
}
