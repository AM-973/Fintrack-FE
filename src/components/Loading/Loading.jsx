
import styles from './Loading.module.css'

const Loading = ({ message = "Loading...", size = "medium", variant = "default" }) => {
  const containerClass = `${styles.container} ${variant === 'fullscreen' ? styles['container--fullscreen'] : ''} ${variant === 'inline' ? styles['container--inline'] : ''}`
  
  return (
    <div className={containerClass}>
      <div className={`${styles.spinner} ${styles[`spinner--${size}`]}`}>
        <div className={styles.spinnerInner}></div>
      </div>
      <p className={styles.text}>{message}</p>
    </div>
  )
}

export default Loading