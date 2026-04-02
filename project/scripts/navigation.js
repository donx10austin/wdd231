export function initNavigation() {
    const menuBtn = document.querySelector('#menu-button');
    const navList = document.querySelector('#nav-list');

    if (menuBtn && navList) {
        menuBtn.addEventListener('click', () => {
            const isExpanded = navList.classList.toggle('show-nav');
            menuBtn.textContent = isExpanded ? '✕' : '☰';
            menuBtn.setAttribute('aria-expanded', isExpanded);
        });
    }
}