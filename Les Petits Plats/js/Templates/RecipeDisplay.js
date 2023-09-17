const recipeContainer = document.getElementById('recipesCardsContainer');

class Recipe {
  constructor(id, image, name, servings, ingredients, time, description, appliance, ustensils ) {
    this.id = id;
    this.Picture = image;
    this.Ingredients = ingredients; 
    this.Name = name; 
    this.Servings = servings;
    this.CookingTime = time; 
    this.Ustensils = ustensils; 
    this.Appliance = appliance;
    this.Description = description;
  }

  getCard() {
    const recipeCard = document.createElement('article');
    recipeCard.classList.add('recipeCard');
    recipeCard.id = this.Id;

    const ingredientItems = this.Ingredients.map((ingredient) => {
      const ingredientQuantity = ingredient.quantity ? ingredient.quantity : '';
      const ingredientUnit = ingredient.unit ? ingredient.unit : '';
      const ingredientMeasure = `${ingredientQuantity} ${ingredientUnit}`;
      
      return `
        <div class="oneIngredientContainer">
          <p class="ingredientName">${ingredient.ingredient}</p>
          <p class="ingredientMeasure">${ingredientMeasure}</p>
        </div>
      `;
    }).join('');

    recipeCard.innerHTML = `
      <div class="recipePictureContainer">
        <img src="assets/Recipes/${this.Picture}" alt="${this.Name}" class="recipePicture">
        <span class="CookingTime">${this.CookingTime} min</span>
      </div>
      <div class="recipeContent">
        <h2 class="recipeName">${this.Name}</h2>
        <div class="cardTitle">Recette</div>
        <div class="recipeDescription">${this.Description}</div>
        <h3 class="cardSubTitle">Ingrédients</h3>
        <div class="recipeIngredients">
          ${ingredientItems}
        </div>
      </div>
    `;

    return recipeCard;
  }
}

function summarize() {
  const numberOfCards = document.querySelectorAll('.recipeCard').length;
  const resume = document.getElementById('summer');
  resume.innerHTML = numberOfCards > 1 ? `${numberOfCards} recettes` : `${numberOfCards} recette`;
}

function displayRecipes(array) {
  recipeContainer.innerHTML = '';
  array.forEach((recipeData) => {
    const recipe = new Recipe(...Object.values(recipeData));
    const recipeDom = recipe.getCard();
    recipeContainer.appendChild(recipeDom);
  });

  summarize();
}

function updateRecipes(array) {
  displayRecipes(array);
}

export { Recipe, displayRecipes, updateRecipes, summarize };
