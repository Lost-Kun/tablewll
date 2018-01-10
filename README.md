# tablewll
基于vue2.x的表格组件，支持自定义td内元素以及事件绑定、排序、分页（后台配合）、列宽度拖动变化、懒加载优化等
## 安装
    npm install tablewll --save
## 引用组件
### html引入

    <!-- 引入样式 -->
    <link rel="stylesheet" href="xxxx/tablewll/TableComponent.css">

    <!-- 引入js -->
    <script src="xxxx/tablewll/TableComponent.js"></script>
    
### 模块引入
配合[webpack](https://webpack.js.org/)使用
```javascript

import Vue from 'vue'
import tablewll from 'tablewll'
import 'tablewll/TableComponent.css'

Vue.use(tablewll)

```

## 使用示例

1. **基础使用**

* 效果图：
![示例1](https://github.com/Lost-Kun/tablewll/blob/master/images/demo1.png)

* 代码：
```javascript
/** html */
<div id="tableBox">
  <table-component :table-data="table_data" :table-config="table_config"></table-component>
</div>

/** js */
new Vue({
	el: '#tableBox',
	data:{
		table_config:{
			tableHeaders: [
				{header: "序号", dataIndex: "index", width:'50px'}, //width设置列宽
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

2. **自定义td内元素**
* 效果图：
![示例2](https://github.com/Lost-Kun/tablewll/blob/master/images/demo2.png)

* 代码：
```javascript
/** js */
new Vue({
	el: '#tableBox',
	data:{
		table_config:{
			tableHeaders: [
				{header: "序号", dataIndex: "index"},
				{header: "姓名", dataIndex: "name"},
				{header: "年龄", dataIndex: "age"},
				{header: "性别", dataIndex: "sex"}
			]
		},
		table_data:[
			{
				index:1,
				name:'小明',
				age:{
					//自定义html元素类型
					T_type:'input',
					//表单元素为绑定值,一般为innerText
					T_value:'17',
					//指定元素class
					T_class:'',
					//指定元素style
					T_style:{
						width:'100px'
					},
					//正常的 html 特性
					T_attrs:{
						id: 'foo'
					},
					// DOM 属性
					T_domProps:{
						innerHTML: ''
					},
					//事件监听器
					T_events:{
						change:function(e, tdData, trData, tbData){
							alert(tdData.T_value)
						}
					}
				},
				sex:'男'
			},
			{
				index:1,
				name:'小红',
				age:'14',
				sex:{
					T_type:'select',
					T_value:[//select值比较特殊，需嵌套数组
						[
							{
								value:0,
								text:'男'
							},
							{
								value:1,
								text:'女',
								selected:true //默认值
							}
						]
					],
					T_style:{
						width:'100px'
					}
				}
			}
		]
	}
})
```

3. **添加操作列**

* 效果图：
![示例3](https://github.com/Lost-Kun/tablewll/blob/master/images/demo3.png)

* 代码：
```javascript

/** js */
new Vue({
	el: '#tableBox',
	data:{
		table_config:{
			tableHeaders: [
				{header: "序号", dataIndex: "index"},
				{header: "姓名", dataIndex: "name"},
				{header: "年龄", dataIndex: "age"},
				{header: "性别", dataIndex: "sex"},
				{
					header: "操作",
					T_type:'button',
                    			T_value:['详情', '删除'],//多元素，使用数组
                    			T_style:{
                        			margin:'auto 5px'
                    			},
					T_events:[//多元素，使用数组
						{
							click:function(e, tdData, trData, tbData){
								alert(JSON.stringify(trData))
							}
						},
						{

						}
					]
				}
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

## Attributes
参数|说明|类型|可选值|默认值
-|-|-|-|-
table-data|显示的数据|array|-|-
table-config|表格相关配置|object|-|-
get-data|分页跳转调用函数|function|-|-
record-total|分页数据总数|number|-|0
show-waitingicon|是否显示等待字样|boolean|-|false

### table-config options
Key|说明|类型|可选值|默认值
-|-|-|-|-
tableHeaders|表头配置|array|-|-




