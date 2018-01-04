import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import {Form, FormGroup, Input, Button} from 'reactstrap';
import randomInt from 'random-int';
import 'bootstrap/dist/css/bootstrap.css';
import LoadingBar from 'react-redux-loading-bar';
import configureStore from './configureStore';
import ConfirmationModal from './components/confirmation-modal';
import {fetch, add, edit, remove} from './actions';

import {CoreApi} from '../../src';

const store = configureStore();

class Demo extends Component {
  state = {
    name: this.props.user.firstName + this.props.user.lastName
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleFetch = () => this.props.fetch(randomInt(1, 12))
  handleCreate = () => this.props.add({name: this.state.name})
  handleUpdate = () => this.props.edit(this.props.user.id, {name: this.state.name})
  handleRemove = () => this.props.remove(this.props.user.id)

  componentWillReceiveProps({user}) {
    this.setState({
      name: user.firstName + user.lastName
    });
  }

  render() {
    const loadingComponent = () => (<LoadingBar/>);
    const toasterComponent = () => (
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
      />
    );

    return (
      <div>
        <link
          href="http://diegoddox.github.io/react-redux-toastr/7.1/react-redux-toastr.min.css"
          rel="stylesheet"
          type="text/css"
        />

        <style>
          {`
            .section-title {
              background: #333;
              color: #fff;
              display: inline-block;
              padding: 10px;
              margin-bottom: 1em;
            }
          `}
        </style>

        <CoreApi
          loadingComponent={loadingComponent}
          toasterComponent={toasterComponent}
          modalComponent={ConfirmationModal}
        />

        <div className="container">
          <div className="py-4">
            <h1 className="mb-0">Core API</h1>
          </div>

          <hr className="mt-0"/>

          <section className="section">
            <h3 className="section-title">Demo</h3>

            <div className="row align-items-center justify-content-center">
              <div className="col-11">
                <div className="row mb-5">
                  <div className="col-12">
                    <section>
                      <h4>Fetching</h4>

                      <pre>
                        <code>{JSON.stringify(this.props.user, null, 4)}</code>
                      </pre>

                      <Button onClick={this.handleFetch}>Fetch</Button>
                    </section>
                  </div>
                </div>

                <div className="row">
                  <div className="col-5">
                    <section>
                      <h4>Creating</h4>
                      <Form>
                        <FormGroup>
                          <Input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={this.state.name}
                            onChange={this.handleInputChange}
                          />
                        </FormGroup>

                        <Button block color="info" onClick={this.handleCreate}>Create</Button>
                      </Form>
                    </section>
                  </div>

                  <div className="col-5">
                    <section>
                      <h4>Updating</h4>

                      <Form>
                        <FormGroup>
                          <Input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={this.state.name}
                            onChange={this.handleInputChange}
                          />
                        </FormGroup>

                        <Button block color="success" onClick={this.handleUpdate}>Update</Button>
                      </Form>
                    </section>
                  </div>

                  <div className="col-2">
                    <section>
                      <h4>Deleteing</h4>

                      <Form>
                        <FormGroup>
                          <Input defaultValue={1} min="0" max="12" step="1" type="number" placeholder="id"/>
                        </FormGroup>

                        <Button block color="danger" onClick={this.handleRemove}>Delete</Button>
                      </Form>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

Demo.propTypes = {
  fetch: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = ({user}) => ({
  user
});

const mapDispatchToProps = dispatch => ({
  fetch: (...args) => dispatch(fetch(...args)),
  add: (...args) => dispatch(add(...args)),
  edit: (...args) => dispatch(edit(...args)),
  remove: (...args) => dispatch(remove(...args))
});

const ConnectedDemo = connect(mapStateToProps, mapDispatchToProps)(Demo);

render((
  <Provider store={store}>
    <ConnectedDemo/>
  </Provider>
), document.querySelector('#demo'));
