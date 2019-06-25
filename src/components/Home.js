import React from 'react';
import CharacterList from '../containers/CharacterList';
import styled from 'styled-components';
import AppNavbar from '../containers/navBarContainer';
import Filter from './filter'

const StyledAppContainer = styled.div`
    text-align: center;
`;



function Home() {
  return (
      <StyledAppContainer>
        <AppNavbar/>
        <Filter/>
        <CharacterList />
      </StyledAppContainer>
  );
}

export default Home;
