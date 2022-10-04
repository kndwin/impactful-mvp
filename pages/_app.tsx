import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { trpc } from "common/api/hooks";
import { Session } from "next-auth";

function App({
  Component,
  pageProps,
}: AppProps & { pageProps: { session: Session } }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default trpc.withTRPC(App);
