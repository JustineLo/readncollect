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
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--black-transparent);
    z-index: 99;
  }
`;

const Container = styled.div`
   {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    width: 30vw;
    height: 25vh;
    background-color: var(--purple-dark);
    color: white;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
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
