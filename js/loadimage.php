<?php
$updir = "data";
$tmp = $_FILES['loadimage']['tmp_name'];
$copy = $_FILES['loadimage']['name'];
move_uploaded_file($tmp,"$updir/$copy");
echo "$updir/$copy";
?>
