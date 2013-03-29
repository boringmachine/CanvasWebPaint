<?php
$str = $_POST['src'];
$str=str_replace("data:image/png;base64,","",$str);
$str = base64_decode($str);
header('Content-Type: image/png');
header("Cache-control: no-cache");
header('Content-Disposition: attachment; filename="download.png"');
echo $str;
?>
