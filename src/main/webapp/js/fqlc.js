$(function(){
	
	$('input[type="checkbox"]').each(function(index,element){
		$(element).click(function(){
			element.value = element.checked;
		});
	});
	
	var processDefinitionId = window.parent.document.getElementById("processDefinitionId").value;
	
	/*var a = $(window.parent.$("#processDefinitionId").val());  
	alert(a);*/
	// 清空对话框内容
	$('#formDivId').html("<form class='dynamic-form' method='post'></form>");
	var $form = $('.dynamic-form');

	// 设置表单提交id
	$form.attr('action','form/dynamic/start-process/' + processDefinitionId);

    // 添加隐藏域
    if ($('#processType').length == 0) {
        $('<input/>', {
            'id': 'processType',
            'name': 'processType',
            'type': 'hidden'
        }).val(processType).appendTo($form);
    }
	
    $.ajax({
        type: "GET",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "form/dynamic/get-form/start/" + processDefinitionId,
        success: function (data) {
            //console.log(data);//打印服务端返回的数据(调试用)
            $.each(data.form.formProperties, function(idx, obj) {
            	var readable = this.readable === true? "" : "display:none;";
            	$("<div class='fitem' style=''>").appendTo($form);
            	$(".fitem").attr("style",readable);
            	var name = this.name;
            	$("<label></label>").appendTo($form);
            	$("lable").text(name+":");
            	$("</div>").appendTo($form);
        	});
            alert($("#formDivId").html());
        },
        error : function() {
            alert("异常！");
        }
    });
});

function startProc(){
	$('#fm').mySubmit({
		url : 'backstage/workflow/hi/startProc',
		success: function(res){
			closeWin();
		}
	});
}

function closeWin(){
	parent.window.$(".panel-tool-close").click()
}
