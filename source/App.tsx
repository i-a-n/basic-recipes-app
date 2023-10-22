import React, { useEffect, useState } from "react";
import "@elastic/eui/dist/eui_theme_light.css";
import { recipes, labels, Recipe as RecipeType } from "json-recipes";
//import { Recipe, Ingredient, Creator } from "json-recipes";

import {
  EuiButton,
  EuiFacetButton,
  EuiFacetGroup,
  EuiFlyout,
  EuiPageTemplate,
  EuiSearchBar,
} from "@elastic/eui";
import { PageTemplate } from "./components/PageTemplate";
import { Header } from "./components/Header";
import { Dashboard } from "./containers/Dashboard";
import { Recipe } from "./containers/Recipe";
import { countLabelsInRecipes } from "./utilities";

const App = () => {
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState(recipes); // Assuming recipes is an object
  const [recipeFilters, setRecipeFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // This effect updates filteredRecipes whenever recipeFilters changes
  useEffect(() => {
    let recipesThatMatchedQuery: RecipeType[];
    if (searchQuery) {
      recipesThatMatchedQuery = EuiSearchBar.Query.execute(
        searchQuery,
        Object.values(recipes),
        {
          defaultFields: ["title"],
        }
      );
    }

    const newFilteredRecipes = Object.entries(recipes)
      .filter(([, recipe]) => {
        if (recipeFilters.length === 0) {
          if (!searchQuery) {
            return true; // No filters applied, every recipe should be included
          }
          return recipesThatMatchedQuery.includes(recipe);
        }
        // Assuming labels is an array of strings. The recipe is included if all filters are in the recipe's labels
        return (
          recipe.labels &&
          recipeFilters.some((filter) => recipe.labels?.includes(filter)) &&
          // if there's a query, ensure this recipe was ALSO in those results
          (recipesThatMatchedQuery
            ? recipesThatMatchedQuery.includes(recipe)
            : true)
        );
      })
      .reduce((obj: any, [key, val]) => {
        obj[key] = val;
        return obj;
      }, {});

    setFilteredRecipes(newFilteredRecipes);
  }, [recipeFilters, searchQuery]);

  // build an array of all the labels + their counts
  const labelsArray = countLabelsInRecipes(recipes).sort((a, b) =>
    // this sorts them alphabetically
    a.label.localeCompare(b.label)
  );

  // Handler for facet button clicks
  const handleFacetClick = (label: string) => {
    setRecipeFilters((prevFilters) => {
      // If the filter is already active, remove it from the list
      if (prevFilters.includes(label)) {
        return prevFilters.filter((item) => item !== label);
      } else {
        // Otherwise, add the new filter
        return [...prevFilters, label];
      }
    });
  };

  return (
    <PageTemplate>
      <>
        <Header setSearchQuery={setSearchQuery} />
        <EuiPageTemplate.Header
          description="it is an app to keep recipes"
          pageTitle="basic recipes app"
          tabs={[]}
        />
        <EuiPageTemplate.Section color="plain">
          <EuiFacetGroup layout="horizontal" gutterSize="l">
            {labelsArray.map((label) => (
              <EuiFacetButton
                onClick={() => handleFacetClick(label.label)}
                quantity={label.count}
                isSelected={recipeFilters.includes(label.label)}
              >
                {label.label}
              </EuiFacetButton>
            ))}
          </EuiFacetGroup>
        </EuiPageTemplate.Section>
        <Dashboard
          recipes={filteredRecipes}
          setSelectedRecipe={setSelectedRecipe}
        />
        {!!selectedRecipe && (
          <EuiFlyout onClose={() => setSelectedRecipe("")}>
            <Recipe
              recipeSlug={selectedRecipe}
              recipe={recipes[selectedRecipe]}
            />
          </EuiFlyout>
        )}
      </>
    </PageTemplate>
  );
};

export default App;
