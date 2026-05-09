import styles from './DashboardNav.module.css';

export default function DashboardNav(){
  return(
    <div className={styles.dashboardNav}>
      <h1 className='anta'><span style={{color:'var(--white)'}}>Mura</span><span style={{color:'var(--main-theme)'}}>Board</span></h1>
    </div>
  )
}