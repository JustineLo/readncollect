import { BiNotepad } from "react-icons/bi";
import { MdAccountCircle, MdLogout, MdSpaceDashboard } from "react-icons/md";
import { RiScissors2Fill } from "react-icons/ri";
import { Tooltip } from "react-tooltip";
import styled from "styled-components";
import { useContainer } from "unstated-next";
import Icon from "../components/Icon";
import SidebarIcon from "../components/SidebarIcon";
import { logout } from "../firebase";
import AppState from "../state/AppState";

const SidebarContainer = styled.nav`
  height: 100vh;
  width: 6vw;
  background: var(--primary);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 5rem;
  padding: 5rem 0;
  box-sizing: border-box;
`;

const PageIcons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
`;

const Sidebar = () => {
  const { user } = useContainer(AppState);
  return (
    <>
      <SidebarContainer>
        <SidebarIcon
          toEndpoint="/"
          tooltipContent={`Connected as ${user?.email}`}
        >
          <MdAccountCircle size="32px" />
        </SidebarIcon>
        <PageIcons>
          <SidebarIcon toEndpoint="/dashboard" tooltipContent="Dashboard">
            <MdSpaceDashboard size="32px" />
          </SidebarIcon>
          <SidebarIcon toEndpoint="/" tooltipContent="Articles">
            <RiScissors2Fill size="32px" />
          </SidebarIcon>
          <SidebarIcon
            toEndpoint="/collagebuilder"
            tooltipContent="Collage Builder"
          >
            <BiNotepad size="32px" />
          </SidebarIcon>
        </PageIcons>
        <Icon
          onClick={logout}
          tooltipContent="Logout"
          tooltipId="sidebar-tooltip"
        >
          <MdLogout size="24px" />
        </Icon>
      </SidebarContainer>
      <Tooltip id="sidebar-tooltip" />
    </>
  );
};

export default Sidebar;
