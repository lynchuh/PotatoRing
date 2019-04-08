import React from 'react'

interface IProps{
  dailyData: any
  width: number,
  YRange: number
}

// let lastTime:number|null = null;

export default class Polygon extends React.PureComponent<IProps,any> {
  node: HTMLDivElement | null;
  constructor(props){
    super(props)
    this.state={
      height: 60,
      width: this.props.width,
    }
    this.updateSize = this.updateSize.bind(this)
  }
  componentDidMount(){
    window.addEventListener('resize', this.updateSize);
  }
  componentWillUnmount(){
    window.removeEventListener('resize', this.updateSize);
  }
  updateSize(){
    const width = this.node? this.node.offsetWidth: 0
    const height = this.node? this.node.offsetHeight: 0
    if(this.state.width !==width || this.state.height !== height){this.setState({ width, height })}
  }
  getPoint(){
    const {height,width} = this.state
    const dates = Object.keys(this.props.dailyData)
    const {YRange} = this.props
    const XRange = new Date().getTime() - Date.parse(dates[dates.length-1])
    let lastXPoint = 0
    const points = dates.reduce((a,date)=>{
      const x = (new Date().getTime() - Date.parse(date))/ XRange * width
      const y = (1 - this.props.dailyData[date].length/YRange) * height
      lastXPoint = x
      return a.concat(` ${x},${y}`)
    },'0,60')
    return points.concat(` ${lastXPoint},60`)
  }
  public render() {
    return (
      <div className="polygon" ref={node=>this.node = node}>
        <svg
          className="peity"
          width="100%"
          height="60"
          preserveAspectRatio="none"
        >
          <polygon
            fill="rgba(215,78,78,0.1)"
            stroke="rgba(215,78,78,0.5)"
            strokeWidth="1"
            points={this.getPoint()}
          />
        </svg>
      </div>
    )
  }
}
