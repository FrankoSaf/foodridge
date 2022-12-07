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
  background: linear-gradient(
      to bottom,
      transparent,
      rgba(0, 0, 0, 0.381),
      rgba(0, 0, 0, 0.552)
    ),
    url(${backgroundImage}) no-repeat center/cover;
  height: 100vh;
  display: flex;
`;
