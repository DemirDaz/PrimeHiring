<?php

require 'dbconnect.php';

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  $request = json_decode($postdata);
  $Name= $_POST['Name'];
  $Email = $_POST['Email'];
  $PhoneNum = $_POST['PhoneNum'];
  $Location= $_POST['Location'];
  $Picture = $_POST['Picture'];
  $PricePerHour = $_POST['PricePerHour'];
  $Technology = $_POST['Technology'];
  $Description= $_POST['Description'];
  $YearsOfExp = $_POST['YearsOfExp'];
  $NativeLang = $_POST['NativeLang'];
  $LinkedIn = $_POST['LinkedIn'];

  $upit = "INSERT INTO `developers` (`id`, `Name`, `Email`, `PhoneNum`, `Location`, `Picture`, `PricePerHour`, `Technology`, `Description`, `YearsOfExp`, `NativeLang`, `LinkedIn`) 
  VALUES (NULL, '$Name', '$Email', '$PhoneNum', '$Location', '$Picture', '$PricePerHour', '$Technology', '$Description', '$YearsOfExp', '$NativeLang', '$LinkedIn');";
  $rez  = mysqli_query($konekcija, $upit);

  if($rez) {
    http_response_code(201);
    $developer = [
      'id' => mysqli_insert_id($konekcija)
     
      
      ];
    echo ("Succesfully added new developer.");
  }
  else {
      http_response_code(403);
      echo json_encode("Insert of new developer has failed.");
  }

  }

else {
    http_response_code(404);
    echo json_encode("No data received.");
    
}

?>