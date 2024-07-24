import React, { PropsWithChildren } from 'react';
import s from './Container.module.scss';

const Container = ({ children }: PropsWithChildren<{}>) => <div className={s.root}>{children}</div>;

export default Container;
