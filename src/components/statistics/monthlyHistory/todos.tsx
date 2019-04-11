import React from 'react'

export default class extends React.Component<any,any>{
  constructor(props){
    super(props)
    this.state = {
      currentMoth: new Date().getMonth()
    }
  }

  public render(){
    return (
      <div className="monthly_todo">
        monthly todo
      </div>
    )
  }
}
