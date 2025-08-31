// Configuration
const CONFIG = {
    GITHUB_USERNAME: 'AyushiMishra', // Replace with your GitHub username
    API_BASE: 'https://api.github.com',
    ITEMS_PER_PAGE: 6
};

// Application State
const AppState = {
    repositories: [],
    displayedCount: CONFIG.ITEMS_PER_PAGE,
    currentFilter: 'all',
    isLoading: false
};

// Language color mapping
const LANGUAGE_COLORS = {
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
    'Swift': '#fa7343'
};

// DOM Elements
const Elements = {
    loadingScreen: document.getElementById('loadingScreen'),
    currentTime: document.getElementById('currentTime'),
    menuBtn: document.getElementById('menuBtn'),
    mobileNav: document.getElementById('mobileNav'),
    profileImg: document.getElementById('profileImg'),
    repoCount: document.getElementById('repoCount'),
    followerCount: document.getElementById('followerCount'),
    followingCount: document.getElementById('followingCount'),
    gitName: document.getElementById('gitName'),
    gitBio: document.getElementById('gitBio'),
    projectsGrid: document.getElementById('projectsGrid'),
    loadMoreBtn: document.getElementById('loadMoreBtn'),
    filterTabs: document.querySelectorAll('.filter-tab')
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

async function initializeApp() {
    showLoadingScreen();
    setupEventListeners();
    updateCurrentTime();
    setInterval(updateCurrentTime, 60000);
    
    try {
        await loadGitHubData();
        showSuccessMessage();
    } catch (error) {
        console.warn('GitHub API failed, using fallback data:', error);
        loadFallbackData();
    } finally {
        hideLoadingScreen();
    }
}

// Loading Screen Management
function showLoadingScreen() {
    Elements.loadingScreen.style.display = 'flex';
}

function hideLoadingScreen() {
    setTimeout(() => {
        Elements.loadingScreen.style.opacity = '0';
        setTimeout(() => {
            Elements.loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
}

// Time Management
function updateCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    Elements.currentTime.textContent = timeString;
}

// Event Listeners Setup
function setupEventListeners() {
    // Menu toggle
    Elements.menuBtn.addEventListener('click', toggleMobileMenu);
    
    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            navigateToSection(targetId);
            closeMobileMenu();
        });
    });
    
    // Filter tabs
    Elements.filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const filter = tab.getAttribute('data-filter');
            setActiveFilter(tab);
            filterProjects(filter);
        });
    });
    
    // Load more button
    Elements.loadMoreBtn.addEventListener('click', loadMoreProjects);
    
    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
        if (!Elements.mobileNav.contains(e.target) && !Elements.menuBtn.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
}

// Navigation Functions
function toggleMobileMenu() {
    Elements.mobileNav.classList.toggle('active');
}

function closeMobileMenu() {
    Elements.mobileNav.classList.remove('active');
}

