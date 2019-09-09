import React from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import sanity from "../lib/sanity";
import listStyles from "../styles/list";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../lib/sanity";
const imageBuilder = imageUrlBuilder(sanityClient);

function imageUrlFor(source) {
  return imageBuilder.image(source);
}

const query = `*[_type == "person"] {
  _id,
  name,
  image,
  "imageAspect": image.asset->.metadata.dimensions.aspectRatio,
}[0...50]
`;

function People({ people }) {
  return (
    <Layout>
      <div className="people">
        <ul className="list">
          {people.map(person => (
            <li key={person._id} className="list__item">
              <Link href="/person/[id]" as={`/person/${person._id}`}>
                <a>
                  {person.image && (
                    <img
                      src={imageUrlFor(person.image).width(300)}
                      width="300"
                      height={300 / person.imageAspect}
                    />
                  )}
                  <h3>{person.name}</h3>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        .people {
          padding: 1rem;
        }

        .people .list h3 {
          line-height: 1em;
          padding: 0.5em 0;
        }
      `}</style>
      <style jsx>{listStyles}</style>
    </Layout>
  );
}

People.getInitialProps = async () => {
  return {
    people: await sanity.fetch(query)
  };
};

export default People;
