// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
});

// Hero typing animation
const heroText = document.querySelector('.hero-text');
const message = "💻 I specialize in creating modern, user-focused digital experiences with clean code and stunning designs.";
let i = 0;
function typeHero() {
  if(i < message.length){
    heroText.textContent += message.charAt(i);
    i++;
    setTimeout(typeHero,50);
  }
}
typeHero();

// Dynamic GitHub Projects
const projectsContainer = document.getElementById('projects-cards');
const githubUsername = 'AyushiMishra-a11y';
const languageFilter = document.getElementById('language-filter');
const sortFilter = document.getElementById('sort-filter');
const searchBar = document.getElementById('search-bar');
let allRepos = [];

async function fetchRepos(){
  try{
    const res = await fetch(`https://api.github.com/users/${githubUsername}/repos`);
    allRepos = await res.json();
    populateLanguageFilter(allRepos);
    applyFilters();
  } catch(err){
    projectsContainer.innerHTML = `<p>Unable to load projects</p>`;
    console.error(err);
  }
}

function populateLanguageFilter(repos){
  const languages = new Set(repos.map(r=>r.language).filter(Boolean));
  languages.forEach(lang=>{
    const option = document.createElement('option');
    option.value=lang;
    option.textContent=lang;
    languageFilter.appendChild(option);
  });
}

function renderRepos(repos){
  projectsContainer.innerHTML='';
  repos.forEach(repo=>{
    const card = document.createElement('div');
    card.className='card';
    const updated = new Date(repo.updated_at).toLocaleDateString();
    card.innerHTML=`
      <h3>${repo.name}</h3>
      <p>${repo.description||'No description'}</p>
      <p>⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count} | Updated: ${updated}</p>
      <a href="${repo.html_url}" target="_blank">View on GitHub</a>
    `;
    projectsContainer.appendChild(card);
  });
}

// Filter & Sort
languageFilter.addEventListener('change', applyFilters);
sortFilter.addEventListener('change', applyFilters);
searchBar.addEventListener('input', applyFilters);

function applyFilters(){
  let filtered=[...allRepos];
  if(languageFilter.value!=='all') filtered = filtered.filter(r=>r.language===languageFilter.value);
  const search = searchBar.value.toLowerCase();
  if(search) filtered = filtered.filter(r=>r.name.toLowerCase().includes(search));
  if(sortFilter.value==='stars') filtered.sort((a,b)=>b.stargazers_count - a.stargazers_count);
  else if(sortFilter.value==='forks') filtered.sort((a,b)=>b.forks_count - a.forks_count);
  else filtered.sort((a,b)=>new Date(b.updated_at)-new Date(a.updated_at));
  renderRepos(filtered);
}

fetchRepos();
