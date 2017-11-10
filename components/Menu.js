import Link from 'next/link'
export default props => (
  <nav>
    <Link href="/movies"><a>Movies</a></Link>
    <Link href="/people"><a>People</a></Link>
  </nav>
)