import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
// import Footer from './components/Footer/Footer'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
// import ProjectList from './components/ProjectList/ProjectList'
// import ProjectDetails from './components/ProjectDetails/ProjectDetails'
// import ProjectForm from './components/ProjectForm/ProjectForm'
// import CategoryForm from './components/CategoryForm/CategoryForm'
// import CategoryDetails from './components/CategoryDetails/CategoryDetails'
// import ExpenseForm from './components/ExpenseForm/ExpenseForm'
import * as authService from './services/authService.js'
import * as projectService from './services/projectService'
import * as categoryService from './services/categoryService'
import * as expenseService from './services/expenseService'
import Landing from './components/Landing/Landing'
// import Dashboard from './components/Dashboard/Dashboard'

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

  const handleAddProject = async (formData) => {
    try {
      const newProject = await projectService.create(formData)
      setProjects([newProject, ...projects])
      navigate('/projects')
    } catch (err) {
      console.error('Failed to create project:', err)
    }
  }

  const handleDeleteProject = async (projectId) => {
    try {
      await projectService.deleteProject(projectId)
      setProjects(projects.filter((project) => project.id !== projectId))
      navigate('/projects')
    } catch (err) {
      console.error('Failed to delete project:', err)
    }
  }

  const handleUpdateProject = async (formData, projectId) => {
    try {
      const updatedProject = await projectService.update(formData, projectId)
      setProjects(projects.map(p => p.id === projectId ? updatedProject : p))
      navigate(`/projects/${projectId}`)
    } catch (err) {
      console.error('Failed to update project:', err)
    }
  }

  const handleAddCategory = async (formData, projectId) => {
    try {
      await categoryService.create(formData, projectId)
     
    } catch (err) {
      console.error('Failed to create category:', err)
    }
  }

  const handleUpdateCategory = async (formData, categoryId) => {
    try {
      await categoryService.update(formData, categoryId)
     
    } catch (err) {
      console.error('Failed to update category:', err)
    }
  }

  const handleDeleteCategory = async (categoryId) => {
    try {
      await categoryService.deleteCategory(categoryId)
    } catch (err) {
      console.error('Failed to delete category:', err)
    }
  }

  const handleAddExpense = async (formData, categoryId) => {
    try {
      await expenseService.create(formData, categoryId)
      
    } catch (err) {
      console.error('Failed to create expense:', err)
    }
  }

  const handleUpdateExpense = async (formData, expenseId) => {
    try {
      await expenseService.update(formData, expenseId)
     
    } catch (err) {
      console.error('Failed to update expense:', err)
    }
  }

  const handleDeleteExpense = async (expenseId) => {
    try {
      await expenseService.deleteExpense(expenseId)
    } catch (err) {
      console.error('Failed to delete expense:', err)
    }
  }

  return (
    <>
      <NavBar user={user} handleSignOut={handleSignOut} />
      <Routes>
          {user ? (
            // Protected Routes
            <>
            {/* <Route path='/dashboard' element={<Dashboard user={user} />} />
            <Route path='/projects' element={<ProjectList projects={projects} user={user} handleDeleteProject={handleDeleteProject} />} />
            <Route path='/projects/new' element={<ProjectForm handleAddProject={handleAddProject} />} />
            <Route path='/projects/:projectId' element={<ProjectDetails user={user} handleDeleteProject={handleDeleteProject} />} />
            <Route path='/projects/:projectId/edit' element={<ProjectForm handleUpdateProject={handleUpdateProject} />} />
            <Route path='/projects/:projectId/categories/new' element={<CategoryForm handleAddCategory={handleAddCategory} />} />
            <Route path='/categories/:categoryId' element={<CategoryDetails user={user} handleDeleteCategory={handleDeleteCategory} handleDeleteExpense={handleDeleteExpense} />} />
            <Route path='/categories/:categoryId/edit' element={<CategoryForm handleUpdateCategory={handleUpdateCategory} />} />
            <Route path='/categories/:categoryId/expenses/new' element={<ExpenseForm handleAddExpense={handleAddExpense} />} />
            <Route path='/categories/:categoryId/expenses/:expenseId/edit' element={<ExpenseForm handleUpdateExpense={handleUpdateExpense} />} /> */}
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