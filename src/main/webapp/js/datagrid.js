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
		    { field: 'ck', checkbox: true },
		    { field: 'id', title: 'ID', width: 100, align: 'left' },
		    { field: 'deploymentId', title: 'DID', width: 100, align: 'left' },
		    { field: 'name', title: '名称', width: 180, align: 'left' },
		    { field: 'key', title: 'KEY', width: 100, align: 'left' },
		    { field: 'version', title: '版本号', width: 50, align: 'right' },
		    { field: 'resourceName', title: 'XML', width: 150, align: 'right' },
		    { field: 'diagramResourceName', title: '图片', width: 150, align: 'right' },
		    { field: 'opt',title:'操作',width:100,align:'center',  
	            formatter:function(val,row,index){  
	                var btn = "<a class='editcls' onclick='openStartupProcessDialog("+index+")' href='javascript:void(0)>'启动</a>";  
	                return btn;  
	            }  
	        }
		  ]],
		  onBeforeLoad: function (param) {
		  },
		  onLoadSuccess: function (data) {
		     //$('#dg').datagrid('reload');
			  $('.editcls').linkbutton({text:'编辑',plain:true,iconCls:'icon-edit'});
		  },
		  onLoadError: function () {
		     
		  },
		  onClickCell: function (rowIndex, field, value) {
		  }
		});
});

function formatOper(){ 
	  return '<a href="#" onclick="openStartupProcessDialog('+index+')">启动</a>'; 
}

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