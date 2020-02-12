//部分常用构造函数和方法
//添加函数
function addLoadEvent(func){
    var oldonload=window.onload;
    if(typeof window.onload!='function'){
        window.onload=func;
    }else{
        window.onload=()=>{
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
//分隔线-------------------------------------------------------------
/*
//主体部分
//跳转页面按钮功能
function toRegister(){
    var button=document.getElementById("toRegister");
    var first=document.getElementById("div2-1");
    var register=document.getElementById("form1");
    if(register){
        button.onclick=()=>{
            first.style.visibility="hidden";
            register.style.visibility="visible";
        }
    }
}
function toLogin(){
    var button=document.getElementById("toLogin");
    var first=document.getElementById("div2-1");
    var login=document.getElementById("form2");
    if(login){
        button.onclick=()=>{
            first.style.visibility="hidden";
            login.style.visibility="visible";
        }
    }
}
//跳转页面onload
function onloadFirst(){
    (function(){
        var first=document.getElementById("div2-1");
        if(first){
            first.style.visibility="visible";
        }
    }());
}
//注册页面跳转按钮
function goLogin(){
    var button=document.getElementById("change1");
    var register=document.getElementById("form1");
    var login=document.getElementById("form2");
    if(register){
        button.onclick=()=>{
            register.style.visibility="hidden";
            login.style.visibility="visible";
        }
    }
}
//登陆页面跳转按钮
function goRegister(){
    var button=document.getElementById("change2");
    var register=document.getElementById("form1");
    var login=document.getElementById("form2");
    if(register){
        button.onclick=()=>{
            login.style.visibility="hidden";
            register.style.visibility="visible";
        }
    }
}
//登陆注册页面文本框输入限制
function inputLimit(){
    var textEmail=document.getElementById("Email");
    if(textEmail){
        textEmail.type="email";
        var inputText=document.getElementsByTagName("input");
        for(let i=0;i<inputText.length;i++){
            inputText[i].setAttribute("required",true);
        }
    }
}
//检测注册两次密码是否相同
function checkPassword(){
    if(!document.getElementById("form1"))return false;
    function check(){
        //var声明变量必须在check（）中 在checkPassword（）中声明则无法读取
        var password=document.form1.password.value;
        var passwordAgain=document.form1.passwordAgain.value;    
        if(password===passwordAgain){
            return true;
        }else{
            return false;
        }    
    }
    document.form1.onsubmit=()=>{
        return check();
    }    
}
//使用php返回表单值
var xml;
function returnForm(){
    if(!document.getElementById("time"))return false;
    xml=new XMLHttpRequest();
    if(xml){
        var url="http://localhost/登陆注册/time.php";
        var data="item=time"
        xml.onload=thing;
        xml.open("post",url,true);
        xml.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xml.send(data);
    }
    setTimeout(returnForm,1000);
}
//xml onload验证函数 显示表单数据
function thing(){
    if (xml.readyState == 4){
        if ((xml.status >= 200 && xml.status < 300) || xml.status == 304){
            var obj=xml.responseText;
            var reg=/\{.*:.*\}/;
            var obj1=reg.exec(obj).toString().substring(1,25);
            var time=document.getElementById("time");
            time.innerHTML=obj1;
        }
    }        
}
//右上角显示用户名
function showUserName(){
    var userName=document.getElementById("div1-1-2");
    var cookies=document.cookie;
    if(cookies!==""){
        var reg=new RegExp("：.*邮箱","i");
        var fname=reg.exec(cookies);
        var sname=fname.toString();
        if(sname!==""){
            var tname="用户："+sname.substring(1,sname.length-6)+" 已注册"
            userName.innerHTML=tname;
        }
    }
}
//页面图片切换函数 onmouseover 第三版新加入
function removes(value){
    var div=document.getElementById("div1-1");
    switch(value){
        case 0:
            document.body.style.backgroundImage='url(images/01.jpg)';
            div.classList.remove("div2");
            div.classList.remove("div3");
            div.classList.remove("div4");
            div.classList.remove("div5");  
            addClass(div,"div1");
            break;
        case 1:
            document.body.style.backgroundImage='url(images/02.jpg)';
            div.classList.remove("div1");
            div.classList.remove("div3");
            div.classList.remove("div4");
            div.classList.remove("div5");  
            div.classList.add("div2");
            break;
        case 2:
            document.body.style.backgroundImage='url(images/03.jpg)';
            div.classList.remove("div1");
            div.classList.remove("div2");
            div.classList.remove("div4");
            div.classList.remove("div5");  
            div.classList.add("div3");
            break;
        case 3:
            document.body.style.backgroundImage='url(images/04.jpg)';
            div.classList.remove("div1");
            div.classList.remove("div2");
            div.classList.remove("div3");
            div.classList.remove("div5");  
            div.classList.add("div4");
            break;
        case 4:        
            document.body.style.backgroundImage='url(images/05.jpg)';
            div.classList.remove("div1");
            div.classList.remove("div2");
            div.classList.remove("div3");
            div.classList.remove("div4");  
            div.classList.add("div5");
            break;
    }
}
//mouseover按钮网页背景变化 第三版修改
function changeBackground(){
    var a=document.getElementsByTagName("a");
    var div=document.getElementById("div1-1");
    //获得a标签数组的下标index
    for(let i=0;i<a.length;i++){
        a[i].index=i;
    }
    a[0].onmouseover=function(){
        removes(this.index);
    }
    a[1].onmouseover=function(){
        removes(this.index);
    }
    a[2].onmouseover=function(){
        removes(this.index);
    }
    a[3].onmouseover=function(){
        removes(this.index);
    }
    a[4].onmouseover=function(){
        removes(this.index);
    }
}
//以下为cookie数据处理
//显示表单数据
function showCookie(){
    var div=document.getElementById("div2-1a");
    if(div){
        div.innerHTML=document.cookie;
    }
}
//获得表单值并储存
function getInfo(){
    //为提交前确认 按钮type由submit改为button
    var button1=document.getElementById("button1");
    if(button1){
        var userName=document.form1.userName;
        var email=document.form1.Email;
        var password=document.form1.password;
        var passwordAgain=document.form1.passwordAgain;
        function getAndSetInfo(){
            if(password.value==passwordAgain.value&&password.value!==""&&userName.value!==""&&email.value!==""){
                //存取cookie
                document.cookie="用户名："+userName.value+"<br>"+"邮箱:"+email.value+"<br>"+"密码:"+password.value+"<br>";
            }else{
                alert("请检查输入内容");
            }
        }
        button1.onclick=()=>{
            getAndSetInfo();
        }
    }
}
//onsubmit 第二版已废弃

function onSub(){
    var button1=document.getElementById("button1");
    button1.onclick=()=>{
        return false;
    }
}
function onSubm(){
    var button1=document.getElementById("button1");
    button1.onclick=()=>{
        return true;
    }
}
*/
//以上
//分割线---------------------------------------------------------------------------------------
//分割线---------------------------------------------------------------------------------------
//分割线---------------------------------------------------------------------------------------
//分割线---------------------------------------------------------------------------------------
//分割线---------------------------------------------------------------------------------------
//jq重构代码
function toRegister(){
    if($("#toRegister")){
        $("#toRegister").click(()=>{
            $("#div2-1").css("visibility","hidden");
            $("#form1").css("visibility","visible");
        })
    }
}
function toLogin(){
    if($("#toLogin")){
        $("#toLogin").click(()=>{
            $("#div2-1").css("visibility","hidden");
            $("#form2").css("visibility","visible");
        })
    }
}
//跳转页面onload
function onloadFirst(){
    (function(){
        if($("#div2-1")){
            $("#div2-1").css("visibility","visible");
        }
    }());
}
//注册页面跳转按钮
function goLogin(){
    if($("#change1")){
        $("#change1").click(()=>{
            $("#form1").css("visibility","hidden");
            $("#form2").css("visibility","visible");
        })
    }
}
//登陆页面跳转按钮
function goRegister(){
    if($("#change2")){
        $("#change2").click(()=>{
            $("#form2").css("visibility","hidden");
            $("#form1").css("visibility","visible");
        })
    }
}
//登陆注册页面文本框输入限制
function inputLimit(){
    if($("#Email")){
        $("#Email").attr("type","email");
        $("input").attr("required","true");
    }
}
//检测注册两次密码是否相同
function checkPassword(){
    if(!$("#form1"))return false;
    function check(){
        //var声明变量必须在check（）中 在checkPassword（）中声明则无法读取
        if($("input[name='password']").val()===$("input[name='passwordAgain']").val()){
            return true;
        }else{
            return false;
        }    
    }
    $("#form1").submit(()=>{
        return check();
    })   
}
//使用php返回表单值
function returnForm(){
    if(!$("#time"))return false;
    $.ajax({
        type: "POST",
        url: "http://localhost/登陆注册/time.php",
        data: "item=time",
        success: function (data) {
            var date=data.substring(1,data.length-1);
            $("#time").html(date);
        }
    });
    setTimeout(returnForm,1000);
}
//页面图片切换函数 onmouseover 第三版新加入
function removes(value){
    switch(value){
        case 0:
            $("body").css("backgroundImage","url(images/01.jpg)");
            $("#div1-1").removeClass(); 
            $("#div1-1").addClass("div div1");
            break;
        case 1:
            $("body").css("backgroundImage","url(images/02.jpg)");
            $("#div1-1").removeClass(); 
            $("#div1-1").addClass("div div2");
            break;
        case 2:
            $("body").css("backgroundImage","url(images/03.jpg)");
            $("#div1-1").removeClass(); 
            $("#div1-1").addClass("div div3");
            break;
        case 3:
            $("body").css("backgroundImage","url(images/04.jpg)");
            $("#div1-1").removeClass(); 
            $("#div1-1").addClass("div div4");
            break;
        case 4:        
            $("body").css("backgroundImage","url(images/05.jpg)");
            $("#div1-1").removeClass(); 
            $("#div1-1").addClass("div div5");
            break;
    }
}
//mouseover按钮网页背景变化 第三版修改
function changeBackground(){
    $("a").each(function (i,o) { 
        $(o).mouseover(function(){
            removes(i);
        })
    });
 }
//以下为cookie数据处理
//获得表单值并储存
function getInfo(){
    //为提交前确认 按钮type由submit改为button
    if($("#button1")){
        function getAndSetInfo(){
            if($("input[name='password']").val()===
            $("input[name='passwordAgain']").val()&&
            $("input[name='password']").val()!=""&&
            $("input[name='userName']").val()!=""&&
            $("input[name='Email']").val()!=""){
                //存取cookie
                document.cookie=
                "用户名："+$("input[name='userName']").val()+"<br>"+
                "邮箱:"+$("input[name='Email']").val()+"<br>"+
                "密码:"+$("input[name='password']").val()+"<br>";
            }else{
                alert("请检查输入内容");
            }
        }
        $("#button1").click(()=>{
            getAndSetInfo();
        })
    }
}
//显示表单数据
function showCookie(){
    if($("#div2-1a")){
        $("#div2-1a").html(document.cookie);
    }
}
//右上角显示用户名
function showUserName(){
    if(document.cookie!==""){
        var reg=new RegExp("：.*邮箱","i");
        var sname=reg.exec(document.cookie).toString();
        if(sname!==""){
            var tname="用户："+sname.substring(1,sname.length-6)+" 已注册"
            $("#div1-1-2").html(tname);
        }
    }
}
//分割线--------------------------------------------------------------
//分割线--------------------------------------------------------------
//执行函数 第一版
addLoadEvent(toRegister());
addLoadEvent(toLogin());
addLoadEvent(onloadFirst());
addLoadEvent(goLogin());
addLoadEvent(goRegister());
addLoadEvent(inputLimit());
//getinfo（）第一版函数 后取消调用 放弃cookie使用php返回表单数据
//发现php无法回传数据 错误200 cookie先凑合用吧
addLoadEvent(getInfo());
addLoadEvent(showCookie());
addLoadEvent(showUserName());
addLoadEvent(changeBackground());
//第二版新加入下列函数
addLoadEvent(checkPassword());
//无法在html提交表单后从php回传数据到html 疑似需要数据库
//新增php回传本地时间 需调用以下函数
addLoadEvent(returnForm());
//完成于2019.7.25 19：00第一版
//第二版初改于2019.8.12 19：30
//第二版完成于2019.8.14 16：30
//第三版初改于2019.9.3 改进了部分函数，添加了es6语法：箭头函数
//于2019.9.4 整体改为了jq代码 更加方便 总体行数减少
//第三版完成于2019.9.5 修改部分函数逻辑