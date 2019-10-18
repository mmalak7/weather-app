import React, {
    Component
} from 'react';

import { Link } from 'react-router-dom';

import '../../styles/currentWeather.scss'
import '../../styles/weatherCard.scss'

import Cloud from '../img/cloud.png'
import Rain from '../img/rain.png';
import Snow from '../img/snow.png';
import Storm from '../img/storm.png';
import Sun from '../img/sun.png';

class CurrentWeather extends Component {

    state = {
        isLoading: false,
        press: '',
        name: '',
        temp: '',
        weatherIcon: '',
        post: '',
    }

    handleSubmit = async e => {
        e.preventDefault();

        const response = await fetch('/search-weather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.post
            }),
        });
        const body = await response.json();
        let weatherId = body.id;

        if (weatherId <= 232) {
            this.setState({
                weatherIcon: Storm
            })
        } else if (weatherId >= 300 && weatherId <= 531) {
            this.setState({
                weatherIcon: Rain
            });
        } else if (weatherId >= 600 && weatherId <= 622) {
            this.setState({
                weatherIcon: Snow
            });
        } else if (weatherId === 800) {
            this.setState({
                weatherIcon: Sun
            });
        } else if (weatherId >= 801 && weatherId <= 804) {
            this.setState({
                weatherIcon: Cloud
            });
        }

        this.setState({
            name: body.name,
            press: body.press,
            temp: body.temp,
            isLoading: true,
        })
    }

    changeState = () => this.setState({isLoading: false});

    render() {
        const WeatherCard = (
            <div>
                <div className='homeBtn'>
                    <Link to='/'>
                        <button onClick={this.changeState} >Back</button>
                    </Link>
                </div>
                <div className='cardContainer'>
                    <div className='card'>
                        <img src={this.state.weatherIcon} alt='Weather Icon' />
                        <div className='conditionsOverview'>
                            <p>Temperture: {this.state.temp}</p>
                            <p>Pressure: {this.state.press}</p>
                        </div>
                    </div>
                    <h4>{this.state.name}</h4>
                </div>
            </div>
        )


        const CurrentWeather = (
            this.state.isLoading === true ? <div> {WeatherCard} </div> :
                <div>
                    <div className='header'>
                        <h2>Display the weather in: </h2>
                    </div>
                    <div className='instructions'>
                        <p>enter location</p>
                    </div>
                    <div className='locationInput'>
                        <form onSubmit={this.handleSubmit}>
                            <input type="text"
                            placeholder='type here...'
                                value={this.state.post}
                                onChange={e => this.setState({ post: e.target.value })}

                            />
                            <button type="submit">Get weather</button>
                        </form>
                    </div>
                </div>
        )
        return (
            <>
                {CurrentWeather}
            </>
            //test comment
        )
    }
}

export default CurrentWeather;