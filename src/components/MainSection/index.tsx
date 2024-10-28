import { useState } from 'react';
import InputSection from '../InputSection';
import ResultSection from '../ResultSection';
import { Flex, ConfigProvider } from 'antd';

import styles from './index.module.css';

const MainSection = () => {
  const [years, setYears] = useState<null | number>(null);
  const [months, setMonths] = useState<null | number>(null);
  const [days, setDays] = useState<null | number>(null);

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Poppins, sans-serif',
          colorText: 'var(--color-off-black)',
        },
      }}>
      <Flex
        className={styles.container}
        vertical
        justify="center"
        align="flex-start">
        <InputSection
          setYears={setYears}
          setMonths={setMonths}
          setDays={setDays}
        />
        <ResultSection days={days} months={months} years={years} />
      </Flex>
    </ConfigProvider>
  );
};

export default MainSection;
