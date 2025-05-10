const hijaiyah = [
  { huruf: "ا", nama: "Alif", bacaan: { fatha: "a", kasrah: "i", dammah: "u" } },
  { huruf: "ب", nama: "Ba", bacaan: { fatha: "ba", kasrah: "bi", dammah: "bu" } },
  { huruf: "ت", nama: "Ta", bacaan: { fatha: "ta", kasrah: "ti", dammah: "tu" } },
  { huruf: "ث", nama: "Tsa", bacaan: { fatha: "tsa", kasrah: "tsi", dammah: "tsu" } },
  { huruf: "ج", nama: "Jim", bacaan: { fatha: "ja", kasrah: "ji", dammah: "ju" } },
  { huruf: "ح", nama: "Ha", bacaan: { fatha: "ha", kasrah: "hi", dammah: "hu" } },
  { huruf: "خ", nama: "Kha", bacaan: { fatha: "kha", kasrah: "khi", dammah: "khu" } },
  { huruf: "د", nama: "Dal", bacaan: { fatha: "da", kasrah: "di", dammah: "du" } },
  { huruf: "ذ", nama: "Dzal", bacaan: { fatha: "za", kasrah: "zi", dammah: "zu" } },
  { huruf: "ر", nama: "Ra", bacaan: { fatha: "ra", kasrah: "ri", dammah: "ru" } },
  { huruf: "ز", nama: "Za", bacaan: { fatha: "za", kasrah: "zi", dammah: "zu" } },
  { huruf: "س", nama: "Sin", bacaan: { fatha: "sa", kasrah: "si", dammah: "su" } },
  { huruf: "ش", nama: "Syin", bacaan: { fatha: "sha", kasrah: "shi", dammah: "shu" } },
  { huruf: "ص", nama: "Shad", bacaan: { fatha: "sha", kasrah: "shi", dammah: "shu" } },
  { huruf: "ض", nama: "Dhad", bacaan: { fatha: "dha", kasrah: "dhi", dammah: "dhu" } },
  { huruf: "ط", nama: "Tha", bacaan: { fatha: "ta", kasrah: "ti", dammah: "tu" } },
  { huruf: "ظ", nama: "Zha", bacaan: { fatha: "dha", kasrah: "dhi", dammah: "dhu" } },
  { huruf: "ع", nama: "Ain", bacaan: { fatha: "a", kasrah: "i", dammah: "u" } },
  { huruf: "غ", nama: "Ghain", bacaan: { fatha: "gha", kasrah: "ghi", dammah: "ghu" } },
  { huruf: "ف", nama: "Fa", bacaan: { fatha: "fa", kasrah: "fi", dammah: "fu" } },
  { huruf: "ق", nama: "Qaf", bacaan: { fatha: "qa", kasrah: "qi", dammah: "qu" } },
  { huruf: "ك", nama: "Kaf", bacaan: { fatha: "ka", kasrah: "ki", dammah: "ku" } },
  { huruf: "ل", nama: "Lam", bacaan: { fatha: "la", kasrah: "li", dammah: "lu" } },
  { huruf: "م", nama: "Mim", bacaan: { fatha: "ma", kasrah: "mi", dammah: "mu" } },
  { huruf: "ن", nama: "Nun", bacaan: { fatha: "na", kasrah: "ni", dammah: "nu" } },
  { huruf: "ه", nama: "Ha", bacaan: { fatha: "ha", kasrah: "hi", dammah: "hu" } },
  { huruf: "و", nama: "Wau", bacaan: { fatha: "wa", kasrah: "wi", dammah: "wu" } },
  { huruf: "ي", nama: "Ya", bacaan: { fatha: "ya", kasrah: "yi", dammah: "yu" } }
];

let harakatSekarang = null;
let zoomLevel = 1;
let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
let showFavorites = false;


