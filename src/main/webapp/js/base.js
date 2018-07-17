/**
 * 项目路径
 */
$(function(){
	window.projectName = getPath();
});

function getPath(){
    var pathName = document.location.pathname;
    return pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
}