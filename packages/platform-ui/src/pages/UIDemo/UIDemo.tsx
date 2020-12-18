import React, { FC, useState } from 'react';
import { Tab, TabsBar, TabContent, useStyles } from '@grafana/ui';
import { PrivateLayout } from 'components';
import { TextInputFields } from './components/FormFields';
import { RadioButtons } from './components/Buttons';
import { TabKeys } from './UIDemo.types';
import { getStyles } from './UIDemo.styles';

interface TabstripTab {
  label: string;
  key: string;
  component: React.ReactNode;
}

const tabs: Array<TabstripTab> = [
  {
    label: 'Form Elements',
    key: TabKeys.inputs,
    component: <TextInputFields />,
  },
  {
    label: 'Overlays',
    key: TabKeys.overlays,
    component: '',
  },
  {
    label: 'Buttons',
    key: TabKeys.buttons,
    component: <RadioButtons />,
  },
];

export const UIDemo: FC = () => {
  const [activeTab, setActiveTab] = useState<string>(TabKeys.inputs);
  const styles = useStyles(getStyles);

  return (
    <PrivateLayout>
      <div className={styles.page}>
        <legend className={styles.legend}>UI Component Demo</legend>
        <TabsBar>
          {/* That css property is there to silence the type mistake of the Tab component */}
          {tabs.map((tab) => (
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
          {tabs.find((tab) => tab.key === activeTab)!.component}
        </TabContent>
      </div>
    </PrivateLayout>
  );
};

UIDemo.displayName = 'UIDemo';
