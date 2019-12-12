import React, {Component}  from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { getEvent, deleteEvent, putEvent } from '../actions';

class EventsShow extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
  }
  componentDidMount(){
    const { id } = this.props.match.params
    if (id) this.props.getEvent(id)
  }
  renderField(field){
    const { input, label, type, meta:{ touched, error} } = field
    return (
      <TextField
        hinttext={label}
        label={label}
        type={type}
        error={!!(touched && error)}
        helperText={touched && error}
        {...input}
        fullWidth={true}
      />
    )
  }

  async onDeleteClick() {
    const {id} = this.props.match.params
    await this.props.deleteEvent(id)
    this.props.history.push('/')
  }
  async onSubmit(values) {
    await this.props.putEvent(values)
    this.props.history.push('/')
  }

  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props
    const style={
      margin: 12
    }
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div><Field label='Title' name='title' type='text' component={this.renderField}/></div>
        <div>
          <Field label='Body' name='body' type='text' component={this.renderField}/>
        </div>
        <div>
          <Button type="submit" style={style} disabled= {pristine || submitting || invalid } >
            Submit
          </Button>
          <Button  style={style} href='/'>
            Cancel
          </Button>
          <Button  style={style} onClick={this.onDeleteClick}>
            Delete
          </Button>
        </div>
      </form>
    )
  }
}

const validate = values =>{
  const errors = {}

  if (!values.title) errors.title = 'Enter a title, please.'
  if (!values.body) errors.body = 'Enter a body, please.'

  return errors
}
const mapDispatchToProps = ({ deleteEvent, getEvent, putEvent })
const mapStateToProps = (state, ownProps) => {
  const event = state.events[ownProps.match.params.id]
  return { initialValues: event, event }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ validate, form: 'eventShowForm', enableReinitialize: true })(EventsShow)

)
