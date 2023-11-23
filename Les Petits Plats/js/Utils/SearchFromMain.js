export function SearchFromMain(ValueToSearch, recipes) {
   // Ajout d'une condition pour la validation automatique
   if (ValueToSearch.length < 3) {
    // Si la longueur de la valeur de recherche est inférieure à trois, retourner un tableau vide
    return searchResults;
  }
  const searchResults = [];

  for (const recipe of recipes) {
    const { ingredients, name, description } = recipe;
    const ToCheck = [
      name,
      description,
      ...ingredients.map((ing) => ing.ingredient),
    ];

    for (const element of ToCheck) {
      if (element.length >= 3 && Normalized(element).match(Normalized(ValueToSearch))) {
        searchResults.push(recipe);
        break; // Sortir de la boucle interne une fois qu'une correspondance est trouvée.
      }
    }
  }

  return searchResults;
}
// Fonction utilitaire pour normaliser les chaînes de caractères (enlever les accents et convertir en minuscules).trim();
import { Normalized } from "./Normalized.1.js";
