import React,{useState,FunctionComponent,useEffect} from 'react'

let timeId:number

 const CountDownHook:FunctionComponent<any>= ({timer,onFinished})=>{
  const [timerState,setTimer] = useState(timer)
  let minutes:number|string = Math.floor(timerState/1000/60)
  let second:number|string  = Math.floor(timerState/1000%60)
  minutes = minutes <10? `0${minutes}`: minutes
  second = second <10? `0${second}`: second

  useEffect(()=>{
    document.title=`${minutes}:${second}---番茄闹钟`
    timeId = window.setInterval(()=>{
      if(timerState < 1000){
        onFinished()
        window.clearInterval(timeId)
        return
      }
      setTimer(timerState-1000)
    },1000)
    return ()=>window.clearInterval(timeId)
  })

  return(
    <div className='countDown'>{minutes}:{second}</div>
  )
}

export default CountDownHook
