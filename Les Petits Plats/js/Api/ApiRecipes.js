

const jsonDatas = './data/recipes.json';

export {recipesArray};
export {ingredientsObject };
export {appliancesObject};
export { ustensilesObject };

const recipesArray = await getDatas();

  // Extraction des ingrédients, des appareils et des ustensiles uniques
  const ingredientsObject = extractUniqueItems(recipesArray, 'ingredients');
  const appliancesObject = extractUniqueItems(recipesArray, 'appliance');
  const ustensilesObject = extractUniqueItems(recipesArray, 'ustensils');

// Fonction asynchrone pour récupérer les données JSON
async function getDatas() {
  try {
    const response = await fetch(jsonDatas);

    if (!response.ok) {
      if (response.status === 404) throw new Error('Aucun fichier trouvé');
    }

    // Convertit la réponse en JSON et la renvoie
    const datas = await response.json();
    return datas;
  } catch (e) {
    console.error(e);
    return null;
  }
}

// Fonction générique pour extraire des éléments uniques d'un tableau de données
function extractUniqueItems(dataArray, key) {
  const uniqueItems = new Set(); // Utilisation d'un ensemble pour garantir l'unicité
  dataArray.forEach((data) => {
    if (Array.isArray(data[key])) { // Vérifie si data[key] est un tableau
      data[key].forEach((item) => {
        if (typeof item === 'string') {
          uniqueItems.add(item.toLowerCase());
        }
      });
    }
  });
  return { [key]: Array.from(uniqueItems) }; // Convertit l'ensemble en tableau et le renvoie dans un objet
}
// Fonction principale, exécutée de manière asynchrone
(async () => {
  const recipesArray = await getDatas();
  if (!recipesArray) {
    return; // Gérer les erreurs ici si nécessaire
  }

  // Affichage des résultats (vous pouvez les utiliser comme bon vous semble)
  console.log('Données des recettes :', recipesArray);
  console.log('Ingrédients uniques :', ingredientsObject);
  console.log('Appareils uniques :', appliancesObject);
  console.log('Ustensiles uniques :', ustensilesObject);
})();
