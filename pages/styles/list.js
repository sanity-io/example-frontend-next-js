/* styles.js */
import css from 'styled-jsx/css'

export default css`
.list {
  display: block;
  margin: 0;
  padding: 0;
  clear: both;
}

.list > li {
  display: block;
  margin: 0;
  padding: 0;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: stretch;
}

.list a {
  text-decoration: none;
  display: block;
  flex-grow: 1;
  color: #333;
  padding: 0.5rem;
}

.list a:hover {
  background-color: #eee;
}

.list a:active {
  color: white;
  background-color: black;
}

.list h3 {
  margin: 0;
  padding: 0;
}

.list img {
  display: block;
  height: auto;
  width: 3em;
  margin-right: 0.5rem;
  float: left;
}
`
