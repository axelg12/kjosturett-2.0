import React from 'react';
import styles from './PartyProfile.module.scss';
import { Party } from '@/types/types';
import Image from 'next/image';
import { getAssetUrl } from '@/utils/utils';

const Container = ({ name, leader, leaderTitle, url }: Party) => (
  <div className={styles.root}>
    <div className={styles.imgWrap}>
      <Image
        className={styles.img}
        src={getAssetUrl('formenn', url)}
        fill={true}
        alt={`${name}'s ${leaderTitle}: ${leader}`}
      />
    </div>
    <div className={styles.content}>
      <p className={styles.leader}>{leader}</p>
      <p className={styles.leaderTitle}>{leaderTitle}</p>
    </div>
  </div>
);

export default Container;
