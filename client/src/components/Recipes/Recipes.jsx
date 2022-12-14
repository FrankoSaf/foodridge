import React, { useContext } from 'react';
import styled from 'styled-components';
import FoodContext from '../../store/FoodContext';
import Card from '../Card/Card';
export const Recipes = () => {
  const { recipes } = useContext(FoodContext);
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
            <Card item={item}/>
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
  margin-top: 8rem;
  width: 100%;
  height: 100%;
  padding: 10px;
  justify-content: space-around;
`;
