'use strict'

//点击增加控制器
function click_add_controler_handler(Obj){
    console.log('click_add_controler_handler');
    var controlerInfoBarList = document.getElementById('controlerInfoBarList');

    //添加节点  
    
    var controlerInfoBarNewItem = document.createElement("li"); //创建节点
    controlerInfoBarNewItem.setAttribute("class", "controlerInfoBar"); //设置class属性        
    
    controlerInfoBarNewItem.innerHTML = "<p>被控图层</p>";    

    //添加节点的select
    var controlerInfoBarNewItemSelect = document.createElement("select");  
    controlerInfoBarNewItemSelect.setAttribute("class", "selectLayer"); //设置class属性     
    var select = controlerInfoBarNewItem.appendChild(controlerInfoBarNewItemSelect); 

    //填充select选项内容
    for(var name of layers){
        var newOption = new Option("图层"+(name.layer_idx+1));
        newOption.setAttribute("value", name.layer_idx);
        select.options.add(newOption);
    }

    //添加节点后续内容
    controlerInfoBarNewItem.innerHTML = controlerInfoBarNewItem.innerHTML+`                    
        <p>控件</p>
        <select>
            <option value="step">步数</option>
            <option value="temp">温度</option>
            <option value="dist">距离</option>                        
            <option value="time">时间</option>
        </select>
        <p>控件参数</p>
        <select class="controlerParam">
            <option value="1">个位</option>
            <option value="2">十位</option>
            <option value="3">百位</option>
            <option value="4">千位</option>
            <option value="5">万位</option>
            <option value="6">十万位</option>
        </select>
        <button onclick="click_remove_layer_handler(this)">删除控件</button>
        `; //设置文字内容
            

    controlerInfoBarList.appendChild(controlerInfoBarNewItem); 
    
}

function change_controler_select_option(){
    
    var controlerInfoBarList = document.getElementById("controlerInfoBarList");
    var selectLayer = controlerInfoBarList.getElementsByClassName("selectLayer");
    
    for(var select of selectLayer){
        select.innerHTML = "";

        //填充select选项内容
        for(var name of layers){
            var newOption = new Option("图层"+(name.layer_idx+1));
            newOption.setAttribute("value", name.layer_idx);
            select.options.add(newOption);
        }
    }
}   

// //初始化-订阅事件

// function create_controler_listener_callback(){
//     console.log('layerInfoBarList DOMSubtreeModified!!!!!');
//     change_controler_select_option();
// }


//     var init = function (){
        
//         var layerInfoBarList = document.getElementById('layerInfoBarList');
//         layerInfoBarList.addEventListener('DOMSubtreeModified',create_controler_listener_callback);       
//     };

//     var exit = function (){
        
//         var layerInfoBarList = document.getElementById('layerInfoBarList');
//         layerInfoBarList.removeEventListener('DOMSubtreeModified',create_controler_listener_callback);       
//     };

//     (function () {
//         startList.push(init);
//         exitList.push(exit);
//     })();