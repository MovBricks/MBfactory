    'use strict'

   

    //点击名字切换仓库
    var imgBoxIndex = 0;

    function click_switch_img_box_handler(clickObj) {
        console.log('click_switch_img_box_handler:' + clickObj.innerHTML);

        for (var i = 0; i <= clickObj.parentNode.parentNode.children.length - 2; i++) {
            clickObj.parentNode.parentNode.children[i].setAttribute("class", "");
        }

        clickObj.parentNode.setAttribute("class", "boxNameStringSelect");

        var imgAllBoxs = document.getElementById('imgBoxAndboxName').children[1];

        for (var imgBox of imgAllBoxs.children) {
            imgBox.setAttribute("class", "imgBox hide");
        }

        var pattImgBoxIndex = new RegExp("\\d+");
        var str = pattImgBoxIndex.exec(clickObj.innerHTML);
        imgBoxIndex = parseInt(str) - 1;

        imgAllBoxs.children[imgBoxIndex].setAttribute("class", "imgBox show");
    }

    //删除图片仓库index
    function remove_img_box_handler(Obj) {
        console.log('remove_img_box_handler');

        var parObj = Obj.parentNode;
        var parparObj = parObj.parentNode;

        //删除仓库名数组中对应的名字
        var child_idx = imgBoxNameArray.indexOf(parObj.children[0].innerHTML);
        imgBoxNameArray.splice(child_idx,1);

        //仓库内容节点        
        var imgBoxList = document.getElementById('imgBoxList');
        imgBoxList.removeChild(imgBoxList.children[child_idx]);

        //删除上传数据对象
        delete uploadDate[child_idx.toString()];

        //删除仓库名字节点
        parparObj.removeChild(parObj);

        drawPains();
    }

    //增加图片仓库index
    function add_img_box_handler() {
        console.log('add_img_box_handler');
       

        //修改仓库名字
        var boxNameBarList = document.getElementById('boxNameBarList');

        var boxNameNewItem = document.createElement("li"); //创建节点

            //创建仓库名节点
            var newNameString = document.createElement("div"); 
            newNameString.setAttribute("class", "boxNameString");
            newNameString.setAttribute("onclick", "click_switch_img_box_handler(this)");

            var lastNameStr = boxNameBarList.children[boxNameBarList.children.length-2].children[0].innerHTML;                
            var nameIdx = parseInt(lastNameStr.replace(/\D/g,""))+1;
            var nameStr = lastNameStr.replace(/\d/g,"");
                    
            newNameString.innerHTML = nameStr + nameIdx; //设置文字内容
            boxNameNewItem.appendChild(newNameString);

            //创建仓库名删除按键
            var newNameButton = document.createElement("button"); 
            newNameButton.setAttribute("onclick", "remove_img_box_handler(this)");
            boxNameNewItem.appendChild(newNameButton);
        
        //添加之前加入数组
        imgBoxNameArray.push(newNameString.innerHTML);

        boxNameBarList.insertBefore(boxNameNewItem,boxNameBarList.lastElementChild);//添加节点
        
       

        //修改仓库内容
        var imgAllBoxs = document.getElementById('imgBoxList');

        // for (var imgBox of imgAllBoxs.children) {
        //     imgBox.setAttribute("class", "imgBox hide");
        // }

        var imgBoxNewItem = document.createElement("li"); //创建节点
        imgBoxNewItem.setAttribute("class", "imgBox hide"); //设置class属性

        imgBoxNewItem.innerHTML = '<div class="previewContainer"></div><div class="up_img_btn_box"><button onclick="up_img_btn_face()"><img src="img/img_plus.gif"/></button></div></div>'; //设置节点内容

        imgAllBoxs.appendChild(imgBoxNewItem); //添加仓库内容节点        
    }


    //修改图片上传按键
    function up_img_btn_face() {
        document.getElementById('upload_img_btn').click();
    }

    //上传图片预览处理函数
    function up_img_preview_handler(fileInput) {
        console.log('change...');
        //var fileInput = document.getElementById('upload_img_btn');
        if (!fileInput.value) {
            // info.innerHTML = '没有选择文件';
            return;
        }


        for (var file of fileInput.files) {

            //var file = fileInput.files[i];            

            //info.innerHTML = file.name;
            if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/bmp') {
                alert('不是有效的图片文件!');
                return;
            }

            uploadDate.append(imgBoxIndex.toString(),file);

            var reader = new FileReader();
            reader.onload = function (e) {
                console.log('reader.onload');
                var data = e.target.result;

                var imgInput = document.createElement("img"); //创建input
                imgInput.setAttribute("class", "previewTray"); //设置class属性

                //imgInput.style.backgroundImage='url('+ data +')';//设置背景图
                imgInput.src = data;

                var previewContainer = document.getElementsByClassName('previewContainer')[imgBoxIndex];
                previewContainer.appendChild(imgInput); //插入到previewContainer内  
                drawPains();                 
            };

            reader.readAsDataURL(file);
        }
    }

    //初始化订阅事件
    var init = function (){       
        

        imgBoxNameArray.push(
            document.getElementById('boxNameBarList').children[0].children[0].innerHTML
        );


        //订阅事件-图片上传
        var fileInput = document.getElementById('upload_img_btn');

        fileInput.addEventListener('change', function () {
            up_img_preview_handler(document.getElementById('upload_img_btn'));
        });
    };

    var exit = function (){
            
        var fileInput = document.getElementById('upload_img_btn');

        fileInput.removeEventListener('change', function () {
            up_img_preview_handler(document.getElementById('upload_img_btn'));
        });  
    };

    (function () {
        startList.push(init);
        exitList.push(exit);
    })();