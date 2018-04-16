import React from 'react'
import Link from 'next/link'
import BlockContent from '@sanity/block-content-to-react'
import Layout from '../components/Layout'
import sanity from '../lib/sanity'
import styles from './styles/movie'
import listStyles from './styles/list'

const query = `*[_type == "movie" && _id == $id] {
  _id,
  title,
  overview,
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
                    <p>{summary.summary}</p>
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
    console.log('movie', movie)
    return (
      <Layout>
        <div className="movie">
          <div className="header">
            {movie.posterUrl && <img src={`${movie.posterUrl}?h=480`} />}
            {movie.releaseDate.substr(0, 4)}
            <h1>
              {movie.title}
            </h1>
            <div className="overview">
              <BlockContent
                blocks={movie.overview}
                serializers={serializers}
                dataset={sanity.clientConfig.dataset}
                projectId={sanity.clientConfig.projectId}
              />
            </div>
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
