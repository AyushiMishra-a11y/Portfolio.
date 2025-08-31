// Configuration
const GITHUB_USERNAME = 'AyushiMishra';
const GITHUB_PROFILE_URL = 'https://github.com/AyushiMishra-a11y';

// Global variables
let allProjects = [];
let displayedProjects = 6;

// Fetch GitHub repositories
async function fetchGitHubRepos() {
    try {
        console.log('Fetching GitHub repositories...');
        const response = await fetch(`https://api.github.com/users/${https://github.com/AyushiMishra-a11y}/repos?sort=updated&per_page=100`);
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const repos = await response.json();
        console.log('Fetched repos:', repos);
        
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
        
        console.log('Processed projects:', allProjects);
        
        // Hide loading and show projects
        hideLoading();
        displayProjects();
        
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        // Show error message
        showError('Failed to load projects. Please check your internet connection.');
        hideLoading();
    }
}

// Hide loading screen
function hideLoading() {
    const loadingSection = document.querySelector('.loading-section');
    if (loadingSection) {
        loadingSection.style.display = 'none';
    }
}

// Show error message
function showError(message) {
    const projectsContainer = document.getElementById('projectsContainer');
    if (projectsContainer) {
        projectsContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>${message}</p>
                <button onclick="fetchGitHubRepos()" class="retry-btn">Retry</button>
            </div>
        `;
    }
}

// Display projects
function displayProjects() {
    const projectsContainer = document.getElementById('projectsContainer');
    if (!projectsContainer) return;
    
    if (allProjects.length === 0) {
        projectsContainer.innerHTML = `
            <div class="no-projects">
                <i class="fas fa-folder-open"></i>
                <p>No projects found. Create your first repository on GitHub!</p>
            </div>
        `;
        return;
    }
    
    const projectsToShow = allProjects.slice(0, displayedProjects);
    
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

// Update load more button
function updateLoadMoreButton() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!loadMoreBtn) return;
    
    if (displayedProjects >= allProjects.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

// Button click handlers
function viewMyWork() {
    window.open(GITHUB_PROFILE_URL, '_blank');
}

function hireMe() {
    // Open email client
    window.open('mailto:ayushitmishra@gmail.com?subject=Hiring Inquiry - Portfolio', '_blank');
}

function viewCompletePortfolio() {
    window.open(https://github.com/AyushiMishra-a11y, '_blank');
}

function connectLinkedIn() {
    window.open('https://linkedin.com/in/ayushi-mishra-513953380', '_blank');
}

function connectGitHub() {
    window.open(https://github.com/AyushiMishra-a11y, '_blank');
}

function connectEmail() {
    window.open('mailto:ayushitmishra@gmail.com?subject=Portfolio Contact', '_blank');
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, initializing...');
    
    // Set current time
    updateTime();
    
    // Fetch GitHub repositories
    fetchGitHubRepos();
    
    // Add event listeners
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreProjects);
    }
    
    // Add button click listeners
    addButtonListeners();
    
    // Update time every minute
    setInterval(updateTime, 60000);
});

// Update time
function updateTime() {
    const timeElement = document.getElementById('currentTime');
    if (timeElement) {
        const now = new Date();
        timeElement.textContent = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
        });
    }
}

// Add button listeners
function addButtonListeners() {
    // View My Work button
    const viewWorkBtn = document.querySelector('.cta-button.primary');
    if (viewWorkBtn) {
        viewWorkBtn.addEventListener('click', viewMyWork);
    }
    
    // Hire Me button
    const hireBtn = document.querySelector('.cta-button.secondary');
    if (hireBtn) {
        hireBtn.addEventListener('click', hireMe);
    }
    
    // View Complete Portfolio button
    const portfolioBtn = document.querySelector('.portfolio-btn');
    if (portfolioBtn) {
        portfolioBtn.addEventListener('click', viewCompletePortfolio);
    }
    
    // Social media buttons
    const linkedinBtn = document.querySelector('.social-btn[data-platform="linkedin"]');
    if (linkedinBtn) {
        linkedinBtn.addEventListener('click', connectLinkedIn);
    }
    
    const githubBtn = document.querySelector('.social-btn[data-platform="github"]');
    if (githubBtn) {
        githubBtn.addEventListener('click', connectGitHub);
    }
    
    const emailBtn = document.querySelector('.social-btn[data-platform="email"]');
    if (emailBtn) {
        emailBtn.addEventListener('click', connectEmail);
    }
}
