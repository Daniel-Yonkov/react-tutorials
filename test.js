const rootElement = document.getElementById('root');
/** Pure JS approach */
// const element = document.createElement('div');
// element.textContent = 'Hello World';
// element.className = 'container';
// rootElement.appendChild(element);

/** React approach */

// const element = React.createElement(
//         'div',
//         {className: 'container', 
//         children: 'Hello World' },
//         'Hello World',
//     );

  /* JSX approach, requires babel */
  let element = <div className="container">Hello World</div>
  const content = 'Hello World';
  const className = 'container';
  //using interpolation {} - exits JSX and enters js land
  element = <div className={className}>{content}</div>

  //Using props and object spread
  const props = {
    className: className,
    children: content,
  }

  element = <div className='default-classname-if-not-provided-in-props' {...props} />

  //reausable components:
  const helloWorld = <div>Hello World</div>;
  const say = props => <div>{props.sentence}</div>;
  //required to capitalize in order to work with JSX templates
  const Say = say
  const SayChildren = props => <div>{props.children}</div>;
  element = 
  <div className='container'>
    {helloWorld}
    {helloWorld}
    {say({sentence:'Goodbye World'})}
    {say({sentence:'Hello World'})}
    {React.createElement(say,{sentence:'Hello from CreateElement'})}
    <Say sentence='Hello from JSX' />
    <SayChildren>Hey! I am a parent!
        <SayChildren>Uou I am nested?!</SayChildren>
    </SayChildren>
  </div>

  //strict prop types; requires prop-types library
  class SayHelloAsClass extends React.Component {
    static propTypes = {
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
    }
    render() {
        const {firstName, lastName} = this.props
        return (
            <div>
                Hello {firstName} {lastName}!
            </div>
            )
    }
  }

/* this is invalid type and missing prop */
// element = <SayHelloAsClass firstName={true}/>

/* valid example */
element = <SayHelloAsClass firstName='Daniel' lastName='Yonkov' />

/* usage of ternary operator in JSX as IF is not recognized: */

function Message({message}) {
  return (
    message ? 
    <div>{message}</div> :
    <div>No Message</div>
    )
}
element = <Message message={null} />
ReactDOM.render(element,rootElement);

/** Basics of rerendering. */
//Refreshes only the value - uncoment to see it in action
// function tick() {
//   const time = new Date().toLocaleTimeString();
//   const element = (
//     <div>
//       It is 
//       <input value={time} />
//     </div>
//   );
//   ReactDOM.render(element,document.getElementById('root'));
// }
// tick();
// setInterval(tick, 1000);

// //refreshes all the template - loses focus and interactivity. BAD EXAMPLE!

// function pureTick() {
//   const time = new Date().toLocaleTimeString();
//   const element = `<div>
//       It is 
//       <input value="${time}" />
//     </div>`;

//     rootElement.innerHTML = element;
// }
// pureTick();
// setInterval(pureTick, 1000);

/* Inline style and class definition in react components 
 * keep in mind that for interpolation we use BAT ticks `...`
 */
const Box = ({style, className='', size, ...props}) =>{
  const boxSize = size ? `box--${size}` : '';
  return (
    <div className = {`box ${className} ${boxSize}`.trim()}
      style={{paddingLeft:20,...style}}
      {...props}
    >
    {props.children}
    </div>
    );
}
element = (
  <div>
    <Box style={{backgroundColor:'lightblue'}} >Small box</Box>
    <Box style={{backgroundColor:'pink'}} className='box--medium'>Medium box</Box>
    <Box style={{backgroundColor:'lightgreen'}} size='large'>Large box</Box>
  </div>
)

ReactDOM.render(element,rootElement);

/** Event Handlers */

const state = {counter:0, userName:''};
const App = () => {
  return (
    <div>
      <p>There have been {state.counter} events</p>
      <p>
        <button onClick={() => setState({counter: state.counter + 1})}>press me</button>
      </p>
      <p>You typed: {state.userName}</p>
      <input onChange={setUsername} />
    </div>
    )
}
function clickEvent() {
  setState({
    counter: state.counter + 1
  })
}

function setUsername(event) {
  setState({
    userName: event.target.value,
  })
}

function setState(newState) {
  Object.assign(state, newState);
  renderApp();
}

function renderApp() {
  ReactDOM.render(<App />,document.getElementById('root'));  
}
renderApp();

class StopWatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time:0, 
      running:false,
    } 
    this.timer
  }

  handleTimer = () => {
    this.setState(state => {
      if(state.running) {
        clearInterval(this.timer)
      }
      else {
      const startTime = Date.now() - this.state.time;
      this.timer = setInterval(() => {
        this.setState({
          time: Date.now() - startTime
        })
      })
    }
    return {running: !state.running}
  })
}

  clearTimer = () => {
    this.setState({
      time:0,
      running:false,
    });
    clearInterval(this.timer);
  }
  render() {
    return (
      <div>
        <p> Time elapsed in miliseconds: {this.state.time}</p>
        <button onClick={this.handleTimer}>{this.state.running? 'Stop' : 'Start'}</button>
        <button onClick={this.clearTimer}>Clear</button>
      </div>
      )
  }
}


ReactDOM.render(<StopWatch />,rootElement);