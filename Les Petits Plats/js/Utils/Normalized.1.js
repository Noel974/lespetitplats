// Fonction utilitaire pour normaliser les chaînes de caractères (enlever les accents et convertir en minuscules)
export function Normalized(str) {
  console.log(str);
  // Étape 1: Normalisation Unicode pour séparer les caractères accentués
  const normalizedStr = str.normalize("NFD");

  // Étape 2: Suppression des marques diacritiques (caractères accentués)
  const withoutDiacritics = normalizedStr.replace(/[\u0300-\u036f]/g, "");

  // Étape 3: Suppression des espaces
  const withoutSpaces = withoutDiacritics.replaceAll(" ", "");

  // Étape 4: Suppression des caractères apostrophe
  const withoutApostrophes = withoutSpaces.replace(/'/g, "");

  // Étape 5: Conversion en minuscules
  const lowercaseStr = withoutApostrophes.toLowerCase();

  // Étape 6: Suppression des espaces en début et en fin de chaîne
  const trimmedStr = lowercaseStr.trim();

  // Renvoie la chaîne normalisée
  return trimmedStr;
}
