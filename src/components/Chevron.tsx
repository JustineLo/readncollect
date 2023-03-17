import { HiChevronUp } from "react-icons/hi";
import styled from "styled-components";

interface ChevronProps {
  isDown: boolean;
  size: string;
}

const Container = styled.div<{ isDown: boolean }>`
  transform: ${(props) => (props.isDown ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.2s ease-in-out;
  display: flex;
  align-items: center;
`;

const Chevron = ({ isDown, size }: ChevronProps) => {
  return (
    <Container isDown={isDown}>
      <HiChevronUp size={size} />
    </Container>
  );
};

export default Chevron;
