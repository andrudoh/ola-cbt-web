// Dependencies
import styled from "styled-components";

export const LayoutStyle = styled.div`
  background-color: var(--bg-color);
  /* background-color: coral; */
  min-height: 100vh;
  /* display: flex; */
  /* gap: 0.5rem; */
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--bg-color);
  margin-left: var(--sidebar-width);
  min-height: 100vh;
`;

export const RightBody = styled.div`
  width: 97%;
  padding: 0.5rem;
  margin: 0 auto;
  /* background-color: red; */
`;
