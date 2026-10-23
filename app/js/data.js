// AM PARFUMS inventory data (Master Inventory, 22 Oct 2026, Rev. 5) and reference notes.
// id|name|supplier|form|family|status|notes
const RAW=`F01|Bleu de Chanel Parfum (Old Edition)|Africa Imports|FO|FR|F|
F02|Dior Sauvage|Africa Imports|FO|FR|F|
F03|YSL Y EDP|Africa Imports|FO|FR|F|
F04|D&G Light Blue Men (Old Edition)|Africa Imports|FO|FR|F|
F05|PDM Sedley 1/3 oz|Africa Imports|FO|FR|F|
F06|PDM Sedley 1 oz|Africa Imports|FO|FR|F|
F07|Bond The Scent of Peace (Old Edition)|Africa Imports|FO|FR|F|
F08|Maison Margiela When The Rain Stops|Africa Imports|FO|FR|F|
F09|Azzaro Chrome Legend (Old Edition)|Africa Imports|FO|FR|F|
F10|Bleu de Chanel|Abu Oils|FO|FR|F|
F11|YSL Y|Abu Oils|FO|FR|F|
F12|Blue Talisman (Ex Nihilo)|Gold Star|RO|FR|F|
F13|YSL Y Iced Cologne|Gold Star|FO|FR|F|
F14|Morning Rain|HIQILI|FO|FR|F|rain, aquatic
F15|Cold Boiled Water|HIQILI|FO|FR|F|cool watery
F16|No. 59797 Bad Boy Cobalt|MIRIS|PO|FR|F|
F17|No. 28283 Dylan Blue|MIRIS|PO|FR|F|
F18|Polo 67|Other|MIX|FR|F|
F19|Sauvage|Other|MIX|FR|F|
F20|Dylan Blue|Other|MIX|FR|F|
F21|Bad Boy Cobalt|Other|MIX|FR|F|
F22|BLEU (Bleu de Chanel)|Other|RO|FR|F|
F23|PACIFICO (LV Pacific Chill)|Perfume Parfum House|RO|FR|F|
F24|SAUVAGE (Dior Sauvage)|Perfume Parfum House|RO|FR|F|
F25|EROX (Versace Eros)|Perfume Parfum House|RO|FR|F|mint, lemon, green apple; tonka, geranium; vanilla, cedar, vetiver
F26|Cucumber Melon|PHATOIL|FO|FR|F|
C01|Pheromone Musk|Africa Imports|FO|CL|F|
C02|MFK 724|Africa Imports|FO|CL|F|
C03|Byredo Mojave Ghost|Africa Imports|FO|CL|F|
C04|Gain Laundry|Gold Star|FO|CL|F|
C05|MFK Gentle Fluidity Silver|Gold Star|FO|CL|F|
C06|Fresh Linen|HIQILI|FO|CL|F|clean laundry
C07|White Musk|HIQILI|FO|CL|F|
T01|MFK Amyris Homme|Africa Imports|FO|CT|F|
T02|Imagination (LV)|Abu Oils|FO|CT|F|
T03|Mint Bergamot Matins|HIQILI|FO|CT|F|
T04|White Tea|HIQILI|FO|CT|F|tea freshness, soft green floral, herbal musky
T05|COMET No. 47 (LV Meteore)|Majesty|FO|CT|F|
T06|No. 36897 Amyris Homme|MIRIS|PO|CT|F|
T07|Imagination|Other|MIX|CT|F|
T08|Imagine (LV Imagination)|Other|MIX|CT|F|
T09|Silver (Creed Silver Mountain Water)|Other|MIX|CT|F|
T10|IMAGINE (LV Imagination)|Perfume Parfum House|RO|CT|F|
T11|IMMENSE (LV L'Immensite)|Perfume Parfum House|RO|CT|F|grapefruit, ginger, bergamot, herbs, ambergris warmth
T12|DAY-TIME (LV Afternoon Swim)|Perfume Parfum House|RO|CT|F|mandarin, orange, bergamot
T13|Lemon|PHATOIL|FO|CT|F|
G01|Creed Royal Oud|Africa Imports|FO|GR|F|
G02|Tom Ford Oud Wood|Africa Imports|FO|GR|F|
G03|Tom Ford Grey Vetiver|Africa Imports|FO|GR|F|
G04|Bleu de Chanel L'Exclusif|Gold Star|FO|GR|F|
G05|Creed Wild Vetiver|Gold Star|FO|GR|F|
G06|Grey Vetiver (TF style)|HIQILI|FO|GR|F|
G07|New Challenge|HIQILI|FO|GR|F|birch, cardamom; oregano, rosemary; tolu balsam, patchouli
G08|AURUM (Prada Paradigme)|Majesty|FO|GR|F|
G09|No. 54602 Hacivat|MIRIS|PO|GR|F|
G10|SANT 33 (Le Labo Santal 33)|Perfume Parfum House|RO|GR|F|
G11|ROME (Valentino Uomo Born in Roma)|Perfume Parfum House|RO|GR|F|mineral, violet leaf, sage, ginger, vetiver
G12|MUJRIM (house blend)|Perfume Parfum House|RO|GR|F|bergamot, black currant leaf; birch, geranium; cedar, cashmere woods
R01|Bond No. 9 Greenwich Village|Africa Imports|FO|RF|F|
R02|MFK L'Homme A la Rose|Africa Imports|FO|RF|F|
R03|PDM Delina Exclusif|Africa Imports|FO|RF|F|
R04|Louis Vuitton eLves|Africa Imports|FO|RF|F|
R05|MFK Oud Satin Mood|Africa Imports|FO|RF|F|
R06|MFK L'Homme A la Rose|Abu Oils|FO|RF|F|
R07|Initio Atomic Rose|Gold Star|FO|RF|F|
R08|Musky Rose|HIQILI|FO|RF|F|
R09|Delina|Other|MIX|RF|F|
R10|DELILA (PDM Delina)|Perfume Parfum House|RO|RF|F|
R11|KOKO (Chanel Coco Mademoiselle)|Perfume Parfum House|RO|RF|F|
P01|Tom Ford Lost Cherry (Old Edition)|Africa Imports|FO|FT|F|
P02|Mind Games Blockade|Africa Imports|FO|FT|F|
P03|Tom Ford Plum Japonais|Africa Imports|FO|FT|F|
P04|Plum Japonais (Tom Ford)|Abu Oils|FO|FT|F|
P05|Aventus (Creed)|Abu Oils|FO|FT|F|
P06|Mind Games French Defense|Abu Oils|FO|FT|F|
P07|Fig|PHATOIL|FO|FT|F|
P08|Green Apple|PHATOIL|FO|FT|F|
P09|Apple (sweet)|PHATOIL|FO|FT|F|
P10|Blueberry|PHATOIL|FO|FT|F|
P11|Pear|PHATOIL|FO|FT|F|
P12|Peach|PHATOIL|FO|FT|F|
P13|No. 56902 Apple Brandy on the Rocks|MIRIS|PO|FT|F|
P14|Plum Japonais (Fragrances, Scents and More)|Other|MIX|FT|F|
P15|Polo Red|Other|MIX|FT|F|
P16|Aventus Absolu|Other|MIX|FT|F|
P17|Avent (Creed Aventus)|Other|MIX|FT|F|
P18|CHERRY (TF Lost Cherry)|Perfume Parfum House|RO|FT|F|
P19|AVENT (Creed Aventus)|Perfume Parfum House|RO|FT|F|
P20|MUSHKILA (house blend)|Perfume Parfum House|RO|FT|F|strawberry, blueberry, raspberry, black currant; violet, jasmine; sandalwood, dry amber, musk
W01|Valentino Born in Roma Intense (Old Edition)|Africa Imports|FO|WA|F|
W02|Tom Ford F* Fabulous (Old Edition)|Africa Imports|FO|WA|F|
W03|MFK Baccarat Rouge 540|Africa Imports|FO|WA|F|
W04|Montale Arabians Tonka|Africa Imports|FO|WA|F|
W05|Paco Rabanne 1 Million Elixir|Africa Imports|FO|WA|F|
W06|Louis Vuitton Ink Mark|Africa Imports|FO|WA|F|sandalwood, incense, amber
W07|Bond No. 9 Dubai Gold|Africa Imports|FO|WA|F|
W08|Givenchy Pi Extreme|Africa Imports|FO|WA|F|
W09|Azzaro Wanted By Night|Africa Imports|FO|WA|F|
W10|Creed Centaurus (Old Edition)|Africa Imports|FO|WA|F|
W11|Sauvage Elixir|Abu Oils|FO|WA|F|
W12|Valentino Born in Roma Coral Fantasy|Gold Star|FO|WA|F|
W13|London Men (Burberry London)|HIQILI|FO|WA|F|cinnamon, lavender, bergamot; leather, mimosa; tobacco, guaiac, myrrh, oakmoss
W14|ALMAR (PDM Althair)|Majesty|FO|WA|F|
W15|LAY TOWN (PDM Layton)|Majesty|FO|WA|F|
W16|ROUGE EXTRAIT (BR540 Extrait)|Majesty|FO|WA|F|
W17|No. 47319 Ultra Male|MIRIS|PO|WA|F|
W18|Tom Ford Tobacco Oud|Other|MIX|WA|F|
W19|1 Million Elixir|Other|BO|WA|F|body oil
W20|Baccarat (MFK BR540)|Other|MIX|WA|F|
W21|Rouge (BR540 style)|Other|MIX|WA|F|
W22|LAYTON (PDM Layton)|Other|RO|WA|F|
W23|ROUGE (MFK BR540)|Perfume Parfum House|RO|WA|F|
W24|ZALAMA (house blend)|Perfume Parfum House|RO|WA|F|benzoin, oud; aged leather, tobacco leaf; vanilla, dark cacao, warm spice
W25|SOLAIRE (TF Soleil Blanc)|Perfume Parfum House|RO|WA|F|bergamot, cardamom, pistachio, ylang, coconut, amber
S01|Tom Ford Vanilla Sex|Africa Imports|FO|SW|F|
S02|Kilian Black Phantom|Africa Imports|FO|SW|F|
S03|Bond No. 9 New York Nights|Africa Imports|FO|SW|F|
S04|Bond No. 9 Tribeca|Africa Imports|FO|SW|F|
S05|Tom Ford Tobacco Vanille|Abu Oils|FO|SW|F|
S06|Kilian Angel's Share|Abu Oils|FO|SW|F|
S07|Coconut & Vanilla|PHATOIL|FO|SW|F|
S08|LOVESHY (Kilian Love Don't Be Shy)|Perfume Parfum House|RO|SW|F|
S09|VANILLA (Kayali Vanilla 28)|Perfume Parfum House|RO|SW|F|vanilla orchid; brown sugar; amber, tonka, musk
S10|BLK OPI (YSL Black Opium)|Perfume Parfum House|RO|SW|F|
S11|BOOZAH (house blend)|Perfume Parfum House|RO|SW|F|caramel, vanilla ice cream; honey, milk; tonka, sandalwood, musk
S12|BLACK WIDOW (Black Phantom inspired)|DUA|FX|SW|F|finished extrait de parfum, not fragrance oil
F27|CH Bad Boy Cobalt Elixir (Old Edition)|Africa Imports|FO|FR|F|
F28|PDM Percival|Africa Imports|FO|FR|F|
C08|Maison Margiela Bubble Bath|Africa Imports|FO|CL|F|
G14|Bal d'Afrique (Byredo)|The Essential Oil Company|FO|GR|F|30 ml
R12|Moschino Toy Boy|Africa Imports|FO|RF|F|
R13|YSL Libre|Africa Imports|FO|RF|F|
P21|Tom Ford Cherry Smoke|Africa Imports|FO|FT|F|
P22|Mind Games J'adoube|Africa Imports|FO|FT|F|
W26|Mancera Red Tobacco|Africa Imports|FO|WA|F|
W27|Maison Margiela Jazz Club|Africa Imports|FO|WA|F|
W28|Chanel Egoiste|Africa Imports|FO|WA|F|
W29|Tom Ford Ombre Leather|Africa Imports|FO|WA|F|
W30|Tom Ford Noir Extreme|Africa Imports|FO|WA|F|
W31|Matiere Premiere Encens Suave|Africa Imports|FO|WA|F|
W32|Prada Luna Rossa Black|Africa Imports|FO|WA|F|
W33|YSL Babycat|Africa Imports|FO|WA|F|
S13|Givenchy Gentleman Reserve Privee|Africa Imports|FO|SW|F|
S14|Mind Games Queening|Africa Imports|FO|SW|F|
S15|Mind Games Double Attack|Africa Imports|FO|SW|F|
S16|Mind Games Mentor|Africa Imports|FO|SW|F|
F29|Sea Salt Sage|HIQILI|FO|FR|F|sea salt, sage
T14|Black Tea|HIQILI|FO|CT|F|black tea
R14|Guardian Rose|HIQILI|FO|RF|F|rose
R15|Mimosa & Cardamom|HIQILI|FO|RF|F|mimosa, cardamom
S17|Vanilla (HIQILI fragrance oil)|HIQILI|FO|SW|F|vanilla
G13|Iso E Super Cologne Extrait de Parfum|Oak City Beard Company|FX|GR|F|finished alcohol based perfume, Iso E Super percentage undisclosed`;
const EORAW=`E01|Sweet Orange|citrus
E02|Grapefruit|citrus
E03|Lemon|citrus
E04|Bergamot|citrus
E05|Lemongrass|citrus
E06|Tea Tree|herbal
E07|Lavender|herbal
E08|Peppermint|herbal
E09|Eucalyptus|herbal
E10|Citronella|herbal
E11|Clary Sage|herbal
E12|Rosemary|herbal
E13|Chamomile|herbal
E14|Jasmine|floral
E15|Ylang Ylang|floral
E16|Rose|floral
E17|Geranium|floral
E18|Cedarwood|wood
E19|Clove|spice
E20|Frankincense|resin
E21|Patchouli|wood
E22|Cinnamon|spice
E23|Sandalwood|wood
E24|Vanilla|balsamic
E25|Coffee|roast|NewCraft`;
// AJ Fragrance Collection NON DUA v6.1.1+76: finished bottles
const COLLRAW=`B187|Avant Garde (Bond No. 9 Andy Warhol)|Barrett Fragrances|FX|GR|F|Woody, Amber, Floral, Oud, Citrus Evening / date / special Fall/Winter Cool / cold; Bond No. 9 Andy Warhol Top: plum, cypress, bergamot. Heart: agarwood (oud), French labdanum, rose, patchouli, jasmine. Base: vanilla, sandalwood,
B188|Azure Shore (Louis Vuitton On The Beach)|Barrett Fragrances|FX|RF|F|Floral, Green, Spicy, Citrus Casual / beach / daytime Spring/Summer Warm / hot / humid; Louis Vuitton On The Beach Top: yuzu, neroli. Heart: rosemary, thyme, warm sand accord. Base: cloves, pink pepper, cypress.
B189|Big Blue (Chanel Bleu de Chanel Parfum)|Barrett Fragrances|FX|FR|F|Woody, Blue, Citrus, Floral, Fougere Office / smart casual Year-round Mild / variable; Chanel Bleu de Chanel Parfum Top: lemon zest, bergamot, mint, artemisia. Heart: lavender, pineapple, geranium, green notes. Base: sandalwood, c
B192|Burst Of Rose (Initio Parfums Prives Atomic Rose)|Barrett Fragrances|FX|RF|F|Floral, Amber, Citrus, Gourmand, Spicy Date / evening / romantic Fall/Winter Cool / cold; Initio Parfums Prives Atomic Rose Top: pink pepper, bergamot, hedione. Heart: Bulgarian rose, Turkish rose, Egyptian jasmine. Base: Madagasc
B194|Enchoku (Tom Ford Plum Japonais)|Barrett Fragrances|FX|WA|F|Amber, Spicy, Fruity, Gourmand, Oud Evening / special / cozy Fall/Winter Cool / cold; Tom Ford Plum Japonais Top: cinnamon, saffron. Heart: Japanese plum, plum blossom, immortelle, liquor, cypress, camellia. Base: oud, amber, benz
B195|Euphoric Mist (Bond No. 9 The Scent of Peace for Him)|Barrett Fragrances|FX|FT|F|Fruity, Citrus, Floral, Woody, Amber Casual / office / versatile Spring/Summer Warm / hot / humid; Bond No. 9 The Scent of Peace for Him Top: bergamot, pineapple, black currant, grapefruit. Heart: lavender, green notes, jasmine. B
B199|Lone Drifter (Maison Francis Kurkdjian Gentle Fluidity Gold)|Barrett Fragrances|FX|WA|F|Spicy, Amber, Fruity, Gourmand, Musk Date / evening / cozy Fall/Winter Cool / cold; Maison Francis Kurkdjian Gentle Fluidity Gold Top: nutmeg, coriander, juniper berries. Heart: musk. Base: ambery woods, vanilla.
B200|Lone Ranger (Maison Francis Kurkdjian Gentle Fluidity Silver)|Barrett Fragrances|FX|CT|F|Aromatic, Woody, Spicy, Musk, Amber Smart casual / office / versatile Year-round Mild / variable; Maison Francis Kurkdjian Gentle Fluidity Silver Top: bergamot, juniper berries, coriander. Heart: nutmeg, vanilla. Base: amber, veti
B201|Lumina (Bond No. 9 New York Nights)|Barrett Fragrances|FX|FR|F|Woody, Gourmand, Aquatic, Floral Evening / date / lounge Fall/Winter Cool / cold; Bond No. 9 New York Nights Top: gardenia, carnation, jasmine. Heart: patchouli, floral notes, sea notes, sandalwood. Base: caramel, coffee.
B202|OG Vetiver (Creed Original Vetiver)|Barrett Fragrances|FX|CT|F|Citrus, Woody, Amber, Floral, Musk Office / casual / outdoors Spring/Summer Warm / hot / humid; Creed Original Vetiver Top: bergamot, ginger, mandarin orange. Heart: Haitian vetiver, sandalwood, iris. Base: musk, ambergris.
B203|Primary Particle (Escentric Molecules Molecule 01)|Barrett Fragrances|FX|CT|F|Aromatic Casual / skin-close / layering Year-round Mild / variable; Escentric Molecules Molecule 01 Single note: Iso E Super.
B204|Scarlet Gamble (Maison Francis Kurkdjian Baccarat Rouge 540)|Barrett Fragrances|FX|WA|F|Amber, Woody, Floral, Spicy Date / cocktail event Fall/Winter Cool / cold; Maison Francis Kurkdjian Baccarat Rouge 540 Top: saffron, jasmine. Heart: amberwood, ambergris. Base: cedar, fir resin.
B205|Scarlet Moon|Barrett Fragrances|FX|FR|F|Blue, Spicy, Woody, Amber, Aquatic Date / day-to-night / smart casual Spring/Fall Transitional / mild; Kilian Blue Moon Ginger Dash x Maison Francis Kurkdjian Baccarat Rouge 540. Legacy notes (not reverified): Top: lemon, saffron,
B209|Vervantaville (Parfums de Marly Greenley)|Barrett Fragrances|FX|RF|F|Floral, Woody, Amber, Citrus, Fougere Casual / office / outdoors Spring/Summer Warm / hot / humid; Parfums de Marly Greenley Top: green apple, bergamot. Heart: lavender, violet leaf. Base: sandalwood, amber.
B211|Daring Blue For Life (Dolce & Gabbana Light Blue Forever Pour Homme)|Maison Alhambra|FX|FR|F|Citrus, Woody, Blue, Floral, Green Casual / beach / everyday Spring/Summer Warm / hot / humid; Dolce & Gabbana Light Blue Forever Pour Homme (consensus). Legacy notes (not reverified): Top: grapefruit, bergamot. Heart: ozonic note
B212|Glacier Bold (Jean Paul Gaultier Le Beau Le Parfum)|Maison Alhambra|FX|FT|F|Fruity, Amber, Floral, Gourmand, Spicy Casual / social / gym Spring/Summer Warm / hot / humid; Jean Paul Gaultier Le Beau Le Parfum (consensus) Top: coconut, pineapple, iris. Heart: cypress, ginger, tonka bean. Base: amber, amberg
B213|Glacier Le Noir (Jean Paul Gaultier Le Male Le Parfum)|Maison Alhambra|FX|WA|F|Amber, Gourmand, Oud, Woody Date / club / evening Fall/Winter Cool / cold; Jean Paul Gaultier Le Male Le Parfum (consensus). Legacy notes (not reverified): Top: oud, amber. Heart: patchouli. Base: vanilla.
B214|Hercules (Parfums de Marly Herod)|Maison Alhambra|FX|WA|F|Amber, Spicy, Woody, Gourmand, Musk Evening / formal / date Fall/Winter Cool / cold; Closest match (consensus): Parfums de Marly Herod Top: cinnamon, pepper. Heart: tobacco leaf, incense, labdanum, osmanthus. Base: vanilla, Iso E
B215|Jean Lowe Immortal (Louis Vuitton L'Immensite)|Maison Alhambra|FX|WA|F|Amber, Citrus, Floral, Fougere, Green Smart casual / layering Spring/Summer Warm / hot / humid; Closest match (consensus): Louis Vuitton L'Immensite Top: grapefruit, ginger, bergamot. Heart: rosemary, aquatic notes, sage, geranium
B216|Jean Lowe Vibe (Louis Vuitton Pacific Chill)|Maison Alhambra|FX|CT|F|Citrus, Fruity, Green, Floral, Musk Casual / beach / weekend Spring/Summer Warm / hot / humid; Closest match (consensus): Louis Vuitton Pacific Chill Top: black currant, citron, coriander, lemon, mint, orange. Heart: apricot, basi
B217|Kismet Angel (Kilian Angels' Share)|Maison Alhambra|FX|SW|F|Gourmand, Woody, Spicy Evening / date / cozy lounge Fall/Winter Cool / cold; Closest match (consensus): Kilian Angels' Share Top: cognac. Heart: cinnamon, tonka bean, oak. Base: pralines, vanilla, sandalwood.
B218|Monocline 02|Maison Alhambra|FX|WA|F|Ambroxan Casual / skin-close / layering Year-round Mild / variable; Target unresolved between Molecule 02 and Escentric 02 in the prior record. The recorded single-note Ambroxan claim corresponds to Molecule 02; do not use both pr
B219|Perseus (Parfums de Marly Pegasus)|Maison Alhambra|FX|RF|F|Floral, Woody, Amber, Citrus, Fougere Office / smart casual / date Year-round Mild / variable; Closest match (consensus): Parfums de Marly Pegasus Top: bergamot, cumin, heliotrope. Heart: jasmine, lavender, almonds. Base: amber, v
B220|Salvo Elixir (Dior Sauvage Elixir)|Maison Alhambra|FX|WA|F|Amber, Fruity, Gourmand, Woody, Blue Date / evening / special Fall/Winter Cool / cold; Dior Sauvage Elixir (consensus) Top: black pepper, tobacco, pineapple. Heart: patchouli, iris, coffee. Base: woodsy notes, amber, vanilla, benz
B221|Salvo Intense (Maison Alhambra Salvo Intense)|Maison Alhambra|FX|CT|F|Citrus, Spicy, Floral, Amber, Gourmand Casual / office / everyday Year-round Mild / variable; Maison Alhambra Salvo Intense. Maker-published notes: Top: Bergamot. Heart: Sichuan Pepper, Lavender, Star Anise, Nutmeg. Base: Ambroxan
B222|Tobacco Touch (Tom Ford Tobacco Vanille)|Maison Alhambra|FX|SW|F|Gourmand, Tobacco, Woody Evening / cozy / romantic Fall/Winter Cool / cold; Closest match (consensus): Tom Ford Tobacco Vanille Top: spicy notes, tobacco. Heart: cacao, vanilla, tobacco, tonka bean. Base: woody notes, dried fruits
B223|Victorioso (Rabanne Invictus)|Maison Alhambra|FX|FR|F|Woody, Amber, Aquatic, Citrus, Floral Sport / casual / gym Spring/Summer Warm / hot / humid; Closest match (consensus): Rabanne Invictus Top: bergamot, marine notes. Heart: jasmine, bay leaf. Base: oakmoss, ambergris, guaiac wood,
B224|Victorioso Myth (Maison Alhambra Victorioso Myth)|Maison Alhambra|FX|FR|F|Aquatic, Citrus, Floral, Woody, Green Date / upscale casual Fall/Winter Cool / cold; Maison Alhambra Victorioso Myth; barcode 6291108735947. Maker product-details notes: Top: Marine Notes, Bergamot. Heart: Bay Leaf, Jasmine. Base:
B225|Victorioso Nero (Maison Alhambra Victorioso Nero)|Maison Alhambra|FX|CT|F|Citrus, Spicy, Floral, Amber, Gourmand Date / evening / formal Fall/Winter Cool / cold; Maison Alhambra Victorioso Nero; barcode 6291108735930. Maker product-details notes: Top: Lemon, Pink Peppercorn. Heart: Lavender, Olibanum. B
B226|Yeah Man (Yves Saint Laurent Y Le Parfum (2021)|Maison Alhambra|FX|GR|F|Fougere, Floral, Woody, Amber, Citrus Office / casual / everyday Year-round Mild / variable; Yves Saint Laurent Y Le Parfum (2021; consensus). Legacy notes (not reverified): Top: apple, aldehydes, ginger, grapefruit. Heart: lavend
B227|Your Touch Amber (Giorgio Armani Stronger With You Amber)|Maison Alhambra|FX|WA|F|Amber, Floral, Fougere, Gourmand Date / cozy evening Fall/Winter Cool / cold; Giorgio Armani Stronger With You Amber (consensus). Legacy notes (not reverified): Top: lavender. Heart: amber. Base: vanilla.
B228|Your Touch Oud (Giorgio Armani Stronger With You Oud)|Maison Alhambra|FX|WA|F|Oud, Floral, Fougere, Gourmand, Woody Evening / special / date Fall/Winter Cool / cold; Giorgio Armani Stronger With You Oud (consensus) Top: lavender. Heart: vanilla. Base: agarwood (oud).
B229|Your Touch Santal (Giorgio Armani Stronger With You Sandalwood)|Maison Alhambra|FX|GR|F|Woody, Floral, Fougere, Gourmand, Spicy Smart casual / date Fall/Winter Cool / cold; Giorgio Armani Stronger With You Sandalwood (consensus). Legacy notes (not reverified): Top: saffron. Heart: chestnut, lavender. Base: sandalwood
B402|Jean Lowe Fantasme Eau de Parfum, 100ml (Louis Vuitton Imagination)|Maison Alhambra|FX|CT|F|Citrus, Fresh Spicy, Tea, Woody, Amber (target profile) Casual / office / daytime Spring/Summer; warm weather; Target: Louis Vuitton Imagination (consensus; Maison Alhambra names no inspiration on the listings checked). Retail pyr
B230|Ameer Al Oudh - Intense (Maison Margiela Replica By the Fireplace style)|Lattafa|FX|SW|F|Gourmand, Oud, Woody Cozy evening / layering Fall/Winter Cool / cold; Maison Margiela Replica By the Fireplace style Top: woody notes, agarwood (oud). Heart: sugar, vanilla. Base: agarwood (oud), sandalwood, herbal notes.
B231|Ana Abiyedh (Xerjoff Erba Pura style)|Lattafa|FX|CT|F|Citrus, Amber, Fruity, Gourmand, Musk Casual / office / skin scent Year-round Mild / variable; Xerjoff Erba Pura style Top: orange, bergamot. Heart: pear, vanilla. Base: musk, dry amber.
B232|Bade'e Al Oud Amethyst (Initio Atomic Rose with an oud-heavy twist)|Lattafa|FX|RF|F|Floral, Oud, Amber, Citrus, Gourmand Date / floral evening Spring/Fall Transitional / mild; Initio Atomic Rose with an oud-heavy twist (consensus). Legacy notes (not reverified): Top: pink pepper, bergamot. Heart: Turkish rose, Bu
B233|Bade'e Al Oud For Glory|Lattafa|FX|WA|F|Amber, Woody, Spicy, Musk, Oud Evening / statement / bold Fall/Winter Cool / cold; Original Lattafa composition Top: Saffron, Lavender, Nutmeg. Heart: Agarwood (Oud), Patchouli. Base: Agarwood (Oud), Patchouli, Musk.
B234|Bade'e Al Oud Honor & Glory|Lattafa|FX|GR|F|Woody, Fruity, Spicy, Amber, Gourmand Evening / statement / bold Fall/Winter Cool / cold; Original Lattafa composition - no dependable single target Top: pineapple brulee. Heart: turmeric, cinnamon, black pepper, benzoin. Base: va
B235|Bade'e Al Oud Sublime (Kayali Eden Juicy Apple 01)|Lattafa|FX|RF|F|Floral, Fruity, Gourmand, Woody Casual / fun / daytime Spring/Summer Warm / hot / humid; Closest match (consensus): Kayali Eden Juicy Apple 01 Top: apple, litchi, rose. Heart: plum, jasmine. Base: vanilla, moss, patchouli.
B236|Hayaati Gold Elixir|Lattafa|FX|CT|F|Citrus, Amber, Fruity, Gourmand, Leather Date / evening / club Fall/Winter Cool / cold; Armani Code Profumo-style sweet leather DNA - loose comparison. Legacy notes (not reverified): Top: grapefruit, bergamot, cassis. Heart: peach
B238|Mashrabya (Kilian Smoking Hot)|Lattafa|FX|SW|F|Gourmand, Spicy, Fruity, Tobacco, Woody Evening / club / date Fall/Winter Cool / cold; Closest match (consensus): Kilian Smoking Hot Top: apple shisha accord, pink pepper. Heart: cinnamon, dates, tobacco. Base: vanilla, caramel, p
B239|Najdia Intense (Jean Paul Gaultier Le Beau Paradise Garden)|Lattafa|FX|GR|F|Woody, Floral, Fougere, Fruity, Aquatic Casual / daytime / social Spring/Summer Warm / hot / humid; Jean Paul Gaultier Le Beau Paradise Garden (consensus). Legacy notes (not reverified): Top: pineapple, mint, ginger, apple. Heart:
B240|Opulent Dubai (Stephane Humbert Lucas 777 God of Fire)|Lattafa|FX|WA|F|Amber, Citrus, Floral, Woody, Fougere Special / evening / statement Fall/Winter Cool / cold; Stephane Humbert Lucas 777 God of Fire (consensus). Legacy notes (not reverified): Top: lemon, ginger, grapefruit, mango. Heart: jasmine,
B241|Opulent Musk|Lattafa|FX|WA|F|Amber, Citrus, Floral, Musk, Spicy Date / social / evening Year-round Mild / variable; Maison Francis Kurkdjian Baccarat Rouge 540 style - loose comparison. Legacy notes (not reverified): Top: white musk, saffron, lemon. Heart: wh
B242|Qaed Al Fursan|Lattafa|FX|FT|F|Fruity, Woody, Amber, Floral, Oud Office / smart casual Spring/Fall Transitional / mild; Creed Aventus style - amplified pineapple/saffron twist; loose comparison. Legacy notes (not reverified): Top: saffron, pineapple. Heart: jas
B243|Teriaq Intense|Lattafa|FX|WA|F|Amber, Spicy, Citrus, Fruity, Gourmand Evening / statement / bold Fall/Winter Cool / cold; Original Lattafa composition - no dependable single target Top: bergamot, saffron. Heart: plum liquor, cinnamon. Base: tonka bean, amber, b
B244|Affection (Kayali Yum Pistachio Gelato / 33)|Lattafa Pride|FX|RF|F|Floral, Gourmand, Fruity Casual / cozy / social Fall/Winter Cool / cold; Closest match (consensus): Kayali Yum Pistachio Gelato / 33 Top: pistachio, hazelnut, black currant. Heart: lactones, jasmine, lily-of-the-valley, raspberry.
B245|Breeze (Lattafa Pride Breeze)|Lattafa Pride|FX|GR|F|Woody, Floral, Amber, Citrus, Green Office / smart casual / versatile Year-round Mild / variable; Lattafa Pride Breeze. Official notes: Top: Bergamot, Incense, Cardamom. Heart: Lily of the Valley, Cyclamen. Base: Musk, Sandalwood,
B246|La Collection d'Antiquités (Tom Ford Cherry Smoke)|Lattafa Pride|FX|GR|F|Woody, Amber, Fruity, Spicy Evening / date / special Fall/Winter Cool / cold; Closest match (consensus): Tom Ford Cherry Smoke Top: Black Cherry, Saffron. Heart: Osmanthus, Olibanum, Amyris. Base: Balsam, Styrax, Cypriol, Guaiacwo
B247|Liam Grey (BDK Parfums Gris Charnel)|Lattafa Pride|FX|GR|F|Woody, Gourmand, Amber, Floral, Fruity Smart casual / date Fall/Winter Cool / cold; Closest match (consensus): BDK Parfums Gris Charnel Top: cardamom, fig, black tea. Heart: iris, labdanum, vetiver. Base: vanilla, sandalwood, tonk
B248|Shaheen Gold (Paco Rabanne Phantom style)|Lattafa Pride|FX|FT|F|Fruity, Gourmand, Citrus, Floral, Fougere Casual / social / daytime Spring/Summer Warm / hot / humid; Paco Rabanne Phantom style Top: pineapple, grapefruit. Heart: lavender, fig. Base: vanilla, patchouli, tonka bean.
B250|Vintage Radio (Initio Paragon)|Lattafa Pride|FX|GR|F|Fougere, Woody, Amber, Blue, Citrus Date / evening / special Fall/Winter Cool / cold; Closest match (consensus): Initio Paragon Top: lavender, sage, bergamot. Heart: plum, palo santo, black pepper. Base: sandalwood, amberwood.
B251|Analysis Blue (Louis Vuitton Imagination x Chanel Bleu de Chanel)|Mod Fragrances|FX|WA|F|Spicy, Woody, Amber, Citrus, Floral Office / smart casual / versatile Year-round Mild / variable; Louis Vuitton Imagination x Chanel Bleu de Chanel Top: citron, grapefruit, lemon, mint, bergamot, pink pepper, aldehydes, coriander.
B252|Auric Noir (Byredo Bal d'Afrique)|Mod Fragrances|FX|CT|F|Citrus, Floral, Woody, Amber, Fruity Smart casual / evening Spring/Fall Transitional / mild; Byredo Bal d'Afrique Top: lemon, marigold, bergamot, African orange flower, black currant. Heart: violet, cyclamen, jasmine. Base: vetive
B253|Azure Exclusive (Chanel Bleu de Chanel L'Exclusif)|Mod Fragrances|FX|FR|F|Woody, Amber, Blue, Citrus, Musk Smart casual / office / evening Fall/Winter Cool / cold; Chanel Bleu de Chanel L'Exclusif Top: grapefruit, coriander. Heart: cedarwood, cistus labdanum. Base: sandalwood, benzoin, musk.
B254|Haven Eclipse (Xerjoff Torino22)|Mod Fragrances|FX|GR|F|Woody, Citrus, Fougere, Green, Musk Office / casual Year-round Mild / variable; Xerjoff Torino22 Top: eucalyptus, saffron, bergamot. Heart: mate, clary sage, guaiac wood. Base: dry wood, musk.
B255|Ionian King (Creed Erolfa)|Mod Fragrances|FX|WA|F|Spicy, Woody, Citrus, Floral, Amber Casual / office / daytime Spring/Summer Warm / hot / humid; Creed Erolfa Top: bergamot, lime, melon, green notes, violet, caraway. Heart: pine tree, ginger, pepper, jasmine, cyclamen, nutmeg flo
B256|Lunar Fable (Louis Vuitton Moon Tale)|Mod Fragrances|FX|RF|F|Floral, Fougere, Musk Smart casual / office / date Spring/Fall Transitional / mild; Louis Vuitton Moon Tale Top: raspberry. Heart: peony, magnolia, jasmine sambac, rose geranium. Base: soft musk, powdery accords.
B257|Mandarin Rouge (Parfums de Marly Carios)|Mod Fragrances|FX|GR|F|Woody, Citrus, Spicy, Blue, Floral Smart casual / evening / date Fall/Winter Cool / cold; Parfums de Marly Carios Top: red mandarin, bergamot, pink peppercorn, saffron. Heart: red thyme, geranium, black pepper. Base: roasted tonka
B258|Musk Melody (Initio Musk Therapy)|Mod Fragrances|FX|CT|F|Citrus, Floral, Woody, Musk Casual / office / layering Year-round Mild / variable; Initio Musk Therapy Top: bergamot, mandarin. Heart: white magnolia, cassis. Base: white sandalwood, all-natural white musk, rose musk.
B259|Reverence Extrait (Parfums de Marly Percival)|Mod Fragrances|FX|FR|F|Floral, Citrus, Blue, Fougere, Spicy Date / evening / office Fall/Winter Cool / cold; Parfums de Marly Percival Top: lavender, mandarin orange, bergamot, geranium. Heart: hedione, violet, jasmine, coriander, cinnamon. Base: ambrox
B260|Secret Embers (Initio Side Effect)|Mod Fragrances|FX|SW|F|Gourmand, Spicy, Woody, Leather, Tobacco Evening / date Fall/Winter Cool / cold; Initio Side Effect Top: cinnamon bark, vanilla, rum, tobacco. Heart: saffron, hedione. Base: sandalwood, leather.
B261|Shift (Prada Paradigme)|Mod Fragrances|FX|RF|F|Floral, Woody, Amber, Citrus, Fougere Office / date / versatile Year-round Mild / variable; Prada Paradigme Top: bergamot, musk. Heart: geranium, rose. Base: benzoin, Peru balsam, guaiac wood.
B262|Sunshine Embers|Mod Fragrances|FX|CT|F|Aromatic Casual / daytime / social Spring/Summer Warm / hot / humid; Mod Fragrances Sunshine Embers - maker-stated inspiration: Greenwich Village. Top: Litchi (Lychee), Mandarin Orange. Heart: Peony, Water Lily, Jasmine. Base: Amb
B263|The Exposed (Mind Games En Prise)|Mod Fragrances|FX|GR|F|Fougere, Spicy, Woody, Citrus, Floral Date / casual Year-round Mild / variable; Mind Games En Prise Top: bergamot, ginger, saffron. Heart: cassis, geranium, sugar. Base: cedar, vetiver, oakmoss.
B264|The Intent (Mind Games Gambit)|Mod Fragrances|FX|GR|F|Woody, Floral, Fougere, Spicy, Blue Smart casual / office / date Year-round Mild / variable; Mind Games Gambit Top: lavender, petitgrain, clove. Heart: cardamom, Madagascar geranium, mimosa. Base: patchouli, sandalwood, ambroxan.
B265|Bleu de Chanel EDT|Designer Originals|FX|CT|F|Aromatic Versatile / office / casual Year-round Mild / variable; Original Chanel composition No current official note pyramid is asserted. Chanel publishes no note pyramid on the official product page.
B266|Curve Black|Designer Originals|FX|GR|F|Green, Floral, Fougere, Woody, Citrus Casual / evening / cool-weather Fall/Winter Cool / cold; Original Curve / Liz Claiborne composition Violet Leaf, Nutmeg, Bergamot / Lavender, Moss, Clary Sage / Leather, Tonka Bean, Teak Wood,
B267|Curve Crush for Men|Designer Originals|FX|RF|F|Floral, Spicy, Fougere, Green, Citrus Casual / everyday Spring/Summer Warm / hot / humid; Original Curve / Liz Claiborne composition Basil, Bergamot, Coriander, Lily-of-the-Valley, Pears / Ginger, Lavender, Sage, Violet / Cardamom
B268|Curve for Men|Designer Originals|FX|GR|F|Woody, Spicy, Amber, Citrus, Floral Casual / everyday / nostalgic Spring/Summer Warm / hot / humid; Original Curve / Liz Claiborne composition Top: Douglas fir, green leaves, juniper leaves, lavender. Heart: bergamot, cardamom, Co
B269|Davidoff Cool Water|Designer Originals|FX|GR|F|Fougere, Floral, Woody, Amber, Green Casual / sport / gym Spring/Summer Warm / hot / humid; Original Davidoff composition Top: peppermint, lavender. Heart: oakmoss, geranium, sandalwood. Base: amber, musk.
B270|Dior Sauvage EDP|Designer Originals|FX|CT|F|Aromatic Office / casual / date Year-round Mild / variable; Original Dior composition No current official note pyramid is asserted. Dior publishes no note pyramid on the official product page.
B271|Montblanc Legend Spirit|Designer Originals|FX|CT|F|Citrus, Fougere, Spicy, Aquatic, Floral Casual / sport / everyday Spring/Summer Warm / hot / humid; Original Montblanc composition Top: pink peppercorn, grapefruit, bergamot. Heart: lavender, cardamom, aquatic accord. Base: white
B272|Nautica Voyage|Designer Originals|FX|FR|F|Aquatic, Fruity Casual / fresh / gym Spring/Summer Warm / hot / humid; Original Nautica composition Published notes: green apple, green leaf, drenched mimosa, sailcloth accord, water lotus. Fresh, aquatic, fruit-forward profile.
B273|Y Iced Cologne|Designer Originals|FX|GR|F|Fougere, Green, Aromatic, Musk Casual / gym / daytime Spring/Summer Warm / hot / humid; Original Yves Saint Laurent composition Top: Fresh Iced Mint, Cooling Arcticle. Heart: Living Mint accord, Blue Sage accord. Base: Ambroxan, P
B274|Ralph's Club|Designer Originals|FX|GR|F|Fougere, Woody, Green Casual / smart casual / versatile Year-round Mild / variable; Original Ralph Lauren composition Top: Lavandin, Clary Sage. Heart: Virginia Cedarwood. Base: Vetiver.
B275|Bois de Yuzu|Designer Originals|FX|CT|F|Citrus, Woody, Green, Spicy, Fougere Casual / office / daytime Spring/Summer Warm / hot / humid; Original Karl Lagerfeld composition Top: ginger, mandarin. Heart: yuzu wood, clary sage. Base: papyrus, patchouli. (Interparfums' own
B276|Moncler Sunrise Pour Homme|Designer Originals|FX|GR|F|Woody, Aromatic, Spicy, Citrus, Leather Smart casual / daytime / date Year-round Mild / variable; Original Moncler composition (2023, Interparfums); no clone target. Legacy notes (not reverified): Top: Pink Peppercorn, Bergamot, L
B277|Montblanc Explorer Platinum|Designer Originals|FX|GR|F|Woody, Green, Aromatic, Floral Office / casual / daytime Year-round Mild / variable; Original Montblanc composition, no clone target Top: Violet Leaf. Heart: Clary Sage. Base: Cedarwood.
B278|Barakkat Satin Oud (Maison Francis Kurkdjian Oud Satin Mood)|Fragrance World|FX|RF|F|Floral, Oud, Amber, Gourmand, Woody Date / evening / cozy Fall/Winter Cool / cold; Maison Francis Kurkdjian Oud Satin Mood (consensus). Legacy notes (not reverified): Bulgarian rose, Turkish rose, vanilla, agarwood (oud), benzoin,
B279|Intense Peach (Tom Ford Bitter Peach)|Fragrance World|FX|GR|F|Woody, Gourmand, Amber, Citrus, Floral Evening / bold social / date Fall/Winter Cool / cold; Closest match (consensus): Tom Ford Bitter Peach Top: peach, blood orange, cardamom, heliotrope. Heart: rum, cognac, davana, jasmine. Bas
B280|La Uno Million Elixir (Rabanne 1 Million Elixir)|Fragrance World|FX|SW|F|Gourmand, Woody, Floral, Fruity Date / club / evening Fall/Winter Cool / cold; Closest match (consensus): Rabanne 1 Million Elixir Top: apple, davana. Heart: Damask rose, cedar, osmanthus. Base: vanilla absolute, tonka bean, patch
B281|Lush Cherry (Tom Ford Lost Cherry)|Fragrance World|FX|GR|F|Woody, Floral, Fruity, Gourmand, Spicy Date / evening / romantic Fall/Winter Cool / cold; Closest match (consensus): Tom Ford Lost Cherry Top: sour cherry, bitter almond. Heart: sour cherry, plum, Turkish rose, jasmine sambac. Bas
B282|Oud Wonder (Tom Ford Oud Wood)|Fragrance World|FX|GR|F|Woody, Gourmand, Oud, Spicy, Amber Smart casual / office / date Fall/Winter Cool / cold; Closest match (consensus): Tom Ford Oud Wood Top: agarwood (oud), Brazilian rosewood, cardamom. Heart: sandalwood, Sichuan pepper, vanilla. B
B283|Proud of You (Giorgio Armani Stronger With You)|Fragrance World|FX|FR|F|Woody, Blue, Floral, Musk, Spicy Office / casual / everyday Fall/Winter Cool / cold; Giorgio Armani Stronger With You (consensus). Legacy notes (not reverified): Top: ambroxan, cardamom. Heart: cypriol, gardenia, vetiver. Base: sa
B284|Proud of You Absolute (Giorgio Armani Stronger With You Absolutely)|Fragrance World|FX|SW|F|Gourmand, Woody, Citrus, Floral, Fougere Date / evening / upscale Fall/Winter Cool / cold; Giorgio Armani Stronger With You Absolutely (consensus). Legacy notes (not reverified): Top: rum, bergamot, elemi. Heart: lavender, davana.
B285|Suits (Yves Saint Laurent Tuxedo)|Fragrance World|FX|RF|F|Floral, Spicy, Amber, Citrus, Gourmand Formal / evening / special Fall/Winter Cool / cold; Closest match (consensus): Yves Saint Laurent Tuxedo Top: violet leaf, coriander, bergamot. Heart: rose, black pepper, lily of the valley.
B286|Dark Cherry & Amber|Banana Republic|FX|GR|F|Woody, Amber, Fruity, Gourmand Date / cozy evening Fall/Winter Cool / cold; Original Banana Republic composition Top: dark cherry, pink freesia. Heart: cherry blossom, praline. Base: red amber, cedarwood.
B287|Grassland|Banana Republic|FX|RF|F|Floral, Woody, Fougere, Amber, Citrus Smart casual / office Spring/Summer Warm / hot / humid; Original Banana Republic composition; Creed Green Irish Tweed style comparison. Legacy notes (not reverified): Top: bergamot, pomelo, ap
B288|Linen Vetiver|Banana Republic|FX|RF|F|Floral, Amber, Citrus, Fougere, Musk Office / minimalist Spring/Summer Warm / hot / humid; Original Banana Republic composition Top: Italian bergamot, sparkling petitgrain, cardamom. Heart: hyacinth, wild iris, watery jasmine. Bas
B289|Metal Rain|Banana Republic|FX|GR|F|Green, Woody, Floral, Citrus, Fougere Casual / outdoors / fresh Spring/Summer Warm / hot / humid; Original Banana Republic composition Top: lemon, black currant, violet leaf, basil. Heart: lavender, green tea, ozonic notes, galban
B290|Midnight Hour|Banana Republic|FX|WA|F|Spicy, Woody, Floral, Fougere, Fruity Evening / date / social Fall/Winter Cool / cold; Original Banana Republic composition Top: mango skin, crushed leaves, ginger. Heart: pink pepper, star anise, geranium, hedione. Base: Indonesi
B291|Tobacco & Tonka Bean|Banana Republic|FX|FT|F|Fruity, Gourmand, Tobacco Cozy evening / lounge Fall/Winter Cool / cold; Original Banana Republic composition Top: Anjou pear, Mirabelle plum. Heart: coconut, tobacco leaf. Base: vanilla bean, tonka bean.
B292|Vintage Green 78|Banana Republic|FX|GR|F|Woody, Citrus, Floral, Fruity, Green Casual / weekend / outdoors Spring/Summer Warm / hot / humid; Original Banana Republic composition Top: bergamot, leafy greens, mandarin. Heart: magnolia, jasmine, green tea, fig. Base: cedarwo
B293|Gladiator (Argos Triumph of Bacchus)|Yom & Layl|FX|GR|F|Woody, Gourmand, Fruity, Amber, Floral Special / evening / statement Fall/Winter Cool / cold; Argos Triumph of Bacchus Top: rum, white peach, green apple, saffron. Heart: tonka bean, patchouli, vetiver, jasmine. Base: tobacco, van
B294|Limitless (Mind Games Blockade)|Yom & Layl|FX|WA|F|Oud, Woody, Amber, Citrus, Floral Evening / bold / statement Fall/Winter Cool / cold; Mind Games Blockade Top: mango, bergamot, pink pepper, tomato leaf. Heart: mango blossom, lavender, watery cyclamen, star anise. Base: amber, pa
B295|Nor (Mind Games Lionora)|Yom & Layl|FX|FT|F|Fruity, Woody, Gourmand, Musk, Spicy Casual / fresh / daytime Spring/Summer Warm / hot / humid; Mind Games Lionora Top: passionfruit, tonka bean, ginger. Heart: apricot, osmanthus, freesia. Base: lactones, tonka bean, sandalwood,
B296|Raazi (Mind Games J'Adoube)|Yom & Layl|FX|WA|F|Amber, Citrus, Floral, Leather, Woody Smart casual / social Fall/Winter Cool / cold; Mind Games J'Adoube Top: red currant, mandarin orange. Heart: pomegranate, Damask rose. Base: leather, patchouli, benzoin, amber.
B297|Rayees (Mind Games Grand Master)|Yom & Layl|FX|WA|F|Amber, Floral, Fruity, Gourmand Office / smart casual Spring/Fall Transitional / mild; Mind Games Grand Master Top: rose water, black currant, peony. Heart: May rose, coffee, violet. Base: incense, myrrh, ebony, panettone.
B298|Wazir (Mind Games Queening)|Yom & Layl|FX|SW|F|Gourmand, Floral, Fruity, Musk, Spicy Date / upscale / evening Fall/Winter Cool / cold; Mind Games Queening Top: cotton flower, apple, cypress. Heart: orris root, rum, saffron. Base: coconut, vanilla, musk.
B299|Island Dreams (Louis Vuitton Symphony)|Khadlaj|FX|FR|F|Citrus, Blue, Musk, Spicy Upscale casual / date Spring/Fall Transitional / mild; Closest match (consensus): Louis Vuitton Symphony Top: bergamot, ginger. Heart: grapefruit accord. Base: ambroxan, musk.
B300|Maison Epoque Artistique (Rabanne Invictus Victory Elixir)|Khadlaj|FX|SW|F|Gourmand, Spicy, Woody, Amber, Floral Date / evening / formal Fall/Winter Cool / cold; Closest match (consensus): Rabanne Invictus Victory Elixir Top: cardamom, lavandin, pepper. Heart: musk, geranium. Base: vanilla, tonka bean, c
B301|Shiyaaka Blue|Khadlaj|FX|GR|F|Woody, Citrus, Amber, Blue, Floral Office / casual / everyday Year-round Mild / variable; Original Khadlaj composition - modern blue designer style Top: bergamot, lime, basil. Heart: lavender, patchouli. Base: amber, musk, cedarwo
B302|Shiyaaka Snow (Special Edition) (Louis Vuitton Meteore)|Khadlaj|FX|CT|F|Citrus, Spicy, Floral, Woody Smart casual / office Spring/Summer Warm / hot / humid; Closest match (consensus): Louis Vuitton Meteore Top: mandarin orange, citrus notes, bergamot. Heart: neroli, nutmeg, pink pepper. Base: Indonesi
B303|Blueventus|Mirror Image Fragrances|FX|FT|F|Fruity, Gourmand, Woody, Amber, Blue Casual / social / date Spring/Summer Warm / hot / humid; Creed Aventus + wild blueberry accord + Iso E Super Top: wild blueberry (dominant), pineapple, apple. Heart: violet, green notes, light
B304|Fatboy|Mirror Image Fragrances|FX|GR|F|Woody, Citrus, Fruity, Amber, Blue Casual / office / versatile Spring/Summer Warm / hot / humid; Bvlgari Tygar x Louis Vuitton Imagination x Dolce & Gabbana Pineapple. Legacy notes (not reverified): Top: grapefruit, pineapple, gin
B305|King's Hollow (Amouage Outlands)|Mirror Image Fragrances|FX|WA|F|Amber, Spicy, Citrus, Floral, Woody Evening / special / cozy Fall/Winter Cool / cold; User-confirmed reference: Amouage Outlands Top: frankincense, cardamom, elemi, lemon, bergamot, Sichuan pepper. Heart: patchouli, anise, coriand
B306|Why So Soapy?!?|Mirror Image Fragrances|FX|CT|F|Citrus, Floral, Green, Woody, Blue Casual / office / daily Spring/Summer Warm / hot / humid; Hellenist Les Dieux aux Bains x YSL Y Iced Cologne x Louis Vuitton Imagination. Legacy notes (not reverified): Top: Calabrian bergamot, i
B307|Arctic Venom (Mirror Image Fragrances) (Silver / 16% Bleu de Chanel L’Exclusif)|Mirror Image Fragrances|FX|GR|F|Woody, Citrus, Amber, Spicy, Blue Smart casual / versatile / all-season Year-round Mild / variable; Silver / 16% Bleu de Chanel L’Exclusif. Finished-blend note pyramid is unverified; component notes do not establish the final blen
B308|Fattan|Rasasi|FX|GR|F|Woody, Amber, Citrus, Floral, Fougere Office / casual / everyday Year-round Mild / variable; User-confirmed reference: Hermes Terre d'Hermes Parfum. Bottle: Rasasi Fattan Pour Homme. Prior Terre d'Hermes reference bottle; related
B309|Hawas Ice (Rasasi Hawas flanker)|Rasasi|FX|CT|F|Citrus, Fruity, Amber, Aquatic, Floral Sport / gym / casual Spring/Summer Warm / hot / humid; Rasasi Hawas flanker; Rabanne Invictus Aqua-style DNA - loose comparison. Legacy notes (not reverified): Top: frozen apple, Italian berg
B310|Hawas Kobra|Rasasi|FX|CT|F|Citrus, Floral, Fruity, Woody, Amber Casual / daytime / social Spring/Summer Warm / hot / humid; Louis Vuitton Imagination with a greener/spicier twist (consensus). Legacy notes (not reverified): Top: pineapple, orange, grapefruit
B311|Abadi Opulent (Yves Saint Laurent Y L'Elixir)|Zimaya|FX|RF|F|Floral, Fougere, Amber, Citrus, Fruity Date / upscale / evening Fall/Winter Cool / cold; Closest match (consensus): Yves Saint Laurent Y L'Elixir Top: lavender, bergamot. Heart: geranium, juniper berries. Base: frankincense, oud.
B312|Itqan Noir (Yves Saint Laurent MYSLF Eau de Parfum)|Zimaya|FX|CT|F|Citrus, Floral, Woody Smart casual / date Fall/Winter Cool / cold; Yves Saint Laurent MYSLF Eau de Parfum (consensus). Legacy notes (not reverified): Top: bergamot. Heart: orange blossom. Base: Ambrofix, patchouli.
B313|Reverie Aqua (Valentino Uomo Born in Roma Intense)|Zimaya|FX|WA|F|Amber, Spicy, Floral, Fougere, Gourmand Casual / office / daytime Spring/Summer Warm / hot / humid; Closest match (consensus): Valentino Uomo Born in Roma Intense Top: cardamom, cinnamon, basil. Heart: chestnut, lavender, vanilla.
B315|Pool Day (Louis Vuitton Afternoon Swim)|La Ree Fragrances|FX|CT|F|Citrus Casual / beach / gym Spring/Summer Warm / hot / humid; Louis Vuitton Afternoon Swim Top: bergamot, citrus. Heart: mandarin orange. Base: Sicilian orange.
B317|Whipped Delight (Phlur Heavy Cream)|La Ree Fragrances|FX|SW|F|Gourmand, Citrus, Floral, Musk Casual / cozy / date Fall/Winter Cool / cold; Phlur Heavy Cream Top: marshmallow, sugar, orange, lemon. Heart: coconut, ambrettolide, jasmine. Base: whipped cream, vanilla, caramel.
B318|Amber Musc|Ajmal|FX|GR|F|Woody, Amber, Floral, Musk Date / evening / cozy Fall/Winter Cool / cold; Original Ajmal composition Top: floral notes, rose. Heart: musk, amber. Base: amber, cedarwood, musk. (Ajmal M Series 2015, Abdulla Ajmal; Ajmal describes t
B319|Evoke Gold (Prada L'Homme)|Ajmal|FX|RF|F|Floral, Woody, Amber, Fougere, Spicy Office / smart casual Year-round Mild / variable; Closest match (consensus): Prada L'Homme Top: neroli, pepper. Heart: geranium, orris, violet, amber. Base: patchouli, cedarwood.
B320|Club de Nuit Intense Man (Creed Aventus)|Armaf|FX|FT|F|Fruity, Woody, Citrus, Amber, Floral Evening / date / night out Fall/Winter Cool / cold; Closest match (consensus): Creed Aventus Top: apple, bergamot, blackcurrant, pineapple, lemon. Heart: rose, birch, jasmine. Base: musk, amber
B321|Club de Nuit Milestone (Creed Millesime Imperial)|Armaf|FX|FR|F|Woody, Aquatic, Blue, Citrus, Floral Smart casual / beach Spring/Summer Warm / hot / humid; Closest match (consensus): Creed Millesime Imperial Top: bergamot, red fruits, marine accords. Heart: violet, sandalwood, white wood. Base
B322|Le Parfait (Creed Aventus x Creed Green Irish Tweed)|Armaf|FX|RF|F|Floral, Fruity, Citrus, Amber, Gourmand Office / smart casual Spring/Summer Warm / hot / humid; Creed Aventus x Creed Green Irish Tweed (consensus). Legacy notes (not reverified): Top: black currant, pineapple, lemon, bergamot. He
B323|724 (Maison Francis Kurkdjian 724)|Mistify Parfums|FX|GR|F|Woody, Citrus, Floral, Musk Office / casual / everyday Year-round Mild / variable; Maison Francis Kurkdjian 724 Top: aldehydes, Italian bergamot. Heart: white flowers, sweet pea, jasmine. Base: musk, sandalwood.
B324|Castley|Mistify Parfums|FX|CT|F|Citrus, Spicy, Floral, Amber, Woody Office / smart casual / versatile Year-round Mild / variable; Parfums de Marly Castley (2025) Bergamot, Ginger, Black Pepper, Saffron, Pear, Jasmine, Neroli, Lily-of-the-Valley, Amber, Labdanum,
B325|Herbes Troublantes|Mistify Parfums|FX|GR|F|Green, Citrus, Floral, Musk Casual / office / fresh Spring/Summer Warm / hot / humid; Guerlain Herbes Troublantes (L'Art & La Matiere) Calabrian Bergamot, Neroli, Lemon, Cypress, Mandarin, Fresh Greens, Lavender, Mint, Jasmine, Ro
B326|Millionaire Royal|Valencia / Millionaire|FX|GR|F|Woody, Amber, Floral, Fougere Date / club / evening Fall/Winter Cool / cold; Closest match (consensus): Rabanne 1 Million Royal Key notes only, from Urban Collection's own site: cedarwood, lavender, benzoin. The nine-note marketpl
B327|Valencia Uomo Intense (Valentino Uomo Intense)|Valencia / Millionaire|FX|CT|F|Citrus, Gourmand, Floral, Fougere, Green Date / evening / romantic Fall/Winter Cool / cold; Closest match (consensus): Valentino Uomo Intense Top: mandarin orange, clary sage. Heart: iris, tonka bean. Base: vanilla, leather.
B328|Supremacy Collector's Edition (Creed Absolu Aventus with a sweeter/floral twist)|Afnan|FX|CT|F|Citrus, Fruity, Amber, Floral, Musk Smart casual / office / date Spring/Fall Transitional / mild; Creed Absolu Aventus with a sweeter/floral twist (consensus). Legacy notes (not reverified): Top: pineapple, bergamot, apple, white
B329|Detour Noir (Parfums de Marly Layton)|Al Haramain|FX|RF|F|Floral, Citrus, Woody, Fougere, Spicy Date / office / versatile Fall/Winter Cool / cold; Closest match (consensus): Parfums de Marly Layton Top: apple, lavender, jasmine, violet. Heart: vanilla, patchouli, mandarin, orange, bergam
B330|Hawaii Volcano (Creed Virgin Island Water)|Alexandria Fragrances|FX|CT|F|Citrus, Floral, Musk, Woody Casual / beach / vacation Spring/Summer Warm / hot / humid; Creed Virgin Island Water Top: lime, coconut, Sicilian bergamot, Sicilian mandarin. Heart: ylang-ylang, Indian jasmine, hibiscus. Base: musk,
B331|Bohemian Water (Byredo Gypsy Water)|ALT. Fragrances|FX|CT|F|Citrus, Green, Woody, Amber, Floral Casual / office / outdoors Spring/Fall Transitional / mild; Byredo Gypsy Water Top: bergamot, lemon, juniper. Heart: pine needles, incense, orris root. Base: amber, sandalwood, vanilla. (ALT.'s
B332|Most Wanted|Anti Social Parfum Club|FX|SW|F|Gourmand, Spicy, Woody Date / casual evening Fall/Winter Cool / cold; Anti Social Parfum Club The Most Wanted - seller-listed impression Inspired by Azzaro. Key notes: Red Ginger, Incandescent Wood, Bourbon Vanilla. Those notes id
B333|Amazonas Avalanche (Dior Homme Original (2011))|Atralia|FX|GR|F|Woody, Floral, Gourmand, Leather, Aromatic Date / evening / formal Fall/Winter Cool / cold; Closest match (consensus): Dior Homme Original (2011) Top: bergamot, sage, lavender. Heart: orris, cacao, leather. Base: cedarwood, vetive
B334|Liquid Brun (Parfums de Marly Althair)|French Avenue|FX|CT|F|Citrus, Gourmand, Spicy, Woody, Blue Smart casual / date Fall/Winter Cool / cold; Closest match (consensus): Parfums de Marly Althair Top: cinnamon, bergamot, cardamom, orange blossom. Heart: bourbon vanilla, elemi. Base: musk, pr
B335|Iconic Nuit Pour Homme|Grandeur|FX|RF|F|Floral, Fougere, Spicy, Woody, Blue Club / night out / bold Fall/Winter Cool / cold; Yves Saint Laurent La Nuit de L'Homme Bleu Electrique (consensus). Legacy notes (not reverified): Top: cardamom, ginger, bergamot. Heart: lavende
B336|Victorious No. 1 (Creed Aventus)|Hoko Fragrances|FX|FT|F|Fruity, Citrus, Floral, Amber, Gourmand Casual / gym / beater Year-round Mild / variable; Creed Aventus Top: bergamot, lemon, black currant, apple. Heart: patchouli, pineapple, Moroccan jasmine, rose. Base: musk, oak moss, birch,
B337|Wildcard (Bond No. 9 Lafayette Street)|Jo Milano Paris|FX|GR|F|Woody, Amber, Floral, Musk, Spicy Urban social / evening Fall/Winter Cool / cold; Closest match (consensus): Bond No. 9 Lafayette Street Top: bitter almond, saffron. Heart: Egyptian jasmine, cedar. Base: ambergris, woody notes, mu
B338|Bal Dafrique Absolu (Byredo Bal d'Afrique Absolu)|Monac Attar|FX|GR|F|Woody, Citrus, Floral Casual / office / smart casual Spring/Summer Warm / hot / humid; Byredo Bal d'Afrique Absolu Top: bergamot, African marigold, buchu. Heart: violet, cyclamen. Base: vetiver, cedar. (Monac's current official pr
B339|Mojave Ghost Absolu (Byredo Mojave Ghost Absolu (2024))|Monac Attar|FX|GR|F|Woody, Floral, Musk, Amber Office / casual / skin-close Year-round Mild / variable; Byredo Mojave Ghost Absolu (2024) Top: sapodilla, ambrette. Heart: violet, magnolia, sandalwood. Base: amber, cedarwood, musk. (Monac's own publis
B340|Citrus Rose (Maison Francis Kurkdjian L'Homme A la Rose)|Montagne Parfums|FX|WA|F|Amber, Citrus, Floral, Fougere, Green Casual / office / daytime Spring/Summer Warm / hot / humid; Maison Francis Kurkdjian L'Homme A la Rose Top: grapefruit. Heart: May rose, damask rose, sage. Base: labdanum, amber.
B341|Pacific Moss (Goldfield & Banks Pacific Rock Moss)|Montagne Parfums|FX|FR|F|Fougere, Woody, Aquatic, Citrus, Floral Casual / office / outdoors Spring/Summer Warm / hot / humid; Goldfield & Banks Pacific Rock Moss Top: lemon, sage. Heart: geranium. Base: cedar, moss. (Montagne names Pacific Rock Moss in th
B342|California Blue|Mykonos|FX|FR|F|Aquatic, Citrus, Fruity, Woody, Gourmand Casual / beach / daytime Spring/Summer Warm / hot / humid; Closest match (consensus): Rabanne Invictus Parfum (2024) Moss, Softwood, Caramel.
B343|Glitch|Mykonos|FX|FT|F|Fruity, Citrus, Fougere, Woody, Gourmand Evening / smart casual / date Fall/Winter Cool / cold; Creed Aventus style - retailer comparison, not a maker-named target. Legacy notes (not reverified): Top: Sicilian Bergamot, Apple, Gra
B344|Inception (Louis Vuitton Imagination)|Mykonos|FX|CT|F|Citrus, Spicy, Woody, Amber, Musk Casual / daytime / versatile Spring/Summer Warm / hot / humid; Closest match (consensus): Louis Vuitton Imagination Top: Bergamot, Ginger, Orange, Lemon. Heart: Neroli, Cinnamon, Black Tea, Biga F
B345|Sorrento (Sospiro Vibrato)|Mykonos|FX|RF|F|Floral, Citrus, Woody, Amber, Aquatic Office / smart casual / daytime Spring/Summer Warm / hot / humid; Closest match (consensus): Sospiro Vibrato Top: Fizzy Grapefruit, Bergamot, Mandarin Orange, Magnolia, Ginger. Heart: Fizzy Gr
B346|Rifaqat (Yves Saint Laurent Babycat)|Paris Corner|FX|WA|F|Spicy, Amber, Gourmand, Leather, Woody Casual / cozy / skin-close Fall/Winter Cool / cold; Closest match (consensus): Yves Saint Laurent Babycat Top: black pepper, pink pepper, elemi. Heart: olibanum, saffron. Base: bourbon vanill
B347|Blue Ocean - 0221 (Roja Parfums Oceania (2019 EDP, Isola Collection))|Perfume Parlour|FX|RF|F|Floral, Citrus, Woody, Green, Amber Casual / office / daytime Spring/Summer Warm / hot / humid; Roja Parfums Oceania (2019 EDP, Isola Collection). Prior target confirmation recorded 2026-08-02; retained, not newly verified.. Legac
B348|Aquatica (Creed Virgin Island Water)|Rayhaan|FX|CT|F|Citrus, Floral, Gourmand, Musk, Spicy Beach / vacation / summer Spring/Summer Warm / hot / humid; Closest match (consensus): Creed Virgin Island Water Top: coconut, lime, bergamot, mandarin. Heart: ginger, ylang-ylang, jasmine, hi
B349|Onyx|Royalty by Maluma|FX|WA|F|Spicy, Fruity, Citrus, Floral, Gourmand Date / club / evening Fall/Winter Cool / cold; Original Royalty by Maluma composition; 1 Million Prive resemblance only. Legacy notes (not reverified): Top: bergamot, cardamom, pear. Heart:
B350|Royce Black (Rabanne 1 Million Prive style)|Vurv|FX|RF|F|Floral, Fruity, Spicy, Amber, Green Date / club / evening Fall/Winter Cool / cold; Rabanne 1 Million Prive style Top: apple, clove, pink pepper. Heart: iris, juniper berries. Base: oud, amber, rosemary. Custom formula: 35% YSL Y I
B351|Citadel's Arctic Venom (15% The Hedonist)|Citadel Perfumes|FX|GR|F|Woody, Citrus, Amber, Green, Musk Casual / versatile / all-season Year-round Mild / variable; 15% The Hedonist. Finished-blend note pyramid is unverified; component notes do not establish the final blend pyramid.
B352|Scent No 106 (Inspired by Xerjoff Erba Pura)|Citadel Perfumes|FX|CT|F|Citrus, Fruity, Gourmand, Amber, Musk Casual / daytime / warm-weather Spring/Summer Warm / hot / humid; Inspired by Xerjoff Erba Pura Top: Sicilian Orange, Calabrian Bergamot, Sicilian Lemon. Heart: Fruit. Base: White Musk, Madaga
B353|Scent No 23 (Inspired by Creed's Pure White Cologne)|Citadel Perfumes|FX|CT|F|Citrus, Floral, Green, Amber, Musk Office / casual / versatile Year-round Mild / variable; Inspired by Creed's Pure White Cologne Top: Grapefruit, Lemon, Sicilian Bergamot. Heart: Pear, Neroli, Galbanum. Base: Rice, White Musk, Po
B354|Scent No 57 (Inspired by Nishane Wu Long Cha)|Citadel Perfumes|FX|CT|F|Citrus, Fruity, Gourmand, Musk, Spicy Casual / daytime / office Spring/Summer Warm / hot / humid; Inspired by Nishane Wu Long Cha Top: Bergamot, Orange, Mandarin Orange, Cubeba. Heart: Oolong Tea, Nutmeg. Base: Fig, Musk.
B355|Scent No 108 (Inspired by Xerjoff Torino 21)|Citadel Perfumes|FX|CT|F|Citrus, Green, Aromatic, Floral, Musk Casual / daytime / outdoors Spring/Summer Warm / hot / humid; Inspired by Xerjoff Torino 21 Top: Mint, Lemon, Basil, Thyme. Heart: Black Currant, Rosemary, Lavender, Jasmine. Base: Lemon Verbe
B356|Scent No 110 (Inspired by Mancera Cedrat Boise)|Citadel Perfumes|FX|CT|F|Citrus, Fruity, Woody, Leather, Musk Casual / smart casual / versatile Year-round Mild / variable; Inspired by Mancera Cedrat Boise Top: Sicilian Lemon, Black Currant, Bergamot, Spicy Notes. Heart: Fruity Notes, Patchouli Leaf, Wa
B357|AFTER THE KISS|Citadel Perfumes|FX|CT|F|Citrus, Woody, Aromatic, Floral, Amber Casual / smart casual / versatile Spring/Summer Warm / hot / humid; Finished-blend note pyramid is unverified; component notes do not establish the final blend pyramid.
B358|Pittsburgh Gold|Scentual Obsessions|FX|WA|F|Amber, Woody, Spicy, Gourmand Evening / date / formal Fall/Winter Cool / cold; Valentino Born In Roma The Gold Uomo - prior retailer comparison. Legacy notes (not reverified): Top: Solar Notes, Spicy Notes, Nutmeg. Heart: Virginia
B359|Greenwich King|Scentual Obsessions|FX|FT|F|Fruity, Floral, Amber, Gourmand, Musk Date / evening / versatile Spring/Fall Transitional / mild; Recorded maker blend: Bond No. 9 Greenwich Village x Creed Aventus. No discrete note pyramid asserted; prior evidence supports the b
B360|Delinquent (Carolina Herrera Bad Boy Elixir)|Scentual Obsessions|FX|WA|F|Leather, Spicy, Woody, Amber Evening / date / smart casual Fall/Winter Cool / cold; Carolina Herrera Bad Boy Elixir Top: Bergamot, Mandarin, Sage. Heart: Leather, Lavandin. Base: Cedarwood, Cocoa, Incense.
B361|Ice Storm (Yves Saint Laurent Y Iced Cologne)|Scentual Obsessions|FX|GR|F|Fougere, Green, Aromatic, Musk Casual / gym / daytime Spring/Summer Warm / hot / humid; Yves Saint Laurent Y Iced Cologne Top: Fresh Iced Mint, Cooling Arcticle. Heart: Living Mint Accord, Blue Sage Accord. Base: Ambroxan, Patchou
B362|Ano 13|Scentspired|FX|FR|F|Fruity, Musk, Blue, Green, Floral Casual / office / skin-close Year-round Mild / variable; Closest match (brand-stated): Le Labo Another 13 Head: Pear, Apple, Citruses. Heart: Ambrette (Musk Mallow), Amyl Salicylate, Moss, Jasmine
B363|Millionaire|Scentspired|FX|CT|F|Citrus, Spicy, Floral, Amber, Leather Date / evening / statement Fall/Winter Cool / cold; Closest match (brand-stated): Paco Rabanne 1 Million Head: Blood Mandarin, Grapefruit, Mint. Heart: Cinnamon, Spicy Notes, Rose. Base: Amber
B364|Deep Attraction (Le Labo The Noir 29)|Scentspired|FX|GR|F|Woody, Green, Gourmand, Musk Evening / formal Fall/Winter Cool / cold; Le Labo The Noir 29 Top: Fig, Bay Leaf, Bergamot. Heart: Cedar, Vetiver, Musk. Base: Tobacco, Hay.
B365|Extreme (Dior Homme Intense Head: Lavender)|Scentspired|FX|GR|F|Fougere, Floral, Woody, Musk Office / date / smart casual Fall/Winter Cool / cold; Dior Homme Intense Head: Lavender. Heart: Iris, Ambrette (Musk Mallow), Pear. Base: Vetiver, Virginia Cedar.
B366|Three Peaks (Diptyque Tam Dao)|Scentspired|FX|GR|F|Woody, Amber, Musk, Green, Spicy Smart casual / office / meditative Fall/Winter Cool / cold; Closest match (brand-stated): Diptyque Tam Dao Top: Italian Cypress, Myrtle, Rose. Heart: Sandalwood (Mysore), Cedar. Base: Brazilian Ros
B367|Azure Charm|Scentspired|FX|CT|F|Citrus, Woody, Amber, Floral, Musk Smart casual / office / versatile Year-round Mild / variable; Closest match (brand-stated): Ex Nihilo Blue Talisman Top: Pear, Bergamot, Mandarin Orange, Ginger. Heart: Orange Blossom, Georgywood
B368|Blue Sovereign|MAKNZ Perfumes|FX|CT|F|Citrus, Woody, Amber, Floral, Spicy Smart casual / office / versatile Year-round Mild / variable; Finished-blend note pyramid is unverified; component notes do not establish the final blend pyramid. Custom formula: 60% Herbes Capt
B369|Herbes Privé Intense|MAKNZ Perfumes|FX|CT|F|Citrus, Green, Woody, Musk, Blue Office / smart casual / signature Year-round Mild / variable; Finished-blend note pyramid is unverified; component notes do not establish the final blend pyramid. Custom formula: 55% Gypsie Water /
B370|Bohème Royale|MAKNZ Perfumes|FX|CT|F|Citrus, Woody, Fruity, Amber, Gourmand Smart casual / date / upscale casual Year-round Mild / variable; Finished-blend note pyramid is unverified; component notes do not establish the final blend pyramid. Custom formula: 45% Imagi
B371|Argent Privé (note pyramid is unverified)|MAKNZ Perfumes|FX|CT|F|Citrus, Woody, Amber, Spicy, Green Smart casual / office / versatile Year-round Mild / variable; note pyramid is unverified; component notes do not establish the final blend pyramid. Custom formula: 45% Reflection Man / 35% Tygar
B372|Aurélien|MAKNZ Perfumes|FX|RF|F|Floral, Woody, Amber, Citrus, Spicy Smart casual / date / evening Fall/Winter Cool / cold; Finished-blend note pyramid is unverified; component notes do not establish the final blend pyramid. Custom formula: 40% French Defense / 3
B373|Blood Covenant|MAKNZ Perfumes|FX|FT|F|Fruity, Amber, Spicy, Floral, Woody Evening / date / special Fall/Winter Cool / cold; Finished-blend note pyramid is unverified; component notes do not establish the final blend pyramid.
B374|DT-205 Fresh Alloy (Louis Vuitton Imagination)|Dupe Theory|FX|CT|F|Citrus, Spicy, Woody, Amber Casual / office / daytime Spring/Summer Warm / hot / humid; Louis Vuitton Imagination Top: Citron, Calabrian Bergamot, Sicilian Orange. Heart: Neroli, Ginger, Cinnamon. Base: Black Tea, Ambroxan, Guaiac
B375|DT-605 Crimson Spice (Creed Centaurus)|Dupe Theory|FX|WA|F|Spicy, Woody, Gourmand, Amber, Tobacco Evening / date / smart casual Fall/Winter Cool / cold; Creed Centaurus Top: Cinnamon, Tobacco, Cardamom, Pink Pepper. Heart: Sandalwood, Patchouli, Heliotrope. Base: Bourbon Vanilla, Tonka Be
B376|DT-614 Rayan Oud|Dupe Theory|FX|WA|F|Oud, Floral, Amber, Gourmand Evening / date / special Fall/Winter Cool / cold; Dupe Theory DT-614 Rayan Oud - maker-stated inspiration: Creed Oud Zarian. Maker notes: Top: Saffron, Rose. Heart: Oud Accord, Vanilla, Benzoin. Base:
B377|DT-611 Neon Cereal|Dupe Theory|FX|SW|F|Gourmand, Fruity, Citrus, Musk Casual / fun / playful Spring/Summer Warm / hot / humid; Froot Loops Cereal (novelty, no designer clone target) Top: Lemon Candy, Orange Zest, Lime Sugar, Grapefruit Pop. Heart: Fruity Cereal Accord,
B398|DT-609 Alpine Extrait de Parfum|Dupe Theory|FX|CT|F|Citrus, Green, Fresh, Musk, Woody Office / casual / daytime Spring/Summer; warm weather; Official Dupe Theory product page: inspired by Creed Silver Mountain Water. Maker notes - top: bergamot, mandarin orange; heart: green tea, b
B378|Midnight Soir (Maison Francis Kurkdjian Grand Soir)|Amore Fragrance|FX|WA|F|Amber, Gourmand, Woody Evening / date / special Fall/Winter Cool / cold; Maison Francis Kurkdjian Grand Soir Top: Spanish Labdanum, Orange. Heart: Lavender, Siam Benzoin. Base: Amber, Vanilla, Tonka Bean, Musk, Cedar.
B379|Super Man (Jean Paul Gaultier Le Male Ultra (Ultra Male))|Amore Fragrance|FX|SW|F|Gourmand, Spicy, Woody, Amber Evening / date / club Fall/Winter Cool / cold; Jean Paul Gaultier Le Male Ultra (Ultra Male) Top: Bergamot, Pear, Black Lavender, Mint. Heart: Cumin, Cinnamon, Clary Sage, Black Aztec Flower. Base: Bl
B380|ROSE AFTER HOURS (Rosée)|Yours Truly Perfume|FX|GR|F|Woody, Floral, Green, Citrus, Fruity Smart casual / date / versatile Spring/Fall Transitional / mild; Rosée. Finished-blend note pyramid is unverified; component notes do not establish the final blend pyramid. Custom formula: 60%
B381|The Imperial Storm|Yours Truly Perfume|FX|GR|F|Woody, Green, Citrus, Floral, Spicy Smart casual / office / versatile Year-round Mild / variable; Finished-blend note pyramid is unverified; component notes do not establish the final blend pyramid. Rain Tea oil identity requires
B382|WET ALIBI|Yours Truly Perfume|FX|CT|F|Citrus, Floral, Woody, Spicy, Gourmand Casual / daytime / versatile Spring/Summer Warm / hot / humid; Finished-blend note pyramid is unverified; component notes do not establish the final blend pyramid. Rain Tea oil identity requi
B383|BAD INTENTIONS (Rosée)|Yours Truly Perfume|FX|GR|F|Fougere, Floral, Woody, Spicy, Gourmand Smart casual / date / versatile Year-round Mild / variable; Rosée. Finished-blend note pyramid is unverified; component notes do not establish the final blend pyramid. Exact Y and The Most W
B384|WHO IS THAT?|Yours Truly Perfume|FX|GR|F|Woody, Citrus, Amber, Spicy, Floral Smart casual / evening / versatile Spring/Fall Transitional / mild; Finished-blend note pyramid is unverified; component notes do not establish the final blend pyramid. Custom formula: 60% Amyri
B385|SECOND SKIN|Yours Truly Perfume|FX|GR|F|Woody, Amber, Spicy, Floral, Gourmand Prior estimate: evening / date / smart casual; cool weather. Everyday suitability has not been tested.; Finished-blend note pyramid is unverified; component notes do not establish the final bl
B395|DEAD OF WINTER Custom blend|Yours Truly Perfume|FX|GR|F|Fougere, Aromatic, Citrus, Spicy, Woody Smart casual / date / evening Fall/Winter; cool-cold weather; Custom formula: 50% YSL Y / 30% Ralph Lauren Polo 67 / 20% Azzaro The Most Wanted. Finished-blend note pyramid is unverified; co
B396|COME CLOSER Custom blend, 30ml|Yours Truly Perfume|FX|GR|F|Woody, Green, Citrus, Aromatic, Fresh Smart casual / office / date Year-round; strongest spring-fall; Custom formula: 45% Creed Wild Vetiver / 40% Bleu de Chanel / 15% L'Immensité. Finished-blend note pyramid is unverified; compon
B397|DON'T STOP Custom blend, 30ml|Yours Truly Perfume|FX|CT|F|Citrus, Floral, Amber, Woody, Spicy Date / evening / versatile Year-round; strongest fall-spring; Custom formula: 60% Blue Talisman / 25% PDM Delina La Rosée / 15% Sauvage Elixir. Finished-blend note pyramid is unverified; compone
B405|HOSTILE TAKEOVER Custom blend, 30ml|Yours Truly Perfume|FX|FT|F|Fruity, Woody, Citrus, Amber, Smoky Smart casual / date / evening Year-round; strongest fall-winter; Custom formula: 45% Creed Aventus / 40% Cobalt 7 (Bleu de Chanel L'Exclusif) / 15% Grand Soir. Finished-blend note pyramid is unv
B386|Lafayette (No. 08) (Bond No. 9 Lafayette Street)|Majesty Fragrance|FX|CT|F|Citrus, Amber, Fruity, Woody, Fresh Spicy Office / smart casual / date Year-round / mild-variable; Official Majesty product page: inspired by Bond No. 9 Lafayette Street. Maker states a 50% oil base and publishes bergamot, coriand
B387|Foresight (No. 04) (Louis Vuitton Imagination, 50% oil base)|Majesty Fragrance|FX|CT|F|Citrus, Amber, Fresh Spicy, Green, Tea/Woody Office / casual / date Year-round; strongest in mild-warm weather; Official Majesty product page: inspired by Louis Vuitton Imagination, 50% oil base. Maker notes - top: citron, bergamo
B388|Rouge Extrait (No. 13)|Majesty Fragrance|FX|WA|F|Amber, Floral, Woody, Warm Spicy, Gourmand Date / evening / special Fall/Winter; cool-mild weather; Official Majesty product page: inspired by Maison Francis Kurkdjian Baccarat Rouge 540 Extrait. Maker publishes main accords of wa
B389|Comet (No. 47) (Louis Vuitton Meteore)|Majesty Fragrance|FX|CT|F|Citrus, Fresh Spicy, Aromatic, Woody Office / casual / daytime Spring/Summer; warm weather; Official Majesty product page: inspired by Louis Vuitton Meteore. Maker publishes main accords of citrus, fresh spicy and aromatic. Louis
B390|Vantaro (No. 03)|Majesty Fragrance|FX|FT|F|Fruity, Citrus, Smoky, Woody Office / casual / date Year-round; strongest in spring-summer; Official Majesty product page: VANTARO / Inspired by: Aventus (Creed Aventus). Maker publishes main accords only: citrus, smokey, lemon/pi
B391|Aurum (No. 155) (Prada Paradigme (2025))|Majesty Fragrance|FX|WA|F|Amber, Woody, Citrus, Floral, Fougere Office / date / versatile Year-round; mild-variable; User-confirmed inspiration: Prada Paradigme (2025). No product named Aurum appears on Majesty's current site (catalog, search and all colle
B392|City (No. 108)|Majesty Fragrance|FX|CT|F|Citrus, Fruity, Floral, Musk, Amber Office / casual / daytime Spring/Summer; warm weather; Official Majesty product page: CITY / INSPIRED BY: Erba Pura (Xerjoff Erba Pura). Maker publishes a labelled pyramid, top: Sicilian orange,
B399|Navy Noir (No. 24)|Majesty Fragrance|FX|CT|F|Citrus, Woody, Aromatic, Fresh Spicy Office / smart casual / date Year-round; mild-variable; Official Majesty product page: NAVY NOIR / Inspired by: blue de (Chanel Bleu de Chanel). Maker names grapefruit, mint and cedar with citr
B400|Wanted (No. 23)|Majesty Fragrance|FX|WA|F|Amber, Vanilla, Woody, Warm Spicy, Powdery Evening / date / social Fall/Winter; cool-cold weather; Official Majesty product page: Wanted / Inspired by: The Most Wanted (Azzaro). Maker publishes main accords only: vanilla, woody, w
B401|Presidential Mixture (No. 01)|Majesty Fragrance|FX|FT|F|Fruity, Sweet, Honey, Fresh Casual / daytime / versatile Spring/Summer; wearable year-round; Official Majesty product page: house original, described by the maker as its first fragrance away from inspired scents; no clone target.
B407|Pure Gold (No. 85) Extrait de Parfum|Majesty Fragrance|FX|CT|F|Citrus, Fresh Spicy, Fruity Casual / office / daytime Spring/Summer; warm weather; Official Majesty product page: PURE GOLD / INSPIRED BY: Ebra Pura Gold (read as Xerjoff Erba Gold; maker misspells it). Maker lists notes: Brazilia
B408|AMAI Extrait de Parfum (Parfums de Marly Castley)|Majesty Fragrance|FX|CT|F|Citrus, Fresh Spicy, Floral, Amber, Woody Office / smart casual / versatile Year-round; mild weather; User-confirmed inspiration: Parfums de Marly Castley. Majesty's marketplace listing (Amai / Men's) names no target and lists not
B418|Laytown Extrait de Parfum|Majesty Fragrance|FX|WA|F|Warm Spicy, Vanilla, Fresh Spicy, Aromatic, Woody Evening / date / smart casual Fall/Winter; cool weather; Official Majesty product page: "Laytown / Inspired by: DE LAYTON" (read as Parfums de Marly Layton). Maker publishes main a
B393|Day-Time Extrait, 60ml (Louis Vuitton Afternoon Swim)|Perfume Parfum House|FX|CT|F|Citrus, Amber Casual / beach / daytime Spring/Summer; warm-hot weather; User-confirmed inspiration: Louis Vuitton Afternoon Swim. Day-Time is not on Perfume Parfum House's current catalog (all 18 listed products checked 2026-09-25
B394|Cosmic Extrait (Louis Vuitton City of Stars)|Perfume Parfum House|FX|CT|F|Citrus, Floral, Musk, Woody Casual / office / vacation Spring/Summer; warm weather; User-confirmed inspiration: Louis Vuitton City of Stars. Cosmic is not on Perfume Parfum House's current catalog (checked 2026-09-25), so the make
B406|Mujrim Extrait, 120ml|Perfume Parfum House|FX|CT|F|Citrus, Woody, Aromatic, Smoky, Fresh Casual / office / evening Year-round; mild-variable; Maker page (Perfume Parfum House, checked 2026-10-01): "Mujrim / Extrait / Signature House Blend"; house original, no inspiration named. Br
B409|Erox Extrait|Perfume Parfum House|FX|CT|F|Fresh, Aromatic, Gourmand, Citrus, Woody Evening / night out / date Fall/Winter; cool weather; Official Perfume Parfum House product page: "Erox / Extrait / Inspired By Versace Eros". Brand-published pyramid: top mint, lemon, gree
B410|Contra Extrait, 30ml (Louis Vuitton Contre Moi)|Perfume Parfum House|FX|SW|F|Gourmand, Floral, Musk, Amber Date / evening / cozy Fall/Winter; cool weather; User-confirmed inspiration: Louis Vuitton Contre Moi. Contra is not on Perfume Parfum House's current catalog (all 69 listings and the site search chec
B411|Immense Extrait, 30ml (Louis Vuitton L'Immensité)|Perfume Parfum House|FX|CT|F|Citrus, Aromatic, Spicy, Amber Casual / office / daytime Spring/Summer; warm weather; User-confirmed inspiration: Louis Vuitton L'Immensité. Immense is not on Perfume Parfum House's current catalog (all 69 listings and the site se
B412|Atrap Extrait, 30ml (Louis Vuitton Attrape-Rêves)|Perfume Parfum House|FX|RF|F|Floral, Fruity, Gourmand Casual / date / daytime Spring/Fall; mild weather; User-confirmed inspiration: Louis Vuitton Attrape-Rêves. Atrap is not on Perfume Parfum House's current catalog (all 69 listings and the site search check
B413|Rome (Valentino Uomo Born in Roma)|Perfume Parfum House|FX|GR|F|Woody, Aromatic, Mineral, Spicy Smart casual / evening / date Spring/Fall; mild-cool weather; User-confirmed inspiration: Valentino Uomo Born in Roma. Bottle reads ROME; the maker's matching listing (Perfume Parfum House, checked
B414|Erox Flame|Perfume Parfum House|FX|CT|F|Citrus, Spicy, Woody, Amber, Aromatic Evening / date / casual Fall/Winter; cool weather; User-stated name: Erox Flame. Not on Perfume Parfum House's current catalog (checked 2026-10-06); the maker lists only "Erox / Extrait / Insp
B403|Citrus & Neroli Eau de Parfum (Louis Vuitton Imagination)|Wrist Water|FX|CT|F|Citrus, Floral, Fresh Spicy, Woody Casual / daytime / gym Spring/Summer; warm weather; Bottle label states: Inspired by Louis Vuitton Imagination; Citrus & Neroli; Wrist Water; Eau de Parfum. No maker product page or labelled pyra
B404|Elysian Mirage Eau de Parfum, 100ml|Beverly Hills Polo Club|FX|CT|F|Citrus, Fresh Spicy, Floral, Musk, Woody Casual / office / daytime Spring/Summer; warm weather; Brand-published pyramid (Beverly Hills Polo Club, 2026, Tropical collection) - top: bergamot, ginger, nutmeg, mint; heart: neroli, ger
B415|Dark Current Custom blend, 10ml|AM PARFUMS|FX|CT|F|Citrus, Aromatic, Amber, Woody, Fresh Spicy Smart casual / date / evening Year-round; strongest spring-fall; Custom formula: 40% Imagine / 40% Bad Boy Cobalt / 20% Rouge, at 30% extrait strength. Finished-blend note pyramid is unv
B416|Blue Smoke Custom blend, about 34ml|AM PARFUMS|FX|FR|F|Blue, Aromatic, Citrus, Fresh Spicy, Woody Casual / office / evening Year-round; mild-variable; Current modified batch: 3.60 ml Dylan Blue / 4.15 ml Sauvage / 5.25 ml Bad Boy Cobalt / 21 ml perfumer's alcohol, about 34 ml total. B
B417|NO WITNESSES Custom blend, 10ml|AM PARFUMS|FX|FT|F|Fruity, Woody, Smoky, Citrus, Gourmand Smart casual / date / evening Year-round; strongest fall-spring; Custom formula: 40% Avent / 40% Mujrim / 15% Pacifico / 5% Vanilla, at 40% oil. Exact batch: 1.60 ml Avent / 1.60 ml Mujrim /
B419|Ivory Flame (No. 173) (Clive Christian XXI Art Deco Blonde Amber)|Majesty Fragrance|FX|WA|F|Amber, Tobacco, Gourmand, Warm Spicy, Woody Evening / cozy / date Fall/Winter; cool weather; User-confirmed inspiration: Clive Christian amber, read as Clive Christian XXI Art Deco Blonde Amber (tobacco, dried fruit and white flor
B420|Aseel (Byredo Mojave Ghost)|Majesty Fragrance|FX|GR|F|Woody, Musky, Floral, Powdery, Amber Office / casual / skin-close Year-round; mild-variable; User-confirmed inspiration: Byredo Mojave Ghost. Majesty's TikTok Shop listing (Aseel / Unisex; label reads Extrait de Parfum) names no t
B421|Nomad (LV Ombre Nomade)|Majesty Fragrance|FX|WA|F|Oud, Amber, Smoky, Rose, Leather, Warm Spicy Evening / date / special Fall/Winter; cool-cold weather; Official Majesty product page: Nomad / Inspired by: Ombre Nomad (Louis Vuitton Ombre Nomade). Majesty's TikTok Shop listing give
B422|Prism (YSL Y Le Parfum)|Majesty Fragrance|FX|CT|F|Aromatic, Fresh Spicy, Lavender, Fruity, Woody Office / casual / date Year-round; mild-variable; Official Majesty product page: Prism / Inspired by: LE PARFUM (page URL reads YSL Le Parfum; read as Yves Saint Laurent Y Le Parfum).
B423|Rouge (MFK Baccarat Rouge 540)|Majesty Fragrance|FX|WA|F|Amber, Woody, Warm Spicy, Saffron, Floral Date / evening / social Fall/Winter; cool-mild weather; Official Majesty product page: ROUGE / Inspired by: Baccarat 540 (MFK Baccarat Rouge 540). Maker accords: woody, amber, warm spicy;
B424|Savion (PDM Sedley)|Majesty Fragrance|FX|CT|F|Citrus, Aromatic, Fresh Spicy, Green, Woody Office / casual / daytime Spring/Summer; warm weather; Official Majesty product page: Savion / Inspired By: Sedley (Parfums de Marly Sedley). TikTok listing accords: citrus, aromatic, fr
B425|Serenade (LV Symphony)|Majesty Fragrance|FX|CT|F|Citrus, Fresh Spicy, Warm Spicy, Fruity, Amber Smart casual / date Spring/Fall; mild weather; Official Majesty product page: Serenade / Inspired by: SYMPHONY (Louis Vuitton Symphony). Site accords: warm spicy, rose, amber; TikTok
B426|Enchanted Elixir (Dior Sauvage Elixir)|Majesty Fragrance|FX|WA|F|Warm Spicy, Aromatic, Lavender, Amber, Woody Evening / date / smart casual Fall/Winter; cool weather; Official Majesty product page: ENCHANTED ELIXER / Inspired by: Sauvage Elixer (Dior Sauvage Elixir). TikTok listing notes: nutme`;
// Reference pyramids of each oil's inspiration (public note lists; the oil itself may differ).
const REF={"F01": "grapefruit, mint, lemon; lavender, pineapple, geranium; sandalwood, cedar, amberwood, tonka", "F02": "bergamot, pepper; lavender, Sichuan pepper, geranium; ambroxan, cedar, labdanum", "F03": "apple, ginger, bergamot; sage, juniper, geranium; amberwood, tonka, cedar, vetiver", "F04": "grapefruit, bergamot, juniper; pepper, rosemary, rosewood; musk, incense, oakmoss", "F05": "mint, green notes, bergamot; lavender, geranium, watery notes; cedar, sandalwood", "F06": "mint, green notes, bergamot; lavender, geranium, watery notes; cedar, sandalwood", "F07": "bergamot, pineapple, black currant, grapefruit; lavender, jasmine; amber, musk, vetiver, cedar", "F08": "pink pepper, bergamot; rain accord, geranium, davana; patchouli, moss, musk", "F10": "grapefruit, mint, lemon; ginger, nutmeg, jasmine; incense, sandalwood, cedar, vetiver", "F11": "apple, ginger, bergamot; sage, juniper, geranium; amberwood, tonka, cedar, vetiver", "F12": "pear, orange blossom, bergamot; ginger; ambrette, woods, ambergris, musk", "F17": "bergamot, grapefruit, fig leaf; violet leaf, black pepper, papyrus; incense, musk, tonka, saffron", "F19": "bergamot, pepper; lavender, Sichuan pepper, geranium; ambroxan, cedar, labdanum", "F20": "bergamot, grapefruit, fig leaf; violet leaf, black pepper, papyrus; incense, musk, tonka, saffron", "F22": "grapefruit, mint, lemon; ginger, nutmeg, jasmine; incense, sandalwood, cedar, vetiver", "F23": "black currant, citron, lemon, mint, orange; apricot, basil, fig; vetiver, ginger, musk", "F24": "bergamot, pepper; lavender, Sichuan pepper, geranium; ambroxan, cedar, labdanum", "F26": "cucumber, melon, green notes", "C02": "bergamot, aldehydes; jasmine, freesia, rose; sandalwood, white musk", "C03": "ambrette, red fruits; magnolia, violet, jasmine; sandalwood, cedar, musk", "C04": "clean laundry, white musk, soft floral", "C05": "bergamot, juniper, coriander; nutmeg, vanilla; amber, vetiver, musk", "C07": "white musk", "C08": "soap, aldehydes, lavender; rose, lavender; coconut, white musk, patchouli", "T01": "lemon, grapefruit, bergamot; jasmine, iris; amyris wood, vetiver, tonka", "T02": "citron, bergamot, orange; ginger, cinnamon, neroli; black tea, ambroxan, guaiac, olibanum", "T03": "mint, bergamot, citrus", "T05": "bergamot, mandarin, neroli; pepper, nutmeg; vetiver, musk", "T06": "lemon, grapefruit, bergamot; jasmine, iris; amyris wood, vetiver, tonka", "T07": "citron, bergamot, orange; ginger, cinnamon, neroli; black tea, ambroxan, guaiac, olibanum", "T08": "citron, bergamot, orange; ginger, cinnamon, neroli; black tea, ambroxan, guaiac, olibanum", "T09": "bergamot, mandarin; black currant, green tea; musk, sandalwood, petitgrain", "T10": "citron, bergamot, orange; ginger, cinnamon, neroli; black tea, ambroxan, guaiac, olibanum", "T13": "lemon", "G01": "lemon, bergamot, pink pepper; angelica, laurel; oud, cedar, sandalwood, vetiver, musk", "G02": "cardamom, pepper, rosewood; oud, sandalwood, vetiver; tonka, amber", "G03": "grapefruit, orange blossom; iris, nutmeg, pimento; vetiver, oakmoss, woods", "G04": "grapefruit, coriander; cedar, labdanum; sandalwood, benzoin, musk", "G05": "bergamot, citrus; vetiver, green notes, mint; woods", "G06": "grapefruit, orange blossom; iris, nutmeg; vetiver, oakmoss, woods", "G09": "bergamot, grapefruit, pineapple; juniper, birch, jasmine; oakmoss, patchouli, cedar, musk", "G10": "cardamom, violet; iris, papyrus, leather; sandalwood, cedar, amber", "R01": "cardamom, bergamot; rose, jasmine, lily; amber, musk, woods", "R02": "grapefruit, saffron; Damascena rose, sage; amberwood, cedar", "R03": "rhubarb, lychee, bergamot; Turkish rose, peony; vanilla, cashmeran, musk", "R05": "violet, rose; oud, amber, vanilla, benzoin, musk", "R06": "grapefruit, saffron; Damascena rose, sage; amberwood, cedar", "R07": "pink pepper, bergamot, hedione; Bulgarian rose, Turkish rose, jasmine; vanilla, amber", "R08": "rose, musk", "R09": "rhubarb, lychee, bergamot; Turkish rose, peony; vanilla, cashmeran, musk", "R10": "rhubarb, lychee, bergamot; Turkish rose, peony; vanilla, cashmeran, musk", "R11": "orange, bergamot; rose, jasmine; patchouli, vetiver, vanilla, white musk", "R12": "pink pepper, pear, bergamot; rose, magnolia; sandalwood, cashmere wood, musk", "R13": "mandarin, black currant, lavender; lavender, orange blossom, jasmine; vanilla, musk, cedar, ambergris", "P01": "cherry, bitter almond; Turkish rose, jasmine; tonka, benzoin, Peru balsam, sandalwood, vetiver", "P03": "cinnamon, saffron; plum, immortelle, liquor, cypress; oud, amber, benzoin, vanilla", "P04": "cinnamon, saffron; plum, immortelle, liquor, cypress; oud, amber, benzoin, vanilla", "P05": "pineapple, bergamot, black currant, apple; birch, patchouli, jasmine; musk, oakmoss, ambergris, vanilla", "P07": "fig", "P08": "green apple", "P09": "sweet apple", "P10": "blueberry", "P11": "pear", "P12": "peach", "P13": "apple, brandy, cinnamon, vanilla, woods", "P14": "cinnamon, saffron; plum, immortelle, liquor, cypress; oud, amber, benzoin, vanilla", "P15": "grapefruit, cranberry, red ginger; red saffron, red pepper; red wood, coffee", "P16": "pineapple, birch, patchouli, musk", "P17": "pineapple, bergamot, black currant, apple; birch, patchouli, jasmine; musk, oakmoss, ambergris, vanilla", "P18": "cherry, bitter almond; Turkish rose, jasmine; tonka, benzoin, Peru balsam, sandalwood, vetiver", "P19": "pineapple, bergamot, black currant, apple; birch, patchouli, jasmine; musk, oakmoss, ambergris, vanilla", "P21": "black cherry, saffron; osmanthus, olibanum; balsam, styrax, smoky woods, leather", "W01": "vanilla, lavender, vetiver, woods", "W02": "lavender, clary sage, bitter almond; leather, orris, tonka; vanilla, amber, cashmeran", "W03": "saffron, jasmine; amberwood, ambergris; fir resin, cedar", "W04": "bergamot; tonka, oud, vanilla; musk, amber, cedar", "W05": "lavender, cinnamon; candied apple, davana; tonka, patchouli, honey", "W09": "cinnamon, red pepper; tobacco, cedar; vanilla, amber", "W11": "cinnamon, nutmeg, cardamom, grapefruit; lavender; licorice, sandalwood, amber, patchouli, vetiver", "W14": "cinnamon, cardamom, orange blossom, bergamot; bourbon vanilla, elemi; praline, musk, ambroxan, guaiac", "W15": "apple, lavender, bergamot, mandarin; geranium, violet, jasmine; vanilla, cardamom, sandalwood, pepper, guaiac, patchouli", "W16": "saffron, bitter almond; jasmine, cedar; ambergris, woody musk", "W17": "pear, lavender, mint, bergamot; cinnamon, clary sage; vanilla, amber, woods", "W18": "tobacco, oud, spices, coriander; vanilla, tonka, benzoin; patchouli", "W19": "lavender, cinnamon; candied apple, davana; tonka, patchouli, honey", "W20": "saffron, jasmine; amberwood, ambergris; fir resin, cedar", "W21": "saffron, jasmine; amberwood, ambergris; fir resin, cedar", "W22": "apple, lavender, bergamot, mandarin; geranium, violet, jasmine; vanilla, cardamom, sandalwood, pepper, guaiac, patchouli", "W23": "saffron, jasmine; amberwood, ambergris; fir resin, cedar", "W26": "tobacco, cinnamon, nutmeg, saffron; oud, patchouli, jasmine; vanilla, amber, sandalwood, white musk", "W27": "pink pepper, neroli, lemon; rum, clary sage, java vetiver; tobacco leaf, vanilla, styrax", "W28": "rosewood, mandarin, coriander; rose, cinnamon, carnation; sandalwood, vanilla, ambrette", "W29": "cardamom; leather, jasmine sambac; amber, moss, patchouli", "W30": "mandarin, neroli, cardamom, nutmeg, saffron; kulfi, mastic, rose, orange blossom, jasmine; vanilla, sandalwood, amber, woods", "W31": "incense, olibanum, labdanum, woods", "W32": "bergamot; patchouli, coumarin; amber, musk", "W33": "leather, vanilla, spice, amber, woods", "S01": "vanilla, smoked tobacco leaf; vanilla absolute, sandalwood, tonka; benzoin, cedar, vanilla", "S02": "caramel, coffee, rum; sugar cane, cyanide accord; vetiver, sandalwood, heliotrope", "S03": "gardenia, carnation, jasmine; patchouli, sea notes, sandalwood; caramel, coffee", "S05": "tobacco leaf, spices; tonka, vanilla, cacao, tobacco flower; dried fruits, woods", "S06": "cognac; cinnamon, tonka, oak; praline, vanilla, sandalwood", "S07": "coconut, vanilla", "S08": "bergamot, pink pepper, neroli; orange blossom, rose, iris; marshmallow, vanilla, caramel, musk", "S10": "pear, pink pepper, orange blossom; coffee, jasmine, bitter almond; vanilla, patchouli, cedar", "S13": "whisky, pink pepper, mandarin; iris, chestnut; myrrh, woods, vanilla"};
// Existing Meridian Files characters and protected names.
const EXISTING=[
 ["BLUE SOVEREIGN","Marisol Quay; hero"],
 ["HERBES PRIVÉ INTENSE","existing canonical fragrance"],
 ["BOHÈME ROYALE","existing canonical fragrance"],
 ["ARGENT PRIVÉ","existing canonical fragrance"],
 ["AURÉLIEN","existing canonical fragrance"],
 ["BLOOD COVENANT","existing canonical fragrance; retain title"],
 ["AFTER THE KISS","existing canonical fragrance"],
 ["CITADEL'S ARCTIC VENOM","existing canonical fragrance; retain title"],
 ["ARCTIC VENOM","Mirror Image; separate blend; retain title"],
 ["ROSE AFTER HOURS","existing canonical fragrance"],
 ["THE IMPERIAL STORM","existing canonical fragrance"],
 ["DEAD OF WINTER","existing canonical fragrance"],
 ["BAD INTENTIONS","existing canonical fragrance"],
 ["SECOND SKIN","existing canonical fragrance"],
 ["WET ALIBI","existing canonical fragrance"],
 ["WHO IS THAT?","existing canonical fragrance"],
 ["COME CLOSER","existing canonical fragrance"],
 ["DON'T STOP","existing canonical fragrance"],
 ["HOSTILE TAKEOVER","existing canonical fragrance"],
 ["DARK CURRENT","JOLT; Aegis Order hero"],
 ["BLUE SMOKE","CALDER ASH; Black Crown villain"],
 ["NO WITNESSES","SORREL; Black Crown villain"],
 ["DARK HARVEST","THE REAPER GRAFT; Black Crown villain"],
 ["BLACK SOLSTICE","ECLIPSE; Black Crown villain"],
 ["SINFUL HOURS","LUCIEN VANE; Black Crown villain"],
 ["ROSE REVENANT","SILAS THORNWELL; Night Court anti-villain protecting innocents"],
 ["FROST VIPER","Night Court antihero; cryo-serpent symbiote armor"],
 ["CHERRY VENDETTA","existing fragrance / character concept; protect name"]
];
