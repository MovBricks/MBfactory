'use strict'

function success(text) {

    alert('请求成功:' + text);
}

function fail(code) {
    alert('请求失败:' + code);
}

var url = "http://192.168.0.107:3000";


function get_imgdata_to_filedata(fileDate){

    for(var i = imgDataObjArray.length-1;i>=0;i--){
        var fileName = "box"+imgDataObjArray[i].box+"idx"+imgDataObjArray[i].idx;
        fileDate.append(fileName,imgDataObjArray[i].file);
    }
}

function get_controler_info(controlerInfo){

    var controlerInfoBarList = document.getElementById('controlerInfoBarList');
    for(var i = controlerInfoBarList.children.length-1;i>=0;i--){
        var selects = controlerInfoBarList.children[i].getElementsByTagName('select');
        var Obj = new Object;
        Obj.selectLayer = selects[0].selectedIndex;
        Obj.selectControler = selects[1].selectedIndex;
        Obj.controlerParam = selects[2].selectedIndex;
        controlerInfo.push(Obj);
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

    
    var formData = new FormData();

    //控制器数据
    var controlerInfo = new Array();
    get_controler_info(controlerInfo);

    var controlerInfoJson = JSON.stringify(controlerInfo);   
    formData.append("controlerInfo",controlerInfoJson);

    //图层数据
    var layersInfoJson =  JSON.stringify(layers);    
    formData.append("layersInfo",layersInfoJson);
    
    // //发送
    // request.send(formData);


    //图片数据   
    //从图片数据数组中获取数据填充FormData
    //上传数据对象
    // var fileDate = new FormData();
    get_imgdata_to_filedata(formData);
    //发送图片文件
    request.send(formData);


    alert('请求已发送，请等待响应...');
}

