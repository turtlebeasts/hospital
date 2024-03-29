import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/home/homepage"
import Doctors from "./pages/doctors/doctors"
import Dashboard from "./pages/dashboard/dashboard"
import Diet from "./pages/diet/diet"
import About from "./pages/about/about"
import Plist from "./pages/Plist/plist"
import Medicine from "./pages/medicine/medicine"
import Notfound from "./pages/notfound/notfound"
import ResponsiveAppBar from "./components/appbar/appbar"
import DiagHome from "./pages/diaghome/diaghome"
import PrescribeHome from "./pages/prescribehome/prescribehome"
import MedicineForm from "./pages/medicineform/medicineform"
import Staff from "./pages/staff/staff"
import SignIn from "./pages/signin/signin"
import Patient from "./pages/patient/patient"
import "./App.css"
import { ThemeProvider, createTheme } from "@mui/material";
import Printer from "./pages/printer/printer";
import Medicines from "./pages/medicines/medicines";
import MediaDashboard from "./pages/mediadashboard/mediadashboard";
import Testimonials from "./pages/testimonials/testimonials";


const theme = createTheme({
  palette: {
    primary: {
      main: '#006EBD'
    },
  }
})


function App() {
  const user = JSON.parse(sessionStorage.getItem('user'))
  
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ResponsiveAppBar />
        {
          user === null ?
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/home" element={<Homepage />} />
              <Route path="/staff" element={<Staff />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/diet" element={<Diet />} />
              <Route path="/about" element={<About />} />
              <Route path="/medicine" element={<Medicine />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="*" element={<Notfound />} />
            </Routes>
            :
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/entryform" element={<Dashboard />} />
              <Route exact path="/patient" element={<Plist />} />
              <Route exact path="/patient/:id" element={<Patient />} />
              <Route path="/diag/:id" element={<DiagHome />} />
              <Route path="/prescribe/:id" element={<PrescribeHome />} />
              {
                user.type == '1' || user.type == '3' ?
                  <Route path="/medicineform" element={<MedicineForm />} />
                  : <></>
              }
              {
                user.type == '1' || user.type == '3' ?
                  <Route path="/medicines/:id" element={<Medicines />} />
                  : <></>
              }
              <Route path="/print/:userid/:diagnosis" element={<Printer />}/>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/herbs" element={<MediaDashboard />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="*" element={<Notfound />} />
            </Routes>
        }

      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
