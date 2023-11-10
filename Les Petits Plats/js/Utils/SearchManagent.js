import { Normalized } from './Normalized.1.js';

export function SearchFromIngredients(ValueToSearch, Actuals, recipes) {
  const normalizedKeyword = Normalized(ValueToSearch);
  return filterRecipes(recipes, (recipe) =>
    recipe.ingredients.some((ingr) => Normalized(ingr.ingredient) === normalizedKeyword)
  );
}

export function SearchFromUstensils(ValueToSearch, Actuals, recipes) {
  const normalizedKeyword = Normalized(ValueToSearch);
  return filterRecipes(recipes, (recipe) =>
    recipe.ustensils.some((Ustensil) => Normalized(Ustensil) === normalizedKeyword)
  );
}

export function SearchFromAppliances(ValueToSearch, Actuals, recipes) {
  const normalizedKeyword = Normalized(ValueToSearch);
  return filterRecipes(recipes, (recipe) =>
    Normalized(recipe.appliance) === normalizedKeyword
  );
}


export function SearchFromFilter(ValueToSearch, filterZone, recipes) {
  const Actuals = Array.from(document.querySelectorAll(".recipeCard"));
  let UpdatedRecipes;

  if (filterZone === "ingredients") {
    UpdatedRecipes = SearchFromIngredients(ValueToSearch, Actuals, recipes);
  } else if (filterZone === "ustensils") {
    UpdatedRecipes = SearchFromUstensils(ValueToSearch, Actuals, recipes);
  } else if (filterZone === "appliances") {
    UpdatedRecipes = SearchFromAppliances(ValueToSearch, Actuals, recipes);
  }

  return UpdatedRecipes;
}

export function SearchFromDeleteLabel(recipes) {
  const ActualsLabel = Array.from(document.querySelectorAll(".labels"));
  let updatedRecipes = recipes;

  for (const label of ActualsLabel) {
    const name = label.getAttribute("data-normalized");
    const type = label.getAttribute("data-type");

    if (type === "ingredients") {
      updatedRecipes = SearchFromIngredients(name, updatedRecipes, recipes);
    } else if (type === "ustensils") {
      updatedRecipes = SearchFromUstensils(name, updatedRecipes, recipes);
    } else if (type === "appliances") {
      updatedRecipes = SearchFromAppliances(name, updatedRecipes, recipes);
    }
  }

  return updatedRecipes;
}


export function SearchListInput(filters, input) {
  if (input !== 0) {
    for (const filter of filters) {
      const element = filter;
      const normalizedElement = Normalized(element.textContent);
      const normalizedInput = Normalized(input);

      if (!normalizedElement.match(normalizedInput)) {
        element.classList.add("d-none");
        element.classList.remove("d-flex");
      } else {
        element.classList.remove("d-none");
        element.classList.add("d-flex");
      }
    }
  }
}

function filterRecipes(recipes, filterFn) {
  // Check if recipes is an array before applying the filter
  if (!Array.isArray(recipes)) {
    console.error("recipes is not an array");
    return [];
  }
  console.log("recipes is an array:", recipes);
  return recipes.filter(filterFn);
}