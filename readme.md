# Star Wars Data Viewer

A simple, responsive web app to explore Star Wars data (films, people, planets, vehicles) using the [SWAPI API](https://swapi.py4e.com/). Built with Vite and modular JavaScript.

## Features

- **Browse 4 Star Wars categories:** Films, People, Planets, Vehicles
- **Dynamic data:** All data is fetched live from SWAPI using the Fetch API and async/await
- **AI-generated images:** Every time a user views a category, new images are generated for each card using DALL·E, based on the item's properties (like name or title).  
  Note: Images may take a while to generate, so don't switch categories too quickly.

- **Single-page experience:** No page reloads, all content loads dynamically
- **Responsive:** Modular CSS with Flexbox layout
- **Error handling:** Error messages in console for failed requests

## Tech Stack

- [Vite](https://vitejs.dev/) (build tool)
- Vanilla JavaScript (modular, ES6+)
- [SWAPI](https://swapi.py4e.com/) (Star Wars API)
- [OpenAI DALL·E API](https://platform.openai.com/docs/guides/images) (for images)
- CSS

## Getting Started

1. **Install dependencies:**
   - npm install

2. **Set up your OpenAI API key:**
   - Create a file named `.env` in the root of the project.
   - Add with your actual key: (Or use API key Supplied in .env file)
     
     VITE_OPENAI_API_KEY=sk-...
     
3. **Run the development server:**
   - npm run dev
   - The app will be available at the local address shown in your terminal.


