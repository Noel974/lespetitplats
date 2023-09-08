// dataService.js
class DataService {
    constructor(jsonDatas) {
      this.jsonDatas = jsonDatas;
    }
  
    async fetchData() {
      try {
        const response = await fetch(this.jsonDatas);
  
        if (!response.ok) {
          if (response.status === 404) throw new Error('Aucun fichier trouvé');
        }
      } catch (e) {
        console.error(e);
      }
  
      const response = await fetch(this.jsonDatas);
      const datas = await response.json();
  
      return datas;
    }
  }
  
  export {DataService};
  
  // ingredientService.js
  class IngredientService {
    static getFullIngredients(recipesArray) {
      const ingredientsArray = [];
  
      recipesArray.forEach((recipeObject) => {
        const { ingredients } = recipeObject;
        ingredients.forEach((ingredientObject) => {
          const { ingredient } = ingredientObject;
  
          if (!ingredientsArray.includes(ingredient.toLowerCase())) {
            ingredientsArray.push(ingredient.toLowerCase());
          }
        });
      });
  
      return { ingredients: ingredientsArray };
    }
  }
  
  export {IngredientService};
  
  // applianceService.js
  class ApplianceService {
    static getFullAppliance(recipesArray) {
      const appliancesArray = [];
  
      recipesArray.forEach((recipe) => {
        const { appliance } = recipe;
  
        if (!appliancesArray.includes(appliance.toLowerCase())) {
          appliancesArray.push(appliance.toLowerCase());
        }
      });
  
      return { appliances: appliancesArray };
    }
  }
  
  export {ApplianceService};
  
  // ustensilService.js
  class UstensilService {
    static getFullUstensils(recipesArray) {
      const ustensilsArray = [];
  
      recipesArray.forEach((recipe) => {
        const { ustensils } = recipe;
        ustensils.forEach((ustensil) => {
          if (!ustensilsArray.includes(ustensil.toLowerCase())) {
            ustensilsArray.push(ustensil.toLowerCase());
          }
        });
      });
  
      return { ustensils: ustensilsArray };
    }
  }
  
  export {UstensilService} ;
  