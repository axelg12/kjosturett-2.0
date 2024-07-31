import React from 'react';
import Collapsable from '../../components/Collapsable/Collapsable';
import PartyProfile from '../../components/PartyProfile/PartyProfile';
import s from './PartySingle.module.scss';
import parties from '../../../data/parties.json';
import Image from 'next/image';
import { Category } from '@/types/types';
import { getAssetUrl } from '@/utils/utils';

const PartySingle = ({ params }: { params: { slug: string } }) => {
  const party = parties.filter((party) => party.url === params.slug)[0];
  let categories: Category[] = [];
  try {
    categories = require(`../../../data/build/${party.url}.json`);
  } catch (e) {
    console.error(e);
  }
  return (
    <div className={s.root}>
      <div className={s.header}>
        <PartyProfile {...party} />
      </div>
      <div className={s.topics}>
        <Collapsable
          items={categories.map(({ name, category, statement }) => ({
            key: category,
            title: name,
            content:
              statement ||
              `${party.name} hefur ekki skilað inn umfjöllun um ${name.toLowerCase()}.`,
          }))}
        />
      </div>
    </div>
  );
};

export default PartySingle;
