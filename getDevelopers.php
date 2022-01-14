<?php 
if($_SERVER['REQUEST_METHOD']=='GET') {

    require_once 'dbconnect.php';
    $upit = "SELECT * FROM developers";
    $rez = mysqli_query($konekcija,$upit);
    $developers = [];
    if($rez) {
        while($r = mysqli_fetch_assoc($rez)) {
            $developers['data'][] = $r;
          }
        echo json_encode($developers['data']);
        mysqli_close($konekcija);
    }
    else {
        http_response_code(404);
    }

}
?>