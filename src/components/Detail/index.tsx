import * as React from 'react'
import './style'

interface State {
  abc: number
}
interface Props {
}
/**
 * 组件demo
 */
export default class extends React.Component<Props, State> {
  constructor(props) {
    super(props)
  }
  render() {
    this.setState({ abc: 1234 })
    return (
      <div>
        <h1 className='demo-component'>
         这是Detail组件
        </h1>
      </div>
    )
  }
}

