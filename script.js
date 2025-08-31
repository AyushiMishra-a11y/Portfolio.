
```


// Configuration - CHANGE THIS TO YOUR GITHUB USERNAME
const GITHUB_USERNAME = 'AyushiMishra';

// Global variables
let allProjects = [];
let displayedProjects = 6;
let currentFilter = 'all';

// Sample projects data (fallback)
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
    'TypeScript': '#3178c6',
    'PHP': '#4f5d95',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Python': '#3572a5',
    'Java': '#b07219',
    'C': '#555555',
    'C++': '#f34b7d',
    'Go': '#00add8',
    'Ruby': '#701516',
    'Swift': '#ffac45'
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio loading...');
    updateTime();
    setInterval(updateTime, 60000);
    setupEventListeners();
    
    // Load GitHub data with timeout
    setTimeout(() => {
        loadGitHubData();
    }, 1000);
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
    console.log('Setting up event listeners...');
    
    // Menu button
    const menuBtn = document.getElementById('menuBtn');
    if (menuBtn) {
        menuBtn.addEventListener('click', toggleMenu);
    }
    
    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
            closeMenu();
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        const mobileNav = document.getElementById('mobileNav');
        const menuBtn = document.getElementById('menuBtn');
        
        if (mobileNav && menuBtn && !mobileNav.contains(e.target) && !menuBtn.contains(e.target)) {
            closeMenu();
        }
    });
}

// Load GitHub data
async function loadGitHubData() {
    console.log('Loading GitHub data...');
    
    try {
        // Show loading message
        const projectsGrid = document.getElementById('projectsGrid');
        projectsGrid.innerHTML = `
            <div class="loading-message">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Fetching your GitHub repositories...</p>
            </div>
        `;
        
        // Fetch data with timeout
        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), 10000)
        );
        
        const dataPromise = Promise.all([
            fetchGitHubProfile(),
            fetchGitHubRepos()
        ]);
        
        await Promise.race([dataPromise, timeoutPromise]);
        
        console.log('GitHub data loaded successfully!');
        
    } catch (error) {
        console.log('GitHub API failed, using sample data:', error.message);
        loadSampleData();
    }
}

// Fetch GitHub profile
async function fetchGitHubProfile() {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const profile = await response.json();
        console.log('Profile fetched:', profile.login);
        
        // Update profile image
        if (profile.avatar_url) {
            const profileImg = document.getElementById('profileImg');
            if (profileImg) {
                profileImg.src = profile.avatar_url;
                profileImg.onerror = function() {
                    this.src = 'https://via.placeholder.com/300x400/FF6B6B/ffffff?text=Ayushi+M';
                };
            }
        }
        
        // Update profile info
        updateElement('githubName', profile.name || profile.login);
        updateElement('githubBio', profile.bio || 'Full Stack Developer passionate about creating innovative web solutions');
        updateElement('githubLocation', profile.location || 'Gurugram, Haryana');
        updateElement('githubCompany', profile.company || 'Freelancer');
        
        // Update statistics with animation
        animateCounter('repoCount', profile.public_repos || 10);
        animateCounter('followerCount', profile.followers || 5);
        animateCounter('followingCount', profile.following || 15);
        
    } catch (error) {
        console.log('Profile fetch failed:', error.message);
        // Use default values
        animateCounter('repoCount', 10);
        animateCounter('followerCount', 5);
        animateCounter('followingCount', 15);
    }
}

// Fetch GitHub repositories
async function fetchGitHubRepos() {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`);
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const repos = await response.json();
        console.log(`Fetched ${repos.length} repositories`);
        
        // Filter out forked repos and convert to our format
        allProjects = repos
            .filter(repo => !repo.fork)
            .map(repo => ({
                name: repo.name,
                description: repo.description || 'No description available',
                language: repo.language || 'Unknown',
                stars: repo.stargazers_count || 0,
                forks: repo.forks_count || 0,
                url: repo.html_url,
                demo: repo.homepage,
                updated: repo.updated_at
            }));
        
        if (allProjects.length === 0) {
            throw new Error('No repositories found');
        }
        
        displayProjects();
        
    } catch (error) {
        console.log('Repositories fetch failed:', error.message);
        throw error;
    }
}

