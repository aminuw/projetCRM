<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Suppression Client</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container container-sm">
        <div class="top-nav">
            <h1>Supprimer un client</h1>
            <a href="index.php" class="link-back">Retour à l'accueil</a>
        </div>

        <div class="card">
            <form action="" method="POST">
                <div class="form-group">
                    <label>ID du client</label>
                    <input type="text" name="id" placeholder="Veuillez indiquer l'ID du client..." required>
                </div>
                
                <div class="mt-2 text-center">
                    <button type="submit" class="btn btn-danger">Supprimer</button>
                </div>
            </form>

            <div class="mt-2">
                <?php 
                require_once("connexion.php");
                
                if (!empty($_POST['id'])) {
                    $id = (int)$_POST['id'];

                    try {
                        $req = $conbd->prepare("DELETE FROM clients WHERE id = :id");
                        $res = $req->execute(['id' => $id]);

                        if ($res) {
                            echo "<div class='message success'>Client supprimé avec succès !</div>";
                            $true = true;
                        } else {
                            echo "<div class='message error'>Erreur lors de la suppression du client.</div>";
                        }

                    } catch (PDOException $e) {
                        echo "<div class='message error'>Erreur : " . $e->getMessage() . "</div>";
                    }
                } else {
                    echo "<div class='message warning'>Veuillez indiquer un ID valide.</div>";
                }

                function delay_timer($seconds, $url, $true) {
                    if ($true) {
                        echo "<p class='text-center mt-2'>Redirection dans {$seconds} secondes...</p>";
                        echo "<script>
                            setTimeout(function() {
                                window.location.href = '$url';
                            }, " . ($seconds * 1000) . ");
                        </script>";
                    } else {
                        echo "<div class='message error'>Erreur de redirection automatique, veuillez entrer un ID !</div>";
                    }
                }

                delay_timer("5", "index.php", isset($true));
                ?>
            </div>
        </div>
    </div>
</body>
</html>
