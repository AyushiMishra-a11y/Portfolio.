// Configuration
const GITHUB_USERNAME = 'AyushiMishra';

// Global variables
let allProjects = [];
let displayedProjects = 6;
let currentFilter = 'all';

// Fetch GitHub repositories
async function fetchGitHubRepos() {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }
        
        const repos = await response.json();
        
        // Transform GitHub repos to our project format
        allProjects = repos.map(repo => ({
            name: repo.name,
            description: repo.description || 'No description available',
            language: repo.language || 'Other',
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            url: repo.html_url,
            updated: new Date(repo.updated_at).toLocaleDateString(),
            topics: repo.topics || []
        }));
        
        // Display projects
        displayProjects();
        
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        // Fallback to sample projects if GitHub API fails
        loadSampleProjects();
    }
}

// Load sample projects as fallback
function loadSampleProjects() {
    allProjects = [
        {
            name: 'MERN-Notes-App',
            description: 'Full-stack notes management application with JWT authentication',
            language: 'JavaScript',
            stars: 5,
            forks: 2,
            url: '#',
            updated: '2024-01-15',
            topics: ['MERN', 'JWT', 'Authentication']
        },
        {
            name: 'E-Commerce-Platform',
            description: 'Secure e-commerce platform with PHP and MySQL',
            language: 'PHP',
            stars: 8,
            forks: 3,
            url: '#',
            updated: '2024-01-10',
            topics: ['PHP', 'MySQL', 'E-commerce']
        },
        {
            name: 'Utsav-Foundation-Website',
            description: 'NGO campaign and donation management platform',
            language: 'PHP',
            stars: 12,
            forks: 5,
            url: '#',
            updated: '2024-01-05',
            topics: ['PHP', 'NGO', 'Donations']
        }
    ];
    displayProjects();
}

// Display projects
function displayProjects() {
    const projectsContainer = document.getElementById('projectsContainer');
    if (!projectsContainer) return;
    
    const filteredProjects = filterProjects();
    const projectsToShow = filteredProjects.slice(0, displayedProjects);
    
    projectsContainer.innerHTML = projectsToShow.map(project => `
        <div class="project-card">
            <div class="project-header">
                <h3>${project.name}</h3>
                <span class="project-language" style="background-color: ${getLanguageColor(project.language)}">
                    ${project.language}
                </span>
            </div>
            <p class="project-description">${project.description}</p>
            <div class="project-topics">
                ${project.topics.map(topic => `<span class="topic-tag">${topic}</span>`).join('')}
            </div>
            <div class="project-stats">
                <span><i class="fas fa-star"></i> ${project.stars}</span>
                <span><i class="fas fa-code-branch"></i> ${project.forks}</span>
                <span><i class="fas fa-clock"></i> ${project.updated}</span>
            </div>
            <a href="${project.url}" target="_blank" class="project-link">
                <i class="fab fa-github"></i> View Project
            </a>
        </div>
    `).join('');
    
    updateLoadMoreButton();
}

// Filter projects
function filterProjects() {
    if (currentFilter === 'all') return allProjects;
    return allProjects.filter(project => 
        project.language.toLowerCase() === currentFilter.toLowerCase()
    );
}

// Get language color
function getLanguageColor(language) {
    const colors = {
        'JavaScript': '#f1e05a',
        'TypeScript': '#3178c6',
        'Python': '#3572a5',
        'Java': '#b07219',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'PHP': '#4f5d95',
        'C': '#555555',
        'C++': '#f34b7d',
        'Go': '#00add8',
        'Rust': '#dea584',
        'Other': '#6c757d'
    };
    return colors[language] || colors['Other'];
}

// Load more projects
function loadMoreProjects() {
    displayedProjects += 6;
    displayProjects();
}

// Filter by language
function filterByLanguage(language) {
    currentFilter = language;
    displayedProjects = 6;
    displayProjects();
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Update load more button
function updateLoadMoreButton() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!loadMoreBtn) return;
    
    const filteredProjects = filterProjects();
    if (displayedProjects >= filteredProjects.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Set current time
    const timeElement = document.getElementById('currentTime');
    if (timeElement) {
        const now = new Date();
        timeElement.textContent = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
        });
    }
    
    // Fetch GitHub repositories
    fetchGitHubRepos();
    
    // Add event listeners
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreProjects);
    }
    
    // Add filter button listeners
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => filterByLanguage(e.target.dataset.language));
    });
});

// Update time every minute
setInterval(() => {
    const timeElement = document.getElementById('currentTime');
    if (timeElement) {
        const now = new Date();
        timeElement.textContent = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
        });
    }
}, 60000);
