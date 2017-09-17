/**
 * 路由页面
 */
import * as styles from './style.less'
import * as React from 'react'
import DemoComponent from '@/components/Demo'
export interface State {
  list: Array<any>
}
export interface Props {
  list: Array<any>
}
export default class extends React.Component<Props, State> {
  state = { list: [1, 2, 34, 34] }
  static defaultProps = {
    list: [6, 7, 87, 8, 4]
  }
  render() {
    let a = 1111
    console.log(this.state)
    return <div className= {styles['demo-route']}>
      <input type='text'/>
      this is demo-route  1111 88222111222333
             <DemoComponent />
      {this.state.list.join('---')}
      {this.props.list.join('****')}
    </div>
  }
}
