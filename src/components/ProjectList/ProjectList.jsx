import { Link } from 'react-router-dom'
import styles from './ProjectList.module.css'
import * as authService from '../../services/authService'
const ProjectList = ({ projects, handleDeleteProject }) => {
  const user = authService.getUser()
  if (!projects || projects.length === 0) {
    return (
      <main className={styles.container}>
        <div className="container">
          <header className={styles.header}>
            <h1 className={styles.title}>All Projects</h1>
            <p>No projects yet! create your own by clicking the button below.</p>
            <Link to="/projects/new" className="btn btn--primary">
              Create New Project
            </Link>
          </header>
          
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📊</div>
            <h2 className={styles.emptyTitle}>No projects yet</h2>
            <p className={styles.emptyDescription}>
              Start your financial journey by creating your first saving plan.
            </p>
            <Link to="/projects/new" className="btn btn--primary">
              Create Your First Project
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
          <h1 className={styles.title}>All Projects</h1>
          <Link to="/projects/new" className="btn btn--primary">
            Create New Project
          </Link>
        </header>

        <div className={styles.projectGrid}>
          {projects.map((project) => (
            <article key={project.id} className={`card ${styles.projectCard}`}>
              <header className={styles.cardHeader}>
                <h2 className={styles.projectName}>{project.project_name}</h2>
                <div className={styles.projectBudget}>
                  ${(project.budget / 100).toFixed(2)}
                </div>
              </header>

              <div className={styles.cardContent}>
                {project.description && (
                  <p className={styles.projectDescription}>
                    {project.description}
                  </p>
                )}
                
                <div className={styles.projectMeta}>
                  <span className={styles.metaItem}>
                    📊 Budget: ${(project.budget / 100).toFixed(2)}
                  </span>
                </div>
              </div>

              <footer className={styles.cardActions}>
                <Link 
                  to={`/projects/${project.id}`} 
                  className="btn btn--ghost btn--sm"
                >
                  View Details
                </Link>
                {user ? (
                  <>
                  <Link 
                  to={`/projects/${project.id}/edit`} 
                  className="btn btn--secondary btn--sm"
                >
                  Edit
                </Link>                  
                <button
                 onClick={() => handleDeleteProject(project.id)}
                 className="btn btn--danger btn--sm"
                 type="button">
                 Delete
               </button>
               </>
                ) : (
                  <></>
                )}
              </footer>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}

export default ProjectList
