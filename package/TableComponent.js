
//td组件开始
var TDComponent = {
    props:{
        columnData:{
            type:Object,
            default:function () {
                return {}
            }
        },
        tdData:{
            type:[String,Object,Number],
            default:""
        },
        trData:{
            type:Object,
            default:function () {
                return {}
            }
        },
        tbData:{
            type:Array,
            default:function () {
                return []
            }
        },
        borderHide:{
            type:Boolean,
            default:false
        }
    },
    render:function (createElement) {
        var self=this;
        return createElement(
            'td',
            (function () {
                var dataObject={};
                if(typeof self.tdSource=="string"&&self.tdSource!="TB_undefined"||typeof self.columnData.T_value=="string"||typeof self.tdSource=="number"){
                    dataObject.attrs={
                        title:typeof self.tdSource=="string"||typeof self.tdSource=="number"?self.tdSource:self.columnData.T_value
                    };
                }
                if(self.borderHide){
                    dataObject.style={
                        borderRightWidth:"0px"
                    }
                }
                return dataObject
            })(),
            this.TempFactory(createElement)
        )
    },
    computed:{
        tdSource:function () {
            return this.tdData
        }
    },
    methods:{
        TempFactory:function (createElement) {
            var self=this;
            var tdSource=self.tdSource=="TB_undefined"?self.columnData:self.tdSource;
            if(typeof tdSource=="string"||typeof tdSource=="number"){
                return tdSource
            }else{
                if(typeof tdSource.T_value=="string"){
                    return [(function () {
                        if(tdSource.T_type=="input"||tdSource.T_type=="textarea"){
                            return createElement(
                                tdSource.T_type,
                                self.inputVmodelFactory(tdSource,self.DataObjectFactory(tdSource.T_class,tdSource.T_style,tdSource.T_events,tdSource.T_attrs,tdSource.T_domProps))
                            )
                        }else{
                            return createElement(
                                tdSource.T_type,
                                self.DataObjectFactory(tdSource.T_class,tdSource.T_style,tdSource.T_events,tdSource.T_attrs,tdSource.T_domProps),
                                tdSource.T_value
                            )
                        }
                    })()]
                }else if(Object.prototype.toString.call(tdSource.T_value) === '[object Array]'&&Object.prototype.toString.call(tdSource.T_value[0]) !== '[object object]'){
                    return Array.apply(null,{length:tdSource.T_value.length}).map(function (value, index) {
                        var elementType=Object.prototype.toString.call(tdSource.T_type) === '[object Array]'?(tdSource.T_type[index] || tdSource.T_type.slice(-1)[0]):tdSource.T_type;
                        if(elementType=="input"||elementType=="textarea"){
                            return createElement(
                                elementType,
                                self.inputVmodelFactory(tdSource,self.DataObjectFactory(tdSource.T_class,tdSource.T_style,tdSource.T_events,tdSource.T_attrs,tdSource.T_domProps,index),index)
                            )
                        }else if (elementType=="select"){
                            return self.selectFactory(createElement,tdSource,self.DataObjectFactory(tdSource.T_class,tdSource.T_style,tdSource.T_events,tdSource.T_attrs,tdSource.T_domProps,index),index);
                        }else{
                            return createElement(
                                elementType,
                                self.DataObjectFactory(tdSource.T_class,tdSource.T_style,tdSource.T_events,tdSource.T_attrs,tdSource.T_domProps,index),
                                tdSource.T_value[index]
                            )
                        }
                    })
                }else{
                    return [createElement(
                        "span",
                        ""
                    )]
                }
            }
        },
        DataObjectFactory:function (ch_class,ch_style,ch_events,ch_attrs,ch_domProps,ch_index) {
            var self=this;
            var dataObject={};
            if(ch_index!==undefined){
                dataObject.class=Object.prototype.toString.call(ch_class) === '[object Array]'?ch_class[ch_index]:ch_class;
                dataObject.style=Object.prototype.toString.call(ch_style) === '[object Array]'?ch_style[ch_index]:ch_style;
                dataObject.attrs=Object.prototype.toString.call(ch_attrs) === '[object Array]'?ch_attrs[ch_index]:ch_attrs;
                dataObject.domProps=Object.prototype.toString.call(ch_domProps) === '[object Array]'?ch_domProps[ch_index]:ch_domProps;
                if(ch_events!==undefined){
                    dataObject.on=Object.prototype.toString.call(ch_events) === '[object Array]'?self.EventFactory(ch_events[ch_index]):self.EventFactory(ch_events)
                }
            }else {
                dataObject.class=ch_class;
                dataObject.style=ch_style;
                dataObject.attrs=ch_attrs;
                dataObject.domProps=ch_domProps;
                if(ch_events!==undefined){
                    dataObject.on=self.EventFactory(ch_events)
                }
            }
            return dataObject;
        },
        EventFactory:function (eventObj) {
            var self=this;
            var newEventObj={};
            for(var key in eventObj){
                newEventObj[key]=function (event) {
                    eventObj[key](event,self.tdData,self.trData,self.tbData);
                }
            }
            return newEventObj;
        },
        inputVmodelFactory:function (tdSource,dataObject,index) {
            if(index===undefined){
                if(dataObject.domProps===undefined){
                    dataObject.domProps={
                        value:tdSource.T_value
                    };
                }else{
                    dataObject.domProps.value=tdSource.T_value;
                }
                if(dataObject.on===undefined){
                    dataObject.on={
                        input:function (event) {
                            tdSource.T_value= event.target.value
                        }
                    }
                }else{
                    dataObject.on.input=function (event) {
                        tdSource.T_value = event.target.value
                    }
                }
            }else{
                if(dataObject.domProps===undefined){
                    dataObject.domProps={
                        value:tdSource.T_value[index]
                    };
                }else{
                    dataObject.domProps.value=tdSource.T_value[index];
                }
                if(dataObject.on===undefined){
                    dataObject.on={
                        input:function (event) {
                            tdSource.T_value[index] = event.target.value
                        }
                    }
                }else{
                    dataObject.on.input=function (event) {
                        tdSource.T_value[index] = event.target.value
                    }
                }
            }
            return dataObject;
        },
        selectFactory:function (createElement,tdSource,dataObject,valueIndex) {
            return createElement(
                "select",
                dataObject,
                (function () {
                    return Array.apply(null,{length:tdSource.T_value[valueIndex].length}).map(function (value, index) {
                        return createElement(
                            "option",
                            {
                                domProps:{
                                    value:tdSource.T_value[valueIndex][index].value,
                                    text:tdSource.T_value[valueIndex][index].text,
                                    selected:tdSource.T_value[valueIndex][index].selected
                                }
                            }
                        )
                    })
                })()
            )
        }
    }
};
//td组件结束

