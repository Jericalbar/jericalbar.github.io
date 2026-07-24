/* REMARK: ULTIMAX PROJECT GALLERY JAVASCRIPT */
const galleryItems = document.querySelectorAll(".gallery-item");
const imageLightbox = document.getElementById("imageLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxClose = document.getElementById("lightboxClose");

/* REMARK: Binubuksan ang full-screen screenshot. */
galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    lightboxImage.src = item.dataset.image;
    lightboxImage.alt = item.dataset.title || "Project screenshot";
    lightboxTitle.textContent = item.dataset.title || "";
    imageLightbox.classList.add("open");
    imageLightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

/* REMARK: Isinasara at nire-reset ang preview. */
function closeLightbox() {
  imageLightbox.classList.remove("open");
  imageLightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  lightboxTitle.textContent = "";
  document.body.style.overflow = "";
}
lightboxClose.addEventListener("click", closeLightbox);
imageLightbox.addEventListener("click", (event) => { if (event.target === imageLightbox) closeLightbox(); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape" && imageLightbox.classList.contains("open")) closeLightbox(); });
