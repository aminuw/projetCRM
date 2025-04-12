<?php require_once 'connexion.php'; ?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Liste des clients</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
</head>
<body class="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 min-h-screen p-8">

    <div class="text-center mb-8 animate__animated animate__fadeInDown">
        <h1 class="text-4xl font-bold text-white drop-shadow-md mb-4">📋 Liste des clients</h1>
        <a href="index.php" class="bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded-full shadow-md transition">🏠 Retour à l'accueil</a>
    </div>

    <div class="overflow-x-auto animate__animated animate__fadeInUp">
        <table class="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
            <thead class="bg-blue-500 text-white">
                <tr>
                    <th class="px-4 py-2">ID</th>
                    <th class="px-4 py-2">Nom</th>
                    <th class="px-4 py-2">Prénom</th>
                    <th class="px-4 py-2">Téléphone</th>
                    <th class="px-4 py-2">Adresse</th>
                    <th class="px-4 py-2">Code Postal</th>
                    <th class="px-4 py-2">Ville</th>
                    <th class="px-4 py-2">Email</th>
                    <th class="px-4 py-2">Risque</th>
                    <th class="px-4 py-2">Commentaire</th>
                </tr>
            </thead>
            <tbody class="text-center">
                <?php
                try {
                    $reqClients = $conbd->query('SELECT * FROM clients');
                    $clients = $reqClients->fetchAll(PDO::FETCH_ASSOC);
                    foreach ($clients as $client) {
                        echo '<tr class="border-b hover:bg-blue-100 transition">';
                        echo '<td class="px-4 py-2">' . htmlspecialchars($client['ID']) . '</td>';
                        echo '<td class="px-4 py-2">' . htmlspecialchars($client['NOM']) . '</td>';
                        echo '<td class="px-4 py-2">' . htmlspecialchars($client['PRENOM']) . '</td>';
                        echo '<td class="px-4 py-2">' . htmlspecialchars($client['TEL']) . '</td>';
                        echo '<td class="px-4 py-2">' . htmlspecialchars($client['ADRESSE']) . '</td>';
                        echo '<td class="px-4 py-2">' . $client['CODEPOSTAL']. '</td>';
                        echo '<td class="px-4 py-2">' . htmlspecialchars($client['VILLE']) . '</td>';
                        echo '<td class="px-4 py-2">' . htmlspecialchars($client['MAIL']) . '</td>';
                        echo '<td class="px-4 py-2">' . htmlspecialchars($client['RISQUE']) . '</td>';
                        echo '<td class="px-4 py-2">' . htmlspecialchars($client['COMMENTAIRE']) . '</td>';
                        echo '</tr>';
                    }
                } catch (Exception $e) {
                    echo "<tr><td colspan='10' class='text-red-500 font-bold py-4'>Erreur : " . htmlspecialchars($e->getMessage()) . "</td></tr>";
                }
                ?>
            </tbody>
        </table>
    </div>
</body>
</html>
