-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2023. Ápr 25. 13:28
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
  `jelszo` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `lakcim` varchar(100) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalok`
--

INSERT INTO `felhasznalok` (`felhaszid`, `nev`, `telszam`, `email`, `jelszo`, `lakcim`) VALUES
(1, 'asd', 127, 'pisti12312@gmaill.com', 'asd', 'asd'),
(2, 'ballaur', 127, 'test@test.com', 'asd', 'asd213');

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
  `telszam` bigint(11) NOT NULL,
  `megjegyzes` varchar(200) COLLATE utf8_hungarian_ci NOT NULL,
  `datum` date NOT NULL,
  `idopont` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `idopontfoglalas`
--

INSERT INTO `idopontfoglalas` (`idopontid`, `felhasznaloid`, `telszam`, `megjegyzes`, `datum`, `idopont`) VALUES
(6, 1, 127, 'asd', '0000-00-00', '00:00:00'),
(7, 1, 6305901404, 'asd', '2023-05-03', '09:00:00');

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

--
-- A tábla adatainak kiíratása `nyeremeny`
--

INSERT INTO `nyeremeny` (`nyeremenyid`, `email`, `valasz1`, `valasz2`, `valasz3`, `valasz4`) VALUES
(1, 'asd@gmail.com', 'kezi', 'rovid', 'hamvasito', 'ferfi'),
(2, 'asd@gmail.com', 'kezi', 'rovid', 'hamvasito', 'ferfi'),
(3, 'asd@gmail.com', 'kezi', 'rovid', 'hamvasito', 'ferfi'),
(4, 'asd@gmail.com', 'kezi', 'rovid', 'hamvasito', 'ferfi'),
(5, 'asd@gmail.com', 'kezi', 'rovid', 'hamvasito', 'ferfi'),
(6, '', 'kezi', 'rovid', 'hamvasito', 'rovid'),
(7, '', 'kezi', 'rovid', 'hamvasito', 'ferfi'),
(8, '', 'kezi', 'rovid', 'hamvasito', 'rovid'),
(9, '', 'kezi', 'rovid', 'hamvasito', 'ferfi'),
(10, '', 'kezi', 'rovid', 'hamvasito', 'ferfi'),
(11, '', 'kezi', 'rovid', 'hamvasito', 'kopaszodas'),
(12, '', 'kezi', 'rovid', 'hamvasito', 'ferfi');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rendeles`
--

