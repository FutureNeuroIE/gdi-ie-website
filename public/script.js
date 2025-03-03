function loadVideo() {
    document.querySelector(".video-container").innerHTML = `
        <iframe width="560" height="315"
            src="https://www.youtube.com/embed/XZAKgOPSWKo?autoplay=1"
            title="YouTube video player" frameborder="0"
            allow="autoplay; encrypted-media" allowfullscreen>
        </iframe>`;
}
