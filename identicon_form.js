// https://github.blog/2013-08-14-identicons/
// fetches identicon based on form input

// IdenticonForm class based off of react tutorial
// https://reactjs.org/docs/forms.html
// https://www.sitepoint.com/work-with-forms-in-react/
class IdenticonForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { handle: 'g-url', url: '' };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        // icons
        // this.bad = new Image(64,64);
        // this.bad.src = './assets/icons/bad.png';

        // this.beginning = new Image(64, 64);
        // this.beginning.src = './assets/icons/beginning.png';

        // this.end = new Image(64, 64);
        // this.end.src = './assets/icons/end.png';

        // this.middle = new Image(64, 64);
        // this.middle.src = './assets/icons/middle.png';        

        // this.move = new Image(64, 64);
        // this.move.src = './assets/icons/move.png';

        // this.optimized = new Image(64, 64);
        // this.optimized.src = '/assets/icons/optimized.png';

        // this.read = new Image(64, 64);
        // this.read.src = '/assets/icons/read.png';        

        // this.write = new Image(64, 64);
        // this.write.src = '/assets/icons/write.png';
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
        const canvas = document.getElementById('myCanvas');
        const context = canvas.getContext('2d');
        let img = document.getElementById('identicon');
        img.src = this.state.url;
        context.drawImage(img, 0, 0);   // looks like coordinates reflect upper-left-hand corner



        
        // this works!!!
       // context.drawImage(this.optimized, 0, 0);   // looks like coordinates reflect upper-left-hand corner
       // context.drawImage(this.optimized, 220, 220);   // looks like coordinates reflect upper-left-hand corner

        let pixelData = context.getImageData(1,1,1,1);
        console.log(pixelData);
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
                <img id='identicon' width='420' height='420' crossorigin src ={this.state.url}/>
                <br></br>
                <canvas id='myCanvas' height='420' width='420'>
                </canvas>
            </React.Fragment>
        );
    }
}