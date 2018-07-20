$(function () {
	//$('#dlg').dialog('close');
	$('#dg').datagrid({
		  height: 340,
		  url: projectName+'/form/dynamic/process-list?timestamp='+new Date().getTime(),
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
		    {field:'id', title: 'processDefinitionId', width: 100, align: 'left' },
		    {field:'deploymentId', title: 'deploymentId', width: 100, align: 'left' },
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
		    {field:'opt',title:'操作',width:100,align:'center',
	            formatter:function(val,row,index){
	                var btn = "<a class='qdcls' onclick='openStartupProcessDialog("+index+")'>启动</a>";  
	                return btn;
	            }
	        }
		  ]],
		  onBeforeLoad: function (param) {
		  },
		  onLoadSuccess: function (data) {
			  $('.qdcls').linkbutton({text:'发起流程',plain:true,iconCls:'icon-qd'});
		  },
		  onLoadError: function () {
		     
		  },
		  onClickRow: function (rowIndex, field, value) {
			  $(this).datagrid('unselectRow', rowIndex);
		  },
		  onClickCell: function (rowIndex, field, value) {
		  }
		});
	//$('#dg').datagrid('reload');
});

function openStartupProcessDialog(index){
	$('#dg').datagrid('selectRow',index);
	var row = $('#dg').datagrid('getSelected');
	$("#processDefinitionId").val(row.id);
	$("#dynamic-form-process-dialog").dialog({
	    title:'启动流程[' + row.name + ']',
	    width: 450,
	    height: 300,
	    resizable:true,
	    closed: true,
	    modal:true,
	    //href:'faqilc.html',
	    content:"<iframe scrolling='auto' frameborder='0' src='"+projectName+"/faqilc.html' style='width:100%; height:99%; display:block;'></iframe>",
	    /*buttons:[{
			text:'保存',
			handler:function(){}
		},{
			text:'关闭',
			handler:function(){}
		}]*/
	});
	$("#dynamic-form-process-dialog").dialog("open");
	$('#dynamic-form-process-dialog').window('center');
}
