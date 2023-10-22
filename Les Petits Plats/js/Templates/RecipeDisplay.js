// Récupère l'élément de conteneur pour les recettes
const recipeContainer = document.getElementById('recipesCardsContainer');

// Définit une classe Recipe pour créer des objets de recette
class Recipe {
  constructor(id, image, name, servings, ingredients, time, description, appliance, ustensils) {
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

  // Méthode pour créer la carte de recette en HTML
  getCard() {
    const recipeCard = document.createElement('article');
    recipeCard.classList.add('recipeCard');
    recipeCard.id = this.Id;

    // Génère les éléments HTML pour les ingrédients
    const ingredientItems = (this.Ingredients || []).map((ingredient) => {
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

    // Remplit la carte de recette avec les données
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

// Fonction pour mettre à jour le résumé du nombre de recettes affichées
function summarize() {
  const numberOfCards = document.querySelectorAll('.recipeCard').length;
  const resume = document.getElementById('summer');
  resume.innerHTML = numberOfCards > 1 ? `${numberOfCards} recettes` : `${numberOfCards} recette`;
}

// Fonction pour afficher un tableau d'objets de recettes dans le conteneur
function displayRecipes(array) {
  console.log(displayRecipes); // Vérifiez le contenu de array dans la console
  recipeContainer.innerHTML = '';
  for (let i = 0; i < array.length; i++) {
    const recipeData = array[i];
    const recipe = new Recipe(...Object.values(recipeData));
    const recipeDom = recipe.getCard();
    recipeContainer.appendChild(recipeDom);
  }
 
  summarize();
}

// Fonction pour mettre à jour les recettes affichées
function updateRecipes(array) {
  displayRecipes(array);
}

// Exporte les éléments de ce module pour les utiliser ailleurs
export { Recipe, displayRecipes, updateRecipes, summarize };
