import React from 'react'

interface IProps {
  timer: number,
  onFinished:()=>void
}
interface IState {
  timer: number
}
let timeId:any = null

export default class extends React.Component<IProps,IState>{
  constructor(props){
    super(props)
    this.state={
      timer: this.props.timer
    }
  }
  componentDidMount(){
    timeId = setInterval(()=>{
      if(this.state.timer < 1000){
        this.props.onFinished()
        window.clearInterval(timeId)
        return
      }
      this.setState({
        timer: this.state.timer-1000
      })
    },1000)
  }
  componentWillUnmount(){
    window.clearInterval(timeId)
  }
  render(){
    const {timer} = this.state
    const minutes = Math.floor(timer/1000/60)
    const second = Math.floor(timer/1000%60)
    return (
      <div className='countDown'>{minutes<10?`0${minutes}`:minutes}:{second<10?`0${second}`:second}</div>
    )
  }
}
