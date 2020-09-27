import React from 'react';
import {Menu} from 'semantic-ui-react';
import {BrowserRouter as Router, Route, Switch, NavLink} from 'react-router-dom';
import AddUser from "./components/AddUser";
import DeleteUser from "./components/DeleteUser";
import LoginUser from "./components/LoginUser";
import Home from "./components/Home";
import UserPage from "./components/UserPage";
import ExhibitForm from "./components/ExhibitForm";
import Gallery from "./components/Gallery";
import InventionPage from "./components/InventionPage";
import DropPage from "./components/DropPage";


class App extends React.Component{
  render() {
    return (
        <Router>
          <div>
            <Menu inverted>
              <Menu.Item
                name = "Home"
                as = {NavLink}
                to = "/"
              />
            </Menu>
            <Switch>
              <Route path = "/adduser" component = {AddUser}/>
              <Route path = "/deleteuser" component = {DeleteUser}/>
              <Route path = "/login" component = {LoginUser}/>
              <Route path = "/users/:name" component = {UserPage}/>
              <Route path = "/exhibit/:name" component = {ExhibitForm}/>
              <Route path = "/gallery/:name" component = {Gallery}/>
              <Route path = "/drop/:name" component = {DropPage}/>
              <Route path = "/invention/:name/:product" component = {InventionPage}/>
              <Route path = "/" component = {Home}/>
            </Switch>
          </div>
        </Router>
    );
  }
}
export default App;
