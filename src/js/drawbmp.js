    'use strict';

    //这个方法用来储存每个图层对象
    function layerInfo(x, y, w, h,layer_idx) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.img_idx = 0;
      this.z = 0;
      this.layer_idx = layer_idx;
    }

    //数组排序的方法
    function layersSorting(l1,l2){
        if(l1.z < l2.z){
            return -1;
        }
        else if(l1.z > l2.z){
            return 1;
        }
        else{
            return 0;
        }

    }

    //保存画布上所有的图层
    var layers = [new layerInfo(10,10,10,10,0)];
     
    //大画布
    var painter_canvas = document.getElementById('painterCanvas');
    //小画布
    var watch_canvas = document.getElementById('watchCanvas');
    //图层列表
    var layerInfoBarList = document.getElementById('layerInfoBarList');

    //canvas->input
    function getLayerInfoFromCanvasToInput (){

        for (var i = 0; i<layerInfoBarList.children.length;i++) {          
            
            var oneLayer = layers[i];
            var inputInfoAll = layerInfoBarList.children[layers[i].layer_idx].getElementsByTagName("input");
            

            for (var j = 0; j < inputInfoAll.length; j++) {

                var nameString = inputInfoAll[j].getAttribute("name");                
              
                inputInfoAll[j].value = oneLayer[nameString];            
                
            }
            
        }
    }

    function find_old_layer_idx(infoBarIdx){
        for(var idx = 0;idx<layers.length;idx++){
            if(layers[idx].layer_idx === infoBarIdx){
                return idx;
            }
        }
    }

    //input->canvas
    function getLayerInfoFromInputToCanvas (){

        var temp_layers = [];

        for (var j = 0; j<layerInfoBarList.children.length;j++) {

            var oneInfoBar = layerInfoBarList.children[j];
            var old_layer_idx = find_old_layer_idx(j);

            var oneLayer = new layerInfo(10, 10, 10, 10,j);
            
            if(layers[old_layer_idx] !== undefined){
                oneLayer.img_idx = layers[old_layer_idx].img_idx;
                oneLayer.layer_idx = layers[old_layer_idx].layer_idx;
                oneLayer.z = layers[old_layer_idx].z;
            }


            var input_num_lmt_flag  = 0;//限制输入数字

            var inputInfoAll = oneInfoBar.getElementsByTagName("input");
            for (var i = 0; i < inputInfoAll.length; i++) {
                var nameString = inputInfoAll[i].getAttribute("name");
                var valueInt = inputInfoAll[i].valueAsNumber;

                if((valueInt>128)||(valueInt < 0)){
                    input_num_lmt_flag = 1;

                    valueInt = valueInt > 128 ? 128:valueInt;
                    valueInt = valueInt < 0 ? 0:valueInt;
                }
                if(parseInt(valueInt) !== valueInt){
                    input_num_lmt_flag = 1;
                    valueInt = parseInt(valueInt);
                }

                oneLayer[nameString] = valueInt;
            }

            //写入内存中
            temp_layers.push(oneLayer);   
            if(input_num_lmt_flag === 1)
            {
                getLayerInfoFromCanvasToInput();
            }         
        }

        layers.splice(0,layers.length);
        layers = temp_layers;        
    }

    function drawPains() {    
        
        var painter_ctx = painter_canvas.getContext("2d");
        painter_ctx.clearRect(0, 0, painter_canvas.width, painter_canvas.height);       

        layers.sort(layersSorting);

        for (var i = 0; i<layerInfoBarList.children.length;i++) {

            var oneInfoBar = layerInfoBarList.children[layers[i].layer_idx];

            var x = layers[i].x;
            var y = layers[i].y;
            var w = layers[i].w;
            var h = layers[i].h;
            
            //绘制图片
            
            var previewContainer = document.getElementsByClassName('previewContainer');
            var box_idx = oneInfoBar.children[1].selectedIndex;
            var imgData = previewContainer[box_idx].children[layers[i].img_idx];
            if(imgData !== undefined){
                var image = new Image();
                image.src = imgData.currentSrc;
                painter_ctx.drawImage(image,0,0,w,h,x, y,w,h);
            }


            //绘制图层矩形
            var pattLayerNameString = new RegExp("\\d+");
            var layerNameString = pattLayerNameString.exec(oneInfoBar.children[0].innerHTML);
            

            painter_ctx.beginPath();
            painter_ctx.lineWidth = "1";
            painter_ctx.strokeStyle = "red";
            painter_ctx.rect(x, y, w, h);
            painter_ctx.stroke();

            painter_ctx.textAlign = "left";
            painter_ctx.textBaseline = "hanging";
            painter_ctx.font = '12px Arial';
            painter_ctx.fillStyle = '#000';

            painter_ctx.fillText(layerNameString, x, y + painter_ctx.lineWidth);

            
        }

        var painter_ctx_data = painter_ctx.getImageData(0, 0, painter_canvas.width, painter_canvas.height);
        
        var watch_ctx = watch_canvas.getContext('2d');
        watch_ctx.putImageData(painter_ctx_data,0,0);
    }

    var isDragging = false;
    var selectedLayer;

    function isInner(ox,oy,layer) {
        var x = ox/(painter_canvas.offsetWidth/painter_canvas.width);
        var y = oy/(painter_canvas.offsetHeight/painter_canvas.height);
        if((layer.x <= x)&&(x<=layer.x+layer.w)&&(layer.y <= y)&&(y <= layer.y+layer.h)){
            return true;
        }
        return false;
    }
    
    function canvasClick(e) {
      // 取得画布上被单击的点
      var clickX = e.pageX - painter_canvas.offsetLeft;
      var clickY = e.pageY - painter_canvas.offsetTop;
 
      // 查找被单击的图层
      layers.sort(layersSorting);
      //倒序查找最高层图层
      for(var i=layers.length-1; i>=0; i--) {
        var layer = layers[i];
        
        // 判断这个点是否在图层中
        if (isInner(clickX,clickY,layer)) {
          layer.z = layers[layers.length-1].z+1;           
          selectedLayer = layer;   
         
          // 使图层允许拖拽
          isDragging = true; 
           
          //停止搜索
          return;
        }
      }
    }

    function stopDragging() {
        if(isDragging === true)
        {
            getLayerInfoFromCanvasToInput();
        }
        isDragging = false;
    }

    function dragStatus(e) {
        // 判断图层是否开始拖拽
        if (isDragging == true) {
            // 判断拖拽对象是否存在
            if (selectedLayer != null) {
                // 取得鼠标位置
                var x = e.pageX - painter_canvas.offsetLeft;
                var y = e.pageY - painter_canvas.offsetTop;

                // 将图层移动到鼠标位置，注意真实坐标与canvas内坐标变换
                selectedLayer.x = parseInt(x/(painter_canvas.offsetWidth/painter_canvas.height)-selectedLayer.w/2);
                selectedLayer.y = parseInt(y/(painter_canvas.offsetHeight/painter_canvas.width)-selectedLayer.h/2);
               
                selectedLayer.x = selectedLayer.x > painter_canvas.width- selectedLayer.w? painter_canvas.width-selectedLayer.w : selectedLayer.x;
                selectedLayer.x = selectedLayer.x < 0 ? 0 :selectedLayer.x;

                selectedLayer.y = selectedLayer.y > painter_canvas.height - selectedLayer.h ? painter_canvas.height-selectedLayer.h : selectedLayer.y;
                selectedLayer.y = selectedLayer.y < 0 ? 0 :selectedLayer.y;
                
                // 更新画布
                drawPains();
            }
        }
    }

   

    function reListenAllInput() {
       
        for (var oneInfoBar of layerInfoBarList.children) {
            //input数值改变
            oneInfoBar.addEventListener('change',function(){ 
                getLayerInfoFromInputToCanvas();  
                drawPains();
            });   
        }
    }


    //初始化-订阅事件
    var init = function (){
        
        //载入初始图层数据并绘图
        getLayerInfoFromInputToCanvas();
        drawPains();

        //给初始图层绑定事件
        reListenAllInput();
        
        //增加图层 按键被按
        layerInfoBarList.parentElement.lastElementChild.addEventListener('click',function(){
            console.log('lastChild click!!!!!');
            getLayerInfoFromInputToCanvas();
            reListenAllInput();
            drawPains();
        });        
       
        
        painter_canvas.onmouseup = stopDragging;
        painter_canvas.onmouseout = stopDragging;
        painter_canvas.onmousemove = dragStatus;
        painter_canvas.onmousedown = canvasClick;
    };


    var exit = function (){        
        
        layerInfoBarList.parentElement.lastElementChild.removeEventListener('click',function(){
            console.log('lastChild click!!!!!');
            getLayerInfoFromInputToCanvas();
            reListenAllInput();
            drawPains();
        });   

        for (var oneInfoBar of layerInfoBarList.children) {
            //input数值改变
            oneInfoBar.removeEventListener('change',function(){ 
                getLayerInfoFromInputToCanvas();  
                drawPains();
            });   
        }
    };

    (function () {
        startList.push(init);
        exitList.push(exit);
    })();