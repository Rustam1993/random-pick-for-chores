import React, {Component} from 'react';
import Roulette from './Roulette';
import {ListGroupItem,ListGroup,FormGroup,Button,ControlLabel,FormControl} from 'react-bootstrap';
import Sound from 'react-sound';
import Popup from 'reactjs-popup'
class App extends Component {

    state = {
        todo : '',
        options: [],
        showWheel: false,
        winnerTodo: '',
        playing : Sound.status.STOPPED,
        style : {},
        popupOpen: false,
        showChoresForm : false,
        showNameForm : true,
        name: '',
        classForChoreForm : 'form-and-image'
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
            popupOpen : true
        })
    }
    rollWheel = () => {
        if(this.state.options.length > 1){
            this.setState({
                showWheel: true,
                playing : Sound.status.PLAYING,
                style : { display: 'none'},
                classForChoreForm :  "form-and-image1"
            })
        }
    }
    reset = () => {
        this.setState({
            todo : '',
            options : [],
            showWheel: false,
            winnerTodo: '',
            playing : Sound.status.STOPPED,
            popupOpen: false,
            style : {},
            classForChoreForm :  "form-and-image"

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
             <div className="todos">
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
    closeModal =() =>{
        this.setState({
            popupOpen:false
        })
    }
    showChoresForm = () =>{
        if(this.state.showChoresForm){
            return (
                <div className={this.state.classForChoreForm}>
                <form className="form-margin" onSubmit = {this.handleSubmit}>
                    <ControlLabel>Add chores</ControlLabel>
                    <div>
                        <FormControl name="todo" onChange = {(e) => this.handleChange(e)} type="text" value={this.state.todo}  bsClass='width50' bsSize='lg'   placeholder="Enter text here" />
                    </div>
                    <div>
                    <Button  bsStyle="info"    onClick ={this.handleSubmit}>Add</Button >
                    <Button  bsStyle="success" onClick ={this.rollWheel}   >Start</Button >
                    <Button  bsStyle="danger"  onClick ={this.reset}       >Reset</Button >
                    </div>    
                </form>
                <img style = {this.state.style} src='/90187b36a894dbc0b8386bf0180b7faba2611a3fdae1bef896bc526655ea1577.jpg' alt ='chores99' />
              </div>
            )
        }
    }
    showNameForm = () =>{
        if(this.state.showNameForm){
        return (
            <form className='name-form'>
                <ControlLabel>No time to explain! What's your name?</ControlLabel>
                <div>
                    <FormControl name="name" onChange = {(e) => this.handleChange(e)} type="text" value={this.state.name}  bsClass='width50' bsSize='lg'   placeholder="YOUR NAME" />
                </div>
                <Button bsClass='btn-name'   onClick ={this.handleNameInpput}>Ok, what's next?</Button >    
            </form>
        )
       }
    }
    handleNameInpput = () =>{
        this.setState({
            showNameForm : false,
            showChoresForm : true
        })
    }
    
    render(){
       
        return(
            <div>
            {this.showNameForm()}
            {this.showChoresForm()} 
            {this.showWheel()}
            {this.showTodo()}
            <Sound
            url="/Woody Spin.mp3"
            playStatus={this.state.playing}
            playFromPosition={300 /* in milliseconds */}
            onLoading={this.handleSongLoading}
            onPlaying={this.handleSongPlaying}
            onFinishedPlaying={this.handleSongFinishedPlaying}
            onStop = {this.handleSound}
            />
            <Popup
             open={this.state.popupOpen}
             closeOnDocumentClick
             onClose={this.closeModal}
            >
                <div>
                    <p>{this.state.winnerTodo}</p>
                        <Button  bsStyle="danger"  onClick ={this.reset}   >Start over</Button >
                    </div> 
            </Popup>  
        </div>        
            )
    }
}

export default App;



