import React, {Component} from 'react'
import './App.css'
import axios from 'axios'

class App extends Component {

  state ={
    jsonData : [],
    movie : [],
    synopsis : [],
    optionValues : [],
    selctedOption : 'rank',
    clickedVlaue : false,
    id : ''  
  }

  componentDidMount(){
    axios.get('top5MoviesAssessement.json')
      .then(response => {
        this.setState({
          jsonData : response.data,
          optionValues : [response.data.components[0].items[1].valueToOrderBy,response.data.components[0].items[0].valueToOrderBy],
          movie : response.data.components[1].items
        })
      })
  }

  handleChanger= (event) => {
    this.setState({
      selctedOption : event.target.value,
      clickedVlaue : false
    })
  }
  
  imageClicked = (id,synopsis) => {

    this.setState({
      clickedVlaue : true,
      synopsis : synopsis,
      id : id
    })
  }

    render(){

      const options = this.state.optionValues.map(val => {
        return <option value={val} key={val}>{val}</option>
      })

      const moviesDup = this.state.movie.sort((a,b) => a.[this.state.selctedOption] - b.[this.state.selctedOption]);
      const movies = moviesDup.map(mov => {
        return  <div key={mov.id}>
                  <img src={mov.imageUrl} alt="" onClick={()=>this.imageClicked(mov.id,mov.synopsis)}/>
                  {this.state.clickedVlaue && this.state.id === mov.id? 
                    <div>
                      <p>Title : {mov.title}</p>
                      <p>Released Year : {mov.releaseDate}</p>
                      <p>Synopsis : {mov.synopsis}</p>
                    </div>
                  : null}
                </div>
      })

      return(
        <div className="App">
            <h1>Top 5 Movies</h1>
            <select defaultValue="rank" onChange={this.handleChanger}>
              {options}
            </select>
            {movies}
        </div>
      );
    }
}

export default App