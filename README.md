# zj-jun
#开发阶段

#easyui 动态表单
https://blog.csdn.net/xiaozaq/article/category/6486879

data-options='sharedCalendar:'#div"+this.id+"''

Easyui dialog中嵌入iframe
https://www.cnblogs.com/xiaoliangge/p/6255185.html

https://www.cnblogs.com/y20091212/archive/2013/04/06/3003106.html

function getRootPath_web() {
            //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
            var curWwwPath = window.document.location.href;
            //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
            var pathName = window.document.location.pathname;
            var pos = curWwwPath.indexOf(pathName);
            //获取主机地址，如： http://localhost:8083
            var localhostPaht = curWwwPath.substring(0, pos);
            //获取带"/"的项目名，如：/uimcardprj
            var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
            return (localhostPaht + projectName);
        }

 	                if (row.suspended){
	                    return row.suspended + " | " +"<a href='workflow/processdefinition/update/active/"+row.id+"' onclick='activeProcess("+row.id+")'>激活</a>";
	                } else {
	                	return row.suspended + " | " +"<a href='workflow/processdefinition/update/suspend/"+row.id+"' onclick='suspendProcess("+row.id+")'>挂起</a>";  
	                }       
        