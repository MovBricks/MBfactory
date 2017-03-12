    'use strict';

    var
        watch_canvas = document.getElementById('watchCanvas'),
        ctx = watch_canvas.getContext('2d');

    ctx.clearRect(0, 0, 200, 200); // 擦除(0,0)位置大小为200x200的矩形，擦除的意思是把该区域变为透明
    ctx.fillStyle = '#dddddd'; // 设置颜色
    ctx.fillRect(0, 0, 130, 130); // 把(10,10)位置大小为130x130的矩形涂色
    // 利用Path绘制复杂路径:
    var path = new Path2D();
    path.arc(75, 75, 50, 0, Math.PI * 2, true);
    path.moveTo(110, 75);
    path.arc(75, 75, 35, 0, Math.PI, false);
    path.moveTo(65, 65);
    path.arc(60, 65, 5, 0, Math.PI * 2, true);
    path.moveTo(95, 65);
    path.arc(90, 65, 5, 0, Math.PI * 2, true);
    ctx.strokeStyle = '#000';
    ctx.stroke(path);


    //大画布

    var painter_canvas = document.getElementById('painterCanvas');

    function layerInfoBarCreateHandler(argument) {
        // body... 

    }

    function drawPains() {
        var layerInfoList = document.getElementById('layerInfoBarList');
        var layer_1 = painter_canvas.getContext("2d");
        layer_1.clearRect(0, 0, painter_canvas.width, painter_canvas.height);
        for (var oneInfoBar of layerInfoList.children) {

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

            //矩形
            var pattLayerNameString = new RegExp("\\d+");
            var layerNameString = pattLayerNameString.exec(oneInfoBar.children[0].innerHTML);

            

            layer_1.beginPath();
            layer_1.lineWidth = "1";
            layer_1.strokeStyle = "red";
            layer_1.rect(x, y, w, h);
            layer_1.stroke();

            layer_1.textAlign = "left";
            layer_1.textBaseline = "hanging";
            layer_1.font = '12px Arial';
            layer_1.fillStyle = '#000';

            layer_1.fillText(layerNameString, x, y + layer_1.lineWidth);
        }

    }

    drawPains();

    var isDragging = false;

    //var previousSelectedCircle;

    function startDragging() {
        isDragging = true;
    }

    function stopDragging() {
        isDragging = false;
    }

    function dragCircle(e) {
        // 判断圆圈是否开始拖拽
        if (isDragging == true) {
            // 判断拖拽对象是否存在
            if (painter_canvas != null) {
                // 取得鼠标位置
                var x = e.pageX - painter_canvas.offsetLeft;
                var y = e.pageY - painter_canvas.offsetTop;

                // 将圆圈移动到鼠标位置
                painter_canvas.x = x;
                painter_canvas.y = y;

                // 更新画布
                drawPains();
            }
        }
    }

    painter_canvas.onmouseup = stopDragging;
    painter_canvas.onmouseout = stopDragging;
    painter_canvas.onmousemove = dragCircle;
    painter_canvas.onmousedown = startDragging;

    function reListenAllInput() {
        var layerInfoBarList = document.getElementById('layerInfoBarList');
        for (var oneInfoBar of layerInfoBarList.children) {
            oneInfoBar.addEventListener('change',function(){   
                drawPains();
            });   
        }
    }


    //初始化-订阅事件
    var init = function (){
        
        var layerInfoBarList = document.getElementById('layerInfoBarList');
        layerInfoBarList.parentElement.lastElementChild.addEventListener('click',function(){
            console.log('lastChild click!!!!!');
            reListenAllInput();
            drawPains();
        });        
       
        layerInfoBarList.children[0].addEventListener('change',function(){   
            drawPains();
        });   
        

    };


    (function () {
        startList.push(init);        
    })();