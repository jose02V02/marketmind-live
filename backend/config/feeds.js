export const FEEDS = {
  ultime: [
    { name: 'ANSA', url: 'https://www.ansa.it/sito/notizie/topnews/topnews_rss.xml', category: 'ultime' },
    { name: 'Repubblica', url: 'https://www.repubblica.it/rss/homepage/rss2.0.xml', category: 'ultime' },
    { name: 'Corriere della Sera', url: 'https://www.corriere.it/rss/homepage.xml', category: 'ultime' },
    { name: 'TGCom24', url: 'https://www.tgcom24.mediaset.it/rss/cronaca.xml', category: 'ultime' },
  ],
  italia: [
    { name: 'ANSA Cronaca', url: 'https://www.ansa.it/sito/notizie/cronaca/cronaca_rss.xml', category: 'italia' },
    { name: 'Repubblica Cronaca', url: 'https://www.repubblica.it/rss/cronaca/rss2.0.xml', category: 'italia' },
    { name: 'Corriere Italia', url: 'https://www.corriere.it/rss/cronache.xml', category: 'italia' },
  ],
  mondo: [
    { name: 'ANSA Mondo', url: 'https://www.ansa.it/sito/notizie/mondo/mondo_rss.xml', category: 'mondo' },
    { name: 'Repubblica Esteri', url: 'https://www.repubblica.it/rss/esteri/rss2.0.xml', category: 'mondo' },
  ],
  economia: [
    { name: 'ANSA Economia', url: 'https://www.ansa.it/sito/notizie/economia/economia_rss.xml', category: 'economia' },
    { name: 'Il Sole 24 Ore', url: 'https://www.ilsole24ore.com/rss/italia--mondo.xml', category: 'economia' },
  ],
  tecnologia: [
    { name: 'ANSA Tech', url: 'https://www.ansa.it/sito/notizie/tecnologia/tecnologia_rss.xml', category: 'tecnologia' },
    { name: 'Wired Italia', url: 'https://www.wired.it/feed/rss', category: 'tecnologia' },
    { name: 'Tom\'s Hardware IT', url: 'https://www.tomshw.it/feed/', category: 'tecnologia' },
  ],
  sport: [
    { name: 'ANSA Sport', url: 'https://www.ansa.it/sito/notizie/sport/sport_rss.xml', category: 'sport' },
    { name: 'Gazzetta dello Sport', url: 'https://www.gazzetta.it/rss/home.xml', category: 'sport' },
    { name: 'Corriere Sport', url: 'https://www.corrieredellosport.it/rss', category: 'sport' },
  ],
}

export const ALL_FEEDS = Object.values(FEEDS).flat()

export const CATEGORIES = [
  { id: 'ultime', label: 'Ultime Ore', icon: '⚡' },
  { id: 'italia', label: 'Italia', icon: '🇮🇹' },
  { id: 'mondo', label: 'Mondo', icon: '🌍' },
  { id: 'economia', label: 'Economia', icon: '📈' },
  { id: 'tecnologia', label: 'Tecnologia', icon: '💻' },
  { id: 'sport', label: 'Sport', icon: '⚽' },
]
