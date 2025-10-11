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
const kastens = ["kasten1","kasten2","kasten3"];

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
  currentSlides = data.slides.map(slide => ({
    src: `content/${kasten}/${slide.file}`,
    title: slide.title,
    desc: slide.desc
  }));
  currentIndex = 0;
  showSlide(currentIndex);
  lightbox.classList.remove("hidden");
}

function showSlide(index) {
  const slide = currentSlides[index];
  lightboxImg.src = slide.src;
  lightboxTitle.textContent = slide.title;
  lightboxDesc.textContent = slide.desc;
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

document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowLeft') {
    const prevBtn = document.getElementById('prevBtn');
    if (prevBtn) prevBtn.click();
  }
  if (event.key === 'ArrowRight') {
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) nextBtn.click();
  if (event.key === 'Escape') {
    const closeBtn = document.getElementById('closeBtn');
    if (closeBtn) closeBtn.click();
  }
});