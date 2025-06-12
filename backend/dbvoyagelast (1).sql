-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 28 mars 2025 à 00:59
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `dbvoyagelast`
--

-- --------------------------------------------------------

--
-- Structure de la table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('Ds8NtxrZ8mbc0cqI', 's:7:\"forever\";', 2053080019),
('N6Okn0D4heAH3nK3', 's:7:\"forever\";', 2053080069);

-- --------------------------------------------------------

--
-- Structure de la table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `destinations`
--

CREATE TABLE `destinations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nom` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `destinations`
--

INSERT INTO `destinations` (`id`, `nom`, `description`, `image`, `created_at`, `updated_at`) VALUES
(1, 'torkya', 'Trop belle', 'https://www.baliautrement.com/img/articles/bali/voyage-bali-header.jpg', '2025-01-24 11:19:11', '2025-01-24 22:44:53'),
(2, 'Paris', 'La ville des lumières', 'https://media.timeout.com/images/106181719/image.jpg', '2025-01-24 22:31:15', '2025-03-27 20:45:05'),
(3, 'London', 'The capital and largest city of both England and the United Kingdom', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/London_Skyline_%28125508655%29.jpeg/640px-London_Skyline_%28125508655%29.jpeg', '2025-01-24 22:51:42', '2025-01-24 22:51:42'),
(4, 'Madrid', 'Située en plein cœur de l\'Espagne, Madrid est une ville vivante et dynamique, dotée d\'un patrimoine riche et d\'activités variées', 'https://content.r9cdn.net/rimg/dimg/5f/38/353ec907-ap-MAD-551b0685.jpg?width=1366&height=768&xhint=826&yhint=409&crop=true', '2025-01-24 22:52:59', '2025-01-24 22:52:59'),
(5, 'Hawaii', 'Archipel volcanique isolé dans le Pacifique central', 'https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i6HXvXzLNWFU/v1/-1x-1.webp', '2025-01-24 23:05:24', '2025-01-24 23:06:12'),
(6, 'Qubec', 'Deuxième province la plus peuplée du Canada, derrière l\'Ontario', 'https://www.quebec-cite.com/sites/otq/files/styles/cinema/public/media/image/Chateau_Frontenac_hiver.png?itok=hYeQvNo8', '2025-01-24 23:08:07', '2025-01-24 23:08:07');

-- --------------------------------------------------------

--
-- Structure de la table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2024_12_07_153742_create_voyages_table', 1),
(5, '2024_12_08_132437_create_personal_access_tokens_table', 1),
(6, '2024_12_08_133444_create_reservations_table', 1),
(7, '2025_01_22_170729_create_destinations_table', 1);

-- --------------------------------------------------------

--
-- Structure de la table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `reservations`
--

CREATE TABLE `reservations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `idVoyage` bigint(20) UNSIGNED NOT NULL,
  `idUser` bigint(20) UNSIGNED NOT NULL,
  `nbPlaceAReserver` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `reservations`
--

INSERT INTO `reservations` (`id`, `idVoyage`, `idUser`, `nbPlaceAReserver`, `created_at`, `updated_at`) VALUES
(3, 2, 2, 2, '2025-01-24 17:59:59', '2025-01-24 22:42:12');

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('gmkbYUvf1KIcFUJgAtJM80qMKwusmuT2B1kBgCSY', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 OPR/117.0.0.0 (Edition cdf)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoienRwdDN6NGxDM2o4ckxIbTFRalRLd3NUamNZckZBSXlmMFFvZ3dhTiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1743108239);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 0,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `role`, `avatar`, `isActive`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Hassan Hachicha', 'hsan.hachicha@gmail.com', NULL, '$2y$12$MYYzh98r3q.sHT68dpF1teLNOSj8cZnel2npr1AAESWXDsV2G249K', 'admin', 'https://res.cloudinary.com/iset-sfax/image/upload/v1701446211/images/image.PNG.png', 1, NULL, '2025-01-24 10:57:11', '2025-01-24 10:57:11'),
(2, 'medk', 'med@gmail.com', NULL, '$2y$12$VKrp2CPDUz/PSNsD39TY9.O/sQ7AmR.Vr1CgJniFxH/0Wa45yztF2', 'user', 'img', 1, NULL, '2025-01-24 12:06:17', '2025-03-27 20:56:37'),
(3, 'achraf chalghaf', 'achraf@gmail.com', NULL, '$2y$12$NsNI60EPvKogUi1VwzGoi.uYMJnEamCtjqqdA5HYCflyh95rXocti', 'user', 'img', 1, NULL, '2025-01-24 12:07:50', '2025-01-24 22:49:03'),
(4, 'nizar', 'nizar.nizar@gmail.com', NULL, '$2y$12$SmC1prDh5x34VCKSS4QuXugS5ywn13q8b4LxU6ToUG02afmGSBJAy', 'admin', 'test', 0, NULL, '2025-03-27 21:03:30', '2025-03-27 21:03:30'),
(5, 'hh', 'hsan@gmail.com', NULL, '$2y$12$lI9W1Q7u2etuzFeJP2SqDeQIeDBGZU9mBOoIs2j.z23bOi6XYyqWe', 'admin', 'https://res.cloudinary.com/iset-sfax/image/upload/v1701446211/images/image.PNG.png', 0, NULL, '2025-03-27 22:09:45', '2025-03-27 22:09:45');

-- --------------------------------------------------------

--
-- Structure de la table `voyages`
--

CREATE TABLE `voyages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `depart` varchar(255) NOT NULL,
  `nbplacetotal` int(11) NOT NULL,
  `prixplace` int(11) NOT NULL,
  `datevoyage` date NOT NULL,
  `destination_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `voyages`
--

INSERT INTO `voyages` (`id`, `depart`, `nbplacetotal`, `prixplace`, `datevoyage`, `destination_id`, `created_at`, `updated_at`) VALUES
(1, 'sfax', 100, 50, '2025-01-31', 1, NULL, '2025-03-27 20:17:51'),
(2, 'tunis', 20, 1000, '2025-01-25', 1, '2025-01-24 11:51:28', '2025-01-24 11:52:16'),
(3, 'sfax', 100, 100, '2025-01-26', 2, '2025-01-24 22:50:01', '2025-01-24 22:50:01');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Index pour la table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Index pour la table `destinations`
--
ALTER TABLE `destinations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Index pour la table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Index pour la table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Index pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Index pour la table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reservations_idvoyage_foreign` (`idVoyage`),
  ADD KEY `reservations_iduser_foreign` (`idUser`);

--
-- Index pour la table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Index pour la table `voyages`
--
ALTER TABLE `voyages`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `destinations`
--
ALTER TABLE `destinations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `voyages`
--
ALTER TABLE `voyages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_iduser_foreign` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reservations_idvoyage_foreign` FOREIGN KEY (`idVoyage`) REFERENCES `voyages` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
