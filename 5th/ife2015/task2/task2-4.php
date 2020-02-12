<?php
//头部
header("Content-Type:text/html;charest=utf-8");
header("Cache-Control:no-cache");
//下面设置头部为所有域名都可访问 不加会产生跨域禁止访问的问题
//数据
$thing1=array("text1","text23","text456","text7890","wahaha","mehaha","mehaha1122","wowowo1111");
//遍历数组
for($i=0;$i<count($thing1);$i++){
    //发回
    echo $thing1[$i].",";
}
?>