# Project Title

Convene

## Overview

This app is designed to help a user plan a hangout by suggesting places such as cafes and restaurants, along with the bus each person should take and the stop they will get off at. Currently, it is made for people in Vancouver, Burnaby, New Westminster, Coquitlam, Port Coquitlam, Port Moody, Richmond, Surrey, Delta, Tsawwassen, North Vancouver, West Vancouver, and Langley.

### Problem Space

To help people plan their meeting spots and make it accessible for both people, especially for those who rely on public transit.

It is sometimes challenging for people to decide on the optimal meeting location for hangouts. More so for commuters, as their destinations are limited by the transit options that are available to them. Inspired by this, my app eases the burden of searching for places that close to transit stops, along with being easily accessible from two starting locations using public transit in Metro Vancouver. Also to encourage the use of public transit, for the environment 😊.

### User Profile

A user wants to find places to hang out with their friend in Metro Vancouver, assuming the user knows the friend’s address. The user wants to use public trasnsit to find locations that are accessible for themselves and their friend using direct transit (no transfers).

### Features

User Manual:

1. Enter two locations (i.e your home address and your friend's home address) in the input fields.
2. Click the Submit button. It will take you to the Search page.
3. On the Search page you will see the two starting locations.
4. Under each location, you will see a list of routes that are within 500 meters of the starting location. This is the Routes section of the Search Page.
5. You will select one route from Location A list and one route from Location B list and click Submit. This will display the Stops section on the page, below the Routes section.
6. The Stops section will display a list of stop pairs, which is the destination stop from each location on the selected route.
7. You will click a stop pair button which will display the Places section below the Stops section, on the same page.
8. The Places section displays a list of cafes and restaurants that are within 500 meters of the stop pairs.
9. If there are more than one stop pair available, you may click on a different stop pair to see the locations in that area
10. If there are no stop pairs available for the chosen location, or if you would like to browse a different route, you may scroll up and select a different route. 


## Implementation

### Tech Stack

- React
- Express
- MYSQL
- Client Libraries:
  - react
  - react router dom
  - axios
  - sass
  - dotenv
- Server Libraries:
  - express
  - knex
  - kd-tree
  - grid index
  - dotenv
  - cors
  - mysql2


### APIs

- Overpass API (for places)
- Nominatim API (for geocoding and reverse geocoding)


### Sitemap

Home Page

- displayed on laungh
- two input fields
- submit button (redirect to search page)

Search Page

- displays the two starting locations entered by the user
- conditionally renders the routes, stops, and places components based on user interaction


### Mockups

#### Home Page

![Home Page on launch](src/assets/misc/home-page.JPG)
![Home Page with starting address filled in](src/assets/misc/home-page-with-inputJPG.JPG)

#### Search Page

![Search Page Routes Component](src/assets/misc/routes.JPG)
![Search Page when routes are selected](src/assets/misc/routes-selectedJPG.JPG)
![Search Page Stops Component](src/assets/misc/stops.JPG)
![Search Page when stops are selected](src/assets/misc/stops-selectedJPG.JPG)
![Search Page Places Component](src/assets/misc/places.JPG)


### Data

![Data Flow](src/assets/misc/data-flow.JPG)
![MYSQL Database Tables](src/assets/misc/sql-data.JPG)


### Endpoints

**GET /coordinates**

- Get the coordinates (latitude, longitude) for a given address

Parameters:

- address: User-provided location as a strong

Response:

```
{
    "latitude": 49.987654,
    "longitude": 23.567898
}
```

**GET /address**

- Get the address for a given coordinate

Parameters:

- latitude
- longitude

Response:

```
{
    "address": "2329 West Mall"
}
```

**GET /nearby-stops**

- Get nearby transit stops for a given location

Parameters:

- latitude
- longitude
- radius in meters

Response:

```
[
    {
      stop_id: 1,
      stop_code: 50001,
      stop_name: "Westbound Davie St @ Bidwell St",
      stop_lat: 49.286458,
      stop_lon: -123.140424,
      zone_id: "BUS ZN"
    },
    {...}
]

```

**GET /all-stops**

- Get all stops for a given route

Parameters:

- route id

Response:

```
[
    {
        route_id: 6613,
        route_name: "3 Main/To Waterfront Station",
        stop_id: 11251,
        stop_sequence: 1,
        dist_travelled: 0
    },
    {...}
]

```

**GET /places**

- Get places around a given coordinate

Parameters:

- latitude
- longitude
- radius in meters

Response:

```
[
    {
        place_id: 1,
        place_name: "Red River Cafe",
        place_lat: 49.87654,
        place_lon: 23.82254
    },
    {...}
]
```

**GET /route/id**

- Get details for a single route

Parameters:

- route id

Response:

```
{
    route_id: 6613,
    route_name: "3 Main/To Waterfront Station",
    stop_id: 11251,
    stop_sequence: 1,
    dist_travelled: 0
}
```

**GET /stop/id**

- Get details for a single stop

Parameters:

- stop id

Response:

```
{
    stop_id: 1,
    stop_code: 50001,
    stop_name: "Westbound Davie St @ Bidwell St",
    stop_lat: 49.286458,
    stop_lon: -123.140424,
    zone_id: "BUS ZN",
}
```

## Roadmap

### General to-do List
#### Buttons / Links
- submit starting locations
- single route
- submit route pair
- single stop pair

#### Components
- header
- input form
- routes list
- stop pairs list
- places list
- selected items tracker card

#### BACKEND
- set up database using knex
- migrate and seed files 
- set up get requests
- set up cors 
- set up .env and .env.sample files
- connect to frontend
- set up middleware 
- test on postman

#### FRONTEND
- create components
- style components 
- set up .env and .env.sample files
- connect to backend
- make api calls to the backend
- test app

### General Timeline
- complete backend by Friday, March 14th
- complete frontend by Thursday, March 19th
- final edits and practice presentation by Thursday, March 20th


---

## Future Implementations

- Autocomplete for the address input fields; using Photon API
- Interactive map component to display places; using map tiles from OpenStreetMap API
- Copy to Clipboard feature for places list and other relevant details such as routes and stops; using clipboard API
- More location types eg. cinema, parks, beaches etc
- Filter suggested places by category
- Show distance travelled from each starting location
- User can control the search radius for nearby bus stops, stop pairs, and places
