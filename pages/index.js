import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Head>
        <title>United Nations Super Heroes Fund</title>
        <meta
          name="description"
          content="A simple dashboard for managing heros"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="home-page">
        <div className="container vh-100 d-flex justify-content-center align-items-center text-white">
          <div className="text-center">
            <h2 className="welcome-message mb-3">
              Welcome to the United Nations Super Heroes Fund dashboard
            </h2>
            <Link href="/heros">
              <a className="btn btn-primary">Dashboard</a>
            </Link>
          </div>
        </div>
      </div>

      <footer></footer>
    </div>
  );
}
