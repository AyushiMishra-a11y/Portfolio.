// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
});

// Hero typing animation
const heroText = document.querySelector('.hero-text');
const message = "💻 I build scalable, responsive, and secure web applications.";
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
const githubUsername = 'AyushiMishra';
const sortFilter = document.getElementById('sort-filter');
const searchBar = document.getElementById('search-bar');
let allRepos = [];

async function fetchRepos(){
  try{
    const res = await fetch(`https://api.github.com/users/${githubUsername}/repos`);
    allRepos = await res.json();
    applyFilters();
  } catch(err){
    projectsContainer.innerHTML = `<p>Unable to load projects</p>`;
    console.error(err);
  }
}

searchBar.addEventListener('input', applyFilters);
sortFilter.addEventListener('change', applyFilters);

function applyFilters(){
  let filtered = [...allRepos];
  const search = searchBar.value.toLowerCase();
  if(search) filtered = filtered.filter(r => r.name.toLowerCase().includes(search));
  if(sortFilter.value === 'stars') filtered.sort((a,b)=>b.stargazers_count-a.stargazers_count);
  else if(sortFilter.value === 'forks') filtered.sort((a,b)=>b.forks_count-a.forks_count);
  else filtered.sort((a,b)=>new Date(b.updated_at)-new Date(a.updated_at));
  renderRepos(filtered);
}

function renderRepos(repos){
  projectsContainer.innerHTML = '';
  repos.forEach(repo => {
    const card = document.createElement('div');
    card.className='card';
    const updated = new Date(repo.updated_at).toLocaleDateString();
    card.innerHTML=`
      <h3>${repo.name}</h3>
      <p>${repo.description || 'No description available'}</p>
      <p>⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count} | Updated: ${updated}</p>
      <a href="${repo.html_url}" target="_blank">View on GitHub</a>
    `;
    projectsContainer.appendChild(card);
  });
}

fetchRepos();
