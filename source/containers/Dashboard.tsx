import React, { useState } from "react";
import {
  EuiPageTemplate,
  EuiFlexGrid,
  EuiFlexItem,
  EuiCard,
  EuiFlexGroup,
  EuiButtonIcon,
  EuiSpacer,
} from "@elastic/eui";
import { Recipe as RecipeType } from "json-recipes";
import { ListView } from "../components/ListView";

export const Dashboard = ({
  recipes,
  setSelectedRecipe,
}: {
  recipes: { [key: string]: RecipeType };
  setSelectedRecipe: (recipeTitle: RecipeType["title"]) => void;
}) => {
  const [selectedView, setSelectedView] = useState("grid");

  return (
    <EuiPageTemplate.Section>
      <EuiFlexGroup gutterSize="xs" responsive={false} justifyContent="flexEnd">
        <EuiFlexItem grow={false}>
          <EuiButtonIcon
            display={selectedView === "grid" ? "base" : "empty"}
            iconType="grid"
            onClick={() => setSelectedView("grid")}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButtonIcon
            display={selectedView === "list" ? "base" : "empty"}
            iconType="list"
            onClick={() => setSelectedView("list")}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer />
      {selectedView === "list" ? (
        <ListView recipes={recipes} setSelectedRecipe={setSelectedRecipe} />
      ) : (
        <EuiFlexGrid columns={4}>
          {Object.keys(recipes)
            .sort()
            .map((recipeName) => (
              <EuiFlexItem key={recipeName} grow={true}>
                <EuiCard
                  textAlign="left"
                  image={`images/${recipeName}.jpg`}
                  title={recipes[recipeName].title}
                  description={recipes[recipeName].description}
                  onClick={() => setSelectedRecipe(recipeName)}
                />
              </EuiFlexItem>
            ))}
        </EuiFlexGrid>
      )}
    </EuiPageTemplate.Section>
  );
};
