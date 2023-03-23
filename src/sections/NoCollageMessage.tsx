import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10vh;
  gap: 20px;
  text-align: center;

  @media (min-width: 768px) {
    text-align: start;
  }
`;

const NoCollageMessage = () => {
  return (
    <Container>
      <h2>Please select a collage to edit</h2>
      <p>or</p>
      <h3>Create a new collage</h3>
    </Container>
  );
};

export default NoCollageMessage;
