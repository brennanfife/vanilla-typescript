var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var container = document.querySelector(".container");
var seats = document.querySelectorAll(".row.seat:not(.occupied)");
var count = document.getElementById("count");
var total = document.getElementById("total");
var movieSelect = document.getElementById("movie");
populateUI();
var ticketPrice = +movieSelect.value; //+ will change it to number
// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
}
// Update total and count
function updateSelectedCount() {
    var selectedSeats = document.querySelectorAll(".row .seat.selected");
    var selectedSeatsArray = Array.prototype.slice.call(selectedSeats);
    var seatsArray = Array.prototype.slice.call(seats);
    var seatsIndex = __spreadArrays(selectedSeatsArray).map(function (seat) {
        return __spreadArrays(seatsArray).indexOf(seat);
    });
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
    var selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount.toString();
    total.innerText = (selectedSeatsCount * ticketPrice).toString();
}
// Get data from localStorage and populate UI
function populateUI() {
    var selectedSeats = JSON.parse(localStorage.getItem("selectedSeats") || "{}");
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach(function (seat, index) {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected");
            }
        });
    }
    var selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = +selectedMovieIndex;
    }
}
// Movie Select Event
movieSelect.addEventListener("change", function (e) {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex.toString(), e.target.value);
    updateSelectedCount;
});
// Seat click event
container.addEventListener("click", function (e) {
    if (e.target.classList.contains("seat") &&
        !e.target.classList.contains("occupied")) {
        e.target.classList.toggle("selected");
        updateSelectedCount();
    }
});
// Initial Count and total set
updateSelectedCount();
