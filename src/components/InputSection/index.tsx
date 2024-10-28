import React from 'react';
import { DateTime, Interval } from 'luxon';
import {
  InputNumber,
  Button,
  Typography,
  Flex,
  ConfigProvider,
} from 'antd';
import icon from './assets/icon-arrow.svg';

import styles from './index.module.css';

type InputSectionProps = {
  setYears: React.Dispatch<React.SetStateAction<number | null>>;
  setMonths: React.Dispatch<React.SetStateAction<number | null>>;
  setDays: React.Dispatch<React.SetStateAction<number | null>>;
};

const InputSection = ({
  setYears,
  setMonths,
  setDays,
}: InputSectionProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const day = Number(formData.get('day'));
    const month = Number(formData.get('month'));
    const year = Number(formData.get('year'));

    calcAge(year, month, day);
  };

  const calcAge = (year: number, month: number, day: number) => {
    const start = DateTime.fromObject({ year, month, day });
    const end = DateTime.now();

    if (start.toMillis() < end.toMillis()) {
      const interval = end.diff(start, ['years', 'months', 'days']);
      const i = Interval.fromDateTimes(start, end);
      console.log(
        i.toDuration(['years', 'months', 'days']).toObject()
      );

      setYears(Math.abs(interval.years));
      setMonths(Math.abs(interval.months));
      setDays(Math.abs(Math.floor(interval.days)));
    } else {
      const interval = start.diff(end, ['years', 'months', 'days']);
      const i = Interval.fromDateTimes(end, start);
      console.log(
        i.toDuration(['years', 'months', 'days']).toObject()
      );

      setYears(Math.abs(interval.years));
      setMonths(Math.abs(interval.months));
      setDays(Math.abs(Math.ceil(interval.days)));
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Typography: {
            colorText: 'var(--color-smokey-grey)',
          },
          InputNumber: {
            activeBorderColor: 'var(--color-purple)',
            hoverBorderColor: 'var(--color-purple)',
          },
          Button: {
            colorPrimary: 'var(--color-purple)',
            colorPrimaryHover: 'var(--color-off-black)',
          },
        },
      }}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Flex
          justify="flex-start"
          gap={30}
          align="center"
          vertical={false}>
          <label htmlFor="day">
            <Typography.Paragraph className={styles.title}>
              DAY
            </Typography.Paragraph>
            <InputNumber
              name="day"
              id="day"
              placeholder="DD"
              min={1}
              max={31}
              size="large"
              className={styles.inputStyle}
            />
          </label>
          <label htmlFor="month">
            <Typography.Paragraph className={styles.title}>
              MONTH
            </Typography.Paragraph>
            <InputNumber
              name="month"
              id="month"
              placeholder="MM"
              min={1}
              max={12}
              size="large"
              className={styles.inputStyle}
            />
          </label>
          <label htmlFor="year">
            <Typography.Paragraph className={styles.title}>
              YEAR
            </Typography.Paragraph>
            <InputNumber
              name="year"
              id="year"
              placeholder="YYYY"
              min={0}
              max={Infinity}
              size="large"
              className={styles.inputStyle}
            />
          </label>
        </Flex>
        <Flex justify="flex-end" align="center" vertical={false}>
          <Button
            type="primary"
            htmlType="submit"
            shape="circle"
            className={styles.buttonStyle}>
            <img src={icon} alt="icon" height={30} />
          </Button>
        </Flex>
        <span className={styles.line}></span>
      </form>
    </ConfigProvider>
  );
};

export default InputSection;

// https://ant.design/components/input?theme=dark#api
// https://ant.design/docs/react/customize-theme?theme=dark#nested-theme
