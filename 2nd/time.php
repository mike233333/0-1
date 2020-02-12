<?php
//头部信息
header("Content-Type:text/html;charest=utf-8");
header("Cache-Control:no-cache");
//设置当地时间
$date=date("Y-m-d H:i:s",time()+6*3600);
//取得date
$item=$_POST["item"];
$info="";
if($item=="time"){
    $info='{本地时间:'.$date.'}';
};
//发回数据
echo $info;
?>