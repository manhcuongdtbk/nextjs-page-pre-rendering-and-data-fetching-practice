import {useRouter} from "next/router"
import EventList from "../../components/events/event-list"
import ResultsTitle from "../../components/results-title/results-title"
import {Fragment, useEffect, useState} from "react"
import Button from "../../components/ui/button"
import ErrorAlert from "../../components/ui/error-alert/error-alert"
import useSWR from "swr"

const fetcher = (...args) => fetch(...args).then(res => res.json())

function FilteredEventsPage() {
  const [loadedEvents, setLoadedEvents] = useState([])
  const router = useRouter()
  const filterData = router.query.slug
  const {
    data,
    error
  } = useSWR('https://nppradfp-default-rtdb.asia-southeast1.firebasedatabase.app/events.json', fetcher)

  useEffect(() => {
    if (data) {
      const events = []

      for (const key in data) {
        events.push({
          id: key,
          ...data[key]
        })
      }

      setLoadedEvents(events)
    }
  }, [data])

  if (!loadedEvents) {
    return (
      <p className="center">Loading...</p>
    )
  }

  const filteredYear = filterData[0]
  const filteredMonth = filterData[1]
  const numYear = +filteredYear
  const numMonth = +filteredMonth

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear < 2021 ||
    numYear > 2030 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    )
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date)
    return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1
  })

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    )
  }

  const date = new Date(numYear, numMonth - 1)

  return (
    <Fragment>
      <ResultsTitle date={date}/>
      <EventList items={filteredEvents}/>
    </Fragment>
  )
}

export default FilteredEventsPage
