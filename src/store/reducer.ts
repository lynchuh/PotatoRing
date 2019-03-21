interface IinitState{
  count: number,
  testString: string
}

const initState:IinitState = {
  count:1,
  testString:'hello world'
}


export default (state=initState,action:any)=>{
  return state
}
