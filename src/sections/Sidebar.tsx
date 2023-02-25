import styled from "styled-components";
import Button from "../components/Button";
import Icon from "../components/Icon";
import { logout } from "../firebase";
import { MdAccountCircle } from "react-icons/md";
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
  gap: 1rem;
`;

const Sidebar = ({}: SidebarProps) => {
  const { user } = useContainer(AppState);
  return (
    <>
      <SidebarContainer>
        <Button onClick={logout}>Logout</Button>
        <Icon
          tooltipContent={`Connected as ${user?.email}`}
          tooltipId="user-tooltip"
        >
          <MdAccountCircle size="2rem" />
        </Icon>
      </SidebarContainer>
      <Tooltip id="user-tooltip" />
    </>
  );
};

export default Sidebar;
