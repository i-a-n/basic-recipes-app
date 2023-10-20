import React from "react";
import {
  EuiBadge,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiSpacer,
  EuiText,
  EuiTitle,
} from "@elastic/eui";
import { Recipe as RecipeType, labels } from "json-recipes";
import { isIngredientGroup } from "../utilities";

export const Recipe = ({ recipe }: { recipe: RecipeType }) => {
  // this is complicated by the fact we could be dealing with Ingredients
  // or IngredientGroups. so just for thoroughness, we go through each one
  // and determine which one it is. then push a node up accordingly.
  // wordy, but, whatever.
  const renderIngredients = () => {
    const ingredients: React.ReactElement[] = [];

    recipe.ingredients.forEach((groupOrIngredient, idx) => {
      if (isIngredientGroup(groupOrIngredient)) {
        ingredients.push(
          <span key={idx}>
            <h4>{groupOrIngredient.groupName}</h4>
            {groupOrIngredient.items.map((ingredient, index) => (
              <p key={index}>
                {ingredient.quantity} - {ingredient.name}{" "}
                {ingredient.notes ? `(${ingredient.notes})` : ""}
              </p>
            ))}
          </span>
        );
      } else {
        ingredients.push(
          <p key={idx}>
            {groupOrIngredient.quantity} - {groupOrIngredient.name}{" "}
            {groupOrIngredient.notes ? `(${groupOrIngredient.notes})` : ""}
          </p>
        );
      }
    });

    return ingredients;
  };

  return (
    <>
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="s">
          <h2>{recipe.title}</h2>
        </EuiTitle>

        <EuiSpacer size="xs" />

        <EuiText size="s" color="subdued">
          {`added by ${recipe.creator.username}`}
        </EuiText>

        <EuiSpacer size="xs" />

        {recipe.labels?.map((label, index) => (
          <EuiBadge
            key={label + index}
            color={labels[label]?.color ?? "CCCCCC"}
          >
            {label}
          </EuiBadge>
        ))}
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <EuiText size="s">
          <h3>Ingredients:</h3>
          {renderIngredients()}
        </EuiText>

        <EuiSpacer />

        <EuiText>
          <h3>Instructions:</h3>
          <ol>
            {recipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
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
