(async function () {
    "use strict";

    // =========================================================================
    // 1. ASYNC COMPONENT INCLUSION (HTML Templates)
    // =========================================================================
    async function includeComponents() {
        const elements = document.querySelectorAll('[data-include]');
        for (const el of elements) {
            const file = el.getAttribute('data-include');
            try {
                const response = await fetch(file);
                if (response.ok) {
                    // Replaces placeholder with downloaded template contents
                    el.outerHTML = await response.text();
                } else {
                    el.innerHTML = '<p>Required structural component could not be loaded.</p>';
                }
            } catch (err) {
                console.error('Error fetching structural component layout:', err);
            }
        }
    }

    // Wait completely for external fragments (like footer.html) to sit in the DOM
    await includeComponents();

    // =========================================================================
    // 2. SINGLE-PAGE ARCHITECTURE (Section Routing & Tab Control)
    // =========================================================================
    const links = document.querySelectorAll('.nav-link, .footer-nav');
    const sections = document.querySelectorAll('section');

    function showSection(id) {
        let activeHeadingText = "Home";

        sections.forEach((s) => {
            if (s.id === id) {
                s.classList.add('active');
                const heading = s.querySelector('h2');
                if (heading) {
                    activeHeadingText = heading.textContent.trim();
                }
            } else {
                s.classList.remove('active');
            }
        });

        // Toggle active states on both top header nav links and footer links simultaneously
        links.forEach((a) => {
            if (a.dataset.target === id) {
                a.classList.add('active');
            } else {
                a.classList.remove('active');
            }
        });

        // Structural dynamic title update with clean ║ metadata boundary
        document.title = "Jolly Gator Hot Sauce Co. | " + activeHeadingText;
    }

    // Attach modular layout navigation routing triggers
    links.forEach((link) => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            showSection(this.dataset.target);
            window.scrollTo(0, 0);
        });
    });

    // =========================================================================
    // 3. INTERACTIVE MARKETPLACE (Custom Pack Bundle Builder)
    // =========================================================================
    const checkboxes = document.querySelectorAll('.sauce-option');
    const bundleItemsText = document.getElementById('bundle-items');
    const bundleCountText = document.getElementById('bundle-count');
    const bundleTotalText = document.getElementById('bundle-total');

    function updateBundle() {
        // Guard check to make sure variables exist before trying to read them
        if (!bundleItemsText || !bundleCountText || !bundleTotalText) return;

        let itemsArray = [];
        let totalPrice = 0.0;

        checkboxes.forEach((cb) => {
            if (cb.checked) {
                itemsArray.push(cb.value);
                totalPrice += parseFloat(cb.getAttribute('data-price'));
            }
        });

        bundleItemsText.textContent = itemsArray.length > 0 ? itemsArray.join(', ') : "None chosen yet";
        bundleCountText.textContent = itemsArray.length;
        bundleTotalText.textContent = totalPrice.toFixed(2);
    }

    checkboxes.forEach((cb) => {
        cb.addEventListener('change', updateBundle);
    });

    // =========================================================================
    // 4. HUMAN-COMPUTER INTERACTION FEEDS (Live Form Text Mirroring)
    // =========================================================================
    const messageInput = document.getElementById('user-message');
    const mirrorPreview = document.getElementById('mirror-preview');

    if (messageInput && mirrorPreview) {
        messageInput.addEventListener('input', function () {
            if (this.value.trim().length > 0) {
                mirrorPreview.textContent = this.value;
            } else {
                mirrorPreview.textContent = "Your live message content will automatically sync here...";
            }
        });
    }

    // =========================================================================
    // 5. OPERATIONAL TIME CAPTURE (Automated Availability Checking)
    // =========================================================================
    function evaluateStoreHours() {
        const statusElement = document.getElementById('status-banner');
        if (!statusElement) return;

        const currentLocalTime = new Date();
        const currentDayIndex = currentLocalTime.getDay(); 
        const currentHour = currentLocalTime.getHours();

        let isOpen = false;

        // Mon-Fri (Days 1-5): Open 10:00 AM - 6:00 PM (10:00 to 17:59)
        if (currentDayIndex >= 1 && currentDayIndex <= 5) {
            if (currentHour >= 10 && currentHour < 18) {
                isOpen = true;
            }
        } 
        // Saturday (Day 6): Open 10:00 AM - 4:00 PM (10:00 to 15:59)
        else if (currentDayIndex === 6) {
            if (currentHour >= 10 && currentHour < 16) {
                isOpen = true;
            }
        }

        // Apply visual classes and update localized contextual strings dynamically
        if (isOpen) {
            statusElement.textContent = "The Smokehouse shop is currently open! Come on by.";
            statusElement.className = "status-banner status-open";
        } else {
            statusElement.textContent = "The Smokehouse shop is currently closed. Come back soon!";
            statusElement.className = "status-banner status-closed";
        }
    }

    // =========================================================================
    // 6. INITIALIZATION SEQUENCE
    // =========================================================================
    showSection('home');
    evaluateStoreHours();

    // Dynamically inject the correct year into the freshly fetched footer layout
    const yearPlaceholder = document.getElementById('current-year');
    if (yearPlaceholder) {
        yearPlaceholder.textContent = new Date().getFullYear();
    }

})();