import { VscChromeClose } from "react-icons/vsc";
import styled from "styled-components";
import Icon from "./Icon";

interface ModalProps {
  children: React.ReactNode;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  margin?: string
}

const Overlay = styled.div<{margin?: string}>`
   {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: var(--background-transparent);
    z-index: 200;
    display: flex;
    justify-content: center;
    margin: ${props => props.margin};
  }
`;

const Container = styled.div`
   {
    width: 90vw;
    height: 240px;
    padding-bottom: 30px;
    background-color: var(--secondary);
    color: var(--black);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border: 3px solid var(--secondary-dark);
    margin-top: 50px;

    @media (min-width: 768px) {
      width: 30vw;
      margin-top: 15vh;
    }
  }
`;

const Topbar = styled.div`
   {
    display: flex;
    justify-content: flex-end;
    padding: 15px 30px 0 0;
    width: 100%;
    height: 10%;
  }
`;

const Body = styled.div`
   {
    height: 90%;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 10%;
    align-items: center;
    justify-content: center;
  }

  p {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 500;
    font-family: Poppins;
  }

  span {
    font-style: italic;
    font-size: 0.8rem;
    padding-bottom: 10px;
  }
`;

const ConfirmationModal = ({ children, setOpen, margin }: ModalProps) => {
  return (
    <Overlay margin={margin}>
      <Container>
        <Topbar>
          <Icon onClick={() => setOpen(false)}>
            <VscChromeClose size="2rem" />
          </Icon>
        </Topbar>
        <Body>{children}</Body>
      </Container>
    </Overlay>
  );
};

export default ConfirmationModal;
