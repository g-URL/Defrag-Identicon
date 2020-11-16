// https://github.blog/2013-08-14-identicons/
// fetches identicon based on form input

class IdenticonForm extends React.Component {
    // https://reactjs.org/docs/forms.html
    constructor(props) {
        super(props);

        this.state = { 
            value: 'Please enter a valid GitHub handle.'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value })
    }

    handleSubmit(event) {


        alert('A submission was detected: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Handle:
                    <input type='text' value={this.state.value} onChange={this.handleChange} />
                    <img
                        src={'https://github.com/identicons/'+this.state.value+'.png'}
                    />
                </label>
                <input type='submit' value="submit" />
            </form>
        );
    }
}