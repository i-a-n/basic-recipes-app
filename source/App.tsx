import React, { useState } from "react";
import "@elastic/eui/dist/eui_theme_light.css";
import { recipes } from "json-recipes";
//import { Recipe, Ingredient, Creator } from "json-recipes";

import { EuiButton, EuiFlyout, EuiPageTemplate } from "@elastic/eui";
import { PageTemplate } from "./components/PageTemplate";
import { Header } from "./components/Header";
import { Dashboard } from "./containers/Dashboard";
import { Recipe } from "./containers/Recipe";

const App = () => {
  const [selectedRecipe, setSelectedRecipe] = useState("");

  return (
    <PageTemplate>
      <>
        <Header />
        <EuiPageTemplate.Header
          description="it is an app to keep recipes"
          pageTitle="basic recipes app"
          rightSideItems={[<EuiButton>log in</EuiButton>]}
          tabs={[]}
        />
        <Dashboard recipes={recipes} setSelectedRecipe={setSelectedRecipe} />
        {!!selectedRecipe && (
          <EuiFlyout onClose={() => setSelectedRecipe("")}>
            <Recipe recipe={recipes[selectedRecipe]} />
          </EuiFlyout>
        )}
      </>
    </PageTemplate>
  );
};

export default App;
