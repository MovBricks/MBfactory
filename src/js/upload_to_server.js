'use strict'

function success(text) {

    alert('请求成功:' + text);
}

function fail(code) {
    alert('请求失败:' + code);
}

var url = "http://192.168.0.107:8080";
//上传数据对象
var fileDate = new FormData();

function get_imgdata_to_filedata(){

    for(var i = imgDataObjArray.length-1;i>=0;i--){
        var fileName = "box"+imgDataObjArray[i].box+"idx"+imgDataObjArray[i].idx;
        fileDate.append(fileName,imgDataObjArray[i].file);
    }
}

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
    

    // 获取页面已有的一个form表单
    var layerInfoForm = document.getElementById('layerInfoForm');
    // 用表单来初始化FormData
    var formData = new FormData(layerInfoForm);
    //发送
    request.send(formData);
    
    
    //从图片数据数组中获取数据填充FormData
    get_imgdata_to_filedata();
    //发送图片文件
    request.send(fileDate);


    alert('请求已发送，请等待响应...');
}

