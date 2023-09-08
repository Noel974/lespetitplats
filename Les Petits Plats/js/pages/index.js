// Importez la fonction Arecipes depuis le fichier recipes.js
import { Arecipes } from '../utils/recipes.js';

// Attendez que le DOM soit chargé pour appeler Arecipes
document.addEventListener('DOMContentLoaded', () => {
  Arecipes(); // Appelez la fonction pour afficher les "cards"
});
