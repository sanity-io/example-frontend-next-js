import css from 'styled-jsx/css'

export default css`
.person {
  margin: 1rem;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr 4fr;
}

.person .title {
  font-size: 10vw;
  line-height: 1em;
  margin: 0;
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
  width: 20vw;
  max-width: 20rem;
  height: auto;
  float: left;
  margin-right: 0.5rem;
}

.link {
  cursor: pointer;
}

.person .list {
  grid-template-columns: repeat(auto-fit, minmax(100px, 180px));
}
`