import React from 'react'
import dayJs from 'dayjs'

export default (props)=>{
  return(
    <ul className='itemlist'>
    {
      props.list.map(item=>(
        <li className='item' key={item.id}>
          <span className='date_time'>{item.deleted?dayJs(item.completed_at).format('YYYY年MM月DD日 hh:mm'):dayJs(item.completed_at).format('hh:mm')}</span>
          <span className='desc'>{item.description}</span>
        </li>
      ))
    }
    </ul>
  )
}
