<?php
//头部信息
header("Content-Type:text/html;charest=utf-8");
header("Cache-Control:no-cache");
//取得表单数据
$userName=$_POST["userName"];
$Email=$_POST["Email"];
$password=$_POST["password"];
//发回数据
$info='用户名:'.$userName.'';
$info1='邮箱:'.$Email.'';
$info2='密码:'.$password.'';
echo $info."<br/>";
echo $info1."<br/>";
echo $info2."<br/>";
//echo直接输出link
echo "<a href='index.html'>前往首页</a>";
//新型字符串输出link
$str=<<<mark
    <a href="empty.html">查看时间</a>
mark;
echo $str;
//下面是在代码块外输出link
?>
 <a href="about.html">前往关于</a>