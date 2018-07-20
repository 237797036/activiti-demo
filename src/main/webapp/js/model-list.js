$(document).ready(function (){
	//$('#dlg').dialog('close');
	$('#modelListDg').datagrid({
		  height: 340,
		  url: projectName+"/workflow/model/list?timestamp="+new Date().getTime(),
		  method: 'GET',
		  //queryParams: { 'id': id },
		  //idField: 'id',
		  loadMsg: "正在努力为您加载数据", //加载数据时向用户展示的语句
		  striped: true,//是否显示斑马线效果
		  fitColumns: true, //设置为true将自动使列适应表格宽度以防止出现水平滚动,false则自动匹配大小
		  singleSelect: false,//是否单选
		  rownumbers: true,
		  pagination: true, //显示最下端的分页工具栏
		  //nowrap: false,
		  pageSize: 10,//读取分页条数，即向后台读取数据时传过去的值
		  pageList: [10, 20, 50, 100],//可以调整每页显示的数据，即调整pageSize每次向后台请求数据时的数据
          //sortName: "name", //初始化表格时依据的排序 字段 必须和数据库中的字段名称相同
          //sortOrder: "asc", //正序
		  showFooter: true,
		  columns: [[
		    /*{ field: 'ck', checkbox: true },*/
		    {field:'id', title: 'ID', width: 50, align: 'left' },
		    {field:'name', title: '名称', width: 100, align: 'left' },
		    {field:'key', title: 'KEY', width: 50, align: 'left' },
		    {field:'version', title: 'version', width: 50, align: 'left' },
		    {field:'createTime', title: '创建时间', width: 100, align: 'left' },
		    {field:'lastUpdateTime', title: '最后更新时间', width: 100, align: 'left' },
		    {field:'metaInfo', title: '元数据', width: 200, align: 'left' },
		    {field:'opt',title:'操作',width:140,align:'left',
	            formatter:function(val,row,index){
	                var result = "<a target='_blank' href='"+projectName+"/modeler.html?modelId="+row.id+"'>编辑</a>&nbsp;";
	                result += "<a href='javascript:void(0)' onclick='deployByModel(\""+row.id+"\")'>部署</a>&nbsp;";
	                result += "导出(<a target='_blank' href='"+projectName+"/workflow/model/export/"+row.id+"/bpmn'>BPMN</a>" +
	                			  "|&nbsp;" +
	                		      "<a target='_blank' href='"+projectName+"/workflow/model/export/"+row.id+"/json'>JSON</a>)&nbsp;";
	                result += "<a href='javascript:void(0)' onclick='delModel(\""+row.id+"\")'>删除</a>";
	                return result;
	            }
	        }
		  ]],
		  /*toolbar: [
	                { text: '增加', iconCls: 'icon-add', handler: function () {  } },
	                { text: '修改', iconCls: 'icon-edit', handler: function () {  } },
	                { text: '删除', iconCls: 'icon-remove', handler: function () {  } },
	                { text: '查看', handler: function () { } }, '-',
	                { text: '刷新', iconCls: 'icon-reload', handler: function () {  } },
	                { text: '导出', iconCls: 'icon-save', handler: function () {  } }, '-'],*/
		  onBeforeLoad: function (param) {
		  },
		  onLoadSuccess: function (data) {
			  //$('.qdcls').linkbutton({text:'发起流程',plain:true,iconCls:'icon-qd'});
		  },
		  onLoadError: function () {
		     
		  },
		  onClickRow: function (rowIndex, field, value) {
			  $(this).datagrid('unselectRow', rowIndex);
		  },
		  onClickCell: function (rowIndex, field, value) {
		  }
		});
});

/**
 * 根据model部署流程
 * @param modelId
 */
function deployByModel(modelId){
	//Ajax调用处理
    $.ajax({
       type: "GET",
       url: projectName+"/workflow/model/deploy/" + modelId,
       success: function(obj){
    	   var obj = eval('(' + obj + ')');  // change the JSON string to javascript object
	       if(obj.code == "0000"){
	    	   $('#modelListDg').datagrid('reload');
		       $("#message").text(obj.data.message).css('display','block');
		       setTimeout(function() {
		    	  $("#message").hide('slow');
		       }, 5000);
	      }else{
	    	  alert("服务器异常！");
	      }
       }
    });
}

/**
 * 删除模型
 * @param modelId
 */
function delModel(modelId){
	//Ajax调用处理
    $.ajax({
       type: "GET",
       url: projectName+"/workflow/model/delete/" + modelId,
       success: function(obj){
    	   var obj = eval('(' + obj + ')');  // change the JSON string to javascript object
	       if(obj.code == "0000"){
	    	   $('#modelListDg').datagrid('reload');
	      }else{
	    	  alert("服务器异常！");
	      }
       }
    });
}

/**
 * 创建模型
 */
function createModelBtn(){
	$('#createModelDialog').dialog({
	    title:'创建模型',
	    width: 400,
	    height: 300,
	    resizable:true,
	    closed: true,
	    modal:true,
	    //href:'faqilc.html',
	    content:"<iframe scrolling='auto' frameborder='0' src='"+projectName+"/createModel.html' style='width:100%; height:99%; display:block;'></iframe>",
	    /*buttons:[{
			text:'保存',
			handler:function(){}
		},{
			text:'关闭',
			handler:function(){}
		}]*/
	});
	$("#createModelDialog").dialog("open");
	$('#createModelDialog').window('center');
}
