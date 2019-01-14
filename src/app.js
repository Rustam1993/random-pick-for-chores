import React, {Component} from 'react';
import Roulette from './Roulette';
import {ListGroupItem,ListGroup,FormGroup,Button,ControlLabel,FormControl} from 'react-bootstrap';
import Sound from 'react-sound';
class App extends Component {

    state = {
        todo : '',
        options: [],
        showWheel: false,
        winnerTodo: '',
        playing : Sound.status.STOPPED
    }
    componentWillMount(){
        this.reset()
    }
    showWheel = () =>{
        if(this.state.showWheel && (this.state.options.length > 1) ){
            return (
            <Roulette onComplete={this.onComplete} options={this.state.options} baseSize={250} />
            )
        } 
    }
    onComplete  = (text) => {
   
        this.setState({
            winnerTodo : text,
            
        })
       
    }
    rollWheel = () => {
        if(this.state.options.length > 1){
            this.setState({
                showWheel: true,
                playing : Sound.status.PLAYING
            })
        }
    }
    reset = () => {
        this.setState({
            todo : '',
            options : [],
            showWheel: false,
            winnerTodo: '',
            playing : Sound.status.STOPPED
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value }, () => {
                console.log(this.state)
            }
        )
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.todo){
        let todo = this.state.todo;
        this.setState({
            todo : '',
            options : [...this.state.options, todo],
        }, () =>{
            console.log(this.state);
        })
     }  
    }
    showTodo = () =>{
        let arr = this.state.options;
        let listItems  = arr.map((el,index) =>{
            return (
             <ListGroup>
                 <ListGroupItem bsClass='list-group-item' bsStyle='info' key = {index}>{el}</ListGroupItem>
             </ListGroup>
            )
        });
        if(arr.length) {
            return (
             <div>
                 <h3>Todos</h3>
                 {listItems}
             </div>
            )
        }
    }
    handleSound =() =>{
        if(this.state.winnerTodo){
            this.setState({
                playing : Sound.status.STOPPED
            })
        }
    }

    render(){
        console.log(this.state)
        return(
            <div>
                {this.showWheel()}
                <div>
                    <form className="form-margin" onSubmit = {this.handleSubmit}>
                        <ControlLabel>Add chore</ControlLabel>
                        <div>
                            <FormControl name="todo" onChange = {(e) => this.handleChange(e)} type="text" value={this.state.todo}  bsClass='width50' bsSize='lg'   placeholder="Enter text here" />
                        </div>
                        <div>
                        <Button  bsStyle="info"    onClick ={this.handleSubmit}>Add chore</Button >
                        <Button  bsStyle="success" onClick ={this.rollWheel}   >Start</Button >
                        <Button  bsStyle="danger"  onClick ={this.reset}   >Reset</Button >
                        </div>    
                    </form>
                    <div>
                        {this.showTodo()}
                    </div>
                </div>   
                <div>
                    <p>{this.state.winnerTodo}</p>
                </div>   
                <Sound
                 url="/Woody Spin.mp3"
                 playStatus={this.state.playing}
                 playFromPosition={300 /* in milliseconds */}
                 onLoading={this.handleSongLoading}
                 onPlaying={this.handleSongPlaying}
                 onFinishedPlaying={this.handleSongFinishedPlaying}
                 onStop = {this.handleSound}
                />  
            </div>        
                )
    }
}

export default App;



