import citiesData from "./stationsData.js";

const toggleButton = document.getElementById("toggle-station-select-display");

toggleButton.addEventListener("click", () => {
  let citiesContainerDisplay = document.getElementById("cites-container");

  if (citiesContainerDisplay.style.display === "none") {
    citiesContainerDisplay.style.display = "block";
  } else {
    citiesContainerDisplay.style.display = "none";
  }
});

export function setScrollSpeedAll(speed = 100) {
  document.querySelectorAll(".stops-wrapper").forEach((wrapper) => {
    const stops = wrapper.querySelector(".stops");
    const textWidth = stops.scrollWidth;
    const wrapperWidth = wrapper.offsetWidth;

    if (textWidth > wrapperWidth) {
      const distance = textWidth + wrapperWidth;
      const duration = distance / speed;

      stops.style.animation = `scroll-left ${duration}s linear infinite`;
    } else {
      stops.style.animation = "none";
    }
  });
}

// window.addEventListener("load");

window.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".cities");

  citiesData.forEach((city) => {
    const cityDiv = document.createElement("div");
    cityDiv.classList.add("city");

    cityDiv.innerHTML = `
            <img src="${city.image}" alt="${city.name}">
            <div class="city-name">
                <p>${city.name}</p>
                <ul class="stations-list">
                    ${city.stations
                      .map(
                        (station) =>
                          `<li value="${station.value}">${station.name}</li>`
                      )
                      .join("")}
                </ul>
            </div>
        `;

    container.appendChild(cityDiv);
  });
});
