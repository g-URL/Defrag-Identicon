// required if using babel CDN
// https://stackoverflow.com/questions/38219311/reactjs-uncaught-referenceerror-require-is-not-defined
const { Component } = React;
const { render } = ReactDOM;

ReactDOM.render(<IdenticonForm />, document.getElementById('root'));
//ReactDOM.render(<h3>Hello World!</h3>, document.getElementById('root'))