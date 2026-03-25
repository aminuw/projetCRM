<?php require_once 'connexion.php'; ?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Liste des clients</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <div class="top-nav">
            <h1>Liste des clients</h1>
            <a href="index.php" class="link-back">Retour à l'accueil</a>
        </div>

        <div class="card" style="padding: 0;">
            <div class="table-wrapper" style="box-shadow:none; border:none; border-radius:12px;">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Téléphone</th>
                            <th>Adresse</th>
                            <th>Code Postal</th>
                            <th>Ville</th>
                            <th>Email</th>
                            <th>Risque</th>
                            <th>Commentaire</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        try {
                            $reqClients = $conbd->query('SELECT * FROM clients');
                            $clients = $reqClients->fetchAll(PDO::FETCH_ASSOC);
                            foreach ($clients as $client) {
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
                        } catch (Exception $e) {
                            echo "<tr><td colspan='10' class='message error'>Erreur : " . htmlspecialchars($e->getMessage()) . "</td></tr>";
                        }
                        ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</body>
</html>
