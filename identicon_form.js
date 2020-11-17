// https://github.blog/2013-08-14-identicons/
// fetches identicon based on form input

// IdenticonForm class based off of react tutorial
// https://reactjs.org/docs/forms.html
// https://www.sitepoint.com/work-with-forms-in-react/
class IdenticonForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { handle: 'g-url', identiconLetters: 'CGIKLNOQRSUVXY' };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleSubmit2 = this.handleSubmit2.bind(this);

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
        this.setState({ handle: event.target.value });
    }

    
    // NEED TO CLICK BUTTON TWICE TO LOAD IMAGE INTO CANVAS?
    handleSubmit(event) {
        event.preventDefault();         // prevents form data from clearing after button is pressed
        console.log(this.state.handle);

        if (this.state.handle) {
            // https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_canvas_drawimage
            const canvas = document.getElementById('myCanvas');
            const context = canvas.getContext('2d');
            
            canvas.style = 'background: url(https://github.com/identicons/'+this.state.handle+'.png)';

            context.font = '32px Arial';

            let letter = 'A';
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < 5; j++) {
                    context.fillText(letter, (70 + (j*70)) - 12, 70 + (70*i) + 12);
                    letter = String.fromCharCode(letter.charCodeAt() + 1);
                }
            }

            // https://stackoverflow.com/questions/59604274/how-can-i-use-an-image-on-an-html5-canvas-without-previously-having-an-image-on
            // let img = document.createElement('img');
            // img.onload = function() {
            //     context.drawImage(img, 10, 10);
            //     context.drawLine
            // }
            // img.src = this.state.url;       // it's better if this follows the above code, not sure why
        }
    }


    handleChange2(event) {
        this.setState({ identiconLetters: event.target.value });
    }

    handleSubmit2(event) {
        event.preventDefault();         // prevents form data from clearing after button is pressed
        console.log(this.state.identiconLetters);

        const canvas2 = document.getElementById('myCanvas2');
        const context2 = canvas2.getContext('2d');

        canvas2.style = 'background-color: rgb(240, 240, 240)';

        let length = this.state.identiconLetters.length;

        for (let i = 0; i < length; i++) {
            const letterPosition = this.state.identiconLetters[i].charCodeAt()-'A'.charCodeAt();
            const rowPosition = (letterPosition/5) >> 0;
            const columnPosition = letterPosition - 5*rowPosition;
            context2.drawImage(this.optimized, 38 + 68*columnPosition, 38 + 68*rowPosition);
        }

        let letter = 'A';
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                context2.fillText(letter, (70 + (j*70)) - 12, 70 + (70*i) + 12);
                letter = String.fromCharCode(letter.charCodeAt() + 1);
                
            }
        }
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
                <canvas id='myCanvas' height='420' width='420' />

                <form onSubmit={this.handleSubmit2}>
                    <label htmlFor='defragletters'>Enter Identicon Letters:</label>
                    <br></br>
                    <input type='text' value={this.state.identiconLetters} onChange={this.handleChange2} />
                    <button type='submit'>Defrag Identicon!</button>    
                </form>
                <canvas id='myCanvas2' height='420' width='420' />




            </React.Fragment>
        );
    }
}