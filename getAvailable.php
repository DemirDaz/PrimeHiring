<?php

if($_SERVER['REQUEST_METHOD']=='GET') {

  require 'dbconnect.php';
  $Start= $_GET['start'];
  


// if there is no record of developer in records, where end date of record is after sent START ....then show..
/// odmori, pa ispisi.
  $upit = "SELECT * FROM developers WHERE NOT EXISTS
	(SELECT null from hiring_records WHERE hiring_records.developerId = developers.id AND hiring_records.endDate > Date($Start) )";
  $rez  = mysqli_query($konekcija, $upit);

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

else {
    http_response_code(404);
    echo json_encode("No data received.");
    
}

?>