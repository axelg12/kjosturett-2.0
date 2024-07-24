import React, { MouseEventHandler, useState } from 'react';
import cx from 'classnames';
// import history from '../../history';
import styles from './Collapsable.module.scss';

interface item {
  key: string;
  title: string;
  content: string;
  image: string;
}

interface Props {
  items: item[];
}

interface Open {
  [key: string]: boolean;
}

const Collapsable = ({ items }: Props) => {
  const spring = {
    stiffness: 200,
    damping: 20,
  };
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

  return (
    <div className={styles.root}>
      {items.map(({ key, title, content, image }) => (
        <div className={styles.category} key={key}>
          <a href={`#${key}`} className={styles.header} onClick={toggle(key)}>
            {image && <img className={styles.image} src={image} />}
            <h3 className={styles.title}>{title}</h3>
            <i aria-hidden="true" className={cx(styles.icon, !open[key] && styles.isOpen)} />
          </a>
          {/* <div isOpened={open[key] === true} springConfig={spring}> */}
          <div>
            <div
              dangerouslySetInnerHTML={{
                __html: content,
              }}
              className={cx(
                styles.content
                // category.statement === '' ? s.textNoReply : null
              )}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Collapsable;
