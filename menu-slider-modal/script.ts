const toggle = document.getElementById("toggle") as HTMLButtonElement;
const closeModal = document.getElementById("close") as HTMLButtonElement;
const openModal = document.getElementById("open") as HTMLButtonElement;
const modal = document.getElementById("modal") as HTMLElement;

// Toggle Nav
toggle.addEventListener("click", () => {
  document.body.classList.toggle("show-nav");
});

// Show modal
openModal.addEventListener("click", () => modal.classList.add("show-modal"));

// Hide modal
closeModal.addEventListener("click", () =>
  modal.classList.remove("show-modal")
);

// Hide modal on outside click
window.addEventListener("click", e =>
  e.target == modal ? modal.classList.remove("show-modal") : false
);
