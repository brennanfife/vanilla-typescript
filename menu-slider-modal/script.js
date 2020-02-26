var toggle = document.getElementById("toggle");
var closeModal = document.getElementById("close");
var openModal = document.getElementById("open");
var modal = document.getElementById("modal");
// Toggle Nav
toggle.addEventListener("click", function () {
    document.body.classList.toggle("show-nav");
});
// Show modal
openModal.addEventListener("click", function () { return modal.classList.add("show-modal"); });
// Hide modal
closeModal.addEventListener("click", function () {
    return modal.classList.remove("show-modal");
});
// Hide modal on outside click
window.addEventListener("click", function (e) {
    return e.target == modal ? modal.classList.remove("show-modal") : false;
});
