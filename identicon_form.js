// https://github.blog/2013-08-14-identicons/
// fetches identicon based on form input

// IdenticonForm class based off of react tutorial
// https://reactjs.org/docs/forms.html
// https://www.sitepoint.com/work-with-forms-in-react/
class IdenticonForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { url: '' };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.original = new Image(420,420);

        // icons
        this.bad = new Image(64,64);
        this.bad.src = './assets/icons/bad.png';

        this.beginning = new Image(64, 64);
        this.beginning.src = './assets/icons/beginning.png';

        this.end = new Image(64, 64);
        this.end.src = './assets/icons/end.png';

        this.middle = new Image(64, 64);
        this.middle.src = './assets/icons/middle.png';        

        this.move = new Image(64, 64);
        this.move.src = './assets/icons/move.png';

        this.optimized = new Image(64, 64);
        this.optimized.src = './assets/icons/optimized.png';

        this.read = new Image(64, 64);
        this.read.src = './assets/icons/read.png';        

        this.write = new Image(64, 64);
        this.write.src = './assets/icons/write.png';
    }

    handleChange(event) {
        this.setState({ url: 'https://github.com/identicons/'+event.target.value+'.png' });
    }

    // NEED TO CLICK BUTTON TWICE TO LOAD IMAGE INTO CANVAS?
    handleSubmit(event) {
        event.preventDefault();         // prevents form data from clearing after button is pressed
        console.log(this.state.url);

        // https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_canvas_drawimage
        const canvas = document.getElementById('myCanvas');
        const context = canvas.getContext('2d');

        // https://stackoverflow.com/questions/59604274/how-can-i-use-an-image-on-an-html5-canvas-without-previously-having-an-image-on
        let img = document.createElement('img');
        img.onload = function() {
            context.drawImage(img, 10, 10);
        }
        img.src = this.state.url;       // it's better if this follows the above code, not sure why
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
                {/* <img id='identicon' width='420' height='420' src ={this.state.url} />
                <br></br> */}
                <canvas id='myCanvas' height='420' width='420'>
                </canvas>
            </React.Fragment>
        );
    }
}