import React, { Component } from 'react';
import axios from 'axios';
import { BASE_LOCAL_ENDPOINT } from "../constants";
import Character from '../components/Character';

class CharacterList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            characters: {
                content: [],
                error: false
            },
            newCharacterFrom: {
                name: "",
                location: "",
                status: "",
                species: "",
                gender: "",
                origin: "",
                image: ""
            },
            createCharacterError: false
         }
    }

    componentDidMount = () => {
        this.getCharacters();
    }

    getCharacters = () => {
        axios.get(`${BASE_LOCAL_ENDPOINT}/characters`)
        .then(response => {
            this.setState({
                characters: {
                    content: response.data,
                    error: ''
                },
                createCharacterError: false
            })
        })
        .catch(error => {
            this.setState({
                characters: {
                    error: error.message
                }
            })
        })
    }

    createCharacter = (e) => {
        e.preventDefault();
        const {
            newCharacterFrom: {
                name,
                location,
                status,
                species,
                gender,
                origin,
                image
            }
        } = this.state;
        
        axios.post(`${BASE_LOCAL_ENDPOINT}/characters`, {
            name,
            location,
            status,
            species,
            gender,
            origin,
            image
        }, {
            headers: { "Content-Type": "application/json"}
        })
        .then(() => { this.getCharacters() })
        .catch(() => { this.setState({ createCharacterError: true })})
    }

    createTextInput = (value, field) => (
        <input
            required
            type="text"
            placeholder={field}
            onChange={(e) => this.handleInputChange(e.target.value, field)}
            value={value}
        />
    )

    handleInputChange = (value, field) => {
        this.setState(prevState => ({
            newCharacterFrom: {
                ...prevState.newCharacterFrom,
                [field]: value
            }
        }))
    }

    render() { 
        const {
            createCharacterError,
            characters: { content, error },
            newCharacterFrom: {
                name,
                location,
                status,
                species,
                gender,
                origin,
                image
            }
        } = this.state;

        if (error) {
            return <div>Fetch Error: {error}</div>
        }

        return (
            <>  
                <h2>Create Character</h2>

                {createCharacterError && <p>An error ocurred creating Character</p>}
                <form onSubmit={e => this.createCharacter(e)}>
                    {this.createTextInput(name, 'name')}
                    {this.createTextInput(location, 'location')}
                    {this.createTextInput(status, 'status')}
                    {this.createTextInput(species, 'species')}
                    {this.createTextInput(gender, 'gender')}
                    {this.createTextInput(origin, 'origin')}
                    {this.createTextInput(image, 'image')}
                    <button type="submit">Create</button>
                </form>

                {content.map(({ id, image, name }) => (
                    <Character key={id} imgSrc={image} name={name}/>
                ))}
            </>
        );
    }
}
 
export default CharacterList;

