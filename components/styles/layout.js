import css from 'styled-jsx/css'

export default css`

footer {
  padding: 5rem 1rem;
  text-align: center;
  font-size: 2rem;
}

footer img {
  display: inline-block;
  height: 1em;
  width: auto;
  padding: 0 0.4em;
}

nav {
  position: fixed;
  display: flex;
  align-items: stretch;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #333;
  padding: 1em;
  font-size: 1rem;
}

nav a {
  flex-grow: 1;
  color: #fff;
  text-decoration: none;
  text-align: center;
}
`
