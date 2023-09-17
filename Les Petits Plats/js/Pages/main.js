// Importation des modules pour l'affichage des recettes
import { displayRecipes } from '../Templates/RecipeDisplay.js';
import { recipesArray } from '../Api/ApiRecipes.js';


/**
 * Fonction d'initialisation de l'affichage des recettes.
 */
function init() {
    displayRecipes(recipesArray); // Affiche toutes les recettes au chargement de la page
}

init(); // Appel de la fonction d'initialisation