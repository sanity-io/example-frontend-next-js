import React from 'react'
import Layout from '../components/Layout'
import sanity from '../lib/sanity'
import Link from 'next/link'

// Fetch 50 documents of type `movie`, and select only the fields we need
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
    return (
      <Layout>
        <ul>
          {this.props.movies.map(movie => (
            <li>
              <div>
                <Link href={{pathname: '/movie', query: {id: movie._id}}}>
                  <a>
                    <img src={`${movie.posterUrl}?h=240`} />
                    {movie.title}
                    {movie.releaseDate}
                    {movie.director}
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
