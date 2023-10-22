import React from "react";
import {
  EuiPageTemplate,
  EuiFlexGrid,
  EuiFlexItem,
  EuiCard,
} from "@elastic/eui";
import { Recipe as RecipeType } from "json-recipes";

export const Dashboard = ({
  recipes,
  setSelectedRecipe,
}: {
  recipes: { [key: string]: RecipeType };
  setSelectedRecipe: (recipeTitle: RecipeType["title"]) => void;
}) => (
  <EuiPageTemplate.Section>
    <EuiFlexGrid columns={4}>
      {Object.keys(recipes)
        .sort()
        .map((recipeName) => (
          <EuiFlexItem grow={false} key={recipeName}>
            <EuiCard
              textAlign="left"
              image={`images/${recipeName}.jpg`}
              title={recipes[recipeName].title}
              description={recipeName}
              onClick={() => setSelectedRecipe(recipeName)}
            />
          </EuiFlexItem>
        ))}
    </EuiFlexGrid>
  </EuiPageTemplate.Section>
);
