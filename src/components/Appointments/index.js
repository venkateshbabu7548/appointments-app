// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {title: '', date: '', appointmentsList: [], isSelected: false}

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {title, date} = this.state
    if (title !== '') {
      const newApp = {
        id: uuidv4(),
        title,
        date,
        isStarred: false,
      }
      this.setState(prevState => ({
        appointmentsList: [...prevState.appointmentsList, newApp],
        title: '',
        date: '',
      }))
    }
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachApp => {
        if (id === eachApp.id) {
          return {...eachApp, isStarred: !eachApp.isStarred}
        }
        return eachApp
      }),
    }))
  }

  onClickStarred = () => {
    this.setState(prevState => ({isSelected: !prevState.isSelected}))
  }

  render() {
    const {title, date, appointmentsList, isSelected} = this.state

    let filteredAppointments
    if (isSelected) {
      filteredAppointments = appointmentsList.filter(
        each => each.isStarred === true,
      )
    } else {
      filteredAppointments = appointmentsList
    }
    const starBG = isSelected ? 'special' : ''

    return (
      <div className="con">
        <div className="card">
          <div className="up-card">
            <div className="left">
              <h1>Add Appointments</h1>
              <form className="form-con" onSubmit={this.onSubmitForm}>
                <label htmlFor="title">TITLE</label>
                <input
                  type="text"
                  className="title"
                  id="title"
                  placeholder="Title"
                  onChange={this.onChangeTitle}
                  value={title}
                />
                <label htmlFor="date">DATE</label>
                <input
                  type="date"
                  className="title"
                  id="date"
                  onChange={this.onChangeDate}
                  value={date}
                />
                <button type="submit" className="button">
                  Add
                </button>
              </form>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="app-img"
              />
            </div>
          </div>
          <hr />
          <div>
            <div className="head">
              <h2 className="appointments">Appointments</h2>
              <button
                type="button"
                onClick={this.onClickStarred}
                className={`app-star ${starBG}`}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-con">
              {filteredAppointments.map(eachApp => (
                <AppointmentItem
                  key={eachApp.id}
                  details={eachApp}
                  toggleIsStarred={this.toggleIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
