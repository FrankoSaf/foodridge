import React, { useContext, useEffect, useRef, useState } from 'react';
import FoodContext from '../../store/FoodContext';
import { GiHealthPotion, GiStopwatch, GiBlender } from 'react-icons/gi';
import { BsPeopleFill } from 'react-icons/bs';
import styled from 'styled-components';
import useLocalStorage from 'use-local-storage';
import axios from 'axios';
import Card from '../Card/Card';
import { useParams } from 'react-router-dom';
const Recipe = () => {
  const { recipe, recipes, setRecipe } = useContext(FoodContext);
  let { recipeId } = useParams();
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
    (async () => {
      const data = await axios.get(
        `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=83fb69b6993c41ea9203d4ef573034d2&includeNutrition=true`
      );
      scrollTo(0, 0);
      setRecipe(data.data);
      const filterNutrition = data.data.nutrition?.nutrients.reduce(
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
    })();
  }, [recipeId]);

  return (
    analyzedInstructions &&
    mainNutrients && (
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
          <div className='cooking-process'>
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
                {analyzedInstructions[0]?.steps?.map((step) => (
                  <li>
                    <span>{step.number}</span> {step.step}
                  </li>
                ))}
              </ol>
            </div>
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
                  <Card item={item} to={`/recipe/${item.id}`} />
                </li>
              ))}
          </ul>
        </div>
      </RecipeSection>
    )
  );
};

export default Recipe;

const RecipeSection = styled.section`
  display: flex;
  flex-direction: column;
  background: lightgrey;
  .recipe-header {
    height: 40rem;
    .recipe-infos {
      width: 100%;
      margin: 0 auto;
      height: 20%;
      display: flex;
      justify-content: space-evenly;
      color: white;
      background: black;
      .recipe-infos-part {
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        h5 {
          color: grey;
          font-size: 1.1rem;
        }
      }
    }
  }
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
      max-width: 40ch;
      text-align: center;
    }
  }
  .recipe-main {
    grid-area: main;
    display: flex;
    width: 100%;
    margin-top: 5rem;
    flex-direction: column;
    .cooking-process {
      display: flex;

      flex-direction: column;
      .cooking-instructions {
        li {
          font-size: 1.6rem;
          margin: 3rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          text-align: center;
          span {
            background: black;
            min-width: 4rem;
            min-height: 4rem;
            color: white;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            border: 2px solid white;
          }
        }
      }
      .recipe-ingredients {
        min-width: 30rem;
        height: 100%;
        margin: 0 auto;
        background: white;
        ul {
          max-height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          margin: 5rem 0;

          li {
            padding: 1rem 4rem;
            font-size: 1.4rem;
            border-bottom: 1px solid lightgrey;
          }
        }
      }
    }
    .nutrition-facts {
      display: flex;
      margin-top: 10rem;
      text-align: center;
      flex-direction: column;
      justify-content: center;
      .facts-facts {
        margin-top: 4rem;
        display: flex;
        gap: 20px;
        justify-content: center;
        flex-wrap: wrap;
        .info-facts {
          width: calc(16rem - 20px);
          height: 10rem;
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
  }
  .recipe-footer {
    grid-area: footer;
    margin-top: 10rem;
    display: flex;
    flex-direction: column;
    gap: 20px;
    .other-recipes {
      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;
      li {
        width: 32rem;
      }
    }
  }
  @media (min-width: 1044px) {
    .recipe-main {
      width: 80%;

      margin: 5rem auto;
      .cooking-process {
        flex-direction: row;

        .cooking-instructions {
          li {
            margin-left: 2rem;
            text-align: left;
            flex-direction: row;
          }
        }
      }
    }
  }
`;
// .recipe-header {
//   grid-area: header;
//   background: black;

//   .image_title {
//     height: 80%;
//     position: relative;

//     h2 {
//       position: absolute;
//       top: 50%;
//       left: 50%;
//       transform: translate(-50%, -50%);
//       color: white;
//       font-size: 3rem;
//       text-transform: uppercase;
//       max-width: 40ch;
//       text-align: center;
//     }
//   }
//   .recipe-infos {
//     width: 80%;
//     margin: 0 auto;
//     height: 20%;
//     display: flex;
//     justify-content: space-evenly;
//     color: white;

//     .recipe-infos-part {
//       height: 100%;
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       justify-content: space-evenly;
//       h5 {
//         color: grey;
//       }
//     }
//   }
// }
// .recipe-main {
//   grid-area: main;
//   display: grid;
//   justify-items: center;
//   grid-template-columns: 30rem 1fr;
//   grid-template-rows: 1fr 30rem;
//   grid-template-areas:
//     'ing ins'
//     'nut nut';
//   width: 100%;
//   margin: 10rem auto;
//   .recipe-ingredients {
//     grid-area: ing;
//     background: white;

//     margin: auto 0;

//     ul {
//       height: 80%;
//       display: flex;
//       flex-direction: column;
//       justify-content: space-around;

//       li {
//         padding: 1rem 4rem;
//         font-size: 1.4rem;
//         border-bottom: 1px solid lightgrey;
//       }
//     }
//   }
//   .nutrition-facts {
//     grid-area: nut;
//     display: flex;
//     flex-direction: column;
//     text-align: center;
//     margin-top: 8rem;
//     width: 100%;

//     .facts-facts {
//       display: flex;
//       width: 70%;
//       margin: 0 auto;
//       margin-top: 4rem;
//       height: 10rem;
//       justify-content: space-around;

//       .info-facts {
//         height: 100%;
//         display: grid;
//         grid-template-rows: 2.5rem 1fr;
//         border: 1px solid black;
//         width: 10rem;
//         grid-template-areas:
//           'titlef'
//           'titlenum';

//         h5 {
//           grid-area: titlef;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border-bottom: 1px solid black;
//         }
//         p {
//           grid-area: titlenum;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
//       }
//     }
//   }
//   .cooking-instructions {
//     grid-area: ins;
//     width: 40rem;
//     ol {
//       list-style-type: upper-roman;
//       li {
//         margin: 3rem 0;
//       }
//     }
//   }
// }
// .recipe-footer {
//   grid-area: footer;
//   .other-recipes {
//     display: grid;
//     grid-template-columns: repeat(auto-fill, minmax(32rem, 34rem));
//     width: 100%;
//     padding: 10px;
//     justify-content: space-around;
//   }
// }
// @media (max-width: 768px) {
//   grid-template-rows: 40rem 1fr 30rem;
//   .recipe-header {
//     .image-title {
//       h2 {
//         font-size: 1.6rem;
//       }
//     }
//   }
//   .recipe-main {
//     display: flex;
//     flex-direction: column;

//   }
// }
