// sidebarHandlers.js

import { fetchStarWarsData } from './fetchdata.js';
import { renderData } from './renderData.js';

export function setupSidebar() {
  const buttons = document.querySelectorAll('.sidebar-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const category = e.target.getAttribute('data-category');
      const contentArea = document.getElementById('content');

      // Clear current content / show a loading message
      contentArea.innerHTML = '<p>Loading...</p>';

      try {
        // Fetch from SWAPI
        const data = await fetchStarWarsData(category);
        // Render the result
        renderData(data, category);
      } catch (error) {
        contentArea.innerHTML = `<p>Error: ${error.message}</p>`;
      }
    });
  });
}
