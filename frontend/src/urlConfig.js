const baseUrl = "https://ecomm-admin-dash.herokuapp.com/";

export const api = `${baseUrl}/`;

//export const api = 'http://localhost:5000/'; 
export const  generatePublicUrl = (fileName) =>{
    return `http://localhost:5000/public/${fileName}`;
}