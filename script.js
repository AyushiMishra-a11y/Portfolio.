// Configuration
const GITHUB_USERNAME = 'AyushiMishra';

// Global variables
let allProjects = [];
let displayedProjects = 6;
let currentFilter = 'all';

// Sample projects data
const sampleProjects = [
    {
        name: 'MERN-Notes-App',
        description: 'Full-stack notes management application with JWT authentication and CRUD operations using MongoDB, Express.js, React.js, and Node.js',
        language: 'JavaScript',
        stars: 8,
        forks: 3,
        url: `https://github.com/${GITHUB_USERNAME}/MERN-Notes-App`,
        demo: null
    },
    {
        name: 'E-Commerce-Platform',
        description: 'Secure e-commerce platform with modular PHP classes, role-based access control, and comprehensive product management',
        language: 'PHP',
        stars: 12,
        forks: 5,
        url: `https://github.com/${GITHUB_USERNAME}/E-Commerce-Platform`,
        demo: null
    },
    {
        name: 'NGO-Website',
        description: 'Campaign and donation management platform with secure workflows, admin dashboards, and volunteer coordination',
        language: 'JavaScript',
        stars: 6,
        forks: 2,
        url: `https://github.com/${GITHUB_USERNAME}/NGO-Website`,
        demo: 'https://utsavfoundation.org'
    },
    {
        name: 'School-Management-System',
        description: 'Multi-role school management platform with RBAC, student information system, and comprehensive reporting',
        language: 'PHP',
        stars: 9,
        forks: 4,
        url: `https://github.com/${GITHUB_USERNAME}/School-Management-System`,
        demo: null
    },
    {
        name: 'Portfolio-Website',
        description: 'Responsive portfolio website with dynamic GitHub integration, modern design, and interactive features',
        language: 'HTML',
        stars: 4,
        forks: 1,
        url: `https://github.com/${GITHUB_USERNAME}/Portfolio-Website`,
        demo: null
    },
    {
        name: 'React-Todo-App',
        description: 'Modern todo application built with React, featuring local storage, drag-and-drop, and priority management',
        language: 'JavaScript',
        stars: 7,
        forks: 3,
        url: `https://github.com/${GITHUB_USERNAME}/React-Todo-App`,
        demo: null
    }
];

// Language colors
const languageColors = {
    'JavaScript': '#f1e05a',
    'PHP': '#4f5d95',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Python': '#3572a5',
    'Java': '#b07219'
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateTime();
    setInterval(updateTime, 60000);
    loadGitHubData();
    setupEventListeners();
});

// Update current time
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    document.getElementById('currentTime').textContent = timeString;
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('menuBtn').addEventListener('click', toggleMenu);
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
            closeMenu();
        });
    });
    
    document.addEventListener('click', function(e) {
        const mobileNav = document.getElementById('mobileNav');
        const menuBtn = document.getElementById('menuBtn');
        
        if (!mobileNav.contains(e.target) && !menuBtn.contains(e.target)) {
            closeMenu();
        }
    });
}

// Load GitHub data
async function loadGitHubData() {
    try {
        await Promise.all([
            fetchGitHubProfile(),
            fetchGitHubRepos()
        ]);
    } catch (error) {
        console.log('Using sample data');
        loadSampleData();
    }
}

// Fetch GitHub profile
async function fetchGitHubProfile() {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        const profile = await response.json();
        
        if (profile.avatar_url) {
            document.getElementById('profileImg').src = profile.avatar_url;
        }
        
        animateCounter('repoCount', profile.public_repos || 10);
        animateCounter('followerCount', profile.followers || 5);
        animateCounter('followingCount', profile.following || 15);
    } catch (error) {
        animateCounter('repoCount', 10);
        animateCounter('followerCount', 5);
        animateCounter('followingCount', 15);
    }
}

