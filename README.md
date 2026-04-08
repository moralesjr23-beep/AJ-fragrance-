# AJ-fragrance-
import { useState, useEffect } from “react”;

const COLL=[
{n:“Bleu de Dua Attar”,h:“The Dua Brand”,d:[“blue”,“fresh”,“aquatic”,“woody”],o:[“Office”,“Casual”,“Outdoors”],s:“All Season”,r:5,i:“Bleu de Chanel”},
{n:“Khamrah Qahwa”,h:“Lattafa”,d:[“gourmand”,“coffee”,“amber”,“oriental”],o:[“Evening”,“Date”],s:“Fall/Winter”,r:5,i:””},
{n:“Ottoman Breeze”,h:“The Dua Brand”,d:[“fresh”,“aquatic”,“blue”,“green”],o:[“Casual”,“Outdoors”,“Office”],s:“Spring/Summer”,r:5,i:“Nishane Hacivat”},
{n:“His Perspective Extrait”,h:“The Dua Brand”,d:[“woody”,“fresh”,“blue”,“amber”],o:[“Office”,“Casual”,“Date”],s:“All Season”,r:5,i:“Prada Paradigme”},
{n:“Jean Lowe Immortal”,h:“Maison Alhambra”,d:[“woody”,“amber”,“sweet”,“vanilla”],o:[“Office”,“Casual”,“Date”],s:“Spring/Summer”,r:5,i:“LV L’Immensité”},
{n:“MIRIS No54602”,h:“MIRIS Oils”,d:[“fresh”,“green”,“woody”,“citrus”],o:[“Casual”,“Office”,“Outdoors”],s:“Spring/Summer”,r:5,i:“Nishane Hacivat”},
{n:“Ameer Al Oudh Intense”,h:“Lattafa”,d:[“oud”,“amber”,“oriental”,“smoky”],o:[“Evening”,“Special event”],s:“Fall/Winter”,r:4,i:“MFK By the Fireplace”},
{n:“River Fougere”,h:“The Dua Brand”,d:[“fougere”,“fresh”,“green”,“lavender”],o:[“Office”,“Casual”,“Outdoors”],s:“Spring/Fall”,r:4,i:“YSL Rive Gauche”},
{n:“Gentleman’s Club”,h:“The Dua Brand”,d:[“fougere”,“tobacco”,“woody”,“classic”],o:[“Office”,“Evening”,“Date”],s:“Fall”,r:4,i:“Givenchy Gentleman Society”},
{n:“Linen Vetiver”,h:“Banana Republic”,d:[“vetiver”,“linen”,“clean”,“fresh”],o:[“Office”,“Casual”],s:“Spring/Summer”,r:4,i:””},
{n:“Grassland”,h:“Banana Republic”,d:[“green”,“fresh”,“grassy”,“woody”],o:[“Casual”,“Outdoors”],s:“Spring/Summer”,r:4,i:“Creed Green Irish Tweed”},
{n:“Vintage Green 78”,h:“Banana Republic”,d:[“green”,“vintage”,“woody”,“herbal”],o:[“Casual”,“Outdoors”],s:“Spring”,r:4,i:””},
{n:“Tobacco & Tonka Bean”,h:“Banana Republic”,d:[“tobacco”,“tonka”,“warm”,“amber”],o:[“Casual”,“Evening”],s:“Fall/Winter”,r:4,i:””},
{n:“Midnight Hour”,h:“Banana Republic”,d:[“dark”,“woody”,“amber”,“mysterious”],o:[“Evening”,“Date”],s:“Fall/Winter”,r:4,i:””},
{n:“Dark Cherry & Amber”,h:“Banana Republic”,d:[“cherry”,“amber”,“dark”,“fruity”],o:[“Date”,“Evening”],s:“Fall”,r:3,i:””},
{n:“Metal Rain”,h:“Banana Republic”,d:[“fresh”,“metallic”,“rain”,“ozonic”],o:[“Casual”,“Outdoors”,“Office”],s:“Spring/Summer”,r:3,i:””},
{n:“MIRIS No56902”,h:“MIRIS Oils”,d:[“apple”,“brandy”,“woody”,“gourmand”],o:[“Evening”,“Date”],s:“Fall”,r:4,i:“Kilian Apple Brandy”},
{n:“MIRIS No47319”,h:“MIRIS Oils”,d:[“lavender”,“vanilla”,“spicy”,“sweet”],o:[“Date”,“Evening”,“Casual”],s:“Fall/Winter”,r:4,i:“JPG Ultra Male”},
{n:“MIRIS No59797”,h:“MIRIS Oils”,d:[“fresh”,“blue”,“woody”,“metallic”],o:[“Office”,“Casual”],s:“Spring/Summer”,r:4,i:“CH Bad Boy Cobalt”},
{n:“Poseidon’s Swimming Cologne”,h:“The Dua Brand”,d:[“aquatic”,“fresh”,“green”,“marine”],o:[“Casual”,“Outdoors”],s:“Summer”,r:4,i:“Aventus Cologne”},
{n:“Bleu de Dua Exclusive Extrait”,h:“The Dua Brand”,d:[“blue”,“fresh”,“aquatic”,“woody”],o:[“Office”,“Date”,“Evening”],s:“Fall/Winter”,r:4,i:“Bleu de Chanel Exclusif”},
{n:“Jazz”,h:“The Dua Brand”,d:[“tobacco”,“woody”,“vanilla”,“dark”],o:[“Evening”,“Date”],s:“Fall/Winter”,r:4,i:“MFK Jazz Club”},
{n:“Midnight Rendezvous”,h:“The Dua Brand”,d:[“amber”,“oriental”,“sweet”,“tobacco”],o:[“Evening”,“Date”],s:“Fall/Winter”,r:4,i:“YSL La Nuit de L’Homme”},
{n:“Aphrodisiac”,h:“The Dua Brand”,d:[“amber”,“musk”,“sweet”,“woody”],o:[“Date”,“Evening”],s:“Fall/Winter”,r:4,i:“Initio Psychedelic Love”},
{n:“Casino Royale Nights Extrait”,h:“The Dua Brand”,d:[“amber”,“tobacco”,“woody”,“elegant”],o:[“Evening”,“Date”,“Special event”],s:“Fall/Winter”,r:4,i:“Baccarat Rouge 540 Extrait”},
{n:“Bet On 67”,h:“The Dua Brand”,d:[“fresh”,“sporty”,“aquatic”,“citrus”],o:[“Casual”,“Outdoors”],s:“Spring/Summer”,r:4,i:“Ralph Lauren Polo 67”},
{n:“Iconic Plums By The Fire”,h:“The Dua Brand”,d:[“plum”,“smoky”,“amber”,“oriental”],o:[“Evening”,“Date”],s:“Fall/Winter”,r:4,i:“Andy Warhol + By the Fireplace”},
{n:“Rome In Green”,h:“The Dua Brand”,d:[“green”,“fresh”,“citrus”,“herbal”],o:[“Casual”,“Outdoors”],s:“Spring/Summer”,r:4,i:“Valentino Born in Roma Green”},
{n:“Midnight Fig”,h:“The Dua Brand”,d:[“fig”,“green”,“fresh”,“woody”],o:[“Evening”,“Special event”],s:“Fall/Winter”,r:4,i:“Nest Indigo”},
{n:“Fortune”,h:“The Dua Brand”,d:[“woody”,“amber”,“oriental”,“elegant”],o:[“Office”,“Evening”,“Date”],s:“Fall”,r:4,i:“Xerjoff Naxos”},
{n:“Smoky Cuba Tabac”,h:“The Dua Brand”,d:[“tobacco”,“smoky”,“woody”,“oriental”],o:[“Evening”,“Date”],s:“Fall/Winter”,r:4,i:“Alghabra Cuban Tobacco”},
{n:“1 & Only Jazz Club”,h:“The Dua Brand”,d:[“tobacco”,“vanilla”,“woody”,“oriental”],o:[“Evening”,“Date”],s:“Fall/Winter”,r:4,i:“The One + Jazz Club”},
{n:“Drowning in Bleu de Dua Attar”,h:“The Dua Brand”,d:[“blue”,“deep”,“woody”,“amber”],o:[“Date”,“Evening”,“Office”],s:“Spring/Fall”,r:4,i:“Bleu de Chanel + Nishane Ani”},
{n:“Drowning Bleu de Savage Fierce Extrait”,h:“The Dua Brand”,d:[“blue”,“fresh”,“spicy”,“intense”],o:[“Evening”,“Special event”],s:“Fall/Winter”,r:3,i:“Ani + Sauvage EDT + Fierce”},
{n:“Acqua Di DUA”,h:“The Dua Brand”,d:[“aquatic”,“fresh”,“citrus”,“woody”],o:[“Casual”,“Outdoors”,“Office”],s:“Spring/Summer”,r:4,i:“Acqua di Gio vintage”},
{n:“Error 410”,h:“The Dua Brand”,d:[“gourmand”,“amber”,“sweet”,“golden”],o:[“Date”,“Evening”,“Special event”],s:“Fall/Winter”,r:4,i:“1 Million Absolutely Gold”},
{n:“The Mobster vs Poseidon”,h:“The Dua Brand”,d:[“aquatic”,“woody”,“fresh”,“elegant”],o:[“Date”,“Evening”,“Casual”],s:“Fall/Spring”,r:4,i:“Roja Creation-E x Creed Aventus”},
{n:“Ottomans Vert Breeze”,h:“The Dua Brand”,d:[“fresh”,“green”,“woody”,“aquatic”],o:[“Casual”,“Office”,“Outdoors”],s:“Spring/Summer”,r:4,i:“Hacivat x Green Irish Tweed”},
{n:“Aroma of Heaven”,h:“The Dua Brand”,d:[“vetiver”,“woody”,“earthy”,“fresh”],o:[“Office”,“Casual”,“Outdoors”],s:“All Season”,r:4,i:“Hermes Terre d’Hermes Vintage”},
{n:“Poseidon’s Ocean Mist”,h:“The Dua Brand”,d:[“aquatic”,“fresh”,“marine”,“ozonic”],o:[“Casual”,“Office”,“Outdoors”],s:“Spring/Summer”,r:4,i:“Aventus Cologne x Nautica Voyage”},
{n:“Imperiale Matrix”,h:“The Dua Brand”,d:[“fresh”,“aquatic”,“citrus”,“elegant”],o:[“Office”,“Casual”,“Outdoors”],s:“Spring/Summer”,r:4,i:“Millesime Imperial x Xerjoff Nio”},
{n:“The Savage Attar”,h:“The Dua Brand”,d:[“fresh”,“spicy”,“woody”,“ambroxan”],o:[“Date”,“Casual”,“Office”],s:“All Season”,r:4,i:“Dior Sauvage Parfum”},
{n:“Poseidon’s Fireplace”,h:“The Dua Brand”,d:[“smoky”,“woody”,“aquatic”,“amber”],o:[“Evening”,“Casual”],s:“Fall”,r:3,i:“Aventus + By the Fireplace”},
{n:“Bleu de Casino Elixir Extrait”,h:“The Dua Brand”,d:[“blue”,“amber”,“woody”,“elegant”],o:[“Evening”,“Office”,“Date”],s:“Fall”,r:3,i:“Bleu de Chanel + Aventus + BR540”},
{n:“Desert Reflection Extrait”,h:“The Dua Brand”,d:[“amber”,“woody”,“spicy”,“oriental”],o:[“Evening”,“Special event”],s:“Fall/Winter”,r:3,i:“Amouage Reflection Man”},
{n:“D Le Attar”,h:“The Dua Brand”,d:[“woody”,“fresh”,“intense”,“elegant”],o:[“Office”,“Date”],s:“Fall/Winter”,r:3,i:“YSL Y Le Parfum”},
{n:“D Le Parfum Intense”,h:“The Dua Brand”,d:[“woody”,“fresh”,“intense”,“formal”],o:[“Evening”,“Date”],s:“Fall/Winter”,r:3,i:“YSL Y EDP Intense”},
{n:”#Imagine”,h:“The Dua Brand”,d:[“fresh”,“citrus”,“aquatic”,“airy”],o:[“Casual”,“Office”],s:“Spring/Summer”,r:3,i:“LV Imagination”},
{n:“Error 413”,h:“The Dua Brand”,d:[“gourmand”,“amber”,“sweet”,“night”],o:[“Evening”,“Casual”],s:“Fall/Winter”,r:3,i:“1 Million Lucky”},
{n:“His Intense Aspiration”,h:“The Dua Brand”,d:[“woody”,“fresh”,“intense”,“citrus”],o:[“Casual”,“Office”],s:“Spring/Summer”,r:3,i:“Allure Homme Blanche”},
{n:“His OG Aspiration”,h:“The Dua Brand”,d:[“fresh”,“citrus”,“woody”,“classic”],o:[“Casual”,“Office”],s:“Fall/Winter”,r:3,i:“Chanel Allure Homme vintage”},
{n:“His Aspiration Extreme Sport”,h:“The Dua Brand”,d:[“fresh”,“sporty”,“citrus”,“green”],o:[“Casual”,“Outdoors”],s:“Spring/Summer”,r:3,i:“Allure Homme Sport Extreme”},
{n:“His Royalty”,h:“The Dua Brand”,d:[“fresh”,“light”,“woody”,“clean”],o:[“Office”,“Casual”],s:“Spring/Summer”,r:3,i:“Prada L’Homme L’Eau”},
{n:“His Loyalty”,h:“The Dua Brand”,d:[“blue”,“fresh”,“woody”,“metallic”],o:[“Office”,“Casual”],s:“Spring/Summer”,r:3,i:“D&G Devotion”},
{n:“Fierce Savage”,h:“The Dua Brand”,d:[“fresh”,“spicy”,“ambroxan”,“woody”],o:[“Casual”,“Office”,“Outdoors”],s:“All Season”,r:3,i:“Fierce + Dior Sauvage EDT”},
{n:“Imperial Blue”,h:“The Dua Brand”,d:[“blue”,“fresh”,“citrus”,“elegant”],o:[“Office”,“Casual”,“Date”],s:“Spring/Summer”,r:3,i:“Bleu de Chanel + Millesime Imperial”},
{n:“Imperiale Casino Elixir”,h:“The Dua Brand”,d:[“amber”,“aquatic”,“elegant”,“special”],o:[“Special event”,“Date”],s:“Spring/Fall”,r:3,i:“Millesime Imperial + Aventus + BR540”},
{n:“Intuition Vision”,h:“The Dua Brand”,d:[“aquatic”,“fresh”,“clean”,“woody”],o:[“Casual”,“Office”],s:“Spring/Summer”,r:3,i:“Acqua di Gio Profumo”},
{n:“Mystical Amulet of Blue”,h:“The Dua Brand”,d:[“blue”,“fresh”,“woody”,“aquatic”],o:[“Casual”,“Office”],s:“Spring/Summer”,r:3,i:“Ex Nihilo Blue Talisman”},
{n:“Peace with Poseidon”,h:“The Dua Brand”,d:[“aquatic”,“fresh”,“marine”,“ozonic”],o:[“Casual”,“Outdoors”],s:“Spring/Summer”,r:3,i:“Scent of Peace + Aventus”},
{n:“Victorian Poseidon”,h:“The Dua Brand”,d:[“aquatic”,“fresh”,“woody”,“formal”],o:[“Special event”],s:“Fall/Winter”,r:3,i:“Aventus + Xerjoff 1861 Renaissance”},
{n:“Gone Swimming”,h:“The Dua Brand”,d:[“aquatic”,“fresh”,“green”,“marine”],o:[“Casual”,“Outdoors”],s:“Summer”,r:3,i:“LV Afternoon Swim”},
{n:“Stronger With Azure Supernova 2.0”,h:“The Dua Brand”,d:[“blue”,“fresh”,“citrus”,“ozonic”],o:[“Date”,“Evening”],s:“Fall/Winter”,r:3,i:“Stronger With You + ADG Profondo”},
{n:“Iconic Greenwich Village”,h:“The Dua Brand”,d:[“fresh”,“green”,“woody”,“urban”],o:[“Casual”,“Office”],s:“Spring/Fall”,r:3,i:“Bond No. 9 Greenwich Village”},
{n:“Spice It Up Metallic Musk”,h:“The Dua Brand”,d:[“spicy”,“musk”,“metallic”,“fresh”],o:[“Office”,“Casual”],s:“Fall/Winter”,r:3,i:“Spicebomb Metallic Musk”},
{n:“True Self Absolute”,h:“The Dua Brand”,d:[“woody”,“amber”,“clean”,“evening”],o:[“Date”,“Evening”],s:“Fall/Winter”,r:3,i:“YSL MYSLF L’Absolu”},
{n:“Rome in Yellow Dream”,h:“The Dua Brand”,d:[“citrus”,“fresh”,“floral”,“warm”],o:[“Casual”,“Date”],s:“Spring/Summer”,r:3,i:“Valentino Born in Roma Yellow Dream”},
{n:“Rome In Coral Fantasy”,h:“The Dua Brand”,d:[“fresh”,“citrus”,“warm”,“casual”],o:[“Casual”,“Outdoors”],s:“Spring/Summer”,r:3,i:“Valentino Born in Roma Coral Fantasy”},
{n:“Poseidon’s Cotton Candy”,h:“The Dua Brand”,d:[“gourmand”,“sweet”,“aquatic”,“playful”],o:[“Casual”],s:“Spring/Summer”,r:3,i:“Aventus + Cotton Candy”},
{n:“Dua’s Water Primal Essence”,h:“The Dua Brand”,d:[“aquatic”,“fresh”,“citrus”,“gym”],o:[“Casual”,“Outdoors”,“Office”],s:“Spring/Summer”,r:3,i:“Acqua di Gio Absolu”},
{n:“Midnight Candy For 1 & Only”,h:“The Dua Brand”,d:[“gourmand”,“sweet”,“amber”,“club”],o:[“Evening”,“Date”],s:“Fall/Winter”,r:3,i:“La Nuit de L’Homme + Candies”},
{n:“Cola Fizz Of Tonka Beans”,h:“The Dua Brand”,d:[“gourmand”,“tonka”,“sweet”,“fizzy”],o:[“Casual”],s:“All Season”,r:3,i:“Mancera Tonka Cola”},
{n:“Supernova Cologne Intense”,h:“The Dua Brand”,d:[“fresh”,“aquatic”,“citrus”,“gym”],o:[“Casual”,“Office”,“Outdoors”],s:“Spring/Summer”,r:3,i:“Roja Elysium Eau Intense”},
{n:“Wooden Lucky Charm”,h:“The Dua Brand”,d:[“woody”,“amber”,“clean”,“evening”],o:[“Casual”,“Evening”],s:“Fall/Winter”,r:3,i:“Dior Bois Talisman”},
{n:“Queen Of The Chess”,h:“The Dua Brand”,d:[“chypre”,“woody”,“elegant”,“dark”],o:[“Special event”,“Date”,“Evening”],s:“Fall”,r:3,i:“Mind Games Queening”},
{n:“Dua’s SoHo”,h:“The Dua Brand”,d:[“fresh”,“citrus”,“urban”,“woody”],o:[“Casual”,“Office”],s:“Spring/Fall”,r:3,i:“Bond No. 9 Soho”},
{n:“City of Dua”,h:“The Dua Brand”,d:[“woody”,“amber”,“elegant”,“evening”],o:[“Casual”,“Evening”],s:“Fall/Winter”,r:3,i:“LV City of Stars”},
{n:“Black Widow”,h:“The Dua Brand”,d:[“oud”,“dark”,“amber”,“oriental”],o:[“Evening”,“Special event”],s:“Fall/Winter”,r:3,i:“Kilian Black Phantom”},
{n:“Black Origami”,h:“Maison Alhambra”,d:[“oud”,“dark”,“woody”,“oriental”],o:[“Evening”,“Special event”],s:“Fall/Winter”,r:3,i:“Tom Ford Black Orchid”},
{n:“Daring Blue For Life”,h:“Maison Alhambra”,d:[“blue”,“fresh”,“woody”,“clean”],o:[“Casual”,“Office”],s:“Spring/Summer”,r:3,i:“D&G Light Blue Forever”},
{n:“Glacier Bold”,h:“Maison Alhambra”,d:[“fresh”,“fruity”,“aquatic”,“bold”],o:[“Casual”,“Outdoors”],s:“Spring/Summer”,r:3,i:“JPG Le Beau Le Parfum”},
{n:“Glacier Le Noir”,h:“Maison Alhambra”,d:[“woody”,“spicy”,“dark”,“sweet”],o:[“Date”,“Evening”],s:“Fall/Winter”,r:3,i:“JPG Le Male Le Parfum”},
{n:“Hercules”,h:“Maison Alhambra”,d:[“tobacco”,“woody”,“amber”,“elegant”],o:[“Evening”,“Date”],s:“Fall/Winter”,r:3,i:“Parfums de Marly Herod”},
{n:“Jean Lowe Vibe”,h:“Maison Alhambra”,d:[“fresh”,“citrus”,“aquatic”,“tropical”],o:[“Casual”,“Outdoors”],s:“Spring/Summer”,r:3,i:“LV Pacific Chill”},
{n:“Kismet Angel”,h:“Maison Alhambra”,d:[“sweet”,“vanilla”,“amber”,“boozy”],o:[“Evening”,“Date”],s:“Fall/Winter”,r:3,i:“Kilian Angel’s Share”},
{n:“Perseus”,h:“Maison Alhambra”,d:[“woody”,“clean”,“musk”,“powdery”],o:[“Office”,“Casual”,“Date”],s:“All Season”,r:3,i:“Parfums de Marly Pegasus”},
{n:“Salvo Elixir”,h:“Maison Alhambra”,d:[“spicy”,“woody”,“pepper”,“ambroxan”],o:[“Date”,“Evening”,“Special event”],s:“Fall/Winter”,r:4,i:“Dior Sauvage Elixir”},
{n:“Salvo Intense”,h:“Maison Alhambra”,d:[“fresh”,“spicy”,“ambroxan”,“lavender”],o:[“Casual”,“Office”],s:“All Season”,r:3,i:“Dior Sauvage EDP”},
{n:“Tobacco Touch”,h:“Maison Alhambra”,d:[“tobacco”,“vanilla”,“sweet”,“warm”],o:[“Evening”,“Date”],s:“Fall/Winter”,r:4,i:“Tom Ford Tobacco Vanille”},
{n:“Victorioso”,h:“Maison Alhambra”,d:[“fresh”,“aquatic”,“woody”,“sporty”],o:[“Casual”,“Outdoors”],s:“Spring/Summer”,r:4,i:“Paco Rabanne Invictus”},
{n:“Victorioso Myth”,h:“Maison Alhambra”,d:[“amber”,“woody”,“elegant”,“dark”],o:[“Date”,“Evening”],s:“Fall/Winter”,r:3,i:“Invictus Legend”},
{n:“Victorioso Nero”,h:“Maison Alhambra”,d:[“amber”,“tobacco”,“dark”,“woody”],o:[“Date”,“Evening”],s:“Fall/Winter”,r:3,i:“Invictus Victory Elixir”},
{n:“Yeah Man”,h:“Maison Alhambra”,d:[“fresh”,“woody”,“citrus”,“clean”],o:[“Office”,“Casual”],s:“All Season”,r:3,i:“YSL Y EDP”},
{n:“Your Touch Amber”,h:“Maison Alhambra”,d:[“amber”,“vanilla”,“warm”,“sweet”],o:[“Date”,“Evening”],s:“Fall/Winter”,r:3,i:“Armani Stronger With You Amber”},
{n:“Your Touch Oud”,h:“Maison Alhambra”,d:[“oud”,“amber”,“oriental”,“dark”],o:[“Evening”,“Special event”],s:“Fall/Winter”,r:3,i:“Armani Stronger With You Oud”},
{n:“Your Touch Sandal”,h:“Maison Alhambra”,d:[“sandalwood”,“warm”,“clean”,“elegant”],o:[“Casual”,“Date”,“Evening”],s:“All Season”,r:3,i:“Armani Stronger With You Sandalwood”},
{n:“Opulent Dubai God of Fire”,h:“Lattafa”,d:[“amber”,“oud”,“intense”,“oriental”],o:[“Evening”,“Special event”],s:“Fall/Winter”,r:4,i:””},
{n:“Mashrabya”,h:“Lattafa”,d:[“amber”,“smoky”,“tobacco”,“oriental”],o:[“Evening”,“Date”],s:“Fall/Winter”,r:3,i:“Initio Smoking Hot”},
{n:“Vintage Radio”,h:“Lattafa”,d:[“amber”,“woody”,“elegant”,“date”],o:[“Date”,“Evening”],s:“Fall/Winter”,r:4,i:“Initio Paragon”},
{n:“Najdia Intense”,h:“Lattafa”,d:[“fresh”,“fruity”,“aquatic”,“tropical”],o:[“Casual”,“Outdoors”],s:“Spring/Summer”,r:3,i:“JPG Le Beau Paradise Garden”},
{n:“Qaed Al Fursan”,h:“Lattafa”,d:[“fresh”,“aquatic”,“woody”,“elegant”],o:[“Office”,“Casual”],s:“Spring/Fall”,r:4,i:“Creed Aventus”},
{n:“Hayatti Gold Elixir”,h:“Lattafa”,d:[“amber”,“spicy”,“woody”,“club”],o:[“Date”,“Evening”],s:“Fall/Winter”,r:3,i:“Armani Code Profumo”},
{n:“Ana Abiyedh”,h:“Lattafa”,d:[“musk”,“soft”,“clean”,“skin”],o:[“Casual”,“Office”],s:“All Season”,r:3,i:“White Musk”},
{n:“Teriaq Intense”,h:“Lattafa”,d:[“amber”,“tobacco”,“intense”,“bold”],o:[“Evening”,“Special event”],s:“Fall/Winter”,r:4,i:””},
{n:“Liam Grey”,h:“Lattafa”,d:[“amber”,“woody”,“elegant”,“chic”],o:[“Date”,“Casual”],s:“Fall/Winter”,r:3,i:“BDK Gris Charnel”},
{n:“Opulent Musk”,h:“Lattafa”,d:[“amber”,“musk”,“sweet”,“evening”],o:[“Date”,“Evening”],s:“All Season”,r:4,i:“BR540 x Initio Instant Crush”},
{n:“Bade’e Al Oud For Glory”,h:“Lattafa”,d:[“oud”,“saffron”,“woody”,“oriental”],o:[“Evening”,“Special event”],s:“Fall/Winter”,r:3,i:“Initio Oud for Greatness”},
{n:“Bade’e Al Oud Sublime”,h:“Lattafa”,d:[“fresh”,“fruity”,“aquatic”,“fun”],o:[“Casual”,“Outdoors”],s:“Spring/Summer”,r:3,i:“Kayali Eden Juicy Apple”},
{n:“Bade’e Al Oud Honor & Glory”,h:“Lattafa”,d:[“oud”,“amber”,“bold”,“statement”],o:[“Evening”,“Special event”],s:“Fall/Winter”,r:3,i:””},
{n:“Bade’e Al Oud Amethyst”,h:“Lattafa”,d:[“oud”,“floral”,“rose”,“romantic”],o:[“Date”,“Evening”],s:“Spring/Fall”,r:3,i:“Initio Atomic Rose”},
{n:“Bleu de Chanel EDT”,h:“Designer”,d:[“blue”,“fresh”,“woody”,“citrus”],o:[“Office”,“Casual”,“Date”],s:“All Season”,r:4,i:””},
{n:“Montblanc Legend Spirit”,h:“Designer”,d:[“fresh”,“aquatic”,“clean”,“light”],o:[“Casual”,“Outdoors”],s:“Spring/Summer”,r:3,i:””},
{n:“Nautica Voyage”,h:“Designer”,d:[“aquatic”,“fresh”,“apple”,“clean”],o:[“Casual”,“Outdoors”],s:“Spring/Summer”,r:3,i:””},
{n:“Dior Sauvage EDP”,h:“Designer”,d:[“fresh”,“spicy”,“ambroxan”,“lavender”],o:[“Office”,“Casual”,“Date”],s:“All Season”,r:4,i:””},
{n:“Davidoff Cool Water”,h:“Designer”,d:[“aquatic”,“cool”,“fresh”,“classic”],o:[“Casual”,“Outdoors”],s:“Spring/Summer”,r:3,i:””},
{n:“Valencia Uomo Intense”,h:“Valencia / Millionaire”,d:[“amber”,“floral”,“warm”,“romantic”],o:[“Date”,“Evening”],s:“Fall/Winter”,r:3,i:“Valentino Uomo Intense”},
{n:“Valencia Uomo Fantasy”,h:“Valencia / Millionaire”,d:[“fresh”,“citrus”,“warm”,“casual”],o:[“Casual”,“Outdoors”],s:“Spring/Summer”,r:3,i:“Valentino Born in Roma Coral Fantasy”},
{n:“Valencia Uomo”,h:“Valencia / Millionaire”,d:[“fresh”,“woody”,“casual”,“clean”],o:[“Casual”,“Office”],s:“Spring/Summer”,r:3,i:“Valentino Born in Roma”},
{n:“Millionaire Royal”,h:“Valencia / Millionaire”,d:[“amber”,“citrus”,“gourmand”,“club”],o:[“Date”,“Evening”],s:“Fall/Winter”,r:3,i:“1 Million Royal”},
{n:“Island Dreams”,h:“Khadlaj”,d:[“floral”,“woody”,“elegant”,“upscale”],o:[“Casual”,“Date”,“Evening”],s:“Spring/Fall”,r:3,i:“LV Symphony”},
{n:“Shiyaaka Snow”,h:“Khadlaj”,d:[“fresh”,“aquatic”,“clean”,“office”],o:[“Office”,“Casual”],s:“Spring/Summer”,r:3,i:“LV Meteore”},
{n:“Shiyaaka Blue”,h:“Khadlaj”,d:[“blue”,“fresh”,“clean”,“versatile”],o:[“Office”,“Casual”],s:“All Season”,r:3,i:“Bleu de Chanel”},
{n:“Epoque Artistique”,h:“Khadlaj”,d:[“amber”,“tobacco”,“dark”,“formal”],o:[“Date”,“Evening”],s:“Fall/Winter”,r:3,i:“Invictus Victory Elixir”},
{n:“Haven Eclipse”,h:“Mod Fragrances”,d:[“woody”,“amber”,“elegant”,“date”],o:[“Date”,“Evening”,“Office”],s:“Fall”,r:4,i:“Xerjoff Torino 22”},
{n:“Secret Embers”,h:“Mod Fragrances”,d:[“amber”,“spicy”,“seductive”,“evening”],o:[“Date”,“Evening”],s:“Fall/Winter”,r:4,i:“Initio Side Effect”},
{n:“Musk Melody”,h:“Mod Fragrances”,d:[“musk”,“soft”,“clean”,“skin”],o:[“Casual”,“Office”],s:“All Season”,r:3,i:“Initio Musk Therapy”},
{n:“Reverence Extrait”,h:“Mod Fragrances”,d:[“woody”,“clean”,“musk”,“elegant”],o:[“Office”,“Casual”,“Date”],s:“Spring/Fall”,r:4,i:“Parfums de Marly Percival”},
{n:“The Exposed Extrait”,h:“Mod Fragrances”,d:[“bold”,“evening”,“statement”,“dark”],o:[“Evening”,“Special event”],s:“Fall/Winter”,r:3,i:“Mind Games En Prise”},
{n:“Fattan”,h:“Rasasi”,d:[“vetiver”,“woody”,“earthy”,“herbal”],o:[“Office”,“Casual”],s:“All Season”,r:3,i:“Terre d’Hermes”},
{n:“Hawas Ice”,h:“Rasasi”,d:[“fresh”,“icy”,“aquatic”,“sporty”],o:[“Casual”,“Outdoors”],s:“Spring/Summer”,r:4,i:””},
{n:“Hawas Kobra”,h:“Rasasi”,d:[“aquatic”,“fresh”,“ozonic”,“clean”],o:[“Casual”,“Outdoors”],s:“Spring/Summer”,r:3,i:“LV Imagination”},
{n:“Itqan Noir”,h:“Zimaya”,d:[“woody”,“fresh”,“dark”,“elegant”],o:[“Date”,“Evening”],s:“Fall/Winter”,r:3,i:“YSL MYSLF”},
{n:“Reverie Aqua Pour Homme”,h:“Zimaya”,d:[“aquatic”,“fresh”,“casual”,“clean”],o:[“Casual”,“Office”],s:“Spring/Summer”,r:4,i:“Valentino Born in Roma Intense”},
{n:“Abadi Opulent”,h:“Zimaya”,d:[“amber”,“woody”,“upscale”,“evening”],o:[“Date”,“Evening”],s:“Fall/Winter”,r:3,i:“YSL Y Elixir”},
{n:“Wazir”,h:“Yom & Layl”,d:[“oud”,“amber”,“oriental”,“upscale”],o:[“Date”,“Evening”],s:“Fall/Winter”,r:4,i:“Mind Games Queening”},
{n:“Raazi”,h:“Yom & Layl”,d:[“amber”,“spicy”,“social”,“evening”],o:[“Evening”,“Casual”],s:“Fall/Winter”,r:3,i:“Mind Games J’Adoube”},
{n:“Rayees”,h:“Yom & Layl”,d:[“woody”,“fresh”,“office”,“clean”],o:[“Office”,“Casual”],s:“Spring/Fall”,r:3,i:“Mind Games Grand Masters”},
{n:“Nor”,h:“Yom & Layl”,d:[“fresh”,“clean”,“light”,“daytime”],o:[“Casual”,“Office”],s:“Spring/Summer”,r:3,i:“Mind Games Lionora”},
{n:“Limitless”,h:“Yom & Layl”,d:[“bold”,“evening”,“statement”,“dark”],o:[“Evening”,“Special event”],s:“Fall/Winter”,r:3,i:“Mind Games Blockade”},
{n:“Gladiator”,h:“Yom & Layl”,d:[“bold”,“grand”,“evening”,“statement”],o:[“Special event”,“Evening”],s:“Fall/Winter”,r:3,i:“Argos Triumph of Bacchus”},
{n:“Le Parfait”,h:“Armaf”,d:[“fresh”,“green”,“woody”,“aquatic”],o:[“Office”,“Casual”],s:“Spring/Summer”,r:4,i:“Creed Aventus x Green Irish Tweed”},
{n:“Club de Nuit Milestone”,h:“Armaf”,d:[“fresh”,“aquatic”,“citrus”,“elegant”],o:[“Casual”,“Date”],s:“Spring/Summer”,r:4,i:“Creed Millesime Imperial”},
{n:“Anti Social Parfum Club Most Wanted”,h:“Singles”,d:[“amber”,“tobacco”,“woody”,“bold”],o:[“Date”,“Evening”],s:“Fall/Winter”,r:4,i:“Azzaro The Most Wanted”},
{n:“Afnan Supremacy Collector’s Edition”,h:“Singles”,d:[“fresh”,“aquatic”,“fruity”,“woody”],o:[“Casual”,“Office”,“Date”],s:“Spring/Fall”,r:4,i:“Creed Aventus Absolu”},
{n:“Ajmal Evoke Gold”,h:“Singles”,d:[“woody”,“fresh”,“clean”,“elegant”],o:[“Office”,“Casual”],s:“All Season”,r:3,i:“Prada L’Homme”},
{n:“Al Haramain Detour Noir”,h:“Singles”,d:[“amber”,“spicy”,“woody”,“versatile”],o:[“Date”,“Office”],s:“Fall/Winter”,r:3,i:“Parfums de Marly Layton”},
{n:“Crown / Al-Rehab Silver”,h:“Singles”,d:[“fresh”,“clean”,“aquatic”,“light”],o:[“Casual”,“Office”],s:“Spring/Summer”,r:3,i:“Creed Silver Mountain Water”},
{n:“Atralia Amazonas Avalanche”,h:“Singles”,d:[“woody”,“floral”,“intense”,“formal”],o:[“Date”,“Evening”],s:“Fall/Winter”,r:3,i:“Dior Homme Intense”},
{n:“French Avenue Liquid Brun”,h:“Singles”,d:[“woody”,“amber”,“elegant”,“refined”],o:[“Office”,“Date”,“Evening”],s:“Fall”,r:4,i:“Parfums de Marly Althair”},
{n:“Game of Spades Wildcard”,h:“Singles”,d:[“amber”,“urban”,“evening”,“bold”],o:[“Evening”,“Special event”],s:“Fall/Winter”,r:3,i:“Bond No. 9 Lafayette Street”},
{n:“Grandeur Iconic Built”,h:“Singles”,d:[“electric”,“blue”,“bold”,“club”],o:[“Evening”,“Special event”],s:“Fall/Winter”,r:3,i:“YSL Bleu Electrique”},
{n:“Paris Corner Rifaqat”,h:“Singles”,d:[“musk”,“soft”,“cozy”,“skin”],o:[“Casual”,“Evening”],s:“Fall/Winter”,r:3,i:“YSL Babycat”},
{n:“Rayhaan Aquatica”,h:“Singles”,d:[“aquatic”,“citrus”,“fresh”,“beach”],o:[“Casual”,“Outdoors”],s:“Spring/Summer”,r:3,i:“Creed Virgin Island Water”},
{n:“Royalty by Maluma Onyx”,h:“Singles”,d:[“amber”,“club”,“evening”,“bold”],o:[“Date”,“Evening”],s:“Fall/Winter”,r:3,i:“1 Million Prive-adjacent”},
{n:“Vurv Royce Black”,h:“Singles”,d:[“amber”,“dark”,“club”,“bold”],o:[“Date”,“Evening”],s:“Fall/Winter”,r:3,i:“1 Million Prive-adjacent”},
{n:“Suits”,h:“Fragrance World”,d:[“fougere”,“fresh”,“lavender”,“woody”],o:[“Office”,“Casual”],s:“All Season”,r:4,i:“YSL Tuxedo”},
{n:“Lust Cherry”,h:“Fragrance World”,d:[“cherry”,“sweet”,“dark”,“romantic”],o:[“Date”,“Evening”],s:“Fall/Winter”,r:3,i:“Tom Ford Lost Cherry”},
{n:“Intense Peach”,h:“Fragrance World”,d:[“peach”,“sweet”,“bold”,“evening”],o:[“Evening”,“Date”],s:“Fall”,r:3,i:“Tom Ford Bitter Peach”},
{n:“Oud Wonder”,h:“Fragrance World”,d:[“oud”,“woody”,“refined”,“office”],o:[“Office”,“Casual”,“Date”],s:“Fall/Winter”,r:3,i:“Tom Ford Oud Wood”},
{n:“Ebony Fume”,h:“Fragrance World”,d:[“smoky”,“dark”,“formal”,“evening”],o:[“Evening”,“Special event”],s:“Fall/Winter”,r:4,i:“Tom Ford Ebene Fume”},
{n:“Proud of You”,h:“Fragrance World”,d:[“woody”,“fresh”,“casual”,“office”],o:[“Office”,“Casual”],s:“Fall/Winter”,r:3,i:“Armani Stronger With You”},
{n:“Proud of You Absolute”,h:“Fragrance World”,d:[“woody”,“amber”,“upscale”,“evening”],o:[“Date”,“Evening”],s:“Fall/Winter”,r:3,i:“Armani Stronger With You Absolutely”},
{n:“La Uno Million Elixir”,h:“Fragrance World”,d:[“gourmand”,“citrus”,“amber”,“club”],o:[“Date”,“Evening”],s:“Fall/Winter”,r:4,i:“Paco Rabanne 1 Million Elixir”},
{n:“Neroli Riviera”,h:“Fragrance World”,d:[“citrus”,“neroli”,“fresh”,“beach”],o:[“Casual”,“Outdoors”],s:“Spring/Summer”,r:4,i:“Tom Ford Neroli Portofino”}
];

const LAYERS=[
{base:“Ottoman Breeze”,top:“His Perspective Extrait”,ratio:“2+2”,occ:“Spring transitional / casual office”,notes:“Fresh aquatic base + woody amber lift.”},
{base:“Poseidon’s Swimming Cologne”,top:“His Perspective Extrait”,ratio:“2+2”,occ:“Casual daytime”,notes:“Marine freshness + woody elevation.”},
{base:“Jean Lowe Immortal”,top:“Ameer Al Oudh Intense”,ratio:“2:1”,occ:“Evening”,notes:“Warm vanilla base + oud smoky accent.”},
{base:“Midnight Rendezvous”,top:“Aphrodisiac”,ratio:“2+2”,occ:“Bold indoor evening / date”,notes:“Add Wazir oil on pulse points.”},
{base:“Bleu de Dua Attar”,top:“His Perspective Extrait”,ratio:“3+2”,occ:“Office signature”,notes:“Blue anchor + perspective lift.”},
{base:“River Fougere”,top:“Linen Vetiver”,ratio:“2+2”,occ:“Spring outdoors / weekend”,notes:“Fougere freshness grounded by vetiver.”}
];

const GD={bg:”#0A0A0F”,surface:”#1A1A24”,ash:”#252535”,gold:”#C9A84C”,gd:”#8B6F32”,silver:”#9090A8”,fog:”#6A6A80”,cream:”#E8E4D8”,pearl:”#F2F0EA”,border:“rgba(255,255,255,0.07)”,bg2:“rgba(201,168,76,0.25)”,ok:”#6ABD88”,err:”#E07070”,info:”#7A9CCC”};
const GL={bg:”#F5F3EE”,surface:”#FFFFFF”,ash:”#F0EDE6”,gold:”#8B6020”,gd:”#A07030”,silver:”#6A6070”,fog:”#9A9590”,cream:”#2C2820”,pearl:”#1A1510”,border:“rgba(0,0,0,0.08)”,bg2:“rgba(139,96,32,0.3)”,ok:”#2A7A4A”,err:”#B03030”,info:”#3A5A9C”};
const TABS=[“Home”,“Collection”,“Wear Today”,“Layering”,“Compare”,“Buy/Skip”,“Display”,“Journal”,“Analytics”];

async function ai(prompt){
try{
const r=await fetch(“https://api.anthropic.com/v1/messages”,{
method:“POST”,
headers:{“Content-Type”:“application/json”},
body:JSON.stringify({
model:“claude-sonnet-4-20250514”,
max_tokens:1000,
system:“You are a master fragrance advisor for AJ. Profile: masculine, loves fresh/blue/green/fougere/vetiver/woody/quiet luxury/amber/tobacco/elegant evening. 164 bottles, 15 houses. Anchors: Bleu de Dua Attar★, Khamrah Qahwa★, Ottoman Breeze★, His Perspective Extrait★, Jean Lowe Immortal★, MIRIS No54602★. Key layers: Ottoman Breeze+His Perspective Extrait 2+2 (spring), Jean Lowe Immortal+Ameer Al Oudh Intense 2:1 (evening). Arlington VA. Be specific, decisive, collector-grade. Max 280 words.”,
messages:[{role:“user”,content:prompt}]
})
});
const d=await r.json();
return d?.content?.[0]?.text||(d?.error?“API Error: “+d.error.message:“No response”);
}catch(e){return”Error: “+e.message;}
}

function Sp(){return <div style={{width:14,height:14,borderRadius:“50%”,border:“2px solid rgba(201,168,76,0.3)”,borderTopColor:”#C9A84C”,animation:“fvspin 0.8s linear infinite”,flexShrink:0}}/>;}

function AIB({res,load,t}){
if(!res&&!load)return null;
return <div style={{background:t.ash,border:`1px solid ${t.bg2}`,borderRadius:10,padding:14,marginTop:12}}>
<div style={{fontSize:10,color:t.gold,textTransform:“uppercase”,letterSpacing:”.1em”,marginBottom:8,display:“flex”,alignItems:“center”,gap:6}}>
<span style={{width:6,height:6,borderRadius:“50%”,background:t.gold,display:“inline-block”}}/>Advisor
</div>
{load?<div style={{display:“flex”,alignItems:“center”,gap:10,color:t.fog}}><Sp/>Consulting the vault…</div>
:<div style={{color:t.cream,fontSize:13,lineHeight:1.7,whiteSpace:“pre-wrap”}}>{res}</div>}

  </div>;
}

function useAI(){
const [res,setRes]=useState(””);
const [load,setLoad]=useState(false);
async function run(prompt){setLoad(true);setRes(””);const r=await ai(prompt);setRes(r);setLoad(false);}
return{res,load,run,setRes};
}

export default function App(){
const [tab,setTab]=useState(0);
const [dark,setDark]=useState(true);
const t=dark?GD:GL;
const [coll,setColl]=useState(COLL);
const [layers,setLayers]=useState(()=>{try{return JSON.parse(localStorage.getItem(“fvL6”))||LAYERS;}catch{return LAYERS;}});
const [journal,setJournal]=useState(()=>{try{return JSON.parse(localStorage.getItem(“fvJ6”))||[];}catch{return[];}});
const [evals,setEvals]=useState(()=>{try{return JSON.parse(localStorage.getItem(“fvE6”))||[];}catch{return[];}});
const [weather,setWeather]=useState(null);

useEffect(()=>{
const s=document.createElement(“style”);
s.textContent=”@keyframes fvspin{to{transform:rotate(360deg)}}”;
document.head.appendChild(s);
fetch(“https://api.open-meteo.com/v1/forecast?latitude=38.88&longitude=-77.10&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&temperature_unit=fahrenheit&wind_speed_unit=mph”)
.then(r=>r.json()).then(d=>setWeather(d.current)).catch(()=>{});
},[]);

useEffect(()=>{try{localStorage.setItem(“fvL6”,JSON.stringify(layers));}catch{}},[layers]);
useEffect(()=>{try{localStorage.setItem(“fvJ6”,JSON.stringify(journal));}catch{}},[journal]);
useEffect(()=>{try{localStorage.setItem(“fvE6”,JSON.stringify(evals));}catch{}},[evals]);

const wx=()=>{
if(!weather)return”Arlington VA”;
const c={0:“Clear”,1:“Mostly Clear”,2:“Partly Cloudy”,3:“Overcast”,61:“Light Rain”,63:“Rain”,80:“Showers”,95:“Thunderstorm”};
return`${Math.round(weather.temperature_2m)}°F ${c[weather.weather_code]||"Clear"} wind ${Math.round(weather.wind_speed_10m)}mph humidity ${weather.relative_humidity_2m}%`;
};
const wl=()=>{
if(!weather)return”Arlington, VA”;
const c={0:“Clear ☀”,2:“Partly Cloudy ⛅”,3:“Overcast ☁”,61:“Rain 🌧”,80:“Showers 🌦”,95:“Storm ⛈”};
return`${Math.round(weather.temperature_2m)}°F · ${c[weather.weather_code]||"Clear ☀"}`;
};

const p={coll,setColl,layers,setLayers,journal,setJournal,evals,setEvals,t,wx,weather};
const screens=[
<Home {…p} setTab={setTab} wl={wl}/>,
<Coll {…p}/>,
<Wear {…p}/>,
<Layer {…p}/>,
<Cmp {…p}/>,
<Buy {…p}/>,
<Disp {…p}/>,
<Journal {…p}/>,
<Ana {…p}/>
];

const {bg,surface,ash,gold,fog,cream,pearl,border,bg2,silver}=t;
const row={display:“flex”,alignItems:“center”,justifyContent:“space-between”,padding:“12px 16px”,borderBottom:`1px solid ${bg2}`,background:bg,position:“sticky”,top:0,zIndex:100};

return <div style={{background:bg,color:cream,fontFamily:“system-ui,sans-serif”,fontSize:13,minHeight:“100vh”,display:“flex”,flexDirection:“column”}}>
<div style={row}>
<div style={{fontFamily:“Georgia,serif”,fontSize:18,color:gold,letterSpacing:”.1em”}}>FragVault<span style={{fontStyle:“italic”,fontSize:12,color:silver,marginLeft:6}}>Pro</span></div>
<div style={{display:“flex”,gap:8,alignItems:“center”}}>
<div style={{padding:“4px 10px”,background:surface,border:`1px solid ${bg2}`,borderRadius:20,fontSize:11,color:gold,fontWeight:500}}>{wl()}</div>
<button onClick={()=>setDark(d=>!d)} style={{padding:“4px 10px”,background:ash,border:`1px solid ${border}`,borderRadius:20,fontSize:11,color:silver,cursor:“pointer”,fontFamily:“inherit”}}>{dark?“☀ Light”:“◑ Dark”}</button>
</div>
</div>
<div style={{display:“flex”,overflowX:“auto”,background:surface,borderBottom:`1px solid ${border}`,padding:“0 10px”,scrollbarWidth:“none”}}>
{TABS.map((n,i)=><button key={i} onClick={()=>setTab(i)} style={{padding:“9px 10px”,fontSize:10,fontWeight:600,letterSpacing:”.08em”,textTransform:“uppercase”,cursor:“pointer”,border:“none”,borderBottom:tab===i?`2px solid ${gold}`:“2px solid transparent”,color:tab===i?gold:fog,background:“none”,whiteSpace:“nowrap”,fontFamily:“inherit”}}>{n}</button>)}
</div>
<div style={{flex:1,padding:14,maxWidth:1100,margin:“0 auto”,width:“100%”}}>{screens[tab]}</div>

  </div>;
}

const inp=(t)=>({background:t.ash,border:`1px solid ${t.border}`,borderRadius:6,color:t.cream,fontFamily:“inherit”,fontSize:13,padding:“8px 10px”,width:“100%”,outline:“none”});
const lbl=(t)=>({fontSize:10,color:t.fog,textTransform:“uppercase”,letterSpacing:”.07em”,display:“block”,marginBottom:4});
const card=(t,g=false)=>({background:t.surface,border:`1px solid ${g?t.bg2:t.border}`,borderRadius:12,padding:14});
const btnG=(t)=>({padding:“8px 14px”,borderRadius:6,fontSize:12,fontWeight:500,cursor:“pointer”,border:“none”,background:t.gold,color:”#0A0A0F”,fontFamily:“inherit”});
const btnO=(t)=>({padding:“8px 14px”,borderRadius:6,fontSize:12,fontWeight:500,cursor:“pointer”,border:`1px solid ${t.border}`,background:“transparent”,color:t.silver,fontFamily:“inherit”});
const ttl=(t)=>({fontFamily:“Georgia,serif”,fontSize:22,fontWeight:300,color:t.pearl,marginBottom:3});
const sub=(t)=>({fontSize:10,color:t.fog,textTransform:“uppercase”,letterSpacing:”.09em”,marginBottom:14});
const g2={display:“grid”,gridTemplateColumns:“1fr 1fr”,gap:12};
const g4={display:“grid”,gridTemplateColumns:“repeat(4,1fr)”,gap:10};
const stat=(t)=>({background:t.ash,borderRadius:8,padding:“11px 13px”,textAlign:“center”,border:`1px solid ${t.border}`});

function Home({coll,journal,layers,wx,wl,setTab,t,weather}){
const A=useAI();
const [occ,setOcc]=useState(””);
const stars=coll.filter(f=>f.r===5);
return <div>
<div style={{textAlign:“center”,padding:“18px 0 14px”}}>
<div style={{fontFamily:“Georgia,serif”,fontSize:34,fontWeight:300,color:t.pearl,lineHeight:1.1,marginBottom:5}}>The Vault Is Open</div>
<div style={{fontSize:11,color:t.fog,letterSpacing:”.1em”,textTransform:“uppercase”,marginBottom:18}}>{coll.length} bottles · {new Set(coll.map(f=>f.h)).size} houses · your fragrance intelligence</div>
<div style={{display:“flex”,gap:8,justifyContent:“center”,flexWrap:“wrap”}}>
<button style={btnG(t)} onClick={()=>setTab(2)}>Wear Today</button>
<button style={btnO(t)} onClick={()=>setTab(5)}>Buy or Skip</button>
<button style={btnO(t)} onClick={()=>setTab(1)}>Collection</button>
</div>
</div>
<div style={{...g4,marginBottom:14}}>
{[[coll.length,“Bottles”],[new Set(coll.map(f=>f.h)).size,“Houses”],[journal.length,“Wears”],[layers.length,“Combos”]].map(([n,l])=>
<div key={l} style={stat(t)}><div style={{fontFamily:“Georgia,serif”,fontSize:24,fontWeight:300,color:t.gold}}>{n}</div><div style={{fontSize:10,color:t.fog,textTransform:“uppercase”,letterSpacing:”.1em”,marginTop:2}}>{l}</div></div>
)}
</div>
<div style={g2}>
<div style={card(t,true)}>
<div style={{fontSize:10,color:t.fog,textTransform:“uppercase”,letterSpacing:”.09em”,marginBottom:8}}>Quick Recommendation</div>
<div style={{marginBottom:10}}><label style={lbl(t)}>Occasion</label>
<select style={inp(t)} value={occ} onChange={e=>setOcc(e.target.value)}>
<option value="">Select…</option>
{[“Office”,“Date”,“Casual”,“Outdoors”,“Evening”,“Travel”,“Special event”].map(o=><option key={o}>{o}</option>)}
</select>
</div>
<button style={{…btnG(t),width:“100%”}} onClick={()=>occ&&A.run(`Quick wear rec. Weather: ${wx()}. Occasion: ${occ}. Give safe pick + unique pick. Name specific bottles from AJ's ${coll.length}-bottle collection.`)}>Ask the Advisor</button>
<AIB res={A.res} load={A.load} t={t}/>
</div>
<div style={card(t)}>
<div style={{fontSize:10,color:t.fog,textTransform:“uppercase”,marginBottom:8}}>Five-Star Anchors</div>
{stars.map(f=><div key={f.n} style={{display:“flex”,alignItems:“center”,gap:8,padding:“6px 0”,borderBottom:`1px solid ${t.border}`}}>
<div style={{flex:1}}><div style={{fontSize:13,color:t.pearl}}>{f.n}</div><div style={{fontSize:11,color:t.fog}}>{f.h}</div></div>
<div style={{color:t.gold,fontSize:11}}>{“★”.repeat(f.r)}</div>
</div>)}
{journal.length>0&&<>
<div style={{fontSize:10,color:t.fog,textTransform:“uppercase”,margin:“10px 0 6px”}}>Recent Journal</div>
{[…journal].reverse().slice(0,3).map((e,i)=><div key={i} style={{padding:“5px 0”,borderBottom:`1px solid ${t.border}`}}>
<div style={{fontSize:12,color:t.pearl}}>{e.frag}</div>
<div style={{fontSize:11,color:t.fog}}>{e.date} · {e.occ}</div>
</div>)}
</>}
</div>
</div>

  </div>;
}

function Coll({coll,setColl,t}){
const [q,setQ]=useState(””); const [hf,setHf]=useState(””); const [df,setDf]=useState(””);
const [sel,setSel]=useState(null); const [showAdd,setShowAdd]=useState(false);
const [newF,setNewF]=useState({n:””,h:””,d:””,i:””,r:3});
const [aiMap,setAiMap]=useState({});
const houses=[…new Set(coll.map(f=>f.h))].sort();
const filtered=coll.filter(f=>{
if(q&&!f.n.toLowerCase().includes(q.toLowerCase())&&!f.h.toLowerCase().includes(q.toLowerCase())&&!f.d.some(d=>d.includes(q.toLowerCase())))return false;
if(hf&&f.h!==hf)return false;
if(df&&!f.d.some(d=>d.includes(df)))return false;
return true;
});
function addFrag(){
if(!newF.n)return;
setColl(c=>[…c,{…newF,d:newF.d.split(”,”).map(x=>x.trim()).filter(Boolean),o:[“Casual”],r:parseInt(newF.r)||3}]);
setShowAdd(false);setNewF({n:””,h:””,d:””,i:””,r:3});
}
async function ask(idx){
const f=coll[idx];
setAiMap(m=>({…m,[idx]:{load:true,res:””}}));
const r=await ai(`Wearing guide for "${f.n}" (${f.h}). DNA: ${f.d.join(", ")}. Cover: best occasions, performance, layering potential with my collection, am I underusing it?`);
setAiMap(m=>({…m,[idx]:{load:false,res:r}}));
}
return <div>
<div style={{display:“flex”,justifyContent:“space-between”,alignItems:“flex-start”,marginBottom:3}}>
<div style={ttl(t)}>Collection</div>
<button style={{…btnG(t),padding:“5px 11px”,fontSize:11}} onClick={()=>setShowAdd(!showAdd)}>+ Add</button>
</div>
<div style={sub(t)}>{filtered.length} of {coll.length} bottles</div>
{showAdd&&<div style={{...card(t,true),marginBottom:12}}>
<div style={{...g2,marginBottom:8}}>
<div><label style={lbl(t)}>Name</label><input style={inp(t)} value={newF.n} onChange={e=>setNewF(f=>({…f,n:e.target.value}))} placeholder=“Name”/></div>
<div><label style={lbl(t)}>House</label><input style={inp(t)} value={newF.h} onChange={e=>setNewF(f=>({…f,h:e.target.value}))} placeholder=“Brand”/></div>
</div>
<div style={{marginBottom:8}}><label style={lbl(t)}>DNA (comma sep)</label><input style={inp(t)} value={newF.d} onChange={e=>setNewF(f=>({…f,d:e.target.value}))} placeholder=“fresh, blue, woody…”/></div>
<div style={{display:“flex”,gap:8}}><button style={btnG(t)} onClick={addFrag}>Save</button><button style={btnO(t)} onClick={()=>setShowAdd(false)}>Cancel</button></div>
</div>}
<div style={{display:“flex”,gap:8,marginBottom:12,flexWrap:“wrap”}}>
<input style={{…inp(t),maxWidth:190}} placeholder=“Search…” value={q} onChange={e=>setQ(e.target.value)}/>
<select style={{…inp(t),width:“auto”,minWidth:130}} value={hf} onChange={e=>setHf(e.target.value)}><option value="">All Houses</option>{houses.map(h=><option key={h}>{h}</option>)}</select>
<select style={{…inp(t),width:“auto”,minWidth:120}} value={df} onChange={e=>setDf(e.target.value)}><option value="">All DNA</option>{[“fresh”,“blue”,“green”,“fougere”,“vetiver”,“woody”,“amber”,“tobacco”,“oud”,“gourmand”,“aquatic”,“oriental”].map(d=><option key={d}>{d}</option>)}</select>
</div>
<div style={{display:“grid”,gridTemplateColumns:“repeat(auto-fill,minmax(195px,1fr))”,gap:8}}>
{filtered.map(f=>{const idx=coll.indexOf(f);const on=sel===idx;return <div key={f.n} onClick={()=>setSel(on?null:idx)} style={{background:on?“rgba(201,168,76,0.07)”:t.surface,border:`1px solid ${on?t.gold:t.border}`,borderRadius:8,padding:“10px 12px”,cursor:“pointer”}}>
<div style={{display:“flex”,justifyContent:“space-between”,alignItems:“flex-start”}}>
<div><div style={{fontSize:13,fontWeight:500,color:t.pearl,marginBottom:1}}>{f.n}</div><div style={{fontSize:11,color:t.fog}}>{f.h}</div></div>
<div style={{color:t.gold,fontSize:10,flexShrink:0}}>{“★”.repeat(f.r)}</div>
</div>
<div style={{display:“flex”,flexWrap:“wrap”,gap:3,margin:“5px 0 3px”}}>{f.d.slice(0,3).map(d=><span key={d} style={{fontSize:10,padding:“1px 5px”,borderRadius:10,background:“rgba(201,168,76,.1)”,color:t.gd,border:`1px solid ${t.bg2}`}}>{d}</span>)}</div>
{f.i&&<div style={{fontSize:10,color:t.fog}}>Insp: {f.i}</div>}
{on&&<div style={{marginTop:9,paddingTop:9,borderTop:`1px solid ${t.border}`}}>
<div style={{fontSize:11,color:t.silver,marginBottom:6}}>{f.s} · {f.o?.join(” · “)}</div>
<button onClick={e=>{e.stopPropagation();ask(idx);}} style={{…btnG(t),padding:“5px 10px”,fontSize:11}}>Ask Advisor</button>
<AIB res={aiMap[idx]?.res} load={aiMap[idx]?.load} t={t}/>
</div>}
</div>;})}
</div>

  </div>;
}

function Wear({coll,wx,weather,t}){
const A=useAI();
const [occ,setOcc]=useState(””); const [mood,setMood]=useState(””);
const codes={0:“Clear”,2:“Partly Cloudy”,3:“Overcast”,61:“Light Rain”,63:“Rain”,80:“Showers”,95:“Thunderstorm”};
return <div>
<div style={ttl(t)}>Wear Today</div>
<div style={sub(t)}>AI picks based on current conditions</div>
<div style={{...g2,marginBottom:14}}>
<div style={card(t)}>
<div style={{fontSize:10,color:t.fog,textTransform:“uppercase”,marginBottom:10}}>Arlington, VA — Conditions</div>
{weather?<div style={{display:“grid”,gridTemplateColumns:“1fr 1fr”,gap:10}}>
{[[`${Math.round(weather.temperature_2m)}°F`,“Temperature”],[codes[weather.weather_code]||“Clear”,“Conditions”],[`${Math.round(weather.wind_speed_10m)} mph`,“Wind”],[`${weather.relative_humidity_2m}%`,“Humidity”]].map(([v,l])=>
<div key={l}><div style={{fontSize:10,color:t.fog,marginBottom:2}}>{l}</div><div style={{fontSize:15,color:t.gold,fontFamily:“Georgia,serif”}}>{v}</div></div>
)}
</div>:<div style={{color:t.fog,fontSize:12}}>Loading weather…</div>}
</div>
<div style={card(t,true)}>
<div style={{marginBottom:10}}><label style={lbl(t)}>Occasion</label>
<select style={inp(t)} value={occ} onChange={e=>setOcc(e.target.value)}><option value="">Any</option>{[“Office”,“Date”,“Casual”,“Outdoors”,“Evening”,“Travel”,“Special event”].map(o=><option key={o}>{o}</option>)}</select>
</div>
<div style={{marginBottom:12}}><label style={lbl(t)}>Mood</label>
<select style={inp(t)} value={mood} onChange={e=>setMood(e.target.value)}><option value="">Any</option>{[“Bold”,“Quiet luxury”,“Fresh & clean”,“Romantic”,“Professional”].map(m=><option key={m}>{m}</option>)}</select>
</div>
<button style={{…btnG(t),width:“100%”}} onClick={()=>A.run(`AJ needs wear picks. Weather: ${wx()}. Occasion: ${occ||"any"}. Mood: ${mood||"any"}.\nCollection sample: ${coll.slice(0,50).map(f=>`${f.n}(${f.d.join(”,”)})`).join(";")}\nGive:\n🟢 SAFE PICK — name, why, layering tip\n⭐ UNIQUE PICK — name, why\n💪 BEST PERFORMER — name, why`)}>Generate Picks</button>
</div>
</div>
<AIB res={A.res} load={A.load} t={t}/>

  </div>;
}

function Layer({coll,layers,setLayers,t}){
const A=useAI(); const V=useAI();
const [base,setBase]=useState(””); const [top,setTop]=useState(””);
const [ratio,setRatio]=useState(””); const [notes,setNotes]=useState(””);
const [vibe,setVibe]=useState(””); const [msg,setMsg]=useState(””);
const opts=coll.map(f=><option key={f.n} value={f.n}>{f.n} · {f.h}</option>);
function save(){
if(!base||!top)return;
setLayers(l=>[…l,{base,top,ratio,occ:“Custom”,notes}]);
setMsg(“Saved!”); setTimeout(()=>setMsg(””),2000);
setBase(””);setTop(””);setRatio(””);setNotes(””);
}
return <div>
<div style={ttl(t)}>Layering Lab</div>
<div style={sub(t)}>Craft and analyze signature combinations</div>
<div style={{...g2,marginBottom:12}}>
<div style={card(t,true)}>
<div style={{fontSize:10,color:t.fog,textTransform:“uppercase”,marginBottom:10}}>Build a Combo</div>
<div style={{marginBottom:8}}><label style={lbl(t)}>Base</label><select style={inp(t)} value={base} onChange={e=>setBase(e.target.value)}><option value="">Select base…</option>{opts}</select></div>
<div style={{marginBottom:8}}><label style={lbl(t)}>Top / Accent</label><select style={inp(t)} value={top} onChange={e=>setTop(e.target.value)}><option value="">Select accent…</option>{opts}</select></div>
<div style={{marginBottom:8}}><label style={lbl(t)}>Ratio</label><input style={inp(t)} value={ratio} onChange={e=>setRatio(e.target.value)} placeholder=“e.g. 3:2”/></div>
<div style={{marginBottom:10}}><label style={lbl(t)}>Notes</label><textarea style={{…inp(t),minHeight:55,resize:“vertical”}} value={notes} onChange={e=>setNotes(e.target.value)} placeholder=“Occasion, impressions…”/></div>
<div style={{display:“flex”,gap:8,alignItems:“center”}}>
<button style={btnG(t)} onClick={()=>{if(!base||!top){setMsg(“Select both first.”);return;}const bf=coll.find(f=>f.n===base),tf=coll.find(f=>f.n===top);A.run(`Analyze layering combo:\nBase: ${base} (DNA: ${bf?.d.join(",")})\nTop: ${top} (DNA: ${tf?.d.join(",")})\n1. Synergy score/10\n2. Recommended ratio\n3. Best occasion\n4. Application order\n5. Winner or clash verdict`);}}>Analyze</button>
<button style={btnO(t)} onClick={save}>Save</button>
{msg&&<span style={{fontSize:12,color:msg===“Saved!”?t.ok:t.err}}>{msg}</span>}
</div>
<AIB res={A.res} load={A.load} t={t}/>
</div>
<div style={card(t)}>
<div style={{fontSize:10,color:t.fog,textTransform:“uppercase”,marginBottom:8}}>Saved Combos ({layers.length})</div>
<div style={{maxHeight:380,overflowY:“auto”}}>
{layers.map((l,i)=><div key={i} style={{background:t.ash,borderRadius:7,padding:10,border:`1px solid ${t.border}`,marginBottom:6}}>
<div style={{display:“flex”,justifyContent:“space-between”,alignItems:“flex-start”}}>
<div style={{flex:1}}>
<div style={{display:“flex”,alignItems:“center”,gap:4,flexWrap:“wrap”,marginBottom:2}}>
<span style={{fontSize:12,fontWeight:500,color:t.pearl}}>{l.base}</span>
<span style={{color:t.gold}}>+</span>
<span style={{fontSize:12,fontWeight:500,color:t.pearl}}>{l.top}</span>
{l.ratio&&<span style={{fontSize:10,color:t.fog}}>({l.ratio})</span>}
</div>
<div style={{fontSize:11,color:t.fog}}>{l.occ}</div>
{l.notes&&<div style={{fontSize:11,color:t.silver,marginTop:2}}>{l.notes}</div>}
</div>
<button onClick={()=>setLayers(ls=>ls.filter((_,j)=>j!==i))} style={{background:“none”,border:“none”,color:t.fog,cursor:“pointer”,fontSize:13}}>✕</button>
</div>
</div>)}
</div>
</div>
</div>
<div style={card(t)}>
<div style={{fontSize:10,color:t.fog,textTransform:“uppercase”,marginBottom:8}}>Vibe-Based Suggestion</div>
<div style={{display:“flex”,gap:10,alignItems:“flex-end”}}>
<div style={{flex:1}}><label style={lbl(t)}>What vibe?</label><input style={inp(t)} value={vibe} onChange={e=>setVibe(e.target.value)} placeholder=“fresh masculine office, bold evening, quiet luxury date…”/></div>
<button style={btnG(t)} onClick={()=>vibe&&V.run(`Suggest 2-3 layering combos for vibe: "${vibe}". Use only AJ's bottles: ${coll.slice(0,40).map(f=>`${f.n}(${f.d.join(”,”)})`).join(";")}. Give ratio and application order.`)}>Suggest</button>
</div>
<AIB res={V.res} load={V.load} t={t}/>
</div>

  </div>;
}

function Cmp({coll,t}){
const A=useAI(); const R=useAI();
const [a,setA]=useState(””); const [b,setB]=useState(””);
const fa=coll.find(f=>f.n===a); const fb=coll.find(f=>f.n===b);
const opts=[<option key="" value="">Select…</option>,…coll.map(f=><option key={f.n} value={f.n}>{f.n}</option>)];
const FC=({f})=>f?<div style={{marginTop:8}}>
<div style={{display:“flex”,flexWrap:“wrap”,gap:3,marginBottom:6}}>{f.d.map(d=><span key={d} style={{fontSize:10,padding:“1px 5px”,borderRadius:10,background:“rgba(201,168,76,.1)”,color:t.gd,border:`1px solid ${t.bg2}`}}>{d}</span>)}</div>
<div style={{fontSize:11,color:t.silver,marginBottom:3}}>{f.o?.join(” · “)}</div>
<div style={{fontSize:10,color:t.fog}}>{f.s}{f.i?” · Insp: “+f.i:””}</div>
<div style={{color:t.gold,fontSize:10,marginTop:3}}>{“★”.repeat(f.r)}</div>

  </div>:null;
  return <div>
    <div style={ttl(t)}>Compare</div>
    <div style={sub(t)}>Side-by-side analysis</div>
    <div style={{...g2,marginBottom:12}}>
      <div style={card(t)}><div style={{fontSize:10,color:t.fog,textTransform:"uppercase",marginBottom:8}}>Fragrance A</div><select style={inp(t)} value={a} onChange={e=>setA(e.target.value)}>{opts}</select><FC f={fa}/></div>
      <div style={card(t)}><div style={{fontSize:10,color:t.fog,textTransform:"uppercase",marginBottom:8}}>Fragrance B</div><select style={inp(t)} value={b} onChange={e=>setB(e.target.value)}>{opts}</select><FC f={fb}/></div>
    </div>
    <div style={{textAlign:"center",marginBottom:12}}>
      <button style={btnG(t)} onClick={()=>a&&b&&A.run(`Deep compare:\n${a}: DNA ${fa?.d.join(",")}, rating ${fa?.r}/5, occasions: ${fa?.o?.join(",")}\n${b}: DNA ${fb?.d.join(",")}, rating ${fb?.r}/5, occasions: ${fb?.o?.join(",")}\nCover: DNA overlap, where each wins, redundancy risk, keep/destash verdict, layering potential.`)}>Deep Compare with AI</button>
    </div>
    <AIB res={A.res} load={A.load} t={t}/>
    <div style={{height:1,background:t.border,margin:"14px 0"}}/>
    <div style={card(t)}>
      <div style={{fontSize:10,color:t.fog,textTransform:"uppercase",marginBottom:6}}>Redundancy Scanner</div>
      <div style={{fontFamily:"Georgia,serif",fontSize:15,color:t.pearl,marginBottom:8}}>Find Overlapping Bottles</div>
      <p style={{fontSize:12,color:t.silver,marginBottom:10}}>Identify bottles sharing DNA and occasion coverage.</p>
      <button style={btnG(t)} onClick={()=>R.run(`Find top 5 redundant pairs in AJ's ${coll.length}-bottle collection:\n${coll.slice(0,60).map(f=>`${f.n}:[${f.d.join(",")}]`).join(";")}\nFor each: names, what overlaps, which to keep. Also name AJ's biggest DNA gap.`)}>Scan Collection</button>
      <AIB res={R.res} load={R.load} t={t}/>
    </div>
  </div>;
}

function Buy({coll,evals,setEvals,t}){
const [name,setName]=useState(””); const [house,setHouse]=useState(””);
const [dna,setDna]=useState(””); const [insp,setInsp]=useState(””); const [notes,setNotes]=useState(””);
const [res,setRes]=useState(null); const [load,setLoad]=useState(false);
const V={must:{l:“✓ Must Buy”,c:t.ok},redundant:{l:“⟳ Good but Redundant”,c:t.err},layering:{l:“⊕ Layering Pickup Only”,c:t.gold},interesting:{l:“◇ Interesting but Unnecessary”,c:t.info},skip:{l:“✗ Skip”,c:t.fog}};
async function go(){
if(!name)return; setLoad(true);setRes(null);
const sim=coll.filter(f=>dna.split(”,”).some(d=>f.d.some(fd=>fd.toLowerCase().includes(d.trim().toLowerCase())))).slice(0,8).map(f=>f.n).join(”, “);
const r=await ai(`Evaluate purchase candidate:\nName: ${name}\nHouse: ${house||"unknown"}\nDNA: ${dna}\nInspired by: ${insp||"n/a"}\nNotes: ${notes||"n/a"}\nSimilar owned: ${sim||"none obvious"}\n\nVerdict (pick one): MUST BUY | GOOD BUT REDUNDANT | LAYERING PICKUP ONLY | INTERESTING BUT UNNECESSARY | SKIP\nThen: reasoning, what it uniquely adds, what it overlaps, final recommendation.`);
const v=r.match(/must buy|good but redundant|layering pickup only|interesting but unnecessary|skip/i)?.[0]?.toLowerCase()||“skip”;
const vk=v.includes(“must”)?“must”:v.includes(“redundant”)?“redundant”:v.includes(“layering”)?“layering”:v.includes(“interesting”)?“interesting”:“skip”;
setRes({text:r,vk});
setEvals(ev=>[{name,house,verdict:V[vk].l,date:new Date().toLocaleDateString()},…ev].slice(0,20));
setLoad(false);
}
return <div>
<div style={ttl(t)}>Buy or Skip</div>
<div style={sub(t)}>Evaluate candidates against your {coll.length} bottles</div>
<div style={{...card(t,true),marginBottom:12}}>
<div style={{...g2,marginBottom:8}}>
<div><label style={lbl(t)}>Fragrance Name</label><input style={inp(t)} value={name} onChange={e=>setName(e.target.value)} placeholder=“e.g. Hacivat”/></div>
<div><label style={lbl(t)}>House</label><input style={inp(t)} value={house} onChange={e=>setHouse(e.target.value)} placeholder=“e.g. Nishane”/></div>
</div>
<div style={{...g2,marginBottom:8}}>
<div><label style={lbl(t)}>DNA / Notes</label><input style={inp(t)} value={dna} onChange={e=>setDna(e.target.value)} placeholder=“fresh, green, vetiver…”/></div>
<div><label style={lbl(t)}>Inspired By</label><input style={inp(t)} value={insp} onChange={e=>setInsp(e.target.value)} placeholder=“e.g. Creed Aventus”/></div>
</div>
<div style={{marginBottom:10}}><label style={lbl(t)}>Notes</label><input style={inp(t)} value={notes} onChange={e=>setNotes(e.target.value)} placeholder=“Price, occasion, why interested…”/></div>
<div style={{display:“flex”,gap:8}}>
<button style={btnG(t)} onClick={go}>Evaluate</button>
<button style={btnO(t)} onClick={()=>{setName(””);setHouse(””);setDna(””);setInsp(””);setNotes(””);setRes(null);}}>Clear</button>
</div>
</div>
{load&&<AIB load t={t}/>}
{res&&<div style={{background:t.surface,borderRadius:10,overflow:“hidden”,border:`1px solid ${t.border}`,marginBottom:12}}>
<div style={{padding:“8px 13px”,fontSize:11,fontWeight:600,textTransform:“uppercase”,letterSpacing:”.08em”,color:V[res.vk].c,borderBottom:`1px solid ${t.border}`}}>{V[res.vk].l}</div>
<div style={{padding:13,color:t.cream,fontSize:13,lineHeight:1.7,whiteSpace:“pre-wrap”}}>{res.text}</div>
</div>}
{evals.length>0&&<><div style={{height:1,background:t.border,margin:“4px 0 12px”}}/><div style={{fontSize:10,color:t.fog,textTransform:“uppercase”,marginBottom:8}}>Past Evaluations</div>
{evals.slice(0,8).map((e,i)=><div key={i} style={{display:“flex”,alignItems:“center”,gap:10,padding:“7px 11px”,background:t.ash,borderRadius:6,marginBottom:5,border:`1px solid ${t.border}`}}>
<div style={{flex:1}}><div style={{fontSize:13,color:t.pearl}}>{e.name}</div><div style={{fontSize:11,color:t.fog}}>{e.house||”—”} · {e.date}</div></div>
<span style={{fontSize:10,padding:“2px 7px”,borderRadius:10,background:t.ash,color:t.silver,border:`1px solid ${t.border}`}}>{e.verdict}</span>
</div>)}
</>}

  </div>;
}

function Disp({coll,t,wx}){
const [disp,setDisp]=useState(()=>{try{return JSON.parse(localStorage.getItem(“fvD6”))||coll.slice(0,30).map(f=>f.n);}catch{return coll.slice(0,30).map(f=>f.n);}});
const [editing,setEditing]=useState(false);
const [season,setSeason]=useState(“Spring (Apr-May)”); const [size,setSize]=useState(“30”);
const A=useAI();
useEffect(()=>{try{localStorage.setItem(“fvD6”,JSON.stringify(disp));}catch{}},[disp]);
return <div>
<div style={ttl(t)}>Display & Rotate</div>
<div style={sub(t)}>Curate what’s on your shelf</div>
<div style={g2}>
<div style={card(t)}>
<div style={{fontSize:10,color:t.fog,textTransform:“uppercase”,marginBottom:8}}>Current Display ({disp.length} bottles)</div>
<div style={{display:“flex”,flexWrap:“wrap”,gap:3,marginBottom:10,maxHeight:160,overflowY:“auto”}}>
{disp.map(n=><span key={n} style={{fontSize:10,padding:“2px 6px”,borderRadius:10,background:“rgba(201,168,76,.15)”,color:t.gold,border:`1px solid ${t.bg2}`}}>{n}</span>)}
</div>
<button style={{…btnO(t),padding:“5px 10px”,fontSize:11}} onClick={()=>setEditing(!editing)}>{editing?“Done”:“Edit Display”}</button>
{editing&&<div style={{marginTop:10,maxHeight:260,overflowY:“auto”,display:“grid”,gridTemplateColumns:“1fr 1fr”,gap:5}}>
{coll.map(f=><div key={f.n} onClick={()=>setDisp(d=>d.includes(f.n)?d.filter(x=>x!==f.n):[…d,f.n])} style={{background:disp.includes(f.n)?“rgba(201,168,76,.1)”:t.ash,border:`1px solid ${disp.includes(f.n)?t.gold:t.border}`,borderRadius:5,padding:“5px 7px”,cursor:“pointer”}}>
<div style={{fontSize:11,color:t.pearl}}>{f.n}</div><div style={{fontSize:10,color:t.fog}}>{f.h}</div>
</div>)}
</div>}
</div>
<div style={card(t,true)}>
<div style={{fontSize:10,color:t.fog,textTransform:“uppercase”,marginBottom:10}}>Rotation Advisor</div>
<div style={{marginBottom:8}}><label style={lbl(t)}>Season</label>
<select style={inp(t)} value={season} onChange={e=>setSeason(e.target.value)}>
{[“Spring (Apr-May)”,“Early Summer (Jun)”,“Summer (Jul-Aug)”,“Fall (Sep-Oct)”,“Winter (Nov-Feb)”,“Late Winter/Early Spring (Mar)”].map(s=><option key={s}>{s}</option>)}
</select>
</div>
<div style={{marginBottom:10}}><label style={lbl(t)}>Display Size</label>
<select style={inp(t)} value={size} onChange={e=>setSize(e.target.value)}>{[“10”,“15”,“20”,“25”,“30”].map(n=><option key={n}>{n}</option>)}</select>
</div>
<button style={{…btnG(t),width:“100%”}} onClick={()=>A.run(`Suggest a ${size}-bottle seasonal display for Arlington VA, season: ${season}. Weather: ${wx()}. Include anchors, daily drivers, statement pieces, one wildcard. List each with one-line reason.`)}>Generate Rotation</button>
<AIB res={A.res} load={A.load} t={t}/>
</div>
</div>

  </div>;
}

function Journal({coll,journal,setJournal,t}){
const [frag,setFrag]=useState(””); const [occ,setOcc]=useState(“Casual”);
const [rating,setRating]=useState(“★★★★★”); const [note,setNote]=useState(””);
function add(){
if(!frag)return;
setJournal(j=>[…j,{frag,occ,rating,note,date:new Date().toLocaleDateString()}]);
setNote(””);setFrag(””);
}
return <div>
<div style={ttl(t)}>Journal</div>
<div style={sub(t)}>Track every wear and discovery</div>
<div style={g2}>
<div style={card(t,true)}>
<div style={{marginBottom:8}}><label style={lbl(t)}>Fragrance Worn</label>
<select style={inp(t)} value={frag} onChange={e=>setFrag(e.target.value)}><option value="">Select…</option>{coll.map(f=><option key={f.n}>{f.n}</option>)}</select>
</div>
<div style={{...g2,marginBottom:8}}>
<div><label style={lbl(t)}>Occasion</label><select style={inp(t)} value={occ} onChange={e=>setOcc(e.target.value)}>{[“Casual”,“Office”,“Date”,“Evening”,“Outdoors”,“Travel”,“Special”].map(o=><option key={o}>{o}</option>)}</select></div>
<div><label style={lbl(t)}>Rating</label><select style={inp(t)} value={rating} onChange={e=>setRating(e.target.value)}>{[“★★★★★”,“★★★★”,“★★★”,“★★”,“★”].map(r=><option key={r}>{r}</option>)}</select></div>
</div>
<div style={{marginBottom:10}}><label style={lbl(t)}>Notes</label><textarea style={{…inp(t),minHeight:70,resize:“vertical”}} value={note} onChange={e=>setNote(e.target.value)} placeholder=“Compliments, longevity, sillage…”/></div>
<button style={{…btnG(t),width:“100%”}} onClick={add}>Log Wear</button>
</div>
<div style={card(t)}>
<div style={{fontSize:10,color:t.fog,textTransform:“uppercase”,marginBottom:8}}>Entries ({journal.length} total)</div>
<div style={{maxHeight:400,overflowY:“auto”}}>
{[…journal].reverse().map((e,i)=><div key={i} style={{background:t.ash,borderRadius:7,padding:10,borderLeft:`3px solid ${t.gold}`,marginBottom:6}}>
<div style={{fontSize:11,color:t.fog,marginBottom:2}}>{e.date} · {e.occ}</div>
<div style={{fontSize:13,fontWeight:500,color:t.pearl,marginBottom:2}}>{e.frag}</div>
<div style={{color:t.gold,fontSize:11,marginBottom:e.note?3:0}}>{e.rating}</div>
{e.note&&<div style={{fontSize:12,color:t.silver,lineHeight:1.5}}>{e.note}</div>}
</div>)}
{!journal.length&&<p style={{color:t.fog,fontSize:12}}>No entries yet.</p>}
</div>
</div>
</div>

  </div>;
}

function Ana({coll,journal,t}){
const A=useAI();
const hc={};coll.forEach(f=>{hc[f.h]=(hc[f.h]||0)+1});
const sh=Object.entries(hc).sort((a,b)=>b[1]-a[1]);
const dc={};coll.forEach(f=>f.d.forEach(d=>{const k=d.toLowerCase();dc[k]=(dc[k]||0)+1}));
const sd=Object.entries(dc).sort((a,b)=>b[1]-a[1]).slice(0,12);
const maxH=sh[0]?.[1]||1,maxD=sd[0]?.[1]||1;
return <div>
<div style={ttl(t)}>Analytics</div>
<div style={sub(t)}>Collection intelligence</div>
<div style={{...g4,marginBottom:14}}>
{[[coll.length,“Total Bottles”],[new Set(coll.map(f=>f.h)).size,“Houses”],[coll.filter(f=>f.r===5).length,“Five-Star”],[journal.length,“Wears”]].map(([n,l])=>
<div key={l} style={stat(t)}><div style={{fontFamily:“Georgia,serif”,fontSize:22,fontWeight:300,color:t.gold}}>{n}</div><div style={{fontSize:10,color:t.fog,textTransform:“uppercase”,letterSpacing:”.1em”,marginTop:2}}>{l}</div></div>
)}
</div>
<div style={{...g2,marginBottom:12}}>
<div style={card(t)}>
<div style={{fontSize:10,color:t.fog,textTransform:“uppercase”,marginBottom:8}}>DNA Breakdown</div>
{sd.map(([d,c])=><div key={d} style={{display:“flex”,alignItems:“center”,gap:8,marginBottom:5}}>
<div style={{fontSize:11,color:t.silver,width:95,flexShrink:0,textTransform:“capitalize”}}>{d}</div>
<div style={{flex:1,background:t.ash,borderRadius:3,height:4,overflow:“hidden”}}><div style={{height:“100%”,background:`linear-gradient(90deg,${t.gd},${t.gold})`,borderRadius:3,width:`${Math.round(c/maxD*100)}%`}}/></div>
<div style={{fontSize:11,color:t.fog,width:20,textAlign:“right”}}>{c}</div>
</div>)}
</div>
<div style={card(t)}>
<div style={{fontSize:10,color:t.fog,textTransform:“uppercase”,marginBottom:8}}>House Distribution</div>
{sh.map(([h,c])=><div key={h} style={{display:“flex”,alignItems:“center”,gap:8,marginBottom:5}}>
<div style={{fontSize:11,color:t.silver,width:105,flexShrink:0,overflow:“hidden”,textOverflow:“ellipsis”,whiteSpace:“nowrap”}}>{h.replace(“The Dua Brand”,“Dua”).replace(” Fragrances”,””).replace(” Oils”,””).replace(” / Millionaire”,””)}</div>
<div style={{flex:1,background:t.ash,borderRadius:3,height:4,overflow:“hidden”}}><div style={{height:“100%”,background:`linear-gradient(90deg,${t.gd},${t.gold})`,borderRadius:3,width:`${Math.round(c/maxH*100)}%`}}/></div>
<div style={{fontSize:11,color:t.fog,width:20,textAlign:“right”}}>{c}</div>
</div>)}
</div>
</div>
<div style={card(t)}>
<div style={{fontSize:10,color:t.fog,textTransform:“uppercase”,marginBottom:6}}>Collection Strategy</div>
<div style={{fontFamily:“Georgia,serif”,fontSize:15,color:t.pearl,marginBottom:10}}>AI Analysis</div>
<button style={btnG(t)} onClick={()=>A.run(`Collection strategy. Total: ${coll.length} bottles. Houses: ${sh.map(([h,c])=>`${h}(${c})`).join(", ")}. Top DNA: ${sd.slice(0,8).map(([d,c])=>`${d}(${c})`).join(", ")}. Wears logged: ${journal.length}.\n1. Collection strengths\n2. DNA gaps\n3. Top 3 bottles to add next (specific names)\n4. Top 3 destash candidates (specific bottles AJ owns)\n5. One key strategic advice`)}>Get Collection Insights</button>
<AIB res={A.res} load={A.load} t={t}/>
</div>

  </div>;
}
