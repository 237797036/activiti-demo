$(function () {
	$('#dlg').dialog('close');
	$('#dg').datagrid({
		  height: 340,
		  url: 'form/dynamic/process-list',
		  method: 'GET',
		  //queryParams: { 'id': id },
		  idField: 'id',
		  striped: true,
		  fitColumns: true,
		  singleSelect: false,
		  rownumbers: true,
		  pagination: true,
		  nowrap: false,
		  pageSize: 10,
		  pageList: [10, 20, 50, 100, 150, 200],
		  showFooter: true,
		  columns: [[
		    /*{ field: 'ck', checkbox: true },*/
		    { field: 'id', title: 'processDefinitionId', width: 100, align: 'left' },
		    { field: 'deploymentId', title: 'deploymentId', width: 100, align: 'left' },
		    { field: 'name', title: '名称', width: 180, align: 'left' },
		    { field: 'key', title: 'KEY', width: 100, align: 'left' },
		    { field: 'version', title: '版本号', width: 50, align: 'left' },
		    { field: 'resourceName', title: 'XML', width: 180, align: 'left',
	            formatter:function(val,row,index){
	            	return "<a target='_blank' href='workflow/resource/read?processDefinitionId="+row.id+"&resourceType=xml'>"+row.resourceName+"</a>";  
	            }
		    },
		    { field: 'diagramResourceName', title: '图片', width: 180, align: 'left',
	            formatter:function(val,row,index){
	            	return "<a target='_blank' href='workflow/resource/read?processDefinitionId="+row.id+"&resourceType=image'>"+row.diagramResourceName+"</a>";  
	            }
		    },
		    { field: 'opt',title:'操作',width:100,align:'center',
	            formatter:function(val,row,index){
	                var btn = "<a class='qdcls' onclick='openStartupProcessDialog("+index+")'>启动</a>";  
	                return btn;
	            }
	        }
		  ]],
		  onBeforeLoad: function (param) {
		  },
		  onLoadSuccess: function (data) {
		     //$('#dg').datagrid('reload');
			  $('.qdcls').linkbutton({text:'发起流程',plain:true,iconCls:'icon-qd'});
		  },
		  onLoadError: function () {
		     
		  },
		  onClickCell: function (rowIndex, field, value) {
		  }
		});
});

/*function formatOper(){ 
	  return '<a href="#" onclick="openStartupProcessDialog('+index+')">启动</a>'; 
}*/

function openStartupProcessDialog(index){
	  /*$('#dg').datagrid('selectRow',index);// 关键在这里 
	  var row = $('#dg').datagrid('getSelected'); 
	  if (row){ 
	    $('#dlg').dialog('open').dialog('setTitle','修改学生信息'); 
	    $('#fm').form('load',row); 
	    url = '${ctx}updateStudent.do?id='+row.id; 
	  } */
	$('#dlg').dialog('open').dialog('setTitle','启动流程[动态表单]'); 
}