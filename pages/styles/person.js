import css from 'styled-jsx/css'

export default css`
.person > h2 {
  margin: 2rem 0 0 0;
  padding: 0 0.5rem;
  border-bottom: 1px solid #ccc;
}

.person .list img {
  width: 2rem;
  height: 2rem;
  margin-right: 0.5rem;
  object-fit: cover;
}

.person .list {
  line-height: 2rem;
}

.person__header {
  clear: both;
  overflow: hidden;
  padding: 0.5rem;
}

.person__header > h1 {
  font-size: 3rem;
  line-height: 1em;
  margin: 1rem 0 0 0;
  padding: 0;
}

.person__header > img {
  display: block;
  width: 33vw;
  max-width: 20rem;
  height: auto;
  float: left;
  margin-right: 0.5rem;
}
`