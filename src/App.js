import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'

const App = () => (
  <BrowserRouter>
    <div>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/friends'>Friends</Link></li>
      </ul>
      
      <hr/>

      <Route exact path='/' component={Home}/>
      <Route path='/about' component={About}/>
      <Route path='/friends' component={Friends}/>
    </div>
  </BrowserRouter>
)

const Home = () => (
  <div>
    <h2>Home</h2>
    <p>Welcome to ようこそ</p>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
    <p>フレンズに投票する</p>
  </div>
)

// const Friends = () => (
//   <div>
//     <h2>Friends</h2>
//     <Route exact path='/friends' component={FriendList}/>
//     <Route path='/friends/:id' component={Friend}/>
//   </div>
// )
class Friends extends Component {
  constructor() {
    super()
    this.state ={}
    this.handleVote = this.handleVote.bind(this)
  }

  componentWillMount() {
    FRIENDS.forEach(friend => {
      this.setState({
        ...this.state, [friend.id]: 0
      })
    })
  }

  handleVote(id) {
    this.setState({
      [id]: this.state[id] + 1
    }, () => console.log(this.state))
  }

  render() {
    return (
      <div>
        <h2>Friends</h2>

        <Route path='/friends' 
          render={props => <FriendList handleVote={this.handleVote} />}
        />

        <Route path='/friends/:id' 
          render={props => <Friend match={props.match} votes={this.state}/>}
        />
      </div>
    )
  }
}

const FriendList = props => (
  <div>
    {FRIENDS.map(friend => (
      <li key={friend.id}>
        <Link to={`/friends/${friend.id}`}>{friend.nameJa}</Link>
        <button onClick={() => props.handleVote(friend.id)}>+</button>
      </li>  
    ))}
  </div>
)

const Friend = props => {
  const {id} = props.match.params
  const friend = friendById(id)
  
  const vote = props.votes[id]

  if (typeof friend === 'undefined') {
    return (
      <div>
        <p>Friends with id '{id}' does not exist.</p>
      </div>
    )
  }

  const containerStyle = { border: '1px gray solid', display: 'inline-block', padding: 10 }
  const contentsStyle = { margin: 0 }

  return (
    <div style={containerStyle}>
      <div>
        <p style={contentsStyle}>{friend.family}</p>
        <h1 style={contentsStyle}>{friend.nameJa}</h1>
        <p style={contentsStyle}>{friend.nameEn}</p>
      </div>
      <h1>Vote: {vote}</h1>
    </div>
  )
}

const FRIENDS = [
  {
    id: 'serval',
    nameJa: 'サーバル',
    nameEn: 'Serval Cat',
    family: 'ネコ目ネコ科ネコ属'
  },
  {
    id: 'raccoon',
    nameJa: 'アライグマ',
    nameEn: 'Common raccoon',
    family: 'ネコ目アライグマ科アライグマ属'
  },
  {
    id: 'fennec',
    nameJa: 'フェネック',
    nameEn: 'Fennec',
    family: 'ネコ目イヌ科キツネ属'
  }
]

const friendById = id => FRIENDS.find(friend => friend.id === id)

// const App = () => (
//   <BrowserRouter>
//     <div>
//       <ul>
//         <li><Link to='/'>Home</Link></li>
//         <li><Link to='/lists'>Lists</Link></li>
//       </ul>
      
//       <hr/>

//       <Route exact path='/' component={Home}/>
//       <Route path='/lists' component={Lists}/>
//     </div>
//   </BrowserRouter>
// )

// const Home = () => (
//   <div>
//     <h2>Home</h2>
//   </div>
// )

// const Lists = () => (
//   <div>
//     <h2>Lists</h2>
//     <Route  exact path='/lists' component={List}/>
//     <Route path='/lists/:id' component={Item}/>
//   </div>
// )

// const List = () => (
//   <div>
//     {LIST.map(i => (
//       <li key={i.id}>
//         <Link to={`/lists/${i.id}`}>{i.name}</Link>
//       </li>  
//     ))}
//   </div>
// )

// const Item = props => {
//   const item = LIST.find(i => i.id == props.match.params.id)

//   return (
//     <div>
//       <div>
//         <h1>{item.id} : {item.name}</h1>
//       </div>
//     </div>
//   )
// }

// const LIST = [
//   {
//     id: 1,
//     name : 'サーバル'
//   },
//   {
//     id: 2,
//     name: 'アライグマ'
//   },
//   {
//     id: 3,
//     name: 'フェネック'
//   }
// ]

export default App
