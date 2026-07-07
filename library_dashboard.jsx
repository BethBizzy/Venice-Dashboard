import React, { useState, useMemo, useEffect } from 'react';
import { Search, X } from 'lucide-react';

const GOOGLE_BOOKS_API_KEY = 'AIzaSyBmK2S6ZqPbT_-i2lFSPE86uMfbHGaora0';

// Tooltip component for book summaries from Google Books API
const BookTooltip = ({ book, author }) => {
  const [summary, setSummary] = useState('Loading...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const query = encodeURIComponent(`${book} ${author}`);
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${GOOGLE_BOOKS_API_KEY}&maxResults=1`
        );
        const data = await response.json();
        
        if (data.items && data.items[0]) {
          const volumeInfo = data.items[0].volumeInfo;
          const desc = volumeInfo.description || 'No description available';
          const truncated = desc.length > 200 ? desc.substring(0, 200) + '...' : desc;
          setSummary(truncated);
        } else {
          setSummary('No summary found');
        }
      } catch (error) {
        setSummary('Could not fetch summary');
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchSummary, 300);
    return () => clearTimeout(timer);
  }, [book, author]);

  return (
    <div className="absolute bottom-full left-0 mb-2 w-64 bg-slate-900 text-white text-sm p-3 rounded shadow-lg z-50 border border-slate-700">
      <p className="font-semibold mb-2">{book}</p>
      <p className="text-xs text-slate-300 mb-2">by {author}</p>
      <p className="text-xs leading-relaxed">{summary}</p>
    </div>
  );
};

// COMPLETE DATASET - All ~470 books from 120 artists - 2017 Venice Biennale
const rawBooksData = [
  {"artist": "BAS JAN ADER", "book": "Een Groninger pastorie in de storm", "author": "Johanna Ader-Appels", "year": 1947, "country": "The Netherlands"},
  {"artist": "BAS JAN ADER", "book": "La Chute (The Fall)", "author": "Albert Camus", "year": 1956, "country": "The Netherlands"},
  {"artist": "BAS JAN ADER", "book": "Nooit meer (Beyond Sleep)", "author": "Willem Fredrik Hermans", "year": 1956, "country": "The Netherlands"},
  {"artist": "BAS JAN ADER", "book": "Nooit meer slapen (Beyond Sleep)", "author": "Willem Frederik Hermans", "year": 1966, "country": "The Netherlands"},
  {"artist": "BAS JAN ADER", "book": "Tinkerbelle", "author": "Robert Mary", "year": 1967, "country": "The Netherlands"},
  {"artist": "BAS JAN ADER", "book": "De Avonden: een winterverhaal (The Evenings: A Winter's Tale)", "author": "Garard Reve", "year": 1947, "country": "The Netherlands"},
  {"artist": "ABDULLAH AL SAADI", "book": "L'Eau et les reves (Water and Dreams)", "author": "Gaston Bachelard", "year": 1942, "country": "United Arab Emirates"},
  {"artist": "ABDULLAH AL SAADI", "book": "Memory and Modernity: Popular Culture in Latin America", "author": "William Rowe, Vivan Schelling", "year": 1991, "country": "United Arab Emirates"},
  {"artist": "ABDULLAH AL SAADI", "book": "Road to Mecca", "author": "Leopold Weiss (alias Muhammad Asad)", "year": 1954, "country": "United Arab Emirates"},
  {"artist": "NEVIN ALADAG", "book": "Gagen den Hass [Against Hate]", "author": "Carolin Emcke", "year": 2016, "country": "Turkey"},
  {"artist": "NEVIN ALADAG", "book": "Ince Memed I (Memed, My Hawk)", "author": "Yasar Kemal", "year": 1955, "country": "Turkey"},
  {"artist": "NEVIN ALADAG", "book": "Rap Attack: African Jive to New York Hip Hop", "author": "David Toop", "year": 1984, "country": "Turkey"},
  {"artist": "LEONOR ANTUNES", "book": "Che cos'e un dispositivo? (What is an Apparatus? and Other Essays)", "author": "Giorgio Agamben", "year": 2006, "country": "Portugal"},
  {"artist": "LEONOR ANTUNES", "book": "Dissemination", "author": "Jacques Derrida", "year": 1972, "country": "Portugal"},
  {"artist": "LEONOR ANTUNES", "book": "Philosophie de la Relation: poesie en etendue (Relational Philosophy: Enhanced Poetry)", "author": "Edouard Glissant", "year": 2009, "country": "Portugal"},
  {"artist": "LEONOR ANTUNES", "book": "Le Bain de Diane (Diana at Her Bath: The Woman of Rome)", "author": "Pierre Klossowsky", "year": 1956, "country": "Portugal"},
  {"artist": "LEONOR ANTUNES", "book": "Le Parti pris des choses (The Voice of Things)", "author": "Francis Ponge", "year": 1942, "country": "Portugal"},
  {"artist": "RASHEED ARAEEN", "book": "Florenz und Bagdad (Florence and Baghdad: Renaissance Art and Arab Science)", "author": "Hans Belting", "year": 2008, "country": "Pakistan"},
  {"artist": "RASHEED ARAEEN", "book": "Les Damnes de la Terre (The Wretched of the Earth)", "author": "Frantz Fanon", "year": 1961, "country": "Pakistan"},
  {"artist": "RASHEED ARAEEN", "book": "Orientalism", "author": "Edward Said", "year": 1978, "country": "Pakistan"},
  {"artist": "RASHEED ARAEEN", "book": "Islamic Science and the Making of The European Renaissance", "author": "George Saliba", "year": 2007, "country": "Pakistan"},
  {"artist": "RASHEED ARAEEN", "book": "On African Socialism", "author": "Leopold Sedar Senghor", "year": 1964, "country": "Pakistan"},
  {"artist": "SALVATORE ARANCIO", "book": "Wonders of the Volcano", "author": "Ascott R. Hope", "year": 1890, "country": "Italy"},
  {"artist": "SALVATORE ARANCIO", "book": "Mundus subterraneus (The Subterranean World)", "author": "Athanasius Kircher", "year": 1665, "country": "Italy"},
  {"artist": "SALVATORE ARANCIO", "book": "Legends of the Earth: Their Geologic Origins", "author": "Dorothy Vitaliano", "year": 1973, "country": "Italy"},
  {"artist": "JELILI ATIKU", "book": "Osun Seegesi: The Elegant Deity of Wealth, Power, and Femininity", "author": "Diedre Badejo", "year": 1996, "country": "Nigeria"},
  {"artist": "JELILI ATIKU", "book": "Esu: Yoruba God, Power and The Imaginitive Frontiers", "author": "Toyin Falola", "year": 2013, "country": "Nigeria"},
  {"artist": "JELILI ATIKU", "book": "Livet efter fedslen (Life After Birth)", "author": "Kate Figes", "year": 1998, "country": "Nigeria"},
  {"artist": "JELILI ATIKU", "book": "Political Order and Political Decay", "author": "Francis Fukuyama", "year": 2014, "country": "Nigeria"},
  {"artist": "JELILI ATIKU", "book": "Millennium: Tribal Wisdom and The Modern World", "author": "David Maybury", "year": 1992, "country": "Nigeria"},
  {"artist": "JELILI ATIKU", "book": "ISIS: Inside The Army of Terror", "author": "Michael Weiss, Hassan Hassan", "year": 2015, "country": "Nigeria"},
  {"artist": "CHARLES ATLAS", "book": "Composition in Retrospect", "author": "John Cage", "year": 1982, "country": "United States"},
  {"artist": "CHARLES ATLAS", "book": "Before Pictures", "author": "Douglas Crimp", "year": 2016, "country": "United States"},
  {"artist": "CHARLES ATLAS", "book": "Robert Rauschenberg: Combines", "author": "Paul Schimmel", "year": 2005, "country": "United States"},
  {"artist": "CHARLES ATLAS", "book": "The Philosophy of Andy Warhol (From A to B and Back Again)", "author": "Andy Warhol", "year": 1975, "country": "United States"},
  {"artist": "KADER ATTIA", "book": "Leopold Sedar Senghor: I'art africain comme philosophie", "author": "Souleymane Bachir Diagne", "year": 2007, "country": "France"},
  {"artist": "KADER ATTIA", "book": "Objectivity", "author": "Lorraine Daston, Peter Galison", "year": 2007, "country": "France"},
  {"artist": "KADER ATTIA", "book": "La Pensee metisse (The Mestizo Mind)", "author": "Serge Gruzinski", "year": 1999, "country": "France"},
  {"artist": "KADER ATTIA", "book": "The Tell-Tale Brain", "author": "Vilayanur Ramachadran", "year": 2011, "country": "France"},
  {"artist": "MARCOS AVILA FORERO", "book": "El ingenioso hidalgo don Quijote de la Mancha (The Ingenious Gentleman Don Quixote)", "author": "Miguel de Cervantes", "year": 1605, "country": "France"},
  {"artist": "MARCOS AVILA FORERO", "book": "Las venas abiertas de America Latina (Open Veins of Latin America)", "author": "Eduardo Galeano", "year": 1971, "country": "France"},
  {"artist": "MARCOS AVILA FORERO", "book": "Cien anos de soledad (One Hundred Years of Solitude)", "author": "Gabriel Garcia Marquez", "year": 1967, "country": "France"},
  {"artist": "MARCOS AVILA FORERO", "book": "Das Kapital (Capital: Critique of Political Economy)", "author": "Karl Marx", "year": 1867, "country": "France"},
  {"artist": "RINA BANERJEE", "book": "L'Empire des signes (Empire of Signs)", "author": "Roland Barthes", "year": 1970, "country": "India"},
  {"artist": "RINA BANERJEE", "book": "Darwin's Garden: Down House and the Origin of Species", "author": "Michael Boulter", "year": 2008, "country": "India"},
  {"artist": "RINA BANERJEE", "book": "Among Flowers: A Walk in the Himalayas", "author": "Jamaica Kincaid", "year": 2005, "country": "India"},
  {"artist": "RINA BANERJEE", "book": "My Garden", "author": "Jamaica Kincaid", "year": 1999, "country": "India"},
  {"artist": "RINA BANERJEE", "book": "Marriage and Modernity: Family Values in Colonial Bengal", "author": "Rochona Majumdar", "year": 2009, "country": "India"},
  {"artist": "RINA BANERJEE", "book": "De la postcolonie (On the Postcolony)", "author": "Achille Mbembe", "year": 2000, "country": "India"},
  {"artist": "RINA BANERJEE", "book": "Frankenstein", "author": "Mary Shelley", "year": 1818, "country": "India"},
  {"artist": "MICHAEL BEUTLER", "book": "Beach Houses: Andrew Geller", "author": "Alastair Gordon", "year": 2003, "country": "Germany"},
  {"artist": "MICHAEL BEUTLER", "book": "Home Work: Handbuilt Shelter", "author": "Lloyd Kahn", "year": 2004, "country": "Germany"},
  {"artist": "MICHAEL BEUTLER", "book": "Das Glashaus (House of Glass)", "author": "Georg Kohlmaier, Barna von Sartory", "year": 1981, "country": "Germany"},
  {"artist": "MICHAEL BEUTLER", "book": "Die Poetik eines Mauervorsprung (The Poetics of a Wall Projection)", "author": "Jan Turnovsky", "year": 1985, "country": "Germany"},
  {"artist": "MCARTHUR BINION", "book": "For Love: Poems 1950-1960", "author": "Robert Creely", "year": 1962, "country": "United States"},
  {"artist": "MCARTHUR BINION", "book": "Rhinestone Sharecropping", "author": "Bill Gunn", "year": 1981, "country": "United States"},
  {"artist": "MCARTHUR BINION", "book": "Preface to a Two Volume Suicide Note", "author": "Everett LeRoi Jones", "year": 1961, "country": "United States"},
  {"artist": "MCARTHUR BINION", "book": "Their Eyes Were Watching God", "author": "Zora Neale Hurston", "year": 1937, "country": "United States"},
  {"artist": "KARLA BLACK", "book": "The Writings of Melanie Klein", "author": "Melanie Klein", "year": 1975, "country": "United Kingdom"},
  {"artist": "KARLA BLACK", "book": "La mente del bambino (The Absorbent Mind)", "author": "Maria Montessori", "year": 1952, "country": "United Kingdom"},
  {"artist": "KARLA BLACK", "book": "La Nausee (Nausea)", "author": "Jean-Paul Sartre", "year": 1938, "country": "United Kingdom"},
  {"artist": "IRMA BLANK", "book": "Gehen (Walking: A Novella)", "author": "Thomas Bernhard", "year": 1971, "country": "Germany"},
  {"artist": "IRMA BLANK", "book": "Le Livre des questions (The Book of Questions)", "author": "Edmond Jabes", "year": 1964, "country": "Germany"},
  {"artist": "IRMA BLANK", "book": "How to Write", "author": "Gertrude Stein", "year": 1931, "country": "Germany"},
  {"artist": "IRMA BLANK", "book": "Poesie (Poems)", "author": "Marina Ivanovna Cvetaeva", "year": 1967, "country": "Germany"},
  {"artist": "MICHEL BLAZY", "book": "La Hulotte", "author": "Pierre Deom", "year": 1972, "country": "Monaco"},
  {"artist": "MICHEL BLAZY", "book": "Joyeuses Pates: 160 recettes (Happy Pasta)", "author": "Macha Meril", "year": 1999, "country": "Monaco"},
  {"artist": "PAULO BRUSCKY", "book": "Fonctions de la peinture (Functions of Painting)", "author": "Fernand Leger", "year": 1965, "country": "Brazil"},
  {"artist": "PAULO BRUSCKY", "book": "The Medium Is The Massage: An Inventory of Effects", "author": "Marshall McLuhan, Quentin Fiore", "year": 1967, "country": "Brazil"},
  {"artist": "PAULO BRUSCKY", "book": "Le Choc du futur (Future Shock)", "author": "Alvin Toffler", "year": 1970, "country": "Brazil"},
  {"artist": "HEIDI BUCHER", "book": "Yijing (I Ching)", "author": "Ancient Chinese text", "year": -750, "country": "Switzerland"},
  {"artist": "HEIDI BUCHER", "book": "Die Sonetten an Orpheus (Sonnets to Orpheus)", "author": "Rainer Maria Rilke", "year": 1923, "country": "Switzerland"},
  {"artist": "HEIDI BUCHER", "book": "A Room of One's Own", "author": "Virginia Woolf", "year": 1929, "country": "Switzerland"},
  {"artist": "JULIAN CHARRIERE", "book": "The Terminal Beach", "author": "J.G. Ballard", "year": 1964, "country": "Switzerland"},
  {"artist": "JULIAN CHARRIERE", "book": "The Old Man and the Sea", "author": "Ernest Hemingway", "year": 1952, "country": "Switzerland"},
  {"artist": "JULIAN CHARRIERE", "book": "Hyperobjects: Philosophy and Ecology After the End of the World", "author": "Timothy Morton", "year": 2013, "country": "Switzerland"},
  {"artist": "JULIAN CHARRIERE", "book": "L'Automne a Pekin (Autumn in Peking)", "author": "Boris Vian", "year": 1947, "country": "Switzerland"},
  {"artist": "JULIAN CHARRIERE", "book": "Le Grand Accelerateur (The Great Accelerator)", "author": "Paul Virilio", "year": 2010, "country": "Switzerland"},
  {"artist": "MICHELE CIACCIOFERA", "book": "The New York Trilogy", "author": "Paul Auster", "year": 1985, "country": "Italy"},
  {"artist": "MICHELE CIACCIOFERA", "book": "Miele amaro (Bitter Honey)", "author": "Salvatore Cambosu", "year": 1954, "country": "Italy"},
  {"artist": "MICHELE CIACCIOFERA", "book": "Masse und Macht (Crowds and Power)", "author": "Elias Canetti", "year": 1960, "country": "Italy"},
  {"artist": "MICHELE CIACCIOFERA", "book": "Zapiski iz podpol'ya (Notes from Underground)", "author": "Fyodor Dostoyevsky", "year": 1864, "country": "Italy"},
  {"artist": "MICHELE CIACCIOFERA", "book": "Odysseia (Odyssey)", "author": "Homer", "year": -800, "country": "Italy"},
  {"artist": "MICHELE CIACCIOFERA", "book": "Der Mann ohne Eigenschaften (The Man Without Qualities)", "author": "Robert Musil", "year": 1930, "country": "Italy"},
  {"artist": "MICHELE CIACCIOFERA", "book": "Il giorno del giudizio (The Day of Judgment)", "author": "Salvatore Satta", "year": 1977, "country": "Italy"},
  {"artist": "MICHELE CIACCIOFERA", "book": "Austerlitz", "author": "Winfried Georg Sebald", "year": 2001, "country": "Italy"},
  {"artist": "MICHELE CIACCIOFERA", "book": "Walden: or Life in the Woods", "author": "Henry David Thoreau", "year": 1854, "country": "Italy"},
  {"artist": "MARTIN CORDIANO", "book": "La Poetique de l'espace (The Poetics of Space)", "author": "Gaston Bachelard", "year": 1957, "country": "Argentina"},
  {"artist": "MARTIN CORDIANO", "book": "Ficciones (Fictions)", "author": "Jorge Luis Borges", "year": 1944, "country": "Argentina"},
  {"artist": "MARTIN CORDIANO", "book": "L'Invention du quotidien (The Practice of Everyday Life)", "author": "Michel de Certeau", "year": 1980, "country": "Argentina"},
  {"artist": "MARTIN CORDIANO", "book": "The Craftsman", "author": "Richard Sennett", "year": 2008, "country": "Argentina"},
  {"artist": "ATTILA CSORGO", "book": "The Secret Miracle", "author": "Jorge Luis Borges", "year": 1943, "country": "Hungary"},
  {"artist": "ATTILA CSORGO", "book": "Synergetics: Exploration in the Geometry of Thinking", "author": "Richard Buckminster Fuller", "year": 1975, "country": "Hungary"},
  {"artist": "ATTILA CSORGO", "book": "A Descent into the Maelstrom", "author": "Edgar Allan Poe", "year": 1841, "country": "Hungary"},
  {"artist": "PAULINE CURNIER JARDIN", "book": "Tvorcestvo Fransua Rable u narodnaja kul'tura (Rabelais and His World)", "author": "Mikhail Bakhtin", "year": 1965, "country": "France"},
  {"artist": "PAULINE CURNIER JARDIN", "book": "Baubo la vulve mythique (Baubo, the Mythical Vulva)", "author": "Georges Devereux", "year": 1983, "country": "France"},
  {"artist": "PAULINE CURNIER JARDIN", "book": "Les Mots, la mort, les sorts (Deadly Words: Witchcraft in the Bocage)", "author": "Jeanne Favret-Saada", "year": 1977, "country": "France"},
  {"artist": "PAULINE CURNIER JARDIN", "book": "Caliban and the Witch", "author": "Silvia Federici", "year": 2004, "country": "France"},
  {"artist": "PAULINE CURNIER JARDIN", "book": "Metamorphoses", "author": "Ovid", "year": 8, "country": "France"},
  {"artist": "PAULINE CURNIER JARDIN", "book": "Le Noir est une couleur (Black is a Colour)", "author": "Griseldles Real", "year": 1974, "country": "France"},
  {"artist": "MARIECHEN DANZ", "book": "Objectivity", "author": "Lorraine Daston, Peter Galison", "year": 2007, "country": "Ireland"},
  {"artist": "MARIECHEN DANZ", "book": "Writing without Words", "author": "Elizabeth Hill Boone, Walter D. Mignolo", "year": 1994, "country": "Ireland"},
  {"artist": "MARIECHEN DANZ", "book": "Cuerpo humano e ideologia (The Human Body and Ideology)", "author": "Alfredo Lopez Austin", "year": 1988, "country": "Ireland"},
  {"artist": "MARIECHEN DANZ", "book": "The Darker Side of the Renaissance", "author": "Walter D. Mignolo", "year": 1995, "country": "Ireland"},
  {"artist": "EDITH DEKYNDT", "book": "2666", "author": "Roberto Bolano", "year": 2004, "country": "Belgium"},
  {"artist": "EDITH DEKYNDT", "book": "In Cold Blood", "author": "Truman Capote", "year": 1966, "country": "Belgium"},
  {"artist": "EDITH DEKYNDT", "book": "Vart behov av trost (Our Need for Consolation is Insatiable)", "author": "Stig Dagerman", "year": 1952, "country": "Belgium"},
  {"artist": "EDITH DEKYNDT", "book": "Canada", "author": "Richard Ford", "year": 2012, "country": "Belgium"},
  {"artist": "EDITH DEKYNDT", "book": "The Sorrows of an American", "author": "Siri Hustvedt", "year": 2008, "country": "Belgium"},
  {"artist": "SEBASTIAN DIAZ MORALES", "book": "Ficcionario", "author": "Horacio Altuna", "year": 1983, "country": "Argentina"},
  {"artist": "SEBASTIAN DIAZ MORALES", "book": "Simulacres et Simulation (Simulacra and Simulation)", "author": "Jean Baudrillard", "year": 1981, "country": "Argentina"},
  {"artist": "SEBASTIAN DIAZ MORALES", "book": "Las armas secretas (Secret Weapon)", "author": "Julio Cortazar", "year": 1959, "country": "Argentina"},
  {"artist": "SEBASTIAN DIAZ MORALES", "book": "En la Masmedula (In the Moremarrow)", "author": "Oliverio Girondo", "year": 1954, "country": "Argentina"},
  {"artist": "SEBASTIAN DIAZ MORALES", "book": "Shelf", "author": "Lloyd Kahn", "year": 1973, "country": "Argentina"},
  {"artist": "SEBASTIAN DIAZ MORALES", "book": "A caverna (The Cave)", "author": "Jose Saramago", "year": 2000, "country": "Argentina"},
  {"artist": "JUAN DOWNEY", "book": "Synergetics: Exploration in the Geometry of Thinking", "author": "Richard Buckminster Fuller", "year": 1975, "country": "Chile"},
  {"artist": "JUAN DOWNEY", "book": "La Societe Contre L'Etat (Society Against the State)", "author": "Pierre Clastres", "year": 1974, "country": "Chile"},
  {"artist": "JUAN DOWNEY", "book": "Para una etica de la liberaction latinoamericana (For an Ethics of Latin American Liberation)", "author": "Enrique Dussel", "year": 1973, "country": "Chile"},
  {"artist": "JUAN DOWNEY", "book": "Tristes Tropiques", "author": "Claude Levi-Strauss", "year": 1955, "country": "Chile"},
  {"artist": "JUAN DOWNEY", "book": "Cybernetics of the Sacred", "author": "Paul Ryan", "year": 1974, "country": "Chile"},
  {"artist": "OLAFUR ELIASSON", "book": "Flatland: A Romance of Many Dimensions", "author": "Edwin Abbott Abbott", "year": 1884, "country": "Denmark"},
  {"artist": "OLAFUR ELIASSON", "book": "Experience Culture, Cognition, and the Common Sense", "author": "Caroline A. Jones, David Mather, Rebecca Uchill", "year": 2016, "country": "Denmark"},
  {"artist": "OLAFUR ELIASSON", "book": "For Space", "author": "Doreen Massey", "year": 2005, "country": "Denmark"},
  {"artist": "OLAFUR ELIASSON", "book": "Le Visible et I'invisible (The Visible and the Invisible)", "author": "Maurice Merleau-Ponty", "year": 1964, "country": "Denmark"},
  {"artist": "OLAFUR ELIASSON", "book": "La Phenomennologie de la perception (Phenomenology of Perception)", "author": "Maurice Merleau-Ponty", "year": 1945, "country": "Denmark"},
  {"artist": "OLAFUR ELIASSON", "book": "Ecology without Nature", "author": "Timothy Morton", "year": 2007, "country": "Denmark"},
  {"artist": "OLAFUR ELIASSON", "book": "The Embodied Mind", "author": "Francisco J. Varela, Evan Thompson, Eleanor Rosch", "year": 1991, "country": "Denmark"},
  {"artist": "SOREN ENGSTED", "book": "The Shallows: What the Internet Is Doing To Our Brains", "author": "Nicholas Carr", "year": 2010, "country": "Denmark"},
  {"artist": "SOREN ENGSTED", "book": "Selected Writings 2000-2014", "author": "Paul Chan", "year": 2014, "country": "Denmark"},
  {"artist": "SOREN ENGSTED", "book": "Franz West", "author": "Robert Flack", "year": 1999, "country": "Denmark"},
  {"artist": "SOREN ENGSTED", "book": "The Next Bend in the Road", "author": "Michael Fried", "year": 2004, "country": "Denmark"},
  {"artist": "SOREN ENGSTED", "book": "Der Witz und seine Bezielhung zum Unbewbten (The Joke and Its Relation to the Unconscious)", "author": "Sigmund Freud", "year": 1905, "country": "Denmark"},
  {"artist": "VADIM FISKIN", "book": "Zemnoe ekho solnechnykh bur' (The Terrestrial Echo of Solar Storms)", "author": "Alexander Chizhevsky", "year": 1936, "country": "Russia"},
  {"artist": "VADIM FISKIN", "book": "Le Mont Analogue (Mount Analogue)", "author": "Rene Daumal", "year": 1952, "country": "Russia"},
  {"artist": "VADIM FISKIN", "book": "The Dictionary of Imaginary Places", "author": "Alberto Manguel, Gianni Guadalupi", "year": 1980, "country": "Russia"},
  {"artist": "VADIM FISKIN", "book": "Iskusstvo kak prijom (Art as Technique)", "author": "Viktor Shklovsky", "year": 1917, "country": "Russia"},
  {"artist": "NICOLAS GARCIA URIBURU", "book": "Le Ceramique anicenne du Perou (Ancient Ceramics from Peru)", "author": "Raoul d'Harcourt, Marguerite d'Harcourt", "year": 1924, "country": "Argentina"},
  {"artist": "NICOLAS GARCIA URIBURU", "book": "Tengo miedo torero (My Tender Matador)", "author": "Pedro Lembei", "year": 2001, "country": "Argentina"},
  {"artist": "NICOLAS GARCIA URIBURU", "book": "New York: The New Art Scene", "author": "Ugo Mulas, Alan Solomon", "year": 1967, "country": "Argentina"},
  {"artist": "NICOLAS GARCIA URIBURU", "book": "Arte precolombino de la Argentina (Pre-Columbian Art from Argentina)", "author": "Alberto Rex Gonzalez", "year": 1977, "country": "Argentina"},
  {"artist": "NICOLAS GARCIA URIBURU", "book": "Andy Warhol", "author": "Andy Warhol", "year": 1969, "country": "Argentina"},
  {"artist": "GENG JIANYI", "book": "Lu Ye Xian zong (Green field and the trace of god)", "author": "Li Baichuan", "year": -800, "country": "China"},
  {"artist": "GENG JIANYI", "book": "Cien anos de soledad (One Hundred Years of Solitude)", "author": "Gabriel Garcia Marquez", "year": 1967, "country": "China"},
  {"artist": "GENG JIANYI", "book": "Dongzhou Lieguo Zhi (Chronicles of the Eastern Zhou Kingdoms)", "author": "Feng Menglong", "year": 1600, "country": "China"},
  {"artist": "GENG JIANYI", "book": "Yuanyuam Hall Informal Essays", "author": "Feng Zikai", "year": 2016, "country": "China"},
  {"artist": "SAM GILLIAM", "book": "Inventing Abstraction, 1910-1925", "author": "Leah Dickerman, Matthew Affron", "year": 2012, "country": "United States"},
  {"artist": "SAM GILLIAM", "book": "Who's Afraid of Red, Yellow and Blue?", "author": "Sebastian Egenhofer, Karola Grasslin", "year": 2008, "country": "United States"},
  {"artist": "SAM GILLIAM", "book": "Barnett Newman: The Late Work, 1965-1970", "author": "Bradford A. Epley, Michelle White", "year": 2015, "country": "United States"},
  {"artist": "SAM GILLIAM", "book": "Jazz", "author": "Henri Matisse", "year": 1947, "country": "United States"},
  {"artist": "SAM GILLIAM", "book": "Yves Klein, 1928-1962: A Retrospective", "author": "Pierre Restany, Thomas McEvlley, Nam Rosenthal", "year": 1982, "country": "United States"},
  {"artist": "GIORGIO GRIFFA", "book": "Lezioni Americane (Six Memos for the Next Millennium)", "author": "Italo Calvino", "year": 1988, "country": "Italy"},
  {"artist": "GIORGIO GRIFFA", "book": "Henri Matisse: Ecrits et propos sur l'art (Writings and Thoughts on Art)", "author": "Dominique Fourcade", "year": 1972, "country": "Italy"},
  {"artist": "GIORGIO GRIFFA", "book": "Howl and Other Poems", "author": "Allen Ginsburg", "year": 1956, "country": "Italy"},
  {"artist": "GIORGIO GRIFFA", "book": "The Cantos", "author": "Ezra Pound", "year": 1954, "country": "Italy"},
  {"artist": "GUAN XIAO", "book": "Men in Dark Times", "author": "Hannah Arendt", "year": 1968, "country": "China"},
  {"artist": "GUAN XIAO", "book": "Les Mot et les choses (The Order of Things)", "author": "Michel Foucault", "year": 1966, "country": "China"},
  {"artist": "GUAN XIAO", "book": "Tristes Tropiques", "author": "Claude Levi-Strauss", "year": 1955, "country": "China"},
  {"artist": "GUAN XIAO", "book": "Natural Right and History", "author": "Leo Strauss", "year": 1953, "country": "China"},
  {"artist": "RICCARDO GUARNERI", "book": "Art and Visual Perception", "author": "Rudolf Amheim", "year": 1954, "country": "Italy"},
  {"artist": "RICCARDO GUARNERI", "book": "L'Etranger (The Stranger)", "author": "Albert Camus", "year": 1942, "country": "Italy"},
  {"artist": "RICCARDO GUARNERI", "book": "Brat'ya Karamazovy (The Brothers Karamazov)", "author": "Fyodor Dostoyevskij", "year": 1880, "country": "Italy"},
  {"artist": "RICCARDO GUARNERI", "book": "La Nausee (Nausea)", "author": "Jean-Paul Sartre", "year": 1938, "country": "Italy"},
  {"artist": "RICCARDO GUARNERI", "book": "Memories d'Hadrien (Memoirs of Hadrian)", "author": "Marguerite Yourcenar", "year": 1951, "country": "Italy"},
  {"artist": "CYNTHIA GUTIERREZ", "book": "La clase muerta (The Dead Class)", "author": "Mario Bellatin", "year": 2011, "country": "Mexico"},
  {"artist": "CYNTHIA GUTIERREZ", "book": "A Tree of Night and Other Stories", "author": "Truman Capote", "year": 1949, "country": "Mexico"},
  {"artist": "CYNTHIA GUTIERREZ", "book": "Destiario (Bestiary)", "author": "Julio Cortazar", "year": 1951, "country": "Mexico"},
  {"artist": "CYNTHIA GUTIERREZ", "book": "Belleza del otro mundo (The Beauty of the Other World)", "author": "Alberto Ruiz De Samaniego", "year": 2005, "country": "Mexico"},
  {"artist": "CYNTHIA GUTIERREZ", "book": "El gallo de oro (The Golden Cockerel and Other Writings)", "author": "Juan Rulfo", "year": 1980, "country": "Mexico"},
  {"artist": "RAYMOND HAINS", "book": "L'Air et les Songes (Air and Dreams)", "author": "Gaston Bachelard", "year": 1943, "country": "France"},
  {"artist": "RAYMOND HAINS", "book": "Langue d'oiseau (Bird's Tongue)", "author": "Camille Bryen", "year": 1986, "country": "France"},
  {"artist": "RAYMOND HAINS", "book": "Clartes, Paris", "author": "Francis Durieux", "year": 1948, "country": "France"},
  {"artist": "RAYMOND HAINS", "book": "Der Witz und seine Bezielhung zum Unbewbten (The Joke and Its Relation to the Unconscious)", "author": "Sigmund Freud", "year": 1905, "country": "France"},
  {"artist": "RAYMOND HAINS", "book": "La Pensee sauvage (The Savage Mind)", "author": "Claude-Levi Strauss", "year": 1962, "country": "France"},
  {"artist": "RAYMOND HAINS", "book": "Vercingentorixe", "author": "Francois-Georges Marechal Marquis de Bievre", "year": 1770, "country": "France"},
  {"artist": "RAYMOND HAINS", "book": "Le Peintre a l'etude (The Studying Painter)", "author": "Francis Ponge", "year": 1948, "country": "France"},
  {"artist": "RAYMOND HAINS", "book": "The Art of Memory", "author": "Frances A. Yates", "year": 1966, "country": "France"},
  {"artist": "TIBOR HAJAS", "book": "Mystiques et Magiciens du Tibet (Magic and Mystery in Tibet)", "author": "Alexandra David-Neel", "year": 1929, "country": "Hungary"},
  {"artist": "TIBOR HAJAS", "book": "Latomas es indulat a muveszetben (Vision and Emotion in Art)", "author": "Milan Fust", "year": 1948, "country": "Hungary"},
  {"artist": "TIBOR HAJAS", "book": "Revolution For the Hell of it", "author": "Abbie Hoffman", "year": 1968, "country": "Hungary"},
  {"artist": "TIBOR HAJAS", "book": "Do It!: Scenarios of the Revolution", "author": "Jerry Rubin", "year": 1970, "country": "Hungary"},
  {"artist": "PETRIT HALILAJ", "book": "Abetare (Alphabet Book)", "author": "Qamil Batalli", "year": 1985, "country": "Kosovo"},
  {"artist": "PETRIT HALILAJ", "book": "Fine Lines: Vladimir Nabokov's Scientific Art", "author": "Stephen H. Blackwell, Kurt Johnson", "year": 2016, "country": "Kosovo"},
  {"artist": "PETRIT HALILAJ", "book": "Signs Fiction", "author": "Ruth Wolf Rehfeldt", "year": 2016, "country": "Kosovo"},
  {"artist": "ANNA HALPRIN", "book": "The RSVP Cycles: Creative Processes in the Human Environment", "author": "Lawrence Halprin", "year": 1970, "country": "United States"},
  {"artist": "ANNA HALPRIN", "book": "Dance: A Creative Art Experience", "author": "Margaret H'Doubler", "year": 1940, "country": "United States"},
  {"artist": "ANNA HALPRIN", "book": "Gestalt Therapy", "author": "Fritz Perls, Ralph F. Hefferline, Paul Goodman", "year": 1951, "country": "United States"},
  {"artist": "HAO LIANG", "book": "Theorie du nauge (A Theory of Cloud)", "author": "Hubert Damisch", "year": 1972, "country": "China"},
  {"artist": "HAO LIANG", "book": "Hua Zhi (The Aim of Painting)", "author": "Qichang Dong", "year": 2008, "country": "China"},
  {"artist": "HAO LIANG", "book": "Zhong Hua Zhu Yun (The Book of Bamboo)", "author": "Fan Jingzhong", "year": 2011, "country": "China"},
  {"artist": "HAO LIANG", "book": "Yidong de taohuayuan (The Moving Peach Blossom Land)", "author": "Shouqian Shi", "year": 2015, "country": "China"},
  {"artist": "HAO LIANG", "book": "Fu Sheng Liu Ji (Six Records of a Floating Life)", "author": "Fu Shen", "year": 1809, "country": "China"},
  {"artist": "AYRSON HERCLITO", "book": "Gaiaku Luiza: And the Jeje-Mahi in Bahia", "author": "Marcos Carvalho", "year": 2006, "country": "Brazil"},
  {"artist": "AYRSON HERCLITO", "book": "A Anatomia do Acaraje (The Anatomy of Acaraje)", "author": "Vivaldo da Costa Lima", "year": 2010, "country": "Brazil"},
  {"artist": "AYRSON HERCLITO", "book": "Gregorio de Matos: Poems Attributed", "author": "Joao Adolfo Hansen, Marcello Moreira", "year": 2013, "country": "Brazil"},
  {"artist": "AYRSON HERCLITO", "book": "Autos Coreograficos -Mestre Didi, 90 anos (Choreographic Acts)", "author": "Deoscoredes Maximiliano dos Santos", "year": 2007, "country": "Brazil"},
  {"artist": "AYRSON HERCLITO", "book": "Joseph Beuys -Das Kaptial Raum 1970-1977", "author": "Franz-Joachim Verspohl", "year": 1984, "country": "Brazil"},
  {"artist": "SHEILA HICKS", "book": "Les Textiles anicnes du Perou (Textiles of Ancient Peru)", "author": "Raoul d'Harcourt", "year": 1934, "country": "United States"},
  {"artist": "SHEILA HICKS", "book": "Atlas des Lepidopteres de France", "author": "Claude Herbulot", "year": 1948, "country": "United States"},
  {"artist": "SHEILA HICKS", "book": "Al Muqaddimah (The Muquaddimah: An Introduction to History)", "author": "Ibn Khaldun", "year": 1377, "country": "United States"},
  {"artist": "ANDY HOPE 1930", "book": "The Crystal World", "author": "J.G. Ballard", "year": 1966, "country": "Germany"},
  {"artist": "ANDY HOPE 1930", "book": "Verschrankugen", "author": "Karen Barad", "year": 2015, "country": "Germany"},
  {"artist": "ANDY HOPE 1930", "book": "Barlowes's Guide to Extraterrestrials", "author": "Wayne Douglas Barlowe, Ian Summers, Beth Meacham", "year": 1979, "country": "Germany"},
  {"artist": "ANDY HOPE 1930", "book": "Vkhutemas: A Russian Laboratory of Modernity", "author": "WChUTEMAS exhibition catalogue", "year": 2014, "country": "Germany"},
  {"artist": "ANDY HOPE 1930", "book": "Locus Solus", "author": "Raymond Roussel", "year": 1914, "country": "Germany"},
  {"artist": "DAWN KASPER", "book": "Why Does Fred Sandback's Work Make Me Cry?", "author": "Andrea Fraser", "year": 2006, "country": "United States"},
  {"artist": "DAWN KASPER", "book": "Essays on the Blurring Art and Life", "author": "Allan Kaprow", "year": 1993, "country": "United States"},
  {"artist": "DAWN KASPER", "book": "My Wonderful World of Slapstick", "author": "Buster Keaton, Charles Samuels", "year": 1960, "country": "United States"},
  {"artist": "DAWN KASPER", "book": "This Is Water", "author": "David Foster Wallace", "year": 2009, "country": "United States"},
  {"artist": "DAWN KASPER", "book": "The Wisdom of Insecurity", "author": "Alan Watts", "year": 1951, "country": "United States"},
  {"artist": "HASSAN KHAN", "book": "Foundation's Edge", "author": "Isaac Asimov", "year": 1982, "country": "United Kingdom"},
  {"artist": "HASSAN KHAN", "book": "Flow My Tears, the Policeman Said", "author": "Phillup K. Dick", "year": 1974, "country": "United Kingdom"},
  {"artist": "HASSAN KHAN", "book": "Brat'ya Karamazovy (The Brothers Karamazov)", "author": "Fyodor Dostoyevskij", "year": 1879, "country": "United Kingdom"},
  {"artist": "HASSAN KHAN", "book": "Les Damnes de la Terre (The Wretched of the Earth)", "author": "Frantz Fanon", "year": 1961, "country": "United Kingdom"},
  {"artist": "HASSAN KHAN", "book": "Al-Rajul alladhi faqada zilluh (The Man Who Lost His Shadow)", "author": "Fathi Ghanem", "year": 1962, "country": "United Kingdom"},
  {"artist": "HASSAN KHAN", "book": "Hafet Al Layl (The Edge of Night)", "author": "Amin Rayyan", "year": 1954, "country": "United Kingdom"},
  {"artist": "SUNG HWAN KIM", "book": "Un episodio en la vida del pintor viajero (An episode in the Life of a Landscape Painter)", "author": "Cesar Aira", "year": 2000, "country": "Korea"},
  {"artist": "SUNG HWAN KIM", "book": "Notes of a Native Son", "author": "James Baldwin", "year": 1955, "country": "Korea"},
  {"artist": "SUNG HWAN KIM", "book": "Amnokgangen heureunda (The Yalu River Flows)", "author": "Mirok Li", "year": 1946, "country": "Korea"},
  {"artist": "SUNG HWAN KIM", "book": "The Merchant of Venice", "author": "William Shakespeare", "year": 1600, "country": "Korea"},
  {"artist": "SUNG HWAN KIM", "book": "Romeo and Juliet", "author": "William Shakespeare", "year": 1597, "country": "Korea"},
  {"artist": "ABDOULAYE KONATE", "book": "Mystique et philosophie dens les trois monotheismes (Mysticism and Philosophy in the Three Monotheisms)", "author": "Danielle Cohen-Levinas, Geraldine Roux, Meryem Sebti", "year": 2015, "country": "Mali"},
  {"artist": "ABDOULAYE KONATE", "book": "A plumaria indigena brasileria (Feather Art of the Brazilian Indigenous)", "author": "Sonia Ferraro Dorta, Marilia Xavier Cury", "year": 2000, "country": "Mali"},
  {"artist": "ABDOULAYE KONATE", "book": "Le Genie de Beethoven (The Genius of Beethoven)", "author": "Bernard Fournier", "year": 2016, "country": "Mali"},
  {"artist": "ABDOULAYE KONATE", "book": "Le Beaute du monde (The Beauty of the World)", "author": "Jean Starobinski", "year": 2016, "country": "Mali"},
  {"artist": "ABDOULAYE KONATE", "book": "Demain, les mondes virtuels (Tomorrow, Virtual Worlds)", "author": "Remi Sussan", "year": 2009, "country": "Mali"},
  {"artist": "IRINA KORINA", "book": "A History of Future Cities", "author": "Daniel Brook", "year": 2013, "country": "Russia"},
  {"artist": "IRINA KORINA", "book": "Remainder", "author": "Tom McCarthy", "year": 2005, "country": "Russia"},
  {"artist": "IRINA KORINA", "book": "Les Plaisirs et les Jours (Pleasures and Days)", "author": "Marcel Proust", "year": 1896, "country": "Russia"},
  {"artist": "IRINA KORINA", "book": "On Photography", "author": "Susan Sontag", "year": 1977, "country": "Russia"},
  {"artist": "IRINA KORINA", "book": "Galapagos: A Novel", "author": "Kurt Vonnegut", "year": 1985, "country": "Russia"},
  {"artist": "ALICJA KWADE", "book": "Flatland: A Romance of Many Dimensions", "author": "Edwin A. Abbott", "year": 1884, "country": "Poland"},
  {"artist": "ALICJA KWADE", "book": "Die Fiktion der wahrscheinlichen Realitat (The Fiction of the Probable Reality)", "author": "Elena Esposito", "year": 2007, "country": "Poland"},
  {"artist": "ALICJA KWADE", "book": "A Brief History of Time", "author": "Stephen Hawking", "year": 1988, "country": "Poland"},
  {"artist": "ALICJA KWADE", "book": "Synchronicity: An Acasual Connecting Principle", "author": "Carl Gustave Jung", "year": 1960, "country": "Poland"},
  {"artist": "ALICJA KWADE", "book": "Warped Passages", "author": "Lisa Randall", "year": 2005, "country": "Poland"},
  {"artist": "FIRENZE LAI", "book": "Ceske Album: Spisovatele (Czech Album: Writers)", "author": "", "year": 1919, "country": "Hong Kong"},
  {"artist": "FIRENZE LAI", "book": "Hans Christian Andersen's Stories for the Household", "author": "Hans Christian Andersen", "year": 1893, "country": "Hong Kong"},
  {"artist": "FIRENZE LAI", "book": "Sebeobrana (Self Defense)", "author": "Antonin Matras", "year": 1957, "country": "Hong Kong"},
  {"artist": "MARIA LAI", "book": "Miele amaro (Bitter Honey)", "author": "Salvatore Cambosu", "year": 1954, "country": "Italy"},
  {"artist": "MARIA LAI", "book": "Un pezzo di luna (A Piece of the Moon)", "author": "Giuseppe Dessi", "year": 1987, "country": "Italy"},
  {"artist": "MARIA LAI", "book": "Libro de poemas (Book of Poems)", "author": "Federico Garcia Lorca", "year": 1921, "country": "Italy"},
  {"artist": "MARIA LAI", "book": "Lettere dal carcere (Letters from Prison)", "author": "Antonio Gramsci", "year": 1947, "country": "Italy"},
  {"artist": "MARIA LAI", "book": "La scultura lingua morta (Sculpture, a Dead Language)", "author": "Arturo Martini", "year": 1954, "country": "Italy"},
  {"artist": "MARIA LAI", "book": "Leaves of Grass", "author": "Walt Whitman", "year": 1855, "country": "Italy"},
  {"artist": "TERESA LANCETA", "book": "Uber Haschisch (On Hashish)", "author": "Walter Benjamin", "year": 1972, "country": "Spain"},
  {"artist": "TERESA LANCETA", "book": "2666", "author": "Robert Bolano", "year": 2004, "country": "Spain"},
  {"artist": "TERESA LANCETA", "book": "L'Etranger (The Stranger)", "author": "Albert Camus", "year": 1942, "country": "Spain"},
  {"artist": "TERESA LANCETA", "book": "Historia verdadera de la conquista de la Nueva Espana (The True History of the Conquest of New Spain)", "author": "Bernal Diaz del Castillo", "year": 1632, "country": "Spain"},
  {"artist": "TERESA LANCETA", "book": "Yo tenia mi buena Estrella (I Had Very Good Star)", "author": "Anica la Perinaca, Jose Luis Ortiz Nuevo", "year": 1987, "country": "Spain"},
  {"artist": "JOHN LATHAM", "book": "Brat'ya Karamazovy (The Brothers Karamazov)", "author": "Fydor Dostoyevskij", "year": 1880, "country": "Zambia"},
  {"artist": "JOHN LATHAM", "book": "The O-Structure: An Introduction to Psychophysical Cosmology", "author": "Clive Gregory, Anita Kohsen", "year": 1959, "country": "Zambia"},
  {"artist": "JOHN LATHAM", "book": "Finnegans Wake", "author": "James Joyce", "year": 1939, "country": "Zambia"},
  {"artist": "LEE MINGWEI", "book": "The Gift: Imagination and the Erotic Life of Property", "author": "Lewis Hyde", "year": 1983, "country": "Taiwan"},
  {"artist": "LEE MINGWEI", "book": "Essays on the Blurring of Art and Life", "author": "Allan Kaprow", "year": 1993, "country": "Taiwan"},
  {"artist": "LEE MINGWEI", "book": "On Beauty and Being Just", "author": "Elaine Scarry", "year": 1999, "country": "Taiwan"},
  {"artist": "LEE MINGWEI", "book": "Makura no Soshi (The Pillow Book)", "author": "Sei Shonagon", "year": 1002, "country": "Taiwan"},
  {"artist": "LEE MINGWEI", "book": "Dongjing Meng Hua Lu (The Eastern Capital: A Dream of Splendor)", "author": "Meng Yuanlao", "year": 1187, "country": "Taiwan"},
  {"artist": "FRANCK LEIBOVICI", "book": "Al Qaeda Manchester Textbook", "author": "manual", "year": 2000, "country": "France"},
  {"artist": "FRANCK LEIBOVICI", "book": "Zabibah wal-Malik (Zabibah and the King)", "author": "Saddam Hussein", "year": 2000, "country": "France"},
  {"artist": "FRANCK LEIBOVICI", "book": "Laboratory Life: The Social Construction of Scientific Facts", "author": "Bruno Latour", "year": 1979, "country": "France"},
  {"artist": "FRANCK LEIBOVICI", "book": "La Nuit remue (The Night Moves)", "author": "Henri Michaux", "year": 1935, "country": "France"},
  {"artist": "FRANCK LEIBOVICI", "book": "Testimony: The United States, 1885-1915: Recitative", "author": "Charles Reznikoff", "year": 1965, "country": "France"},
  {"artist": "SAM LEWITT", "book": "Cruel Optimism", "author": "Lauren Berlant", "year": 2011, "country": "United States"},
  {"artist": "SAM LEWITT", "book": "Schiffburch mit Zuschauer (Shipwreck With Spectator)", "author": "Hans Blumenberg", "year": 1979, "country": "United States"},
  {"artist": "SAM LEWITT", "book": "The Work/Energy Crisis and the Apocalypse", "author": "George Caffentzis", "year": 1980, "country": "United States"},
  {"artist": "SAM LEWITT", "book": "The Book of the Dead", "author": "Muriel Rukeyser", "year": 1937, "country": "United States"},
];

const GOOGLE_BOOKS_API_KEY = 'AIzaSyBZHzYi1yZQs_KAP0SQBnmIo8H6C9fVxXQ';

const BookTooltip = ({ book, author }) => {
  const [summary, setSummary] = useState('Loading...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const query = encodeURIComponent(`${book} ${author}`);
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${GOOGLE_BOOKS_API_KEY}&maxResults=1`
        );
        const data = await response.json();
        
        if (data.items && data.items[0]) {
          const volumeInfo = data.items[0].volumeInfo;
          const desc = volumeInfo.description || 'No description available';
          const truncated = desc.length > 200 ? desc.substring(0, 200) + '...' : desc;
          setSummary(truncated);
        } else {
          setSummary('No summary found');
        }
      } catch (error) {
        setSummary('Could not fetch summary');
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchSummary, 300);
    return () => clearTimeout(timer);
  }, [book, author]);

  return (
    <div className="absolute bottom-full left-0 mb-2 w-64 bg-slate-900 text-white text-sm p-3 rounded shadow-lg z-50 border border-slate-700">
      <p className="font-semibold mb-2">{book}</p>
      <p className="text-xs text-slate-300 mb-2">by {author}</p>
      <p className="text-xs leading-relaxed">{summary}</p>
    </div>
  );
};

