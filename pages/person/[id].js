import React from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import sanity from "../../lib/sanity";
import listStyles from "../../styles/list";
import imageUrlFor from "../../utils/imageUrlFor";

const personsQuery = `*[_type == "person"] { _id }`;

const singlePersonQuery = `*[_type == "person" && _id == $id] {
  _id,
  name,
  image,
  "actedIn": *[_type == "movie" && references(^._id)] {
    _id,
    title,
    releaseDate,
    poster
  }
}[0]
`;

const Person = ({ person }) => {
  return (
    <Layout>
      <div className="person">
        <div>
          {person.image && <img src={imageUrlFor(person.image).height(500)} />}
        </div>
        <div>
          <h1 className="title">{person.name}</h1>
          <h2>Related movies</h2>
          <ul className="list">
            {(person.actedIn || []).map(movie => (
              <li key={movie._id}>
                <Link href="/movie/[id]" as={`/movie/${movie._id}`}>
                  <a className="link">
                    {movie.poster && (
                      <img
                        src={imageUrlFor(movie.poster)
                          .ignoreImageParams()
                          .height(500)}
                      />
                    )}
                    <span>
                      {movie.title} ({movie.releaseDate.substr(0, 4)})
                    </span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <style jsx>{`
        .person {
          margin: 1rem;
          display: grid;
          grid-gap: 1rem;
          grid-template-columns: 1fr 4fr;
        }

        .person .title {
          font-size: 10vw;
          line-height: 1em;
          margin: 0;
        }

        .person__header {
          clear: both;
          overflow: hidden;
          padding: 0.5rem;
        }

        .person__header > h1 {
          font-size: 3rem;
          line-height: 1em;
          margin: 1rem 0 0 0;
          padding: 0;
        }

        .person__header > img {
          display: block;
          width: 20vw;
          max-width: 20rem;
          height: auto;
          float: left;
          margin-right: 0.5rem;
        }

        .link {
          cursor: pointer;
        }

        .person .list {
          grid-template-columns: repeat(auto-fit, minmax(100px, 180px));
        }
      `}</style>
      <style jsx>{listStyles}</style>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  // Get the paths we want to pre-render based on persons
  const persons = await sanity.fetch(personsQuery);
  const paths = persons.map(person => ({
    params: { id: person._id }
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

// This function gets called at build time on server-side.
export const getStaticProps = async ({ params }) => {
  const person = await sanity.fetch(singlePersonQuery, { id: params.id });
  return { props: { person } };
};

export default Person;