//分页组件开始
var PagingComponent = {
    props:{
        curPage:{
            type:Number,
            default:1
        },
        totalPage:{
            type:Number,
            default:1
        }
    },
    template:'<div class="table-paginationContainer">' +
    '<div style="float: right;margin-right: 20px">' +
    '<span>跳转到</span>' +
    '<input class="table-skipPage" @keyup.enter="skip($event)"/>/' +
    '<span style="margin-left: 5px">{{totalPage}}页</span>' +
    '<a href="javascript:void(0)" class="table-skipButton" @click="skip($event)">确定</a>' +
    '</div>' +
    '<div style="float: right;margin-right: 20px">' +
    '<a href="javascript:void(0)" class="table-skipButton" @click="onNextClick">下一页</a>' +
    '<div class="table-selectContainer">' +
    '<select v-model="curPage" class="table-selectStyle" style="height:24px">'+
    '<option v-for="pageItem in totalPage" :value="pageItem" v-text="pageItem"></option>'+
    '</select>'+
    '</div>'+
    '<a href="javascript:void(0)" class="table-skipButton" @click="onPrevClick">上一页</a>' +
    '</div>' +
    '</div>',
    methods:{
        skip:function (event) {
            var page=event.currentTarget.parentNode.getElementsByTagName("input")[0].value.replace(/^(\s|\xA0)+|(\s|\xA0)+$/g, '');
            if(/^\d+$/.test(page)){
                var pageNumber=parseInt(page);
                if(pageNumber<1){
                    alert("页数不能小于1");
                }else if(pageNumber>this.totalPage){
                    alert("页数不能超过"+this.totalPage);
                }else{
                    this.$emit("curpageChange",pageNumber);
                }
            }
        },
        onPrevClick:function () {
            if(this.curPage>1) {
                this.$emit("curpageChange",this.curPage - 1);
            }
        },
        onNextClick:function () {
            if(this.curPage < this.totalPage) {
                this.$emit("curpageChange",this.curPage + 1);
            }
        }
    },
    watch:{
        "curPage":function (newVal) {
            this.$emit("curpageChange",newVal);
        }
    }
};
//分页组件结束

