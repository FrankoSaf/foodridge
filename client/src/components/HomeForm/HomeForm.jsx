import React, { useContext } from 'react';
import FoodContext from '../../store/FoodContext';
import styled from 'styled-components';
const HomeForm = () => {
  const {
    setIngredients,
    ingredients,
    ingredient,
    onChangeHandler,
    addIngredientHandler,
    errorMessage,
  } = useContext(FoodContext);
  return (
    <FormContainer>
      <form onSubmit={addIngredientHandler}>
        <div className='site_title'>
          <h1>Welcome to Foodrige</h1>
          <p>Create delicious meals from ingredients in your fridge</p>
        </div>
        {errorMessage && <p className='error_message'>{errorMessage}</p>}
        <input
          type='text'
          name='ingredients'
          id='ingredients'
          value={ingredient}
          onChange={(e) => onChangeHandler(e)}
          placeholder='Add ingredient one by one'
        />
        <input type='submit' value='Add' />
      </form>
    </FormContainer>
  );
};

export default HomeForm;

const FormContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  margin: 0 auto;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    input[type='text'] {
      width: 30rem;
      height: 4rem;
      outline: none;
      border-radius: 10px;
      border: none;
      &:focus {
        border: #f0d0b2 5px solid;
      }
    }
    .error_message {
      color: #f07c7c;
      font: 2rem bold;
    }
    & > * {
      margin-bottom: 1rem;
    }
    input[type='submit'] {
      padding: 0.7rem 2rem;
      background: transparent;
      border: white 5px solid;
      color: white;
      border-radius: 5px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.1s;
      &:active {
        box-shadow: 4px 4px 5px grey, -4px 4px 5px grey;
        transform: translateY(5px) scale(0.95);
      }
    }
  }
  .site_title {
    text-align: center;
    h1 {
      color: white;
      font-size: 8rem;
    }
    p {
      color: white;
      font-size: 2rem;
    }
  }
`;
