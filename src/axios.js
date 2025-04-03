import axios from 'axios';

// Set the base URL for all requests
axios.defaults.baseURL = 'http://80.78.24.212:5000/api';

// Enable sending credentials (cookies, authentication headers, etc.)
axios.defaults.withCredentials = true;

// Optionally set default headers (e.g., for JSON requests)
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default axios;
