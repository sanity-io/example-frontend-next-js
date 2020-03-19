import React from "react";
import Link from "next/link";
import BlockContent from "@sanity/block-content-to-react";
import Layout from "../../components/Layout";
import sanity from "../../lib/sanity";
import listStyles from "../../styles/list";
import imageUrlFor from "../../utils/imageUrlFor";

const moviesQuery = `*[_type == "movie"] { _id }`;

const singleMovieQuery = `*[_type == "movie" && _id == $id] {
  _id,
  title,
  overview,
  releaseDate,
  poster,
  "cast": castMembers[] {
    _key,
    characterName,
    "person": person-> {
      _id,
      name,
      image
    }
  }
}[0]
`;

const serializers = {
  types: {
    summaries: props => {
      const { node } = props;
      if (!node) {
        return false;
      }
      const { summaries } = node;
      if (!summaries || summaries.length === 0) {
        return false;
      }
      return (
        <div className="summaries">
          <h2>{node.caption}</h2>
          <ul>
            {summaries.map(summary => {
              return (
                <li key={summary._key}>
                  <BlockContent
                    blocks={summary.summary}
                    serializers={serializers}
                  />
                  — <a href={summary.url}>{summary.author}</a>
                </li>
              );
            })}
          </ul>
          <style jsx>{`
            .summaries {
              clear: both;
              padding: 2em 0 2em;
            }

            .summaries :global(ul) {
              margin: 0;
              padding: 0;
            }

            .summaries :global(li) {
              display: block;
              margin: 0 0 1em;
              padding: 1em 0 2em;
            }

            .summaries :global(li:not(:last-child)) {
              border-bottom: 1px solid #ccc;
            }

            .summaries {
              clear: both;
              padding: 2em 0 2em;
            }

            .summaries :global(li:not(:last-child)) {
              border-bottom: 1px solid #ccc;
            }
          `}</style>
        </div>
      );
    }
  }
};

const Movie = ({ movie }) => {
  const {
    poster: { crop = { left: 0, top: 0 }, hotspot = { x: 0.5, y: 0.5 } }
  } = movie;
  return (
    <Layout>
      <div className="movie">
        <div
          className="header"
          style={{
            backgroundImage: `url(${imageUrlFor(movie.poster)})`,
            backgroundPosition: `${(hotspot.x - crop.left) *
              100}% ${(hotspot.y - crop.top) * 100}%`
          }}
        >
          <div className="header-content">
            <h1>{movie.title}</h1>
          </div>
        </div>

        <div className="content">
          <div className="sidebar">
            <img
              className="poster"
              src={imageUrlFor(movie.poster)
                .ignoreImageParams()
                .width(500)}
              alt={`Movie poster for ${movie.title}`}
            />
          </div>
          <div className="main-content">
            <div className="overview">
              <BlockContent
                blocks={movie.overview}
                serializers={serializers}
                dataset={sanity.clientConfig.dataset}
                projectId={sanity.clientConfig.projectId}
              />
            </div>
            <h2>Cast</h2>
            <ul className="cast-list">
              {movie.cast.map(cast => (
                <li key={cast._key} className="cast-list-item">
                  <Link href="/person/[id]" as={`/person/${cast.person._id}`}>
                    <a className="cast-list-link">
                      <span>
                        {cast.person.image && (
                          <img src={imageUrlFor(cast.person.image).width(64)} />
                        )}
                      </span>
                      <span>
                        <span className="cast-person-name">
                          {cast.person.name}
                        </span>
                        <span className="cast-character-name">
                          {cast.characterName}
                        </span>
                      </span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <style jsx>{`
        .content {
          display: flex;
          flex-direction: column-reverse;
          max-width: 80rem;
          margin: 1rem auto;
          padding: 0 1rem;
        }

        .overview {
          font-size: 1.5em;
        }

        .sidebar {
          position: relative;
          box-sizing: border-box;
          overflow: hidden;
          flex-grow: 1;
        }

        .main-content {
          flex-grow: 3;
        }

        .movie > h2 {
          margin: 2rem 0 0 0;
          padding: 0 0.5rem;
          border-bottom: 1px solid #ccc;
        }

        .poster {
          display: block;
          width: 100%;
        }

        .cast-list img {
          width: 2rem;
          height: auto;
          margin: 0.5rem;
          object-fit: cover;
          display: block;
        }

        .header {
          background-size: cover;
          padding-top: 10rem;
        }

        .header h1 {
          font-size: 10vw;
          line-height: 1em;
          margin: 1rem 0 0 0;
          padding: 0;
        }

        .header > img {
          width: 100%;
          display: block;
        }

        .header .header-content {
          color: #fff;
          text-align: center;
          padding-top: 5em;
          padding-bottom: 2em;
          background-image: linear-gradient(
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.9) 90%
          );
        }

        .cast-list {
          margin: 0;
          padding: 0;
          line-height: 2em;
          margin-bottom: 2rem;
        }

        .cast-list-item {
          display: block;
          margin: 0;
          padding: 0;
        }

        .cast-list-link {
          color: inherit;
          text-decoration: none;
          border-bottom: 1px solid #ccc;
          align-items: center;
          display: flex;
        }

        .overview :global(figure) {
          margin: 0;
          padding: 0;
        }

        .overview :global(img) {
          display: block;
          max-width: 100%;
          box-sizing: border-box;
        }

        @media screen and (max-width: 499px) {
          .cast-character-name::before {
            content: " as ";
          }
        }

        @media screen and (min-width: 500px) {
          .content {
            display: grid;
            grid-gap: 2rem;
            grid-template-columns: 2fr 5fr;
            padding: 1rem;
          }

          .overview :global(p) {
            margin-top: 0;
          }

          .cast-list img {
            margin: 0;
            margin-right: 0.5em;
          }

          .cast-list {
            display: grid;
            line-height: 1em;
            grid-gap: 2rem;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }

          .cast-list-link {
            border: none;
            align-items: flex-start;
          }

          .cast-person-name {
            display: block;
            font-size: 1.2em;
            font-weight: 500;
            line-height: 1.2em;
          }

          .cast-list-link span {
            display: block;
          }
        }

        .overview :global(figure) {
          margin: 0;
          padding: 0;
        }

        .overview :global(img) {
          display: block;
          max-width: 100%;
          box-sizing: border-box;
        }

        @media screen and (max-width: 499px) {
          .cast-character-name::before {
            content: " as ";
          }
        }

        @media screen and (min-width: 500px) {
          .content {
            display: grid;
            grid-gap: 2rem;
            grid-template-columns: 2fr 5fr;
            padding: 1rem;
          }

          .overview :global(p) {
            margin-top: 0;
          }

          .cast-list img {
            margin: 0;
            margin-right: 0.5em;
          }

          .cast-list {
            display: grid;
            line-height: 1em;
            grid-gap: 2rem;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }

          .cast-list-link {
            border: none;
            align-items: flex-start;
          }

          .cast-person-name {
            display: block;
            font-size: 1.2em;
            font-weight: 500;
            line-height: 1.2em;
          }

          .cast-list-link span {
            display: block;
          }
        }
      `}</style>
      <style jsx>{listStyles}</style>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  // Get the paths we want to pre-render based on persons
  const movies = await sanity.fetch(moviesQuery);
  const paths = movies.map(movie => ({
    params: { id: movie._id }
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

// This function gets called at build time on server-side.
export const getStaticProps = async ({ params }) => {
  const movie = await sanity.fetch(singleMovieQuery, { id: params.id });
  return { props: { movie } };
};

export default Movie;
