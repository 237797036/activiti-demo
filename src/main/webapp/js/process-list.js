$(document).ready(function (){
	//$('#dlg').dialog('close');
	$('#processListDg').datagrid({
		  height: 340,
		  url: projectName+"/workflow/process-list?timestamp="+new Date().getTime(),
		  method: 'GET',
		  //queryParams: { 'id': id },
		  //idField: 'id',
		  loadMsg: "正在努力为您加载数据", //加载数据时向用户展示的语句
		  striped: true,
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
		    {field:'id', title: '流程定义Id', width: 120, align: 'left' },
		    {field:'deploymentId', title: '部署Id', width: 100, align: 'left' },
		    {field:'name', title: '名称', width: 180, align: 'left' },
		    {field:'key', title: 'KEY', width: 100, align: 'left' },
		    {field:'version', title: '版本号', width: 50, align: 'left' },
		    {field:'resourceName', title: 'XML', width: 180, align: 'left',
	            formatter:function(val,row,index){
	            	return "<a target='_blank' href='"+projectName+"/workflow/resource/read?processDefinitionId="+row.id+"&resourceType=xml'>"+row.resourceName+"</a>";  
	            }
		    },
		    {field:'diagramResourceName', title: '图片', width: 180, align: 'left',
	            formatter:function(val,row,index){
	            	return "<a target='_blank' href='"+projectName+"/workflow/resource/read?processDefinitionId="+row.id+"&resourceType=image'>"+row.diagramResourceName+"</a>";  
	            }
		    },
		    {field:'deploymentTime', title: '部署时间', width: 120, align: 'left',
	            formatter:function(val,row,index){
	            	return row.deploymentEntity.deploymentTime;  
	            }
		    },
		    {field:'suspended', title: '是否挂起', width: 80, align: 'left',
	            formatter:function(val,row,index){
	                if (row.suspended){
	                    return row.suspended + "&nbsp;|&nbsp;" +"<a href='javascript:void(0)' onclick='activeProcess(\""+row.id+"\")'>激活</a>";
	                } else {
	                	return row.suspended + "&nbsp;|&nbsp;" +"<a href='javascript:void(0)' onclick='suspendProcess(\""+row.id+"\")'>挂起</a>";  
	                }
	            }
		    },
		    {field:'opt',title:'操作',width:125,align:'left',
	            formatter:function(val,row,index){
	                var btn = "<a href='javascript:void(0)' onclick='deleteDeployment(\""+row.deploymentId+"\")'>删除</a>&nbsp;" +
	                		  "<a href='javascript:void(0)' onclick='convert2model(\""+row.id+"\")'>转换为Model</a>";
	                return btn;
	            }
	        }
		  ]],
		  onBeforeLoad: function (param) {
		  },
		  onLoadSuccess: function (data) {
			  //$('.qdcls').linkbutton({text:'发起流程',plain:true,iconCls:'icon-qd'});
		  },
		  onLoadError: function () {
		     
		  },
		  onClickCell: function (rowIndex, field, value) {
		  }
		});
});

function deployBtn(){
	$('#deployFieldset').toggle('fast');
}

/**
 * 激活流程
 * @param processDefinitionId
 */
function activeProcess(processDefinitionId){
	//Ajax调用处理
    $.ajax({
       type: "GET",
       url: projectName+"/workflow/processdefinition/update/active/" + processDefinitionId,
       success: function(obj){
    	   var obj = eval('(' + obj + ')');  // change the JSON string to javascript object
	       if(obj.code == "0000"){
	    	   $('#processListDg').datagrid('reload');
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
 * 挂起流程
 * @param processDefinitionId
 */
function suspendProcess(processDefinitionId){
	//Ajax调用处理
    $.ajax({
       type: "GET",
       url: projectName+"/workflow/processdefinition/update/suspend/" + processDefinitionId,
       success: function(obj){
    	   var obj = eval('(' + obj + ')');  // change the JSON string to javascript object
	       if(obj.code == "0000"){
	    	   $('#processListDg').datagrid('reload');
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
 * 部署流程
 */
function deploy(){
	// call 'submit' method of form plugin to submit the form    
	$('#deploy-form').form('submit', {
		url: projectName+"/workflow/deploy",
	    onSubmit: function(){
	    },    
	    success:function(obj){
	       var obj = eval('(' + obj + ')');  // change the JSON string to javascript object
	       if(obj.code == "0000"){
	    	   $('#processListDg').datagrid('reload');
		       $("#message").text(obj.data.message).css('display','block');
		       setTimeout(function() {
		    	   $("#message").hide('slow');
		       }, 5000);
	      }else{
	    	  alert(obj.message);
	      }
	    }
	}); 
}

/**
 * 删除部署
 * @param deploymentId
 */
function deleteDeployment(deploymentId){
	//Ajax调用处理
    $.ajax({
       type: "GET",
       url: projectName+"/workflow/process/delete?deploymentId=" + deploymentId,
       success: function(obj){
    	   var obj = eval('(' + obj + ')');  // change the JSON string to javascript object
	       if(obj.code == "0000"){
	    	   $('#processListDg').datagrid('reload');
		       $("#message").text(obj.message).css('display','block');
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
 * 转换为Model
 * @param processDefinitionId
 */
function convert2model(processDefinitionId){
	//Ajax调用处理
    $.ajax({
       type: "GET",
       url: projectName+"/workflow/process/convert-to-model/" + processDefinitionId,
       success: function(obj){
    	   var obj = eval('(' + obj + ')');  // change the JSON string to javascript object
	       if(obj.code == "0000"){
	    	   window.location.href=projectName+"/model-list.html"; 
	      }else{
	    	  alert("服务器异常！");
	      }
       }
    });
}
