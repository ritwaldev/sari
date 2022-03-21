// Import Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// Import main stylesheet
import "../styles/globals.css";

// Import Layout
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
