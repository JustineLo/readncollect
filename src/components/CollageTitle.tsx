import { useState } from "react";
import styled from "styled-components";
import Button from "./Button";

interface CollageTitleProps {
  title: string;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Buttons = styled.div`
  display: flex;
  gap: 1rem;
`;

const TitleText = styled.h3``;

const TitleInput = styled.input``;

const CollageTitle = ({ title }: CollageTitleProps) => {
  const [isInput, setIsInput] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(title);

  return (
    <Container>
      {isInput ? (
        <TitleInput
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      ) : (
        <TitleText>{title}</TitleText>
      )}
      <Buttons>
        <Button onClick={() => setIsInput(!isInput)}>Edit</Button>
        <Button>Delete</Button>
      </Buttons>
    </Container>
  );
};

export default CollageTitle;