function navigateToSection(sectionId) {
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

// GitHub Data Loading
async function loadGitHubData() {
    const [profileData, reposData] = await Promise.all([
        fetchGitHubProfile(),
        fetchGitHubRepositories()
    ]);
    
    updateProfileDisplay(profileData);
    updateRepositoriesDisplay(reposData);
}

async function fetchGitHubProfile() {
    const response = await fetch(`${CONFIG.API_BASE}/users/${CONFIG.GITHUB_USERNAME}`);
    if (!response.ok) throw new Error('Profile fetch failed');
    return response.json();
}

async function fetchGitHubRepositories() {
    const response = await fetch(`${CONFIG.API_BASE}/users/${CONFIG.GITHUB_USERNAME}/repos?per_page=100&sort=updated`);
    if (!response.ok) throw new Error('Repositories fetch failed');
    return response.json();
}

function updateProfileDisplay(profile) {
    // Update profile image
    if (profile.avatar_url) {
        Elements.profileImg.src = profile.avatar_url;
        Elements.profileImg.alt = profile.name || profile.login;
    }
    
    // Update profile information
    Elements.gitName.textContent = profile.name || profile.login;
    Elements.gitBio.textContent = profile.bio || 'Full Stack Developer passionate about creating innovative web solutions';
    
    // Update statistics with animation
    animateCounter(Elements.repoCount, profile.public_repos || 0);
    animateCounter(Elements.followerCount, profile.followers || 0);
    animateCounter(Elements.followingCount, profile.following || 0);
}

function updateRepositoriesDisplay(repositories) {
    AppState.repositories = repositories;
    displayProjects();
}

// Fallback Data
function loadFallbackData() {
    const fallbackProfile = {
        name: 'Ayushi Mishra',
        bio: 'Full Stack Developer passionate about creating innovative web solutions',
        avatar_url: null,
        public_repos: 10,
        followers: 5,
        following: 15
    };
    
    const fallbackRepos = [
        {
            name: 'MERN-Notes-App',
            description: 'Full-stack notes management application with JWT authentication and CRUD operations using MongoDB, Express.js, React.js, and Node.js',
            language: 'JavaScript',
            stargazers_count: 8,
            forks_count: 3,
            html_url: `https://github.com/${CONFIG.GITHUB_USERNAME}/MERN-Notes-App`,
            homepage: null,
            updated_at: '2024-01-15T10:30:00Z'
        },
        {
            name: 'E-Commerce-Platform',
            description: 'Secure e-commerce platform with modular PHP classes, role-based access control, and comprehensive product management',
            language: 'PHP',
            stargazers_count: 12,
            forks_count: 5,
            html_url: `https://github.com/${CONFIG.GITHUB_USERNAME}/E-Commerce-Platform`,
            homepage: null,
            updated_at: '2024-02-10T14:20:00Z'
        },
        {
            name: 'NGO-Website',
            description: 'Campaign and donation management platform with secure workflows, admin dashboards, and volunteer coordination',
            language: 'JavaScript',
            stargazers_count: 6,
            forks_count: 2,
            html_url: `https://github.com/${CONFIG.GITHUB_USERNAME}/NGO-Website`,
            homepage: 'https://utsavfoundation.org',
            updated_at: '2024-03-05T09:15:00Z'
        },
        {
            name: 'School-Management-System',
            description: 'Multi-role school management platform with RBAC, student information system, and comprehensive reporting',
            language: 'PHP',
            stargazers_count: 9,
            forks_count: 4,
            html_url: `https://github.com/${CONFIG.GITHUB_USERNAME}/School-Management-System`,
            homepage: null,
            updated_at: '2024-01-28T16:45:00Z'
        },
        {
            name: 'Portfolio-Website',
            description: 'Responsive portfolio website with dynamic GitHub integration, modern design, and interactive features',
            language: 'HTML',
            stargazers_count: 4,
            forks_count: 1,
            html_url: `https://github.com/${CONFIG.GITHUB_USERNAME}/Portfolio-Website`,
            homepage: null,
            updated_at: '2024-03-20T12:00:00Z'
        },
        {
            name: 'React-Todo-App',
            description: 'Modern todo application built with React, featuring local storage, drag-and-drop, and priority management',
            language: 'JavaScript',
            stargazers_count: 7,
            forks_count: 3,
            html_url: `https://github.com/${CONFIG.GITHUB_USERNAME}/React-Todo-App`,
            homepage: null,
            updated_at: '2024-02-28T08:30:00Z'
        }
    ];
    
    updateProfileDisplay(fallbackProfile);
    updateRepositoriesDisplay(fallbackRepos);
}

// Project Display Functions
function displayProjects() {
    const filteredRepos = getFilteredRepositories();
    const projectsToShow = filteredRepos.slice(0, AppState.displayedCount);
    
    Elements.projectsGrid.innerHTML = '';
    
    if (projectsToShow.length === 0) {
        showNoProjectsMessage();
        return;
    }
    
    projectsToShow.forEach((repo, index) => {
        setTimeout(() => {
            const projectCard = createProjectCard(repo);
            Elements.projectsGrid.appendChild(projectCard);
        }, index * 100);
    });
    
    updateLoadMoreButton(filteredRepos.length);
}

function createProjectCard(repo) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const languageColor = LANGUAGE_COLORS[repo.language] || '#888888';
    const description = repo.description || 'No description available';
    const lastUpdated = new Date(repo.updated_at).toLocaleDateString();
    
    card.innerHTML = `
        <div class="project-header">
            <div class="project-icon">
                <i class="fas ${getProjectIcon(repo)}"></i>
            </div>
            <div class="project-title">
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            </div>
        </div>
        <p class="project-description">${description}</p>
        <div class="project-meta">
            <div class="project-language">
                <span class="language-indicator" style="background-color: ${languageColor}"></span>
                <span>${repo.language || 'Unknown'}</span>
            </div>
            <div class="project-stats">
                <div class="project-stat">
                    <i class="fas fa-star"></i>
                    <span>${repo.stargazers_count}</span>
                </div>
                <div class="project-stat">
                    <i class="fas fa-code-branch"></i>
                    <span>${repo.forks_count}</span>
                </div>
            </div>
        </div>
        <div class="project-actions">
            <a href="${repo.html_url}" target="_blank" class="project-btn">
                <i class="fas fa-code"></i>
                View Code
            </a>
            ${repo.homepage ? `
                <a href="${repo.homepage}" target="_blank" class="project-btn">
                    <i class="fas fa-external-link-alt"></i>
                    Live Demo
                </a>
            ` : ''}
        </div>
    `;
    
    return card;
}