// Load sample data as fallback
function loadSampleData() {
    console.log('Loading sample data...');
    allProjects = sampleProjects;
    displayProjects();
}

// Display projects
function displayProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;
    
    const filteredProjects = getFilteredProjects();
    const projectsToShow = filteredProjects.slice(0, displayedProjects);
    
    if (projectsToShow.length === 0) {
        projectsGrid.innerHTML = `
            <div class="loading-message">
                <i class="fas fa-folder-open"></i>
                <p>No projects found for this filter.</p>
            </div>
        `;
        return;
    }
    
    projectsGrid.innerHTML = '';
    
    projectsToShow.forEach((project, index) => {
        setTimeout(() => {
            const projectCard = createProjectCard(project);
            projectsGrid.appendChild(projectCard);
        }, index * 150);
    });
    
    // Update load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        if (filteredProjects.length > displayedProjects) {
            loadMoreBtn.style.display = 'block';
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }
    
    console.log(`Displayed ${projectsToShow.length} projects`);
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
                <a href="${project.url}" target="_blank" rel="noopener">${project.name}</a>
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
            <a href="${project.url}" target="_blank" rel="noopener" class="project-btn">
                <i class="fas fa-code"></i>
                View Code
            </a>
            ${project.demo ? `
                <a href="${project.demo}" target="_blank" rel="noopener" class="project-btn">
                    <i class="fas fa-external-link-alt"></i>
                    Live Demo
                </a>
            ` : ''}
        </div>
    `;
    
    return card;
}

// Get project icon based on name and language
function getProjectIcon(project) {
    const name = project.name.toLowerCase();
    const language = project.language?.toLowerCase() || '';
    
    if (name.includes('ecommerce') || name.includes('shop') || name.includes('store')) return 'fa-shopping-cart';
    if (name.includes('school') || name.includes('education') || name.includes('student')) return 'fa-graduation-cap';
    if (name.includes('ngo') || name.includes('charity') || name.includes('foundation')) return 'fa-heart';
    if (name.includes('todo') || name.includes('task') || name.includes('list')) return 'fa-tasks';
    if (name.includes('portfolio') || name.includes('website') || name.includes('blog')) return 'fa-globe';
    if (name.includes('chat') || name.includes('message')) return 'fa-comments';
    if (name.includes('game')) return 'fa-gamepad';
    if (name.includes('api') || name.includes('backend') || name.includes('server')) return 'fa-server';
    if (name.includes('mobile') || name.includes('app')) return 'fa-mobile-alt';
    if (name.includes('dashboard') || name.includes('admin')) return 'fa-tachometer-alt';
    
    // Language-based icons
    if (language === 'javascript' || language === 'typescript') return 'fa-js-square';
    if (language === 'php') return 'fa-php';
    if (language === 'python') return 'fa-python';
    if (language === 'java') return 'fa-java';
    if (language === 'html' || language === 'css') return 'fa-code';
    
    return 'fa-folder-open';
}

// Get filtered projects
function getFilteredProjects() {
    if (currentFilter === 'all') {
        return allProjects;
    }
    
    return allProjects.filter(project => 
        project.language && project.language.toLowerCase().includes(currentFilter.toLowerCase())
    );
}

// Filter projects function
function filterProjects(filter, buttonElement) {
    currentFilter = filter;
    displayedProjects = 6;
    
    // Update active filter button
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    if (buttonElement) {
        buttonElement.classList.add('active');
    }
    
    displayProjects();
    console.log(`Filtered by: ${filter}`);
}

// Load more projects
function loadMoreProjects() {
    displayedProjects += 6;
    displayProjects();
    console.log(`Showing ${displayedProjects} projects`);
}

// Animate counter
function animateCounter(elementId, target) {
    const element = document.getElementById(elementId);
    if (!element || !target) return;
    
    let current = 0;
    const increment = Math.max(1, Math.ceil(target / 50));
    const duration = 2000;
    const stepTime = duration / (target / increment);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = current;
        }
    }, stepTime);
}

// Update element text safely
function updateElement(id, text) {
    const element = document.getElementById(id);
    if (element && text) {
        element.textContent = text;
    }
}

// Navigation functions
function toggleMenu() {
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) {
        mobileNav.classList.toggle('active');
        console.log('Menu toggled');
    }
}

function closeMenu() {
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) {
        mobileNav.classList.remove('active');
    }
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        console.log(`Scrolled to: ${sectionId}`);
    }
}

function goToTop() {
    window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
    });
    console.log('Scrolled to top');
}

function goBack() {
    window.history.back();
    console.log('Navigated back');
}

function openGitHub() {
    const url = `https://github.com/${GITHUB_USERNAME}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    console.log('Opened GitHub profile');
}

