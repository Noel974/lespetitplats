// Export de fonctions et de la classe Recipe
export { MRecipe, RecipeDisplay, RecipeUpdater};

// Récupère l'élément HTML qui contiendra les cartes de recettes.
const recipeContainer = document.getElementById('recipesCardsContainer');
// Définition de la classe Recipe (modèle de données pour une recette)
class MRecipe {
  // Constructeur de la classe Recipe
  constructor(
    appliance,        // L'appareil de la recette
    description,      // La description de la recette
    id,               // L'ID de la recette
    image,            // L'image de la recette
    ingredients,      // Les ingrédients de la recette (un tableau d'objets)
    name,             // Le nom de la recette
    servings,         // Le nombre de portions de la recette
    time,             // Le temps de préparation de la recette
    ustensils         // Les ustensiles de la recette (un tableau de chaînes de caractères)
  ) {
    // Initialisation des propriétés de l'objet Recipe
    this.appliance = appliance;            // Stocke l'appareil
    this.description = description;        // Stocke la description
    this.id = id;                          // Stocke l'ID
    this.image = image;                    // Stocke l'image
    this.ingredients = ingredients;        // Stocke les ingrédients
    this.name = name;                      // Stocke le nom
    this.servings = servings;              // Stocke le nombre de portions
    this.cookingTime = time;               // Stocke le temps de préparation
    this.ustensils = ustensils;            // Stocke les ustensiles
  }
  
  getCard() {
    // Création de la carte
    const recipeCard = document.createElement('article');
    recipeCard.classList.add('recipeCard');
    recipeCard.setAttribute('id', this.ID);

    // Création du header
    const recipeImgContainer = document.createElement('div');
    recipeImgContainer.classList.add('recipePictureContainer');
    recipeCard.appendChild(recipeImgContainer);

    // Création du body
    const recipeImg = document.createElement('img');
    recipeImg.setAttribute('src', `assets/recipes/${this.PICTURE}`);
    recipeImg.setAttribute('alt', this.NAME);
    recipeImg.classList.add('recipePicture');
    recipeImgContainer.appendChild(recipeImg);

    // Création encart 'Time'
    const Time = document.createElement('span');
    Time.classList.add('CookingTime');
    Time.textContent = `${this.COOKING_TIME} min`;
    recipeImgContainer.appendChild(Time);

    // Création Contenu Texte
    const recipeContent = document.createElement('div');
    recipeContent.classList.add('recipeContent');
    recipeCard.appendChild(recipeContent);

    // Nom de la recette
    const recipeName = document.createElement('h2');
    recipeName.classList.add('recipeName')
    recipeName.textContent = this.NAME;
    recipeContent.appendChild(recipeName);

    // Titre de division Recette
    const recipeTitle = document.createElement('div');
    recipeTitle.classList.add('cardTitle')
    recipeTitle.textContent = 'Recette';
    recipeContent.appendChild(recipeTitle);

    // Description de la recette
    const recipeDescription = document.createElement('div');
    recipeDescription.classList.add('recipeDescription');
    recipeDescription.textContent = this.DESCRIPTION;
    recipeContent.appendChild(recipeDescription);

    // Titre de division Ingrédients
    const ingredientsTitle = document.createElement('h3');
    ingredientsTitle.classList.add('cardSubTitle');
    ingredientsTitle.textContent = 'Ingrédients';
    recipeContent.appendChild(ingredientsTitle);

    // Création de la liste des ingrédients
    const ingredientsList = document.createElement('div');
    ingredientsList.classList.add('recipeIngredients')
    
    // Boucle pour afficher les ingrédients
    for (let i = 0; i < this.INGREDIENTS.length; i += 1) {
      const ingredientItem = document.createElement('div');
      ingredientItem.classList.add('oneIngredientContainer');
      

      const ingredientName = document.createElement('p');
      ingredientName.classList.add('ingredientName');
      ingredientName.textContent = this.INGREDIENTS[i].ingredient;
      ingredientItem.appendChild(ingredientName);

      recipeContent.appendChild(ingredientsList);

      const ingredientQuantity = this.INGREDIENTS[i].quantity
        ? this.INGREDIENTS[i].quantity
        : '';
      const ingredientUnit = this.INGREDIENTS[i].unit
        ? this.INGREDIENTS[i].unit
        : '';

      const ingredientMesure = `${ingredientQuantity} ${ingredientUnit}`;
      const ingredientMesureElement = document.createElement('p');
      ingredientMesureElement.classList.add('ingredientMesure');
      ingredientMesureElement.textContent = ingredientMesure;
      ingredientItem.appendChild(ingredientMesureElement);
      ingredientsList.appendChild(ingredientItem);}

    return recipeCard;
  }
}

/**
 * Fonction qui affiche les recettes.
 * @param {Array} Array - Tableau d'objets de recettes.
 */
class RecipeDisplay {
  constructor(recipeContainer) {
    this.recipeContainer = recipeContainer;
  }

  displayRecipes(Array) {
    this.recipeContainer.innerHTML = '';
    for (let i = 0; i < Array.length; i += 1) {
      const recipeData = Array[i];
      if (recipeData) {
        const recipe = new MRecipe(
          recipeData.appliance,
          recipeData.description,
          recipeData.id,
          recipeData.image,
          recipeData.ingredients,
          recipeData.name,
          recipeData.servings,
          recipeData.time,
          recipeData.ustensils
        );
        const recipeDom = recipe.getCard();
        this.recipeContainer.appendChild(recipeDom);
      }
    }
  }
}

// Utilisation de la classe RecipeDisplay
const recipeDisplay = new RecipeDisplay(recipeContainer);

// Pour afficher les recettes
recipeDisplay.displayRecipes(Array);

/**
 * Fonction qui met à jour les recettes.
 * @param {Array} Array - Tableau d'objets de recettes.
 */
class RecipeUpdater {
  constructor(recipeContainer) {
    this.recipeContainer = recipeContainer;
  }
}