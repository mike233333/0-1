//常用函数
function addLoadEvent(func){
    var oldonload=window.onload;
    if(typeof window.onload!='function'){
        window.onload=func;
    }else{
        window.onload=function(){
            oldonload();
            func();
        }
    }
}
//分隔线-----------------------------------------------------------
/*
//旧版
//图片展示
function showPhoto(){
    var photo=document.getElementById("photo");
    var img=document.createElement("img");
    img.setAttribute("src","images/06.jpg");
    img.setAttribute("alt","");
    img.setAttribute("id","img1");
    photo.appendChild(img);
}
//移动元素函数
function moveElement(eleID,finalX,finalY,interval){
    var ele=document.getElementById(eleID);
    if(ele.movement){
        clearTimeout(ele.movement);
    }
    if(!ele.style.top){
        ele.style.top="0px";
    }
    if(!ele.style.left){
        ele.style.left="0px";
    }
    var startX=parseFloat(ele.style.left),
    startY=parseFloat(ele.style.top),
    dist=0;
    if(startX>finalX){
        dist=Math.ceil((startX-finalX)/10);
        startX=startX-dist;
    }
    if(startX<finalX){
        dist=Math.ceil((finalX-startX)/10);
        startX=startX+dist;
    }
    if(startY>finalY){
        dist=Math.ceil((startY-finalY)/10);
        startY=startY-dist;
    }
    if(startY<finalY){
        dist=Math.ceil((finalY-startY)/10);
        startY=startY+dist;
    }
    ele.style.top=startY+"px";
    ele.style.left=startX+"px";
    var func="moveElement('"+eleID+"',"+finalX+","+finalY+","+interval+")";
    ele.movement=setTimeout(func,interval);
}
//自动滑动函数
function slideLeft(){
    var img1=document.getElementById("img1");
    if(!img1.style.left){
        img1.style.left="0px";
    }
    var left=parseFloat(img1.style.left);
    var remainder=left%640;
    if(remainder>=-320){
        left=left-remainder+640;
    }else{
        left=left-remainder+1280;
    }
    if(left>0){
        moveElement("img1",-2560,0,1);
    }else{
        moveElement("img1",left,0,1);
    }
}
function slideRight(){
    var img1=document.getElementById("img1");
    if(!img1.style.left){
        img1.style.left="0px";
    }
    var left=parseFloat(img1.style.left);
    var remainder=left%640;
    if(remainder>=-320){
        left=left-remainder-640;
    }else{
        left=left-1280-remainder;
    }
    if(left<-2560){
        moveElement("img1",0,0,1);
    }else{
        moveElement("img1",left,0,1);
    }
}
//设置移动
function slidePhoto(){
    var button1=document.getElementById("button1").getElementsByTagName("a");
    var thisHref;
    //onmouseover滑动
    for(var i=0;i<button1.length;i++){
        button1[i].onmouseover=function(){
            thisHref=this.getAttribute("href");
            if(thisHref.indexOf("01.jpg")!==-1){
                moveElement("img1",0,0,5);
            }
            if(thisHref.indexOf("02.jpg")!==-1){
                moveElement("img1",-640,0,5);
            }
            if(thisHref.indexOf("03.jpg")!==-1){
                moveElement("img1",-1280,0,5);
            }
            if(thisHref.indexOf("04.jpg")!==-1){
                moveElement("img1",-1920,0,5);
            }
            if(thisHref.indexOf("05.jpg")!==-1){
                moveElement("img1",-2560,0,5);
            }
        }
    }
    //onclick滑动
    var button3=document.getElementById("button3").getElementsByTagName("a");
    for(var i=0;i<button3.length;i++){
        button3[i].onclick=function(){
            thisHref=this.childNodes[0].nodeValue;
            if(thisHref=="1"){
                moveElement("img1",0,0,5);
            }
            if(thisHref=="2"){
                moveElement("img1",-640,0,5);
            }
            if(thisHref=="3"){
                moveElement("img1",-1280,0,5);
            }
            if(thisHref=="4"){
                moveElement("img1",-1920,0,5);
            }
            if(thisHref=="5"){
                moveElement("img1",-2560,0,5);
            }
        }
    }
    //两侧按钮
    var image1=document.getElementById("image1");
    image1.onclick=function(){
        slideLeft();
    }
    var image2=document.getElementById("image2");
    image2.onclick=function(){
        slideRight();
    }
}
//自动滑动
function autoSlide(){
    var photo=document.getElementById("photo");
    var time=setInterval("slideRight()",3000);
    photo.onmousemove=function(){
        clearInterval(time);
    }
    photo.onmouseout=function(){
        autoSlide();
    }
}
*/
//分隔线-----------------------------------------------------------
//图片展示
function showPhoto(){
    var img=$("<img>");
    img.attr({src:"images/06.jpg",alt:"",id:"img1"});
    $("#photo").append(img);
}
//移动元素函数 jq版本会无法使用 原因不明 猜测是jq动态获取eleID发生问题
//后发现是定时器声明变量问题 在函数外声明即可
//使用块级作用域防止变量声明污染全局作用域
//另外块级作用域里声明的函数可以在外部调用
//以下为块作用域开始
{
    let time;
    function moveElement(eleID,finalX,finalY,interval){
        var ele=$(`#${eleID}`);
        if(time){
            clearTimeout(time);
        }
        if(!ele.css("top")){
            ele.css("top","0px"); 
        }
        if(!ele.css("left")){
            ele.css("left","0px");
        }
        var startX=parseFloat(ele.css("left")),
        startY=parseFloat(ele.css("top")),
        dist=0;
        if(startX>finalX){
            dist=Math.ceil((startX-finalX)/10);
            startX=startX-dist;
        }
        if(startX<finalX){
            dist=Math.ceil((finalX-startX)/10);
            startX=startX+dist;
        }
        if(startY>finalY){
            dist=Math.ceil((startY-finalY)/10);
            startY=startY-dist;
        }
        if(startY<finalY){
            dist=Math.ceil((finalY-startY)/10);
            startY=startY+dist;
        }
        ele.css("top",startY+"px");
        ele.css("left",startX+"px");
        var func=`moveElement("${eleID}",${finalX},${finalY},${interval})`;
        time=setTimeout(func,interval);
    }
}
//块作用域结束
//自动滑动函数
function slideLeft(){
    if(!$("#img1").css("left")){
        $("#img1").css("left","0px");
    }
    var left=parseFloat($("#img1").css("left"));
    var remainder=left%640;
    if(remainder>=-320){
        left=left-remainder+640;
    }else{
        left=left-remainder+1280;
    }
    if(left>0){
        moveElement("img1",-2560,0,1);
    }else{
        moveElement("img1",left,0,1);
    }
}
function slideRight(){
    if(!$("#img1").css("left")){
        $("#img1").css("left","0px");
    }
    var left=parseFloat($("#img1").css("left"));
    var remainder=left%640;
    if(remainder>=-320){
        left=left-remainder-640;
    }else{
        left=left-1280-remainder;
    }
    if(left<-2560){
        moveElement("img1",0,0,1);
    }else{
        moveElement("img1",left,0,1);
    }
}
//公共移动函数
function slide(value){
    switch(value){
        case "1":
            moveElement("img1",0,0,5);
            break;
        case "2":
            moveElement("img1",-640,0,5);
            break;
        case "3":
            moveElement("img1",-1280,0,5);
            break;
        case "4":
            moveElement("img1",-1920,0,5);
            break;
        case "5":
            moveElement("img1",-2560,0,5);
            break;
    }
}
//设置移动
function slidePhoto(){
    //onmouseover滑动
    $("#button1 a").mouseover(function(){
        slide($(this).text());
    });
    //onclick滑动
    $("#button3 a").click(function(){
        slide($(this).text());
    })
    //两侧按钮
    $("#image1").click(()=>{
        slideLeft();
    });
    $("#image2").click(()=>{
        slideRight();
    });
}
//自动滑动 jq版本出错 似乎jq和定时器有关则出错
//调整函数执行逻辑后可用 之前疑似函数尾调用自身出错
function autoSlide(){
    var time=setInterval("slideRight()",3000);
    $("#photo").mousemove(()=>{
        clearInterval(time);
    })
    $("#photo").mouseout(()=>{
        time=setInterval("slideRight()",3000);
    })
}
addLoadEvent(showPhoto());
addLoadEvent(slidePhoto());
addLoadEvent(autoSlide());
//2019.9.5第二版 增加es6语法 和修改为jq版本 部分问题暂未解决
//2019.9.6第二版 完成 全面改为jq版本 修改部分函数逻辑