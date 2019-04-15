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
    props.UpdateTomato(props.id,{description})
    toggleEdit(false)
  }
  const deleteTomatoes = ()=>{
    props.UpdateTomato(props.id,{aborted:true,description:props.description||'aborted tomatoes'})
    toggleEdit(false)
  }
  const cancelUpdate = ()=>{
    changeDesc(props.description||'番茄描述为空')
    toggleEdit(false)
  }
  return  (
    <li className='item' key={props.id}>
      {props.aborted ? <span className='day_time'>{dayJs(props.started_at).format('YYYY年MM月DD日')}</span>:null}
      <span className='date_time'>{dayJs(props.started_at).format('HH:mm')}-{dayJs(props.ended_at).format('HH:mm')}</span>
      {
        isEdit ?
        <Input value={description} onChange={handleChange} onPressEnter={updateTomatoes}/>:
          <span className='description'>{description} <p className={props.manually_created ? 'active':''}>（补）</p>  </span>
      }
      {
        !isEdit ? (
          <div className='action_wrapper'>
            <span onClick={()=>toggleEdit(true)}>编辑</span>
            {!props.aborted?<span onClick={deleteTomatoes}>删除</span>:null}
          </div>
        ):(
          <div className='action_wrapper'>
            <span onClick={updateTomatoes}>提交</span>
            <span onClick={cancelUpdate}>取消</span>
          </div>
        )
      }
    </li>
  )
}

export default TomatoItem
