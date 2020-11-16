// https://github.blog/2013-08-14-identicons/
// fetches identicon based on form input

// IdenticonForm class based off of react tutorial
// https://reactjs.org/docs/forms.html
// https://www.sitepoint.com/work-with-forms-in-react/
class IdenticonForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            handle: '',
            url: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ handle: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.handle);
        this.setState({ url: 'https://github.com/identicons/'+this.state.handle+'.png' })
    }

    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='handle'>Enter GitHub Handle:</label>
                    <br></br>
                    <input type='text' value={this.state.handle} onChange={this.handleChange} />
                    <button type='submit'>Fetch Identicon!</button>    
                </form>
                <img src={this.state.url}/>
            </React.Fragment>
        );
    }
}