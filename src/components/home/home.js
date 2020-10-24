import React from 'react'
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';
import * as apiService from '../../services/apiService';
import SearchInput from '../search-input/search-input';
class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      searchText: '',
      error: false,
      cocktailsReference: [],
      cocktailsResults: []
    }
  }
  
  componentDidMount = () => {
    apiService.getListRandomCocktail(9).then(data => {
      this.setState({ isLoading: false, cocktailsReference: data })
    }).catch(error => {

    })
  }

  handlerSubmit = (value) => {
    this.setState({isLoading: true})
    if(value) {
      apiService.getCocktailFilteredName(value).then(data => {
        this.setState({ isLoading: false, cocktailsResults: data, searchText: value })
      }).catch(error => {
  
      })
    } else {
      this.setState({ isLoading: false, searchText: value })
    }
  } 

  renderCardsCocktails = () => {
    var cocktailsList = this.state.searchText ? this.state.cocktailsResults : this.state.cocktailsReference;
    return  cocktailsList.map(cocktail => {
      return (
        <Col key={cocktail.id} sm={4} md={4} lg={4} className="mb-4">
            <Card>
                <Card.Img variant="top" src={cocktail.picture} width="348" heigth="348" />
                <Card.Body>
                    <Card.Title>Nombre: {cocktail.name}</Card.Title>
                    <Card.Text>
                      <span>Es Alcolica?: {cocktail.isAlcoholic ? 'Si' : 'No'}</span>
                    </Card.Text>
                    <Card.Text>
                      <span>Categoria: {cocktail.category}</span>
                    </Card.Text>
                    <div className="d-flex justify-content-center align-content-center">
                    <Link to={"/detalle?id=" + cocktail.id}>
                        <Button variant="primary">Ir a receta</Button>
                    </Link>
                    </div>
                </Card.Body>
            </Card>           
        </Col>
      );
    })
  }

  render() {
    if(this.state.isLoading) {
      return (
      <Container>
        <Row className="justify-content-center mt-4 spinner-container">
          <Spinner animation="border" variant="primary" />      
        </Row>
      </Container>
      )
    }
    return (
      <>
          <Container>
            <Row className="justify-content-center mt-4">
                <SearchInput searchText={this.state.searchText} submit={this.handlerSubmit}></SearchInput>         
            </Row>
            <Row className="mt-4 mb-4 text-reference">
                <span>Recomendaciones Populares</span>  
            </Row>
            <Row className="mt-4 mb-4 text-reference">  
            {
              this.renderCardsCocktails()
            }
            </Row>
            
          </Container>
      </>
    )
  }
}

export default HomeComponent
