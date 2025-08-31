// --------------------
// Theme Toggle
// --------------------
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

const lightTheme = {
  '--bg': '#f8f9fa',
  '--bg-2': '#ffffff',
  '--card': '#f1f3f6',
  '--text': '#1a202c',
  '--muted': '#4a5568',
  '--accent': '#3182ce'
};

const darkTheme = {
  '--bg': '#121212',
  '--bg-2': '#1e1e1e',
  '--card': '#2c2c2c',
  '--text': '#f0f0f0',
  '--muted': '#b0b0b0',
  '--accent': '#63b3ed'
};

function applyTheme(theme){
  Object.entries(theme).forEach(([k,v]) => root.style.setProperty(k,v));
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  if(document.body.classList.contains('dark-theme')){
    applyTheme(darkTheme);
  } else {
    applyTheme(lightTheme);
  }
});

// --------------------
// Animated Hero Text
// --------------------
const heroText = document.querySelector('.hero p');
const heroMessage = "Building scalable, modern, and user-friendly applications.";
let index = 0;
function typeHero() {
  if(index < heroMessage.length){
    heroText.textContent += heroMessage.charAt(index);
    index++;
    setTimeout(typeHero, 50);
  }
}
heroText.textContent = "";
typeHero();

// --------------------
// Fetch GitHub Repos with Filter, Sort & Search
// --------------------
const projectsContainer = document.getElementById('projects-cards');
const githubUsername = 'AyushiMishra-a11y';
const languageFilter = document.getElementById('language-filter');
const sortFilter = document.getElementById('sort-filter');
const searchBar = document.getElementById('search-bar');

let allRepos = [];

async function fetchRepos() {
  try {
    const response = await fetch(`https://api.github.com/users/${githubUsername}/repos`);
    allRepos = await response.json();

    populateLanguageFilter(allRepos);
    applyFilters();

  } catch (err) {
    projectsContainer.innerHTML = `<p>Unable to load projects at this time.</p>`;
    console.error(err);
  }
}

function populateLanguageFilter(repos) {
  const languages = new Set(repos.map(r => r.language).filter(Boolean));
  languages.forEach(lang => {
    const option = document.createElement('option');
    option.value = lang;
    option.textContent = lang;
    languageFilter.appendChild(option);
  });
}

function renderRepos(repos) {
  projectsContainer.innerHTML = '';
  repos.forEach(repo => {
    const card = document.createElement('div');
    card.className = 'card';
    const updatedDate = new Date(repo.updated_at).toLocaleDateString();
    card.innerHTML = `
      <h3>${repo.name}</h3>
      <p>${repo.description || 'No description provided.'}</p>
      <p class="repo-stats">⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count} | Updated: ${updatedDate}</p>
      <p><a href="${repo.html_url}" target="_blank">View on GitHub</a></p>
    `;
    projectsContainer.appendChild(card);
  });
}

// --------------------
// Apply Filters, Sort, Search
// --------------------
languageFilter.addEventListener('change', applyFilters);
sortFilter.addEventListener('change', applyFilters);
searchBar.addEventListener('input', applyFilters);

function applyFilters() {
  let filtered = [...allRepos];

  // Filter by language
  const lang = languageFilter.value;
  if(lang !== 'all') filtered = filtered.filter(r => r.language === lang);

  // Search by name
  const searchTerm = searchBar.value.toLowerCase();
  if(searchTerm) filtered = filtered.filter(r => r.name.toLowerCase().includes(searchTerm));

  // Sort
  const sort = sortFilter.value;
  if(sort === 'stars') filtered.sort((a,b) => b.stargazers_count - a.stargazers_count);
  else if(sort === 'forks') filtered.sort((a,b) => b.forks_count - a.forks_count);
  else filtered.sort((a,b) => new Date(b.updated_at) - new Date(a.updated_at));

  renderRepos(filtered);
}

// Initial fetch
fetchRepos();

// --------------------
// Scroll Animation
// --------------------
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
    }
  });
}, {threshold: 0.2});
sections.forEach(sec => observer.observe(sec));

