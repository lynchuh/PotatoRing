import React,{useState} from 'react'
import dayJs from 'dayjs'
import { Input } from 'antd';

const TomatoItem =  (props)=>{
  const [isEdit,toggleEdit] = useState(false)
  const [description,changeDesc] = useState(props.description ||'番茄描述为空')
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    if(e.target.value !==description){
      changeDesc(e.target.value)
    }
  }
  const updateTomatoes = ()=>{
    props.AbortTomatoes(props.id,{description})
    toggleEdit(false)
  }
  const deleteTomatoes = ()=>{
    props.AbortTomatoes(props.id,{aborted:true,description:props.description||'aborted tomatoes'})
    toggleEdit(false)
  }
  const cancleUpdate = ()=>{
    changeDesc(props.description||'番茄描述为空')
    toggleEdit(false)
  }
  return  (
    <li className='item' key={props.id}>
      {props.aborted ? <span>{dayJs(props.started_at).format('YYYY年MM月DD日')}</span>:null}
      <span className='date_time'>{dayJs(props.started_at).format('hh:mm')}-{dayJs(props.ended_at).format('hh:mm')}</span>
      {
        isEdit ?
        <Input value={description} onChange={handleChange} onPressEnter={updateTomatoes}/>:
        <span>{description}</span>}
      {
        !isEdit ? (
          <div className='action_wrapper'>
            <span onClick={()=>toggleEdit(true)}>编辑</span>
            <span onClick={deleteTomatoes}>删除</span>
          </div>
        ):(
          <div className='action_wrapper'>
            <span onClick={updateTomatoes}>提交</span>
            <span onClick={cancleUpdate}>取消</span>
          </div>
        )
      }
    </li>
  )
}

export default TomatoItem
