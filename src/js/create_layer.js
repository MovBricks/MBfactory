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
    }

    //删除图层
    function click_remove_layer_handler(Obj){
        console.log('click_remove_layer_handler');
        
        //删除节点
        var parObj = Obj.parentNode.parentNode;
        parObj.removeChild(Obj.parentNode);

        //刷新layers数组
        getLayerInfoFromInputToCanvas();
        drawPains();

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
        for(var name of imgBoxNameArray){
            var newOption = new Option(name);
            newOption.setAttribute("value", name);
            select.options.add(newOption);
        }

        //添加节点的xywh
        layerInfoBarNewItem.innerHTML = layerInfoBarNewItem.innerHTML+`                    
                    <div>x:<input type="number" name="x" value="10" /></div>
                    <div>y:<input type="number" name="y" value="10" /></div>
                    <div>width:<input type="number" name="w" value="10" /></div>
                    <div>heigh:<input type="number" name="h" value="10"></div>
                    <div>img_idx:<input type="number" name="img_idx" value="0"></div>
                    <button onclick="click_remove_layer_handler(this)"></button>`; //设置文字内容
               
    
        layerInfoBarList.appendChild(layerInfoBarNewItem); 
        
        //刷新layers数组
        getLayerInfoFromInputToCanvas();
        drawPains();
       
    }

    //修改图层选项内容
    function change_select_option(){
        console.log('select change');
        var layerInfoBarList = document.getElementById('layerInfoBarList');

        for(var layerInfoBar of layerInfoBarList.children){
            for(var cld of layerInfoBar.children){
                if(cld.localName === 'select'){
                    var len = cld.options.length;
                    for(var i = 0;i<len;i++){
                        cld.removeChild(cld.options[0]);
                    }


                    //填充select选项内容
                    for(var name of imgBoxNameArray){
                        var newOption = new Option(name);
                        newOption.setAttribute("value", name);
                        cld.options.add(newOption);
                    }
                }
            }
        }
    }

    //初始化-订阅事件
    var init = function (){
        
        var BoxNameBar = document.getElementById('imgBoxAndboxNameBoxNameBar');
        BoxNameBar.addEventListener('DOMSubtreeModified',function(){
            console.log('imgBoxAndboxNameBoxNameBar DOMSubtreeModified!!!!!');
            change_select_option();
        });       
    };

    var exit = function (){
        
        var BoxNameBar = document.getElementById('imgBoxAndboxNameBoxNameBar');
        BoxNameBar.removeEventListener('DOMSubtreeModified',function(){
            console.log('imgBoxAndboxNameBoxNameBar DOMSubtreeModified!!!!!');
            change_select_option();
        });       
    };

    (function () {
        startList.push(init);
        exitList.push(exit);
    })();