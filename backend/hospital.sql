-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 19, 2023 at 10:57 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hospital`
--

-- --------------------------------------------------------

--
-- Table structure for table `diagnosis`
--

CREATE TABLE `diagnosis` (
  `diag_ID` int(11) NOT NULL,
  `patient_ID` varchar(50) NOT NULL,
  `date` varchar(12) NOT NULL,
  `diagnosis` varchar(100) NOT NULL,
  `initial_remarks` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `diagnosis`
--

INSERT INTO `diagnosis` (`diag_ID`, `patient_ID`, `date`, `diagnosis`, `initial_remarks`) VALUES
(53, '10-18-2023-01', '18/10/2023', 'Found heavy chillam', 'the patient tried to eat chillam, instead of smoking'),
(54, '10-18-2023-01', '18/10/2023', 'Diagnosis 2', 'This is the second diagnosis');

-- --------------------------------------------------------

--
-- Table structure for table `dosage_form`
--

CREATE TABLE `dosage_form` (
  `dosage_ID` int(11) NOT NULL,
  `dosage_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dosage_form`
--

INSERT INTO `dosage_form` (`dosage_ID`, `dosage_name`) VALUES
(1, 'tablet'),
(2, 'capsule'),
(3, 'syrup'),
(4, 'injectable');

-- --------------------------------------------------------

--
-- Table structure for table `guardian`
--

CREATE TABLE `guardian` (
  `guardian_ID` int(11) NOT NULL,
  `patient_ID` varchar(50) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `middle_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `login_ID` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `user_type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`login_ID`, `email`, `password`, `user_type`) VALUES
(1, 'admin@gmail.com', 'admin123', 1),
(2, 'diagnose@gmail.com', 'diagnose', 2),
(3, 'medicine@gmail.com', 'medicine', 3),
(4, 'review@gmail.com', 'review', 4),
(5, 'reception@gmail.com', 'reception', 5);

-- --------------------------------------------------------

--
-- Table structure for table `manufacturer`
--

CREATE TABLE `manufacturer` (
  `man_ID` int(11) NOT NULL,
  `man_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `manufacturer`
--

INSERT INTO `manufacturer` (`man_ID`, `man_name`) VALUES
(1, 'Pfizer Inc.'),
(2, 'Johnson & Johnson'),
(3, 'Roche Holding AG (F. Hoffmann-La Roche)'),
(4, 'Novartis International AG'),
(5, 'Merck & Co., Inc.'),
(6, 'Others');

-- --------------------------------------------------------

--
-- Table structure for table `medicine`
--

CREATE TABLE `medicine` (
  `medicine_ID` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `generic_name` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `man_ID` int(11) NOT NULL,
  `dosage_ID` int(11) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `medicine`
--

INSERT INTO `medicine` (`medicine_ID`, `name`, `generic_name`, `description`, `man_ID`, `dosage_ID`, `price`) VALUES
(1, 'Crosine', 'Crosine', 'Used for headache treatment', 1, 1, 10),
(2, 'Lipitor', 'Atorvastatin', 'Used to lower cholesterol levels.', 1, 1, 1),
(3, 'Prevnar 13', 'Pneumococcal 13-valent Conjugate Vaccine', 'Used for the prevention of pneumococcal disease.', 1, 4, 10),
(4, 'Tylenol', 'Acetaminophen', 'Pain reliever and fever reducer.', 2, 1, 0),
(5, 'Remicade', 'Infliximab', 'Used to treat autoimmune diseases like rheumatoid arthritis.', 2, 4, 1),
(6, 'Risperdal', 'Risperidone', 'Antipsychotic medication used to treat schizophrenia and bipolar disorder.', 2, 1, 1),
(13, 'kr4k3n', 'Viagrino', 'This is very > O umm, umm', 2, 1, 120);

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `patient_ID` varchar(50) NOT NULL,
  `reg_date` varchar(10) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `middle_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `age` varchar(10) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(12) NOT NULL,
  `address` varchar(100) NOT NULL,
  `cured` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`patient_ID`, `reg_date`, `first_name`, `middle_name`, `last_name`, `age`, `gender`, `email`, `phone`, `address`, `cured`) VALUES
('10-18-2023-01', '18/10/2023', 'Someone', '', 'Saf', '78', 'male', 'someone', '1234567890', 'Somewhere', 0);

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE `photos` (
  `photo_ID` int(11) NOT NULL,
  `patient_ID` varchar(50) NOT NULL,
  `image` longblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `prescription`
--

CREATE TABLE `prescription` (
  `pres_ID` int(11) NOT NULL,
  `diag_ID` int(11) NOT NULL,
  `medicine_ID` int(11) NOT NULL,
  `water_quantity` int(11) NOT NULL,
  `times_perday` int(11) NOT NULL,
  `instruction` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prescription`
--

INSERT INTO `prescription` (`pres_ID`, `diag_ID`, `medicine_ID`, `water_quantity`, `times_perday`, `instruction`) VALUES
(42, 53, 2, 1, 1, 'eat this instead'),
(43, 53, 4, 1, 2, '15 ml consume daily at 10:00 pm');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `review_ID` int(11) NOT NULL,
  `review_date` varchar(50) NOT NULL,
  `review` varchar(100) NOT NULL,
  `patient_ID` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`review_ID`, `review_date`, `review`, `patient_ID`) VALUES
