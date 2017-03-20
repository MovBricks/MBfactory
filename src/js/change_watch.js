    'use strict';

    function select_change_watch(Obj){
        
        var realWatchImg = document.getElementById("realWatchImg");

        if(Obj.value === "red"){
            realWatchImg.src = "img/real_watch_red.png";
        }
        else if(Obj.value === "blue"){
            realWatchImg.src = "img/real_watch_blue.png";
        }
    }