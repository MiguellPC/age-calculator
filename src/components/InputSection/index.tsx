import React from 'react';
import { DateTime, Interval } from 'luxon';
import type { FormProps } from 'antd';
import {
  Form,
  InputNumber,
  Button,
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

const InputSection = (props: InputSectionProps) => {
  type FieldType = {
    day: number;
    month: number;
    year: number;
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    calcAge(values);
  };

  const calcAge = ({ year, month, day }: FieldType) => {
    const start = DateTime.fromObject({ year, month, day });
    const end = DateTime.now();

    const interval = end.diff(start, ['years', 'months', 'days']);
    const i = Interval.fromDateTimes(start, end);
    console.log(i.toDuration(['years', 'months', 'days']).toObject());

    props.setYears(Math.abs(interval.years));
    props.setMonths(Math.abs(interval.months));
    props.setDays(Math.abs(Math.floor(interval.days)));
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorText: 'var(--color-smokey-grey)',
        },
        components: {
          Form: {
            fontSize: 11,
          },
          InputNumber: {
            colorText: 'var(--color-off-black)',
            activeBorderColor: 'var(--color-purple)',
            hoverBorderColor: 'var(--color-purple)',
          },
          Button: {
            colorPrimary: 'var(--color-purple)',
            colorPrimaryHover: 'var(--color-off-black)',
          },
        },
      }}>
      <Form onFinish={onFinish} className={styles.form}>
        <Flex
          justify="flex-start"
          gap={30}
          align="start"
          style={{ minHeight: 55 }}
          vertical={false}>
          <Form.Item
            label="DAY"
            layout="vertical"
            name="day"
            className={styles.title}
            rules={[{ required: true }]}>
            <InputNumber
              placeholder="DD"
              min={1}
              max={31}
              size="large"
              className={styles.inputStyle}
            />
          </Form.Item>

          <Form.Item
            label="MONTH"
            layout="vertical"
            name="month"
            className={styles.title}
            rules={[{ required: true }]}>
            <InputNumber
              id="month"
              placeholder="MM"
              min={1}
              max={12}
              size="large"
              className={styles.inputStyle}
            />
          </Form.Item>

          <Form.Item
            label="YEAR"
            layout="vertical"
            name="year"
            className={styles.title}
            rules={[{ required: true }]}>
            <InputNumber
              id="year"
              placeholder="YYYY"
              min={1000}
              max={DateTime.now().year}
              size="large"
              className={styles.inputStyle}
            />
          </Form.Item>
        </Flex>

        <Form.Item className={styles.buttonContainer}>
          <Button
            type="primary"
            htmlType="submit"
            shape="circle"
            className={styles.buttonStyle}>
            <img src={icon} alt="icon" height={30} />
          </Button>
        </Form.Item>
      </Form>
      <span className={styles.line}></span>
    </ConfigProvider>
  );
};

export default InputSection;

// https://ant.design/components/input?theme=dark#api
// https://ant.design/components/form?theme=dark
