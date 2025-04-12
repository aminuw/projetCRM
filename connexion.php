<?php
try
 {
 $conbd = new PDO ('mysql:host=localhost;dbname=crm_amine;charset=utf8',
'root', '', array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION));
 }
catch ( Exception $e)
 {
 die ('Erreur : ' . $e -> getMessage ()); /* die indique l'arrêt de
l'exécution de la page en affichant un message correspondant à l'exception
levée */
 }
?>
