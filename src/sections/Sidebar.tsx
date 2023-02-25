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

interface SidebarProps {}

const SidebarContainer = styled.nav`
  height: 100vh;
  width: 6vw;
  background: var(--purple-medium-transparent);
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

const Sidebar = ({}: SidebarProps) => {
  const { user } = useContainer(AppState);
  return (
    <>
      <SidebarContainer>
        <SidebarIcon
          toEndpoint="/"
          tooltipContent={`Connected as ${user?.email}`}
        >
          <MdAccountCircle size="2rem" />
        </SidebarIcon>
        <PageIcons>
          <SidebarIcon toEndpoint="/dashboard" tooltipContent="Dashboard">
            <MdSpaceDashboard size="2rem" />
          </SidebarIcon>
          <SidebarIcon toEndpoint="/" tooltipContent="Articles">
            <RiScissors2Fill size="2rem" />
          </SidebarIcon>
          <SidebarIcon toEndpoint="/" tooltipContent="Collage Builder">
            <BiNotepad size="2rem" />
          </SidebarIcon>
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
