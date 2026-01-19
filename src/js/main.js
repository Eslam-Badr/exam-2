// #######################  DOMs  ###########################
const toggleLink = document.querySelectorAll(".nav-link");
const mealSections = document.querySelectorAll(".app-section");
const loadingOverlay = document.getElementById("app-loading-overlay");
const areaContainer = document.getElementById("recipes-type");
const searchInput = document.getElementById("search-input");
const categoCards = document.querySelectorAll(".category-card");

// #####################  Lists  ######################
let areaList = [];
let cardListDetails = [];

// ###################  nav toggle  ####################

for (let i = 0; i < toggleLink.length; i++) {
  toggleLink[i].addEventListener("click", (e) => {
    e.preventDefault();

    mealSections.forEach((section) => section.classList.add("loading"));
    for (let j = 0; j < toggleLink.length; j++) {
      toggleLink[j].classList.remove("bg-emerald-50", "text-emerald-700");
      toggleLink[j].classList.add("text-gray-400");
    }

    toggleLink[i].classList.add("bg-emerald-50", "text-emerald-700");
    toggleLink[i].classList.remove("text-gray-400");

    mealSections[i].classList.remove("loading");
  });
}

// #########################  Area  ########################
(async function () {
  loadingOverlay.classList.remove("loading");
  let response = await fetch(
    "https://nutriplan-api.vercel.app/api/meals/areas"
  );

  let areaData = await response.json();

  areaList.push(...areaData.results);

  console.log(areaList);
  loadingOverlay.classList.add("loading");

  function setAreas() {
    let box = "";

    for (let i = 0; i < areaList.length; i++) {
      box += `
      <button
        class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all">
        ${areaList[i].name}
      </button>
      `;
    }
    areaContainer.innerHTML += box;

    const areaContainerBtn = areaContainer.querySelectorAll("button");

    for (let i = 0; i < areaContainerBtn.length; i++) {
      areaContainerBtn[i].addEventListener("click", function () {
        let box = "";

        areaContainerBtn.forEach((btn) =>
          btn.classList.remove(
            "bg-emerald-600",
            "hover:bg-emerald-700",
            "text-white"
          )
        );
        areaContainerBtn.forEach((btn) =>
          btn.classList.add("bg-gray-100", "hover:bg-gray-200", "text-gray-700")
        );

        for (let j = 0; j < cardListDetails.length; j++) {
          const meal = cardListDetails[j];

          if (meal.area.toLowerCase() === this.innerText.toLowerCase()) {
            box += `<div id="recipe-card" class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                  data-meal-id="${meal.id}">
                  <div class="group rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
                    <div class="relative h-48 overflow-hidden">
                      <img
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        src="${meal.thumbnail}"
                        alt="${meal.name}"
                        loading="lazy"
                      />
                      <div class="absolute bottom-3 left-3 flex gap-2">
                        <span class="px-2 py-1 bg-white/90 text-xs font-semibold rounded-full text-gray-700">
                          ${meal.category}
                        </span>
                        <span class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white">
                          ${meal.area}
                        </span>
                      </div>
                    </div>

                    <div class="p-4">
                      <h3 class="text-base font-bold text-gray-900 mb-1 line-clamp-1">
                        ${meal.name}
                      </h3>

                      <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                        Delicious recipe to try!
                      </p>

                      <div class="flex items-center justify-between text-xs">
                        <span class="font-semibold text-gray-900">
                          <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                          ${meal.category}
                        </span>
                        <span class="font-semibold text-gray-500">
                          <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                          ${meal.area}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>`;
          }
          this.classList.remove(
            "bg-gray-100",
            "hover:bg-gray-200",
            "text-gray-700"
          );
          this.classList.add(
            "bg-emerald-600",
            "hover:bg-emerald-700",
            "text-white"
          );
        }
        cardContainer.innerHTML = box;
      });
    }
  }
  setAreas();
})();

// #########################  recipes card ######################

async function recipesCard(foodType) {
  const response = await fetch(
    `https://nutriplan-api.vercel.app/api/meals/filter?category=${foodType}&page=1&limit=25`
  );

  const cardData = await response.json();

  cardListDetails = cardData.results;

  setCard();
}

const cardContainer = document.getElementById("recipes-grid");
function setCard() {
  let box = "";

  for (let i = 0; i < cardListDetails.length; i++) {
    const meal = cardListDetails[i];

    box += `<div id="recipe-card" class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-meal-id="${meal.id}">
             <div class="group rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
        <div class="relative h-48 overflow-hidden">
          <img
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            src="${meal.thumbnail}"
            alt="${meal.name}"
            loading="lazy"
          />
          <div class="absolute bottom-3 left-3 flex gap-2">
            <span class="px-2 py-1 bg-white/90 text-xs font-semibold rounded-full text-gray-700">
              ${meal.category}
            </span>
            <span class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white">
              ${meal.area}
            </span>
          </div>
        </div>

        <div class="p-4">
          <h3 class="text-base font-bold text-gray-900 mb-1 line-clamp-1">
            ${meal.name}
          </h3>

          <p class="text-xs text-gray-600 mb-3 line-clamp-2">
            Delicious recipe to try!
          </p>

          <div class="flex items-center justify-between text-xs">
            <span class="font-semibold text-gray-900">
              <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
              ${meal.category}
            </span>
            <span class="font-semibold text-gray-500">
              <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
              ${meal.area}
            </span>
          </div>
        </div>
      </div>
            </div>`;
  }

  cardContainer.innerHTML = box;
}

// ##################  category  ##################
function categoryCard() {
  recipesCard(categoCards[0].getAttribute("data-category"));

  for (let i = 0; i < categoCards.length; i++) {
    categoCards[i].addEventListener("click", function () {
      const typeFood = categoCards[i].getAttribute("data-category");
      recipesCard(typeFood);
    });
  }
}

categoryCard();

// #####################  search  #####################

searchInput.addEventListener("input", function () {
  let search = searchInput.value;

  let box = "";

  for (let i = 0; i < cardListDetails.length; i++) {
    const meal = cardListDetails[i];

    if (meal.name.toLowerCase().includes(search.toLowerCase())) {
      box += `<div id="recipe-card" class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-meal-id="${meal.id}">
             <div class="group rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
        <div class="relative h-48 overflow-hidden">
          <img
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            src="${meal.thumbnail}"
            alt="${meal.name}"
            loading="lazy"
          />
          <div class="absolute bottom-3 left-3 flex gap-2">
            <span class="px-2 py-1 bg-white/90 text-xs font-semibold rounded-full text-gray-700">
              ${meal.category}
            </span>
            <span class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white">
              ${meal.area}
            </span>
          </div>
        </div>

        <div class="p-4">
          <h3 class="text-base font-bold text-gray-900 mb-1 line-clamp-1">
            ${meal.name}
          </h3>

          <p class="text-xs text-gray-600 mb-3 line-clamp-2">
            Delicious recipe to try!
          </p>

          <div class="flex items-center justify-between text-xs">
            <span class="font-semibold text-gray-900">
              <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
              ${meal.category}
            </span>
            <span class="font-semibold text-gray-500">
              <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
              ${meal.area}
            </span>
          </div>
        </div>
      </div>
            </div>`;
    }

    cardContainer.innerHTML = box;
  }
});
