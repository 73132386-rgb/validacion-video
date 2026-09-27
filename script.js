document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("entrevista-video");
  const transcriptSection = document.getElementById("transcript-section");
  const transcriptList = document.getElementById("transcript-list");
  const btnTranscript = document.getElementById("btn-transcript");
  const timeDisplay = document.getElementById("time-display");
  const items = Array.from(transcriptList.querySelectorAll("li"));

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  // Mostrar duración real una vez que el video carga sus metadatos
  video.addEventListener("loadedmetadata", () => {
    timeDisplay.textContent = `00:00 / ${formatTime(video.duration)}`;
  });

  // Mostrar/ocultar la transcripción
  btnTranscript.addEventListener("click", () => {
    const isHidden = transcriptSection.style.display === "none";
    transcriptSection.style.display = isHidden ? "block" : "none";
    btnTranscript.textContent = isHidden ? "Ocultar transcripción" : "Mostrar transcripción";
  });

  // Al hacer clic en una línea, saltar a ese momento del video
  items.forEach((item) => {
    item.addEventListener("click", () => {
      const time = parseFloat(item.dataset.time || "0");
      video.currentTime = time;
      video.play();
    });
  });

  // Actualizar el contador de tiempo y resaltar la línea activa
  video.addEventListener("timeupdate", () => {
    const currentTime = video.currentTime;
    const duration = video.duration || 0;
    timeDisplay.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;

    let activeItem = null;
    items.forEach((item) => {
      const time = parseFloat(item.dataset.time || "0");
      if (currentTime >= time) {
        activeItem = item;
      }
    });

    items.forEach((item) => item.classList.remove("active"));
    if (activeItem) {
      activeItem.classList.add("active");
      activeItem.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  });
});
