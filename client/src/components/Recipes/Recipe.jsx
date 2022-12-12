import React, { useContext, useEffect, useRef, useState } from 'react';
import FoodContext from '../../store/FoodContext';
import { GiHealthPotion, GiStopwatch, GiBlender } from 'react-icons/gi';
import { BsPeopleFill } from 'react-icons/bs';
import styled from 'styled-components';
const Recipe = () => {
  const { recipe } = useContext(FoodContext);
  const [mainNutrients, setMainNutrients] = useState({});
  const {
    extendedIngredients,
    image,
    instructions,
    readyInMinutes,
    servings,
    summary,
    title,
    nutrition,
    preparationMinutes,
    healthScore,
  } = recipe;
  const instructionRef = useRef();
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
  }, []);

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
            <h4>INGREDIENTS</h4>
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
            {instructions.split('\n').map((step) => (
              <li>{step}</li>
            ))}
          </ol>
        </div>

        <div className='nutrition-facts'>
          <h4>NUTRITION FACTS</h4>
          <h5>PER SERVINGS</h5>
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
          </div>
          <p>{mainNutrients['Fat']} g</p>
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
      <div className='recipe-footer'>
        <h4>SIMILAR RECIPES</h4>
      </div>
    </RecipeSection>
  );
};

export default Recipe;

const RecipeSection = styled.section`
  display: grid;
  width: 100%;
  background: grey;
  grid-template-rows: 40rem 60vh 40vh;
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
      width: 50%;
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
    background: red;
    display: grid;
    justify-items: center;
    grid-template-columns: 30rem 1fr;
    grid-template-rows: 1fr 30rem;
    grid-template-areas:
      'ing ins'
      'nut nut';
    width: 60%;
    margin: 10rem auto;
    .ingredients {
      grid-area: ing;
    }
    .nutrition-facts {
      grid-area: nut;
      display: flex;
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
  }
`;
