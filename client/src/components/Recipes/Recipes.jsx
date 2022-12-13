import React, { useContext } from 'react';
import styled from 'styled-components';
import FoodContext from '../../store/FoodContext';
import Card from '../Card/Card';
export const Recipes = () => {
  const { recipes, getFullRecipe } = useContext(FoodContext);
  return (
    <section>
      <RecipesList
        style={
          recipes.length === 1
            ? {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
              }
            : {}
        }
      >
        {recipes.map((item) => (
          <li>
            <Card
              item={item}
              onClick={() => {
                getFullRecipe(
                  `https://api.spoonacular.com/recipes/${item.id}/information?apiKey=83fb69b6993c41ea9203d4ef573034d2&includeNutrition=true`
                );
              }}
              to={`/recipe/${item.title.split(' ').join('_')}`}
            />
          </li>
        ))}
      </RecipesList>
    </section>
  );
};
const RecipesList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(32rem, 34rem));
  gap: 10px;
  width: 100%;
  height: 100%;
  padding: 10px;
  justify-content: space-around;
`;
