import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Pagination from "../components/Pagination";
import ProjectsView from "../components/ProjectsView";
import Sectiontitle from "../components/Sectiontitle";
import Spinner from "../components/Spinner";

function Projects() {
  const [portfolios, setPortfoios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [portfoliosPerPage] = useState(9);

  useEffect(() => {
    let mounted = true;
    axios.get("/api/projects").then((response) => {
      if (mounted) {
        setPortfoios(response.data);
      }
    });
    return () => (mounted = false);
  }, []);

  const indexOfLastPortfolios = currentPage * portfoliosPerPage;
  const indexOfFirstPortfolios = indexOfLastPortfolios - portfoliosPerPage;
  const currentPortfolios = portfolios.slice(
    indexOfFirstPortfolios,
    indexOfLastPortfolios
  );

  const paginate = (e, pageNumber) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <Helmet>
        <title>Portfolio - Projects</title>
        <meta
          name="description"
          content=""
        />
      </Helmet>
      <Suspense fallback={<Spinner />}>
        <div className="mi-about mi-section mi-padding-top mi-padding-bottom">
          <div className="container">
            <Sectiontitle title="Projects" />
            {<ProjectsView projects={currentPortfolios} />}
            {!(portfolios.length > portfoliosPerPage) ? null : (
              <Pagination
                className="mt-50"
                itemsPerPage={portfoliosPerPage}
                totalItems={portfolios.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            )}
          </div>
        </div>
      </Suspense>
    </>
  );
}

export default Projects;
