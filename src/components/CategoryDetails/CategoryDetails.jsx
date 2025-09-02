import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import * as categoryService from '../../services/categoryService'
import * as expenseService from '../../services/expenseService'
import * as authService from '../../services/authService'
import styles from './CategoryDetails.module.css'

const CategoryDetails = () => {
  const { projectId, categoryId } = useParams()
  const navigate = useNavigate()
  const [category, setCategory] = useState(null)
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const user = authService.getUser()

  useEffect(() => {
    fetchCategoryData()
  }, [categoryId])

  const fetchCategoryData = async () => {
    try {
      setLoading(true)
      const [categoryData, expensesData] = await Promise.all([
        categoryService.show(projectId, categoryId),
        expenseService.getByCategory(projectId, categoryId)
      ])
      setCategory(categoryData)
      setExpenses(expensesData)
    } catch (err) {
      setError('Failed to fetch category data')
      console.error('Failed to fetch category data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteExpense = async (expenseId) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await expenseService.deleteExpense(projectId, categoryId, expenseId)
        setExpenses(expenses.filter(expense => expense.id !== expenseId))
      } catch (err) {
        setError('Failed to delete expense')
        console.error('Failed to delete expense:', err)
      }
    }
  }

  const handleDeleteCategory = async () => {
    if (window.confirm('Are you sure you want to delete this category? All expenses will also be deleted.')) {
      try {
        await categoryService.deleteCategory(projectId, categoryId)
        navigate(`/projects/${projectId}`)
      } catch (err) {
        setError('Failed to delete category')
        console.error('Failed to delete category:', err)
      }
    }
  }

  const calculateTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0)
  }

  const calculateBudgetProgress = () => {
    const total = calculateTotalExpenses()
    const progress = (total / category.budget) * 100
    return Math.min(progress, 100)
  }

  const getBudgetStatus = () => {
    const progress = calculateBudgetProgress()
    if (progress >= 100) return 'danger'
    if (progress >= 80) return 'warning'
    return 'normal'
  }

  if (loading) {
    return (
      <main className={styles.container}>
        <div className="container">
          <div className={styles.loading}>
            <div className="loading-spinner"></div>
            <p>Loading category details...</p>
          </div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className={styles.container}>
        <div className="container">
          <div className="alert alert--error">
            {error}
          </div>
          <Link to="/projects" className="btn btn--ghost">
            ← Back to Projects
          </Link>
        </div>
      </main>
    )
  }

  if (!category) {
    return (
      <main className={styles.container}>
        <div className="container">
          <div className={styles.error}>
            <h1>Category not found</h1>
            <Link to="/projects" className="btn btn--primary">
              Back to Projects
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const totalExpenses = calculateTotalExpenses()
  const budgetProgress = calculateBudgetProgress()
  const budgetStatus = getBudgetStatus()

  return (
    <main className={styles.container}>
      <div className="container">
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.categoryInfo}>
              <h1 className={styles.title}>{category.name}</h1>
              {category.description && (
                <p className={styles.description}>{category.description}</p>
              )}
            </div>
            
            <div className={styles.budgetInfo}>
              <div className={styles.budget}>
                <span className={styles.budgetLabel}>Budget</span>
                <span className={styles.budgetAmount}>
                  ${(category.budget / 100).toFixed(2)}
                </span>
              </div>
              <div className={styles.spent}>
                <span className={styles.spentLabel}>Spent</span>
                <span className={`${styles.spentAmount} ${styles[`spent--${budgetStatus}`]}`}>
                  ${(totalExpenses / 100).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          
          <div className={styles.actions}>
            {user && (
              <>
                <Link 
                  to={`/projects/${projectId}/categories/${categoryId}/expenses/new`} 
                  className="btn btn--primary"
                >
                  Add Expense
                </Link>
                <Link 
                  to={`/projects/${projectId}/categories/${categoryId}/edit`} 
                  className="btn btn--secondary"
                >
                  Edit Category
                </Link>
                <button
                  onClick={handleDeleteCategory}
                  className="btn btn--danger"
                  type="button"
                >
                  Delete Category
                </button>
              </>
            )}
          </div>
        </header>

        <div className={styles.budgetProgress}>
          <div className={styles.progressHeader}>
            <span className={styles.progressLabel}>Budget Usage</span>
            <span className={styles.progressPercentage}>
              {budgetProgress.toFixed(1)}%
            </span>
          </div>
          <div className={styles.progressBar}>
            <div 
              className={`${styles.progressFill} ${styles[`progressFill--${budgetStatus}`]}`}
              style={{ width: `${budgetProgress}%` }}
            />
          </div>
          <div className={styles.progressText}>
            ${((category.budget - totalExpenses) / 100).toFixed(2)} remaining
          </div>
        </div>

        <section className={styles.expensesSection}>
          <header className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Expenses</h2>
            <Link 
              to={`/projects/${projectId}/categories/${categoryId}/expenses/new`} 
              className="btn btn--primary"
            >
              Add Expense
            </Link>
          </header>

          {expenses.length > 0 ? (
            <div className={styles.expensesList}>
              {expenses.map((expense) => (
                <article key={expense.id} className={`card ${styles.expenseCard}`}>
                  <div className={styles.expenseHeader}>
                    <h3 className={styles.expenseName}>{expense.name}</h3>
                    <div className={styles.expenseAmount}>
                      ${(expense.amount / 100).toFixed(2)}
                    </div>
                  </div>
                  
                  <footer className={styles.expenseActions}>
                    <Link 
                      to={`/projects/${projectId}/categories/${categoryId}/expenses/${expense.id}/edit`} 
                      className="btn btn--ghost btn--sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteExpense(expense.id)}
                      className="btn btn--danger btn--sm"
                      type="button"
                    >
                      Delete
                    </button>
                  </footer>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>💰</div>
              <h3 className={styles.emptyTitle}>No expenses yet</h3>
              <p className={styles.emptyDescription}>
                Start tracking your spending by adding your first expense.
              </p>
              <Link 
                to={`/projects/${projectId}/categories/${categoryId}/expenses/new`} 
                className="btn btn--primary"
              >
                Add First Expense
              </Link>
            </div>
          )}
        </section>

        <div className={styles.navigation}>
          <Link 
            to={`/projects/${projectId}`} 
            className="btn btn--ghost"
          >
            ← Back to Project
          </Link>
        </div>
      </div>
    </main>
  )
}

export default CategoryDetails
