import axios from 'axios'

export const getLocationInfo = () => axios.get('http://ipinfo.io')
