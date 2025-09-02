import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import * as expenseService from '../../services/expenseService'
import * as categoryService from '../../services/categoryService'
import styles from './ExpenseForm.module.css'

const ExpenseForm = () => {
  const { projectId, categoryId, expenseId } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    amount: ''
  })
  const [category, setCategory] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    fetchCategory()
    if (expenseId) {
      setIsEdit(true)
      fetchExpense()
    }
  }, [categoryId, expenseId])

  const fetchCategory = async () => {
    try {
      const categoryData = await categoryService.show(projectId, categoryId)
      setCategory(categoryData)
    } catch (err) {
      setError('Failed to fetch category details')
      console.error('Error fetching category:', err)
    }
  }

  const fetchExpense = async () => {
    try {
      setLoading(true)
      const expense = await expenseService.show(projectId, categoryId, expenseId)
      setFormData({
        name: expense.name,
        amount: (expense.amount / 100).toString() // Convert cents to dollars same as backend
      })
    } catch (err) {
      setError('Failed to fetch expense details')
      console.error('Error fetching expense:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
   
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
 
    if (!formData.name.trim()) {
      setError('Expense name is required')
      return
    }
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError('Amount must be a positive number')
      return
    }

    try {
      setLoading(true)
      
      const expenseData = {
        name: formData.name.trim(),
        amount: Math.round(parseFloat(formData.amount) * 100) // Convert to cents same as backend
      }

      if (isEdit) {
        await expenseService.update(expenseData, projectId, categoryId, expenseId)
      } else {
        await expenseService.create(expenseData, projectId, categoryId)
      }

      navigate(`/projects/${projectId}/categories/${categoryId}`)
    } catch (err) {
      setError(err.message || `Failed to ${isEdit ? 'update' : 'create'} expense`)
      console.error('Error saving expense:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    navigate(`/projects/${projectId}/categories/${categoryId}`)
  }

  if (loading && isEdit && !formData.name) {
    return (
      <main className={styles.container}>
        <div className="container">
          <div className={styles.loading}>
            <div className="loading-spinner"></div>
            <p>Loading expense...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.container}>
      <div className="container">
        <div className={styles.formWrapper}>
          <header className={styles.header}>
            <div className={styles.categoryInfo}>
              {category && (
                <div className={styles.categoryBadge}>
                  <span className={styles.categoryIcon}>📂</span>
                  <span>{category.name}</span>
                </div>
              )}
            </div>
            <h1 className={styles.title}>
              {isEdit ? 'Edit Expense' : 'Add New Expense'}
            </h1>
            <p className={styles.subtitle}>
              {isEdit 
                ? 'Update your expense details below' 
                : 'Record a new expense for this category'
              }
            </p>
          </header>

          {error && (
            <div className="alert alert--error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className="field">
              <label htmlFor="name" className="label">
                Expense Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input focus-ring"
                placeholder="e.g., Office supplies, Software license, Lunch meeting"
                required
                disabled={loading}
              />
            </div>

            <div className="field">
              <label htmlFor="amount" className="label">
                Amount ($) *
              </label>
              <div className={styles.amountField}>
                <span className={styles.currencySymbol}>$</span>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className={`input focus-ring ${styles.amountInput}`}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                  disabled={loading}
                />
              </div>
              <small className={styles.fieldHint}>
                Enter the actual amount spent
              </small>
            </div>

            <div className={styles.actions}>
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn--ghost"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn--primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="loading-spinner"></div>
                    {isEdit ? 'Updating...' : 'Adding...'}
                  </>
                ) : (
                  isEdit ? 'Update Expense' : 'Add Expense'
                )}
              </button>
            </div>
          </form>

          {category && (
            <div className={styles.categoryStats}>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Category Budget</span>
                <span className={styles.statValue}>
                  ${(category.budget / 100).toFixed(2)}
                </span>
              </div>
              {category.expenses && (
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Total Expenses</span>
                  <span className={styles.statValue}>
                    {category.expenses.length} items
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default ExpenseForm
