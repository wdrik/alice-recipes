import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
  }
  
  body {
    background: ${(props) => props.theme.colors.light};
    color: ${({ theme }) => theme.colors.gray};
    
    font: 400 15px Roboto, sans-serif;
  }
`;
