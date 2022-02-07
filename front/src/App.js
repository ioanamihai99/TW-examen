import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from './pages/home/Home';
import { NavigationBar } from './components/NavigationBar'
import { MeetingDetailedView } from './pages/meeting/MeetingDetailedView'
function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <div style={{ padding: '20px' }}>
          <Switch>
            <Route exact path="/home" component={Home}></Route>
            <Route path="/meetings/:meetingId" component={MeetingDetailedView}></Route>

          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
