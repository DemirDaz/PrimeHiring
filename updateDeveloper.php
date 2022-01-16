<?php

require 'dbconnect.php';

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  $request = json_decode($postdata);
  $id= $_POST['id'];
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

  $upit = "UPDATE developers SET Name='$Name', Email='$Email', PhoneNum='$PhoneNum', Location='$Location', Picture='$Picture', PricePerHour='$PricePerHour', Technology='$Technology', Description='$Description', YearsOfExp='$YearsOfExp', NativeLang='$NativeLang', LinkedIn='$LinkedIn' WHERE id='$id' ";
  $rez  = mysqli_query($konekcija, $upit);

  if($rez) {
    http_response_code(201);
    
    echo ("Succesfully updated.");
  }
  else {
      http_response_code(403);
      echo json_encode("Update of the developer has failed.");
  }

  }

else {
    http_response_code(404);
    echo json_encode("No data received.");
    
}

?>