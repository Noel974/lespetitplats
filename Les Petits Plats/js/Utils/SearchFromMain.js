export function SearchFromMain(ValueToSearch, recipes) {
  // Ajout d'une condition pour la validation automatique
  if (ValueToSearch.length < 3) {
    // Si la longueur de la valeur de recherche est inférieure à trois, retourner un tableau vide
    return [];
  }

  return recipes.filter((recipe) => {
    const { ingredients, name, description } = recipe;
    const ToCheck = [
      name,
      description,
      ...ingredients.map((ing) => ing.ingredient),
    ];

    return ToCheck.some((element) =>
      element.length >= 3 &&
      Normalized(element).includes(Normalized(ValueToSearch))
    );
  });
}

// Fonction utilitaire pour normaliser les chaînes de caractères (enlever les accents et convertir en minuscules).trim();
import { Normalized } from "./Normalized.1.js";
