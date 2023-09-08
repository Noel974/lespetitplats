// Importation des modules depuis d'autres fichiers
import { RecipeDisplay } from '../templates/display.js';
import { DataService } from '../Api/data.js';

// Appel de la fonction pour afficher les "cards" au chargement de la page
function Arecipes() {
  RecipeDisplay(DataService); // Affiche toutes les recettes au chargement de la page
  console.log("Les recettes ont été affichées."  +DataService );
}

export { Arecipes };
