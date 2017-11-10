import React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import sanity from '../lib/sanity'

const query = `*[_type == "movie" && _id == $id] {
  _id,
  title,
  releaseDate,
  "posterUrl": poster.asset->url,
  "cast": castMembers[] {
    _key,
    characterName,
    "person": person-> {
      _id,
      name,
      "imageUrl": image.asset->url
    }
  }
}[0]
`

export default class Movie extends React.Component {

  static async getInitialProps(req) {
    return {
      movie: await sanity.fetch(query, {id: req.query.id})
    }
  }

  render() {
    const {movie} = this.props
    return (
      <Layout>
        <h2>
          {movie.title} ({movie.releaseDate.substr(0, 4)})
        </h2>
        {movie.posterUrl && <img src={`${movie.posterUrl}?h=240`} />}
        <div>
          <h3>Cast</h3>
          <ul>
            {movie.cast.map(cast => (
              <li key={cast._key}>
                {cast.person.imageUrl && <img src={`${cast.person.imageUrl}?h=240`} />}
                <Link href={{pathname: '/person', query: {id: cast.person._id}}}>
                  <a>{cast.person.name}</a>
                </Link>
                {' '} as {cast.characterName}
              </li>
            ))}
          </ul>
        </div>
      </Layout>
    )
  }
}