CREATE TABLE `rendeles` (
  `rendelesid` int(11) NOT NULL,
  `termekid` smallint(5) NOT NULL,
  `dbszam` mediumint(7) NOT NULL,
  `fizetesmod` varchar(25) COLLATE utf8_hungarian_ci NOT NULL,
  `felhaszid` smallint(10) NOT NULL,
  `vegosszeg` int(10) NOT NULL,
  `datum` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `rendeles`
--

INSERT INTO `rendeles` (`rendelesid`, `termekid`, `dbszam`, `fizetesmod`, `felhaszid`, `vegosszeg`, `datum`) VALUES
(1682421234, 2, 1, 'Utánvét', 1, 6000, '2023-04-25'),
(1682421234, 3, 1, 'Utánvét', 1, 6000, '2023-04-25');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `stilus`
--

CREATE TABLE `stilus` (
  `stilusid` smallint(5) NOT NULL,
  `megnev` varchar(20) COLLATE utf8_hungarian_ci NOT NULL,
  `leiras` text COLLATE utf8_hungarian_ci NOT NULL,
  `kep` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `nem` varchar(10) COLLATE utf8_hungarian_ci NOT NULL,
  `ar` mediumint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `stilus`
--

INSERT INTO `stilus` (`stilusid`, `megnev`, `leiras`, `kep`, `nem`, `ar`) VALUES
(1, 'BuzzCut', 'Buzz cutnak hagyományosan az egyenletesen rövidre vágott hajat hívják. A buzz cutot érdemes lehet kipróbálni, amennyiben halántéktájon ritkul/ritkább a hajad. A buzz cut a hajdivat legegyszerűbb megoldás.', 'buzzcut.jpg', 'Férfi', 2300),
(2, 'Comb Over', 'A comb over-t klasszikus angol hajvágásnak is nevezik, ezt a fajta vágást ugyanis a homlok és fejtető tájon ritkásodó haj elfedésére kezdték el hordani.', 'combover.jpg', 'Férfi', 2300),
(3, 'Fringe', 'A Fringe minden olyan frizurára ráhúzható, ahol a haj oldalát rövidre vágják, a fejtetőn lévő hajnál pedig a haj egy bizonyos rész eltakarja a homlok egy részét vagy egészét.', 'fringe.jpg', 'Férfi', 4000),
(4, 'Manbun', 'Választhatod a manbunt egyhosszúságú hajjal, de ha egy kicsit extráznál, akkor a haj oldalsó részeit hagyhatod rövidebbre, és átmenettel is fűszerezheted. Figyelemfelkeltő, extra, és vagány.', 'manbun.jpg', 'Férfia', 3600),
(5, 'Spiky', 'A Spiky hajstílus a férfiak körében nagyon népszerű, mert modern és energetikus megjelenést kölcsönöz viselőjének. A Spiky hajstílust különböző hosszúságú hajból lehet elérni, általában a közép- vagy felső részen a hajat felállítják és megfésülik, hogy a tüskék megtapadjanak. ', 'spiky.jpg', 'Férfi', 2700),
(6, 'UnderCut', 'Az Under Cut hajstílus egy kontrasztos, fiatalos és modern megjelenést biztosító stílus, amely a felső részen hosszabb hajból és az oldalakon vagy a hátulról rövidre nyírt hajból áll. Az Under Cut hajstílust különböző variációkban lehet elérni, például a hátul rövidre nyírt rész lehet egyenes, hullámos, vagy akár vadul tüskés is.', 'undercut.jpg', 'Férfi', 3500),
(7, 'Fesztivál Hajfestés', 'A szivárvány hajfestés egy színes, kreatív és expresszív megjelenést biztosító festési stílus. A szivárvány hajfestést sokan alkalmazzák fesztiválokra, mert a színek, a minták és a stílusok nagymértékben hozzájárulnak a fesztivál hangulatához és élményéhez.', 'fesztivalfestes.jpg', 'Nő', 8000),
(8, 'Fonás', 'A fonatokat különböző formákban csináljuk, például spirál fonat, francia fonat, dutch fonat, stb. Ezen kívül különböző hajhosszakban, stílusokban és alkalmakra is tudunk fonatot készíteni.', 'fonas.jpg', 'Nő', 3500),
(9, 'Francia Hajvágás', 'A francia hajvágás egy elegáns, nőies és klasszikus hajstílus, amely a haj vékonyabb és egyenletes szélűvé tételét biztosítja. A francia hajvágás különösen a vékony hajú nők számára ajánlott, mert megadja a haj volumenét, anélkül, hogy túlságosan nehéznek tűnne.', 'franciahajvagas.jpg', 'Nő', 4700),
(10, 'Melír', 'A melír egy olyan hajfestési technika, amely lehetővé teszi a haj színeinek átmeneti vagy egyenletes elosztását a haj teljes hosszán. A melír különösen akkor jó választás, ha a haj színét szeretnénk megváltoztatni, de nem akarunk radikális változást elérni.', 'melir.jpg', 'Nő', 5400),
(11, 'Hajfestés', 'A sima hajfestés egy alap hajfestési technika, amely a haj egységes színűvé tételét biztosítja. A sima hajfestés készítése szakképzett fodrász által végezhető, akinek képzettsége és tapasztalata van a hajfestés technikáinak alkalmazásában.', 'hajfestes.jpg', 'Nő', 6000),
(12, 'Rövidre Vágás', 'A rövid női hajvágás lehet változatos, hiszen számos stílust lehet kialakítani, beleértve a bob, pixie, és egyéb rövid stílusokat. Az árak a kiválasztott fodrásztól és a kívánt stílustól függően változhatnak.', 'rovidhajvagas.jpg', 'Nő', 6700),
(13, 'Short Boxed Szakáll', 'Rövid, négyzet alakú szakáll, amely az áll, az ajak és a bajusz körül található. Ennek a szakálltípusnak a jellemzője a precíz forma és a tökéletesen vágott vonalak.\r\n\r\n', 'shortboxedbeard.jpg', 'Férfi', 5000),
(14, 'Garibaldi', 'A Garibaldi szakállnak jellemzője a sima, egyenletes forma és a tökéletesen vágott vonalak. Ennek a szakálltípusnak a hossza lehetővé teszi a férfiak számára, hogy kreatív módon stílust alkossanak, és kifejezzék személyiségüket.', 'garibaldi.jpg', 'Férfi', 4300),
(15, 'Imperial fazon', 'Az imperial fazon egy hosszú, szabályos szakállforma, amely az álltól a bajuszig nyúlik. Az imperial fazon szép megjelenést kölcsönöz a férfiaknak, és nagyon jól mutat a klasszikus,  elegáns stílust követő férfiaknál.', 'imperialfazon.jpg', 'Férfi', 4700),
(16, 'Bandholz', 'A Bandholz szakáll egy rendkívül hosszú, kiemelkedő szakálltípus, amely az álltól a mellkasig nyúlik. A Bandholz szakáll nagyon jól mutat a bátor, merész férfiaknál, akik szeretik kifejezni személyiségüket a szakálluk által.', 'bandholz.jpg', 'Férfi', 3800),
(17, 'Átmeneti szakáll', 'Az átmeneti szakáll jellemzője a fokozatos átmenet a rövid szakállról a hosszabbra, ami nagyon természetesnek tűnik. Az átmeneti szakáll egy nagyon praktikus és stílusos megoldás lehet a férfiak számára.', 'atmenetesszakall.jpg', 'Férfi', 6000);

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
(4, 'Barber Gen Detox Ferfi sampon', 'A kiváló Barber Gen Detox sampon hatékonyan tisztítja a fejbőrt és a hajat, és visszaadja a haj természetes szépségét.', 'gendetox.jpg', 4000),
(5, 'Barber Gen Fortifying Ferfi sampon', 'Erősítő sampon a gyenge, hullásra hajlamos hajra', 'genfortifying.jpg', 4000),
(6, 'Barber Gen Rebalacing Ferfi sampon', 'Hajsampon kifejezetten zsíros/zsíros fejbőrre. A hajat puhává és kezelhetővé teszi.', 'genrebalance.jpg', 4000),
(7, 'Eco Professional Hajkiegyenesítő Női sampon', 'Gyengéden tisztít, és azonnal megszünteti a seprűs hatást, miközben a hajat lágyan áramlóvá és könnyen kezelhetővé teszi.', 'noisampon.png', 4500),
(8, 'Szakállápoló Gél Érzékeny bőrre', 'Szőrzetpuhító hatóanyaga révén bársonyosan puha tapintású szakállt eredményez. Minden szakállhosszra alkalmazható, még borostára is. Gyorsan felszívódik, nem zsírosít. Csökkenti a viszketést és a bőrf', 'szakallgelerz.jpg', 3500),
(9, 'Szakállápoló Gél Normál bőrre', 'Panthenol és hialuronsav tartalma extra adag hidratálást biztosít a szakállnak és a férfibőrnek egyaránt. A könnyed állagú hidrogél kiegészítő ápolószerként vagy a szakállápoló olaj alternatívájaként ', 'szakallgelnorm.jpg', 3500),
(10, 'Grave Before Shave Szakáll sampon', 'A Grave Before Shave szakáll sampon segít az arcszőrzet hatékony, alapos, mégis kíméletes tisztításában. Könnyen adagolható, eltávolítja a szennyeződéseket, és a felesleges faggyút, így ideális válasz', 'szakallsampon.jpg', 3600),
(11, 'BIL Hajvágó Olló', 'A pengék élesek és precízek, hogy pontosan és egyenletesen vágják a hajat. A markolatok ergonomikus kialakításúak, hogy kényelmesen és biztonságosan tartsák a kézben az ollót.', 'ollo.jpg', 2300),
(12, 'Szalon Szék', 'Az antik stílusú szék kiváló minőségű anyagokból készült, és hosszú élettartammal rendelkezik.', 'salonchair.jpg', 15000),
(13, 'BIL Penge Kés', 'Ideális a professzionális borotválkozáshoz. Kiváló minőségű anyagokból készült, éles penge, és kényelmes fogás jellemzi, amely garantálja a precíz és biztonságos vágást.', 'pengekes.jpg', 2300),
(14, 'BIL Hajszárító', 'Professzionális minőségű, amely ideális a mindennapi használatra. Kiváló teljesítménnyel rendelkezik, tartós és hatékony, és hosszú élettartamot garantál.', 'hajszarito.jpg', 5800),
(15, 'BIL Borotvaecset', 'A kefe puha sörtéivel könnyen lehet vele ápolni és formázni a bajuszodat, így mindig szép és rendezett lesz.', 'borotvaecset.jpg', 3100),
(16, 'BIL Ritkító olló', 'Az általunk ajánlott ritkító olló nem csak hatékonyan segít a haj ritkításában és vékonyításában, de nagyon is kényelmes használni, így akár a kezdők számára is könnyen elsajátítható.', 'ritkitoollo.jpg', 1250);

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
  MODIFY `felhaszid` smallint(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `idopontfoglalas`
--
ALTER TABLE `idopontfoglalas`
  MODIFY `idopontid` bigint(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT a táblához `nyeremeny`
--
ALTER TABLE `nyeremeny`
  MODIFY `nyeremenyid` smallint(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT a táblához `stilus`
--
ALTER TABLE `stilus`
  MODIFY `stilusid` smallint(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT a táblához `termekek`
--
ALTER TABLE `termekek`
  MODIFY `termekid` smallint(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
