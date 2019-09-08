/* styles.js */
import css from 'styled-jsx/css'

export default css`

.content {
  display: flex;
  flex-direction: column-reverse;
  max-width: 80rem;
  margin: 1rem auto;
  padding: 0 1rem;
}

.overview {
  font-size: 1.5em;
}

.sidebar {
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  flex-grow: 1;
}

.main-content {
  flex-grow: 3;
}

.movie > h2 {
  margin: 2rem 0 0 0;
  padding: 0 0.5rem;
  border-bottom: 1px solid #ccc;
}

.poster {
  display: block;
  width: 100%;
}

.cast-list img {
  width: 2rem;
  height: auto;
  margin: 0.5rem;
  object-fit: cover;
  display: block;

}

.header {
  background-size: cover;
  padding-top: 10rem;
}

.header h1 {
  font-size: 10vw;
  line-height: 1em;
  margin: 1rem 0 0 0;
  padding: 0;
}

.header > img {
  width: 100%;
  display: block;
}

.header .header-content {
  color: #fff;
  text-align: center;
  padding-top: 5em;
  padding-bottom: 2em;
  background-image: linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 90%);
}

.cast-list {
  margin: 0;
  padding: 0;
  line-height: 2em;
  margin-bottom: 2rem;
}

.cast-list-item {
  display: block;
  margin: 0;
  padding: 0;
}

.cast-list-link {
  color: inherit;
  text-decoration: none;
  border-bottom: 1px solid #ccc;
  align-items: center;
  display: flex;
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

@media screen and (max-width: 499px) {
  .cast-character-name::before {
    content: ' as ';
  }
}

@media screen and (min-width: 500px) {
  .content {
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: 2fr 5fr;
    padding: 1rem;
  }

  .overview :global(p) {
    margin-top: 0;
  }

  .cast-list img {
    margin: 0;
    margin-right: 0.5em;
  }

  .cast-list {
    display: grid;
    line-height: 1em;
    grid-gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .cast-list-link {
    border: none;
    align-items: flex-start;
  }

  .cast-person-name {
    display: block;
    font-size: 1.2em;
    font-weight: 500;
    line-height: 1.2em;
  }

  .cast-list-link span {
    display: block;
  }
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

@media screen and (max-width: 499px) {
  .cast-character-name::before {
    content: ' as ';
  }
}

@media screen and (min-width: 500px) {
  .content {
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: 2fr 5fr;
    padding: 1rem;
  }

  .overview :global(p) {
    margin-top: 0;
  }

  .cast-list img {
    margin: 0;
    margin-right: 0.5em;
  }

  .cast-list {
    display: grid;
    line-height: 1em;
    grid-gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .cast-list-link {
    border: none;
    align-items: flex-start;
  }

  .cast-person-name {
    display: block;
    font-size: 1.2em;
    font-weight: 500;
    line-height: 1.2em;
  }

  .cast-list-link span {
    display: block;
  }
}
`