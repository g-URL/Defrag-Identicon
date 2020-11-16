// https://github.blog/2013-08-14-identicons/
// fetches identicon based on form input

// IdenticonForm class based off of react tutorial
// https://reactjs.org/docs/forms.html
// https://www.sitepoint.com/work-with-forms-in-react/
class IdenticonForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            handle: 'g-url',
            url: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ handle: event.target.value });
    }

    // NEED TO CLICK BUTTON TWICE TO LOAD IMAGE INTO CANVAS?
    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.handle);
        this.setState({ url: 'https://github.com/identicons/'+this.state.handle+'.png' })

        // https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_canvas_drawimage
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        var img = document.getElementById("identicon")
        img.src = this.state.url;
        ctx.drawImage(img, 0, 0);

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
                <img id='identicon' width='420' height='420' src={this.state.url} alt=''/>
                <br></br>
                <canvas id='myCanvas' height='420' width='420'>
                </canvas>
            </React.Fragment>
        );
    }
}