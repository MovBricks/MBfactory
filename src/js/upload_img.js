    'use strict'
    //点击名字切换仓库
    var imgBoxIndex = 0;

    function click_switch_img_box_handler (clickObj) {
        console.log('click_switch_img_box_handler:' + clickObj.innerHTML);

        for (var i = 0; i <= clickObj.parentNode.childNodes.length - 1; i++) {
            clickObj.parentNode.childNodes[i].setAttribute("class", "boxNameString");
        }
        
        clickObj.setAttribute("class", "boxNameString boxNameStringSelect");

        var imgAllBoxs = document.getElementById('imgBoxAndboxName').childNodes[1];
        
        for(var imgBox of imgAllBoxs.childNodes){
            imgBox.setAttribute("class", "imgBox hide");
        }

        var pattImgBoxIndex = new RegExp("\\d+");
        var str = pattImgBoxIndex.exec(clickObj.innerHTML);
        imgBoxIndex = parseInt(str)-1;

        imgAllBoxs.childNodes[imgBoxIndex].setAttribute("class", "imgBox show");
    };


    //增加图片仓库index
    function add_img_box_handler () {
        console.log('add_img_box_handler');
        
        var imgBoxAndboxName = document.getElementById('imgBoxAndboxName');

        //修改仓库名字
        var boxNameBar = imgBoxAndboxName.childNodes[0];
        
        var boxNameNewItem = document.createElement("div");//创建节点
        boxNameNewItem.setAttribute("class","boxNameString");//设置class属性
        boxNameNewItem.setAttribute("onclick","click_switch_img_box_handler(this)");

        var boxNameNewItemIndex = boxNameBar.childNodes.length;
        boxNameNewItem.innerHTML = '仓库'+boxNameNewItemIndex;//设置文字内容
                
        boxNameBar.insertBefore(boxNameNewItem,boxNameBar.lastChild);//添加仓库名节点

        //修改仓库内容
        var imgAllBoxs = imgBoxAndboxName.childNodes[1];
        
        for(var imgBox of imgAllBoxs.childNodes){
            imgBox.setAttribute("class", "imgBox hide");
        }

        var imgBoxNewItem = document.createElement("div");//创建节点
        imgBoxNewItem.setAttribute("class","imgBox show");//设置class属性
        
        imgBoxNewItem.innerHTML = '<div class="previewContainer"></div><div class="up_img_btn_box"><button onclick="up_img_btn_face()"><img src="img/img_plus.gif"/></button></div></div>';//设置节点内容
                
        imgAllBoxs.appendChild(imgBoxNewItem);//添加仓库名节点

    };


    //修改图片上传按键
    function up_img_btn_face () {
        document.getElementById('upload_img_btn').click();
    };

    window.onload=function(){       

        //图片上传预览订阅事件
        var fileInput = document.getElementById('upload_img_btn');              

        fileInput.addEventListener('change',function(){
            console.log('change...');

            if (!fileInput.value){
                info.innerHTML = '没有选择文件';
                return ;
            }   


            for(var file of fileInput.files){                   
                
                //var file = fileInput.files[i];            

                //info.innerHTML = file.name;
                if(file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif'){
                    alert('不是有效的图片文件!');
                    return;
                }

                var reader = new FileReader();
                reader.onload=function(e){
                    console.log('reader.onload');
                    var data = e.target.result;

                    var imgInput=document.createElement("img");//创建input
                    imgInput.setAttribute("class","previewTray");//设置class属性
                    
                    //imgInput.style.backgroundImage='url('+ data +')';//设置背景图
                    imgInput.src=data;

                    var previewContainer = document.getElementsByClassName('previewContainer')[imgBoxIndex];
                    previewContainer.appendChild(imgInput);//插入到previewContainer内                   
                };

                reader.readAsDataURL(file);
            }
        });
    };
