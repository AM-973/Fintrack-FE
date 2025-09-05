import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import * as projectService from '../../services/projectService'
import styles from './ProjectForm.module.css'

const ProjectForm = ({ handleAddProject, handleUpdateProject }) => {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    project_name: '',
    budget: '',
    description: '',
    plan_type:''
  })

  const isEdit = Boolean(projectId)

  useEffect(() => {
    if (isEdit) {
      const fetchProject = async () => {
        try {
          setLoading(true)
          const project = await projectService.show(projectId)
          setFormData({
            project_name: project.project_name,
            budget: (project.budget / 100).toString(), 
            description: project.description || ''
          })
        } catch (err) {
          console.error('Failed to fetch project:', err)
          navigate('/projects')
        } finally {
          setLoading(false)
        }
      }
      fetchProject()
    }
  }, [isEdit, projectId, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const submitData = {
        ...formData,
        budget: Math.round(parseFloat(formData.budget) * 100) // Convert dollars to cents same as backend
      }

      if (isEdit) {
        await handleUpdateProject(submitData, projectId)
      } else {
        await handleAddProject(submitData)
      }
    } catch (err) {
      console.error('Failed to save project:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading && isEdit) {
    return (
      <main className={styles.container}>
        <div className="container">
          <div className={styles.loading}>
            <div className={styles.loadingSpinner}></div>
            <p>Loading project...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.container}>
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>
            {isEdit ? 'Edit Project' : 'Create New Project'}
          </h1>
          <p className={styles.subtitle}>
            {isEdit 
              ? 'Update your project details below'
              : 'Set up a new saving plan to track your financial goals'
            }
          </p>
        </header>
            
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="project_name" className={styles.label}>
              Project Name *
            </label>
            <input
              type="text"
              id="project_name"
              name="project_name"
              value={formData.project_name}
              onChange={handleChange}
              className={styles.input}
              placeholder="e.g., Emergency Fund, Vacation, Home Renovation"
              required
            />
          </div>

          <div className={styles.formGroup}>
              <label htmlFor="planType" className={styles.label}>
                Plan Type
              </label>
              <select
                id="plan_type"
                name="plan_type"
                value={formData.plan_type}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="">-- Select a plan --</option>
                <option value="savings">Savings</option>
                <option value="investment">Investment</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>


          <div className={styles.formGroup}>
            <label htmlFor="budget" className={styles.label}>
              Budget ($) *
            </label>
            <input
              type="number"
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className={styles.input}
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.label}>
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={styles.textarea}
              placeholder="Describe your project goals and details..."
              rows="4"
            />
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              onClick={() => navigate('/projects')}
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
              {loading 
                ? (isEdit ? 'Updating...' : 'Creating...') 
                : (isEdit ? 'Update Project' : 'Create Project')
              }
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default ProjectForm
