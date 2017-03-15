'use strict'

function success(text) {

    alert('请求成功:' + text);
}

function fail(code) {
    alert('请求失败:' + code);
}

var url = "http://";
var date = new FormData($("from[name='form1']")[0]);

function upload_web_data_to_server() {

    var request;
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    } else {
        request = new ActiveXObject('Microsoft.XMLHTTP');
    } // 新建XMLHttpRequest对象

    request.onreadystatechange = function () { // 状态发生变化时，函数被回调
        if (request.readyState === 4) { // 成功完成
            // 判断响应结果:
            if (request.status === 200) {
                // 成功，通过responseText拿到响应的文本:
                return success(request.responseText);
            } else {
                // 失败，根据响应码判断失败原因:
                return fail(request.status);
            }
        } else {
            // HTTP请求还在继续...
        }
    }

    // 发送请求:
    request.open('POST', url);
    request.send(date);

    alert('请求已发送，请等待响应...');
}

