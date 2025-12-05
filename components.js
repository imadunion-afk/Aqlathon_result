/**
 * components.js
 * * Inserts the common navigation structure and initializes its functionality
 * (mobile toggle and active link highlighting).
 */

const NAV_HTML = `
    <nav class="navbar">
        <div class="left-side">
            <div class="logo-container">
                <img src="logo+.png" alt="IMADUNION Logo">
            </div>
        </div>
        <div class="menu-toggle">&#9776;</div>
        <div class="rightside">
            <a class="home" href="home.html">Home</a>
            <a class="aboutus" href="about-us.html">About Us</a>
            <a class="news-events" href="news&event.html">News & Events</a>
            <a class="achievements" href="achievements.html">Achievements</a>
            <a class="contactus" href="contact-us.html">Contact Us</a>
        </div>
    </nav>
`;

/**
 * Loads the navigation into the .nav-container placeholder, 
 * determines the current page, and sets the 'active' class on the corresponding link.
 */
function loadNavigationAndInit() {
    const navContainer = document.querySelector('.nav-container');
    if (navContainer) {
        // 1. Insert the navigation HTML
        navContainer.innerHTML = NAV_HTML;

        // 2. Determine the current page filename and set the active link
        const currentPath = window.location.pathname;
        const navLinks = navContainer.querySelectorAll('.rightside a');
        
        navLinks.forEach(link => {
            // Check if the link's href matches the end of the current URL path
            // Handles cases where the path might end with a full file name or just a path segment.
            const hrefFile = link.getAttribute('href');
            if (currentPath.endsWith(hrefFile) || (currentPageFile === 'home.html' && hrefFile === 'home.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // 3. Initialize the Mobile Menu Toggle functionality
        const menuToggle = navContainer.querySelector('.menu-toggle');
        const rightSide = navContainer.querySelector('.rightside'); 
        if (menuToggle && rightSide) {
            menuToggle.addEventListener('click', () => {
                rightSide.classList.toggle('show');
            });
        }
    }
}

// --- Preloader and Scroll Animations Logic ---
document.addEventListener('DOMContentLoaded', function() {
    // 1. Load Navigation
    loadNavigationAndInit();

    // 2. Handle Preloader Logic
    setTimeout(function() {
        document.body.classList.add('loaded');
    }, 100); // Reduced delay to make secondary page loading faster

    // 3. Handle Animation on Scroll Logic
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if ("IntersectionObserver" in window) {
        const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        animatedElements.forEach(el => {
            el.classList.add('is-visible');
        });
    }
});