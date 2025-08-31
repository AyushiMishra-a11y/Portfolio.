// Configuration
const GITHUB_USERNAME = 'AyushiMishra-a11y';

// Global variables
let allProjects = [];
let currentSection = 'home';
let projectsLoaded = false;

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Ayushi Mishra Portfolio loaded successfully!');
    
    // Initialize all functionality
    initializeNavigation();
    initializeAnimations();
    
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
        
        // Special handling for projects section
        if (sectionName === 'projects' && !projectsLoaded) {
            loadProjects();
            projectsLoaded = true;
        }
        
        // Special handling for resume section
        if (sectionName === 'resume') {
            animateResumeElements();
        }
        
        // Special handling for about section
        if (sectionName === 'about') {
            animateAboutElements();
        }
    } else {
        console.error('Section not found:', sectionName);
    }
    
    // Update URL hash
    window.location.hash = sectionName;
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
    const skillItems = document.querySelectorAll('.skill-item');
    
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
    
    // Animate skill items
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
    
    // Add hover effects
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
    
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

// Add interactive features
document.addEventListener('click', function(e) {
    // Create ripple effect on buttons and links
    if (e.target.tagName === 'BUTTON' || e.target.closest('button') ||
        e.target.tagName === 'A' || e.target.closest('a')) {
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
   - Dynamic navigation between sections
   - Smooth animations and transitions
   - Interactive project cards
   - Mobile-responsive design
   - Enhanced sections with certifications
   - Resume download functionality
   
📧 Contact: ayushitmishra@gmail.com
�� LinkedIn: linkedin.com/in/ayushi-mishra-513953380
�� GitHub: github.com/${GITHUB_USERNAME}
🏆 NPTEL Certifications included
⭐ Skills with star ratings
📋 Complete project experience
💼 Professional resume section
`);

// Test function for debugging
function testNavigation() {
    alert('Navigation test! Try clicking: About, Resume, Projects, Contact');
    console.log('Available sections:', ['home', 'about', 'resume', 'projects', 'contact']);
}
