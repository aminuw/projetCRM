<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Modification Client</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container container-sm">
        <div class="top-nav">
            <h1>Modifier un client</h1>
            <a href="index.php" class="link-back">Retour à l'accueil</a>
        </div>

        <div class="card">
            <form action="modifierClient.php" method="POST">
                <div class="form-group">
                    <label>ID du client à modifier (Requis)</label>
                    <input type="text" name="id" placeholder="ID client..." required>
                </div>

                <div class="form-group"><input type="text" name="nom" placeholder="Nom..."></div>
                <div class="form-group"><input type="text" name="prenom" placeholder="Prénom..."></div>
                <div class="form-group"><input type="text" name="tel" placeholder="Téléphone..."></div>
                <div class="form-group"><input type="text" name="adresse" placeholder="Adresse..."></div>
                <div class="form-group"><input type="text" name="codePostal" placeholder="Code postal..."></div>
                <div class="form-group"><input type="text" name="ville" placeholder="Ville..."></div>
                <div class="form-group"><input type="text" name="mail" placeholder="Adresse mail..."></div>
                <div class="form-group"><input type="text" name="risque" placeholder="Risque..."></div>
                <div class="form-group"><input type="text" name="commentaire" placeholder="Commentaire..."></div>

                <div class="mt-2 text-center">
                    <button type="submit" class="btn">Modifier le client</button>
                </div>
            </form>
        </div>
    </div>
</body>
</html>
