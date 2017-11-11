import Menu from './Menu'
import Head from 'next/head'

export default props => (
  <div>
    <Head>
      <meta charset="utf-8" />
      <title>Sanity + Next.js = 💖</title>
    </Head>
    <Menu />
    <div>
      {props.children}
    </div>
    <div>
      <img src="https://rawgit.com/sanity-io/example-frontend-next-js/master/static/sanity-logo.svg"/>
      +
      <img src="https://rawgit.com/sanity-io/example-frontend-next-js/master/static/nextjs-logo.svg"/>
      =
      💖
    </div>
  </div>
)