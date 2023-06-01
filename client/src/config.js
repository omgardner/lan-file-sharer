// this code assumes that both the client and the server are locally hosted on the same IP but with different IP addresses
import { useContext, useReducer } from 'react';
export const SERVER_URL = `http://${window.location.hostname}:5000`
