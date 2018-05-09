import React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import sanity from '../lib/sanity'
import styles from './styles/movies'
import listStyles from './styles/list'
import sanityClient from '../lib/sanity'
import imageUrlBuilder from '@sanity/image-url'

const imageBuilder = imageUrlBuilder(sanityClient)

function imageUrlFor(source) {
  return imageBuilder.image(source)
}

const query = `*[_type == "movie"] {
  _id,
  title,
  releaseDate,
  poster,
  "posterAspect": poster.asset->.metadata.dimensions.aspectRatio,
  "director": crewMembers[job == "Director"][0].person->name
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
        <div className="movies">
          <ul className="list">
            {movies.map(movie => (
              <li key={movie._id} className="list__item">
                <Link href={{pathname: '/movie', query: {id: movie._id}}}>
                  <a>
                    {movie.poster && (
                      <img
                        src={imageUrlFor(movie.poster).ignoreImageParams().width(300)}
                        width="100"
                        height={100 / movie.posterAspect}
                      />
                    )}
                    <div style={{paddingTop: '0.2em'}}>{movie.releaseDate.substr(0, 4)}</div>
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
        </div>
        <style jsx>{styles}</style>
        <style jsx>{listStyles}</style>
      </Layout>
    )
  }
}
