import styled from "@emotion/styled";

const Container = styled.div`
  padding: calc(var(--mui-spacing) * 8);
  display: flex;
  flex-direction: column;
  gap: calc(var(--mui-spacing) * 2);
  border-bottom: 1px solid var(--mui-palette-grey-200);
  max-width: calc(var(--mui-spacing) * 16 * 9);
`;

function Component({ children }: { children?: React.ReactNode }) {
  return <Container className="col-span-12 2xl:col-span-9">{children}</Container>;
}

export default Component;
