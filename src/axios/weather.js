import axios from 'axios'

import darkSkyApiKey from './secrets'

export const getForecast = location => axios.get(
  `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${darkSkyApiKey}/${location}?units=si`
)
