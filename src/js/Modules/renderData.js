// renderData.js
import { generateImage } from './generateImage.js';

// Keep track of active category to prevent stale updates
let activeCategory = null;

export function renderData(items, category) {
  const container = document.getElementById('content');
  container.innerHTML = '';

  // Set the activeCategory to the current category
  activeCategory = category;

  // Show up to 12 items
  const subset = items.slice(0, 12);

  // forEach is fine since we won't await inside each iteration
  subset.forEach(item => {
    // If user switched category mid-loop, stop
    if (activeCategory !== category) return;

    // 1) Create a card right away (text + fallback image)
    const card = document.createElement('div');
    card.classList.add('card');

    let contentHTML = '';
    let prompt = '';

    // Build a DALL·E prompt depending on the category and item
    switch (category) {
      case 'films':
        prompt = `A cinematic poster for the Star Wars film "${item.title}", Episode ${item.episode_id}, realistic style`;
        contentHTML = `
          <h3>${item.title}</h3>
          <p>Episode: ${item.episode_id}</p>
          <p>Director: ${item.director}</p>
          <p>Release Date: ${item.release_date}</p>
        `;
        break;

      case 'people':
        prompt = `A detailed portrait of ${item.name} from Star Wars, cinematic, realistic style`;
        contentHTML = `
          <h3>${item.name}</h3>
          <p>Height: ${item.height}</p>
          <p>Mass: ${item.mass}</p>
          <p>Gender: ${item.gender}</p>
        `;
        break;

      case 'planets':
        prompt = `A scenic concept art of the Star Wars planet ${item.name}, environment style, realistic`;
        contentHTML = `
          <h3>${item.name}</h3>
          <p>Climate: ${item.climate}</p>
          <p>Population: ${item.population}</p>
          <p>Terrain: ${item.terrain}</p>
        `;
        break;

      case 'vehicles':
        prompt = `A realistic concept art of the Star Wars vehicle ${item.name}, cinematic style`;
        contentHTML = `
          <h3>${item.name}</h3>
          <p>Model: ${item.model}</p>
          <p>Manufacturer: ${item.manufacturer}</p>
          <p>Cost: ${item.cost_in_credits} credits</p>
        `;
        break;

      default:
        // If it's an unknown category, just show a message
        contentHTML = `<p>No data available for category: ${category}</p>`;
        break;
    }

    // Inject the initial card content
    card.innerHTML = contentHTML;
    container.appendChild(card);

    // Start generating the DALL·E image in the background
    generateImage(prompt).then(dallEUrl => {
      // If user switched categories by the time it finishes, do nothing
      if (activeCategory !== category) return;

      // If a valid DALL·E URL is returned, update the <img> src
      if (dallEUrl) {
        const imgEl = document.createElement('img');
        imgEl.src = dallEUrl;
        imgEl.alt = item.name || item.title || 'Star Wars Image';
        imgEl.style.width = '100%';
        imgEl.style.borderRadius = '8px';
        imgEl.style.marginBottom = '0.5rem';
        card.prepend(imgEl);
      }
    }).catch(err => {
      console.error('Error generating image:', err);
    });
  });
}
