import React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import sanity from '../lib/sanity'

const query = `*[_type == "person"] {
  _id,
  name,
  "imageUrl": image.asset->url,
  "movies": *[_type == "movie" && references(^._id)] {
    _id,
    title
  }
}[0...50]
`

export default class People extends React.Component {

  static async getInitialProps() {
    return {
      people: await sanity.fetch(query)
    }
  }

  render() {
    const {people: people} = this.props
    return (
      <Layout>
        <ul>
          {people.map(person => (
            <li key={person._id}>
              <Link href={{pathname: '/person', query: {id: person._id}}}>
                <a>
                  {person.imageUrl && <img src={`${person.imageUrl}?h=240`} />}
                  <h2>{person.name}</h2>
                </a>
              </Link>
              <h3>Movies</h3>
              <ul>
                {person.movies.map(movie => (
                  <li key={movie._id}>
                    <div>
                      <Link href={{pathname: '/movie', query: {id: movie._id}}}>
                        <a>
                          {movie.title}
                        </a>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Layout>
    )
  }
}
