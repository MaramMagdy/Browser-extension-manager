window.onload = function () {
  axios.get("./data.json").then((response) => {
    allCards = response.data;
    GetCards("all");
  });
};

function GetCards(status = "all") {
  axios
    .get("./data.json")
    .then((response) => {
      let cards = response.data;
      let container = document.getElementById("all-cards");
      container.innerHTML = "";

      if (status === "active") {
        cards = cards.filter((card) => card.isActive === true);
      } else if (status === "inactive") {
        cards = cards.filter((card) => card.isActive === false);
      }

      for (let card of cards) {
        let isChecked = card.isActive ? "checked" : "";

        container.innerHTML += `
          <div class="extension-card">
            <div class="card-header">
              <div class="logo-img">
                <img src="${card.logo}" alt="" />
              </div>
              <div class="card-title">
                <h5>${card.name}</h5>
                <p>${card.description}</p>
              </div>
            </div>

            <div class="card-actions d-flex justify-content-between align-items-center">
              <button class="remove">Remove</button>

              <div class="form-check form-switch">
                <input 
                  class="form-check-input"
                  type="checkbox"
                  ${isChecked}
                />
              </div>
            </div>
          </div>
        `;
      }
    })
    .catch((error) => {
      console.error("Error fetching JSON:", error);
    });
}

function toggleTheme() {
  const body = document.body;
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  body.setAttribute("data-theme", newTheme);
  document.getElementById("theme-toggle").src =
    newTheme === "light"
      ? "assets/images/icon-moon.svg"
      : "assets/images/icon-sun.svg";
}
