import { Link, useLocation } from 'react-router-dom'
import styles from './NavBar.module.css'

const NavBar = (props) => {
  const location = useLocation()
  
  const isActiveLink = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <header className={styles.navbar} role="banner">
      <div className={`container ${styles.container}`}>
        <Link to='/' className={styles.brand} aria-label="FinTrack - Home">
          <span className={styles.brandText}>FinTrack🇧🇭</span>
        </Link>
        {props.user?(
          <>
                  <nav className={styles.nav} role="navigation" aria-label="Main navigation">
          <ul className={styles.navList}>
            <li>
              <Link 
                to="/" 
                className={`${styles.navLink} ${isActiveLink('/') ? styles.navLinkActive : ''}`}
                aria-current={isActiveLink('/') ? 'page' : undefined}
              >
                Home
              </Link>
            </li>
            
            <li>
              <Link 
                to="/projects" 
                className={`${styles.navLink} ${isActiveLink('/projects') ? styles.navLinkActive : ''}`}
                aria-current={isActiveLink('/projects') ? 'page' : undefined}>
                Projects
              </Link>
            </li>
          </ul>
        </nav>
          </>
        ) : (
          <>
          <nav className={styles.nav} role="navigation" aria-label="Main navigation">
          <ul className={styles.navList}>
            <li>
              <Link 
                to="/" 
                className={`${styles.navLink} ${isActiveLink('/') ? styles.navLinkActive : ''}`}
                aria-current={isActiveLink('/') ? 'page' : undefined}
              >
                Home
              </Link>
            </li>
          </ul>
        </nav>
          </>
        )}
        <div className={styles.actions}>
          {props.user ? (
            <>
              {props.user.username && (
                <span className={styles.welcome} aria-label={`Welcome, ${props.user.username}`}>
                  Welcome, {props.user.username}
                </span>
              )}
              <Link to='/dashboard' className={`btn btn--ghost ${styles.profileBtn}`}>
                Dashboard
              </Link>
              <button 
                onClick={props.handleSignOut} 
                className="btn btn--ghost"
                type="button"
                aria-label="Sign out of your account"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/sign-in" className="btn btn--ghost">
                Sign In
              </Link>
              <Link to="/sign-up" className="btn btn--primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default NavBar