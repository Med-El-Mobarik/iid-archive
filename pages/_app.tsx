import { Provider } from "next-auth/client";
import NProgress from "nprogress";
import Router from "next/router";
import "nprogress/nprogress.css";
import "./file.css";

import "../styles/globals.css";
import type { AppProps } from "next/app";

// NProgress.

NProgress.configure({
  minimum: 0.3,
  easing: "ease",
  speed: 800,
  showSpinner: false,
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;
