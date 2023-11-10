// Importation des classes et fonctions nécessaires depuis d'autres fichiers
import { SearchFromDeleteLabel, SearchFromFilter, SearchListInput } from "./SearchManagent.js";
import {Normalized} from './Normalized.1.js';
import { updateRecipes } from '../Templates/RecipeDisplay.js';
import {recipesArray} from '../Api/ApiRecipes.js';
import {Label} from './Label.js';
// Sélection des éléments HTML à utiliser pour la gestion des filtres
const filterIngredientsList = document.getElementById('ingredientsList');
const filterApplianceList = document.getElementById('appliancesList');
const filterUstensilsList = document.getElementById('ustensilsList');
const filterZones = document.querySelectorAll('.filterBtn');
const mainInput = document.getElementById('mainSearchInput');

/** Classe Filter */
class Filter {
  constructor(name, type) {
    this.NAME = name;
    this.TYPE = type;
    this.RAWNAME = this.NAME.charAt(0).toUpperCase() + this.NAME.slice(1);
    this.NORMALIZED = Normalized(this.RAWNAME);
    this.ID = `Filter-${this.NORMALIZED}`;
    this.LABELID = `label-${this.NORMALIZED}`;
    this.ELEMENT = null;
    this.ICON = null;
    this.ISACTIVE = false;
    this.LIST = document.getElementById(`${this.TYPE}List`);
    this.SetFilter();
  }

  // Crée un élément HTML pour le filtre
  SetFilter() {
    this.ELEMENT = document.createElement('div');
    this.ELEMENT.setAttribute('id', this.ID);
    this.ELEMENT.setAttribute('data-Normalized', this.NORMALIZED);
    this.ELEMENT.setAttribute('data-name', this.RAWNAME);
    this.ELEMENT.setAttribute('data-type', this.TYPE);
    this.ELEMENT.innerHTML = `<p class='FilterName'>${this.RAWNAME}</p><i class="fa-solid fa-circle-xmark filter-Icon"></i`;
    this.ELEMENT.classList.add('filterOption');
    this.ICON = this.ELEMENT.querySelector('.filter-Icon');
    this.AddToList();
    this.AddListeners();
  }

  // Ajoute un écouteur d'événement pour le clic et le survol du filtre
  AddListeners() {
    this.ELEMENT.addEventListener('click', (e) => {
      e.stopPropagation();
      this.ISACTIVE = this.ELEMENT.classList.contains('active');

      if (!this.ISACTIVE) {
        this.SetActive();
      } else if (this.ISACTIVE && e.target.classList.contains('filter-Icon')) {
        this.SetInactive();
      }
    });

    if (!this.ISACTIVE) {
      this.ELEMENT.addEventListener('mouseover', () => {
        this.ELEMENT.classList.add('hovered');
      });

      this.ELEMENT.addEventListener('mouseout', () => {
        this.ELEMENT.classList.remove('hovered');
      });
    }
  }

  // Ajoute l'élément à la liste correspondante
  AddToList() {
    const existingElement = this.GetExistingElement();
  
    if (!existingElement) {
      if (this.TYPE === 'ingredients') {
        filterIngredientsList.appendChild(this.ELEMENT);
      } else if (this.TYPE === 'appliances') {
        filterApplianceList.appendChild(this.ELEMENT);
      } else if (this.TYPE === 'ustensils') {
        filterUstensilsList.appendChild(this.ELEMENT);
      }
    }
  }
  
  GetExistingElement() {
    // Recherche un élément avec le même ID
    if (this.TYPE === 'ingredients') {
      return filterIngredientsList.querySelector(`[id="${this.ID}"]`);
    } else if (this.TYPE === 'appliances') {
      return filterApplianceList.querySelector(`[id="${this.ID}"]`);
    } else if (this.TYPE === 'ustensils') {
      return filterUstensilsList.querySelector(`[id="${this.ID}"]`);
    }
  }

  // Active le filtre
  SetActive() {
    this.ELEMENT.classList.add('active');
    this.ToggleLabel();
    SearchAndUpdate(this.NAME, this.TYPE, recipesArray);
  }

