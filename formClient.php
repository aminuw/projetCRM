<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Ajout Client</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 min-h-screen text-white">
  <nav class="bg-white text-gray-800 px-4 py-3 shadow-md flex justify-between">
    <h1 class="font-bold text-xl">Ajout d’un client</h1>
    <a href="index.php" class="text-blue-600 hover:underline">🏠 Accueil</a>
  </nav>

  <div class="max-w-xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg text-gray-800 animate-fade-in-up">
    <form action="enregistrerClient.php" method="POST" class="space-y-4">
      <?php
        $champs = [
          "nom" => "Nom", "prenom" => "Prénom", "tel" => "Téléphone",
          "adresse" => "Adresse", "codePostal" => "Code Postal",
          "ville" => "Ville", "mail" => "Email", "risque" => "Risque",
          "commentaire" => "Commentaire"
        ];

        foreach ($champs as $name => $label) {
          echo <<<HTML
            <div>
              <label class="block text-sm font-semibold mb-1">$label</label>
              <input type="text" name="$name" placeholder="Entrez $label..."
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition" />
            </div>
          HTML;
        }
      ?>
      <input type="submit" value="✅ Ajouter le client" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg w-full transition">
    </form>
  </div>
</body>
</html>
