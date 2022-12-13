import React, { useContext, useEffect, useRef, useState } from 'react';
import FoodContext from '../../store/FoodContext';
import { GiHealthPotion, GiStopwatch, GiBlender } from 'react-icons/gi';
import { BsPeopleFill } from 'react-icons/bs';
import styled from 'styled-components';
import useLocalStorage from 'use-local-storage';
import axios from 'axios';
import Card from '../Card/Card';
const Recipe = () => {
  const { recipe, recipes, getFullRecipe } = useContext(FoodContext);
  const [mainNutrients, setMainNutrients] = useState({});
  const [similarRecipe, setSimilarRecipe] = useLocalStorage('similar', []);
  const {
    extendedIngredients,
    image,
    analyzedInstructions,
    readyInMinutes,
    servings,
    summary,
    title,
    nutrition,
    preparationMinutes,
    healthScore,
    id,
  } = recipe;

  useEffect(() => {
    const filterNutrition = nutrition?.nutrients.reduce(
      (acc, item) =>
        item.name === 'Calories' ||
        item.name === 'Fat' ||
        item.name === 'Sugar' ||
        item.name === 'Carbs' ||
        item.name === 'Protein' ||
        item.name === 'Saturated Fat'
          ? { ...acc, [item.name]: item.amount }
          : item.name === 'Carbohydrates'
          ? { ...acc, Carbs: item.amount }
          : acc,
      {}
    );
    setMainNutrients(filterNutrition);
  }, [recipe]);

  return (
    <RecipeSection>
      <div className='recipe-header'>
        <div
          className='image_title'
          style={{
            background: `linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${image})  no-repeat center/cover`,
          }}
        >
          <h2>{title}</h2>
        </div>
        <div className='recipe-infos'>
          <div className='recipe-infos-part'>
            <GiBlender style={{ color: 'grey' }} />
            <h5>PREPARATION</h5>
            <p> {preparationMinutes === -1 ? 20 : preparationMinutes} MIN</p>
          </div>
          <div className='recipe-infos-part'>
            <GiStopwatch style={{ color: 'grey' }} />
            <h5>COOK TIME</h5>
            <p>{readyInMinutes}</p>
          </div>
          <div className='recipe-infos-part'>
            <BsPeopleFill style={{ color: 'grey' }} />
            <h5>SERVES</h5>
            <p>{servings}</p>
          </div>
          <div className='recipe-infos-part'>
            <GiHealthPotion style={{ color: 'grey' }} />
            <h5>HEALTH SCORE</h5>
            <p>{healthScore}</p>
          </div>
        </div>
      </div>
      <div className='recipe-main'>
        <div className='recipe-ingredients'>
          <ul>
            <h4
              style={{
                borderBottom: '1px solid lightgrey',
                textAlign: 'center',
                padding: '10px 0',
              }}
            >
              INGREDIENTS
            </h4>
            {extendedIngredients?.map((ingredient) => {
              return (
                <li>
                  {ingredient.amount}{' '}
                  {ingredient.name[0].toUpperCase() +
                    ingredient.name.slice(1, ingredient.name.length)}
                </li>
              );
            })}
          </ul>
        </div>
        <div className='cooking-instructions'>
          <ol>
            {analyzedInstructions[0].steps.map((step) => (
              <li>
                {step.number} {step.step}
              </li>
            ))}
          </ol>
        </div>
        <div className='nutrition-facts'>
          <div className='facts-title'>
            <h4>NUTRITION FACTS</h4>
            <h5>PER SERVINGS</h5>
          </div>
          <div className='facts-facts'>
            <div className='info-facts'>
              <h5>CALORIES</h5>
              <p>{mainNutrients['Calories']}</p>
            </div>
            <div className='info-facts'>
              <h5>SUGAR</h5>
              <p>{mainNutrients['Sugar']} g</p>
            </div>
            <div className='info-facts'>
              <h5>CARBS</h5>
              <p>{mainNutrients['Carbs']} g</p>
            </div>
            <div className='info-facts'>
              <h5>FAT</h5>
              <p>{mainNutrients['Fat']} g</p>
            </div>
            <div className='info-facts'>
              <h5>SAT FAT</h5>
              <p>{mainNutrients['Saturated Fat']} g</p>
            </div>
            <div className='info-facts'>
              <h5>PROTEIN</h5>
              <p>{mainNutrients['Protein']} g</p>
            </div>
          </div>
        </div>
      </div>
      <div className='recipe-footer'>
        <h4 style={{ textAlign: 'center' }}>SIMILAR RECIPES</h4>
        <ul className='other-recipes'>
          {recipes
            .filter((same) => same.id !== id)
            .slice(0, 5)
            .map((item) => (
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
        </ul>
      </div>
    </RecipeSection>
  );
};

export default Recipe;

const RecipeSection = styled.section`
  display: grid;
  width: 100%;
  background: lightgrey;
  grid-template-rows: 40rem 1fr 50rem;
  grid-template-areas:
    'header'
    'main'
    'footer';

  .recipe-header {
    grid-area: header;
    background: black;
    .image_title {
      height: 80%;
      position: relative;

      h2 {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 3rem;
        text-transform: uppercase;
        width: 40ch;
        text-align: center;
      }
    }
    .recipe-infos {
      width: 80%;
      margin: 0 auto;
      height: 20%;
      display: flex;
      justify-content: space-evenly;
      color: white;

      .recipe-infos-part {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        h5 {
          color: grey;
        }
      }
    }
  }
  .recipe-main {
    grid-area: main;
    display: grid;
    justify-items: center;
    grid-template-columns: 30rem 1fr;
    grid-template-rows: 1fr 30rem;
    grid-template-areas:
      'ing ins'
      'nut nut';
    width: 60%;
    margin: 10rem auto;
    .recipe-ingredients {
      grid-area: ing;
      background: white;

      margin: auto 0;

      ul {
        height: 80%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        li {
          padding: 1rem 4rem;
          font-size: 1.4rem;
          border-bottom: 1px solid lightgrey;
        }
      }
    }
    .nutrition-facts {
      grid-area: nut;
      display: flex;
      flex-direction: column;
      text-align: center;
      margin-top: 8rem;
      width: 100%;

      .facts-facts {
        display: flex;
        width: 70%;
        margin: 0 auto;
        margin-top: 4rem;
        height: 10rem;
        justify-content: space-around;

        .info-facts {
          height: 100%;
          display: grid;
          grid-template-rows: 2.5rem 1fr;
          border: 1px solid black;
          width: 10rem;
          grid-template-areas:
            'titlef'
            'titlenum';

          h5 {
            grid-area: titlef;
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid black;
          }
          p {
            grid-area: titlenum;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
    .cooking-instructions {
      grid-area: ins;
      width: 40rem;
      ol {
        list-style-type: upper-roman;
        li {
          margin: 3rem 0;
        }
      }
    }
  }
  .recipe-footer {
    grid-area: footer;
    .other-recipes {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(32rem, 34rem));
      width: 100%;
      padding: 10px;
      justify-content: space-around;
    }
  }
`;
