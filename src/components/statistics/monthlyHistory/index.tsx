import React from 'react'
import { Tabs} from 'antd'
import MonthlyTodos from './todos'
import MonthlyTomatoes from './tomatoes'

const {TabPane}= Tabs
export default class extends React.Component<any,any>{
  node: HTMLDivElement | null;
  constructor(props){
    super(props)
    this.state = {
      tabKey: '1',

    }
  }
  changeTab=(tabKey)=>{
    if(tabKey !== this.state.tabKey){
      this.setState({tabKey})
    }
  }
  public render(){
    return (
      <div className="monthly_history" >
        <Tabs onChange={this.changeTab} type="card">
          <TabPane tab="番茄统计" key="1">
            <MonthlyTomatoes completedTomatoes={this.props.completedTomatoes} width={this.props.width}/>
          </TabPane>
          <TabPane tab="任务统计" key="2">
            <MonthlyTodos />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
