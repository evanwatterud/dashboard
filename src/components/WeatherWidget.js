import React from 'react'

import * as locationApi from '../axios/location'
import * as weatherApi from '../axios/weather'

class WeatherWidget extends React.Component {
  constructor(props) {
    super(props)

    this.state = { loading: true, forecast: null, error: null }
  }

  componentDidMount() {
    locationApi.getLocationInfo()
      .then((locationRes) => {
        weatherApi.getForecast(locationRes.data.loc)
          .then(weatherRes => this.setState({ loading: false, forecast: weatherRes.data }))
          .catch(err => this.setState({ error: err }))
      })
      .catch(err => this.setState({ error: err }))
  }

  render() {
    const { loading, error, forecast } = this.state

    return (
      <div>
        {loading
          ? <span>Loading...</span>
          : (
            <React.Fragment>
              <span>{forecast.currently.summary}</span>
              <span>{forecast.hourly.summary}</span>
              <span>{forecast.daily.summary}</span>
            </React.Fragment>
          )}
        { error && <p>{error.message}</p> }
      </div>
    )
  }
}

export default WeatherWidget
