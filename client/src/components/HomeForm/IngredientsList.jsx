import React, { useContext } from 'react';
import FoodContext from '../../store/FoodContext';
import styled from 'styled-components';
import axios from 'axios';
import { recipesData } from '../../assets/recipes';
import { v4 as uuidv4 } from 'uuid';
import { NavLink } from 'react-router-dom';
const IngredientsList = () => {
  const { ingredients, removeIngredientHandler, setRecipes, recipes } =
    useContext(FoodContext);
  const findRecipesHandler = () => {
    // try {
    //   const data = await axios.get(
    //     `https://api.spoonacular.com/recipes/findByIngredients?apiKey=83fb69b6993c41ea9203d4ef573034d2&&ingredients=${arr.join(
    //       ','
    //     )}&number=100`
    //   );

    let recipesArr = recipesData.filter(
      (recipe) => recipe.missedIngredientCount === 0
    );
    if (recipesArr.length === 0) {
      recipesArr = recipesData.filter(
        (recipe) => recipe.missedIngredientCount <= 3
      );
    }
    setRecipes(recipesArr.sort((recipe) => recipe.missedIngredientCount));
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <ListOfIngredients
      className={ingredients.length > 0 ? 'ingredients_list-visible ' : ''}
    >
      {ingredients.map((item, index) => (
        <li key={uuidv4()}>
          <div className='ingredient_list-container'>
            <p>{item}</p>
            <button onClick={() => removeIngredientHandler(index)}>x</button>
          </div>
        </li>
      ))}
      <NavLink
        to='/recipes'
        className='ingredient_list-a'
        onClick={findRecipesHandler}
      >
        Find recipes
      </NavLink>
    </ListOfIngredients>
  );
};

export default IngredientsList;

const ListOfIngredients = styled.ul`
  background: rgba(0, 0, 0, 0.8);
  width: 0rem;
  height: 60rem;
  color: white;
  align-self: center;
  position: relative;
  box-shadow: -5px 0px 10px grey;
  transition: all 0.5s ease-in-out;
  &.ingredients_list-visible {
    width: 20rem;
    a {
      display: inline-block;
    }
  }
  li {
    padding: 5px;
    text-align: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.8);
    .ingredient_list-container {
      button {
        background: transparent;
        color: white;
        border: none;
        outline: none;
        font-size: 1.6rem;
        cursor: pointer;
      }
      width: 70%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
    }
  }
  .ingredient_list-a {
    position: absolute;
    bottom: 0;
    color: white;
    left: 50%;
    display: none;
    transform: translateX(-50%);
  }
`;
