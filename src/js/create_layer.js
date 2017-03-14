    'use strict'
  
    //增加图层
    function click_create_layer_handler() {
        console.log('click_create_layer_handler');
        var layerInfoBarList = document.getElementById('layerInfoBarList');

        //添加节点    
        var layerInfoBar = layerInfoBarList.children[0];

        var layerInfoBarNewItem = document.createElement("li"); //创建节点
        layerInfoBarNewItem.setAttribute("class", "layerInfoBar"); //设置class属性        
        

        //添加节点的名称
        var layerInfoBarNewItemName = document.createElement("p");
        
        var nameStr = RegExp('.*\\D').exec(layerInfoBar.children[0].innerHTML)[0];//取出第一个元素的文字
        var layerInfoBarNewItemIndex = layerInfoBarList.children.length+1;

        layerInfoBarNewItemName.innerHTML = nameStr + layerInfoBarNewItemIndex;        
        layerInfoBarNewItem.appendChild(layerInfoBarNewItemName);

        //添加节点的select
        var layerInfoBarNewItemSelect = document.createElement("select");  
        var select = layerInfoBarNewItem.appendChild(layerInfoBarNewItemSelect); 

        //填充select选项内容
        for(var name of imgBoxNameArray){
            select.options.add(new Option(name));
        }

        //添加节点的xywh
        layerInfoBarNewItem.innerHTML = layerInfoBarNewItem.innerHTML+`                    
                    <div>x:<input type="number" name="x" value="10" /></div>
                    <div>y:<input type="number" name="y" value="10" /></div>
                    <div>width:<input type="number" name="w" value="10" /></div>
                    <div>heigh:<input type="number" name="h" value="10"></div> `; //设置文字内容
               
    
        layerInfoBarList.appendChild(layerInfoBarNewItem); 
       
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
                        cld.options.add(new Option(name));
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