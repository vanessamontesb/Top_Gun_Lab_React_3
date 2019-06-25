import React, {Component} from 'react'
import '../components/filter.css'
import Prize  from "../components/Character";
import { BASE_LOCAL_ENDPOINT } from "../../src/constants";
import axios from 'axios';


class Filter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      prizes: {
        content: [],
    },
      filterText: "",
      nameText: ""
    }
  }
  getCharacters = () => {
    axios.get(`${BASE_LOCAL_ENDPOINT}/prizes`)
    .then(response => {
        this.setState({
            prizes: {
                content: response.data
            },
        })
    })
   
  }

  handleTextChange = (e, keyText) => {
    const value = e.target.value;
    this.setState({ [keyText]: value })
  }


  render () {
    const {
      prizes: { content },
  } = this.state;
    
  const {
    filterText,
  } = this.state;
  
  const filteredPrizes = content.filter(prize => prize.name.includes(filterText));


  return (
    <>
    
     
        <div className="filter-container">
        <input
          onChange={(e) => this.handleTextChange(e, "filterText")}
          placeholder="Filter prize by name"
          className="filter-field"
          type="text"
          value={filterText}
        />
      </div>

     
      {filteredPrizes.map(prize => (
          <Prize  key={prize.id} imgSrc={prize.imgSrc} name={prize.name} points={prize.points}  
          />
        ))}
    </>
  );
  }

}

export default Filter

