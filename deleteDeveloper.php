<?php

require 'dbconnect.php';

$id = $_GET['id'];
print_r($id);

if(!$id)
{
  return http_response_code(400);
}

$sql = "DELETE FROM developers WHERE id=$id";

if(mysqli_query($konekcija, $sql))
{
  http_response_code(204);
  echo ("Succesfully deleted developer!");
}
else
{
  return http_response_code(422);
}

?>