//hover显示组件开始
var HoverShow = {
    props:{
        hoverConfig:{
            type:Object,
            default:function () {
                return {}
            }
        },
        trData:{
            type:Object,
            default:function () {
                return {}
            }
        },
        tbData:{
            type:Array,
            default:function () {
                return []
            }
        }
    },
    render:function (creatElement) {
        var self=this;
        var vNodes="";
        if(this.hoverConfig!=={}){
            // if((this.hoverConfig.T_nodeNumber&&typeof this.hoverConfig.T_nodeNumber=='number') || (this.hoverConfig.)){
                var nodeLength = 0;
                if(this.hoverConfig.T_nodeNumber&&typeof this.hoverConfig.T_nodeNumber=='number'){
                    nodeLength = this.hoverConfig.T_nodeNumber;
                }else if(self.hoverConfig.hasOwnProperty('T_value')){
                    if(Object.prototype.toString.call(self.hoverConfig.T_value) === '[object Array]'){
                        nodeLength = self.hoverConfig.T_value.length
                    }else{
                        nodeLength = 1
                    }
                }
                vNodes=Array.apply(null,{length:nodeLength}).map(function (value,index) {
                    var nodeText = "";
                    if(self.hoverConfig.hasOwnProperty('T_value')){
                        if(Object.prototype.toString.call(self.hoverConfig.T_value) === '[object Array]'){
                            nodeText = self.hoverConfig.T_value.length > index ? self.hoverConfig.T_value[index] : self.hoverConfig.T_value.slice(-1)[0]
                        }else if(self.hoverConfig.T_value !== null && self.hoverConfig.T_value !== undefined){
                            nodeText = self.hoverConfig.T_value
                        }
                    }
                    return creatElement(
                        Object.prototype.toString.call(self.hoverConfig.T_type) === '[object Array]'?(self.hoverConfig.T_type[index] || self.hoverConfig.T_type.slice(-1)[0]):self.hoverConfig.T_type,
                        {
                            'class':Object.prototype.toString.call(self.hoverConfig.T_class) === '[object Array]'?self.hoverConfig.T_class[index]:(self.hoverConfig.T_class||{}),
                            style:Object.prototype.toString.call(self.hoverConfig.T_style) === '[object Array]'?self.hoverConfig.T_style[index]:(self.hoverConfig.T_style||{}),
                            attrs:Object.prototype.toString.call(self.hoverConfig.T_attrs) === '[object Array]'?self.hoverConfig.T_attrs[index]:(self.hoverConfig.T_attrs||{}),
                            domProps:Object.prototype.toString.call(self.hoverConfig.T_domProps) === '[object Array]'?self.hoverConfig.T_domProps[index]:(self.hoverConfig.T_domProps||{}),
                            on:Object.prototype.toString.call(self.hoverConfig.T_events) === '[object Array]'?self.EventFactory(self.hoverConfig.T_events[index]):(self.hoverConfig.T_events?self.EventFactory(self.hoverConfig.T_events):{})
                        },
                        nodeText
                    )
                })
            // }
        }
        return creatElement(
            'div',
            {
                style: {
                    width: '100%',
                    height:'100%'
                }
            },
            vNodes
        )
    },
    methods:{
        EventFactory:function (eventObj) {
            var self=this;
            var newEventObj={};
            for(var key in eventObj){
                newEventObj[key]=function (event) {
                    eventObj[key](event,self.trData,self.tbData);
                }
            }
            return newEventObj;
        }
    }
};
//hover显示组件结束

