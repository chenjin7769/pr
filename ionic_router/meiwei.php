<?php
	header('Content-type:text/html;charset=utf-8');
    $ch = curl_init();
    $Numb = $_GET['Numb'];
    $url = 'http://apis.juhe.cn/cook/index?cid='.$Numb.'&dtype=&pn=&rn=30&format=&key=c15bbaa345e416caac2411939ffb2486';
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    // 执行HTTP请求
    curl_setopt($ch , CURLOPT_URL , $url);
    $res = curl_exec($ch);

    //var_dump(json_decode($res));
	echo $res;
?>