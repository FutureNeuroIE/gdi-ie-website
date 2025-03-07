//embedding videos
function loadVideo() {
    document.querySelector(".video-container").innerHTML = `
        <iframe width="560" height="315"
            src="https://www.youtube.com/embed/XZAKgOPSWKo?autoplay=1"
            title="YouTube video player" frameborder="0"
            allow="autoplay; encrypted-media" allowfullscreen>
        </iframe>`;
}


//enable back to top button on scroll
document.addEventListener("DOMContentLoaded", function () {
    const backToTopBtn = document.getElementById("backToTop");

    if (!backToTopBtn) {
       console.error("Back to Top button not found!");
       return;
   }
    // Show/hide button on scroll
    window.addEventListener("scroll", function () {
        if (window.scrollY > 20) { // Show when scrolled down 300px as default
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    });

    // Scroll smoothly to top when clicked
    backToTopBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

//member card animation + bio
document.addEventListener("DOMContentLoaded", function () {
    var memberCards = document.querySelectorAll('.member-card');

    memberCards.forEach(function (card) {
        var bioDropdown = card.querySelector('.bio-dropdown');
        var bioContent = bioDropdown.innerHTML.trim();

        var bioPopupTrigger = document.createElement('div');
        bioPopupTrigger.className = 'bio-popup-trigger';
        bioPopupTrigger.innerText = 'Biography';
        bioPopupTrigger.dataset.bioContent = bioContent; // Store bio content in data attribute
        card.appendChild(bioPopupTrigger);
    });

    var observer = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    memberCards.forEach(function (card) {
        observer.observe(card);
    });

    // Add event listener to close bio modal when clicking outside of it
    document.addEventListener('click', function(event) {
        var bioModal = document.querySelector('.bio-modal');

        // Check if the clicked element is not the bio modal
        if (!bioModal.contains(event.target)) {
            // If the clicked element is outside the bio modal, close the bio modal
            closeBioModal();
        }
    });

    // Add event listener to bio popup triggers
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('bio-popup-trigger')) {
            var bioContent = event.target.dataset.bioContent; // Retrieve bio content from data attribute
            openBioModal(bioContent);
        }
    });
});

function openBioModal(content) {
    var modal = document.querySelector('.bio-modal');
    var bioContent = modal.querySelector('.bio-content');
    bioContent.innerHTML = content;
    modal.style.display = 'block';
}

//hamburger menu goi
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menuToggle");
    const sideMenu = document.getElementById("sideMenu");
    let lastScrollTop = 0;

    // Toggle menu on click
    menuToggle.addEventListener("click", function () {
        sideMenu.classList.toggle("active");
    });

    // Close menu when clicking outside of it
    document.addEventListener("click", function (event) {
        if (!sideMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            sideMenu.classList.remove("active");
        }
    });

    // Smooth scrolling for menu links
    const menuLinks = document.querySelectorAll(".side-menu a");
    menuLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50,
                    behavior: "smooth"
                });
            }
            sideMenu.classList.remove("active"); // Close menu after selection
        });
    });

    // Hide menu button on scroll down, show on scroll up
    window.addEventListener("scroll", function () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Scrolling down - hide button
            menuToggle.style.top = "-100px"; // Move it out of view
        } else {
            // Scrolling up - show button
            menuToggle.style.top = "20px"; // Restore original position
        }

        lastScrollTop = scrollTop;
    });
});

// Hide detailed collaborators until link is clicked
document.addEventListener("DOMContentLoaded", function () {
    const toggleLink = document.getElementById("toggleCollaborators");
    const europeanCollaborators = document.getElementById("european-collaborators");
    const nationalCollaborators = document.getElementById("national-collaborators");

    // Find the last "collaborator-description" inside National Collaborators
    const descriptions = nationalCollaborators.querySelectorAll(".collaborator-description");
    const nationalLastElement = descriptions.length > 0 ? descriptions[descriptions.length - 1] : null;

    if (!nationalLastElement) {
        console.warn("No .collaborator-description found in #national-collaborators.");
        return; // Prevent errors if no matching elements exist
    }

    // Function to toggle visibility
    function toggleSection(section) {
        if (section.classList.contains("visible")) {
            section.classList.remove("visible");
            section.classList.add("hidden");
        } else {
            section.classList.remove("hidden");
            section.classList.add("visible");
        }
    }

    // Click event to show/hide both sections
    toggleLink.addEventListener("click", function (event) {
        event.preventDefault();
        toggleSection(europeanCollaborators);
        toggleSection(nationalCollaborators);
    });

    // Intersection Observer to detect when the LAST collaborator description is fully out of view
    const observer = new IntersectionObserver(
        (entries) => {
            // Only hide if the last .collaborator-description is out of view
            if (!entries[0].isIntersecting) {
                // Hide both sections when the last collaborator description is fully out of view
                europeanCollaborators.classList.remove("visible");
                europeanCollaborators.classList.add("hidden");
                nationalCollaborators.classList.remove("visible");
                nationalCollaborators.classList.add("hidden");
            }
        },
        { threshold: 0 } // Fires when even the smallest part of the element leaves the viewport
    );

    observer.observe(nationalLastElement); // Watch the last collaborator description

});

//toogle search
function toggleSearch() {
    document.querySelector(".search-container").classList.toggle("active");
    document.getElementById("searchInput").focus();
}

// Function to search the page and highlight matches
function searchPage() {
    let input = document.getElementById("searchInput").value.toLowerCase();

    // Remove previous highlights
    removeHighlights();

    if (input.length < 3) return; // Don't search if input is too short

    highlightMatches(document.body, input);

    // Scroll to first match (optional)
    let firstMatch = document.querySelector(".highlight");
    if (firstMatch) {
        firstMatch.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}

// Function to highlight matches without breaking input fields
function highlightMatches(element, searchText) {
    if (element.nodeType === Node.TEXT_NODE) {
        let text = element.nodeValue;
        let parent = element.parentNode;

        let regex = new RegExp(`(${searchText})`, "gi");
        if (regex.test(text)) {
            let newHTML = text.replace(regex, `<mark class="highlight">$1</mark>`);
            let tempDiv = document.createElement("div");
            tempDiv.innerHTML = newHTML;

            while (tempDiv.firstChild) {
                parent.insertBefore(tempDiv.firstChild, element);
            }
            parent.removeChild(element);
        }
    } else if (element.nodeType === Node.ELEMENT_NODE && element.tagName !== "SCRIPT" && element.tagName !== "INPUT" && element.tagName !== "TEXTAREA") {
        Array.from(element.childNodes).forEach(child => highlightMatches(child, searchText));
    }
}

// Function to remove highlights safely
function removeHighlights() {
    document.querySelectorAll("mark.highlight").forEach(mark => {
        mark.replaceWith(document.createTextNode(mark.textContent));
    });
}