function getProjectIcon(repo) {
    const language = repo.language?.toLowerCase();
    const name = repo.name.toLowerCase();
    
    if (name.includes('website') || name.includes('portfolio')) return 'fa-globe';
    if (name.includes('mobile') || name.includes('app')) return 'fa-mobile-alt';
    if (name.includes('api') || name.includes('backend')) return 'fa-server';
    if (name.includes('ecommerce') || name.includes('shop')) return 'fa-shopping-cart';
    if (name.includes('school') || name.includes('education')) return 'fa-graduation-cap';
    if (name.includes('ngo') || name.includes('charity')) return 'fa-heart';
    if (language === 'javascript' || language === 'typescript') return 'fa-js-square';
    if (language === 'python') return 'fa-python';
    if (language === 'java') return 'fa-java';
    if (language === 'php') return 'fa-php';
    if (language === 'html' || language === 'css') return 'fa-code';
    
    return 'fa-folder-open';
}

function getFilteredRepositories() {
    if (AppState.currentFilter === 'all') {
        return AppState.repositories;
    }
    
    return AppState.repositories.filter(repo => {
        if (!repo.language) return false;
        return repo.language.toLowerCase().includes(AppState.currentFilter.toLowerCase());
    });
}

function showNoProjectsMessage() {
    Elements.projectsGrid.innerHTML = `
        <div class="loading-projects">
            <i class="fas fa-folder-open"></i>
            <p>No projects found for the selected filter.</p>
        </div>
    `;
}

function updateLoadMoreButton(totalFilteredCount) {
    if (totalFilteredCount > AppState.displayedCount) {
        Elements.loadMoreBtn.style.display = 'block';
    } else {
        Elements.loadMoreBtn.style.display = 'none';
    }
}

// Filter Functions
function setActiveFilter(activeTab) {
    Elements.filterTabs.forEach(tab => tab.classList.remove('active'));
    activeTab.classList.add('active');
}

function filterProjects(filter) {
    AppState.currentFilter = filter;
    AppState.displayedCount = CONFIG.ITEMS_PER_PAGE;
    displayProjects();
}

function loadMoreProjects() {
    if (AppState.isLoading) return;
    
    AppState.isLoading = true;
    Elements.loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    
    setTimeout(() => {
        AppState.displayedCount += CONFIG.ITEMS_PER_PAGE;
        displayProjects();
        AppState.isLoading = false;
        Elements.loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Load More Projects';
    }, 1000);
}

// Utility Functions
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

function showSuccessMessage() {
    console.log('✅ Portfolio loaded successfully with live GitHub data!');
}

// External Actions
function downloadCV() {
    const cvContent = `
AYUSHI MISHRA
Full Stack Developer

�� Email: ayushitmishra@gmail.com
📱 Phone: +91 9792846609
�� Location: Gurugram, Haryana, India
�� LinkedIn: https://linkedin.com/in/ayushi-mishra-513953380
💻 GitHub: https://github.com/${CONFIG.GITHUB_USERNAME}

🎯 OBJECTIVE
Detail-oriented Software Developer with experience in full-stack web development, database management, and multi-tenant application design. Skilled in MERN stack, PHP, MySQL, HTML, CSS, JavaScript, and secure authentication.

�� EDUCATION
• Master's in Computer Application
  Gurukul Kangri (Deemed University), Haridwar | 2024
• Bachelor of Science
  Dr. RMLA University, Ayodhya | 2019-2022

�� TECHNICAL SKILLS
• Programming Languages: JavaScript, PHP, HTML5, CSS3
• Web Development: React.js, Node.js, Express.js, Bootstrap, Responsive Design
• Database Management: MongoDB, MySQL, Data Validation, Secure Database Operations
• Tools & Deployment: Git, GitHub, Postman, Hostinger, VS Code
• Security & Authentication: JWT, bcrypt, Session-based Authentication, OTP Verification

💼 EXPERIENCE
Web Development Intern | Utsav Foundation, Gurugram | Jan 2024 – Jul 2024
• Developed full-stack NGO website using PHP, JavaScript, and MySQL
• Implemented RESTful APIs, secure session-based authentication, and optimized backend performance
• Deployed production-ready website via Hostinger and managed database security
• Created admin dashboards, forms, and user workflows to improve operational efficiency

🚀 PROJECTS
1. MERN Notes Project - Full-stack notes management application with CRUD functionality
2. E-Commerce Web App - Secure platform with modular PHP classes for authentication
3. NGO Website - Campaign and donation management platform with secure workflows
4. School Management System - Multi-role platform with RBAC and data isolation

�� CERTIFICATIONS
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
    
    showNotification('CV downloaded successfully! 📄');
}

function openGitHubProfile() {
    window.open(`https://github.com/${CONFIG.GITHUB_USERNAME}`, '_blank');
}

function showNotification(message) {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 10000;
        font-weight: 500;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe sections for animations when page loads
window.addEventListener('load', () => {
    document.querySelectorAll('.section-container, .project-card, .stat-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

console.log('🚀 Ayushi Mishra Portfolio - Loaded Successfully!');
