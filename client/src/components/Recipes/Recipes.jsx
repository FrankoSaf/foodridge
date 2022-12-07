import React, { useContext } from 'react';
import styled from 'styled-components';
import FoodContext from '../../store/FoodContext';
import { BsFillEmojiHeartEyesFill } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
export const Recipes = () => {
  const { recipes } = useContext(FoodContext);
  console.log(recipes);
  return (
    <section>
      <RecipesList>
        {recipes.map((recipe) => (
          <li>
            <Card>
              <div className='card-header'>
                <div className='recipe-likes'>
                  <BsFillEmojiHeartEyesFill
                    style={{
                      backgroundColor: 'red',
                      color: 'yellow',
                      borderRadius: '50%',
                    }}
                  />
                  <p>{recipe.likes}</p>
                </div>
                <div className='image'>
                  <img src={recipe.image} alt={recipe.title} />
                </div>
                <h3>{recipe.title}</h3>
              </div>
              <div className='card-main'>
                <p>
                  You have:{' '}
                  {recipe?.usedIngredients
                    .map((ingredient) => ingredient.name)
                    .join(', ')}
                </p>
                <p>
                  You miss:
                  {recipe?.missedIngredients
                    .map((ingredient) => ingredient.name)
                    .join(', ')}
                </p>
                <p>
                  You don't need:
                  {recipe?.unusedIngredients
                    .map((ingredient) => ingredient.name)
                    .join(', ')}
                </p>
              </div>
              <div className='card-footer'>
                <NavLink to={`recipe/${recipe.id}`}>Cook me!</NavLink>
              </div>
            </Card>
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
  justify-content: space-around;
`;
const Card = styled.div`
  height: 35rem;
  background: rgba(255, 255, 255, 0.9);
  display: grid;
  padding: 5px;
  border: 1px solid black;
  grid-template-rows: 12rem 18rem 5rem;
  grid-template-areas:
    'header'
    'main'
    'footer';
  .card-header {
    grid-area: header;
    position: relative;
    .recipe-likes {
      position: absolute;
      display: flex;
      width: 5rem;
      right: 30px;
      top: 5px;
      z-index: 2;
      p {
        font-weight: bold;
        color: white;
        margin-left: 10px;
      }
    }
    h3 {
      position: absolute;
      bottom: 0;
      color: white;
      right: 0;
      left: 0;
      text-align: center;
      width: 90%;
      margin: 0 auto;
    }
    .image {
      width: 90%;
      margin: 0 auto;
      height: 100%;
      background: black;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        opacity: 0.5;
        object-position: center;
        object-fit: cover;
      }
    }
  }
  .card-main {
    width: 90%;
    margin: 0 auto;
  }
`;
