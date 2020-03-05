<?php
    //关于post的Content-Type的设置问题
    //前端不设定 然后在后端php里设定头部为application/x-www-form-urlencoded也是可以的
    header("Content-Type:text/html;charest=utf-8");

    //$fn=$_GET['fn'];
    //前端传入json时的接受方法 json_decode是解析json 另外第二个参数为true
    //而file_get_contents('php://input')则是取得传来数据 因为$_POST方法无法取得json
    //$key=json_decode(file_get_contents('php://input'),true)['name'];
        $date=date('y:m:d h:i:s',time()+6*3600);
    echo $date;
?>