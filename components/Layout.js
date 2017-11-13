import Head from 'next/head'
import Link from 'next/link'
import globalStyles from './styles/global'
import styles from './styles/layout'
import GithubCorner from './GithubCorner'

export default props => (
  <div>
    <Head>
      <meta charSet="utf-8" />
      <title>Sanity + Next.js = 💖</title>
    </Head>
    <nav>
      <Link href="/movies"><a>Movies</a></Link>
      <Link href="/people"><a>People</a></Link>
    </nav>
    <GithubCorner />
    <div id="main">
      {props.children}
    </div>
    <footer>
      <a href="http://sanity.io">
        <img src="https://rawgit.com/sanity-io/example-frontend-next-js/master/static/sanity-logo.svg"/>
      </a>
      +
      <a href="https://github.com/zeit/next.js">
        <img className="next" src="https://cloud.githubusercontent.com/assets/13041/19686250/971bf7f8-9ac0-11e6-975c-188defd82df1.png"/>
      </a>
      =
      💖
    </footer>
    <style jsx>{styles}</style>
    <style jsx global>{globalStyles}</style>
  </div>
)