import React, { useContext } from 'react';
import FoodContext from '../../store/FoodContext';
import styled from 'styled-components';
import axios from 'axios';
import { recipesData } from '../../assets/recipes';
import { v4 as uuidv4 } from 'uuid';
import { NavLink } from 'react-router-dom';
import { RiDeleteBinLine } from 'react-icons/ri';
const IngredientsList = () => {
  const { ingredients, removeIngredientHandler, setRecipes, recipes } =
    useContext(FoodContext);
  const findRecipesHandler = async (arr) => {
    try {
      const data = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients?apiKey=83fb69b6993c41ea9203d4ef573034d2&ingredients=${arr.join(
          ','
        )}&number=50`
      );

      let recipesArr = data.data.filter(
        (recipe) => recipe.missedIngredientCount === 0
      );
      if (recipesArr.length === 0) {
        recipesArr = data.data.filter(
          (recipe) => recipe.missedIngredientCount <= 3
        );
      }
      setRecipes(
        recipesArr.sort(
          (a, b) => a.missedIngredientCount - b.missedIngredientCount
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ListSection>
      <ListOfIngredients
        className={ingredients.length > 0 ? 'ingredients_list-visible ' : ''}
      >
        {ingredients.map((item, index) => (
          <li key={uuidv4()}>
            <div className='ingredient_list-container'>
              <p>{item}</p>
              <RiDeleteBinLine onClick={() => removeIngredientHandler(index)} />
            </div>
          </li>
        ))}
      </ListOfIngredients>
      <NavLink
        to='/recipes'
        style={ingredients.length < 1 ? { display: 'none' } : {}}
        className='ingredient_list-a'
        onClick={() => findRecipesHandler(ingredients)}
      >
        Find recipes
      </NavLink>
    </ListSection>
  );
};

export default IngredientsList;

const ListSection = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  min-height: 35%;
  .ingredient_list-a {
    margin-top: 2rem;
    background: #ff7000;
    width: 14rem;
    height: 3rem;
    border: white 2px solid;
    line-height: calc(3rem - 2px);
    text-align: center;
    color: white;
    text-transform: uppercase;
    font-weight: bold;
  }
`;

const ListOfIngredients = styled.ul`
  max-width: 50rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 15rem));

  gap: 5px;
  justify-content: center;
  .ingredient_list-container {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border: 2px white solid;
    border-radius: 10px;
    background: #10a19d;
    color: white;
  }
`;
