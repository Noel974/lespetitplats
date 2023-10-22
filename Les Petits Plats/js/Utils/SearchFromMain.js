export function SearchFromMain(ValueToSearch, recipes) {
  return recipes.filter((recipe) => {
    const { ingredients, name, description } = recipe;
    const ToCheck = [
      name,
      description,
      ...ingredients.map((ing) => ing.ingredient),
    ];
    return ToCheck.some((element) =>
      Normalized(element).match(Normalized(ValueToSearch))
    );
  });
}

// Fonction utilitaire pour normaliser les chaînes de caractères (enlever les accents et convertir en minuscules).trim();
import { Normalized } from "./Normalized.1.js";
