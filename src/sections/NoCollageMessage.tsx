import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
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
