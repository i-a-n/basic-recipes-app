import { Ingredient, IngredientGroup } from "json-recipes";

export const isIngredientGroup = (
  ingredient: Ingredient | IngredientGroup
): ingredient is IngredientGroup => {
  // Your logic for checking might depend on your actual data structure
  // Here we check if a 'groupName' property exists in the first item, which suggests it's an IngredientGroup
  return (ingredient as IngredientGroup).groupName !== undefined;
};
