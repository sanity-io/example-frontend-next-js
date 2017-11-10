import Menu from './Menu'

export default props => (
  <div>
    <Menu />
    <div>
      {props.children}
    </div>
  </div>
)