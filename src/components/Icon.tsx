import styled from "styled-components";

interface IconButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  tooltipId?: string;
  tooltipContent?: string;
  backgroundColor?: string;
  opacity?: number;
  disabled?: boolean;
}

const IconButtonContainer = styled.button<{
  backgroundColor: string | undefined;
  opacity: number | undefined;
  disabled: boolean | undefined;
}>`
  padding: 0;
  margin: 0;
  border: none;
  background: ${(props) => props.backgroundColor || "none"};
  outline: none;
  cursor: ${(props) => (props.onClick ? "pointer" : "default")};
  padding: 8px;
  height: fit-content;
  border-radius: 50%;
  opacity: ${(props) => props.opacity || 1};

  svg {
    color: ${(props) => (props.disabled ? "var(--grey)" : "var(--black)")};
  }

  &:hover {
    svg {
      color: ${(props) =>
        props.disabled ? "var(--grey)" : "var(--secondary-light)"};
    }
  }
`;

const Icon = ({
  children,
  onClick,
  tooltipId,
  tooltipContent,
  backgroundColor,
  opacity,
  disabled,
}: IconButtonProps) => {
  return (
    <IconButtonContainer
      onClick={onClick}
      backgroundColor={backgroundColor}
      opacity={opacity}
      disabled={disabled}
      data-tooltip-id={tooltipId}
      data-tooltip-content={tooltipContent}
      data-tooltip-place="right"
    >
      {children}
    </IconButtonContainer>
  );
};

export default Icon;
