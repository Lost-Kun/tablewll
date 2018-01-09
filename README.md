# tablewll
基于vue2.x的表格组件，支持自定义td内元素以及事件绑定、排序、分页（后台配合）、列宽度拖动变化、懒加载优化等
### 安装
    npm install tablewll --save
### 引用组件
#### html引入

    <!-- 引入样式 -->
    <link rel="stylesheet" href="xxxx/tablewll/TableComponent.css">

    <!-- 引入js -->
    <script src="xxxx/tablewll/TableComponent.js"></script>
    
#### 模块引入
配合[webpack](https://webpack.js.org/)使用
```javascript

import Vue from 'vue'
import tablewll from 'tablewll'
import 'tablewll/TableComponent.css'

Vue.use(tablewll)

```

### 使用示例
```javascript
//html
<div id="tableBox">
  <table-component :table-data="table_data" :table-config="table_config"></table-component>
</div>

//js
new Vue({
  el: '#tableBox',
    data:{
      table_config:{
        tableHeaders: [
	  {header: "序号", dataIndex: "index", width:'50px'},
	  {header: "姓名", dataIndex: "name"},
	  {header: "年龄", dataIndex: "age"},
	  {header: "性别", dataIndex: "sex"}
	]
      },
      table_data:[
	{
          index:1,
          name:'小明',
          age:'17',
          sex:'男'
	},
        {
          index:1,
          name:'小红',
          age:'14',
          sex:'女'
        }
      ]
    }
})

```
#### 




