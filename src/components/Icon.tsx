import styled from "styled-components";

interface IconButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  tooltipId?: string;
  tooltipContent?: string;
}

const IconButtonContainer = styled.button`
  padding: 0;
  margin: 0;
  border: none;
  background: none;
  outline: none;
  cursor: ${(props) => (props.onClick ? "pointer" : "default")};
`;

const Icon = ({
  children,
  onClick,
  tooltipId,
  tooltipContent,
}: IconButtonProps) => {
  return (
    <IconButtonContainer
      onClick={onClick}
      data-tooltip-id={tooltipId}
      data-tooltip-content={tooltipContent}
      data-tooltip-place="right"
    >
      {children}
    </IconButtonContainer>
  );
};

export default Icon;
