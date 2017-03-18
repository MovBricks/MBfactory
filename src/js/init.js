    'use strict';
    /*--全局数组--*/

    //仓库名数组
    var imgBoxNameArray = [];

    //图片数据数组
    var imgDataObjArray = [];

    function imgDataObj(box, idx, file) {
        this.idx = idx;
        this.box = box;
        this.file = file;
    }


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

    //捕捉回车事件并禁止
    document.onkeydown = function (e) { 
        var ev = (typeof event != 'undefined') ? window.event : e; 
        if (ev.keyCode == 13) {  
            return false; //禁用回车事件             
        }
    }