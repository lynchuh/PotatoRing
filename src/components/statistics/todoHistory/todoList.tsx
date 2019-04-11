import React from 'react'
import dayJs from 'dayjs'

export default (props)=>{
  return(
    <ul className='itemlist'>
    {
      props.list.map(item=>(
        <li className='item' key={item.id}>
          <span className='date_time'>{item.deleted?dayJs(item.completed_at).format('YYYY年MM月DD日 HH:mm'):dayJs(item.completed_at).format('HH:mm')}</span>
          <span className='desc'>{item.description}</span>
          <div className='action_wrapper'>
            <span onClick={()=>props.recoverAction(item)}>恢复</span>
            {!item.deleted ? <span onClick={()=>props.deleteAction(item.id,{deleted:true})}>删除</span> :null}
          </div>
        </li>
      ))
    }
    </ul>
  )
}
