// Importation des modules
import { displayRecipes, updateRecipes, summarize } from '../Templates/RecipeDisplay.js';
import { recipesArray, ingredientsObject, appliancesObject, ustensilesObject } from '../Api/ApiRecipes.js';
import { SearchFromMain } from '../Utils/SearchFromMain.js';
import { GetAllFilters, UpdateFilters } from "../Utils/Filtre.js";

// Tableau contenant les objets d'ingrédients, d'appareils et d'ustensiles
const fullArray = [ingredientsObject, appliancesObject, ustensilesObject];

// Sélection des éléments HTML du DOM
const mainInput = document.querySelector('#mainSearchInput');
const recipeContainer = document.querySelector('#recipesCardsContainer');
const labelsContainer = document.querySelector('#labelsContainer');
const mainSearchButton = document.querySelector('#mainSearchButton');

// Fonction pour gérer la recherche de recettes
function init() {
  displayRecipes(recipesArray); // Affiche toutes les recettes au chargement de la page
  GetAllFilters(fullArray); // Crée les filtres de recherche.

   // Ajout d'un gestionnaire d'événements au clic du bouton
mainSearchButton.addEventListener('click', () => {
  initSearch();
});

  // Ajout d'un gestionnaire d'événements au clavier
  mainInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Empêche le comportement par défaut du formulaire (rechargement de la page)
      initSearch();
    }
  }) ; 
} 
    
  function initSearch() {
    const updatedFromMain = SearchFromMain(mainInput.value, recipesArray);
    if (mainInput.value.length > 2) {
      if (updatedFromMain.length > 0) {
        labelsContainer.innerHTML = '';
        updateRecipes(updatedFromMain);
        UpdateFilters(updatedFromMain);
      } else {
        recipeContainer.innerHTML = `<p id='errorMsg'>
                                        Aucune recettes ne correspond à <span id="output"></span> 
                                        vous pouvez chercher « tarte aux pommes », « poisson », 
                                        etc.</p>`;
  
        const output = document.querySelector('#output');
        output.textContent = mainInput.value;
  
        summarize();
        UpdateFilters(updatedFromMain);
      }
    } else {
      displayRecipes(recipesArray);
      GetAllFilters(fullArray);
    }
  }
  init();