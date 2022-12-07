import React, { useContext } from 'react';
import Home from './components/HomeForm/Home';
import { Routes, Route } from 'react-router-dom';
import FoodContext from './store/FoodContext';
import { Recipes } from './components/Recipes/Recipes';
const App = () => {
  const { recipes } = useContext(FoodContext);
  return (
    <Routes>
      <Route path='/' element={<Home />} />;
      {recipes?.length > 0 && <Route path='/recipes' element={<Recipes />} />}
    </Routes>
  );
};

export default App;
