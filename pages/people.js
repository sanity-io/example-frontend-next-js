import React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import sanity from '../lib/sanity'
import styles from './styles/people'
import listStyles from './styles/list'
import imageUrlBuilder from '@sanity/image-url'
import sanityClient from '../lib/sanity'
const imageBuilder = imageUrlBuilder(sanityClient)

function imageUrlFor(source) {
  return imageBuilder.image(source)
}

const query = `*[_type == "person"] {
  _id,
  name,
  image,
  "imageAspect": image.asset->.metadata.dimensions.aspectRatio,
}[0...50]
`

export default class People extends React.Component {
  static async getInitialProps() {
    return {
      people: await sanity.fetch(query)
    }
  }

  render() {
    const {people} = this.props
    return (
      <Layout>
        <div className="people">
          <ul className="list">
            {people.map(person => (
              <li key={person._id} className="list__item">
                <Link href={{pathname: '/person', query: {id: person._id}}}>
                  <a>
                    {person.image && <img src={imageUrlFor(person.image).width(300)} width="300" height={300 / person.imageAspect} />}
                    <h3>{person.name}</h3>
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
