<?php

require 'dbconnect.php';

$postdata = file_get_contents("php://input"); 
echo $postdata;

if(isset($postdata) && !empty($postdata))
{
 
  $request = json_decode($postdata);
  
  $developerId = $_POST['developerId'];
  $startDate = $_POST['startDate'];
  $endDate = $_POST['endDate'];
  
  
 
 

  $upit = "INSERT INTO hiring_records (recordId, developerId, startDate, endDate) 
  VALUES (NULL, $developerId, $startDate, $endDate)";
  $rez  = mysqli_query($konekcija, $upit);

  if($rez) {
    http_response_code(201);
    echo json_encode($rez);
  }
  else {
      http_response_code(404);
      echo json_encode("Insert of new record has failed.");
  }

  }

else {
    http_response_code(404);
    echo json_encode("No data received.");
    
}



?>