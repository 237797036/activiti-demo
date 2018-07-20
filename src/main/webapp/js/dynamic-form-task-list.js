$(document).ready(function (){
	//$('#dlg').dialog('close');
	$('#dynamicFormTaskDg').datagrid({
		  height: 340,
		  url: projectName+"/form/dynamic/task/list?timestamp="+new Date().getTime(),
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
		    {field:'id', title: '任务ID', width: 80, align: 'left' },
		    {field:'name', title: '任务名称', width: 180, align: 'left' },
		    {field:'taskDefinitionKey', title: '任务Key', width: 180, align: 'left' },
		    {field:'processDefinitionId', title: '流程定义ID', width: 150, align: 'left' },
		    {field:'processInstanceId', title: '流程实例ID', width: 100, align: 'left' },
		    {field:'priority', title: '优先级', width: 50, align: 'left' },
		    {field:'createTime', title: '任务创建日期', width: 120, align: 'left' },
		    {field:'dueDate', title: '任务逾期日', width: 120, align: 'left' },
		    {field:'description', title: '任务描述', width: 200, align: 'left' },
		    {field:'owner', title: '任务所属人', width: 100, align: 'left' },
		    {field:'opt',title:'操作',width:50,align:'center',
	            formatter:function(val,row,index){
	            	if((row.assignee == "" || row.assignee == undefined || row.assignee == null)){
	                    return "<a href='javascript:void(0)' onclick='claimTask(\""+row.id+"\")'>签收</a>";
	                } else {
	                	return "<a class= 'handleBtn' href='javascript:void(0)' onclick='openHandleTaskDialog("+index+")'>办理</a>";  
	                }
	            }
	        }
		  ]],
		  onBeforeLoad: function (param) {
		  },
		  onLoadSuccess: function (obj) {
			  if(obj.code == "0401"){
			       $("#message").text(obj.message).css('display','block');
			       setTimeout(function() {
			    	  $("#message").hide('slow');
			       }, 5000);
			       parent.location.href=projectName+"/login.html"; 
		      }
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
 * 签收任务
 * @param taskId
 */
function claimTask(taskId){
	//Ajax调用处理
    $.ajax({
       type: "GET",
       url: projectName+"/form/dynamic/task/claim/" + taskId + "?processType=" + processType,
       success: function(obj){
    	   var obj = eval('(' + obj + ')');  // change the JSON string to javascript object
	       if(obj.code == "0000"){
	    	   $('#dynamicFormTaskDg').datagrid('reload');
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
 * 打开任务办理对话框
 * @param index
 */
function openHandleTaskDialog(index){
	$('#dynamicFormTaskDg').datagrid('selectRow',index);
	var row = $('#dynamicFormTaskDg').datagrid('getSelected');
	$("#taskId").val(row.id);
	$("#dynamic-form-task-dialog").dialog({
	    title:'办理任务[' + row.name + ']',
	    width: 450,
	    height: 300,
	    resizable:true,
	    closed: true,
	    modal:true,
	    //href:'faqilc.html',
	    content:"<iframe scrolling='auto' frameborder='0' src='"+projectName+"/handleTask.html' style='width:100%; height:99%; display:block;'></iframe>",
	    /*buttons:[{
			text:'保存',
			handler:function(){}
		},{
			text:'关闭',
			handler:function(){}
		}]*/
	});
	$("#dynamic-form-task-dialog").dialog("open");
	$('#dynamic-form-task-dialog').window('center');
}
