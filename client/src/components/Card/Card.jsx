import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BsFillEmojiHeartEyesFill } from 'react-icons/bs';
import FoodContext from '../../store/FoodContext';
const Card = ({ item, getFullRecipe, to }) => {
  return (
    <CardContainer>
      <div className='card-header'>
        <div className='recipe-likes'>
          <BsFillEmojiHeartEyesFill
            style={{
              backgroundColor: 'red',
              color: 'yellow',
              borderRadius: '50%',
            }}
          />
          <p>{item.likes}</p>
        </div>
        <div className='image'>
          <img src={item.image} alt={item.title} />
        </div>
        <h3>{item.title}</h3>
      </div>
      <div className='card-main'>
        <div>
          You have:
          {item?.usedIngredients.map((ingredient, index) => (
            <span
              className='ing_list ing-used'
              style={
                !(index === item.missedIngredients.length - 1)
                  ? { marginRight: '5px' }
                  : {}
              }
            >
              {ingredient.name}
            </span>
          ))}
        </div>
        <div>
          {item?.missedIngredientCount > 0 && 'You miss:'}

          {item?.missedIngredients.map((ingredient, index) => (
            <span
              className='ing-missing ing_list'
              style={
                !(index === item.missedIngredients.length - 1)
                  ? { marginRight: '5px' }
                  : {}
              }
            >
              {ingredient['name']}
            </span>
          ))}
        </div>
        <div>
          {item.unusedIngredients.length > 0 && <span>You don't need:</span>}
          {item?.unusedIngredients.map((ingredient, index) => (
            <span
              className='ing_list ing-unused'
              style={
                !(index === item.unusedIngredients.length - 1)
                  ? { marginRight: '5px' }
                  : {}
              }
            >
              {ingredient.name}
            </span>
          ))}
        </div>
      </div>
      <div className='card-footer'>
        <Link to={`/recipe/${item.id}`}>Cook me!</Link>
      </div>
    </CardContainer>
  );
};

export default Card;

const CardContainer = styled.div`
  height: 35rem;
  background: rgba(255, 255, 255, 0.9);
  display: grid;
  padding: 5px;
  border-radius: 5px;
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
    display: flex;
    height: 80%;
    flex-direction: column;
    justify-content: space-evenly;
    margin-top: 2rem;

    .ing_list {
      border: 2px solid white;
      display: inline-block;
      border-radius: 5px;
      color: white;
      padding: 3px 6px;
    }
    .ing-missing {
      background-color: #dc3535;
    }
    .ing-unused {
      background: #f49d1a;
    }
    .ing-used {
      background: #b01e68;
    }
  }
  .card-footer {
    text-align: center;
    a {
      border: lightgrey solid 2px;
      background: black;
      color: white;
      padding: 4px 10px;
      border-radius: 10px;
    }
  }
`;
