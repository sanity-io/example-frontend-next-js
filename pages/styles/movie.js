/* styles.js */
import css from 'styled-jsx/css'

export default css`
.movie > h2 {
  margin: 2rem 0 0 0;
  padding: 0 0.5rem;
  border-bottom: 1px solid #ccc;
}

.movie .list img {
  width: 2rem;
  height: 2rem;
  margin-right: 0.5rem;
  object-fit: cover;
}

.header {
  clear: both;
  overflow: hidden;
  padding: 0.5rem;
}

.header > h1 {
  font-size: 3rem;
  line-height: 1em;
  margin: 1rem 0 0 0;
  padding: 0;
}

.header > img {
  display: block;
  width: 33vw;
  max-width: 20rem;
  height: auto;
  float: left;
  margin-right: 0.5rem;
}

.movie .list {
  line-height: 2rem;
}

.summaries {
  clear: both;
  padding: 2em 0 2em;
}

.summaries :global(ul) {
  margin: 0;
  padding: 0;
}

.summaries :global(li) {
  display: block;
  margin: 0 0 1em;
  padding: 1em 0 2em;
}

.summaries :global(li:not(:last-child)) {
  border-bottom: 1px solid #ccc;
}

.overview :global(figure) {
  margin: 0;
  padding: 0;
}

.overview :global(img) {
  display: block;
  max-width: 100%;
  box-sizing: border-box;
}
`