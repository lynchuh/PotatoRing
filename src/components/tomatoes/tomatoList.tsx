import React from 'react'
import { Empty } from 'antd'
import dayJs from 'dayjs'

interface IProps{
  finishedTomato: any
}

export default class extends React.Component<IProps>{
  get tomatoList (){
    const newList = new Map()
    this.props.finishedTomato.forEach(tomato=>{
      const day = dayJs(tomato.started_at).format('YYYY-MM-DD')
      const list =newList.get(day) || []
      list.push(tomato)
      list.sort((a,b)=>Date.parse(b.started_at)-Date.parse(a.started_at)) // 按时间排序
      newList.set(day,list)
    })
    return newList.entries()
  }
  get tomatoListHtml(){
    const html:React.ReactChild[] = []
    for (const [day, tomatoes] of this.tomatoList){
      const dayItem  = day.split('-')
      const tomatoHtml = (
        <div key={day} className='days_tomatoes'>
          <div className='title'>
            <span className='day_time'>{dayItem[1]}月{dayItem[2]}日</span>
            <span className='completed_desc'>完成了{tomatoes.length}个番茄</span>
          </div>
          <div className='tomatoes_wrapper'>
            {tomatoes.map(tomato=>
              <div key={tomato.id}  className='tomato_item'>
                <span className='date_time'>{dayJs(tomato.started_at).format('HH:mm')}-{dayJs(tomato.ended_at).format('HH:mm')}</span>
                <span className='desc'>{tomato.description}</span>
              </div>
            )}
          </div>
        </div>
      )
      html.push(tomatoHtml)
    }
    return html.slice(0,3)
  }
  public render(){
    return (
      <div className='tomato_list'>
        {this.props.finishedTomato.length !==0 ?this.tomatoListHtml:<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> }
      </div>
    )
  }
}
