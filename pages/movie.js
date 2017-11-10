import React from 'react'
import Layout from '../components/Layout'
import sanity from '../lib/sanity'

// Fetch 50 documents of type `movie`, and select only the fields we need
const query = `*[_type == "movie" && _id == $id] {
  _id,
  title,
}[0]
`

export default class Movies extends React.Component {

  static async getInitialProps(req) {
    return {
      movie: await sanity.fetch(query, {id: req.query.id})
    }
  }

  render() {
    return (
      <Layout>
        <pre>{JSON.stringify(this.props.movie)}</pre>
      </Layout>
    )
  }
}
