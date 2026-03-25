<?php
require_once 'connexion.php';

if (
    isset($_POST['nom'], $_POST['prenom'], $_POST['tel'], $_POST['adresse'], $_POST['codePostal'],
    $_POST['ville'], $_POST['mail'], $_POST['risque'], $_POST['commentaire'])
) {
    try {
        $sql = $conbd->prepare('
            INSERT INTO clients(mail, nom, prenom, tel, adresse, codePostal, ville, risque, commentaire)
            VALUES (:mail, :nom, :prenom, :tel, :adresse, :codePostal, :ville, :risque, :commentaire)
        ');

        $res = $sql->execute([
            'mail' => $_POST['mail'],
            'nom' => $_POST['nom'],
            'prenom' => $_POST['prenom'],
            'tel' => $_POST['tel'],
            'adresse' => $_POST['adresse'],
            'codePostal' => $_POST['codePostal'],
            'ville' => $_POST['ville'],
            'risque' => $_POST['risque'],
            'commentaire' => $_POST['commentaire']
        ]);

        if ($res) {
            // Redirection vers la page de liste après ajout
            header('Location: liste.php?success=1');
            exit();
        } else {
            // Redirection avec erreur
            header('Location: liste.php?error=1');
            exit();
        }

    } catch (Exception $e) {
        die('Erreur lors de l\'insertion : ' . $e->getMessage());
    }
} else {
    header('Location: formClient.php');
    exit();
}
