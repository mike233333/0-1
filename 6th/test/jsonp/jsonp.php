<?php
    $key1=$_GET['name'];
    $key2=$_GET['password'];
    $callback=$_GET['callback'];
    $val="'this is the message send by php'";

    if($key1==='mike'&&$key2==='123'){
        echo $callback .'('.$val.')';
    }
?>