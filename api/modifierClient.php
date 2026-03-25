<?php require_once 'connexion.php'; ?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Modification d'un Client</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <div class="top-nav">
            <h1>Résultat de la modification</h1>
            <a href="index.php" class="link-back">Retour à l'accueil</a>
        </div>
        
        <div class="card">
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
            'id' => $id_rec)); 
            ?>

            <div class="message success">La mise à jour du client a été traitée.</div>

            <div class="table-wrapper mt-2">
                <table>
                <?php
                $clients = $conbd->prepare ('SELECT * FROM clients WHERE id = :id');
                $clients->execute(['id' => $id_rec]);

                foreach ($clients as $client) {
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
                    echo '</tr>';

                    echo '<tr>';
                    echo '<td>' . htmlspecialchars($client['id'] ?? '') . '</td>';
                    echo '<td>' . htmlspecialchars($client['nom'] ?? '') . '</td>';
                    echo '<td>' . htmlspecialchars($client['prenom'] ?? '') . '</td>';
                    echo '<td>' . htmlspecialchars($client['tel'] ?? '') . '</td>';
                    echo '<td>' . htmlspecialchars($client['adresse'] ?? '') . '</td>';
                    echo '<td>' . htmlspecialchars($client['codePostal'] ?? '') . '</td>';
                    echo '<td>' . htmlspecialchars($client['ville'] ?? '') . '</td>';
                    echo '<td>' . htmlspecialchars($client['mail'] ?? '') . '</td>';
                    echo '<td>' . htmlspecialchars($client['risque'] ?? '') . '</td>';
                    echo '<td>' . htmlspecialchars($client['commentaire'] ?? '') . '</td>';
                    echo '</tr>';
                }
                ?>
                </table>
            </div>

            <div class="text-center mt-2">
                <a href="index.php" class="btn btn-secondary" style="width: auto;">Retour à l'accueil</a>
            </div>
        </div>
    </div>
</body>
</html>