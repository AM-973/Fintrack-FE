import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import * as projectService from '../../services/projectService'
import * as categoryService from '../../services/categoryService'
import * as authService from '../../services/authService'
import styles from './ProjectDetails.module.css'

const ProjectDetails = ({ handleDeleteProject }) => {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const user = authService.getUser()
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const projectData = await projectService.show(projectId)
        const categoriesData = await categoryService.getByProject(projectId)
        setProject(projectData)
        setCategories(categoriesData)
      } catch (err) {
        console.error('Failed to fetch project data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProjectData()
  }, [projectId])

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
              {categories.map((category) => (
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
                  
                  <footer className={styles.categoryActions}>
                    <Link 
                      to={`/categories/${category.id}`} 
                      className="btn btn--ghost btn--sm"
                    >
                      View Expenses
                    </Link>
                    <Link 
                      to={`/categories/${category.id}/edit`} 
                      className="btn btn--secondary btn--sm"
                    >
                      Edit
                    </Link>
                  </footer>
                </article>
              ))}
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
