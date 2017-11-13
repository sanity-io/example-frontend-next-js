import React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import sanity from '../lib/sanity'
import styles from './styles/movie'
import listStyles from './styles/list'

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
        <div className="movie">
          <div className="movie__header">
            {movie.posterUrl && <img src={`${movie.posterUrl}?h=480`} />}
            {movie.releaseDate.substr(0, 4)}
            <h1>
              {movie.title}
            </h1>
          </div>
          <h2>Cast</h2>
          <ul className="list">
            {movie.cast.map(cast => (
              <li key={cast._key}>
                <Link href={{pathname: '/person', query: {id: cast.person._id}}}>
                  <a>
                    {cast.person.imageUrl && <img src={`${cast.person.imageUrl}?h=240`} />}
                    <div>
                      {cast.person.name} as {cast.characterName}
                    </div>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <style jsx>{styles}</style>
        <style jsx>{listStyles}</style>
      </Layout>
    )
  }
}
