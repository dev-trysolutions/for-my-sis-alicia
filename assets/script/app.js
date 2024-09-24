// app.js
const contentDiv = document.getElementById('content');
const navLinks = document.querySelectorAll('nav a');

// Function to load content based on hash
async function loadContent(hash) {
    try {
        if (!hash) {
            hash = 'home'; // Set default hash to 'home' if none provided
        }

        const response = await fetch(`${hash}.html`);
        if (!response.ok) {
            throw new Error('Failed to fetch content');
        }
        const content = await response.text();
        contentDiv.innerHTML = content;
    } catch (error) {
        contentDiv.innerHTML = `<h2>Error Loading Page</h2><p>${error.message}</p>`;
    }
}

// Load initial content based on the hash in the URL
loadContent(location.hash.slice(1));

// Add event listeners to navigation links
navLinks.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const hash = link.getAttribute('href').slice(1);
        location.hash = hash;
        loadContent(hash);
    });
});

// Listen for hash changes and update content
window.addEventListener('hashchange', () => {
    loadContent(location.hash.slice(1));
});