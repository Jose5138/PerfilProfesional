function openDocument(file, title) {
    const modal = document.getElementById("documentModal");
    const modalImage = document.getElementById("modalImage");
    const modalVideo = document.getElementById("modalVideo");
    const modalTitle = document.getElementById("modalTitle");

    modalTitle.textContent = title;

    // Beide Medien zurücksetzen, damit sich Bild und Video nicht überschneiden.
    modalImage.src = "";
    modalImage.classList.add("hidden");
    modalVideo.pause();
    modalVideo.removeAttribute("src");
    modalVideo.load();
    modalVideo.classList.add("hidden");

    const isVideo = /\.(mp4|webm|ogg)(?:[?#].*)?$/i.test(file);

    if (isVideo) {
        modalVideo.src = file;
        modalVideo.classList.remove("hidden");
    } else {
        modalImage.src = file;
        modalImage.classList.remove("hidden");
    }

    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.style.overflow = "hidden";

    if (isVideo) {
        const playPromise = modalVideo.play();
        if (playPromise && typeof playPromise.catch === "function") {
            playPromise.catch(() => {
                // Si la reproducción automática se bloquea, se puede pulsar Play.
            });
        }
    }
}

function closeDocument() {
    const modal = document.getElementById("documentModal");
    const modalImage = document.getElementById("modalImage");
    const modalVideo = document.getElementById("modalVideo");

    modalVideo.pause();
    modalVideo.removeAttribute("src");
    modalVideo.load();
    modalVideo.classList.add("hidden");

    modalImage.src = "";
    modalImage.classList.add("hidden");

    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "";
}

document.getElementById("documentModal").addEventListener("click", function(event) {
    if (event.target === this) closeDocument();
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") closeDocument();
});
