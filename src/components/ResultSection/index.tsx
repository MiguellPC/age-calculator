import { Typography } from 'antd';

import styles from './index.module.css';

type dateType = {
  days: number | null;
  months: number | null;
  years: number | null;
};

const ResultSection = ({ years, months, days }: dateType) => {
  return (
    <div className={styles.result}>
      <Typography.Title className="poppins-extrabold-italic">
        <span>{years ? years : '--'}</span>{' '}
        {years === 1 ? 'year' : 'years'}
      </Typography.Title>
      <Typography.Title className="poppins-extrabold-italic">
        <span>{months ? months : '--'}</span>{' '}
        {months === 1 ? 'month' : 'months'}
      </Typography.Title>
      <Typography.Title className="poppins-extrabold-italic">
        <span>{days ? days : '--'}</span>{' '}
        {days === 1 ? 'day' : 'days'}
      </Typography.Title>
    </div>
  );
};

export default ResultSection;
