# POTATO App
> 仿[番茄土豆](https://pomotodo.com/app/)的线上webApp

## 前言
1. 这次项目重点体验typescript与react的结合，直接使用官方脚手架create-react-app搭建环境。
2. 项目中数据统计图形使用HTML5的Svg展示。
3. 项目采用前后端分离开发模式。后端接口需要appkey才可以使用。

### [项目地址](https://github.com/lynchuh/PotatoRing)
### [项目预览](https://lynchuh.github.io/PotatoRing/)

## 实现功能
1. 简单用户系统---登陆/注册/路由鉴权
2. 番茄闹钟---25分钟定时闹钟
3. 待办任务---番茄闹钟期间完成待办任务，自动记录到番茄描述中
4. 数据统计
    - 月统计数据---每月累计量 & 增长率 & 平均量
    - 番茄历史统计---每日记录（可删改），可手动添加番茄记录
    - 待办任务统计---每日记录（可删改）

## 技术栈
- react（部分component使用hook）
- react-router
- redux+redux-thunk
- ant-d
- typescript
- scss
- axios

## 预览
1. 登陆& 注册
![登陆.png](https://i.loli.net/2019/04/13/5cb198dc3d81e.png)
![注册.png](https://i.loli.net/2019/04/13/5cb198dfa4059.png)
2. 首页（主页面）
  - 番茄 & 任务
    ![tomatoes&todos.png](https://i.loli.net/2019/04/13/5cb198dc32823.png)
  - 月统计数据
    ![统计模块.png](https://i.loli.net/2019/04/13/5cb198df2b945.png)
  - 番茄历史
  
    手动新增番茄
    
    ![手动新增番茄.png](https://i.loli.net/2019/04/13/5cb198dfa3db4.png)
    
    完成的番茄历史
    
    ![番茄历史1.png](https://i.loli.net/2019/04/13/5cb198dd6300c.png)
    
    被打断的番茄历史
    
    ![番茄历史2.png](https://i.loli.net/2019/04/13/5cb198dd64931.png)
  - 任务历史
    
    完成的任务历史
    
    ![任务历史1.png](https://i.loli.net/2019/04/13/5cb198de707b5.png)
    
    删除的任务历史
    
    ![任务历史2.png](https://i.loli.net/2019/04/13/5cb198de707b5.png)

## 实现细节
1. 封装axios，生成实例。使用拦截器处理后端传来的token
2. 关于redux & thunk
  - 这次项目主要按照不同模块划分store：tomatoes储存处理番茄闹钟的数据，todos储存处理待办任务的数据，user负责用户系统的数据。
  - 由于异步处理不太复杂，因此使用thunk来dispatch 一个 function action 来处理异步数据即可。
  - 由于redux中tomatoes和todos两个模块的数据是无耦合的，但是在番茄闹钟运作时，番茄的描述需要与待办任务相关联。这个功能的处理比较一波三折。
    第一次实现的思路是每次完成一个todo的时候，都发送一个请求到后端记录当前todo到当前tomato中，但这样每次完成todo时，需要发送请求并且处理当前tomato的数据，这样比较麻烦，而且我希望两个模块间的数据间天然解耦，因此舍弃了这个方案。
    第二次实现思路是将todos的数据用props传递到tomato组件，每当todos发生变化时提取completed todo，并根据todo来修改tomato组件的state（description），这个处理比较危险，因为需要在componentDidUpdate这个生命周期里setState，需要很谨慎处理，否则会陷入无限循环。在多次尝试后，选择放弃。
    最后，我将番茄的描述--description提升到redux中，每次完成一个todo时， tomatoes也根据这个action type来处理tomatoes模块。将todo记录到description中。
  - 关于container的设计，我只将route component作为container，因为这个项目的组件设计并不复杂，如果每个组件都connect，显得更繁杂。不同组件各司其职岂不更好？
  - 使用thunk后，action可以是函数。因此在路由鉴权这部分的工作，我也一并放在action这里处理了（登陆、注册后也需要路由跳转），所以并没有使用browserRouter自带的history，而是自己封装了一个history。
3. 这次项目的数据统计图---折线图/条形图等使用Svg来展示，SVg相比canvas，它不依赖分辨率，是基于矢量的图像，因此即使在放大或改变尺寸的情况下也不会失真。
