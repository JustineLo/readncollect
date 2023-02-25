import { NavLink } from "react-router-dom";
import styled from "styled-components";

interface SidebarIconProps {
  children: React.ReactNode;
  toEndpoint: string;
  tooltipContent?: string;
}

const SidebarIconContainer = styled.button`
  padding: 0;
  margin: 0;
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
`;

const SidebarIcon = ({
  children,
  toEndpoint,
  tooltipContent,
}: SidebarIconProps) => {
  return (
    <NavLink to={toEndpoint}>
      <SidebarIconContainer
        data-tooltip-id="sidebar-tooltip"
        data-tooltip-content={tooltipContent}
        data-tooltip-place="right"
      >
        {children}
      </SidebarIconContainer>
    </NavLink>
  );
};

export default SidebarIcon;
