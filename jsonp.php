<?php
    $phpParams = '"phpParam"';
    $phpParams = ["phpParmKey" => "phpParamValue"];
    $a = $_GET['a'];
    $callback = isset($_GET['callback']) ? $_GET['callback'] : 'jsonpFunction';
    echo $callback . '(' . json_encode($phpParams) . ')';
?>