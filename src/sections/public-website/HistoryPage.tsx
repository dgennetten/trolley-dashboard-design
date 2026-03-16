import { HistoryPage } from './components/HistoryPage'
import type { HistorySection } from './components/HistoryPage'

const historySections: HistorySection[] = [
  {
    title: 'The Birth of Fort Collins Electric Railway',
    body: `Fort Collins\u2019 electric streetcar system began in 1907 when the Denver & Interurban Railroad extended its line to serve the growing city. The streetcars ran along Mountain Avenue, connecting neighborhoods to the downtown core and City Park.\n\nFor decades, the trolleys were a vital part of daily life in Fort Collins, carrying residents to work, school, and recreation. The distinctive green streetcars became an iconic symbol of the city.`,
    icon: 'tram',
  },
  {
    title: 'Founding of the FCMRS \u2014 1980',
    body: `The Fort Collins Municipal Railway Society was formed in 1980 with an ambitious mission: complete the painstaking restoration of Car 21, restore the 1.5-mile line from City Park to Howes Street, and partner with the City to bring heritage railway service back to life.\n\nWhat began as a small group of passionate volunteers quickly grew into a dedicated organization determined to preserve this piece of Fort Collins history.`,
    icon: 'calendar',
  },
  {
    title: 'Seven Years Restoring Car 21',
    body: `The restoration of Car 21 was a monumental undertaking. Volunteers spent seven painstaking years bringing the streetcar back to operational condition, while line restoration took nearly five additional years.\n\nAlthough the complete restoration has been appraised at over $2.5 million, it was accomplished at no cost to the City. All materials for restoring track were donated by local railroads and businesses. Volunteers even helped salvage rail from local railroads, including an abandoned mountain tourist line in the dead of winter.`,
    icon: 'wrench',
  },
  {
    title: 'Recognition & Ongoing Operation',
    body: `The Society\u2019s work restoring Car 21 and the Mountain Avenue line has earned both local and national recognition, including the Department of Transportation Award for Outstanding Public Service and designation as a Fort Collins Local Landmark on the National Register of Historic Places.\n\nToday, the Society operates Cars 21 and 25 on scheduled weekends from May through September, running every 30 minutes between City Park and Old Town. The FCMRS conducts regular written and on-line operator training to ensure safe operation, and our line is governed by the Federal Railways Administration (FRA), who performs annual safety inspections.\n\nNow celebrating over 40 years as a heritage railway, the Fort Collins Trolley continues to delight visitors and residents alike, preserving the living history of electric public transportation in Fort Collins.`,
    icon: 'award',
  },
]

export default function HistoryPagePreview() {
  return (
    <HistoryPage
      sections={historySections}
      onNavigate={(href) => console.log('Navigate:', href)}
    />
  )
}
