# tablewll
基于vue2.x的表格组件，支持自定义td内元素、事件绑定、排序、分页（后台配合）、表头固定、行悬浮显示隐藏、懒加载优化等功能
                                                                     
![演示](https://github.com/Lost-Kun/tablewll/blob/master/images/demo.gif)

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

### 1. 基础使用

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
				index:2,
				name:'小红',
				age:'14',
				sex:'女'
			}
		]
	}
})

```

### 2. 自定义td内元素
* 效果图：
![示例2](https://github.com/Lost-Kun/tablewll/blob/master/images/demo2.png)

* 代码：
```javascript
/** html */
<div id="tableBox">
  <table-component :table-data="table_data" :table-config="table_config" ></table-component>
</div>

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
				index:2,
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

### 3. 添加操作列

* 效果图：
![示例3](https://github.com/Lost-Kun/tablewll/blob/master/images/demo3.png)

* 代码：
```javascript
/** html */
<div id="tableBox">
  <table-component :table-data="table_data" :table-config="table_config" ></table-component>
</div>

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
				index:2,
				name:'小红',
				age:'14',
				sex:'女'
			}
		]
	}
})

```

### 4. 分页

* 效果图：
![示例4](https://github.com/Lost-Kun/tablewll/blob/master/images/demo4.png)

* 代码：
```javascript
/** html */
<div id="tableBox">
  <table-component :table-data="table_data" :table-config="table_config" :record-total="total_number" :get-data="getData" ></table-component>
</div>

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
            		],
            		pageable: true, //是否分页，默认false
            		size: 10 //每页展示条数，默认10
		},
		table_data:[
			{
				index:1,
				name:'小明',
				age:'17',
				sex:'男'
			},
			{
				index:2,
				name:'小红',
				age:'14',
				sex:'女'
			}
        ],
        total_number:20 //传入总数据量
    },
    methods:{
        /**
         * 分页排序调用函数
         * 
         * @param {number} curPage 当前页
         * @param {number} size 每页显示条数
         */
        getData:function(curPage, size){
            /**
             * 请求接口获取数据，重新赋值table_data
             */
        }
    }
})

```

### 5. 排序

* 效果图：
![示例5](https://github.com/Lost-Kun/tablewll/blob/master/images/demo5.png)

* 代码：
```javascript
/** html */
<div id="tableBox">
  <table-component :table-data="table_data" :table-config="table_config" :get-data="getData" ></table-component>
</div>

/** js */
new Vue({
	el: '#tableBox',
	data:{
		table_config:{
			tableHeaders: [
				{header: "序号", dataIndex: "index", sortable: true}, //sortable为true，则该列可排序
				{header: "姓名", dataIndex: "name"},
				{header: "年龄", dataIndex: "age", sortable: true},
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
				index:2,
				name:'小红',
				age:'14',
				sex:'女'
			}
        ]
    },
    methods:{
        /**
         * 分页排序调用函数
         * 
         * @param {number} curPage 当前页
         * @param {number} size 每页显示条数
         * @param {string} dataIndex 选中的排序字段
         * @param {number} orderType 排序方式，0：降序，1：升序
         */
        getData:function(curPage, size, dataIndex, orderType){
            /**
             * 请求接口获取数据，重新赋值table_data
             */
        }
    }
})

```

### 6. 行悬浮显示

* 效果图：
![示例6](https://github.com/Lost-Kun/tablewll/blob/master/images/demo6.png)

* 代码：
```javascript
/** html */
<div id="tableBox">
  <table-component :table-data="table_data" :table-config="table_config" ></table-component>
</div>

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
			],
			hovereventOpen:true, //是否使用行悬浮显示，默认false
			hovereventOpenWidth:'100px', //悬浮区域宽度
			hovereventConfig:{//悬浮区域显示内容，配置项和td自定义元素相同
				T_type:'button',
				T_value:['详情','删除'],
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
		},
		table_data:[
			{
				index:1,
				name:'小明',
				age:'17',
				sex:'男'
			},
			{
				index:2,
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
get-data|分页排序调用函数|function|-|-
record-total|分页数据总数|number|-|0
show-waitingicon|是否显示等待字样|boolean|-|false

### table-data options
Key|说明|类型|可选值|默认值
-|-|-|-|-
tr_class|表格每行class|string|-|-
tr_style|表格每行style|object|-|-

#### td自定义元素 options
Key|说明|类型|可选值|默认值
-|-|-|-|-
T_type|自定义html元素类型，如：input、select、img等|string|-|-
T_value|表单元素为绑定值,一般为innerText;类型为array时，通过数组长度确定元素个数|string/array|-|-
T_class|元素class|string/array|-|-
T_style|元素style|object/array|-|-
T_attrs|元素的html特性，如：id|object/array|-|-
T_domProps|元素DOM属性，如：innerHTML|object/array|-|-
T_events|元素的监听事件，如：click、mouseover；参数依次为e,tdData,trData,tbData|object/array|-|-

### table-config options
Key|说明|类型|可选值|默认值
-|-|-|-|-
tableHeaders|表头配置（详细见tableHeaders options）|array|-|-
pageable|是否分页|boolean|-|false
size|分页时每页显示条数|number|-|10
showCheckbox|是否显示复选框|boolean|-|false
checkboxWidth|复选框列宽度|string|-|50px
theadClass|表头Class|string|-|-
theadStyle|表头style|object|-|-
trClickEvent|表格内容tr点击事件触发方法，参数依次为：e,trData,tbData|function|-|-
hovereventOpen|是否使用行悬浮显示|boolean|-|false
hovereventOpenWidth|悬浮区域宽度|string|-|120px
hovereventConfig|悬浮区域显示内容配置（参考td自定义元素 options）；特：可通过T_nodeNumber确定元素个数|object|-|-
lazyload|是否启用懒加载|boolean|-|true
lazySize|懒加载每加载一次显示条数|number|-|40

#### tableHeaders options
Key|说明|类型|可选值|默认值
-|-|-|-|-
header|表头的显示文字|string|-|-
dataIndex|该列对应table-data中数据的key|string|-|-
width|列宽度，默认自适应，支持px，%等|string|-|-
sortable|该列是否可排序|boolean|-|-
td自定义元素中options|用于添加操作类|-|-|-

## Methods
方法名|说明|参数
-|-|-
refreshTableData|重新调用getData获取数据，若分页，则跳转到第一页|-
getSelectedData|获取复选框选中的数据|-
getCurrentPage|获取分页时的当前页|-

### Methods使用示例
* 代码：
```javascript
/** html */
<div id="tableBox">
  <table-component ref="table" :table-data="table_data" :table-config="table_config" ></table-component>
</div>

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
			],
			showCheckbox:true//是否显示复选框
		},
		table_data:[
			{
				index:1,
				name:'小明',
				age:'17',
				sex:'男'
			},
			{
				index:2,
				name:'小红',
				age:'14',
				sex:'女'
			}
		]
	},
	methods:{
		/**
		 * 获取勾选的表格数据数据
		*/
		getSelectedData:function(){
			return this.$refs.table.getSelectedData()//Methods
		}
	}
})
```