//表格组件开始
var TableWll = {
    props:{
        tableData:{
            type:Array,
            default:function(){
                return []
            }
        },
        showWaitingicon:{
            type:Boolean,
            default:false
        },
        recordTotal:{
            type:Number,
            default:0
        },
        getData:{
        },
        tableConfig:{
            type:Object,
            default:function () {
                return {}
            }
        }
    },
    data:function () {
        return{
            tableHeaders:[],
            allSelectChecked:false,
            curPage:1,
            tTD:{},
            tWidth:0,
            ordering:{
                dataIndex:"",
                orderType:0
            },
            pageable:false,
            showCheckbox:false,
            checkboxWidth:'50px',
            size:10,
            widthControllable:false,
            theadClass:"",
            theadStyle:{},
            hovereventOpen:false,
            hovereventConfig:{},
            hovereventOpenWidth:'120px',
            hoverIndex:-1,
            trClickEvent:function () {

            },
            lazyload:true,
            lazyTableList:[],
            lazySize:40,
            lazyIndex:1,
            scrollWidth:'0px'
        }
    },
    computed:{
        tableList:function () {
            this.allSelectChecked = false;
            if(this.lazyload){
              if(this.lazyTableList.length < 1 && this.lazyIndex == 1){
                return this.tableData.slice(0,this.lazySize);
              }else{
                return this.lazyTableList;
              }
            }
            return this.tableData
        },
        totalPage:function () {
            return Math.ceil(this.recordTotal/this.size);
        }
    },
    template:'<div class="table-containerAll">' +
    '<div v-bind:class="[pageable?\'table-container--paged\':\'table-container--nonpaged\']">' +
    '<div class="table-header-container">' +
    '<table class="table-class">' +
    '<col :width="checkboxWidth" v-show="showCheckbox"/>' +
    '<col v-for="(headerItem,index) in tableHeaders" :width="headerItem.width"/>' +
    '<col :width="hovereventOpenWidth" v-show="hovereventOpen"/>' +
    '<col :width="scrollWidth"/>' +
    '<tr :class="[theadClass||\'table-headTr\']" :style="theadStyle">' +
    '<th v-show="showCheckbox" :style="{width: checkboxWidth}"><input type="checkbox" @click="selectAllClick($event)" v-model="allSelectChecked"></th>'+
    '<th v-for="(headerItem,index) in tableHeaders" :style="thStyleFactory(headerItem.width,(index===tableHeaders.length-1))" @click="headerItem.sortable===true?sortData(headerItem.dataIndex,$event):\'\'" @mousedown="mouseDownEvent($event,index)" @mouseup="mouseUpEvent($event)" @mousemove="mouseMoveEvent($event,index)">{{headerItem.header}}' +
    '<span class="table-sortSign" :style="{visibility: headerItem.sortable===true?\'visible\':\'hidden\'}"></span>' +
    '</th>' +
    '<th v-show="hovereventOpen" class="table-hoverShow-th" :style="{width: hovereventOpenWidth}"></th>' +
    '<th :style="{width:scrollWidth}" class="table-scrollTh"></th>' +
    '</tr>' +
    '</table>'+
    '</div>'+
    '<div class="table-body-container" @scroll="lazyloadFn">' +
    '<table class="table-class">' +
    '<col :width="checkboxWidth" v-show="showCheckbox"/>' +
    '<col v-for="(headerItem,index) in tableHeaders" :width="headerItem.width"/>' +
    '<col :width="hovereventOpenWidth" v-show="hovereventOpen"/>' +
    '<template v-if="!showWaitingicon">' +
    '<tr v-for="(dataItem,index) in tableList" :class="[index%2===0?\'table-bodyTr--Dark\':\'table-bodyTr--Light\',dataItem[\'tr-class\']||\'\']" :style="dataItem[\'tr-style\']||\'\'" @mouseover="td_mouseOverEvent($event,index)" @mouseout="td_mouseOutEvent($event,index)" @click="trClickEvent($event,dataItem,tableList)">' +
    '<td v-show="showCheckbox" style="width: 50px;"><input type="checkbox" v-model="dataItem.TR_checked" @click.stop="singleSelectClick(index,$event)"></td>'+
    '<td-component v-for="(headerItem,index) in tableHeaders" :column-data="headerItem" :td-data="headerItem.hasOwnProperty(\'dataIndex\')?(dataItem.hasOwnProperty(headerItem.dataIndex)?dataItem[headerItem.dataIndex]:\'TB_undefined\'):\'TB_undefined\'" :tr-data="dataItem" :tb-data="tableList" :border-hide="hovereventOpen&&(index===tableHeaders.length-1)"></td-component>' +
    '<td v-show="hovereventOpen" style="border-left-width: 0px;">' +
    '<transition name="tableFade">' +
    '<div class="table-hoverShow" v-show="index===hoverIndex">' +
    '<hover-show :hover-config="dataItem.hovereventConfig||hovereventConfig" :tr-data="dataItem" :tb-data="tableList"></hover-show>' +
    '</div>' +
    '</transition>' +
    '</td>' +
    '</tr>' +
    '</template>'+
    '<tr v-if="showWaitingicon"><td v-bind:colspan="tableHeaders.length">'+
    '正在查询数据，请等待...'+
    '</td></tr>'+
    '</table>'+
    '</div>'+
    '</div>' +
    '<paging-component v-show="pageable" :total-page="totalPage" :cur-page="curPage" @curpageChange="curPageChange"></paging-component>' +
    '</div>',
    components:{
        'td-component':TDComponent,
        'paging-component':PagingComponent,
        'hover-show':HoverShow
    },
    created:function () {
        this.configChangeFn();
        this.$on('configChange',this.configChangeFn);
        this.removeSpaces(this.tableHeaders);
    },
    updated:function (){
      var el = this.$el;
      var dom = el.querySelector('.table-body-container');
      this.scrollWidth = dom.offsetWidth - dom.clientWidth + 'px';
    },
    methods:{
        removeSpaces:function(newVal){                                                              //去除字符串前后空格
            for(var i in newVal){
                if(typeof newVal[i]=='string'){
                    newVal[i]=newVal[i].replace(/^(\s|\xA0)+|(\s|\xA0)+$/g, '');
                }else if(typeof newVal[i]=='object'){
                    this.removeSpaces(newVal[i]);
                }
            }
            return newVal;
        },
        singleSelectClick:function(index,event){
            var checked=event.target.checked;
            var mark=1;
            this.tableList[index].TR_checked=checked;
            for(var i in this.tableList){
                if(this.tableList[i].TR_checked===false||this.tableList[i].TR_checked===undefined){
                    mark=0;
                    break;
                }
            }
            if(mark==1){
                this.allSelectChecked=true;
            }else{
                this.allSelectChecked=false;
            }
        },
        selectAllClick:function(event){
            var checked = event.target.checked;
            for(var i in this.tableList){
                this.tableList[i].TR_checked=checked;
            }
        },
        getSelectedData:function(){                                                                //获取复选框选中的数据
            if(this.allSelectChecked){
              return this.tableData;
            }
            var SelectedData=[];
            for(var i in this.tableList){
                if(this.tableList[i].TR_checked){
                    SelectedData.push(this.tableList[i]);
                }
            }
            return SelectedData;
        },
        getTableData:function(){
            return this.tableList;
        },
        getCurrentPage:function () {
            return this.curPage
        },
        refreshTableData:function () {
            if(this.curPage===1){
                this.getData(1,this.size,this.ordering.dataIndex,this.ordering.orderType);
            }else {
                this.curPage=1;
            }
        },
        curPageChange:function (curPage) {
            this.curPage=curPage;
        },
        mouseDownEvent:function(e,index){
            if(e.target.style.cursor=='col-resize'&& e.target.nodeName=="TH"){
                this.tTD=e.target;
                this.tTD.mouseDown=true;
                this.tWidth=Number(getComputedStyle(e.target,false).width.replace("px",""))+Number(getComputedStyle(e.target.nextSibling,false).width.replace("px",""));
            }
        },
        mouseMoveEvent:function(e,index){
            if(index!=this.tableHeaders.length-1&& e.target.nodeName=="TH"&&this.widthControllable) {
                if (event.offsetX > e.target.offsetWidth - 10)
                    e.target.style.cursor = 'col-resize';
                else
                    e.target.style.cursor = 'default';
            }
            if(this.tTD.mouseDown!=null&&this.tTD.mouseDown==true){
                if(e.target===this.tTD){
                    if(event.offsetX>=30){
                        this.tTD.style.width=event.offsetX+"px";
                        this.tTD.nextSibling.style.width=(this.tWidth-event.offsetX)+"px";
                    }
                }else if(e.target.previousSibling===this.tTD){
                    if(Number(getComputedStyle(e.target.previousSibling,false).width.replace("px",""))+30<this.tWidth){
                        this.tTD.style.width=(event.offsetX+Number(getComputedStyle(e.target.previousSibling,false).width.replace("px","")))+"px";
                        this.tTD.nextSibling.style.width=(Number(getComputedStyle(e.target,false).width.replace("px",""))-event.offsetX)+"px";
                    }
                }
            }
        },
        mouseUpEvent:function(e){
            if (this.tTD == undefined)
                this.tTD = e.target;
            this.tTD.mouseDown=false;
            if(this.tTD.style){
                this.tTD.style.cursor = 'default';
            }
            this.tTD={};
            this.tWidth=0;
        },
        sortData:function(dataIndex,e){
            if(e.target.style.cursor!='col-resize'&&e.target.nodeName==="SPAN"){
                if(this.ordering.dataIndex!=dataIndex){
                    this.ordering.orderType=0;
                }else if(this.ordering.orderType==0){
                    this.ordering.orderType=1;
                }else{
                    this.ordering.orderType=0;
                }
                this.ordering.dataIndex=dataIndex;
                // if(e.target.lastChild){
                //     var ths=e.target.parentNode.childNodes;
                //     for(var i=0;i<ths.length;i++){
                //         if(ths.item(i).nodeName=="TH"){
                //             ths.item(i).lastChild.style.visibility="hidden";
                //         }
                //     }
                //     if(this.ordering.orderType==0){
                //         e.target.lastChild.style["background-position"]="5px -112px";
                //     }else{
                //         e.target.lastChild.style["background-position"]="5px -92px";
                //     }
                //     e.target.lastChild.style.visibility="visible";
                // }else if(e.target.nodeName=="SPAN"){
                if(this.ordering.orderType==0){
                    e.target.style["background-position"]="5px -112px";
                }else{
                    e.target.style["background-position"]="5px -92px";
                }
                // }
                this.getData(this.curPage,this.size,this.ordering.dataIndex,this.ordering.orderType);
            }
        },
        td_mouseOverEvent:function (e , index) {
            this.hoverIndex=index;
        },
        td_mouseOutEvent:function (e , index) {
            this.hoverIndex=-1
        },
        thStyleFactory:function (width,borderHide) {
            if(borderHide){
                return {
                    width:width,
                    borderRightWidth:"0px"
                }
            }else {
                return {
                    width:width
                }
            }
        },
        configChangeFn:function () {
            if(this.tableConfig!={}){
                var configArr=["tableHeaders","pageable","showCheckbox","size","widthControllable","theadClass","theadStyle","hovereventOpen","hovereventConfig","trClickEvent","lazyload","lazySize","checkboxWidth","hovereventOpenWidth"];
                for(var i=0;i<configArr.length;i++){
                    if(configArr[i] in this.tableConfig){
                        this[configArr[i]]=this.tableConfig[configArr[i]];
                    }
                }
            }
        },
        lazyloadFn:function (e) {
          if(this.lazyload){
            var dom = e.target;
            if(dom.scrollTop + dom.clientHeight > dom.scrollHeight - 10){
              var self = this;
              var index = self.lazyIndex;
              var size = self.lazySize;
              var addList = self.tableData.slice(index*size,(index+1)*size);
              addList.forEach(function (val) {
                self.lazyTableList.push(val);
              });
              if(addList.length > 0){
                self.lazyIndex = index + 1;
              }
            }
          }
        }
    },
    watch:{
        "curPage":function (newVal) {
            this.getData(newVal,this.size,this.ordering.dataIndex,this.ordering.orderType);
        },
        "tableData":function (newVal) {
          if(this.lazyload){
            this.lazyIndex = 1;
            this.lazyTableList = newVal.slice(0,this.lazySize);
          }
        }
    }
}
//表格组件结束

var TableWllInstall = function(Vue, options){
    Vue.component('table-component',TableWll)
}

//页面引用
if (typeof window !== 'undefined' && window.Vue) {
    TableWllInstall(window.Vue)
};

//模块导出
if("object" == typeof exports && "object" == typeof module && "object" == typeof module.exports){
    module.exports = {
        install: TableWllInstall
    }
}




