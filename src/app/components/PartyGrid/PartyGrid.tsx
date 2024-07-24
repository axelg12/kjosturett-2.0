import React, { PropsWithChildren } from 'react';
import s from './PartyGrid.module.scss';

const PartyGrid = ({ children }: PropsWithChildren<{}>) => <div className={s.grid}>{children}</div>;

export default PartyGrid;
