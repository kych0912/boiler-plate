import axios from 'axios';
import {LOGIN_USER, REGISTER_USER,AUTH} from './types';

export function loginUser(dataToSubmit){

    //서버에서 받은 데이터를 request에 저장
    const request = axios.post('/api/users/login',dataToSubmit).then(response=>
       response.data
    );

    return {
        type:LOGIN_USER,
        payload : request
    }

}

export function registerUser(dataToSubmit){

    //서버에서 받은 데이터를 request에 저장
    const request = axios.post('/api/users/register',dataToSubmit).then(response=>
       response.data
    );

    return {
        type:REGISTER_USER,
        payload : request
    }

}

export function auth(){
    //서버에서 받은 데이터를 request에 저장
    const request = axios.get('/api/users/auth').then(response=>
        response.data
     );
 
     return {
         type:AUTH,
         payload : request
     }
}