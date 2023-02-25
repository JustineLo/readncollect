import { FaRegClipboard } from "react-icons/fa";
import { MdAccountCircle, MdLogout, MdSpaceDashboard } from "react-icons/md";
import { RiScissors2Fill } from "react-icons/ri";
import { Tooltip } from "react-tooltip";
import styled from "styled-components";
import { useContainer } from "unstated-next";
import Icon from "../components/Icon";
import { logout } from "../firebase";
import AppState from "../state/AppState";

interface SidebarProps {}

const SidebarContainer = styled.nav`
  height: 100vh;
  width: 6vw;
  background: var(--purple-medium-transparent);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5rem;
  padding: 5rem 0;
  box-sizing: border-box;
`;

const PageIcons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
`;

const Sidebar = ({}: SidebarProps) => {
  const { user } = useContainer(AppState);
  return (
    <>
      <SidebarContainer>
        <Icon
          tooltipContent={`Connected as ${user?.email}`}
          tooltipId="sidebar-tooltip"
        >
          <MdAccountCircle size="2rem" />
        </Icon>
        <PageIcons>
          <Icon tooltipContent="Dashboard" tooltipId="sidebar-tooltip">
            <MdSpaceDashboard size="2rem" />
          </Icon>
          <Icon tooltipContent="Articles" tooltipId="sidebar-tooltip">
            <RiScissors2Fill size="2rem" />
          </Icon>
          <Icon tooltipContent="Collage Builder" tooltipId="sidebar-tooltip">
            <FaRegClipboard size="2rem" />
          </Icon>
        </PageIcons>
        <Icon
          onClick={logout}
          tooltipContent="Logout"
          tooltipId="sidebar-tooltip"
        >
          <MdLogout size="1.5rem" />
        </Icon>
      </SidebarContainer>
      <Tooltip id="sidebar-tooltip" />
    </>
  );
};

export default Sidebar;
