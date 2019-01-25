import React from 'react'
import ReactDOM from 'react-dom'
import { observable, computed, action } from 'mobx'
import { Provider } from 'mobx-react'
import Mova, { connect } from '../../dist/index'
import { BrowserRouter } from 'react-router-dom'
import './styles.css'

// 写法 1 model
// class Model {
//   @observable
//   name = 'fi3ework'
//   @observable
//   pets = ['cat1']
//   @computed
//   get petCount() {
//     return this.pets.length
//   }
//   @action
//   increase = () => {
//     this.pets.push('new cat')
//   }
//   @action
//   decrease = () => {
//     this.pets.pop()
//   }
// }
// const model = new Model()

// 写法 2 model
const model = new Mova({
  state: {
    name: 'fi3ework',
    pets: ['cat1']
  },
  action: {
    incr(state) {
      state.pets.push('new pats')
    },
    decr(state) {
      state.pets.pop()
    }
  },
  computed: state => {
    return { petsCount: state.pets.length }
  }
})

// // 写法 1 demo
// const PetsCounter = connect(
//   model,
//   model => {
//     return {
//       petsCount: model.petCount
//     }
//   }
// )(Title)

// 写法 2 demo
const PureTitle = props => {
  return <div className="App">{props.petsCount}</div>
}
const Title = connect(model)(PureTitle)

const List = props => {
  return props.pets.map(item => {
    return <p key={item}>{item}</p>
  })
}

const PureButtons = props => {
  return (
    <div>
      <button onClick={props.incr}>+</button>
      <button onClick={props.decr}>-</button>
    </div>
  )
}

const Buttons = connect(model)(PureButtons)

const App = () => {
  return (
    <div>
      <Title />
      <Buttons />
    </div>
  )
}

const globalTheme = observable({
  color: 'red'
})

const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider theme={globalTheme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  rootElement
)
