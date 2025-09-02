import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import * as authService from './services/authService.js'
import * as projectService from './services/projectService.js'
import * as categoryService from './services/categoryService'
import * as expenseService from './services/expenseService'
import Landing from './components/Landing/Landing'
import CalculationForm from './components/Calculation/CalculationForm.jsx'
import BarChartDisplay from './components/Chart/BarChartDisplay.jsx'

const App = () => {
  const navigate = useNavigate()
  const initialState = authService.getUser()

  const [user, setUser] = useState(initialState)
  const [projects, setProjects] = useState([])

  useEffect(() => {
    
    const fetchAllProjects = async () => {
      if (user) {
      try {
          const projectsData = await projectService.index()
          setProjects(projectsData || [])
      } catch (err) {
        console.error('Failed to fetch projects:', err)
      }
    }
    }
    fetchAllProjects()
  }, [user])

  const handleSignUp = async (formData) => {
    try {
      const res = await authService.signUp(formData)
      setUser(res)
      return { success: true }
    } catch(err){
      return { success: false, message: err.message }
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem('token')
    setUser(null)
    setProjects([])
  }

  const handleSignIn = async (formData) => {
    try {
      const res = await authService.signIn(formData)
      setUser(res)
      return { success: true }
    } catch (err) {
      return { success: false, message: err.message }
    }
  }

  
  return (
    <>
      <NavBar user={user} handleSignOut={handleSignOut} />
      <Routes>
          {user ? (
            // Protected Routes
            <>
            <Route path='/create-project' element={<CalculationForm user={user} />} />
            </>

          ) : (
            // Public Routes
            <> 
              <Route path='/sign-up' element={<SignUp handleSignUp={handleSignUp} user={user} />} />
              <Route path='/sign-in' element={<SignIn handleSignIn={handleSignIn} user={user} />} />
            </>
          )}
          <Route path='/' element={<Landing />} />
          <Route path='*' element={<h1>404 PAGE NOT FOUND</h1>} />
      </Routes>
      {/* <Footer /> */}
    </>
  )
}

export default App