import React from 'react'

interface IProps {
  timer: number,
  onFinished:()=>void,
  duration: number
}
interface IState {
  timer: number
}

let timeId:NodeJS.Timeout

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
        clearInterval(timeId)
        return
      }
      this.setState({
        timer: this.state.timer-1000
      })
    },1000)
  }
  componentWillUnmount(){
    clearInterval(timeId)
    document.title= '番茄闹钟App'
  }
  render(){
    const {timer} = this.state
    const minutes = Math.floor(timer/1000/60) <10 ?`0${Math.floor(timer/1000/60)}`: Math.floor(timer/1000/60)
    const second = Math.floor(timer/1000%60) <10 ?`0${Math.floor(timer/1000%60)}`: Math.floor(timer/1000%60)
    const precent = 1- timer / this.props.duration
    document.title= timer>1000 ? `${minutes}:${second}---番茄闹钟App` :'番茄闹钟App'
    return (
      <div className='countDown'>
        <div className="process" style={{width: `${precent*100}%`}}/>
        <span className='text'>{minutes}:{second}</span>
      </div>
    )
  }
}
