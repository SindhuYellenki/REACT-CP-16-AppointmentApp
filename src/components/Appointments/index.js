import {Component} from 'react'

import {format} from 'date-fns'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {appointmentsList: [], title: '', date: '', starred: false}

  onChangeTitle = e => {
    this.setState({title: e.target.value})
  }

  onChangeDate = e => {
    const date = e.target.value
    const dateObj = new Date(date)

    const formattedDate = format(
      new Date(dateObj.getFullYear(), dateObj.getDate(), dateObj.getMonth()),
      'dd MMMM yyyy, EEEE',
    )

    this.setState({date: formattedDate})
  }

  onSubmitUpdateState = e => {
    e.preventDefault()
    const {title, date, appointmentsList} = this.state
    const newAppointment = {id: uuidv4(), title, date, isStarred: false}
    this.setState(p => ({
      appointmentsList: [...p.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onClickedStarred = async () => {
    this.setState(p => ({starred: !p.starred}))
  }

  updateStarredAppointment = id => {
    this.setState(p => ({
      appointmentsList: p.appointmentsList.map(each => {
        if (each.id === id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  getFilteredList = () => {
    const {appointmentsList, starred} = this.state
    if (starred) {
      return appointmentsList.filter(each => each.isStarred === true)
    }
    return appointmentsList
  }

  render() {
    const {appointmentsList, title, date, starred} = this.state
    const filterdList = this.getFilteredList()
    console.log(date)
    return (
      <div className="bg-container">
        <div className="content-container">
          <div className="top-container">
            <div className="left-container">
              <h1 className="heading">Add Appointment</h1>
              <form onSubmit={this.onSubmitUpdateState}>
                <label htmlFor="title" className="label">
                  Title
                </label>
                <input
                  type="input"
                  id="title"
                  placeholder="Title"
                  className="inputElement"
                  onChange={this.onChangeTitle}
                  value={title}
                />
                <label htmlFor="date" className="label">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  placeholder="dd/mm/yyyy"
                  className="inputElement"
                  onChange={this.onChangeDate}
                  value={date}
                />
                <button type="submit" className="button">
                  Add
                </button>
              </form>
            </div>
            <img
              className="image"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr />
          <div className="bottom-header">
            <h1 className="appointments">Appointments</h1>
            <button
              type="button"
              className="starred"
              onClick={this.onClickedStarred}
            >
              Starred
            </button>
          </div>
          <ul className="listContainer">
            {filterdList.map(each => (
              <AppointmentItem
                details={each}
                key={each.id}
                updateStarredAppointment={this.updateStarredAppointment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
