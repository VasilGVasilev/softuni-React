import { request } from './util/requester'

const baseUrl = 'http://localhost:3030';

export const getAll =  () => {
    let m =  request(`${baseUrl}/data/games`);
    console.log(m);
    return m;
} 