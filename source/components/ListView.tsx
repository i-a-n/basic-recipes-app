import React, { useEffect, useState } from "react";
import { EuiBasicTable, EuiSpacer, EuiTitle } from "@elastic/eui"; // Assuming you're using Elastic UI. If not, install with `npm install @elastic/eui`.
import { Recipe } from "json-recipes"; // Update with your actual file path.

// Define the props if there's any that the component accepts, if none just use {}
interface ListViewProps {
  recipes: { [key: string]: Recipe };
  setSelectedRecipe: (recipeTitle: Recipe["title"]) => void;
}

export const ListView: React.FC<ListViewProps> = ({
  recipes,
  setSelectedRecipe,
}) => {
  // A state to hold the organized data
  const [sortedRecipes, setSortedRecipes] = useState<Record<string, Recipe[]>>(
    {}
  );

  // Function to organize recipes alphabetically and by the first letter of the title
  const organizeRecipes = (recipesCollection: { [key: string]: Recipe }) => {
    const sorted: Record<string, Recipe[]> = {};

    // Step 1: Alphabetize the recipes object by key name
    const keysAlphabetically = Object.keys(recipesCollection).sort();

    // Step 2: Push each recipe into an array identified by the first character in its title
    for (const key of keysAlphabetically) {
      const recipe = recipesCollection[key];
      const firstLetter = recipe.title[0].toUpperCase();

      if (!sorted[firstLetter]) {
        sorted[firstLetter] = [];
      }

      sorted[firstLetter].push({ ...recipe });
    }

    return sorted;
  };

  useEffect(() => {
    // Organize recipes once when component is mounted
    const organized = organizeRecipes(recipes);
    setSortedRecipes(organized);
  }, [recipes]);

  return (
    <div>
      {Object.entries(sortedRecipes)
        .sort()
        .map(([letter, recipesArray]) => {
          // Step 3: Prepare the items for EuiBasicTable for each letter
          const items = recipesArray.map((recipe) => ({
            title: recipe.title,
            slug: recipe.slug,
          }));

          return (
            <div key={letter}>
              {/* For each array, return the EuiBasicTable */}
              <EuiBasicTable
                responsive={false}
                tableCaption={letter}
                items={items}
                columns={[
                  {
                    field: "title",
                    name: (
                      <EuiTitle>
                        <h3>{letter}</h3>
                      </EuiTitle>
                    ),
                  },
                ]}
                rowProps={(recipeObj: { title: string; slug: string }) => ({
                  onClick: () => {
                    setSelectedRecipe(recipeObj.slug);
                  },
                })}
              />
              <EuiSpacer />
            </div>
          );
        })}
    </div>
  );
};
