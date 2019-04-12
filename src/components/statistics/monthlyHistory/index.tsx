import React from 'react'
import { Tabs} from 'antd'
import MonthlyTemplate from './monthlyTemplate'

const {TabPane}= Tabs

interface IProps {
	completedTodos: any[]
	completedTomatoes: any[]
	ulWidth: number
	liWidth: number
}

export default class extends React.Component<IProps,any>{
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
  get tomatoData(){
  	return this.props.completedTomatoes.map(t=>({calTime:t.started_at,id:t.id}))
  }
  get todoData(){
	  return this.props.completedTodos.map(t=>({calTime:t.completed_at,id:t.id}))
  }
  public render(){
    return (
      <div className="monthly_history" >
        <Tabs onChange={this.changeTab} type="card">
          <TabPane tab="番茄统计" key="1">
            <MonthlyTemplate caleData={this.tomatoData} width={this.props.ulWidth}/>
          </TabPane>
          <TabPane tab="任务统计" key="2">
            <MonthlyTemplate caleData={this.todoData} width={this.props.ulWidth} />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
