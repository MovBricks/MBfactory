    'use strict'

    //将图层置顶
    function click_top_layer(Obj){
        var lastNameStr = Obj.innerHTML;
        var nameIdx = parseInt(lastNameStr.replace(/\D/g,""))-1;

        var obj_layer_idx;
        var maxz = 0;
        for(var i = layers.length-1;i>=0;i--){
            if(layers[i].z > maxz){
                maxz = layers[i].z
            }

            if(layers[i].layer_idx === nameIdx){
                obj_layer_idx = i;
            }
        }
        
        layers[obj_layer_idx].z = maxz+1;
        drawPains();
    }

    //删除图层
    function click_remove_layer_handler(Obj){
        console.log('click_remove_layer_handler');
                
        var parObj = Obj.parentNode.parentNode;
        if(parObj.children.length <= 1){
            return;
        }

        //删除节点
        parObj.removeChild(Obj.parentNode);

        //刷新layers数组
        getLayerInfoFromInputToCanvas();
        drawPains();
        //在layers更新后，更新控件
        change_controler_select_option()  
    }
    
    //增加图层
    function click_create_layer_handler() {
        console.log('click_create_layer_handler');
        var layerInfoBarList = document.getElementById('layerInfoBarList');

        //添加节点  
        
        var layerInfoBarNewItem = document.createElement("li"); //创建节点
        layerInfoBarNewItem.setAttribute("class", "layerInfoBar"); //设置class属性        
        

        //添加节点的名称
        var layerInfoBarNewItemName = document.createElement("p");
        layerInfoBarNewItemName.setAttribute("onclick", "click_top_layer(this)"); //设置class属性 
        
        var lastNameStr = layerInfoBarList.children[layerInfoBarList.children.length-1].children[0].innerHTML;                
        var nameIdx = parseInt(lastNameStr.replace(/\D/g,""))+1;
        var nameStr = lastNameStr.replace(/\d/g,"");
     

        layerInfoBarNewItemName.innerHTML = nameStr + nameIdx;        
        layerInfoBarNewItem.appendChild(layerInfoBarNewItemName);

        //添加节点的select
        var layerInfoBarNewItemSelect = document.createElement("select");  
        var select = layerInfoBarNewItem.appendChild(layerInfoBarNewItemSelect); 

        //填充select选项内容        
        for(var loop = 0;loop<imgBoxNameArray.length;loop++){
            var name = imgBoxNameArray[loop]; 

            var newOption = new Option(name);
            newOption.setAttribute("value", name);
            select.options.add(newOption);
        }

        //添加节点的xywh
        //设置文字内容
        layerInfoBarNewItem.innerHTML = layerInfoBarNewItem.innerHTML + "\n<div>x:<input type=\"number\" name=\"x\" value=\"10\" /></div>\n<div>y:<input type=\"number\" name=\"y\" value=\"10\" /></div>\n<div>width:<input type=\"number\" name=\"w\" value=\"10\" /></div>\n<div>heigh:<input type=\"number\" name=\"h\" value=\"10\"></div>\n<div>img_idx:<input type=\"number\" name=\"img_idx\" value=\"0\"></div>\n<button onclick=\"click_remove_layer_handler(this)\">删除图层</button>";
               
    
        layerInfoBarList.appendChild(layerInfoBarNewItem); 
        
        //刷新layers数组
        getLayerInfoFromInputToCanvas();
        drawPains();

        //在layers更新后，更新控件
        change_controler_select_option()       
       
    }

    //修改图层选项内容
    function change_layer_select_option(){
        console.log('select change');
        var layerInfoBarList = document.getElementById('layerInfoBarList');
        var selects = layerInfoBarList.getElementsByTagName("select");

        for(var loop = 0;loop<selects.length;loop++){
            var cld = selects[loop]; 
            
            var selectedIdx = cld.selectedIndex;

            for(var i = cld.options.length-1;i>=0;i--){
                cld.removeChild(cld.options[i]);
            }

            //填充select选项内容            
            for(var loop2 = 0;loop2<imgBoxNameArray.length;loop2++){
                var name = imgBoxNameArray[loop2]; 

                var newOption = new Option(name);
                newOption.setAttribute("value", name);
                cld.options.add(newOption);
            }

            if(selectedIdx <= cld.options.length-1){
                cld.selectedIndex = selectedIdx;
            }
            else{
                cld.selectedIndex = 0;
            }
            
        }

    }

    //初始化-订阅事件
    function create_layer_listener_callback(){
        console.log('imgBoxAndboxNameBoxNameBar DOMSubtreeModified!!!!!');
        change_layer_select_option();
    }
    var init = function (){
        
        var BoxNameBar = document.getElementById('imgBoxAndboxNameBoxNameBar');
        BoxNameBar.addEventListener('DOMSubtreeModified',create_layer_listener_callback);       
    };

    var exit = function (){
        
        var BoxNameBar = document.getElementById('imgBoxAndboxNameBoxNameBar');
        BoxNameBar.removeEventListener('DOMSubtreeModified',create_layer_listener_callback);       
    };

    (function () {
        startList.push(init);
        exitList.push(exit);
    })();