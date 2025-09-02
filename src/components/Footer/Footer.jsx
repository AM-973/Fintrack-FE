import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`container ${styles.container}`}>
        <div className={styles.footerContent}>
          <div className={styles.brandSection}>
            <div className={styles.brand}>
              <h3 className={styles.brandName}>FinTrack</h3>
              <p className={styles.brandTagline}>
                Take control of your financial future with smart project-based budgeting.
              </p>
            </div>
            <div className={styles.socialLinks}>
              <a 
                href="https://github.com/AM-973/Fintrack-FE" 
                className={styles.socialLink} 
                aria-label="Follow us on GitHub"
                title="GitHub"
              >
                <span className={styles.socialIcon}><img src="/public/assets/githubicon.svg" alt="GitHub logo" width={70} height={70} /></span>
              </a>
            </div>
          </div>
          <div className={styles.linksSection}>
            <div className={styles.linkColumn}>
              <h4 className={styles.linkTitle}>Features</h4>
              <ul className={styles.linkList}>
                <li>
                  <Link to="/projects" className={styles.footerLink}>
                    Project Tracking
                  </Link>
                </li>
                <li>
                  <span className={styles.footerLink}>Category Management</span>
                </li>
                <li>
                  <span className={styles.footerLink}>Expense Monitoring</span>
                </li>
                <li>
                  <span className={styles.footerLink}>Budget Analytics</span>
                </li>
              </ul>
            </div>

            <div className={styles.linkColumn}>
              <h4 className={styles.linkTitle}>Account</h4>
              <ul className={styles.linkList}>
                <li>
                  <Link to="/" className={styles.footerLink}>
                    Dashboard (WIP)🇧🇭
                  </Link>
                </li>

              </ul>
            </div>

            <div className={styles.linkColumn}>
              <h4 className={styles.linkTitle}>Support</h4>
              <ul className={styles.linkList}>
                <li>
                  <a href="#" className={styles.footerLink}>
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <div className={styles.bottomContent}>
            <p className={styles.copyright}>
              © {currentYear} FinTrack. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
