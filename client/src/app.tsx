import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'

import MainLayout from './layouts/main-layout'
import Driver from './pages/driver'
import DriverOverYear from './pages/driver-over-year'
import Drivers from './pages/drivers'
import Race from './pages/race'
import Races from './pages/races'
import Team from './pages/team'
import TeamOverYear from './pages/team-over-year'
import Teams from './pages/teams'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:year" Component={MainLayout}>
          <Route path="races" Component={Races} />
          <Route path="races/:id" Component={Race} />
          <Route path="drivers" Component={Drivers} />
          <Route path="drivers/:slug" Component={Driver} />
          <Route path="teams" Component={Teams} />
          <Route path="teams/:slug" Component={Team} />
        </Route>
        <Route path="/" Component={MainLayout}>
          <Route path="drivers/:slug" Component={DriverOverYear} />
          <Route path="teams/:slug" Component={TeamOverYear} />
        </Route>
        <Route path="*" element={<Navigate to="/2023/races" />} />
      </Routes>
    </Router>
  )
}
