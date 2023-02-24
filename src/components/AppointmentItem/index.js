import './index.css'

const AppointmentItem = props => {
  const {details, updateStarredAppointment} = props
  const {id, title, date, isStarred} = details

  const starUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    console.log('itemTriggered')
    updateStarredAppointment(id)
  }

  return (
    <li className="listItemContainer">
      <div className="top">
        <p className="title">{title}</p>
        <button
          type="button"
          className="button"
          data-testId="star"
          onClick={onClickStar}
        >
          <img src={starUrl} alt="star" className="star" />
        </button>
      </div>
      <p className="date">Date:{date}</p>
    </li>
  )
}

export default AppointmentItem
