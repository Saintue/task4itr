import axios from 'axios';
import { Component } from 'react';

const baseURL = 'https://itransitask4.onrender.com';
export class Posts extends Component {
  static getUsers = () => {
    return new Promise((resolve, reject) => {
      axios
          .get(`${baseURL}/api/users`)
          .then(response => {
            console.log(response.data);
            resolve(response.data);
          })
          .catch(err => {
            reject(err);
          });
    });
  };

  static registerUser = user => {
    return new Promise((resolve, reject) => {
      axios
          .post(`${baseURL}/api/register`, user)
          .then(response => {
            resolve(response.data);
          })
          .catch(err => {
            reject(err);
          });
    });
  };

  static loginUser = user => {
    return new Promise((resolve, reject) => {
      axios
          .post(`${baseURL}/api/login`, user)
          .then(response => {
            resolve(response.data);
          })
          .catch(err => {
            reject(err);
          });
    });
  };

  static updateUsers = (users, type) => {
   return  new Promise((resolve, reject) => {
      if (type === 'block') {
        for (let i = 0; i < users.length; i++) {
          users[i].status = 'false';
        }
        console.log(users[0]);
        axios
            .put(`${baseURL}/api/block`, users)
            .then(response => {
              resolve(response.data)
              console.log(response.data);
            })
            .catch(err => {
              console.log(err);
              reject(err)
            });
      }
      if (type === 'unBlock') {
        for (let i = 0; i < users.length; i++) {
          users[i].status = 'true';
        }
        axios
            .put(`${baseURL}/api/unBlock`, users)
            .then(response => {
              console.log(response.data);
                resolve(response.data)
            })
            .catch(err => {
              console.log(err);
                reject(err)
            });
      }
    });
  };
  static deleteUsers = users => {
   return  new Promise((resolve, reject) => {
      for (let i = 0; i < users.length; i++) {
        axios
            .delete(`${baseURL}/api/delete/${users[i]._id}`)
            .then(response => {
              console.log(response.data);
              resolve(response.data)
            })
            .catch(err => {
              console.log(err);
              reject(err)
            });
      }
    });
  }
}