import React from 'react'
import { Container, Row, Col, Form, Spinner, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as apiService from '../../services/apiService';
class CocktailComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      cocktailData: "",
      isLoading: true
    }
  }
  
  componentDidMount = () => {
    var id = this.props.location.search.split("=");
    id = id.length > 1 ? id[1] : null;
    if(id) {
      apiService.getCocktailById(id).then(data => {
        this.setState({ isLoading: false, cocktailData: data[0] })
      }).catch(error => {
  
      })
    } else {
      this.props.history.push(`/`)
    }
  }

  renderCocktailIngredients = () => {
    console.log(this.state.cocktailData)
    return  this.state.cocktailData.ingredients.map(ingredient => {
      return (
        <Form.Control key={ingredient} plaintext readOnly defaultValue={ingredient} />
      );
    })
  }

  handlerGoBack = () => {
    this.props.history.push("/");
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
    var content = this.renderCocktailIngredients();
    return (
      <>
          <Container>
            <Row className="p-4">
              <Col className="mb-4" sm={12} md={12} lg={12} >
                <Button onClick={this.handlerGoBack} variant="primary">Volver </Button>
              </Col>
              <Col sm={4} md={4} lg={4} >
                <img className="card-img-top" src={this.state.cocktailData.picture} width="348" heigth="348"/>
              </Col>
              <Col sm={8} md={8} lg={8} >
                <Form>
                  <Form.Group as={Row} controlId="name">
                    <Form.Label column sm="2">
                      Nombre
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control plaintext readOnly defaultValue={this.state.cocktailData.name} />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="category">
                    <Form.Label column sm="2">
                      Categoria
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control plaintext readOnly defaultValue={this.state.cocktailData.category} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="category">
                    <Form.Label column sm="2">
                      Ingredientes
                    </Form.Label>
                    <Col sm="10">
                      {content}
                    </Col>
                  </Form.Group>
                </Form>
              </Col>      
            </Row>
            <Row className="p-4">
              <Col sm={12} md={12} lg={12} >
                <h1>Preparacion</h1>
              </Col>
              <Col sm={12} md={12} lg={12} >
                <p>{this.state.cocktailData.instructions}</p>
              </Col>
              
            </Row>
            
          </Container>
      </>
    )
  }
}

export default CocktailComponent
