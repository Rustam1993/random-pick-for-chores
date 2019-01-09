import React from 'react';
import ReactDOM from 'react-dom';
import Roulette from './Roulette';
import registerServiceWorker from './registerServiceWorker';



const handleOnComplete = (value) => {
  console.log(value);
};





class App extends React.Component {

    state = {
        first : '',
        second: '',
        third: '',
        fourth: '',
        fifth: '',
        options: [],
        showWheel: false
    }

    showWheel = () =>{
        if(this.state.showWheel && (this.state.options.length > 1) ){
            console.log(this.state.options.length)
            return (
                <Roulette options={this.state.options} baseSize={250} onComplete={handleOnComplete}/>
            )
        } 
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value }, () => {
                console.log(this.state)
            }
        )
    }

    handleSumbit = (e) =>{
        e.preventDefault();
        let arr = [ this.state.first, this.state.second, this.state.third, this.state.fourth, this.state.fifth ];

        for(let i = 0; i < arr.length; i++){
            if(!arr[i]) arr.splice(i,1);
        }

        this.setState({
          options : arr ,
          first : '',
          second: '',
          third: '',
          fourth: '',
          fifth: '',
          showWheel: !this.state.showWheel
        }, () => {
            console.log(this.state)
        })
    }

    render(){
        console.log(this.state)
        return(
            <div>
                
                {this.showWheel()}
                <form>
                    <h3>Up to 5 chores</h3>

                    <label>First</label>
                    <input name = "first" onChange = {(e) => this.handleChange(e)} type ="text" required />

                    <label>Second</label>
                    <input name = "second" onChange = {(e) => this.handleChange(e)} type ="text" required />

                    <label>Third</label>
                    <input name = "third" onChange = {(e) => this.handleChange(e)} type ="text" required />

                    <label>Fourth</label>
                    <input name = "fourth" onChange = {(e) => this.handleChange(e)} type ="text" required />

                    <label>Fifth</label>
                    <input name = "fifth" onChange = {(e) => this.handleChange(e)} type ="text" required />
                    <input type = "submit" onClick = {(e) => this.handleSumbit(e)} />
                </form>
            </div>

        )
    }

}


export default App;









