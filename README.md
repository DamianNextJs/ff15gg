# FF15GG

**A web app to track League of Legends summoner stats and match history**, inspired by platforms like u.gg

Live demo: [ff15gg.vercel.app](https://ff15gg.vercel.app)

## Features

- View summoner profiles: rank, LP and match history
- Search suggestions when typing
- Recent searches with persistence across sessions
- Persistent caching to reduce Riot API requests
- Responsive design with Tailwind CSS
- Update Button for fetching fresh data straight from Riot API (includes a cooldown to prevent spamming and API rate limit abuse)
- Region selection integrated with search (recent searches respect region per summoner)
- Handles whitespace input gracefully: recent searches are still shown

## Notes / Usage Tips

- Recent searches are stored locally in the browser (using localStorage)
- Clicking on a suggestion adds it to recent searches and navigates to the correct region.
- Input trimming ensures searches with leading/trailing whitespace don't trigger API requests unnecessarily

## Tech Stack

**Frontend**: Next.js (App Router), TypeScript, Tailwind CSS  
**Backend**: Next.js API routes & server actions
**Database**: MongoDB (persistent caching)  
**API**: Riot Games API
