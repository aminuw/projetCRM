<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Gestion des Clients - Coloré & Fun</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
  <style>
    body {
      font-family: 'Comic Sans MS', cursive, sans-serif;
    }
  </style>
</head>
<body class="bg-gradient-to-tr from-pink-300 via-purple-300 to-blue-300 min-h-screen p-8 text-white">

  <div class="max-w-4xl mx-auto bg-white bg-opacity-20 p-8 rounded-2xl shadow-2xl animate__animated animate__fadeIn">
    <h1 class="text-4xl font-bold text-center text-yellow-300 drop-shadow-lg mb-8">Bienvenue sur la gestion des clients !</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <a href="liste.php" class="bg-yellow-400 text-black text-center py-4 rounded-xl hover:bg-yellow-300 transition transform hover:scale-105 font-semibold">👀 Voir la liste</a>
      <a href="formClient.php" class="bg-green-400 text-black text-center py-4 rounded-xl hover:bg-green-300 transition transform hover:scale-105 font-semibold">➕ Ajouter un client</a>
      <a href="supprimerClient.php" class="bg-red-400 text-black text-center py-4 rounded-xl hover:bg-red-300 transition transform hover:scale-105 font-semibold">🗑️ Supprimer un client</a>
      <a href="modifForm.php" class="bg-blue-400 text-black text-center py-4 rounded-xl hover:bg-blue-300 transition transform hover:scale-105 font-semibold">✏️ Modifier un client</a>
    </div>

    <p class="mt-12 text-center text-white text-sm opacity-80">✨ Powered by PHP & stylisé avec Tailwind CSS + Animate.css</p>
  </div>

</body>
</html>
