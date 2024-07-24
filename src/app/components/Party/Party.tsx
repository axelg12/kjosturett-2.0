import React from 'react';
import cx from 'classnames';
import s from './Party.module.scss';
// import { getAssetUrl } from '../../utils';
import Link from 'next/link';

interface Props {
  url: string;
  href: string;
  onClick?: () => void;
  isSelected?: boolean;
  isFaded?: boolean;
  letter: string;
  name: string;
  leader: string;
}

const Party = ({ url, href, onClick, isSelected, isFaded, letter, name, leader }: Props) => {
  const Wrap = href ? Link : 'button';
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cx(s.party, isSelected && s.isSelected, isFaded && s.isFaded)}
    >
      <span className={s.imgWrap}>
        <img src={''} className={s.image} alt={`${name}'s logo`} />
      </span>
      <span className={s.info}>
        <h3 className={s.name}>{name}</h3>
        <p className={s.leader}>{leader}</p>

        <span className={s.letter}>
          <span>x</span>
          {letter}
        </span>
      </span>
    </Link>
  );
};

export default Party;
