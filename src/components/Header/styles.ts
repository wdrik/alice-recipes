import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 72px;
  padding: 12px;
  background: ${({ theme }) => theme.colors.primary};

  @media (max-width: 768px) {
    height: 64px;
  }
`;
