$(function () {
	$('#dg').datagrid({
		  height: 340,
		  url: projectName+'/form/dynamic/process-instance/finished/list?timestamp='+new Date().getTime(),
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
		    {field:'id', title: '流程ID', width: 100, align: 'left' },
		    {field:'processDefinitionId', title: '流程定义ID', width: 100, align: 'left' },
		    {field:'startTime', title: '流程启动时间', width: 180, align: 'left' },
		    {field:'endTime', title: '流程结束时间', width: 100, align: 'left' },
		    {field:'deleteReason', title: '流程结束原因', width: 50, align: 'left',
	            formatter:function(val,row,index){
	            	if((row.deleteReason == null || row.deleteReason == undefined || row.deleteReason == "")){
	                    return "正常结束";
	                }
	            } 
		    }
		  ]],
		  onBeforeLoad: function (param) {
		  },
		  onLoadSuccess: function (data) {
		  },
		  onLoadError: function () {
		     
		  },
		  onClickCell: function (rowIndex, field, value) {
		  }
		});
});
