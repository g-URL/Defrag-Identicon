// https://github.blog/2013-08-14-identicons/
// fetches identicon based on form input

// IdenticonForm class based off of react tutorial
// https://reactjs.org/docs/forms.html
// https://www.sitepoint.com/work-with-forms-in-react/
class IdenticonForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { handle: 'g-url', identiconLetters: 'CGIKLNOQRSUVXY' };
        
        this.loadIdenticon = this.loadIdenticon.bind(this);
        this.handleIdenticonChange = this.handleIdenticonChange.bind(this);
        this.submitIdenticon = this.submitIdenticon.bind(this);

        this.loadDefrag = this.loadDefrag.bind(this);        
        this.handleDefragChange = this.handleDefragChange.bind(this);
        this.submitDefrag = this.submitDefrag.bind(this);

        this.identiconCanvas;
        this.identiconContext;
        this.defragCanvas;
        this.defragContext;

        // CAN WE DO THIS WITH A SPRITESHEET?
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

        this.moveV2 = new Image(64, 64);
        this.moveV2.src = './assets/icons/moveV2.png';

        this.optimized = new Image(64, 64);
        this.optimized.src = './assets/icons/optimized.png';

        this.read = new Image(64, 64);
        this.read.src = './assets/icons/read.png';        

        this.write = new Image(64, 64);
        this.write.src = './assets/icons/write.png';
    }

    handleIdenticonChange(event) {
        this.setState({ handle: event.target.value });
    }

    printLetters(context) {
        context.font = '32px Arial';

        let letter = 'A';
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                context.fillText(letter, (70 + (j*70)) - 12, 70 + (70*i) + 12);
                letter = String.fromCharCode(letter.charCodeAt() + 1);
            }
        }
    }

    generateIdenticonCanvas() {
        //this.identiconCanvas = document.getElementById('identiconCanvas');
        //this.identiconContext = this.identiconCanvas.getContext('2d');
        this.identiconCanvas.style = 'background: url(https://github.com/identicons/'+this.state.handle+'.png)';

        //this.printLetters(this.identiconContext);
    }

    submitIdenticon(event) {
        // prevents form data from clearing after button is pressed
        event.preventDefault();

        if (this.state.handle) {
            this.generateIdenticonCanvas();
        }
    }

    handleDefragChange(event) {
        this.setState({ identiconLetters: event.target.value });
    }

    getLocation(lowerBound, upperBound) {
        let location = (Math.random()*(upperBound-1-lowerBound) >> 0) + lowerBound;     // [lowerBound, length)
        return location;
    }

    drawIcons() {
        let length = this.state.identiconLetters.length;

        let writeLocation = this.getLocation(0, length);
        let readLocation = this.getLocation(writeLocation, length);

        let writePosition = this.state.identiconLetters[writeLocation].charCodeAt()-'A'.charCodeAt();
        let readPosition = this.state.identiconLetters[readLocation].charCodeAt()-'A'.charCodeAt();

        let badPosition = this.state.identiconLetters[this.getLocation(0, writeLocation)].charCodeAt()-'A'.charCodeAt();        
        let toBeMovedPosition = this.state.identiconLetters[this.getLocation(0, writeLocation)].charCodeAt()-'A'.charCodeAt();

        let badPosition2 = this.state.identiconLetters[this.getLocation(writeLocation, length)].charCodeAt()-'A'.charCodeAt();
        let toBeMovedPosition2 = this.state.identiconLetters[this.getLocation(writeLocation, length)].charCodeAt()-'A'.charCodeAt();

        let middlePosition = this.state.identiconLetters[this.getLocation(readLocation, length)].charCodeAt()-'A'.charCodeAt();
        let endPosition = this.state.identiconLetters[this.getLocation(readLocation, length)].charCodeAt()-'A'.charCodeAt();

        let letterIndex = 0;
        let letterPosition;
        for (let i = 0; i < 25; i++) {
            letterPosition = this.state.identiconLetters[letterIndex].charCodeAt()-'A'.charCodeAt();

            let rowPosition = (i/5) >> 0;
            let columnPosition = i - 5*rowPosition;

            let row = 38 + 68*columnPosition;
            let column = 38 + 68*rowPosition;

            // populate identicon-space
            if (i == letterPosition) {

                // draw bad/toBeMoved
                if (i < writePosition) {
                    if (badPosition < toBeMovedPosition) {
                        if (i <= badPosition) {
                            this.defragContext.drawImage(this.bad, row, column);

                        } else {
                            this.defragContext.drawImage(this.moveV2, row, column);
                        }

                    } else {
                        if (i <= toBeMovedPosition) {
                            this.defragContext.drawImage(this.moveV2, row, column);

                        } else {
                            this.defragContext.drawImage(this.bad, row, column);
                        }                    
                    }
                }

                // draw second batch of bad/toBeMoved
                if (i > writePosition) {
                    if (badPosition2 < toBeMovedPosition2) {
                        if (i <= badPosition2) {
                            this.defragContext.drawImage(this.bad, row, column);

                        } else {
                            this.defragContext.drawImage(this.moveV2, row, column);
                        }

                    } else {
                        if (i <= toBeMovedPosition2) {
                            this.defragContext.drawImage(this.moveV2, row, column);

                        } else {
                            this.defragContext.drawImage(this.bad, row, column);
                        }                    
                    }
                }

                // draw read
                if (i == readPosition) {
                    this.defragContext.drawImage(this.read, row, column);
                }

                // can overwrite read
                if (i == writePosition) {
                    this.defragContext.drawImage(this.write, row, column);
                }

                // overwrite possible bad/toBeMoved with middle and end
                if (i > readPosition) {
                    if (middlePosition < endPosition) {
                        if (i <= middlePosition) {
                            this.defragContext.drawImage(this.middle, row, column);

                        } else {
                            this.defragContext.drawImage(this.end, row, column);
                        }

                    } else {
                        if (i <= endPosition) {
                            this.defragContext.drawImage(this.end, row, column);

                        } else {
                            this.defragContext.drawImage(this.middle, row, column);
                        }                    
                    }                    
                }

                // increment index/position
                if (letterIndex < length-1) {
                    letterIndex++;
                }

            // populate negative-space
            } else {

                // everything preceeding write should be optimized, bad or toBeMoved
                if (i < writePosition) {
                    this.defragContext.drawImage(this.optimized, 38 + 68*columnPosition, 38 + 68*rowPosition);                    
                }

                /*
                if (writePosition < i && i < readPosition) {
                    // do nothing
                }
                */

                // everything after read should be beginning, bad or toBeMoved
                if (i > readPosition) {
                    this.defragContext.drawImage(this.beginning, 38 + 68*columnPosition, 38 + 68*rowPosition);                       
                }
            }
        }
    }

    generateDefragCanvas() {
//        this.defragCanvas = document.getElementById('defragCanvas');
//        this.defragContext = this.defragCanvas.getContext('2d');
        this.defragContext.clearRect(0, 0, 420, 420);

        this.defragContext.fillStyle = '#F0F0F0';
        this.defragContext.fillRect(0, 0, 420, 420);
    }

    // could sanitize further for bad input such as spaces and letters
    sanitizeIdenticonLetters() {
        let letters = new Set(this.state.identiconLetters.toUpperCase());
        letters = Array.from(letters).sort();
        this.state.identiconLetters = letters.join('');
    }

    submitDefrag(event) {
        // prevents form data from clearing after button is pressed
        event.preventDefault();

        if (this.state.identiconLetters) {
            this.sanitizeIdenticonLetters();
            this.generateDefragCanvas();
            this.drawIcons();
        }
    }

    loadIdenticon() {
        this.identiconCanvas = document.getElementById('identiconCanvas');
        this.identiconContext = this.identiconCanvas.getContext('2d');
        this.identiconCanvas.style = 'background: url(./files/35358105.png)';
        this.printLetters(this.identiconContext);
    }

    loadDefrag() {
        this.defragCanvas = document.getElementById('defragCanvas');
        this.defragContext = this.defragCanvas.getContext('2d');
        this.defragCanvas.style = 'background: url(./files/canvas.png)';
    }    

    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.submitIdenticon}>
                    <label htmlFor='handle'>Enter GitHub Handle:</label>
                    <br></br>
                    <input type='text' value={this.state.handle} onChange={this.handleIdenticonChange} />
                    <button type='submit'>Fetch Identicon!</button>    
                </form>
                <canvas id='identiconCanvas' height='420' width='420' ref={this.loadIdenticon} />
                <form onSubmit={this.submitDefrag}>
                    <label htmlFor='defragletters'>Enter Identicon Letters:</label>
                    <br></br>
                    <input type='text' value={this.state.identiconLetters} onChange={this.handleDefragChange} />
                    <button type='submit'>Defrag Identicon!</button>    
                </form>
                <canvas id='defragCanvas' height='420' width='420' ref={this.loadDefrag} />
            </React.Fragment>
        );
    }
}