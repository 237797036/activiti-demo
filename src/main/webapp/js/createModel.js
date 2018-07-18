/**
 * 创建模型
 */
function createModel(){
	// call 'submit' method of form plugin to submit the form    
	$('#modelForm').form('submit', {
		url: projectName+"/workflow/model/create",
	    onSubmit: function(){
	        // do some check    
	        // return false to prevent submit;
			var isValid = $(this).form('validate');
			if (!isValid){
				//$.messager.progress('close');	// 如果表单是无效的则隐藏进度条
			}
			return isValid;	// 返回false终止表单提交
	    },    
	    success:function(obj){
	       var obj = eval('(' + obj + ')');  // change the JSON string to javascript object
	       if(obj.code == "0000"){
	    	   var modeler = projectName+"/modeler.html?modelId=" +obj.data.modelId;
	    	   window.open (modeler,"_blank");
	    	   parent.window.$('#modelListDg').datagrid('reload');
	    	   closeWin();
	      }else{
	    	  alert(obj.message);
	      }
	    }
	}); 
}

function closeWin(){
	parent.window.$(".panel-tool-close").click();
}
