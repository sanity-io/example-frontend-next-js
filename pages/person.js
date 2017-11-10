import React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import sanity from '../lib/sanity'

const query = `*[_type == "person" && _id == $id] {
  _id,
  name,
  "imageUrl": image.asset->url,
  "actedIn": *[_type == "movie" && references(^._id) && (^._id in castMembers[].person._ref)] {
    _id,
    title,
    releaseDate,
    "posterUrl": poster.asset->url
  }
}[0]
`

export default class Person extends React.Component {
  static async getInitialProps(req) {
    return {
      person: await sanity.fetch(query, {id: req.query.id})
    }
  }

  render() {
    const {person} = this.props
    return (
      <Layout>
        {person.imageUrl && <img src={`${person.imageUrl}?h=240`} />}
        <h2>{person.name}</h2>
        <div>
          <h3>Acted in</h3>
          <ul>
            {(person.actedIn || []).map(movie => (
              <li key={movie._id}>
                {movie.posterUrl && <img src={`${movie.posterUrl}?h=240`} />}
                <Link href={{pathname: '/movie', query: {id: movie._id}}}>
                  <a>
                    {movie.title} ({movie.releaseDate.substr(0, 4)})
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Layout>
    )
  }
}
