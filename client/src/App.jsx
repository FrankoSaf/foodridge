import React, { useContext } from 'react';
import Home from './components/HomeForm/Home';
import { Routes, Route, NavLink } from 'react-router-dom';
import FoodContext from './store/FoodContext';
import { Recipes } from './components/Recipes/Recipes';
import Recipe from './components/Recipes/Recipe';
import { AiFillHome } from 'react-icons/ai';
const App = () => {
  const { recipes } = useContext(FoodContext);
  return (
    <>
      <NavLink
        to='/'
        style={{
          position: 'fixed',
          top: '5px',
          zIndex: '1000',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'gold',
          fontSize: '4rem',
          border: '3px solid gold',
          borderRadius: '50%',
          width: '6rem',
          textAlign: 'center',
        }}
      >
        <AiFillHome />
      </NavLink>
      <Routes>
        <Route path='/' element={<Home />} />;
        {recipes?.length > 0 && <Route path='/recipes' element={<Recipes />} />}
        <Route path='recipe/:recipeId' element={<Recipe />} />
      </Routes>
    </>
  );
};

export default App;
