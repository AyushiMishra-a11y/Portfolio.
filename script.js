// Configuration
const GITHUB_USERNAME = 'AyushiMishra-a11y'; // Updated to your correct username
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

// Global variables
let allProjects = [];
let currentSection = 'home';

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Ayushi Mishra Portfolio loaded successfully!');
    
    // Initialize all functionality
    initializeNavigation();
    initializeAnimations();
    fetchGitHubProjects();
    initializeSkillStars();
    
    // Show home section by default
    showSection('home');
    
    // Check URL hash on load
    if (window.location.hash) {
        const section = window.location.hash.substring(1);
        showSection(section);
    }
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section') || this.getAttribute('href').substring(1);
            showSection(section);
            
            // Update active navigation
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Show different sections
function showSection(sectionName) {
    console.log(`Switching to ${sectionName} section...`);
    
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.style.display = 'block';
        targetSection.classList.add('active');
        currentSection = sectionName;
        
        // Add entrance animation
        targetSection.style.animation = 'none';
        targetSection.offsetHeight; // Trigger reflow
        targetSection.style.animation = 'fadeInUp 0.8s ease-out';
        
        console.log(`✅ Now showing ${sectionName} section!`);
        
        // Special handling for projects section
        if (sectionName === 'projects') {
            // Refresh projects when visiting this section
            setTimeout(() => {
                fetchGitHubProjects();
            }, 500);
        }
        
        // Special handling for resume section
        if (sectionName === 'resume') {
            // Add animation to resume elements
            animateResumeElements();
        }
        
        // Special handling for about section
        if (sectionName === 'about') {
            // Animate skills and certifications
            animateAboutElements();
        }
    }
    
    // Update URL hash
    window.location.hash = sectionName;
    
    // Update navigation active state
    updateNavigationActive(sectionName);
}

