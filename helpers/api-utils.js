export async function getAllEvents() {
  // nppradfp is short for nextjs-page-pre-rendering-and-data-fetching-practice which is the name of this project
  // Change the URL below to whatever backend api you use to return all events
  const response = await fetch('https://nppradfp-default-rtdb.asia-southeast1.firebasedatabase.app/events.json')
  const data = await response.json()
  const events = []

  for (const key in data) {
    events.push({
      id: key,
      ...data[key]
    })
  }

  return events
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents()
  return allEvents.filter((event) => event.isFeatured)
}

export async function getEventById(id) {
  const allEvents = await getAllEvents()
  return allEvents.find((event) => event.id === id)
}
