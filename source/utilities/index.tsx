import { Recipe } from "json-recipes";

interface LabelCount {
  label: string;
  count: number;
}

export const countLabelsInRecipes = (recipes: {
  [key: string]: Recipe;
}): LabelCount[] => {
  // Object to hold the count of each label
  const labelCounts: { [key: string]: number } = {};

  // Iterate over all recipes
  Object.values(recipes).forEach((recipe) => {
    // Ensure labels exist and are iterable
    if (recipe.labels && recipe.labels.length) {
      recipe.labels.forEach((label) => {
        // If the label hasn't been counted yet, initialize to 1, otherwise increment
        if (!(label in labelCounts)) {
          labelCounts[label] = 1;
        } else {
          labelCounts[label]++;
        }
      });
    }
  });

  // Transform the object into an array of objects with the structure { label: string, count: number }
  const result: LabelCount[] = Object.keys(labelCounts).map((label) => ({
    label,
    count: labelCounts[label],
  }));

  return result;
};
