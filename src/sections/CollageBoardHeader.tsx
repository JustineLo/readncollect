import { Dispatch, SetStateAction } from "react";
import { AiOutlineBlock } from "react-icons/ai";
import { FiSave } from "react-icons/fi";
import { GrTextAlignLeft } from "react-icons/gr";
import { IoMdAddCircle } from "react-icons/io";
import { TiExport } from "react-icons/ti";
import styled from "styled-components";
import Button from "../components/Button";
import Icon from "../components/Icon";

interface CollageBoardHeaderProps {
  blocView: boolean;
  setBlocView: Dispatch<SetStateAction<boolean>>;
  handleSave: () => void;
  disableSave: boolean;
  setDisplayNewCollageModal: Dispatch<SetStateAction<boolean>>;
  title: string;
}

const TopButtons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    gap: 20px;
    align-items: center;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2rem 0 1rem 0;
`;

const CollageBoardHeader = ({
  blocView,
  setBlocView,
  handleSave,
  setDisplayNewCollageModal,
  disableSave,
  title,
}: CollageBoardHeaderProps) => {
  return (
    <>
      <TopButtons>
        <h1>Collage Factory</h1>
        <div>
          <Icon
            color="var(--primary-dark)"
            hoverColor="var(--primary-text)"
            onClick={() => setDisplayNewCollageModal(true)}
          >
            <IoMdAddCircle size="30px" />
          </Icon>
          <Button
            onClick={() => setBlocView(!blocView)}
            square={true}
            backgroundColor="transparent"
          >
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              {blocView ? "Switch to text" : "Switch to blocs"}
              {blocView ? <GrTextAlignLeft /> : <AiOutlineBlock size="16px" />}
            </div>
          </Button>
        </div>
      </TopButtons>

      <Header>
        <h3>{title}</h3>
        <div style={{ display: "flex", gap: "10px" }}>
          <Icon
            onClick={handleSave}
            opacity={disableSave ? 0.5 : 1}
            backgroundColor="var(--secondary)"
            hoverColor="var(--secondary-light)"
            color="var(--primary-text)"
            disabled={disableSave}
          >
            <FiSave size="20px" />
          </Icon>
          <Icon
            color="var(--black)"
            hoverColor="var(--secondary-dark)"
            onClick={() => {}}
          >
            <TiExport size="20px" />
          </Icon>
        </div>
      </Header>
    </>
  );
};

export default CollageBoardHeader;
