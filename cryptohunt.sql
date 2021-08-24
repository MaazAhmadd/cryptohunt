-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 27, 2021 at 02:43 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cryptohunt`
--

-- --------------------------------------------------------

--
-- Table structure for table `coin`
--

CREATE TABLE `coin` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL,
  `symbol` text DEFAULT NULL,
  `description` text DEFAULT NULL, 
  `logo` text DEFAULT NULL,
  `launch` text DEFAULT NULL,
  `additional` text DEFAULT NULL,
  `binancesmartchain` text DEFAULT NULL,
  `ethereum` text DEFAULT NULL,
  `solana` text DEFAULT NULL,
  `polygon` text DEFAULT NULL,
  `website` text DEFAULT NULL,
  `telegram` text DEFAULT NULL,
  `twitter` text DEFAULT NULL,
  `status` text DEFAULT NULL, 
  `added_by` text DEFAULT NULL,
  `featured` int(11) DEFAULT 0,
  `price` text DEFAULT NULL,
  `market_cap` text DEFAULT NULL,
  `volume_change_24h` text DEFAULT NULL,
  `votes_count` INT DEFAULT 0,
  `moon` INT DEFAULT 0,
  `fire` INT DEFAULT 0,
  `gem` INT DEFAULT 0, 
  `heart` INT DEFAULT 0,
  `joy` INT DEFAULT 0,
  `liked` INT DEFAULT 0,  
  `presale` INT DEFAULT 0 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `coin`
--

INSERT INTO `coin` (`id`, `name`, `symbol`, `description`, `logo`, `launch`, `additional`, `binancesmartchain`, `ethereum`, `solana`, `polygon`, `website`, `telegram`, `twitter`, `status`, `added_by`, `featured`, `price`, `market_cap`, `volume_change_24h`, `votes_count`,`moon`,`fire`,`gem`,`heart`,`joy`,`liked`,`presale`) VALUES 
(2, 'Ethereum', 'BTC', 'Bitcoin is a Decentralized Cryptocurrency', 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png', '01/01/2019', 'Nothing To Worry About', '0x000000', '0x000000000', 'xxxxxxxxxxxxxx', '0x00000000000000000', 'https://www.bitcoin.com', 'https://t.me/bitcoin', 'null', 'approved', 'test@fmgail.com', 1, '2287.41', '266219202913', '-3.0070488620716382', '2','1','2','3','4','5','6','0');
INSERT INTO `coin` (`id`, `name`, `symbol`, `description`, `logo`, `launch`, `additional`, `binancesmartchain`, `ethereum`, `solana`, `polygon`, `website`, `telegram`, `twitter`, `status`, `added_by`, `featured`, `price`, `market_cap`, `volume_change_24h`, `votes_count`,`moon`,`fire`,`gem`,`heart`,`joy`,`liked`,`presale`) VALUES
(1, 'Bitcoin', 'test', 'testeststes esatsea', 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png', '04/01/2022', 'teatsa', '0x00000000', '0x00000000', 'xxxxxxxxxxxx', '0x00000000', 'https://twitter.com', 'https://twitter.com', 'https://twitter.com', 'approved', 'testtest@gmail.com', 1, '38238', '713982204867', '-1.6066169920848632', '1','6','5','4','3','2','1','1'); 
INSERT INTO `coin` (`id`, `name`, `symbol`, `description`, `logo`, `launch`, `additional`, `binancesmartchain`, `ethereum`, `solana`, `polygon`, `website`, `telegram`, `twitter`, `status`, `added_by`, `featured`, `price`, `market_cap`, `volume_change_24h`, `votes_count`,`moon`,`fire`,`gem`,`heart`,`joy`,`liked`,`presale`) VALUES
(3, 'Bitcoin5', 'test', 'testeststes esatsea', 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png', '04/01/2022', 'teatsa', '0x00000000', '0x00000000', 'xxxxxxxxxxxx', '0x00000000', 'https://twitter.com', 'https://twitter.com', 'https://twitter.com', 'approved', 'testtest@gmail.com', 0, '38238', '713982204867', '-1.6066169920848632', '1','6','5','4','3','2','1','0');   
INSERT INTO `coin` (`id`, `name`, `symbol`, `description`, `logo`, `launch`, `additional`, `binancesmartchain`, `ethereum`, `solana`, `polygon`, `website`, `telegram`, `twitter`, `status`, `added_by`, `featured`, `price`, `market_cap`, `volume_change_24h`, `votes_count`,`moon`,`fire`,`gem`,`heart`,`joy`,`liked`,`presale`) VALUES
(4, 'Bitcoin6', 'test', 'testeststes esatsea', 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png', '04/01/2021', 'teatsa', '0x00000000', '0x00000000', 'xxxxxxxxxxxx', '0x00000000', 'https://twitter.com', 'https://twitter.com', 'https://twitter.com', 'approved', 'testtest@gmail.com', 0, '38238', '713982204867', '-1.6066169920848632', '1','6','5','4','3','2','1','0');   
-- UPDATE coin set featured = 0 where id = 4;
-- UPDATE coin set featured = 0 where id = 5;
-- UPDATE coin set featured = 0 where id = 7;
-- UPDATE coin set featured = 0 where id = 8;
-- UPDATE coin set featured = 0 where id = 9;
-- UPDATE coin set featured = 0 where id = 10;
-- UPDATE coin set featured = 0 where id = 11;


-- --------------------------------------------------------

--
-- Table structure for table `reactions`
--

CREATE TABLE `reactions` (
  `id` int(11) NOT NULL,
  `reaction_type` text DEFAULT NULL,
  `coin_id` int(11) DEFAULT NULL,
  `user` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `password` text DEFAULT NULL,
  `email` text DEFAULT NULL,
  `name` text DEFAULT NULL,
  `role` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `password`, `email`, `name`, `role`) VALUES
(1, 'testtest', 'test@gmail.com', 'Test Iser', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `votes`
--

CREATE TABLE `votes` (
  `id` int(11) NOT NULL,
  `coin_id` int(11) DEFAULT NULL,
  `time` text DEFAULT NULL,
  `user` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `votes`
--

INSERT INTO `votes` (`id`, `coin_id`, `time`, `user`) VALUES
(5, 1, '2021-07-27 12:19:38', 'test@gmail.com'),
(6, 2, '2021-07-27 12:23:37', 'test@gmail.com'),
(7, 2, '2021-07-27 12:23:37', 'test@gmail.com'),
(8, 2, '2021-07-27 12:23:38', 'test@gmail.com'),
(9, 2, '2021-07-27 12:23:38', 'test@gmail.com'),
(10, 2, '2021-07-27 12:24:59', 'test@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `coin`
--
ALTER TABLE `coin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reactions`
--
ALTER TABLE `reactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `votes`
--
ALTER TABLE `votes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `coin`
--
ALTER TABLE `coin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `reactions`
--
ALTER TABLE `reactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `votes`
--
ALTER TABLE `votes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;