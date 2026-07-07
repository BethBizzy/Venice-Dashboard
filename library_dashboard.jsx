import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, ExternalLink } from 'lucide-react';

// Combined dataset from both spreadsheets
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
  {"artist": "KARLA BLACK", "book": "The Writings of Melanie Klein", "author": "Melanie Klein", "year": 1975, "country": "United Kingdom"},
  {"artist": "KARLA BLACK", "book": "La mente del bambino (The Absorbent Mind)", "author": "Maria Montessori", "year": 1952, "country": "United Kingdom"},
  {"artist": "KARLA BLACK", "book": "La Nausee (Nausea)", "author": "Jean-Paul Sartre", "year": 1938, "country": "United Kingdom"},
  {"artist": "IRMA BLANK", "book": "Gehen (Walking: A Novella)", "author": "Thomas Bernhard", "year": 1971, "country": "Germany"},
  {"artist": "IRMA BLANK", "book": "Le Livre des questions (The Book of Questions)", "author": "Edmond Jabes", "year": 1968, "country": "Germany"},
  {"artist": "IRMA BLANK", "book": "How to Write", "author": "Gertrude Stein", "year": 1931, "country": "Germany"},
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
  {"artist": "OLAFUR ELIASSON", "book": "Flatland: A Romance of Many Dimensions", "author": "Edwin Abbott Abbott", "year": 1884, "country": "Denmark"},
  {"artist": "OLAFUR ELIASSON", "book": "For Space", "author": "Doreen Massey", "year": 2005, "country": "Denmark"},
  {"artist": "OLAFUR ELIASSON", "book": "Le Visible et I'invisible (The Visible and the Invisible)", "author": "Maurice Merleau-Ponty", "year": 1964, "country": "Denmark"},
  {"artist": "OLAFUR ELIASSON", "book": "La Phenomennologie de la perception (Phenomenology of Perception)", "author": "Maurice Merleau-Ponty", "year": 1945, "country": "Denmark"},
  {"artist": "OLAFUR ELIASSON", "book": "Ecology without Nature", "author": "Timothy Morton", "year": 2007, "country": "Denmark"},
  {"artist": "OLAFUR ELIASSON", "book": "The Embodied Mind", "author": "Francisco J. Varela, Evan Thompson, Eleanor Rosch", "year": 1991, "country": "Denmark"},
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
  const [filterType, setFilterType] = useState('all');
  const [hoveredBook, setHoveredBook] = useState(null);

  // Combine data with artist countries
  const artistCountries = {
    'BAS JAN ADER': 'The Netherlands',
    'ABDULLAH AL SAADI': 'United Arab Emirates',
    'NEVIN ALADAG': 'Turkey',
    'LEONOR ANTUNES': 'Portugal',
    'RASHEED ARAEEN': 'Pakistan',
    'SALVATORE ARANCIO': 'Italy',
    'JELILI ATIKU': 'Nigeria',
    'CHARLES ATLAS': 'United States',
    'KADER ATTIA': 'France',
    'MARCOS AVILA FORERO': 'France',
    'RINA BANERJEE': 'India',
    'MICHAEL BEUTLER': 'Germany',
    'KARLA BLACK': 'United Kingdom',
    'IRMA BLANK': 'Germany',
    'PAULO BRUSCKY': 'Brazil',
    'HEIDI BUCHER': 'Switzerland',
    'JULIAN CHARRIERE': 'Switzerland',
    'OLAFUR ELIASSON': 'Denmark',
  };

  const booksData = rawBooksData.map(item => ({
    ...item,
    country: artistCountries[item.artist] || item.country
  }));

  const uniqueArtists = [...new Set(booksData.map(b => b.artist))];
  const uniqueBooks = [...new Set(booksData.map(b => b.book))];
  
  // Calculate top authors
  const authorCounts = {};
  booksData.forEach(item => {
    authorCounts[item.author] = (authorCounts[item.author] || 0) + 1;
  });
  
  const topAuthors = Object.entries(authorCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([author, count]) => ({ author, count }));

  // Filter books based on search and filters
  const filteredBooks = useMemo(() => {
    let filtered = booksData;

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

    if (filterType !== 'all') {
      if (filterType.startsWith('author:')) {
        const author = filterType.replace('author:', '');
        filtered = filtered.filter(item => item.author === author);
      } else if (filterType.startsWith('country:')) {
        const country = filterType.replace('country:', '');
        filtered = filtered.filter(item => item.country === country);
      }
    }

    return filtered;
  }, [searchTerm, filterType]);

  const uniqueCountries = [...new Set(booksData.map(b => b.country))].sort();

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
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <div className="text-4xl font-bold text-amber-400">{uniqueArtists.length}</div>
              <div className="text-slate-400 text-sm mt-2">Artists</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <div className="text-4xl font-bold text-amber-400">{uniqueBooks.length}</div>
              <div className="text-slate-400 text-sm mt-2">Books</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <div className="text-4xl font-bold text-amber-400">{topAuthors.length}</div>
              <div className="text-slate-400 text-sm mt-2">Most Frequent Authors</div>
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
              <div className="mb-4 relative">
                <Search className="absolute left-4 top-3.5 text-slate-500" size={20} />
                <input
                  type="text"
                  placeholder="Search by artist, book, author, country, or year..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>

              {/* Filter by Author */}
              <div className="mb-4">
                <label className="text-sm text-slate-400 mb-2 block">Filter by Top Author:</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="all">All Authors</option>
                  {topAuthors.map(({ author }) => (
                    <option key={author} value={`author:${author}`}>
                      {author}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter by Country */}
              <div className="mb-4">
                <label className="text-sm text-slate-400 mb-2 block">Filter by Artist Country:</label>
                <select
                  value={filterType.startsWith('country:') ? filterType : 'all'}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="all">All Countries</option>
                  {uniqueCountries.map(country => (
                    <option key={country} value={`country:${country}`}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              {(searchTerm || filterType !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterType('all');
                  }}
                  className="text-amber-400 text-sm hover:text-amber-300 flex items-center gap-2"
                >
                  <X size={16} /> Clear filters
                </button>
              )}
            </div>

            {/* Books List */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                Books ({filteredBooks.length})
              </h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book, idx) => (
                    <div key={idx} className="border-l-2 border-amber-500 pl-4 py-2 hover:bg-slate-700 rounded px-2 transition relative">
                      <div className="font-semibold text-amber-300 hover:text-amber-200 cursor-pointer relative inline-block group"
                        onMouseEnter={() => setHoveredBook(`${idx}`)}
                        onMouseLeave={() => setHoveredBook(null)}>
                        {book.book}
                        {hoveredBook === `${idx}` && <BookTooltip book={book.book} author={book.author} />}
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
              <h3 className="text-lg font-semibold mb-4">Top 10 Authors</h3>
              <div className="space-y-3">
                {topAuthors.map(({ author, count }) => (
                  <div key={author} className="flex justify-between items-center">
                    <button
                      onClick={() => setFilterType(`author:${author}`)}
                      className="text-sm text-amber-300 hover:text-amber-200 text-left flex-1 truncate"
                    >
                      {author}
                    </button>
                    <span className="bg-amber-500 text-slate-900 text-xs font-bold px-2 py-1 rounded">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Collection Stats</h3>
              <div className="space-y-3 text-sm text-slate-400">
                <div className="flex justify-between">
                  <span>Total Books</span>
                  <span className="text-amber-300 font-semibold">{uniqueBooks.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Artists</span>
                  <span className="text-amber-300 font-semibold">{uniqueArtists.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Countries Represented</span>
                  <span className="text-amber-300 font-semibold">{uniqueCountries.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Books in View</span>
                  <span className="text-amber-300 font-semibold">{filteredBooks.length}</span>
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
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-slate-500 text-sm">
          <p>Hover over any book title to see a summary from Google Books API</p>
        </div>
      </div>
    </div>
  );
}