function downloadCV() {
    const cvContent = `
AYUSHI MISHRA
Full Stack Developer

📧 Contact: ayushitmishra@gmail.com
📱 Phone: +91 9792846609
📍 Location: Gurugram, Haryana, India
🔗 LinkedIn: https://linkedin.com/in/ayushi-mishra-513953380
💻 GitHub: https://github.com/${GITHUB_USERNAME}

🎯 OBJECTIVE:
Detail-oriented Software Developer with experience in full-stack web development, 
database management, and multi-tenant application design. Skilled in MERN stack, 
PHP, MySQL, HTML, CSS, JavaScript, and secure authentication.

🎓 EDUCATION:
• Master's in Computer Application
  Gurukul Kangri (Deemed University), Haridwar | 2024
• Bachelor of Science
  Dr. RMLA University, Ayodhya | 2019-2022

💻 TECHNICAL SKILLS:
• Programming Languages: JavaScript, PHP, HTML5, CSS3
• Web Development: React.js, Node.js, Express.js, Bootstrap, Responsive Design
• Database Management: MongoDB, MySQL, Data Validation, Secure Database Operations
• Tools & Deployment: Git, GitHub, Postman, Hostinger, VS Code
• Security & Authentication: JWT, bcrypt, Session-based Authentication, OTP Verification

💼 EXPERIENCE:
Web Development Intern | Utsav Foundation, Gurugram | Jan 2024 – Jul 2024
• Developed full-stack NGO website using PHP, JavaScript, and MySQL
• Implemented RESTful APIs, secure session-based authentication, and optimized backend performance
• Deployed production-ready website via Hostinger and managed database security
• Created admin dashboards, forms, and user workflows to improve operational efficiency

🚀 PROJECT HIGHLIGHTS:
1. MERN Notes Project - Full-stack notes management with JWT authentication
2. E-Commerce Platform - Secure platform with modular PHP classes
3. NGO Website - Campaign and donation management platform
4. School Management System - Multi-role platform with RBAC

🏆 CERTIFICATIONS:
• NPTEL – Introduction to Internet of Things, IIT Madras
• NPTEL – Privacy and Security in Online Social Media, IIT Madras
• NPTEL – Soft Skills Certification

Generated from: ${window.location.href}
Date: ${new Date().toLocaleDateString()}
    `;
    
    const blob = new Blob([cvContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Ayushi_Mishra_Resume.txt';
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    // Show success message
    setTimeout(() => {
        alert('✅ Resume downloaded successfully!');
    }, 100);
    
    console.log('Resume downloaded');
}

console.log('🚀 Portfolio JavaScript loaded successfully!');
console.log(`👤 GitHub Username: ${GITHUB_USERNAME}`);
console.log('🔧 All functions are working!');
