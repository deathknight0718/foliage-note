import styled from "@emotion/styled";
import { Typography } from "@mui/material";

const Side = styled.aside`
  background-color: var(--mui-palette-primary-main);
  border-bottom: 1px solid var(--mui-palette-grey-200);
`;

const SideWrapper = styled.div`
  width: calc(var(--mui-spacing) * 16 * 3);
  padding: calc(var(--mui-spacing) * 8) calc(var(--mui-spacing) * 3);
`;

const SideContainer = styled.div`
  border-left: 6px solid var(--mui-palette-primary-contrastText);
`;

const SideTitle = styled(Typography)`
  color: var(--mui-palette-primary-contrastText);
  line-height: calc(var(--mui-spacing) * 8);
`;

const SideContext = styled(Typography)`
  color: var(--mui-palette-primary-contrastText);
  line-height: calc(var(--mui-spacing) * 4);
`;

function Component({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <Side className="hidden 2xl:flex 2xl:flex-row-reverse 2xl:col-span-3">
      <SideWrapper>
        <SideContainer className="flex flex-col items-start p-4">
          <SideTitle id={id} variant="h5">{title}</SideTitle>
          <SideContext variant="body1">{children}</SideContext>
        </SideContainer>
      </SideWrapper>
    </Side>
  );
}

export default Component;
