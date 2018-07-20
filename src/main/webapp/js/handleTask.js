$(function(){
	
	$('input[type="checkbox"]').each(function(index,element){
		$(element).click(function(){
			element.value = element.checked;
		});
	});

	// 任务ID
	var taskId = window.parent.document.getElementById("taskId").value;
	
	// 清空对话框内容
	$('#formDivId').html("<form class='dynamic-form' method='post'></form>");
	var $form = $('.dynamic-form');

	// 设置表单提交id
	$form.attr('action',projectName+'/form/dynamic/task/complete/' + taskId);

    // 添加隐藏域
    if ($('#processType').length == 0) {
        $('<input/>', {
            'id': 'processType',
            'name': 'processType',
            'type': 'hidden'
        }).val(processType).appendTo($form);
    }
	
    // 读取办理时的表单
    $.ajax({
        type: "GET",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: projectName+"/form/dynamic/get-form/task/" + taskId,
        success: function (data) {
            $.each(data.taskFormData.formProperties, function(idx, obj) {
            	var required = this.required === true? "required='required'" : "";
            	$("<div class='fitem'></div>").appendTo($form);
            	if(!this.readable){
            		$(".fitem:last").attr("style","display:none;");
            	}
            	$(".fitem:last").append("<label>"+this.name+":</label>");
            	
    			if("string" == this.type.name) {
    				var result;
    				if(this.writable === true) {
    					result = "<input id='" + this.id + "' name='fp_" + this.id + "' value='" + this.value + "' class='easyui-validatebox' "+required+" />";
    				} else {
    					result = "<label>"+this.value+"</label>";
    				}
    				$(".fitem:last").append(result);
    				
    			}else if("long" == this.type.name) {
    				var result;
    				if(this.writable === true) {
    					result = "<input id='" + this.id + "' name='fp_" + this.id + "' value='" + this.value + "' class='easyui-numberspinner' data-options='increment:1' "+required+" />";
    				} else {
    					result = "<label>"+this.value+"</label>";
    				}
    				$(".fitem:last").append(result);
    				
    			}else if("boolean" == this.type.name) {
    				var result;
    				if(this.writable === true) {
    					result = "<input type='checkbox' id='" + this.id + "' name='fp_" + this.id + "' value='" + this.value + "' class='easyui-checkbox' "+required+" />";
    				} else {
    					result = "<label>"+this.value+"</label>";
    				}
    				$(".fitem:last").append(result);
    				
    			}else if("date" == this.type.name) {
    				var result;
    				if(this.writable === true) {
    					result = "<input id='" + this.id + "' name='fp_" + this.id + "' value='" + this.value + "' class='easyui-datebox' "+required+" />";
    				} else {
    					result = "<label>"+this.value+"</label>";
    				}
    				$(".fitem:last").append(result);
    				
    			}else if("enum" == this.type.name) {
    				var result;
    				if(this.writable === true) {
    					result = "<select id='" + this.id + "' name='fp_" + this.id + "' class='easyui-combobox' style='width:100px;' panelHeight='auto' "+required+">";
    					result += "<option value=''></option>";
    					$.each(data[this.id], function(k, v) {
    						result += "<option value='" + k + "'>" + v + "</option>";
    					});
    					result += "</select>";
    				} else {
    					result = "<label>"+this.value+"</label>";
    				}
    				$(".fitem:last").append(result);
    				
    			}else if("users" == this.type.name) {
    				var result;
    				if(this.writable === true) {
    					result = "<input id='" + this.id + "' name='fp_" + this.id + "' value='" + this.value + "' class='easyui-validatebox' "+required+" />";
    				} else {
    					result = "<label>"+this.value+"</label>";
    				}
    				$(".fitem:last").append(result);
    				
    			}else{
    			}
        	});
            
            $.parser.parse("#formDivId")//重新渲染，参数为要渲染的容器
        },
        error : function() {
            alert("异常！");
        }
    });
});


/**
 * 发送任务办理请求
 */
function handleTask(){
	// call 'submit' method of form plugin to submit the form    
	$('.dynamic-form').form('submit', {
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
	    	   parent.window.$("#dynamicFormTaskDg").datagrid('reload');
		       parent.window.$("#message").text(obj.data.message).css('display','block');
		       setTimeout(function() {
		    	   parent.window.$("#message").hide('slow');
		       }, 5000);
		       closeWin();
	      }else if(obj.code == "0401"){
	    	  alert(obj.message);
	    	  top.location.href="login.html";
	    	  closeWin();
	      }else{
	    	  alert("服务器异常！");
	      }
	    }
	}); 
}

function closeWin(){
	parent.window.$(".panel-tool-close").click();
}
