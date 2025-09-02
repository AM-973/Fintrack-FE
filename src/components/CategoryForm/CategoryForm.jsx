import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import * as categoryService from '../../services/categoryService'
import styles from './CategoryForm.module.css'

const CategoryForm = () => {
  const { projectId, categoryId } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    budget: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    if (categoryId) {
      setIsEdit(true)
      fetchCategory()
    }
  }, [categoryId])

  const fetchCategory = async () => {
    try {
      setLoading(true)
      const category = await categoryService.show(categoryId)
      setFormData({
        name: category.name,
        description: category.description || '',
        budget: (category.budget / 100).toString() // Convert cents to dollars
      })
    } catch (err) {
      setError('Failed to fetch category details')
      console.error('Error fetching category:', err)
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
      setError('Category name is required')
      return
    }
    
    if (!formData.budget || parseFloat(formData.budget) <= 0) {
      setError('Budget must be a positive number')
      return
    }

    try {
      setLoading(true)
      
      const categoryData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        budget: Math.round(parseFloat(formData.budget) * 100) // Convert to cents
      }

      if (isEdit) {
        await categoryService.update(categoryData, categoryId)
      } else {
        await categoryService.create(categoryData, projectId)
      }

     
      navigate(`/projects/${projectId}`)
    } catch (err) {
      setError(err.message || `Failed to ${isEdit ? 'update' : 'create'} category`)
      console.error('Error saving category:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    navigate(`/projects/${projectId}`)
  }

  if (loading && isEdit && !formData.name) {
    return (
      <main className={styles.container}>
        <div className="container">
          <div className={styles.loading}>
            <div className="loading-spinner"></div>
            <p>Loading category...</p>
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
            <h1 className={styles.title}>
              {isEdit ? 'Edit Category' : 'Create New Category'}
            </h1>
            <p className={styles.subtitle}>
              {isEdit 
                ? 'Update your category details below' 
                : 'Add a new spending category to organize your project budget'
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
                Category Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input focus-ring"
                placeholder="e.g., Kitchen, Marketing, Equipment"
                required
                disabled={loading}
              />
            </div>

            <div className="field">
              <label htmlFor="description" className="label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="textarea focus-ring"
                placeholder="Describe what this category is for..."
                rows="4"
                disabled={loading}
              />
            </div>

            <div className="field">
              <label htmlFor="budget" className="label">
                Budget Amount ($) *
              </label>
              <input
                type="number"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="input focus-ring"
                placeholder="0.00"
                min="0"
                step="0.01"
                required
                disabled={loading}
              />
              <small className={styles.fieldHint}>
                Enter the allocated budget for this category
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
                    {isEdit ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  isEdit ? 'Update Category' : 'Create Category'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

export default CategoryForm
