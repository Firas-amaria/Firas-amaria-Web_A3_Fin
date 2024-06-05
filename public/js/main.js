
/**
 * this is the main page controller that handles the dark / light settings 
 * and also handles the mobile side bar when the screen is resized
 */

var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');


/**
 * This function sets the color theme of the webpage based on the user's preference.
 * It checks if the 'color-theme' is stored in local storage. If it is, it applies the stored theme.
 * If not, it checks if the user's system preference is dark mode. If it is, it applies the dark theme.
 * If neither condition is met, it applies the light theme.
 *
 */
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark')
}

// Change the icons inside the button based on previous settings
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeToggleLightIcon.classList.remove('hidden');
} else {
    themeToggleDarkIcon.classList.remove('hidden');
}

var themeToggleBtn = document.getElementById('theme-toggle');

/**
 * This function handles the theme toggling functionality.
 * It toggles the icons inside the theme toggle button and applies the dark or light theme based on the user's preference.
 * If the 'color-theme' is stored in local storage, it applies the stored theme.
 * If not, it checks if the user's system preference is dark mode. If it is, it applies the dark theme.
 * If neither condition is met, it applies the light theme.
 *
 */
themeToggleBtn.addEventListener('click', function() {

    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }

    // if NOT set via local storage previously
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }
    
});


/**
 * Event listener for DOMContentLoaded event.
 * This function handles the mobile side bar when the screen is resized.
 * 
 */
document.addEventListener('DOMContentLoaded', (event) => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
const sidebar = document.querySelector('.sidebar');

console.log('Sidebar:', sidebar);
mobileMenuButton.addEventListener('click', function() {
    
    sidebar.classList.remove('sm:block');
    sidebar.classList.add('sm:block');
    sidebar.classList.toggle('hidden');
});
})
