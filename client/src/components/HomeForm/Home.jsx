import React from 'react';
import HomeForm from './HomeForm';
import IngredientsList from './IngredientsList';
import styled from 'styled-components';
import backgroundImage from '../../assets/images/tamanna-rumee-cvq_8XHp2rM-unsplash.jpg';
const Home = () => {
  return (
    <>
      <HomeSection>
        <HomeForm />
        <IngredientsList />
      </HomeSection>
    </>
  );
};

export default Home;
const HomeSection = styled.section`
  overflow: hidden;

  height: 100vh;
  display: flex;
`;
