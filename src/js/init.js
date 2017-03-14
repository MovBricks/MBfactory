    'use strict';
    /*--全局数组--*/

    //仓库名数组
    var imgBoxNameArray = [];

    //初始化函数入口数组
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