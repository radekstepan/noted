import React, {Component} from 'react';
import {connect} from 'react-redux';

import Field from '../components/Field';

class AddBook extends Component {
  state = {title: '', author: '', description: ''};

  onChange = key =>
    e => this.setState({[key]: e.target.value});

  onSubmit = async e => {
    e.preventDefault();
    await this.props.addBook(this.state)
    this.props.navigate('/');
  }

  render() {
    return (
      <div id="main">
        <div className="modal">
          <div className="title">Add a Book</div>
          <form onSubmit={this.onSubmit}>
            <Field placeholder="Title" onChange={this.onChange('title')} />
            <Field placeholder="Author" onChange={this.onChange('author')} />
            <Field placeholder="Description" onChange={this.onChange('description')} />
            <div>
              <input type="submit" className="button" value="Save" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  navigate: dispatch.router.navigate,
  addBook: dispatch.books.addBook
});

export default connect(null, mapDispatch)(AddBook);
