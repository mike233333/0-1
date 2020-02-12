<?php
//头部信息
header("Content-Type:text/html;charest-utf-8");
//不保留缓存 暂不知具体用处
header("Cache-Control:no-cache");
//创建时间变量
$date=date("Y-m-d H:i:s");
//与html进行信息匹配
$item=$_POST["item"];
//匹配成功即发回数据
if($item=="p2"){
    echo $date;
}
?>