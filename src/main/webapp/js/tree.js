//清空
function Clearnav() {
    var pp = $('#wnav').accordion('panels');

    $.each(pp, function(i, n) {
        if (n) {
            var t = n.panel('options').title;
            $('#wnav').accordion('remove', t);
        }
    });

    pp = $('#wnav').accordion('getSelected');
    if (pp) {
        var title = pp.panel('options').title;
        $('#wnav').accordion('remove', title);
    }
}
//增加
function addNav(data) {

    $.each(data, function(i, sm) {
        var menulist = "";
        menulist += '<ul>';
        $.each(sm.menus, function(j, o) {
            menulist += '<li><div><a ref="' + o.menuid + '" href="#" rel="'
                    + o.url + '" ><span class="icon ' + o.icon
                    + '" >&nbsp;</span><span class="nav">' + o.menuname
                    + '</span></a></div></li> ';
        });
        menulist += '</ul>';

        $('#wnav').accordion('add', {
            title : sm.menuname,
            content : menulist,
            iconCls : 'icon ' + sm.icon
        });

    });

    var pp = $('#wnav').accordion('panels');
    var t = pp[0].panel('options').title;
    $('#wnav').accordion('select', t);

}

// 初始化左侧
function InitLeftMenu() {
    
    hoverMenuItem();

    $('#wnav li a').live('click', function() {
        var tabTitle = $(this).children('.nav').text();

        var url = $(this).attr("rel");
        var menuid = $(this).attr("ref");
        var icon = getIcon(menuid, icon);

        addTab(tabTitle, url, icon);
        $('#wnav li div').removeClass("selected");
        $(this).parent().addClass("selected");
    });

}

/**
 * 菜单项鼠标Hover
 */
function hoverMenuItem() {
    $(".easyui-accordion").find('a').hover(function() {
        $(this).parent().addClass("hover");
    }, function() {
        $(this).parent().removeClass("hover");
    });
}