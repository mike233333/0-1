//拖拽元素函数
function drag() {
    var li = document.getElementsByTagName("li");
    for (let i = 0; i < li.length; i++) {
        li[i].onmousedown = function () {
            var obj = event.target;
            var objX = obj.offsetLeft,
                objY = obj.offsetTop;
            var x = event.clientX - objX,
                y = event.clientY - objY;
            document.onmousemove = function () {
                obj.style.position = "absolute";
                var left = event.clientX - x;
                var top = event.clientY - y;
                obj.style.left = left + "px";
                obj.style.top = top + "px";
            }
            document.onmouseup = function () {
                document.onmousemove = false;
                auto(obj);
            }
        }
    }
}
//元素自动嵌入函数
function auto(obj){
    var ul1=document.getElementsByTagName("ul")[0],
        ul2=document.getElementsByTagName("ul")[1];
    var objX=obj.offsetLeft;
    if(Math.abs(objX-ul1.offsetLeft)<80){
        ul1.appendChild(obj);
        obj.style.position="inherit";
    }else if(Math.abs(objX-ul2.offsetLeft)<80){
        ul2.appendChild(obj);
        obj.style.position="inherit";
    }
}
drag();