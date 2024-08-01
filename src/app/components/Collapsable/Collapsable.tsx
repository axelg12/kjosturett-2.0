'use client';

import '@coreui/coreui/dist/css/coreui.min.css';
import React, { useState } from 'react';
import cx from 'classnames';
import styles from './Collapsable.module.scss';
import Image from 'next/image';
import { CCollapse } from '@coreui/react';

interface item {
  key: string;
  title: string;
  content: string;
  image?: string;
}

interface Props {
  items: item[];
}

interface Open {
  [key: string]: boolean;
}

const Collapsable = ({ items }: Props) => {
  const [open, setOpen] = useState<Open>({});
  const scrollTo = (target: HTMLElement) => {
    let curtop = 0;

    do {
      curtop += target.offsetTop;
    } while ((target = target.offsetParent as HTMLElement));
    // TODO
    // Scroll.animateScroll.scrollTo(curtop - 90);
  };

  const toggle = (key: string) => (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const target = event.currentTarget;
    event.preventDefault();

    const newOpen = { ...open };
    newOpen[key] = !newOpen[key];

    setOpen(newOpen);
    // Scroll to collapsable only when opening.
    // if (nextState && target.offsetParent) {
    // scrollTo(target);
    // TODO
    // location.href = location.href.replace(location.hash,location.hash.substr(1))
    // }
  };
  console.log('here', open);
  return (
    <div className={styles.root}>
      {items.map(({ key, title, content, image }) => (
        <div className={styles.category} key={key}>
          <a href={`#${key}`} className={styles.header} onClick={toggle(key)}>
            {image && <Image className={styles.image} src={image} alt={''} fill={true} />}
            <h3 className={styles.title}>{title}</h3>
            <i aria-hidden="true" className={cx(styles.icon, !open[key] && styles.isOpen)} />
          </a>
          <CCollapse visible={open[key] === true}>
            <div
              dangerouslySetInnerHTML={{
                __html: content,
              }}
              className={cx(
                styles.content
                // category.statement === '' ? s.textNoReply : null
              )}
            />
          </CCollapse>
        </div>
      ))}
    </div>
  );
};

export default Collapsable;
