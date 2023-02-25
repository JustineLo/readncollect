import styled from "styled-components";
import Button from "../components/Button";
import Icon from "../components/Icon";
import { logout } from "../firebase";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { RiScissors2Fill } from "react-icons/ri";
import { CgCollage } from "react-icons/cg";
import { Tooltip } from "react-tooltip";
import AppState from "../state/AppState";
import { useContainer } from "unstated-next";

interface SidebarProps {}

const SidebarContainer = styled.section`
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
          <Icon tooltipContent="Articles" tooltipId="sidebar-tooltip">
            <RiScissors2Fill size="2rem" />
          </Icon>
          <Icon tooltipContent="Collage Builder" tooltipId="sidebar-tooltip">
            <CgCollage size="2rem" />
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
