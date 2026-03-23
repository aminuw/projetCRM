<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Ajout Client</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container container-sm">
    <div class="top-nav">
      <h1>Ajouter un client</h1>
      <a href="index.php" class="link-back">Retour à l'accueil</a>
    </div>

    <div class="card">
      <form action="enregistrerClient.php" method="POST">
        <?php
          $champs = [
            "nom" => "Nom", "prenom" => "Prénom", "tel" => "Téléphone",
            "adresse" => "Adresse", "codePostal" => "Code Postal",
            "ville" => "Ville", "mail" => "Email", "risque" => "Risque",
            "commentaire" => "Commentaire"
          ];

          foreach ($champs as $name => $label) {
            echo <<<HTML
              <div class="form-group">
                <label>$label</label>
                <input type="text" name="$name" placeholder="Entrez $label..." />
              </div>
            HTML;
          }
        ?>
        <input type="submit" value="Ajouter le client" class="btn mt-2">
      </form>
    </div>
  </div>
</body>
</html>
