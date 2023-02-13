-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2023. Feb 13. 08:26
-- Kiszolgáló verziója: 10.4.6-MariaDB
-- PHP verzió: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `barbershop`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalok`
--

CREATE TABLE `felhasznalok` (
  `felhaszid` smallint(10) NOT NULL,
  `nev` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `telszam` tinyint(11) NOT NULL,
  `email` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `lakcim` varchar(100) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `galeria`
--

CREATE TABLE `galeria` (
  `termekkep` varchar(20) COLLATE utf8_hungarian_ci NOT NULL,
  `szam` smallint(10) NOT NULL,
  `kepnev` varchar(50) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `idopontfoglalas`
--

CREATE TABLE `idopontfoglalas` (
  `idopontid` bigint(10) NOT NULL,
  `felhasznaloid` smallint(10) NOT NULL,
  `telszam` tinyint(11) NOT NULL,
  `idopont` date NOT NULL,
  `megjegyzes` varchar(200) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `nyeremeny`
--

CREATE TABLE `nyeremeny` (
  `nyeremenyid` smallint(5) NOT NULL,
  `email` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `valasz1` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `valasz2` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `valasz3` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `valasz4` varchar(50) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rendeles`
--

CREATE TABLE `rendeles` (
  `rendelesid` bigint(10) NOT NULL,
  `termekid` smallint(5) NOT NULL,
  `dbszam` mediumint(7) NOT NULL,
  `fizetesmod` varchar(25) COLLATE utf8_hungarian_ci NOT NULL,
  `felhaszid` smallint(10) NOT NULL,
  `vegosszeg` int(10) NOT NULL,
  `datum` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `stilus`
--

CREATE TABLE `stilus` (
  `stilusid` smallint(5) NOT NULL,
  `megnev` varchar(20) COLLATE utf8_hungarian_ci NOT NULL,
  `leiras` varchar(200) COLLATE utf8_hungarian_ci NOT NULL,
  `kep` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `nem` varchar(10) COLLATE utf8_hungarian_ci NOT NULL,
  `ar` mediumint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `termekek`
--

CREATE TABLE `termekek` (
  `termekid` smallint(5) NOT NULL,
  `megnev` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `leiras` varchar(200) COLLATE utf8_hungarian_ci NOT NULL,
  `termekkep` varchar(20) COLLATE utf8_hungarian_ci NOT NULL,
  `ar` mediumint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `termekek`
--

INSERT INTO `termekek` (`termekid`, `megnev`, `leiras`, `termekkep`, `ar`) VALUES
(1, 'Férfi hajbalzsam (barackos)', 'Intenzíven tápláló hajbalzsam\r\nTökéletes a száraz, szálló haj ápolására\r\nA tövektől a hajvégekig gondoskodik a hajról\r\nA haj selymesebb, simább és kevésbé száll használatát követően\r\nEllenállhatatlan ', 'balzsambarack.jpg', 3000),
(2, 'Férfi hajbalzsam (citromos)', 'Intenzíven tápláló hajbalzsam\r\nTökéletes a száraz, szálló haj ápolására\r\nA tövektől a hajvégekig gondoskodik a hajról\r\nA haj selymesebb, simább és kevésbé száll használatát követően\r\nEllenállhatatlan ', 'balzsamcitrom.jpg', 3000),
(3, 'Férfi hajbalzsam (kókusz és macadámia)', 'Intenzíven tápláló hajbalzsam\r\nTökéletes a száraz, szálló haj ápolására\r\nA tövektől a hajvégekig gondoskodik a hajról\r\nA haj selymesebb, simább és kevésbé száll használatát követően\r\nEllenállhatatlan ', 'balzsamkokusz.jpg', 3000),
(4, 'Barber Gen Detox Ferfi sampon', 'A kiváló Barber Gen Detox sampon hatékonyan tisztítja a fejbőrt és a hajat, és visszaadja a haj természetes szépségét.', 'gendetox_ferfisampon', 4000),
(5, 'Barber Gen Fortifying Ferfi sampon', 'Erősítő sampon a gyenge, hullásra hajlamos hajra', 'genfortifying_ferfis', 4000),
(6, 'Barber Gen Rebalacing Ferfi sampon', 'Hajsampon kifejezetten zsíros/zsíros fejbőrre. A hajat puhává és kezelhetővé teszi.', 'genrebalance_ferfisa', 4000),
(7, 'Eco Professional Hajkiegyenesítő Női sampon', 'Gyengéden tisztít, és azonnal megszünteti a seprűs hatást, miközben a hajat lágyan áramlóvá és könnyen kezelhetővé teszi.', 'noisampon.png', 4500),
(8, 'Szakállápoló Gél Érzékeny bőrre', 'Szőrzetpuhító hatóanyaga révén bársonyosan puha tapintású szakállt eredményez. Minden szakállhosszra alkalmazható, még borostára is. Gyorsan felszívódik, nem zsírosít. Csökkenti a viszketést és a bőrf', 'szakallgelerz.jpg', 3500),
(9, 'Szakállápoló Gél Normál bőrre', 'Panthenol és hialuronsav tartalma extra adag hidratálást biztosít a szakállnak és a férfibőrnek egyaránt. A könnyed állagú hidrogél kiegészítő ápolószerként vagy a szakállápoló olaj alternatívájaként ', 'szakallgelnorm.jpg', 3500),
(10, 'Grave Before Shave Szakáll sampon', 'A Grave Before Shave szakáll sampon segít az arcszőrzet hatékony, alapos, mégis kíméletes tisztításában. Könnyen adagolható, eltávolítja a szennyeződéseket, és a felesleges faggyút, így ideális válasz', 'szakallsampon.jpg', 3600);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD PRIMARY KEY (`felhaszid`);

--
-- A tábla indexei `idopontfoglalas`
--
ALTER TABLE `idopontfoglalas`
  ADD PRIMARY KEY (`idopontid`);

--
-- A tábla indexei `nyeremeny`
--
ALTER TABLE `nyeremeny`
  ADD PRIMARY KEY (`nyeremenyid`);

--
-- A tábla indexei `rendeles`
--
ALTER TABLE `rendeles`
  ADD PRIMARY KEY (`rendelesid`);

--
-- A tábla indexei `stilus`
--
ALTER TABLE `stilus`
  ADD PRIMARY KEY (`stilusid`);

--
-- A tábla indexei `termekek`
--
ALTER TABLE `termekek`
  ADD PRIMARY KEY (`termekid`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `felhasznalok`
--
ALTER TABLE `felhasznalok`
  MODIFY `felhaszid` smallint(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `idopontfoglalas`
--
ALTER TABLE `idopontfoglalas`
  MODIFY `idopontid` bigint(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `nyeremeny`
--
ALTER TABLE `nyeremeny`
  MODIFY `nyeremenyid` smallint(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `rendeles`
--
ALTER TABLE `rendeles`
  MODIFY `rendelesid` bigint(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `stilus`
--
ALTER TABLE `stilus`
  MODIFY `stilusid` smallint(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `termekek`
--
ALTER TABLE `termekek`
  MODIFY `termekid` smallint(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
