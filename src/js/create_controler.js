'use strict'

var controlerInfoBarList = document.getElementById('controlerInfoBarList');

//点击增加控制器
function click_add_controler_handler(Obj){
    console.log('click_add_controler_handler');
    //var controlerInfoBarList = document.getElementById('controlerInfoBarList');

    //添加节点  
    
    var controlerInfoBarNewItem = document.createElement("li"); //创建节点
    controlerInfoBarNewItem.setAttribute("class", "controlerInfoBar"); //设置class属性        
    
    controlerInfoBarNewItem.innerHTML = "<p>被控图层</p>";    

    //添加节点的select
    var controlerInfoBarNewItemSelect = document.createElement("select");  
    controlerInfoBarNewItemSelect.setAttribute("class", "selectLayer"); //设置class属性     
    var select = controlerInfoBarNewItem.appendChild(controlerInfoBarNewItemSelect); 

    //填充select选项内容
    for(var loop = 0;loop<layers.length;loop++){
        var name = layers[loop];    
        var newOption = new Option("图层"+(name.layer_idx+1));
        newOption.setAttribute("value", name.layer_idx);
        select.options.add(newOption);
    }

    //添加节点后续内容
    
    //设置文字内容
    controlerInfoBarNewItem.innerHTML = controlerInfoBarNewItem.innerHTML + "\n<p>控件</p>\n<select class=\"selectControler\">\n            <option value=\"time\">时间</option>\n<option value=\"step\">步数</option>\n<option value=\"temp\">温度</option>\n            <option value=\"dist\">距离</option> \n<option value=\"calo\">卡路里</option> \n</select>\n<p>控件参数</p>\n<select class=\"controlerParam\" name=\"time\">\n<option value=\"1\">时(十位)</option>\n<option value=\"2\">时(个位)</option>\n<option value=\"3\">分(十位)</option>\n<option value=\"4\">分(个位)</option>\n</select>\n<button onclick=\"click_remove_layer_handler(this)\">删除控件</button>\n"; 
            

    controlerInfoBarList.appendChild(controlerInfoBarNewItem); 
    
}

function change_controler_select_option(){
    
    //var controlerInfoBarList = document.getElementById("controlerInfoBarList");
    var selectLayer = controlerInfoBarList.getElementsByClassName("selectLayer");
        
    for(var loop = 0;loop<selectLayer.length;loop++){
        var select = selectLayer[loop];    
        var selectedIdx = select.selectedIndex;
        select.innerHTML = "";

        //填充select选项内容       
        for(var loop2 = 0;loop2<layers.length;loop2++){
        var name = layers[loop2]; 
            var newOption = new Option("图层"+(name.layer_idx+1));
            newOption.setAttribute("value", newOption.innerHTML);
            select.options.add(newOption);
        }

        if(selectedIdx <= select.options.length-1){
            select.selectedIndex = selectedIdx;
        }
        else{
            select.selectedIndex = 0;
        }
    }
}   

function refresh_controler_param_select(){
    var selectControlers = controlerInfoBarList.getElementsByClassName("selectControler");
    var controlerParam = controlerInfoBarList.getElementsByClassName("controlerParam");
    
    for(var i = selectControlers.length-1;i>=0;i--){
        
        if(selectControlers[i].value === "time"){
            if(controlerParam[i].name !== "time"){                
                controlerParam[i].innerHTML = "\n<option value=\"1\">时(十位)</option>\n<option value=\"2\">时(个位)</option>\n<option value=\"3\">分(十位)</option>\n<option value=\"4\">分(个位)</option>\n";
                controlerParam[i].name = "time";       
            }
        }
        else{
            if(controlerParam[i].name === "time"){

                controlerParam[i].innerHTML = "\n<option value=\"1\">个位</option>\n<option value=\"2\">十位</option>\n<option value=\"3\">百位</option>\n<option value=\"4\">千位</option>\n<option value=\"5\">万位</option>\n";
                controlerParam[i].name = "sports"; 
            }
        }

    }    
}

//初始化-订阅事件

function create_controler_listener_callback(){
    console.log('layerInfoBarList change!!!!!');
    refresh_controler_param_select();
}


var init = function (){
    
    //var controlerInfoBarList = document.getElementById('controlerInfoBarList');
    controlerInfoBarList.addEventListener('change',create_controler_listener_callback);       
};

var exit = function (){
    
    //var controlerInfoBarList = document.getElementById('controlerInfoBarList');
    controlerInfoBarList.removeEventListener('change',create_controler_listener_callback);       
};

(function () {
    startList.push(init);
    exitList.push(exit);
})();