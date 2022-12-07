import React, { createContext, useState } from 'react';

const FoodContext = createContext();
export const FoodContextProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  console.log(ingredients);
  const onChangeHandler = (e) => {
    setIngredient(e.target.value);
  };
  const addIngredientHandler = (e) => {
    e.preventDefault();
    if (ingredient.split('').some((item) => !isNaN(parseInt(item)))) {
      setErrorMessage(
        "Sadly, we don't know any ingredient that includes a number"
      );
    } else if (ingredients.includes(ingredient)) {
      setErrorMessage('Ingredient already listed');
    } else if (ingredient.trim().length === 0) {
      setErrorMessage('Is your fridge empty?');
    } else {
      setIngredients((pre) => [...pre, ingredient]);
      setIngredient('');
      setErrorMessage();
    }
  };
  const removeIngredientHandler = (idx) => {
    setIngredients(ingredients.filter((item, index) => index !== idx));
  };
  return (
    <FoodContext.Provider
      value={{
        ingredients,
        setIngredients,
        ingredient,
        setIngredient,
        onChangeHandler,
        addIngredientHandler,
        errorMessage,
        removeIngredientHandler,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};

export default FoodContext;
