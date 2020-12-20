import React, { FC, useState } from 'react';
import { Tab, TabsBar, TabContent, useStyles } from '@grafana/ui';
import { PrivateLayout } from 'components';
import { TextInputFields } from './components/FormFields';
import { RadioButtonGroups } from './components/Buttons';
import { TabKeys } from './UIDemo.types';
import { getStyles } from './UIDemo.styles';

type TabstripKey = keyof typeof TabKeys;
interface TabstripTab {
  label: string;
  key: TabstripKey;
  component: React.ReactNode;
}

type Tabstrip = Record<TabstripKey, TabstripTab>;

const tabs: Tabstrip = {
  [TabKeys.inputs]: {
    label: 'Form Elements',
    key: TabKeys.inputs,
    component: <TextInputFields />,
  },
  [TabKeys.overlays]: {
    label: 'Overlays',
    key: TabKeys.overlays,
    component: '',
  },
  [TabKeys.buttons]:{
    label: 'Buttons',
    key: TabKeys.buttons,
    component: <RadioButtonGroups />,
  },
};

export const UIDemo: FC = () => {
  const [activeTab, setActiveTab] = useState<TabstripKey>(TabKeys.inputs);
  const styles = useStyles(getStyles);

  return (
    <PrivateLayout>
      <div className={styles.page}>
        <legend className={styles.legend}>UI Component Demo</legend>
        <TabsBar>
          {/* That css property is there to silence the error in the Tab's component type */}
          {Object.values(tabs).map((tab) => (
            <Tab
              key={tab.key}
              label={tab.label}
              active={tab.key === activeTab}
              onChangeTab={() => setActiveTab(tab.key)}
              css=""
            />
          ))}
        </TabsBar>
        <TabContent>
          {tabs[activeTab].component}
        </TabContent>
      </div>
    </PrivateLayout>
  );
};

UIDemo.displayName = 'UIDemo';
