// Write your code here
import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {details, toggleIsStarred} = props
  const {id, title, date, isStarred} = details
  const splittedDate = date.split('-')
  const formattedDate = format(
    new Date(
      parseInt(splittedDate[0]),
      parseInt(splittedDate[2]),
      parseInt(splittedDate[1]),
    ),
    'dd MMMM yyyy, EEEE',
  )
  const onClickStar = () => {
    toggleIsStarred(id)
  }

  const star = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="each">
      <div className="head">
        <p>{title}</p>
        <button data-testid="star" type="button" className="star-button">
          <img
            src={star}
            alt="star"
            className="star-img"
            onClick={onClickStar}
          />
        </button>
      </div>
      <p className="date">{`Date: ${formattedDate}`}</p>
    </li>
  )
}
export default AppointmentItem