(16, '13/9/2023', 'The patient is chillin with his babes', '10-12-2023-01'),
(17, '19/9/2023', 'Hey, he just called me and he want\'s me to come too, one babe fo me.... wohooo', '10-12-2023-01'),
(20, '13/9/2023', 'adsfasd fa', '10-12-2023-01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `diagnosis`
--
ALTER TABLE `diagnosis`
  ADD PRIMARY KEY (`diag_ID`);

--
-- Indexes for table `dosage_form`
--
ALTER TABLE `dosage_form`
  ADD PRIMARY KEY (`dosage_ID`);

--
-- Indexes for table `guardian`
--
ALTER TABLE `guardian`
  ADD PRIMARY KEY (`guardian_ID`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`login_ID`);

--
-- Indexes for table `manufacturer`
--
ALTER TABLE `manufacturer`
  ADD PRIMARY KEY (`man_ID`);

--
-- Indexes for table `medicine`
--
ALTER TABLE `medicine`
  ADD PRIMARY KEY (`medicine_ID`),
  ADD KEY `manufacturer` (`man_ID`),
  ADD KEY `dosage_form` (`dosage_ID`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`patient_ID`);

--
-- Indexes for table `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`photo_ID`),
  ADD KEY `patient_ID` (`patient_ID`);

--
-- Indexes for table `prescription`
--
ALTER TABLE `prescription`
  ADD PRIMARY KEY (`pres_ID`),
  ADD KEY `medicine_ID` (`medicine_ID`),
  ADD KEY `diag_ID` (`diag_ID`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`review_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `diagnosis`
--
ALTER TABLE `diagnosis`
  MODIFY `diag_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `dosage_form`
--
ALTER TABLE `dosage_form`
  MODIFY `dosage_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `guardian`
--
ALTER TABLE `guardian`
  MODIFY `guardian_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `login_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `manufacturer`
--
ALTER TABLE `manufacturer`
  MODIFY `man_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `medicine`
--
ALTER TABLE `medicine`
  MODIFY `medicine_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `photos`
--
ALTER TABLE `photos`
  MODIFY `photo_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `prescription`
--
ALTER TABLE `prescription`
  MODIFY `pres_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `review_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `medicine`
--
ALTER TABLE `medicine`
  ADD CONSTRAINT `medicine_ibfk_1` FOREIGN KEY (`man_ID`) REFERENCES `manufacturer` (`man_ID`),
  ADD CONSTRAINT `medicine_ibfk_2` FOREIGN KEY (`dosage_ID`) REFERENCES `dosage_form` (`dosage_ID`);

--
-- Constraints for table `photos`
--
ALTER TABLE `photos`
  ADD CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`patient_ID`) REFERENCES `patient` (`patient_ID`);

--
-- Constraints for table `prescription`
--
ALTER TABLE `prescription`
  ADD CONSTRAINT `prescription_ibfk_2` FOREIGN KEY (`medicine_ID`) REFERENCES `medicine` (`medicine_ID`),
  ADD CONSTRAINT `prescription_ibfk_3` FOREIGN KEY (`diag_ID`) REFERENCES `diagnosis` (`diag_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
