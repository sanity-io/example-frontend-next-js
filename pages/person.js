import React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import sanity from '../lib/sanity'
import listStyles from './styles/list'
import styles from './styles/person'
import sanityClient from '../lib/sanity'
import imageUrlBuilder from '@sanity/image-url'

const imageBuilder = imageUrlBuilder(sanityClient)

function imageUrlFor(source) {
  return imageBuilder.image(source)
}

const query = `*[_type == "person" && _id == $id] {
  _id,
  name,
  image,
  "actedIn": *[_type == "movie" && references(^._id)] {
    _id,
    title,
    releaseDate,
    poster
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
        <div className="person">
          <div>
            {person.image && <img src={imageUrlFor(person.image).height(500)} />}
          </div>
          <div>
            <h1 className="title">{person.name}</h1>
            <h2>Related movies</h2>
            <ul className="list">
              {(person.actedIn || []).map(movie => (
                <li key={movie._id}>
                  <Link href={{pathname: '/movie', query: {id: movie._id}}}>
                    <a className="link">
                      {movie.poster && <img src={imageUrlFor(movie.poster).ignoreImageParams().height(500)} />}
                      <span>
                        {movie.title} ({movie.releaseDate.substr(0, 4)})
                      </span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <style jsx>{styles}</style>
        <style jsx>{listStyles}</style>
      </Layout>
    )
  }
}
