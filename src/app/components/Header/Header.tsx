'use client';

import React, { useState } from 'react';
import cx from 'classnames';
import Container from '../Container/Container';
import s from './Header.module.scss';
import logo from '../logo.svg';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  page: string;
}

const Header = ({ page }: Props) => {
  const [isTop, setIsTop] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [lastScrollPos, setLastScrollPos] = useState<Number | undefined>(undefined);
  // componentDidMount() {
  //   window.addEventListener('scroll', this.scroll);
  //   this.scroll();
  // }
  // componentWillUnmount() {
  //   window.removeEventListener('scroll', this.scroll);
  // }
  // lastScrollPos = undefined;
  const scroll = () => {
    const scroll = window.scrollY;
    if (lastScrollPos === scroll) {
      return;
    }

    setLastScrollPos(scroll);
    setIsTop(scroll < 120);
  };

  const renderLinks = () => {
    return [
      <Link
        onClick={() => setIsOpen(false)}
        href="/kosningaprof"
        key="/kosningaprof"
        className={cx(page === 'kosningaprof' ? s.active : null)}
      >
        Kosningapróf
      </Link>,
      <Link
        onClick={() => setIsOpen(false)}
        href="/flokkar/bera-saman"
        key="/flokkar/bera-saman"
        className={cx(page === 'bera-saman' ? s.active : null)}
      >
        Samanburður
      </Link>,
    ];
  };

  return (
    <div>
      <div className={s.fake} />
      <header className={cx(s.root, isOpen && s.isOpen, !isTop && s.sticky)}>
        <Container>
          <div className={s.wrap}>
            <div className={s.leftWrap}>
              <Link onClick={() => setIsOpen(false)} href="/">
                <Image src={logo} alt="Logo" className={s.logo} />
              </Link>
              {/* <div className={cx(s.countdown)}>
                  <Countdown />
                </div> */}
            </div>
            <nav className={cx(s.desktopNav)}>
              <button
                className={cx(s.hamburgerBtn, isOpen && s.isOpen)}
                onClick={() => setIsOpen(true)}
              >
                <i className={s.hamburger} /> Valmynd
              </button>
              <div className={s.links}>{renderLinks()}</div>
            </nav>
          </div>
        </Container>
      </header>
      <nav className={cx(s.mobileNav, !isTop && s.sticky, isOpen && s.isOpen)}>
        <div className={s.links}>{renderLinks()}</div>
      </nav>
    </div>
  );
};

export default Header;