  // Désactive le filtre
  SetInactive() {
    if (this.ELEMENT) {
      this.ELEMENT.classList.remove('active');
      this.ToggleLabel();
    }

    const updatedRecipes = SearchFromDeleteLabel(recipesArray, Normalized(mainInput.value));
    updateRecipes(updatedRecipes);
    UpdateFilters(updatedRecipes);
    RestoreActive();
  }

  // Gère l'étiquette du filtre
  ToggleLabel() {
    const labelElement = document.getElementById(this.LABELID);
    console.log(this.LABELID);

    if (!labelElement) {
      const labelToAdd = new Label(this.NAME, this.TYPE);
      labelToAdd.setLabel();
      labelToAdd.toggleMount();
  
      const labelIcon = labelToAdd.ELEMENT.querySelector('.label-Icon');
      labelIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        this.SetInactive();
      });
    } else {
      labelElement.remove();
    }
    }
  }

filterZones.forEach((btn) => {
  const input = btn.querySelector('input');
  const list = btn.querySelector('.filterList');

  console.log('Button:', btn);

  input.addEventListener('click', (e) => {
      e.stopPropagation();
      input.focus();
  });

  input.addEventListener('keyup', () => {
      const filtersArray = Array.from(list.querySelectorAll('.filterOption'));
      SearchListInput(filtersArray, input.value);
  });

  btn.addEventListener('click', (e) => {
      e.stopPropagation();
      
      // Vérifier si le bouton cliqué est actuellement actif
      const isActive = btn.classList.contains('active');

      // Fermer tous les filtres actifs
      const allActiveFilters = document.querySelectorAll('.filter.active');
     

      // Si le bouton n'était pas actif, l'ouvrir
      if (!isActive) {
          const btnID = btn.id.replace('Filter', ''); 
          allActiveFilters.forEach(filter => {
          const filterID = filter.id.replace('Filter', '');
          toggleList(filterID);
      });
          toggleList(btnID);
      } else {
          // Si le bouton était actif, le fermer
          toggleList(btn.id.replace('Filter', ''));
      } 
  });
  // Vérifier si le bouton cliqué est actuellement actif
  const isActive = btn.classList.contains('active');

  // Fermer tous les filtres actifs
  const allActiveFilters = document.querySelectorAll('.filter.active');

  // Ajoutez des console.log pour afficher des informations
  console.log('Clicked button:', btn);
  console.log('Active:', isActive);
  console.log('All active filters:', allActiveFilters);
});

document.querySelector('html').addEventListener('click', (e) => {
  const activeFilter = document.querySelector('.filter.active');
  const activeBtnID = activeFilter?.id.replace('Filter', '');

  if (activeFilter) {
    if (e.target.id !== activeFilter.id) {
      // Si l'élément cliqué n'est pas le filtre actif
      toggleList(activeBtnID); // Ferme le filtre actif
    } else if (
      e.target.classList.contains('filter:not(active)')       
    ) {
      // Si l'élément cliqué est un filtre
      toggleList(activeBtnID); // Ferme le filtre actif
      toggleList(e.target.id); // Ouvre le filtre inactif sur lequel l'utilisateur a cliqué
    }
  }
});

function SearchAndUpdate(name, type, recipes) {
  const updatedRecipes = SearchFromFilter(recipes, (recipe) =>
    recipe.ingredients.some((ingr) => Normalized(ingr.ingredient) === name)
  );
  console.log('Filtered Recipes:', updatedRecipes);
  updateRecipes(SearchFromFilter(name, type, recipes));
  UpdateFilters(SearchFromFilter(name, type, recipes));
  RestoreActive();

}

