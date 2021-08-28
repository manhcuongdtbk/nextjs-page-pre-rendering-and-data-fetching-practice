import {getEventById, getAllEvents} from "../../helpers/api-utils"
import {Fragment} from "react"
import EventSummary from "../../components/event-show/event-summary"
import EventLogistics from "../../components/event-show/event-logistics"
import EventContent from "../../components/event-show/event-content"
import ErrorAlert from "../../components/ui/error-alert/error-alert";
import Button from "../../components/ui/button";

function EventShowPage(props) {
  const event = props.selectedEvent

  if (!event) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No Event found!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <EventSummary title={event.title}/>
      <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title}/>
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  )
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId
  const event = await getEventById(eventId)

  return {
    props: {
      selectedEvent: event
    }
  }
}

export async function getStaticPaths() {
  const events = await getAllEvents()
  const paths = events.map(event => ({params: {eventId: event.id}}))

  return {
    paths: paths,
    fallback: false
  }
}

export default EventShowPage
