import Link from 'next/link';
import styles from './navlinks.module.css'

const NavLinks = ({ navItems }) => {
  return (
    <nav className={styles.navlinks}>
        {navItems.map((item, index) => (
            <Link href={item.route} key={index}>
              <p className={styles.text}>{item.name}</p>
            </Link>
        ))}
    </nav>
  );
};

export default NavLinks;
