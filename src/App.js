import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container, Row, Navbar} from 'react-bootstrap';
import HomeComponent from './components/home/home';
import CocktailComponent from './components/cocktailComponent/cocktailComponent'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false
    } 
  }

  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="">
            <img
              alt=""
              src="/logo-site.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Cocktail Online
          </Navbar.Brand>
        </Navbar>
        <Container>
          <Row>
            <Router>
              <Switch>
                <Route path='/' exact render={(props=> <HomeComponent {...props} />)}></Route>
                <Route path='/detalle' exact render={(props=> <CocktailComponent {...props} />)}></Route>
              </Switch>
            </Router>
          </Row>
        </Container>
      </>
    );
  }
    
}

export default App;
