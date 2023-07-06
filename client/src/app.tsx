import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'

import MainLayout from './layouts/main-layout'
import Driver from './pages/driver'
import DriverStandingsByYear from './pages/driver-standings-by-year'
import Drivers from './pages/drivers'
import Race from './pages/race'
import Races from './pages/races'
import Team from './pages/team'
import TeamStandingsByYear from './pages/team-standings-by-year'
import Teams from './pages/teams'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={MainLayout}>
          <Route index element={<Navigate to="/races/2023" />} />
          <Route path="races">
            <Route path=":year" Component={Races} />
            <Route path=":year/:id" Component={Race} />
          </Route>
          <Route path="drivers">
            <Route path=":year" Component={Drivers} />
            <Route path=":year/:slug" Component={Driver} />
            <Route path="alltime/:slug" Component={DriverStandingsByYear} />
          </Route>
          <Route path="teams">
            <Route path=":year" Component={Teams} />
            <Route path=":year/:slug" Component={Team} />
            <Route path="alltime/:slug" Component={TeamStandingsByYear} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}
