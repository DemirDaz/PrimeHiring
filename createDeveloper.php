<?php

require 'dbconnect.php';

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  $request = json_decode($postdata);
  $Name= $request->Name;
  $Email = $request->Email;
  $PhoneNum = $request->PhoneNum;
  $Location= $request->Location;
  $Picture = $request->Picture;
  $PricePerHour = $request->PricePerHour;
  $Technology = $request->Technology;
  $Description= $request->Description;
  $YearsOfExp = $request->YearsOfExp;
  $NativeLang = $request->NativeLang;
  $LinkedIn = $request->LinkedIn;

  $upit = "INSERT INTO `developers` (`id`, `Name`, `Email`, `PhoneNum`, `Location`, `Picture`, `PricePerHour`, `Technology`, `Description`, `YearsOfExp`, `NativeLang`, `LinkedIn`) 
  VALUES (NULL, '$Name', '$Email', '$PhoneNum', '$Location', '$Picture', '$PricePerHour', '$Technology', '$Description', '$YearsOfExp', '$NativeLang', '$LinkedIn');";
  $rez  = mysqli_query($konekcija, $upit);

  if($rez) {
    http_response_code(201);
    $developer = [
      'id' => mysqli_insert_id($konekcija)
     
      
      ];
    echo json_encode($porudzbina);
  }
  else {
      http_response_code(404);
      echo json_encode("Insert of new developer has failed.");
  }

  }

else {
    http_response_code(404);
    echo json_encode("No data received.");
    
}

?>