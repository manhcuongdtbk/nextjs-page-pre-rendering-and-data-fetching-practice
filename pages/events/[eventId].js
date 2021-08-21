import {useRouter} from "next/router"
import {getEventById} from "../../dummy-data"
import {Fragment} from "react"
import EventSummary from "../../components/event-show/event-summary"
import EventLogistics from "../../components/event-show/event-logistics"
import EventContent from "../../components/event-show/event-content"
import ErrorAlert from "../../components/ui/error-alert/error-alert";
import Button from "../../components/ui/button";

function EventShowPage() {
  const router = useRouter()
  const eventId = router.query.eventId
  const event = getEventById(eventId)

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

export default EventShowPage
