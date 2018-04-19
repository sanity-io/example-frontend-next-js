import React from 'react'
import Link from 'next/link'
import BlockContent from '@sanity/block-content-to-react'
import Layout from '../components/Layout'
import sanity from '../lib/sanity'
import styles from './styles/movie'
import listStyles from './styles/list'
import sanityClient from '../lib/sanity'
import imageUrlBuilder from '@sanity/image-url'

const imageBuilder = imageUrlBuilder(sanityClient)

function imageUrlFor(source) {
  return imageBuilder.image(source)
}

const query = `*[_type == "movie" && _id == $id] {
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
`

const serializers = {
  types: {
    summaries: props => {
      const {node} = props
      if (!node) {
        return false
      }
      const {summaries} = node
      if (!summaries || summaries.length === 0) {
        return false
      }
      return (
        <div className="summaries">
          <h2>{node.caption}</h2>
          <ul>
            {
              summaries.map(summary => {
                return (
                  <li key={summary._key}>
                    <BlockContent blocks={summary.summary} serializers={serializers} />
                    — <a href={summary.url}>{summary.author}</a>
                  </li>
                )
              })
            }
          </ul>
          <style jsx>{styles}</style>
        </div>
      )
    }
  }
}

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
          <div
            className="header"
            style={{
              backgroundImage: `url(${imageUrlFor(movie.poster)})`,
              backgroundPosition: `${(movie.poster.hotspot.x - movie.poster.crop.left) * 100}% ${(movie.poster.hotspot.y - movie.poster.crop.top) * 100}%`
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
                src={imageUrlFor(movie.poster).ignoreImageParams().width(500)} alt={`Movie poster for ${movie.title}`}
              />
            </div>
            <div className="main-content">
              {/* <h2>{movie.releaseDate.substr(0, 4)}</h2> */}
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
                    <Link href={{pathname: '/person', query: {id: cast.person._id}}}>
                      <a className="cast-list-link">
                        <span>
                          {cast.person.image && <img src={imageUrlFor(cast.person.image).width(64)} />}
                        </span>
                        <span>
                          <span className="cast-person-name">{cast.person.name}</span>
                          <span className="cast-character-name">{cast.characterName}</span>
                        </span>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <style jsx>{styles}</style>
        <style jsx>{listStyles}</style>
      </Layout>
    )
  }
}
