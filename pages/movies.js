import React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import sanity from '../lib/sanity'

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
        <ul>
          {movies.map(movie => (
            <li key={movie._id}>
              <div>
                <Link href={{pathname: '/movie', query: {id: movie._id}}}>
                  <a>
                    {movie.posterUrl && <img src={`${movie.posterUrl}?h=240`} />}
                    {movie.title}
                    {' '}
                    ({movie.releaseDate.substr(0, 4)})
                    {' '}
                    Directed by {movie.director}
                  </a>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </Layout>
    )
  }
}
