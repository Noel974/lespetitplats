import { DataService } from './dataService';
import { IngredientService } from './ingredientService';
import { ApplianceService } from './applianceService';
import { UstensilService } from './ustensilService';

const jsonDatas = './data/recipes.json';

async function fetchDataAndProcess() {
  const dataService = new DataService();
  const recipesArray = await dataService.fetchData(jsonDatas);

  const ingredientsObject = IngredientService.getFullIngredients(recipesArray);
  const appliancesObject = ApplianceService.getFullAppliance(recipesArray);
  const ustensilsObject = UstensilService.getFullUstensils(recipesArray);

  console.log('Données chargées :', recipesArray);
  console.log('Ingrédients :', ingredientsObject);
  console.log('Matériel (appareils) :', appliancesObject);
  console.log('Ustensiles :', ustensilsObject);
}

// Exportez la fonction pour pouvoir l'utiliser ailleurs si nécessaire
export { fetchDataAndProcess };

// Appelez la fonction pour l'exécuter au chargement du module
fetchDataAndProcess();
