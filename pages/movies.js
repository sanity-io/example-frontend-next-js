import React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import sanity from '../lib/sanity'
import styles from './styles/movies'
import listStyles from './styles/list'

const query = `*[_type == "movie"] {
  _id,
  title,
  releaseDate,
  "director": crewMembers[job == "Director"][0].person->name,
  "posterUrl": poster.asset->url
}[0...50]
`

export default class Movies extends React.Component {

  static async getInitialProps() {
    return {
      movies: await sanity.fetch(query)
    }
  }

  render() {
    const {movies} = this.props
    return (
      <Layout>
        <ul className="list">
          {movies.map(movie => (
            <li key={movie._id} className="list__item">
              <Link href={{pathname: '/movie', query: {id: movie._id}}}>
                <a>
                  {movie.posterUrl && <img src={`${movie.posterUrl}?h=240`} />}
                  <div>({movie.releaseDate.substr(0, 4)})</div>
                  <h3>{movie.title}</h3>
                  {movie.director && (
                    <span className="movies-list__directed-by">
                      Directed by {movie.director}
                    </span>
                  )}
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <style jsx>{styles}</style>
        <style jsx>{listStyles}</style>
      </Layout>
    )
  }
}
