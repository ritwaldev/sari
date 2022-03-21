import Navbar from "../components/Navbar";

import Table from "../components/table/Table";

import Footer from "../components/Footer";

const heros = () => {
  return (
    <div className="heros-page">
      {/* <HerosFilter /> */}

      <div className="container-fluid bg-white shadow-sm mb-5">
        <div className="container">
          <Navbar />
        </div>
      </div>

      <div className="body container-fluid position-relative ">
        <div className="container mb-4">
          <h2>Heros</h2>
        </div>
        <div className="container mb-5">
          <div className="rounded-4 bg-white">
            <Table />
          </div>
        </div>
      </div>

      <div className="container-fluid border-top bg-light">
        <div className="container ">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default heros;
