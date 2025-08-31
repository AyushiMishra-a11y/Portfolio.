// Update time
function updateTime() {
    const timeElement = document.getElementById('time');
    if (timeElement) {
        const now = new Date();
        const time = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: false 
        });
        timeElement.textContent = time;
    }
}

// Fetch GitHub repositories
async function fetchGitHubRepos() {
    const container = document.getElementById('projects-container');
    
    try {
        const response = await fetch('https://api.github.com/users/AyushiMishra/repos?sort=updated&per_page=10');
        const repos = await response.json();
        
        if (repos.length === 0) {
            container.innerHTML = '<p>No repositories found. Create your first repo on GitHub!</p>';
            return;
        }
        
        const projectsHTML = repos.map(repo => `
            <div class="project-card">
                <h3>${repo.name}</h3>
                <p>${repo.description || 'No description available'}</p>
                <p><strong>Language:</strong> ${repo.language || 'Not specified'}</p>
                <p><strong>⭐ Stars:</strong> ${repo.stargazers_count} | <strong>�� Forks:</strong> ${repo.forks_count}</p>
                <a href="${repo.html_url}" target="_blank" class="project-link">
                    <i class="fab fa-github"></i> View on GitHub
                </a>
            </div>
        `).join('');
        
        container.innerHTML = projectsHTML;
        
    } catch (error) {
        console.error('Error fetching repos:', error);
        container.innerHTML = `
            <div class="project-card">
                <h3>Sample Project 1</h3>
                <p>MERN Notes Application with JWT authentication</p>
                <p><strong>Language:</strong> JavaScript</p>
                <a href="https://github.com/AyushiMishra" target="_blank" class="project-link">
                    <i class="fab fa-github"></i> View Profile
                </a>
            </div>
            <div class="project-card">
                <h3>Sample Project 2</h3>
                <p>E-commerce platform with PHP and MySQL</p>
                <p><strong>Language:</strong> PHP</p>
                <a href="https://github.com/AyushiMishra" target="_blank" class="project-link">
                    <i class="fab fa-github"></i> View Profile
                </a>
            </div>
        `;
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateTime();
    fetchGitHubRepos();
    
    // Update time every minute
    setInterval(updateTime, 60000);
});
