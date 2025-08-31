// Configuration
const GITHUB_USERNAME = 'AyushiMishra-a11y';

// Global variables
let allProjects = [];
let currentSection = 'home';
let projectsLoaded = false; // Add this to prevent duplicate loading

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portfolio loaded!');
    
    // Make navigation work immediately
    makeNavigationWork();
    
    // Show home section by default
    showSection('home');
});

// Make navigation clickable
function makeNavigationWork() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Navigation clicked!');
            
            // Get section name from href
            const href = this.getAttribute('href');
            const sectionName = href.replace('#', '');
            
            console.log('Switching to section:', sectionName);
            showSection(sectionName);
            
            // Update active navigation
            updateActiveNav(this);
        });
    });
}

// Show different sections
function showSection(sectionName) {
    console.log('Showing section:', sectionName);
    
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.style.display = 'block';
        targetSection.classList.add('active');
        currentSection = sectionName;
        
        console.log('✅ Section displayed:', sectionName);
        
        // Load projects only once when visiting projects section
        if (sectionName === 'projects' && !projectsLoaded) {
            loadProjects();
            projectsLoaded = true; // Mark as loaded
        }
    } else {
        console.error('Section not found:', sectionName);
    }
}

// Update active navigation
function updateActiveNav(clickedLink) {
    // Remove active from all links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active to clicked link
    clickedLink.classList.add('active');
}

// Load projects (FIXED - no duplicates)
function loadProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;
    
    console.log('Loading projects...');
    
    // Clear container first
    container.innerHTML = '';
    
    // Your actual GitHub projects
    const projects = [
        {
            name: 'Portfolio',
            description: 'Personal portfolio website showcasing my GitHub projects and skills.',
            language: 'HTML',
            stars: 0,
            forks: 0,
            updated: '8/31/2025',
            size: '359 KB',
            url: 'https://github.com/AyushiMishra-a11y/Portfolio.'
        },
        {
            name: 'MERN-Notes-project',
            description: 'A MERN stack notes application where users can register with a unique email, securely log in, and manage their notes with full CRUD functionality.',
            language: 'JavaScript',
            stars: 0,
            forks: 0,
            updated: '8/26/2025',
            size: '191 KB',
            url: 'https://github.com/AyushiMishra-a11y/MERN-Notes-project'
        },
        {
            name: 'utsav-foundation-website-case-study',
            description: 'NGO campaign website with PHP, MYSQL, JS, secure login & payment gateway (internship project).',
            language: 'PHP',
            stars: 0,
            forks: 0,
            updated: '8/26/2025',
            size: '150 KB',
            url: 'https://github.com/AyushiMishra-a11y/utsav-foundation-website-case-study'
        },
        {
            name: 'VISION-Program-Web-Application-Multi-Role-Innovation-Portal',
            description: 'Innovation management portal connecting students, selectors, sponsors, and mentors.',
            language: 'PHP',
            stars: 0,
            forks: 0,
            updated: '8/26/2025',
            size: '200 KB',
            url: 'https://github.com/AyushiMishra-a11y/VISION-Program-Web-Application-Multi-Role-Innovation-Portal'
        },
        {
            name: 'Utsav-Gurukul-Multi-Tenant-School-Management-Platform',
            description: 'Centralized school management app with multi-tenancy, role-based access control, and secure OTP/login workflow.',
            language: 'PHP',
            stars: 0,
            forks: 0,
            updated: '8/26/2025',
            size: '250 KB',
            url: 'https://github.com/AyushiMishra-a11y/Utsav-Gurukul-Multi-Tenant-School-Management-Platform'
        }
    ];
    
    // Display projects one by one
    projects.forEach((project, index) => {
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
    
    console.log('Projects loaded successfully!');
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
                ${project.size}
            </span>
        </div>
        
        <a href="${project.url}" target="_blank" class="project-link">
            <i class="fab fa-github"></i>
            View on GitHub
        </a>
    `;
    
    return card;
}

// Get language color
function getLanguageColor(language) {
    const colors = {
        'JavaScript': '#f1e05a',
        'PHP': '#4f5d95',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'Other': '#6c757d'
    };
    return colors[language] || colors['Other'];
}

// Console message
console.log('Script loaded successfully!');