function toggleList(FilterID) {
  const list = document.getElementById(`${FilterID}List`);
  const btn = document.getElementById(`${FilterID}`);
  const zone = document.getElementById(`${FilterID}Filter`);
  const input = list.firstElementChild.querySelector('input');

  list.classList.toggle('active');
  list.classList.toggle('hidden');
  btn.classList.toggle('active');
  zone.classList.toggle('active');
  btn.querySelector('i').classList.toggle('fa-chevron-down');
  btn.querySelector('i').classList.toggle('fa-chevron-up');
  if (list.classList.contains('active')) {
    input.value = '';
  }
}
function RestoreActive() {
  const CurrentLabels = document.querySelectorAll('.labels');
  const CurrentFilters = document.querySelectorAll('.filterOption');

  if (CurrentLabels) {
    for (const CurrentLabel of CurrentLabels) {
      const NormalizedLabel = CurrentLabel.getAttribute('data-normalized');

      for (const CurrentFilter of CurrentFilters) {
        const NormalizedFilter = CurrentFilter.getAttribute('data-normalized');

        if (NormalizedLabel === NormalizedFilter) {
          CurrentFilter.classList.add('active');
        }
        console.log('CurrentLabels:', CurrentLabels);
console.log('CurrentFilters:', CurrentFilters);
console.log('NormalizedLabel:', NormalizedLabel);
console.log('NormalizedFilter:', NormalizedFilter);
      }
    }
  }
}

/** Fonction qui crée tous les filtres.
 * @param {Array} Array - Le tableau contenant les filtres à créer
 */
function GetAllFilters(Array) {
  Array.forEach((obj) => {
    const arrayName = Object.keys(obj)[0];
    const arrayFilter = Object.values(obj)[0].sort((a, b) => a.localeCompare(b));

    const list = document.getElementById(`${arrayName}List`);
    const oldActualFilters = list.querySelectorAll('.filterOption');
    oldActualFilters.forEach((oldActualFilter) => { oldActualFilter.remove(); });

    GetFilters({ [arrayName]: arrayFilter });
  });
}

/** Fonction qui crée un filtre pour un objet donné.
 * @param {Object} Obj - L'objet pour lequel on veut créer un filtre
 */
function GetFilters(Obj) {
  const arrayName = Object.keys(Obj)[0];
  const arrayFull = Object.values(Obj)[0].sort((a, b) => a.localeCompare(b));

  for (const ActualFilter of arrayFull) {
    const isExist = document.getElementById(`${ActualFilter}Filter`);
    if (!isExist) {
      const filter = new Filter(ActualFilter, arrayName);
      filter.SetFilter();
    }
  }
}


function UpdateFilters(UpdatedFilter) {
  const NewappliancesArray = [];
  const NewIngredientsArray = [];
  const NewUstensilesArray = [];

  for (const recipe of UpdatedFilter) {
    const { appliance, ingredients, ustensils } = recipe;
    const normalizedAppliance = Normalized(appliance);

    if (!NewappliancesArray.includes(normalizedAppliance)) {
      NewappliancesArray.push(appliance.toLowerCase());
    }

    for (const ingredient of ingredients) {
      const normalizedIngredient = Normalized(ingredient.ingredient);
      const loweredIngr = ingredient.ingredient.toLowerCase();
      if (!NewIngredientsArray.includes(normalizedIngredient)) {
        NewIngredientsArray.push(loweredIngr);
      }
    }

    for (const ustensil of ustensils) {
      const normalizedUstensil = Normalized(ustensil);

      if (!NewUstensilesArray.includes(normalizedUstensil)) {
        NewUstensilesArray.push(ustensil.toLowerCase());
      }
    }
  }

  const finalAppliancesArray = [...new Set(NewappliancesArray)];
  const finalIngredientsArray = [...new Set(NewIngredientsArray)];
  const finalUstensilesArray = [...new Set(NewUstensilesArray)];

  console.log("finalAppliancesArray:", finalAppliancesArray);
  console.log("finalIngredientsArray:", finalIngredientsArray);
  console.log("finalUstensilesArray:", finalUstensilesArray);

  const UpdatedFilterApplicances = { 'appliances': finalAppliancesArray };
  const UpdatedFilterIngredients = { 'ingredients': finalIngredientsArray };
  const UpdatedFilterUstensiles = { 'ustensils': finalUstensilesArray };
  const UpdatedActualFilter = [UpdatedFilterIngredients, UpdatedFilterApplicances, UpdatedFilterUstensiles];

  console.log("UpdatedActualFilter:", UpdatedActualFilter);

  GetAllFilters(UpdatedActualFilter);
}
// Exportation des fonctions pour les rendre disponibles dans d'autres fichiers
export { GetAllFilters, GetFilters, UpdateFilters, SearchAndUpdate };