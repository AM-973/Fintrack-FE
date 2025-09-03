import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import * as projectService from '../../services/projectService'
import * as categoryService from '../../services/categoryService'
import * as expenseService from '../../services/expenseService'
import * as authService from '../../services/authService'
import styles from './ProjectDetails.module.css'

const ProjectDetails = ({ handleDeleteProject }) => {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [categories, setCategories] = useState([])
  const [categoryExpenses, setCategoryExpenses] = useState({})
  const [loading, setLoading] = useState(true)
  const user = authService.getUser()
  
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const projectData = await projectService.show(projectId)
        const categoriesData = await categoryService.getByProject(projectId)
        setProject(projectData)
        setCategories(categoriesData)
        
      
        const expensesPromises = categoriesData.map(async (category) => {
          try {
            const expenses = await expenseService.getByCategory(projectId, category.id)
            return { categoryId: category.id, expenses }
          } catch (err) {
            console.error(`Failed to fetch expenses for category ${category.id}:`, err)
            return { categoryId: category.id, expenses: [] }
          }
        })
        
        const expensesResults = await Promise.all(expensesPromises)
        const expensesMap = {}
        expensesResults.forEach(({ categoryId, expenses }) => {
          expensesMap[categoryId] = expenses
        })
        setCategoryExpenses(expensesMap)
      } catch (err) {
        console.error('Failed to fetch project data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProjectData()
  }, [projectId])

  const calculateCategoryExpenses = (categoryId) => {
    const expenses = categoryExpenses[categoryId] || []
    return expenses.reduce((total, expense) => total + expense.amount, 0)
  }

  const calculateBudgetProgress = (categoryId, categoryBudget) => {
    const totalExpenses = calculateCategoryExpenses(categoryId)
    const progress = (totalExpenses / categoryBudget) * 100
    return Math.min(progress, 100)
  }

  const getBudgetStatus = (categoryId, categoryBudget) => {
    const progress = calculateBudgetProgress(categoryId, categoryBudget)
    if (progress >= 100) return 'danger'
    if (progress >= 80) return 'warning'
    return 'normal'
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await handleDeleteProject(projectId)
        navigate('/projects')
      } catch (err) {
        console.error('Failed to delete project:', err)
      }
    }
  }

  if (loading) {
    return (
      <main className={styles.container}>
        <div className="container">
          <div className={styles.loading}>
            <div className={styles.loadingSpinner}></div>
            <p>Loading project details...</p>
          </div>
        </div>
      </main>
    )
  }

  if (!project) {
    return (
      <main className={styles.container}>
        <div className="container">
          <div className={styles.error}>
            <h1>Project not found</h1>
            <Link to="/projects" className="btn btn--primary">
              Back to Projects
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.container}>
      <div className="container">
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>{project.project_name}</h1>
            <div className={styles.budget}>
              Budget: ${(project.budget / 100).toFixed(2)}
            </div>
          </div>
          
          <div className={styles.actions}>
            {user && (
              <>
                <Link 
                  to={`/projects/${projectId}/edit`} 
                  className="btn btn--secondary"
                >
                  Edit Project
                </Link>
                <button
                  onClick={handleDelete}
                  className="btn btn--danger"
                  type="button"
                >
                  Delete Project
                </button>
              </>
            )}
          </div>
        </header>

        {project.description && (
          <section className={styles.description}>
            <p>{project.description}</p>
          </section>
        )}

        <section className={styles.categoriesSection}>
          <header className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Categories</h2>
            <Link 
              to={`/projects/${projectId}/categories/new`} 
              className="btn btn--primary"
            >
              Add Category
            </Link>
          </header>

          {categories.length > 0 ? (
            <div className={styles.categoriesGrid}>
              {categories.map((category) => {
                const totalExpenses = calculateCategoryExpenses(category.id)
                const budgetProgress = calculateBudgetProgress(category.id, category.budget)
                const budgetStatus = getBudgetStatus(category.id, category.budget)
                const expenses = categoryExpenses[category.id] || []
                
                return (
                  <article key={category.id} className={`card ${styles.categoryCard}`}>
                    <header className={styles.categoryHeader}>
                      <h3 className={styles.categoryName}>{category.name}</h3>
                      <div className={styles.categoryBudget}>
                        ${(category.budget / 100).toFixed(2)}
                      </div>
                    </header>
                    
                    {category.description && (
                      <p className={styles.categoryDescription}>
                        {category.description}
                      </p>
                    )}
                    
                    <div className={styles.budgetProgress}>
                      <div className={styles.progressHeader}>
                        <span className={styles.progressLabel}>
                          Spent: ${(totalExpenses / 100).toFixed(2)}
                        </span>
                        <span className={`${styles.progressPercentage} ${styles[`progress--${budgetStatus}`]}`}>
                          {budgetProgress.toFixed(1)}%
                        </span>
                      </div>
                      <div className={styles.progressBar}>
                        <div 
                          className={`${styles.progressFill} ${styles[`progressFill--${budgetStatus}`]}`}
                          style={{ width: `${budgetProgress}%` }}
                        />
                      </div>
                    </div>

                    <div className={styles.expensesSummary}>
                      <div className={styles.expensesCount}>
                        <span className={styles.expensesIcon}>💰</span>
                        <span>{expenses.length} expense{expenses.length !== 1 ? 's' : ''}</span>
                      </div>
                      <div className={styles.remainingBudget}>
                        ${((category.budget - totalExpenses) / 100).toFixed(2)} remaining
                      </div>
                    </div>
                    
                    <footer className={styles.categoryActions}>
                      <Link 
                        to={`/projects/${projectId}/categories/${category.id}`} 
                        className="btn btn--ghost btn--sm"
                      >
                        View Details
                      </Link>
                      <Link 
                        to={`/projects/${projectId}/categories/${category.id}/expenses/new`} 
                        className="btn btn--primary btn--sm"
                      >
                        Add Expense
                      </Link>
                      <Link 
                        to={`/projects/${projectId}/categories/${category.id}/edit`} 
                        className="btn btn--secondary btn--sm"
                      >
                        Edit
                      </Link>
                    </footer>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📂</div>
              <h3 className={styles.emptyTitle}>No categories yet</h3>
              <p className={styles.emptyDescription}>
                Add spending categories to organize your project budget.
              </p>
              <Link 
                to={`/projects/${projectId}/categories/new`} 
                className="btn btn--primary"
              >
                Add First Category
              </Link>
            </div>
          )}
        </section>

        <div className={styles.navigation}>
          <Link to="/projects" className="btn btn--ghost">
            ← Back to Projects
          </Link>
          
        </div>
      </div>
    </main>
  )
}

export default ProjectDetails
