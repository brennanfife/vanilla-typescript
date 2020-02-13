const container = <HTMLElement>document.querySelector(".container");
const seats = document.querySelectorAll(".row.seat:not(.occupied)");
const count = <HTMLElement>document.getElementById("count");
const total = <HTMLElement>document.getElementById("total");
const movieSelect = <HTMLSelectElement>document.getElementById("movie");

populateUI();

let ticketPrice = +movieSelect.value; //+ will change it to number

// Save selected movie index and price
function setMovieData(movieIndex: string, moviePrice: string) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount.toString();
  total.innerText = (selectedSeatsCount * ticketPrice).toString();
}

// Get data from localStorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(
    localStorage.getItem("selectedSeats") || "{}"
  );
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = +selectedMovieIndex;
  }
}

// Movie Select Event
movieSelect.addEventListener("change", e => {
  ticketPrice = +(<HTMLInputElement>e.target).value;
  setMovieData(
    (<HTMLSelectElement>e.target).selectedIndex.toString(),
    (<HTMLInputElement>e.target).value
  );
  updateSelectedCount;
});

// Seat click event
container.addEventListener("click", e => {
  if (
    (<HTMLElement>e.target).classList.contains("seat") &&
    !(<HTMLElement>e.target).classList.contains("occupied")
  ) {
    (<HTMLElement>e.target).classList.toggle("selected");
    updateSelectedCount();
  }
});

// Initial Count and total set
updateSelectedCount();
