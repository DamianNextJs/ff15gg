# FF15GG

**A web app to track League of Legends summoner stats and match history**, inspired by platforms like u.gg

Live demo: [ff15gg.vercel.app](https://ff15gg.vercel.app)

## Features

- View League of Legends summoner profiles
- Show search suggestions while typing
- Show recent searches when clicking on the search bar
- Show a Not Found page if the searched summoner doesn't exist
- Region selection to search for summoners in different regions
- Persistent caching to reduce API requests
- Responsive design with Tailwind CSS
- Update button for fetching fresh data from Riot API (includes cooldown to prevent spam)
- Hover tooltip for summoner spells, runes and items
- Ability to load more than 20 matches if enough are stored in the database
- Filter matches with queue selector
- Queue filtering syncs with Recently Played With component
- Click Matches to view detailed information in a dropdown
  - **Post Game Tab**: shows information about all players in that match
  - **Performance Tab**: allows filtering all players in that match by various stats
  - **Item Build**: displays the detailed build of the profile's player

## Notes / Usage Tips

- ℹ️ **Hosting Info**: FF15GG is hosted on Vercel’s free tier, so the first request after a period of inactivity may take a few extra seconds while the server “warms up.” Subsequent requests are faster.
- Recent searches are stored in localStorage
- **Try it out without a Riot ID**: just type a letter into the search bar (e.g., 'm') and select any suggestion that appears

## Tech Stack

**Frontend**: Next.js (App Router), TypeScript, Tailwind CSS  
**Backend**: Next.js API routes & server actions
**Database**: MongoDB (persistent caching)  
**API**: Riot Games API
