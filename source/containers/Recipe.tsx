import React from "react";
import {
  EuiBadge,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiListGroupItem,
  EuiListGroup,
  EuiSpacer,
  EuiSteps,
  EuiText,
  EuiTitle,
} from "@elastic/eui";
import { Ingredient, Recipe as RecipeType, labels } from "json-recipes";

export const Recipe = ({
  recipe,
  recipeSlug,
}: {
  recipe: RecipeType;
  recipeSlug: string;
}) => {
  function getIngredientLabel(ingredient: Ingredient) {
    let boldPart;

    // Check if both quantity and name are present
    if (ingredient.quantity && ingredient.name) {
      boldPart = (
        <>
          <strong>{ingredient.quantity}</strong> {" - "} {ingredient.name}
        </>
      );
    }

    // If only the name is present, display it in strong tags
    if (!ingredient.quantity && ingredient.name) {
      boldPart = <strong>{ingredient.name}</strong>;
    }

    return (
      <>
        {boldPart}
        {ingredient.notes ? (
          <>
            <br />
            <EuiText color="subdued" size="xs">
              {ingredient.notes}
            </EuiText>
          </>
        ) : null}
      </>
    );
  }
  const renderIngredients = () => {
    const ingredients: React.ReactElement[] = [];

    recipe.ingredients.forEach((ingredientGroup, idx) => {
      ingredients.push(
        <span key={idx}>
          {ingredientGroup.groupName ? (
            <h4>{ingredientGroup.groupName}</h4>
          ) : null}
          <EuiListGroup size="s" maxWidth={false}>
            {ingredientGroup.items.map((ingredient, index) => (
              <EuiListGroupItem
                key={index}
                label={getIngredientLabel(ingredient)}
              />
            ))}
          </EuiListGroup>
        </span>
      );
    });

    return ingredients;
  };

  return (
    <>
      <EuiFlyoutHeader hasBorder>
        <EuiFlexGroup>
          <EuiFlexItem grow={false} style={{ maxWidth: "200px" }}>
            <img src={`./images/${recipeSlug}.jpg`} />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiTitle size="s">
              <h2>{recipe.title}</h2>
            </EuiTitle>

            <EuiSpacer size="xs" />

            <EuiText size="s" color="subdued">
              {`added by ${recipe.creator.username}`}
            </EuiText>

            <EuiSpacer size="xs" />

            <div>
              {recipe.labels?.map((label, index) => (
                <EuiBadge
                  key={label + index}
                  color={labels[label]?.color ?? "CCCCCC"}
                >
                  {label}
                </EuiBadge>
              ))}
            </div>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <EuiText size="s">
          <h3>Ingredients:</h3>
          {renderIngredients()}
        </EuiText>

        <EuiSpacer />

        <EuiText>
          <h3>Instructions:</h3>
          <EuiSteps
            titleSize="xs"
            steps={recipe.instructions.map((step, index) => ({
              title: `Step ${index + 1}`,
              children: (
                <EuiText>
                  <p>{step}</p>
                </EuiText>
              ),
            }))}
          />
        </EuiText>

        <EuiSpacer />

        <EuiText>
          <p>
            <strong>Yield:</strong> {recipe.yield}
          </p>
        </EuiText>
      </EuiFlyoutBody>
    </>
  );
};
