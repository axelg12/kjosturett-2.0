import React from 'react';
import parties from '../../../data/parties.json';
import { Category } from '@/types/types';
import PartySingle from '@/app/components/PartySingle/PartySingle';

const Page = ({ params }: { params: { slug: string } }) => {
  const party = parties.filter((party) => party.url === params.slug)[0];
  let categories: Category[] = [];
  try {
    categories = require(`../../../data/build/${party.url}.json`);
  } catch (e) {
    console.error(e);
  }
  return <PartySingle categories={categories} party={party} />;
};

export default Page;