function playDasarAudio(nama) {
  try {
    let folder = "hijaiyah";
    let ext = "mp3";
    let namaFile = nama;

    if (harakatSekarang === "fatha") {
      folder = "Fathah";
      const mappingFathahFile = {
        a: "Alif", ba: "Ba", ta: "Ta", tsa: "tsa", ja: "Jim", ha: "Ha", kha: "Kha", da: "Dal", za: "dzal", ra: "ra", sa: "Sin", sha: "Syin", shad: "Shad", dha: "dhad", tha: "tho", zha: "dhlo", gha: "ga", fa: "fa", qa: "qof", ka: "kaf", la: "lam", ma: "mim", na: "nun", wa: "wawu", ya: "ya"
      };
      let namaHuruf = mappingFathahFile[nama.toLowerCase()] || nama.charAt(0).toUpperCase() + nama.slice(1).toLowerCase();
      const candidates = [
        `Fathah (${namaHuruf})`,
        `Fathah(${namaHuruf})`,
        `Fathah (${namaHuruf.toLowerCase()})`,
        `Fathah(${namaHuruf.toLowerCase()})`,
        `Fathah(${namaHuruf.replace(/'/g, "")})`,
        `Fathah (${namaHuruf.replace(/'/g, "")})`,
        `Fathah(${namaHuruf.replace(/ /g, "")})`,
        `Fathah (${namaHuruf.replace(/ /g, "")})`,
        `Fathah(${namaHuruf.toLowerCase().replace(/ /g, "")})`,
        `Fathah (${namaHuruf.toLowerCase().replace(/ /g, "")})`,
        `Fathah(${namaHuruf.toLowerCase()})`,
        `Fathah(${namaHuruf.toLowerCase()}).m4a`,
        `Fathah (${namaHuruf.toLowerCase()}).m4a`,
        `Fathah(${namaHuruf.toLowerCase()}).mp3`,
        `Fathah (${namaHuruf.toLowerCase()}).mp3`,
      ];
      // Cek satu per satu, hanya play audio pertama yang berhasil, jika tidak ada baru TTS
      function tryPlay(index) {
        if (index >= candidates.length) {
          playTextToSpeech(nama);
          return;
        }
        let pathMp3 = `dub/${folder}/${candidates[index]}.mp3`;
        let pathM4a = `dub/${folder}/${candidates[index]}.m4a`;
        const audioMp3 = new Audio(pathMp3);
        audioMp3.oncanplaythrough = function() {
          audioMp3.play();
        };
        audioMp3.onerror = function() {
          const audioM4a = new Audio(pathM4a);
          audioM4a.oncanplaythrough = function() {
            audioM4a.play();
          };
          audioM4a.onerror = function() {
            tryPlay(index + 1);
          };
        };
        audioMp3.load();
      }
      tryPlay(0);
      return;
    } else if (harakatSekarang === "kasrah") {
      folder = "Kasrah";
      namaFile = `${nama.charAt(0).toUpperCase() + nama.slice(1).toLowerCase()}.Kasrah`;
      ext = "mp3";
    } else if (
      harakatSekarang === "dammah" ||
      harakatSekarang === "dhammah" ||
      harakatSekarang === "dhummah"
    ) {
      folder = "dhummah";
      ext = "aac"; // <--- PENTING! file di folder dhummah .aac
      const mappingDhummah = {
        "Ain": "ain dhummah",
        "Alif": "alif dhommah",
        "Ba": "ba'dhammah",
        "Dha": "dha dhammah",
        "Fa": "fa dhammah",
        "Ghain": "ghain dummah",
        "Ha": "ha dhammah",
        "Jim": "ja dhammah",
        "Kaf": "kaf dhommah",
        "Kha": "kha dhammah",
        "Lam": "lam dhommah",
        "Mim": "mim dhummah",
        "Nun": "nun dhammah",
        "Qaf": "qaf dhammah",
        "Sin": "sin dhammah",
        "Syad": "syad dhummah",
        "Syin": "syin dummah",
        "Ta": "Ta'Dhammah",
        "Tsa": "tsu dhammah",
        "Wau": "waw dhommah",
        "Ya": "ya dhommah",
        "Za": "za dhammah",
        "Zad": "zad dhummah",
      };
      namaFile = mappingDhummah[nama] || nama.toLowerCase() + " dhummah";
    } else {
      // Untuk hijaiyah tanpa harakat
      namaFile = nama.charAt(0).toUpperCase() + nama.slice(1).toLowerCase();
      ext = "m4a"; // khusus hijaiyah
    }

    const audioPath = `dub/${folder}/${namaFile}.${ext}`;
    //alert(audioPath); // aktifkan untuk debug jika perlu

    const audio = new Audio(audioPath);

    audio.play().catch(() => {
      playTextToSpeech(nama);
    });
  } catch (e) {
    playTextToSpeech(nama);
  }
}
function playTextToSpeech(teks) {
  const utterance = new SpeechSynthesisUtterance(teks);
  utterance.lang = "ar-SA";
  speechSynthesis.speak(utterance);
}