// Fetch GitHub repositories
async function fetchGitHubRepos() {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`);
        const repos = await response.json();
        
        allProjects = repos.map(repo => ({
            name: repo.name,
            description: repo.description || 'No description available',
            language: repo.language || 'Unknown',
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            url: repo.html_url,
            demo: repo.homepage
        }));
        
        displayProjects();
    } catch (error) {
        loadSampleData();
    }
}

// Load sample data
function loadSampleData() {
    allProjects = sampleProjects;
    displayProjects();
}

// Display projects
function displayProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    const filteredProjects = getFilteredProjects();
    const projectsToShow = filteredProjects.slice(0, displayedProjects);
    
    projectsGrid.innerHTML = '';
    
    projectsToShow.forEach((project, index) => {
        setTimeout(() => {
            const projectCard = createProjectCard(project);
            projectsGrid.appendChild(projectCard);
        }, index * 100);
    });
    
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (filteredProjects.length > displayedProjects) {
        loadMoreBtn.style.display = 'block';
    } else {
        loadMoreBtn.style.display = 'none';
    }
}

// Create project card
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const languageColor = languageColors[project.language] || '#888888';
    
    card.innerHTML = `
        <div class="project-header">
            <div class="project-icon">
                <i class="fas ${getProjectIcon(project)}"></i>
            </div>
            <div class="project-title">
                <a href="${project.url}" target="_blank">${project.name}</a>
            </div>
        </div>
        <p class="project-description">${project.description}</p>
        <div class="project-meta">
            <div class="project-language">
                <span class="language-indicator" style="background-color: ${languageColor}"></span>
                <span>${project.language}</span>
            </div>
            <div class="project-stats">
                <div class="project-stat">
                    <i class="fas fa-star"></i>
                    <span>${project.stars}</span>
                </div>
                <div class="project-stat">
                    <i class="fas fa-code-branch"></i>
                    <span>${project.forks}</span>
                </div>
            </div>
        </div>
        <div class="project-actions">
            <a href="${project.url}" target="_blank" class="project-btn">
                <i class="fas fa-code"></i>
                View Code
            </a>
            ${project.demo ? `
                <a href="${project.demo}" target="_blank" class="project-btn">
                    <i class="fas fa-external-link-alt"></i>
                    Live Demo
                </a>
            ` : ''}
        </div>
    `;
    
    return card;
}

// Get project icon
function getProjectIcon(project) {
    const name = project.name.toLowerCase();
    const language = project.language.toLowerCase();
    
    if (name.includes('ecommerce') || name.includes('shop')) return 'fa-shopping-cart';
    if (name.includes('school') || name.includes('education')) return 'fa-graduation-cap';
    if (name.includes('ngo') || name.includes('charity')) return 'fa-heart';
    if (name.includes('todo') || name.includes('task')) return 'fa-tasks';
    if (name.includes('portfolio') || name.includes('website')) return 'fa-globe';
    if (language === 'javascript') return 'fa-js-square';
    if (language === 'php') return 'fa-php';
    if (language === 'python') return 'fa-python';
    
    return 'fa-folder-open';
}

// Get filtered projects
function getFilteredProjects() {
    if (currentFilter === 'all') {
        return allProjects;
    }
    
    return allProjects.filter(project => 
        project.language.toLowerCase().includes(currentFilter.toLowerCase())
    );
}

// Filter projects
function filterProjects(filter) {
    currentFilter = filter;
    displayedProjects = 6;
    
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    event.target.classList.add('active');
    displayProjects();
}

// Load more projects
function loadMoreProjects() {
    displayedProjects += 6;
    displayProjects();
}

// Animate counter
function animateCounter(elementId, target) {
    const element = document.getElementById(elementId);
    let current = 0;
    const increment = target / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 20);
}

// Navigation functions
function toggleMenu() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.toggle('active');
}

function closeMenu() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.remove('active');
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function goToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goBack() {
    window.history.back();
}

function openGitHub() {
    window.open(`https://github.com/${GITHUB_USERNAME}`, '_blank');
}

function downloadCV() {
    const cvContent = `
AYUSHI MISHRA
Full Stack Developer

Contact: ayushitmishra@gmail.com | +91 9792846609
Location: Gurugram, Haryana, India
LinkedIn: https://linkedin.com/in/ayushi-mishra-513953380
GitHub: https://github.com/${GITHUB_USERNAME}

OBJECTIVE:
Detail-oriented Software Developer with experience in full-stack web development, database management, and multi-tenant application design. Skilled in MERN stack, PHP, MySQL, HTML, CSS, JavaScript, and secure authentication.

EDUCATION:
• Master's in Computer Application - Gurukul Kangri (Deemed University), Haridwar | 2024
• Bachelor of Science - Dr. RMLA University, Ayodhya | 2019-2022

TECHNICAL SKILLS:
• Programming Languages: JavaScript, PHP, HTML5, CSS3
• Web Development: React.js, Node.js, Express.js, Bootstrap
• Databases: MongoDB, MySQL
• Tools: Git, GitHub, VS Code, Postman, JWT

EXPERIENCE:
Web Development Intern - Utsav Foundation, Gurugram | Jan 2024 – Jul 2024
• Developed full-stack NGO website using PHP, JavaScript, and MySQL
• Implemented RESTful APIs and secure authentication systems
• Deployed production-ready website via Hostinger
• Created admin dashboards and improved operational efficiency

CERTIFICATIONS:
• NPTEL – Introduction to Internet of Things, IIT Madras
• NPTEL – Privacy and Security in Online Social Media, IIT Madras
• NPTEL – Soft Skills Certification
    `;
    
    const blob = new Blob([cvContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Ayushi_Mishra_CV.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    alert('CV downloaded successfully!');
}

console.log('Portfolio loaded successfully! 🚀');
