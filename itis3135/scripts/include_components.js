/**
 * Wait for the DOM to fully load before initializing components.
 * This ensures the script doesn't attempt to manipulate elements
 * that haven't been parsed by the browser yet.
 */
document.addEventListener("DOMContentLoaded", function () {
    const includeElements = document.querySelectorAll("[data-include]");
    let loadsRemaining = includeElements.length;

    includeElements.forEach(function (element) {
        const filePath = element.getAttribute("data-include");

        fetch(filePath)
            .then(response => response.text())
            .then(html => {
                element.innerHTML = html;
                loadsRemaining--;

                // When the last component is loaded, trigger the script
                if (loadsRemaining === 0) {
                    initSiteScripts();
                }
            });
    });
});

/**
 * Initializes site-specific functionality that requires the 
 * components (header/footer) to be fully loaded first.
 */
function initSiteScripts() {
    const htmlValidationLink = document.getElementById("validation-link-html");
    const currentYear = document.getElementById("current-year");

    /**
     * Dynamically updates the validation link to point to the current page URL,
     * ensuring the W3C validator works for any page in your project.
     */
    if (htmlValidationLink) {
        htmlValidationLink.href = "https://validator.w3.org/check?uri=" + location.href;
    }

    /**
     * Dynamically injects the current year into the copyright span,
     * so you never have to manually update the footer year again.
     */
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
}