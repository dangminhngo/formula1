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
          <Route index element={<Navigate to="/2023/races" />} />
          <Route path=":year">
            <Route path="races" Component={Races} />
            <Route path="races/:id" Component={Race} />
            <Route path="drivers" Component={Drivers} />
            <Route path="drivers/:slug" Component={Driver} />
            <Route path="teams" Component={Teams} />
            <Route path="teams/:slug" Component={Team} />
          </Route>
          <Route path="drivers/:slug" Component={DriverStandingsByYear} />
          <Route path="teams/:slug" Component={TeamStandingsByYear} />
        </Route>
      </Routes>
    </Router>
  )
}
