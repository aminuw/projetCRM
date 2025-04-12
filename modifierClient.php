<?php
require_once 'connexion.php'; // on inclut le fichier de connexion à la base de données
?>
<h1>Modification d'un client</h1>

<?php
$id_rec=$_POST['id'];
$req= $conbd -> prepare ('UPDATE Clients SET nom=:nom, prenom=:prenom, tel=:tel,adresse=:adresse,codepostal=:codePostal,ville=:ville,mail=:mail,risque=:risque,commentaire=:commentaire WHERE id=:id');

$res=$req->execute(array(
            'nom' => $_POST['nom'],
            'prenom' => $_POST['prenom'],
            'tel' => $_POST['tel'],
            'adresse' => $_POST['adresse'],
            'codePostal' => $_POST['codePostal'],
            'ville' => $_POST['ville'],
            'mail' => $_POST['mail'],
            'risque' => $_POST['risque'],
            'commentaire' => $_POST['commentaire'],        
'id' => $id_rec)); // attention il y a une gestion particulière de l’id en update $id_rec est l’id que vous avez récupéré de la page précédente! 
?>


<?php
$clients = $conbd->prepare ('SELECT * FROM clients WHERE id = :id');
$clients->execute(['id' => $id_rec]);

foreach ($clients as $client) {
    echo '<table border="1">';
    echo '<tr>';
    echo '<th>ID</th>';
    echo '<th>NOM</th>';
    echo '<th>PRENOM</th>';
    echo '<th>TEL</th>';
    echo '<th>ADRESSE</th>';
    echo '<th>CODEPOSTAL</th>';
    echo '<th>VILLE</th>';
    echo '<th>MAIL</th>';
    echo '<th>RISQUE</th>';
    echo '<th>COMMENTAIRE</th>';

echo '<tr>';
            echo '<td>' . $client['ID'] . '</td>';
            echo '<td>' . $client['NOM'] . '</td>';
            echo '<td>' . $client['PRENOM'] . '</td>';
            echo '<td>' . $client['TEL'] . '</td>';
            echo '<td>' . $client['ADRESSE'] . '</td>';
            echo '<td>' . $client['CODEPOSTAL'] . '</td>';
            echo '<td>' . $client['VILLE'] . '</td>';
            echo '<td>' . $client['MAIL'] . '</td>';
            echo '<td>' . $client['RISQUE'] . '</td>';
            echo '<td>' . $client['COMMENTAIRE'] . '</td>';

            echo '</tr>';
}
    echo '</table>';
    ?>

<p><a href="index.php">Retour à l'accueil</a></p>