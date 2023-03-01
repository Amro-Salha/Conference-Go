import Nav from './Nav.js'
import LocationForm from './LocationForm.js';
import AttendeesList from './AttendeesList.js';
import ConferenceForm from './ConferenceForm.js';
import AttendeeForm from './AttendeeForm.js';
import PresentationForm from './PresentationForm.js';
import MainPage from './MainPage.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App(props) {
  if (props.attendees === undefined){
    return null
  }
  return (
    <>
    <BrowserRouter>
    <Nav />
    <div className='container'>
      <Routes>

        <Route index element= {<MainPage />} />
        <Route path="conferences/new" element={<ConferenceForm/>}/>
        <Route path="attendees/new" element={<AttendeeForm/>}/>
        <Route path="locations/new" element={<LocationForm/>}/>
        <Route path="attendees" element={<AttendeesList attendees={props.attendees}/>}/>
        <Route path="presentations/new" element={<PresentationForm />}/>
      </Routes>


      {/* <AttendeeForm /> */}
      {/* <ConferenceForm />
      <LocationForm />
      <AttendeesList attendees = {props.attendees}/> */}
    </div>
    </BrowserRouter>
    </>
  );
}

export default App;
