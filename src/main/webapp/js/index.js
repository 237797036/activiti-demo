$(function () {
    //动态树形菜单数据
    var treeData = [{
    	  text : "activiti演示",
          children : [/*{
                  text : "普通表单",
                  children : [{
                          text : "请假申请(普通)",
                          attributes : {
                              url : ''
                          }
                      }, {
                          text : "请假办理(普通)",
                          attributes : {
                              url : '<iframe width="100%" height="100%" frameborder="0"  src="'+projectName+'/jsp/queryPriceStock.jsp" style="width:100%;height:100%;margin:0px 0px;"></iframe>'
 
                          }
                      }, {
                          text : "运行中流程(普通)",
                          attributes : {
                              url : '<iframe width="100%" height="100%" frameborder="0"  src="'+projectName+'/jsp/queryPriceStock.jsp" style="width:100%;height:100%;margin:0px 0px;"></iframe>'
 
                          }
                      }, {
                          text : "已结束流程(普通)",
                          attributes : {
                              url : '<iframe width="100%" height="100%" frameborder="0"  src="'+projectName+'/jsp/queryPriceStock.jsp" style="width:100%;height:100%;margin:0px 0px;"></iframe>'
 
                          }
                      }
                  ]
              },*/{
                  text : "动态表单",
                  children : [{
                          text : "流程列表(动态)",
                          attributes : {
                        	  url : '<iframe width="100%" height="100%" frameborder="0"  src="'+projectName+'/dynamic-form-process-list.html" style="width:100%;height:100%;margin:0px 0px;"></iframe>'
                          }
                      }, {
                          text : "任务列表(动态)",
                          attributes : {
                        	  url : '<iframe width="100%" height="100%" frameborder="0"  src="'+projectName+'/dynamic-form-task-list.html" style="width:100%;height:100%;margin:0px 0px;"></iframe>'
                          }
                      }, {
                          text : "运行中流程(动态)",
                          attributes : {
                        	  url : '<iframe width="100%" height="100%" frameborder="0"  src="'+projectName+'/dynamic-form-running-list.html" style="width:100%;height:100%;margin:0px 0px;"></iframe>'
                          }
                      }, {
                          text : "已结束流程(动态)",
                          attributes : {
                        	  url : '<iframe width="100%" height="100%" frameborder="0"  src="'+projectName+'/dynamic-form-finished-list.html" style="width:100%;height:100%;margin:0px 0px;"></iframe>'
                          }
                      }
                  ]
              },/*{
                  text : "外置表单",
                  children : [{
                          text : "流程列表(外置)",
                          attributes : {
                        	  url : '<iframe width="100%" height="100%" frameborder="0"  src="'+projectName+'/jsp/queryPriceStock.jsp" style="width:100%;height:100%;margin:0px 0px;"></iframe>'
                          }
                      }, {
                          text : "任务列表(外置)",
                          attributes : {
                        	  url : ''
                          }
                      }, {
                          text : "运行中流程(外置)",
                          attributes : {
                        	  url : ''
                          }
                      }, {
                          text : "已结束流程(外置)",
                          attributes : {
                        	  url : ''
                          }
                      }
                  ]
              },*/{
            	  text : "管理模块",
                  children : [{
                          text : "流程管理",
                          children : [{
                                  text : "流程定义及部署管理",
                                  attributes : {
                                      url : '<iframe width="100%" height="100%" frameborder="0"  src="'+projectName+'/process-list.html" style="width:100%;height:100%;margin:0px 0px;"></iframe>'
                                  }
                              }, {
                                  text : "模型工作区",
                                  attributes : {
                                      url : '<iframe width="100%" height="100%" frameborder="0"  src="'+projectName+'/model-list.html" style="width:100%;height:100%;margin:0px 0px;"></iframe>'
         
                                  }
                              }
                          ]
                      },{
                          text : "引擎属性",
        				  attributes : {
        					  url : '<iframe width="100%" height="100%" frameborder="0"  src="'+projectName+'/jsp/queryPriceStock.jsp" style="width:100%;height:100%;margin:0px 0px;"></iframe>'

        				  }
                      },{
                          text : "引擎数据库",
        				  attributes : {
        					  url : '<iframe width="100%" height="100%" frameborder="0"  src="'+projectName+'/jsp/queryPriceStock.jsp" style="width:100%;height:100%;margin:0px 0px;"></iframe>'

        				  }
                      },{
                          text : "用户与组",
        				  attributes : {
        					  url : '<iframe width="100%" height="100%" frameborder="0"  src="'+projectName+'/jsp/queryPriceStock.jsp" style="width:100%;height:100%;margin:0px 0px;"></iframe>'

        				  }
                      }
                  ]
        }
          ]
      }
  ];
    
    //实例化树形菜单
    $("#tree").tree({
        data : treeData,
        lines : true,
        onClick : function (node) {
            if (node.attributes) {
                Open(node.text, node.attributes.url);
            }
        }
    });
    //在右边center区域打开菜单，新增tab
    function Open(text, url) {
        if ($("#tabs").tabs('exists', text)) {
            $('#tabs').tabs('select', text);
        } else {
            $('#tabs').tabs('add', {
                title : text,
                closable : true,
                content : url
            });
        }
    }
    
    //绑定tabs的右键菜单
    $("#tabs").tabs({
        onContextMenu : function (e, title) {
            e.preventDefault();
            $('#tabsMenu').menu('show', {
                left : e.pageX,
                top : e.pageY
            }).data("tabTitle", title);
        }
    });
    
    //实例化menu的onClick事件
    $("#tabsMenu").menu({
        onClick : function (item) {
            CloseTab(this, item.name);
        }
    });
    
    //几个关闭事件的实现
    function CloseTab(menu, type) {
        var curTabTitle = $(menu).data("tabTitle");
        var tabs = $("#tabs");
        
        if (type === "close") {
            tabs.tabs("close", curTabTitle);
            return;
        }
        
        var allTabs = tabs.tabs("tabs");
        var closeTabsTitle = [];
        
        $.each(allTabs, function () {
            var opt = $(this).panel("options");
            if (opt.closable && opt.title != curTabTitle && type === "Other") {
                closeTabsTitle.push(opt.title);
            } else if (opt.closable && type === "All") {
                closeTabsTitle.push(opt.title);
            }
        });
        
        for (var i = 0; i < closeTabsTitle.length; i++) {
            tabs.tabs("close", closeTabsTitle[i]);
        }
    }
});