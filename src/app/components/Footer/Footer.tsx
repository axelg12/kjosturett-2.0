import React from 'react';
import styles from './Footer.module.scss';
import Container from '../Container/Container';
import logo from '../logo.svg';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => (
  <footer className={styles.footer}>
    <Container>
      <div className={styles.wrap}>
        <Link href="/">
          <Image src={logo} alt="Logo" className={styles.logo} />
        </Link>
        <nav className={styles.nav}>
          {/* <Link className={styles.link} href={'/verkefnid'}>
            Um verkefnið
          </Link> */}
          {/* <Link className={styles.link} href={'/fyrri-kosningar'}>
            Fyrri kosningar
          </Link> */}
          <Link
            className={styles.link}
            target="_blank"
            href="https://github.com/kristjanmik/kjosturett-web"
          >
            GitHub
          </Link>
        </nav>
      </div>
    </Container>
  </footer>
);

export default Footer;
