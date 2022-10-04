import { Layout } from "common/ui";

export default function DashboardPage() {
  return (
    <Layout>
      <Layout.Header>
        <p className="font-bold">Mission Control</p>
      </Layout.Header>
      <Layout.Main>
        <p>Welcome!</p>
      </Layout.Main>
    </Layout>
  );
}

