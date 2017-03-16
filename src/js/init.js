    'use strict';
    /*--全局数组--*/

    //仓库名数组
    var imgBoxNameArray = [];
    //上传数据对象
    var uploadDate = new FormData();

    //初始化函数订阅移除事件数组
    var startList = [];
    var exitList = [];
    window.onload = function () {
        for (var func of startList) {
            func();
        }
    }

    window.onunload = function () {
        for (var func of exitList) {
            func();
        }
    }