import React from "react";

const Home = ({ repositories }) => (
  <main>
    <h4>
      <strong>Projetos do GitHub</strong>
    </h4>
    <div className="cards">
      {repositories
        .filter((r) => r.created_at >= "2018-01-01T23:47:50Z" && !r.private)
        .sort((a, b) => {
          if (a.created_at > b.created_at) {
            return 1;
          }
          if (a.created_at < b.created_at) {
            return -1;
          }
          // a must be equal to b
          return 0;
        })
        .reverse()
        .map((repo) => {
          return (
            <div key={repo.id} className="card">
              <a href={repo.html_url}>
                <h1>{repo.name}</h1>
                <h3>{repo.description}</h3>
                <p>
                  {repo.language} {repo.created_at}
                </p>
              </a>
            </div>
          );
        })}
    </div>
  </main>
);

Home.getInitialProps = async () => {
  const response = await fetch(
    "https://api.github.com/users/gabrieljony/repos"
  );
  const repositories = await response.json();
  return { repositories };
};

export default Home;