document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel");
  const sidebar = document.querySelector(".sidebar");
  const zoomIndicator = document.createElement("div");
  zoomIndicator.className = "zoom-indicator zoom-button";
  document.querySelector("header").appendChild(zoomIndicator);

  function updateZoomIndicator() {
    zoomIndicator.textContent = `Ukuran: ${Math.round(zoomLevel * 100)}%`;
  }

  function renderHuruf() {
    if (showFavorites) return; // Jika di mode favorit, jangan render utama

    carousel.innerHTML = "";
    sidebar.innerHTML = "";
    updateZoomIndicator();

    hijaiyah.forEach((item, index) => {
      const slide = document.createElement("div");
      slide.className = "slide";
      slide.style.fontSize = `${zoomLevel}em`;

      const hurufContainer = document.createElement("div");
      hurufContainer.className = "huruf-container";

      const huruf = document.createElement("h2");
      huruf.textContent = item.huruf;

      const harakatSpan = document.createElement("span");
      harakatSpan.className = "harakat-display";
      harakatSpan.textContent = harakatSekarang ? item.bacaan[harakatSekarang] : "";

      hurufContainer.appendChild(huruf);
      hurufContainer.appendChild(harakatSpan);
      slide.appendChild(hurufContainer);

      const suaraBtn = document.createElement("button");
      suaraBtn.textContent = "🔊 Baca";
      suaraBtn.onclick = () => playDasarAudio(item.nama);
      slide.appendChild(suaraBtn);

      const bookmarkBtn = document.createElement("button");
      bookmarkBtn.className = bookmarks.includes(index) ? "bookmark-btn active" : "bookmark-btn";
      bookmarkBtn.innerHTML = bookmarks.includes(index) ? "★ Favorit" : "☆ Favorit";
      bookmarkBtn.onclick = (e) => {
        e.stopPropagation();
        toggleBookmark(index);
      };
      slide.appendChild(bookmarkBtn);

      carousel.appendChild(slide);

      const navBtn = document.createElement("button");
      navBtn.textContent = item.huruf;
      navBtn.onclick = () => {
        slide.scrollIntoView({ behavior: "smooth" });
      };
      sidebar.appendChild(navBtn);
    });
  }

  function toggleBookmark(index) {
    const bookmarkIndex = bookmarks.indexOf(index);
    if (bookmarkIndex === -1) {
      bookmarks.push(index);
    } else {
      bookmarks.splice(bookmarkIndex, 1);
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    renderHuruf();
  }

  window.gantiHarakat = function (mode) {
    harakatSekarang = harakatSekarang === mode ? null : mode;

    document.querySelectorAll('.harakat-controls button').forEach(btn =>
      btn.classList.remove("active"));
    if (harakatSekarang) {
      document.getElementById(`btn-${mode}`).classList.add("active");
    }

    renderHuruf();
  };

  window.zoomIn = function () {
    zoomLevel = Math.min(2, zoomLevel + 0.2);
    updateZoomIndicator();
    if(!showFavorites) {
      renderHuruf();
    }
  };

  window.zoomOut = function () {
    zoomLevel = Math.max(0.8, zoomLevel - 0.2);
    updateZoomIndicator();
    if(!showFavorites) {
      renderHuruf();
    }
  };

  window.ModeHitam = function () {
    document.body.classList.toggle("dark");
  };

  window.tampilkanFavorit = function () {
  const container = document.getElementById("favoriteSlides");
  const mainCarousel = document.querySelector(".carousel");
  const zoomElements = document.querySelectorAll(".zoom-indicator, .zoom-button");

  // Pastikan bookmark valid
  if (!Array.isArray(bookmarks)) {
    bookmarks = [];
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  // Ambil data huruf yang valid berdasarkan index
  const dataFavorit = bookmarks
    .filter(i => typeof i === "number" && hijaiyah[i])
    .map(i => hijaiyah[i]);

  showFavorites = true;
  container.innerHTML = "";
  container.classList.remove("hidden");
  mainCarousel.classList.add("hidden");
  zoomElements.forEach(el => el.classList.add("hidden"));

  if (dataFavorit.length === 0) {
    // Jika kosong, tampilkan layar hitam
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.style.backgroundColor = "#000";
    slide.innerHTML = `
      <div class="huruf-container">
        <h2 style="color:white; font-size:3rem;">(Kosong)</h2>
        <span class="harakat-display" style="color:gray;">Belum ada huruf favorit</span>
      </div>
    `;
    container.appendChild(slide);
    return;
  }

  // Tampilkan huruf favorit satu per satu
  dataFavorit.forEach(item => {
    const slide = document.createElement("div");
    slide.className = "slide";

    const hurufContainer = document.createElement("div");
    hurufContainer.className = "huruf-container";

    const huruf = document.createElement("h2");
    huruf.textContent = item.huruf;
    

    const harakatSpan = document.createElement("span");
    harakatSpan.className = "harakat-display";
    harakatSpan.textContent = harakatSekarang ? item.bacaan[harakatSekarang] : "";

    hurufContainer.appendChild(huruf);
    hurufContainer.appendChild(harakatSpan);
    slide.appendChild(hurufContainer);

    const suaraBtn = document.createElement("button");
    suaraBtn.textContent = "🔊 Baca";
    suaraBtn.onclick = () => playDasarAudio(item.nama);
    slide.appendChild(suaraBtn);

    container.appendChild(slide);
  });
};


  window.kembaliDariFavorit = function () {
    showFavorites = false;
    document.getElementById("favoriteSlides").classList.add("hidden");
    carousel.classList.remove("hidden");
    document.querySelectorAll('.zoom-indicator, .zoom-button').forEach(el => el.classList.remove("hidden"));
    renderHuruf();
  };

  window.toggleSidebar = function () {
    document.querySelector(".sidebar").classList.toggle("hidden");
  };

  renderHuruf();
});
