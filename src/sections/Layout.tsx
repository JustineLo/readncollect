import { BiNotepad } from "react-icons/bi";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { RiScissors2Fill } from "react-icons/ri";
import { Outlet } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import styled from "styled-components";
import { useContainer } from "unstated-next";
import Icon from "../components/Icon";
import SidebarIcon from "../components/SidebarIcon";
import { logout } from "../firebase";
import AppState from "../state/AppState";

const LayoutContainer = styled.div`
   {
    display: flex;
    flex-direction: column;

    @media (min-width: 768px) {
    }
  }
`;

const SidebarContainer = styled.nav`
  background: var(--primary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5%;
  box-sizing: border-box;
  height: 60px;
  width: 100vw;

  @media (min-width: 768px) {
    height: 100vh;
    width: 6vw;
    flex-direction: column;
    padding: 5rem 0;
  }
`;

const PageIcons = styled.div`
  display: flex;
  gap: 30px;
  @media (min-width: 768px) {
    flex-direction: column;
    gap: 10%;
  }
`;

const Layout = () => {
  const { user } = useContainer(AppState);
  return (
    <LayoutContainer>
      <SidebarContainer>
        <SidebarIcon
          toEndpoint="/"
          tooltipContent={`Connected as ${user?.email}`}
        >
          <MdAccountCircle size="32px" />
        </SidebarIcon>
        <PageIcons>
          <SidebarIcon toEndpoint="/articles" tooltipContent="Articles">
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
      <Outlet />
      <Tooltip id="sidebar-tooltip" />
    </LayoutContainer>
  );
};

export default Layout;
