import { Link } from 'react-router-dom'
import styles from './Landing.module.css'

const Landing = () => {
  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              Take Control of Your
              <span className={styles.accent}> Financial Future</span>
              <br />Today
            </h1>
            <p className={styles.heroDescription}>
              Create saving plans, track expenses, and manage your budget with our intuitive 
              financial tracker. Turn your financial goals into reality with organized project-based savings.
            </p>
            <div className={styles.heroActions}>
              <Link to="/projects" className="btn btn--primary btn--lg">
                Start Tracking
              </Link>
              <Link to="/sign-up" className="btn btn--secondary btn--lg">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className="container">
          <header className={styles.sectionHeader}>
            <h6 className={styles.sectionLabel}>Features</h6>
            <h2 className={styles.sectionTitle}>Why Choose FinTrack</h2>
            <p className={styles.sectionDescription}>
              Experience smart financial management with our powerful tracking features
            </p>
          </header>
          
          <div className="grid grid--3">
            <article className={`card ${styles.featureCard}`}>
              <div className={styles.featureIcon}>📊</div>
              <h3 className={styles.featureTitle}>Project-Based Saving</h3>
              <p className={styles.featureDescription}>
                Organize your finances around specific goals and projects for better clarity.
              </p>
            </article>
            
            <article className={`card ${styles.featureCard}`}>
              <div className={styles.featureIcon}>💰</div>
              <h3 className={styles.featureTitle}>Category Tracking</h3>
              <p className={styles.featureDescription}>
                Break down your projects into categories with individual budgets and expense tracking.
              </p>
            </article>
            
            <article className={`card ${styles.featureCard}`}>
              <div className={styles.featureIcon}>📈</div>
              <h3 className={styles.featureTitle}>Budget Monitoring</h3>
              <p className={styles.featureDescription}>
                Stay on track with real-time budget monitoring and expense alerts.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.about}>
        <div className="container">
          <div className={styles.aboutContent}>
            <div className={styles.aboutText}>
              <header className={styles.sectionHeader}>
                <h6 className={styles.sectionLabel}>About FinTrack</h6>
                <h2 className={styles.sectionTitle}>Smart Financial Planning</h2>
              </header>
              <div className="stack stack--md">
                <p>
                  We're building a comprehensive platform where users can create saving plans 
                  organized as projects. Each project can have multiple spending categories, 
                  allowing for detailed budget tracking and expense management.
                </p>
                <p>
                  Whether you're saving for a vacation, home renovation, or building an emergency fund, 
                  our platform makes it simple to organize, track, and achieve your financial goals 
                  with clear project-based structure and detailed expense tracking.
                </p>
              </div>
            </div>
            <div className={styles.aboutStats}>
              <div className={styles.stat}>
                <div className={styles.statNumber}>1K+</div>
                <div className={styles.statLabel}>Active Users</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>5K+</div>
                <div className={styles.statLabel}>Projects Created</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>$2M+</div>
                <div className={styles.statLabel}>Money Tracked</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.testimonial}>
        <div className="container">
          <header className={styles.sectionHeader}>
            <h6 className={styles.sectionLabel}>Testimonials</h6>
            <h2 className={styles.sectionTitle}>What Our Users Say</h2>
          </header>
          
          <div className={styles.testimonialCard}>
            <blockquote className={styles.quote}>
              "FinTrack has completely transformed how I manage my finances! The project-based 
              approach helps me stay focused on my goals, and breaking everything down into 
              categories makes budgeting so much clearer. I finally feel in control of my money!"
            </blockquote>
            <footer className={styles.testimonialFooter}>
              <div className={styles.testimonialAuthor}>
                <strong>Alex Chen</strong>
                <span>Financial Planning Enthusiast</span>
              </div>
            </footer>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Take Control of Your Finances?</h2>
            <p className={styles.ctaDescription}>
              Join users who are successfully managing their money with organized project-based tracking.
            </p>
            <div className={styles.ctaActions}>
              <Link to="/sign-up" className="btn btn--primary btn--lg">
                Sign Up Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Landing