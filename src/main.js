import Vue from 'vue'
import App from './App.vue'
import { 
  Button,
  Radio,
  Input,
  Switch,
  Link,
  Tabs,
  TabPane,
  Container,Main,Header,Aside,
  Menu,Submenu,MenuItem,
  MenuItemGroup,
  Dropdown,DropdownMenu,DropdownItem,
  Row,Col,
  Card,
  Table,TableColumn,
  Form,FormItem,
  Breadcrumb,BreadcrumbItem,
  Message,
  MessageBox,
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import router from './routes'
import store from './store'

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Radio)
Vue.use(Container)
Vue.use(Main)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Link)
Vue.use(Switch)
Vue.use(Tabs)
Vue.use(TabPane)

Vue.prototype.$message = Message
Vue.prototype.$prompt = MessageBox.prompt

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
