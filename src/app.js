import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Roulette from './Roulette';
import registerServiceWorker from './registerServiceWorker';
class App extends Component {

    state = {
        todo : '',
        options: [],
        showWheel: false,
        winnerTodo: '',
    }
    // handleOnComplete = (text) =>{
       
    //     setTimeout(() => {
    //        this.reset(); 
    //     }, 5500);
    //     return (
    //         <p>{text}</p>
    //     )
    // }
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
                showWheel: true
            })
        }
    }
    reset = () => {
        this.setState({
            todo : '',
            options : [],
            showWheel: false,
            winnerTodo: ''
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
        let todo = this.state.todo;
        this.setState({
            todo : '',
            options : [...this.state.options, todo],
        }, () =>{
            console.log(this.state);
        })
    }
    showTodo = () =>{
        let arr = this.state.options;
        let listItems  = arr.map((el,index) =>{
            return (
             <ul>
                 <li key = {index}>{el}</li>
             </ul>
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
    render(){
        console.log(this.state)
        return(
            <div>
                {this.showWheel()}
                <div>
                    <form onSubmit = {this.handleSubmit}>
                       <label>Add thing to do</label>
                       <input name='todo' value={this.state.todo} onChange = {e=> this.handleChange(e)} required />
                       <input type="submit" />
                    </form>
                    <button onClick ={this.rollWheel}>Start</button>
                    <div>
                        {this.showTodo()}
                    </div>
                </div>   
               <p>{this.state.winnerTodo}</p>
            </div>        
                )
    }
}

export default App;



