# FF15GG

**A web app to track League of Legends summoner stats and match history**, inspired by platforms like u.gg

Live demo: [ff15gg.vercel.app](https://ff15gg.vercel.app)

## Features

- View summoner profiles: rank, LP and match history
- Search suggestions when typing
- Handles whitespace input gracefully: recent searches are still shown
- Recent searches with persistence across sessions
- Region selection integrated with search (recent searches respect region per summoner)
- Persistent caching to reduce Riot API requests
- Responsive design with Tailwind CSS
- Update Button for fetching fresh data straight from Riot API (includes a cooldown to prevent spamming and API rate limit abuse)
- Load More Matches: View more than the last 20 matches if available in the database (additional matches are fetched and stored olny when the Update Button is pressed)
- Detailed Match Loadouts: Hover over items, summoner spells, and runes to view tooltips with full details. Modular component structure ensures clean and maintainable code.
- Filter matches by queue using Queue Selector in Match History (syncs with Recently Played With)

## Notes / Usage Tips

- Recent searches are stored locally in the browser (using localStorage)
- Clicking on a suggestion adds it to recent searches and navigates to the correct region.
- Input trimming ensures searches with leading/trailing whitespace don't trigger API requests unnecessarily
- ℹ️ **Hosting Info**: FF15GG is hosted on Vercel’s free tier, so the first request after a period of inactivity may take a few extra seconds while the server “warms up.” Subsequent requests are faster.
- Versioned localStorage ensures old data strucutres don't break the app after updates

## Tech Stack

**Frontend**: Next.js (App Router), TypeScript, Tailwind CSS  
**Backend**: Next.js API routes & server actions
**Database**: MongoDB (persistent caching)  
**API**: Riot Games API
