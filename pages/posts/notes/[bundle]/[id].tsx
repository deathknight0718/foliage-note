import { Layout, Markdown } from "@foliage-note/components";

function Page() {
  return <Markdown path="notes" />;
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
