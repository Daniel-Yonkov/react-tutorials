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