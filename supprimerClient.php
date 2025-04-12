<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Suppression Client</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-r from-red-300 via-yellow-300 to-orange-400 min-h-screen flex items-center justify-center p-6">
    <div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg animate-fade-in-up">
        <h1 class="text-3xl font-bold mb-6 text-center text-red-700">❌ Suppression d'un client</h1>

        <form action="" method="POST" class="space-y-4">
            <input class="w-full px-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" type="text" name="id" placeholder="Veuillez indiquer l'ID du client..." required>

            <div class="text-center">
                <button type="submit" class="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-transform hover:scale-105">🗑️ Supprimer</button>
            </div>
        </form>

        <div class="mt-6 text-center">
            <a href="index.php" class="text-sm text-blue-600 hover:underline">🔙 Retour à l'accueil</a>
        </div>
        <?php 
        require_once("connexion.php");
        ?>
        
        <?php
        if (!empty($_POST['id'])) {
            $id = (int)$_POST['id'];

            try {
                $req = $conbd->prepare("DELETE FROM clients WHERE id = :id");
                $res = $req->execute(['id' => $id]);

                if ($res) {
                    echo "<p class='mt-4 text-green-600 font-semibold'>Client supprimé avec succès !</p>";
                    $true = true;
                } else {
                    echo "<p class='mt-4 text-red-600 font-semibold'>Erreur lors de la suppression du client.</p>";
                }

            } catch (PDOException $e) {
                echo "<p class='mt-4 text-red-600 font-semibold'>Erreur : " . $e->getMessage() . "</p>";
            }
        } else {
            echo "<p class='mt-4 text-yellow-600 font-semibold'>Veuillez indiquer un ID valide.</p>";
        }

        function delay_timer($seconds, $url, $true) {
            if ($true) {
                echo "<p>Redirection dans {$seconds} secondes...</p>";
                echo "<script>
                    setTimeout(function() {
                        window.location.href = '$url';
                    }, " . ($seconds * 1000) . ");
                </script>";
            } else {
                echo "<p class='mt-4 text-red-600 font-semibold'>Erreur de redirection automatique, veuillez entrer un ID !</p>";
            }
        }

        delay_timer("5", "index.php", isset($true));
        ?>
    </div>

    <style>
        @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in-up {
            animation: fade-in-up 0.5s ease-out;
        }
    </style>
</body>
</html>
