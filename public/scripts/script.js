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
});
