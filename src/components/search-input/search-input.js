import React from 'react'
import { Form,InputGroup, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './search-input.css';
class SearchInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: props.searchText
    }
  }

  handleValueChange = (event) => {
    this.setState({searchText: event.target.value});
    if(event.target.value == '') {
      this.props.submit();
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submit(this.state.searchText);
  };

  render() {
    return (
      <Form className="form-search" onSubmit={this.handleSubmit}>
        <InputGroup>
          <FormControl
            placeholder="Buscar receta"
            aria-label="Buscar receta"
            onChange={this.handleValueChange}
            defaultValue={this.state.searchText}
          />
          <InputGroup.Append>
            <Button type="submit" variant="outline-secondary">Button</Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    )
  }
}

export default SearchInput
