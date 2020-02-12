//部分常用构造函数和方法
//添加函数
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
//插入后方
function insertAfter(newElement,targetElement){
    var par=targetElement.parentNode;
    if(par.lastChild==targetElement){
        par.appendChild(newElement);
    }else{
        par.insertBefore(newElement,targetElement.nextSibling);
    }
}
//添加格式
function addClass(element,value){
    if(!element.className){
        element.className=value;
    }else{
        newClassName=element.className;
        newClassName+=" ";
        newClassName+=value;
        element.className=newClassName;
    }
}
//兼容方法
var EventUtil = {
    addHandler: function (element, type, handler) {
            if (element.addEventListener) {
            element.addEventListener(type, handler, false);
            }
            else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
            }
            else {
            element["on" + type] = handler;
            }
    },
    removeHandler: function (element, type, handler) {
            if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
            }
            else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
            }
            else {
            element["on" + type] = null;
            }
    },
    getEvent: function (event) {
            return event ? event : window.event;
    },
    getTarget: function (event) {
            return event.target || event.srcElement;
    },
    preventDefault: function (event) {
            if (event.preventDefault) {
            event.preventDefault();
            }
            else {
            event.returnValue = false;
            }
    },
    /********由于IE不支持事件捕获，因此这个方法只适用于事件冒泡阶段*********/
    stopPropagation: function (event) {
            if (event.stopPropagation) {
            event.stopPropagation();
            }
            else {
            event.cancelBubble = true;
            }
    },
    /*****按键时触发，返回按键所代表字符的ASCII码******/
    getCharCode: function (event) {
            if (typeof event.charCode == "number") {
            return event.charCode;
            }
            else {
            return event.keyCode; //IE8之前、Opera
            }
    }
}
//分割线-------------------------------------------------
/*
//发送按钮功能
var button1=document.getElementById("button1");
var button2=document.getElementById("button2");
var text1=document.getElementById("text1");
var div1=document.getElementById("div1");
//获得当前用户名
var trueName;
function getName(){
    var name=prompt("欢迎使用！\n请输入用户名","");
    if(name==""){
        var name="Anonymous";
        alert("匿名也不是不行啦。。。\n欢迎使用，Anonymous! ");
    }else if(typeof(name)=="string"){
        alert("欢迎使用,"+name+"!");
    }else{
        getName();
    }
    function go(){
        return name;
    }
    trueName=go();
}
//输出文本
function sendText(){
    //获得当前时间
    var newDate=new Date();
    var now=newDate.toLocaleString();
    //取得文本节点
    var value=text1.innerHTML;
    if(value!==""){
        var textNode1=document.createTextNode(trueName+" "+now);
        var p=document.createElement("p");
        //暂无法直接插入换行符，只能用这种麻烦方法
        var br=document.createElement("br");
        p.appendChild(textNode1);
        p.appendChild(br);
        var textNode2=text1.innerHTML;
        div1.appendChild(p);
        var p2=document.createElement("p");
        p2.innerHTML=textNode2;
        div1.appendChild(p2);
    }
};
button1.onclick=function(){
    sendText();
    text1.innerHTML="";
};
//清除按钮功能
function cleanText(){
    div1.innerHTML="";
};
button2.onclick=function(){
    cleanText();
};
//大概初步完成了吧 写于2019.7.17 20：30
//界面右上显示当前时间 第二版已废弃
var p2=document.getElementById("p2");
function showName(){
    var newDate=new Date();
    var now=newDate.toLocaleString();
    p2.innerHTML=now;
    setInterval(showName,1000);
}
//表情部分
//图片数组
var photo=[
    "<img name='1' src='image/01.jpg'></img>",
    "<img name='2' src='image/02.jpg'></img>",
    "<img name='3' src='image/03.jpg'></img>",
    "<img name='4' src='image/04.jpg'></img>",
    "<img name='5' src='image/05.jpg'></img>",
    "<img name='6' src='image/06.jpg'></img>",
    "<img name='7' src='image/07.jpg'></img>",
    "<img name='8' src='image/08.jpg'></img>",
    "<img name='9' src='image/09.jpg'></img>",
    "<img name='10' src='image/10.jpg'></img>",
    "<img name='11' src='image/11.jpg'></img>",
];
function showPhoto(){
    var divPhoto=document.getElementById("div2-1");
    var ulPhoto="";
    var ul=document.createElement("ul");
    for(var i=0,len=photo.length;i<len;i++){
        ulPhoto+="<li>"+photo[i]+"</li>";
    }
    divPhoto.appendChild(ul);
    ul.innerHTML=ulPhoto;
};
//表情按钮显示
function cleanHidden(){
    var button3=document.getElementById("button3");
    var ul=document.getElementsByTagName("ul")[0];
    button3.onclick=function(){
        ul.style.visibility="visible";
        setTimeout(returnButton(),10);
    }
    function showButton(){
        button3.value="表情";
        button3.onclick=function(){
            ul.style.visibility="visible";
            setTimeout(returnButton(),10);
        }
    }
    function returnButton(){
        button3.value="隐藏";
        button3.onclick=function(){
            ul.style.visibility="hidden";
            setTimeout(showButton(),10);
        }
    }
};
function addPhoto(){
    var img=document.getElementsByTagName("img");
    var text=document.getElementById("text1");
    function addP(thisSrc){
        var newImg=document.createElement("img");
        newImg.src=thisSrc;
        text.appendChild(newImg);
    }
    for(var i=0,len=img.length;i<len;i++){
        img[i].onclick=function(){
            addP(this.src);
        }
    }
}
//php回传更新本地时间
function showTime(){
    if(!document.getElementById("p2"))return false;
    xml=new XMLHttpRequest();
    if(xml){
        var url="http://localhost/留言板/date.php";
        var data="item=p2";
        xml.onload=handle;
        xml.open("post",url,true);
        xml.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xml.send(data);
    }
    //每秒更新一次时间
    update=setTimeout(showTime,1000);
}
//xml处理函数handle
function handle(){
    if(xml.readyState==4){
        if ((xml.status >= 200 && xml.status < 300) || xml.status == 304){
            var obj=xml.responseText;
            var p2=document.getElementById("p2");
            p2.innerHTML=obj;
        }
    }
}
*/
//分割线-------------------------------------------------------------------
//分割线-------------------------------------------------------------------
//分割线-------------------------------------------------------------------
//分割线-------------------------------------------------------------------
//分割线-------------------------------------------------------------------
//jq代码
//获得当前用户名
var trueName;
function getName(){
    var name=prompt("欢迎使用！\n请输入用户名","");
    if(name==""){
        var name="Anonymous";
        alert("匿名也不是不行啦。。。\n欢迎使用，Anonymous! ");
    }else if(typeof(name)=="string"){
        alert("欢迎使用,"+name+"!");
    }else{
        getName();
    }
    function go(){
        return name;
    }
    trueName=go();
}
//输出文本
function sendText(){
    //获得当前时间
    var newDate=new Date();
    var now=newDate.toLocaleString();
    //取得文本节点
    if($("#text1").html()!==""){
        $("<p></p>").text(trueName+" "+now).appendTo($("#div1"));
        $("<p></p>").html($("#text1").html()).appendTo($("#div1"));
    }
};
//按钮功能
function button(){
    //点击发送按钮输出文本并清除当前
    $("#button1").click(()=>{
        sendText();
        $("#text1").html("");
    });
    //清屏按钮功能
    $("#button2").click(()=>{
        $("#div1").html("");
    });
}
//大概初步完成了吧 写于2019.7.17 20：30
//表情部分
//图片数组
var photo=[
    "<img name='1' src='image/01.jpg'></img>",
    "<img name='2' src='image/02.jpg'></img>",
    "<img name='3' src='image/03.jpg'></img>",
    "<img name='4' src='image/04.jpg'></img>",
    "<img name='5' src='image/05.jpg'></img>",
    "<img name='6' src='image/06.jpg'></img>",
    "<img name='7' src='image/07.jpg'></img>",
    "<img name='8' src='image/08.jpg'></img>",
    "<img name='9' src='image/09.jpg'></img>",
    "<img name='10' src='image/10.jpg'></img>",
    "<img name='11' src='image/11.jpg'></img>",
];
function showPhoto(){
    var ulPhoto="";
    for(let i=0;i<photo.length;i++){
        ulPhoto+="<li>"+photo[i]+"</li>";
    }
    $("<ul></ul>").html(ulPhoto).appendTo($("#div2-1"))
};
//表情按钮显示
function cleanHidden(){
    $("#button3").click(()=>{
        $("ul").css("visibility","visible");
        setTimeout(returnButton(),10);
    });
    function showButton(){
        $("#button3").val("表情");
        $("#button3").click(()=>{
            $("ul").css("visibility","visible");
            setTimeout(returnButton(),10);
        })
    }
    function returnButton(){
        $("#button3").val("隐藏");
        $("#button3").click(()=>{
            $("ul").css("visibility","hidden");
            setTimeout(showButton(),10);
        })
    }
};
function addPhoto(){
    $("img").click(function(){
        $("<img></img>").attr("src",this.src).appendTo($("#text1"));
    });
}
//php回传更新本地时间
function showTime(){
    if(!$("#p2"))return false;
    $.ajax({
        type: "POST",
        url: "http://localhost/留言板/date.php",
        data: "item=p2",
        success: function (response) {
            $("#p2").html(response);            
        }
    });
    update=setTimeout(showTime,1000);
}
addLoadEvent(getName());
//第二版已废弃 addLoadEvent(showName());
//innerhtml更新时间 页面放置一段时间后会崩溃
addLoadEvent(showPhoto());
addLoadEvent(cleanHidden());
addLoadEvent(addPhoto());
//表情功能加入
//第二版加入函数 php后台回传本地时间
addLoadEvent(showTime());
//第三版修改button函数 集成按钮设置
addLoadEvent(button());
//完成于2019.7.20 14：00 第一版
//完成于2019.8.14 17：20 第二版
//完成于2019.9.5 第三版 添加es6语法 改为jq版本