<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Modification Client</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 min-h-screen flex items-center justify-center p-6">
    <div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xl animate-fade-in-down">
        <h1 class="text-3xl font-bold mb-6 text-center text-purple-700">🔧 Modifier un client</h1>

        <form action="modifierClient.php" method="POST" class="space-y-4">
            <input class="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" type="text" name="id" placeholder="ID client..." required>

            <input class="w-full px-4 py-2 border border-purple-300 rounded-lg" type="text" name="nom" placeholder="Nom...">
            <input class="w-full px-4 py-2 border border-purple-300 rounded-lg" type="text" name="prenom" placeholder="Prénom...">
            <input class="w-full px-4 py-2 border border-purple-300 rounded-lg" type="text" name="tel" placeholder="Téléphone...">
            <input class="w-full px-4 py-2 border border-purple-300 rounded-lg" type="text" name="adresse" placeholder="Adresse...">
            <input class="w-full px-4 py-2 border border-purple-300 rounded-lg" type="text" name="codePostal" placeholder="Code postal...">
            <input class="w-full px-4 py-2 border border-purple-300 rounded-lg" type="text" name="ville" placeholder="Ville...">
            <input class="w-full px-4 py-2 border border-purple-300 rounded-lg" type="text" name="mail" placeholder="Adresse mail...">
            <input class="w-full px-4 py-2 border border-purple-300 rounded-lg" type="text" name="risque" placeholder="Risque...">
            <input class="w-full px-4 py-2 border border-purple-300 rounded-lg" type="text" name="commentaire" placeholder="Commentaire...">

            <div class="text-center">
                <button type="submit" class="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-transform hover:scale-105">✅ Modifier</button>
            </div>
        </form>

        <div class="mt-6 text-center">
            <a href="index.php" class="text-sm text-blue-600 hover:underline">🔙 Retour à l'accueil</a>
        </div>
    </div>

    <style>
        @keyframes fade-in-down {
            0% { opacity: 0; transform: translateY(-20px); }
            100% { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in-down {
            animation: fade-in-down 0.5s ease-out;
        }
    </style>
</body>
</html>
