    'use strict';

    //这个方法用来储存每个圆圈对象
    function layerInfo(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
    }

    //保存画布上所有的圆圈
    var layers = [new layerInfo(10,10,10,10)];
     
    //大画布
    var painter_canvas = document.getElementById('painterCanvas');
    //小画布
    var watch_canvas = document.getElementById('watchCanvas');
    //图层列表
    var layerInfoBarList = document.getElementById('layerInfoBarList');

    function getLayerInfoFromInputToCanvas (){

        layers = [];
        for (var oneInfoBar of layerInfoBarList.children) {

            var x = 10;
            var y = 10;
            var w = 10;
            var h = 10;

            var inputInfoAll = oneInfoBar.getElementsByTagName("input");
            for (var i = 0; i < inputInfoAll.length; i++) {
                var nameString = inputInfoAll[i].getAttribute("name");
                var valueInt = inputInfoAll[i].valueAsNumber;
                if ("x" === nameString) {
                    x = valueInt;
                } else if ("y" === nameString) {
                    y = valueInt;
                } else if ("w" === nameString) {
                    w = valueInt;
                } else if ("h" === nameString) {
                    h = valueInt;
                }
            }

            //写入内存中            
            var oneLayer = new layerInfo(x, y, w, h);
            layers.push(oneLayer);
        }
    }

    function drawPains() {    
        
        var painter_ctx = painter_canvas.getContext("2d");
        painter_ctx.clearRect(0, 0, painter_canvas.width, painter_canvas.height);       

        for (var i = 0; i<layerInfoBarList.children.length;i++) {

            var oneInfoBar = layerInfoBarList.children[i];

            var x = layers[i].x;
            var y = layers[i].y;
            var w = layers[i].w;
            var h = layers[i].h;
           
            // var x = 10;
            // var y = 10;
            // var w = 10;
            // var h = 10;

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
        var x = ox/(painter_canvas.offsetWidth/128);
        var y = oy/(painter_canvas.offsetHeight/128);
        if((layer.x <= x)&&(x<=layer.x+layer.w)&&(layer.y <= y)&&(y <= layer.y+layer.h)){
            return true;
        }
        return false;
    }
    
    function canvasClick(e) {
      // 取得画布上被单击的点
      var clickX = e.pageX - painter_canvas.offsetLeft;
      var clickY = e.pageY - painter_canvas.offsetTop;
 
      // 查找被单击的圆圈
      for(var i=0; i<layers.length; i++) {
        var layer = layers[i];
        
        // 判断这个点是否在图层中
        if (isInner(clickX,clickY,layer)) {
                      
          selectedLayer = layer;   
 
          // 使圆圈允许拖拽
          isDragging = true; 
           
          //停止搜索
          return;
        }
      }
    }

    function stopDragging() {
        isDragging = false;
    }

    function dragStatus(e) {
        // 判断圆圈是否开始拖拽
        if (isDragging == true) {
            // 判断拖拽对象是否存在
            if (selectedLayer != null) {
                // 取得鼠标位置
                var x = e.pageX - painter_canvas.offsetLeft;
                var y = e.pageY - painter_canvas.offsetTop;

                // 将圆圈移动到鼠标位置，注意真实坐标与canvas内坐标变换
                selectedLayer.x = x/(painter_canvas.offsetWidth/128)-selectedLayer.w/2;
                selectedLayer.y = y/(painter_canvas.offsetHeight/128)-selectedLayer.h/2;
               
                selectedLayer.x = selectedLayer.x > 128- selectedLayer.w? 128-selectedLayer.w : selectedLayer.x;
                selectedLayer.x = selectedLayer.x < 0 ? 0 :selectedLayer.x;

                selectedLayer.y = selectedLayer.y > 128 - selectedLayer.h ? 128-selectedLayer.h : selectedLayer.y;
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


    (function () {
        startList.push(init);        
    })();