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
  CheckboxGroup,Checkbox,
  Breadcrumb,BreadcrumbItem,
  Message,
  MessageBox,
  Tree,
  Select,
  Progress,
  Transfer,
	Drawer
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
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Link)
Vue.use(Switch)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Tree)
Vue.use(Select)
Vue.use(Progress)
Vue.use(Transfer)
Vue.use(Drawer)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