// Update navigation active state
function updateNavigationActive(activeSection) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${activeSection}` || 
            link.getAttribute('data-section') === activeSection) {
            link.classList.add('active');
        }
    });
}

// Initialize skill stars with animation
function initializeSkillStars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 100);
        }, index * 200);
    });
}

// Animate resume elements
function animateResumeElements() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const projectItems = document.querySelectorAll('.project-item');
    
    // Animate timeline items
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-30px)';
            item.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 100);
        }, index * 300);
    });
    
    // Animate project items
    projectItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });
}

// Animate about elements
function animateAboutElements() {
    const certItems = document.querySelectorAll('.cert-item');
    const infoCards = document.querySelectorAll('.info-card');
    
    // Animate certification items
    certItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(30px)';
            item.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 100);
        }, index * 200);
    });
    
    // Animate info cards
    infoCards.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100);
        }, index * 150);
    });
}

// Fetch GitHub projects dynamically
async function fetchGitHubProjects() {
    const projectsContainer = document.getElementById('projects-container');
    
    if (!projectsContainer) {
        console.error('Projects container not found!');
        return;
    }
    
    try {
        console.log('📡 Fetching projects from GitHub...');
        
        const response = await fetch(GITHUB_API_URL);
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const repos = await response.json();
        console.log(`🎉 Found ${repos.length} repositories on GitHub!`);
        
        // Transform GitHub repos to our project format
        allProjects = repos.map(repo => ({
            name: repo.name,
            description: repo.description || 'No description available',
            language: repo.language || 'Other',
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            url: repo.html_url,
            updated: new Date(repo.updated_at).toLocaleDateString(),
            topics: repo.topics || [],
            size: repo.size,
            openIssues: repo.open_issues_count
        }));
        
        // Sort by stars and update date
        allProjects.sort((a, b) => b.stars - a.stars || new Date(b.updated) - new Date(a.updated));
        
        // Display projects with animation
        displayProjectsWithAnimation();
        
    } catch (error) {
        console.error('❌ Error fetching GitHub projects:', error);
        showFallbackProjects();
    }
}

// Display projects with smooth animation
function displayProjectsWithAnimation() {
    const container = document.getElementById('projects-container');
    
    if (!container) return;
    
    // Clear loading
    container.innerHTML = '';
    
    if (allProjects.length === 0) {
        container.innerHTML = `
            <div class="no-projects">
                <div class="no-projects-icon">📁</div>
                <h3>No projects found</h3>
                <p>Create your first repository on GitHub to see it here!</p>
                <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" class="btn-github">
                    <i class="fab fa-github"></i>
                    Visit GitHub Profile
                </a>
            </div>
        `;
        return;
    }
    
    // Show projects one by one with animation
    allProjects.forEach((project, index) => {
        setTimeout(() => {
            const projectCard = createProjectCard(project);
            projectCard.style.opacity = '0';
            projectCard.style.transform = 'translateY(30px)';
            container.appendChild(projectCard);
            
            // Animate in
            setTimeout(() => {
                projectCard.style.transition = 'all 0.6s ease';
                projectCard.style.opacity = '1';
                projectCard.style.transform = 'translateY(0)';
            }, 100);
            
        }, index * 200);
    });
}

// Create individual project card
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    // Get language color
    const languageColor = getLanguageColor(project.language);
    
    card.innerHTML = `
        <div class="project-header">
            <h3 class="project-title">${project.name}</h3>
            <span class="project-language" style="background-color: ${languageColor}">
                ${project.language}
            </span>
        </div>
        
        <p class="project-description">${project.description}</p>
        
        ${project.topics.length > 0 ? `
            <div class="project-topics">
                ${project.topics.slice(0, 5).map(topic => 
                    `<span class="topic-tag">${topic}</span>`
                ).join('')}
            </div>
        ` : ''}
        
        <div class="project-stats">
            <span class="stat-item">
                <i class="fas fa-star"></i>
                ${project.stars}
            </span>
            <span class="stat-item">
                <i class="fas fa-code-branch"></i>
                ${project.forks}
            </span>
            <span class="stat-item">
                <i class="fas fa-clock"></i>
                ${project.updated}
            </span>
            <span class="stat-item">
                <i class="fas fa-code"></i>
                ${project.size} KB
            </span>
        </div>
        
        <a href="${project.url}" target="_blank" class="project-link">
            <i class="fab fa-github"></i>
            View on GitHub
        </a>
    `;
    
    // Add hover effects
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
    
    return card;
}

// Get language color for GitHub
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
        'Vue': '#41b883',
        'React': '#61dafb',
        'Node.js': '#339933',
        'Other': '#6c757d'
    };
    return colors[language] || colors['Other'];
}

// Show fallback projects if GitHub fails
function showFallbackProjects() {
    const container = document.getElementById('projects-container');
    
    if (!container) return;
    
    const fallbackProjects = [
        {
            name: 'MERN Notes Project',
            description: 'Full-stack notes management application with JWT authentication and CRUD functionality',
            language: 'JavaScript',
            stars: 5,
            forks: 2,
            url: 'https://github.com/AyushiMishra-a11y',
            updated: '2024-01-15',
            topics: ['MERN', 'JWT', 'Authentication'],
            size: 150,
            openIssues: 0
        },
        {
            name: 'E-Commerce Web App',
            description: 'Secure e-commerce platform with PHP, MySQL, and role-based access control',
            language: 'PHP',
            stars: 8,
            forks: 3,
            url: 'https://github.com/AyushiMishra-a11y',
            updated: '2024-01-10',
            topics: ['PHP', 'MySQL', 'E-commerce'],
            size: 200,
            openIssues: 1
        },
        {
            name: 'Utsav Foundation Website',
            description: 'NGO campaign and donation management platform with secure authentication',
            language: 'PHP',
            stars: 12,
            forks: 5,
            url: 'https://github.com/AyushiMishra-a11y',
            updated: '2024-01-05',
            topics: ['PHP', 'NGO', 'Donations'],
            size: 180,
            openIssues: 0
        }
    ];
    
    allProjects = fallbackProjects;
    displayProjectsWithAnimation();
}

// Initialize animations
function initializeAnimations() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.skill-item, .timeline-item, .contact-card, .cert-item, .info-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// Auto-refresh projects every 30 minutes
setInterval(() => {
    if (currentSection === 'projects') {
        console.log('🔄 Auto-refreshing projects...');
        fetchGitHubProjects();
    }
}, 30 * 60 * 1000);

// Handle window hash changes
window.addEventListener('hashchange', function() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        showSection(hash);
        
        // Update navigation
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${hash}`) {
                link.classList.add('active');
            }
        });
    }
});

// Add some fun interactive features
document.addEventListener('click', function(e) {
    // Create ripple effect on buttons
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
        createRippleEffect(e);
    }
    
    // Create ripple effect on links
    if (e.target.tagName === 'A' || e.target.closest('a')) {
        createRippleEffect(e);
    }
});

// Create ripple effect
function createRippleEffect(event) {
    const element = event.target.tagName === 'BUTTON' ? event.target : 
                   event.target.tagName === 'A' ? event.target : 
                   event.target.closest('button') || event.target.closest('a');
    
    if (!element) return;
    
    const ripple = document.createElement('span');
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    button, a {
        position: relative;
        overflow: hidden;
    }
    
    .no-projects {
        text-align: center;
        padding: 3rem;
    }
    
    .no-projects-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
        animation: bounce 2s infinite;
    }
    
    .no-projects h3 {
        color: #00d4ff;
        margin-bottom: 1rem;
    }
    
    .no-projects p {
        color: #cccccc;
        margin-bottom: 2rem;
    }
`;
document.head.appendChild(style);

// Console welcome message
console.log(`
🚀 Welcome to Ayushi Mishra's Portfolio!
✨ Features:
   - Dynamic GitHub integration (${GITHUB_USERNAME})
   - Smooth animations and transitions
   - Interactive navigation
   - Auto-updating projects
   - Responsive design
   - Enhanced sections with certifications
   - Resume download functionality
   
📧 Contact: ayushitmishra@gmail.com
�� LinkedIn: linkedin.com/in/ayushi-mishra-513953380
�� GitHub: github.com/${GITHUB_USERNAME}
🏆 NPTEL Certifications included
⭐ Skills with star ratings
📋 Complete project experience
`);
