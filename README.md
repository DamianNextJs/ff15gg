# FF15GG

**A web app to track League of Legends summoner stats and match history**, inspired by platforms like u.gg

Live demo: [ff15gg.vercel.app](https://ff15gg.vercel.app)

## Features

### General

- View League of Legends summoner profiles
- Show a Not Found page if the searched summoner doesn't exist
- Persistent caching to reduce API requests
- Responsive design with Tailwind CSS
- Hover tooltip for summoner spells, runes and items
- Show search bar in navbar on desktop while navigating away from "home"
- Sidebar drawer with user card showing logged-in status
- User card provides a menu with several links
- Sidebar drawer includes a search bar for mobile
- Login functionality with Google OAuth
- Privacy Policy Page
- Terms of Service Page

---

### Landing Page

- Search for League of Legends summoners in different regions
- Show search suggestions while typing
- Show recent searches when clicking on the search bar

---

### Profile Page

- **Overview Page**
  - Update button for fetching fresh data from Riot API (includes cooldown to prevent spam)
  - Filter champion stats by queue
  - Show recently played with players including links to their profiles
  - **Match History**
    - View recent matches
    - Show information about recent matches in match history header
    - Ability to load more than 20 matches if enough are stored in the database
    - Filter matches using the queue selector or by searching for champions played or participants played with
    - Queue filtering syncs with Recently Played With component
    - Click Matches to view detailed information in a dropdown:
    - **Post Game Tab**: shows information about all players in that match
    - **Performance Tab**: allows filtering all players in that match by various stats
    - **Item Build**: displays the detailed build of the profile's player
- **Champion Stats Page**
  - View champion stats of the profile's player
  - Shows stats based on all matches of that player stored in the database
  - Filter by Queue, Role or Champion
  - Sort stats ascending or descending
- **Live Game Page**
  - Show information about the live game if the player is currently in a match

---

### Profile Settings Page

- Logged-in users have access to the settings page, which contains three sections:
  - **Profile Settings**: Allows users who are logged in and have bound their Summoner Account to change their appearance.
  - **Bind Summoner Account**: Allows logged-in users to bind a summoner account to their user profile.
  - **Account Settings**: Allows users to delete their account, permanently removing all their data from the database.

## Notes / Usage Tips

- ℹ️ **Hosting Info**: FF15GG is hosted on Vercel’s free tier, so the first request after a period of inactivity may take a few extra seconds while the server “warms up.” Subsequent requests are faster.
- Recent searches are stored in localStorage
- **Try it out without a Riot ID**: just type a letter into the search bar (e.g., 'm') and select any suggestion that appears

---

## Tech Stack

**Frontend**: Next.js (App Router), TypeScript, Tailwind CSS  
**Backend**: Next.js API routes & server actions
**Auth**: Next-Auth.js (Google OAuth)
**Database**: MongoDB (persistent caching)  
**API**: Riot Games API
