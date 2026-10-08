const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxDesc = document.getElementById("lightbox-desc");
const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentSlides = [];
let currentIndex = 0;

// Liste der Kasten-Ordner hier eintragen
const kastens = ["kasten1", "kasten2", "kasten3", "kasten5", "kasten7", "kasten9", "kasten10"];

async function loadGallery() {
  for (let kasten of kastens) {
    const res = await fetch(`content/${kasten}/manifest.json`);
    const data = await res.json();

    const div = document.createElement("div");
    div.className = "kasten";
    div.innerHTML = `
      <img src="content/${kasten}/${data.cover}" alt="">
      <div class="hover-text">${data.hovtitle}</div>
    `;
    div.onclick = () => openLightbox(data, kasten);
    gallery.appendChild(div);
    console.log("geladen:", kasten, data);
  }
}

function openLightbox(data, kasten) {
  currentSlides = data.slides.map(slide => {
    const file = slide.file || "";
    const isUrl = /^(https?:)?\/\//i.test(file) || file.startsWith("/");
    return {
      src: isUrl ? file : `content/${kasten}/${file}`,
      title: slide.title,
      desc: slide.desc
    };
  });
  currentIndex = 0;
  showSlide(currentIndex);
  lightbox.classList.remove("hidden");
}

function showSlide(index) {
  const slide = currentSlides[index];
  const src = slide.src || "";
  const isVideo = /\.mp4($|\?)/i.test(src);
  const isImage = /\.(png|jpe?g|gif|webp|svg)($|\?)/i.test(src);

  const contentArea = document.querySelector(".lightbox-content");
  const oldMedia = document.getElementById("lightbox-media");
  if (oldMedia) oldMedia.remove();

  let mediaElement;

  if (isVideo) {
    mediaElement = document.createElement("video");
    mediaElement.src = src;
    mediaElement.autoplay = true;
    mediaElement.loop = true;
    mediaElement.muted = true;
    mediaElement.playsInline = true;
    mediaElement.preload = "auto";
    mediaElement.controls = false;
    mediaElement.disablePictureInPicture = true;
    mediaElement.setAttribute("controlslist", "nodownload nofullscreen noremoteplayback");
    mediaElement.setAttribute("aria-label", `${slide.title}: per Klick pausieren oder fortsetzen`);
    mediaElement.style.maxWidth = "100%";
    mediaElement.style.maxHeight = "60vh";
    mediaElement.style.objectFit = "contain";
    mediaElement.style.cursor = "pointer";

    mediaElement.addEventListener("click", event => {
      event.stopPropagation();
      if (mediaElement.paused) {
        mediaElement.play().catch(() => {});
      } else {
        mediaElement.pause();
      }
    });
  } else if (isImage) {
    mediaElement = document.createElement("img");
    mediaElement.src = src;
    mediaElement.style.maxWidth = "100%";
    mediaElement.style.maxHeight = "60vh";
    mediaElement.style.objectFit = "contain";
  } else {
    // Für PDFs oder beliebige URLs/Websites verwenden wir ein iframe
    mediaElement = document.createElement("iframe");
    mediaElement.src = src;
    mediaElement.style.width = "100%";
    mediaElement.style.height = "60vh";
    mediaElement.style.border = "none";
    mediaElement.setAttribute("loading", "lazy");
  }

  mediaElement.id = "lightbox-media";

  lightboxTitle.textContent = slide.title;
  lightboxDesc.textContent = slide.desc;

  const textArea = document.querySelector(".lightbox-text");
  contentArea.insertBefore(mediaElement, textArea);
}

closeBtn.onclick = () => lightbox.classList.add("hidden");
prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + currentSlides.length) % currentSlides.length;
  showSlide(currentIndex);
};
nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % currentSlides.length;
  showSlide(currentIndex);
};

loadGallery();

document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowLeft") {
    const prevBtn = document.getElementById("prevBtn");
    if (prevBtn) prevBtn.click();
  }
  if (event.key === "ArrowRight") {
    const nextBtn = document.getElementById("nextBtn");
    if (nextBtn) nextBtn.click();
  }
  if (event.key === "Escape") {
    const closeBtn = document.getElementById("closeBtn");
    if (closeBtn) closeBtn.click();
  }
});
