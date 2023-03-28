import styled from "styled-components";

interface IconButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  tooltipId?: string;
  tooltipContent?: string;
  backgroundColor?: string;
  opacity?: number;
  disabled?: boolean;
  color?: string;
  hoverColor?: string;
}

const IconButtonContainer = styled.button<{
  backgroundColor: string | undefined;
  opacity: number | undefined;
  disabled: boolean | undefined;
  color: string | undefined;
  hoverColor: string | undefined;
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
    color: ${(props) => (props.disabled ? "var(--grey)" : props.color)};
    transition: color 0.2s ease-in-out;

    &:hover {
      color: ${(props) => (props.disabled ? "var(--grey)" : props.hoverColor)};
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
  hoverColor,
  color = "var(--background)",
}: IconButtonProps) => {
  return (
    <IconButtonContainer
      onClick={onClick}
      backgroundColor={backgroundColor}
      opacity={opacity}
      disabled={disabled}
      color={color}
      hoverColor={hoverColor}
      data-tooltip-id={tooltipId}
      data-tooltip-content={tooltipContent}
      data-tooltip-place="right"
    >
      {children}
    </IconButtonContainer>
  );
};

export default Icon;