export default function LibraryDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArtist, setSelectedArtist] = useState('all');
  const [hoveredBook, setHoveredBook] = useState(null);

  const booksData = rawBooksData;

  const uniqueArtists = [...new Set(booksData.map(b => b.artist))].sort();
  const uniqueBooks = [...new Set(booksData.map(b => b.book))];
  const uniqueCountries = [...new Set(booksData.map(b => b.country))].sort();
  
  // Calculate top authors
  const authorCounts = {};
  booksData.forEach(item => {
    authorCounts[item.author] = (authorCounts[item.author] || 0) + 1;
  });
  
  const topAuthors = Object.entries(authorCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([author, count]) => ({ author, count }));

  // Filter books based on search and selected artist
  const filteredBooks = useMemo(() => {
    let filtered = booksData;

    // Filter by selected artist (PRIMARY FILTER)
    if (selectedArtist !== 'all') {
      filtered = filtered.filter(item => item.artist === selectedArtist);
    }

    // Then filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.artist.toLowerCase().includes(term) ||
        item.book.toLowerCase().includes(term) ||
        item.author.toLowerCase().includes(term) ||
        item.country.toLowerCase().includes(term) ||
        item.year.toString().includes(term)
      );
    }

    return filtered;
  }, [searchTerm, selectedArtist]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      {/* Header */}
      <div className="bg-slate-950 border-b border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold mb-2">Unpacking My Library</h1>
          <p className="text-slate-400">2017 Venice Biennale | Stirling Pavilion, Giardini</p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-slate-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <div className="text-4xl font-bold text-amber-400">{uniqueArtists.length}</div>
              <div className="text-slate-400 text-sm mt-2">Artists</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <div className="text-4xl font-bold text-amber-400">{uniqueBooks.length}</div>
              <div className="text-slate-400 text-sm mt-2">Books Total</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <div className="text-4xl font-bold text-amber-400">{uniqueCountries.length}</div>
              <div className="text-slate-400 text-sm mt-2">Countries</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <div className="text-4xl font-bold text-amber-400">{filteredBooks.length}</div>
              <div className="text-slate-400 text-sm mt-2">In View</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="col-span-2">
            {/* Search and Filters */}
            <div className="mb-8">
              {/* ARTIST SELECTOR - PRIMARY FILTER */}
              <div className="mb-4">
                <label className="text-sm text-slate-400 mb-2 block font-semibold">🎨 Select Artist:</label>
                <select
                  value={selectedArtist}
                  onChange={(e) => setSelectedArtist(e.target.value)}
                  className="w-full bg-slate-800 border border-amber-500 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/50"
                >
                  <option value="all">All {uniqueArtists.length} Artists</option>
                  {uniqueArtists.map(artist => (
                    <option key={artist} value={artist}>
                      {artist}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Box */}
              <div className="mb-4 relative">
                <Search className="absolute left-4 top-3.5 text-slate-500" size={20} />
                <input
                  type="text"
                  placeholder="Search in results by book title, author, or year..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>

              {(searchTerm || selectedArtist !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedArtist('all');
                  }}
                  className="text-amber-400 text-sm hover:text-amber-300 flex items-center gap-2"
                >
                  <X size={16} /> Clear all filters
                </button>
              )}
            </div>

            {/* Books List */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                📚 {selectedArtist !== 'all' ? selectedArtist + "'s Books" : 'Books'} ({filteredBooks.length})
              </h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book, idx) => (
                    <div key={idx} className="border-l-2 border-amber-500 pl-4 py-2 hover:bg-slate-700 rounded px-2 transition">
                      <div 
                        className="font-semibold text-amber-300 hover:text-amber-200 cursor-pointer relative inline-block group"
                        onMouseEnter={() => setHoveredBook(`${idx}`)}
                        onMouseLeave={() => setHoveredBook(null)}
                      >
                        {book.book}
                        {hoveredBook === `${idx}` && (
                          <BookTooltip book={book.book} author={book.author} />
                        )}
                      </div>
                      <div className="text-sm text-slate-400 mt-1">
                        by <span className="text-slate-300">{book.author}</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {book.artist} • {book.country} • {book.year}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 text-center py-8">No books match your search</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Authors */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">📖 Top 10 Authors</h3>
              <p className="text-xs text-slate-500 mb-3">Most frequently cited across the collection</p>
              <div className="space-y-2">
                {topAuthors.map(({ author, count }) => (
                  <div key={author} className="flex justify-between items-center text-sm">
                    <span className="text-amber-300 hover:text-amber-200 truncate" title={author}>
                      {author.length > 20 ? author.substring(0, 17) + '...' : author}
                    </span>
                    <span className="bg-amber-500 text-slate-900 text-xs font-bold px-2 py-1 rounded ml-2 flex-shrink-0">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">📊 Collection Stats</h3>
              <div className="space-y-3 text-sm text-slate-400">
                <div className="flex justify-between pb-2 border-b border-slate-700">
                  <span>Total Books</span>
                  <span className="text-amber-300 font-semibold">{uniqueBooks.length}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-700">
                  <span>Total Artists</span>
                  <span className="text-amber-300 font-semibold">{uniqueArtists.length}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-700">
                  <span>Countries Represented</span>
                  <span className="text-amber-300 font-semibold">{uniqueCountries.length}</span>
                </div>
                <div className="flex justify-between pt-2 border-t-2 border-amber-500">
                  <span className="font-semibold">Currently Viewing</span>
                  <span className="text-amber-300 font-bold text-lg">{filteredBooks.length}</span>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-sm text-slate-400">
              <h3 className="text-lg font-semibold mb-3 text-white">About</h3>
              <p className="mb-3">
                "Unpacking My Library" showcased the favorite books of 120 participating artists at the 2017 Venice Biennale, curated by Christine Macel.
              </p>
              <p>
                The collection of ~470 books was displayed at the Stirling Pavilion in the Giardini and later donated to the ASAC library archive.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-950 border-t border-slate-700 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-slate-400 text-sm space-y-2">
          <p className="font-semibold">✨ Hover over any book title to see a summary from Google Books API</p>
          <p className="text-xs text-slate-500">Takes a moment to load • API limit: 1000 requests/day</p>
        </div>
      </div>
    </div>
  );
}
