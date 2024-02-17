import {HeaderComponent} from "./components/header-component/header-component";
import './App.css';
import {TableComponent} from "./components/table-component/table-component";
import {Component} from "react";
export let isLoggedIn = localStorage.getItem('currentUser')

export class App extends Component {
    static init(){
        if (isLoggedIn === null) {
            localStorage.setItem('currentUser', JSON.stringify('none'));
            isLoggedIn = `"none"`
        }
    }
    render() {
        App.init()
        return isLoggedIn === `"none"` ? (
          <div className="App bg-light.bg-gradient">
            <HeaderComponent></HeaderComponent>
            <div
              className={'w-100 d-flex justify-content-center text-bg-danger'}>
              {' '}
              SIGN IN FIRST!
            </div>
          </div>
        ) : (
          <div className="App bg-light.bg-gradient">
              {console.log(isLoggedIn)}
            <HeaderComponent></HeaderComponent>
            <TableComponent></TableComponent>
          </div>
        );
    }
}

export default App;
