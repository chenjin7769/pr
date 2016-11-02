<?php
	header('Content-type:text/html;charset=utf-8');
	//$month = $_GET['month'];
	//$date = $_GET['date'];
	$SID = $_GET['serC'];
    $ch = curl_init();
    $url = 'http://apis.juhe.cn/cook/query.php?menu='.$SID.'&dtype=&pn=&rn=&albums=&=&key=c15bbaa345e416caac2411939ffb2486';
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    // 执行HTTP请求
    curl_setopt($ch , CURLOPT_URL , $url);
    $res = curl_exec($ch);

    //var_dump(json_decode($res));
	echo $res;
?>