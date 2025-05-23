// generateImage.js

export async function generateImage(promptText) {
    // Use the Vite environment variable
    const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
  
    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          prompt: promptText,  // e.g. "A portrait of Luke Skywalker, Star Wars style"
          n: 1,                // number of images to generate
          size: '256x256'      // or 512x512, etc.
        })
      });
  
      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }
  
      const data = await response.json();
      // data usually looks like: { created: 123456789, data: [{ url: "https://..." }] }
      return data.data[0].url; // return the first generated image URL
    } catch (error) {
      console.error('Error generating image:', error);
      // You could return a fallback image or throw the error up
      return null;
    }
  }
  