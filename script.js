// variables
const searchBtn = document.getElementById('btn-search');
const mealList = document.getElementById('list-results');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('close-btn');


// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {});

// get meal list that matches with the ingredients
function getMealList() {
    let notFound = document.getElementById('results-title');
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                <div id="${meal.idMeal}"class="card">
                    <div class="card-img">
                        <img src="${meal.strMealThumb}">
                    </div>
                    <div class="card-name">
                        <h1 class="recipe-name">${meal.strMeal}</h1>
                    </div>
                    <div class="get-recipe">
                        <button class="recipe-btn btn">RECIPE</button>
                    </div>
                </div>`;
                });
                notFound.innerHTML = "Your results:"
                notFound.style = "color: var(--black);"
            } else {
                notFound.innerHTML = "Sorry, we didnt find any match."
                notFound.style = "color: red;"
            }

            mealList.innerHTML = html;
        });
}

// get recipe of the meal
function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.id}`)
            .then(response => response.json())
            .then(data => getModal(data.meals));
    }
}

function getModal(meals) {
    meals = meals[0]
    mealDetailsContent.style = 'display: block'
    let html = `
    <h2 class="meal-name">${meals.strMeal}</h2>
    <div class="meal-type">
    <h3>${meals.strCategory}</h3>
   </div>
   <h1>Instruction</h1>
   <p class="meal-description">${meals.strInstructions}</p>
   <button id="close-btn" class="close-btn">Close</button>
    `;

    mealDetailsContent.innerHTML = html
}