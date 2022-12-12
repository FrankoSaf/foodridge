import React, { createContext, useEffect, useState } from 'react';
import { recipesData } from '../assets/recipes';
import { fullIngredientsList } from '../assets/api/ingredients';
import useLocalStorage from 'use-local-storage';
import axios from 'axios';
const FoodContext = createContext();

export const FoodContextProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const [recipes, setRecipes] = useLocalStorage('recipes', []);
  const [searchIngredient, setSearchIngredient] = useState({
    list: [],
    open: false,
  });
  const [recipe, setRecipe] = useLocalStorage('recipe', {});
  const arrayOfIdValues = [];
  const filterDuplicateIngredient = fullIngredientsList
    .sort((a, b) => a.ingredient.length - b.ingredient.length)
    .reduce((acc, item) => {
      if (arrayOfIdValues.includes(item.ingredientId)) {
        return acc;
      } else {
        arrayOfIdValues.push(item.ingredientId);
        return [...acc, item];
      }
    }, []);

  const onChangeHandler = (e) => {
    setSearchIngredient((pre) => ({ ...pre, open: true }));
    setIngredient(e.target.value);
  };
  useEffect(() => {
    if (ingredient.length > 2 && searchIngredient.open) {
      setSearchIngredient((pre) => ({
        ...pre,
        list: filterDuplicateIngredient.filter((item) =>
          item.ingredient.toLowerCase().includes(ingredient.toLowerCase())
        ),
        open: true,
      }));
    } else {
      setSearchIngredient({ list: [], open: false });
    }
  }, [ingredient]);

  const addIngredientHandler = (e) => {
    e.preventDefault();
    if (ingredient.split('').some((item) => !isNaN(parseInt(item)))) {
      setErrorMessage(
        "Sadly, we don't know any ingredient that includes a number"
      );
    } else if (ingredients.includes(ingredient.toLowerCase())) {
      setErrorMessage('Ingredient already listed');
    } else if (ingredient.trim().length === 0) {
      setErrorMessage('Is your fridge empty?');
    } else if (
      filterDuplicateIngredient.filter(
        (item) =>
          item.ingredient.toLowerCase().trim() ===
          ingredient.toLowerCase().trim()
      ).length === 0
    ) {
      setErrorMessage('No ingredient found');
    } else if (ingredients.length === 10) {
      setErrorMessage("You don't need this app, your fridge is full");
    } else {
      setIngredients((pre) => [...pre, ingredient.toLowerCase()]);
      setIngredient('');
      setErrorMessage();
    }
  };
  const removeIngredientHandler = (idx) => {
    setIngredients(ingredients.filter((item, index) => index !== idx));
  };
  const getFullRecipe = async (link) => {
    try {
      const data = await axios.get(link);
      console.log(data.data);
      setRecipe(data.data);
    } catch (e) {
      console.error(e);
    }
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
        recipes,
        setRecipes,
        searchIngredient,
        setSearchIngredient,
        recipe,
        getFullRecipe,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};

export default FoodContext;
