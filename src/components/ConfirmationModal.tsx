import { VscChromeClose } from "react-icons/vsc";
import styled from "styled-components";
import Icon from "./Icon";

interface ModalProps {
  children: React.ReactNode;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Overlay = styled.div`
   {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: var(--background-transparent);
    z-index: 200;
  }
`;

const Container = styled.div`
   {
    position: absolute;
    top: 25%;
    left: 25%;
    transform: translate(-50%, -50%);
    z-index: 200;
    width: 30vw;
    height: auto;
    padding-bottom: 30px;
    background-color: var(--secondary);
    color: var(--black);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border: 3px solid var(--secondary-dark);
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

const ConfirmationModal = ({ children, setOpen }: ModalProps) => {
  return (
    <Overlay>
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
