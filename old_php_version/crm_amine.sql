-- Script de création de la base de données pour le projet CRM
-- Nom de la base déduit de connexion.php : crm_amine

CREATE DATABASE IF NOT EXISTS `crm_amine` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `crm_amine`;

-- Structure de la table `clients`
-- Déduite des fichiers enregistrerClient.php, modifierClient.php et liste.php
CREATE TABLE IF NOT EXISTS `clients` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nom` VARCHAR(100) NOT NULL,
  `prenom` VARCHAR(100) NOT NULL,
  `tel` VARCHAR(20) DEFAULT NULL,
  `adresse` VARCHAR(255) DEFAULT NULL,
  `codePostal` VARCHAR(10) DEFAULT NULL,
  `ville` VARCHAR(100) DEFAULT NULL,
  `mail` VARCHAR(150) DEFAULT NULL,
  `risque` VARCHAR(100) DEFAULT NULL,
  `commentaire` TEXT DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Ajout d'un jeu de données de test (optionnel)
INSERT INTO `clients` (`nom`, `prenom`, `tel`, `adresse`, `codePostal`, `ville`, `mail`, `risque`, `commentaire`) VALUES
('Dupont', 'Jean', '0601020304', '12 Rue des Fleurs', '75001', 'Paris', 'jean.dupont@example.com', 'Faible', 'Client très régulier, bonnes relations.'),
('Martin', 'Sophie', '0789456123', '45 Avenue de la République', '69002', 'Lyon', 's.martin@example.com', 'Moyen', 'A eu un retard de paiement en 2024.');
