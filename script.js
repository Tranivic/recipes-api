// variables
const searchBtn = document.getElementById('btn-search');
const mealList = document.getElementById('list-results');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('close-btn');


// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

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