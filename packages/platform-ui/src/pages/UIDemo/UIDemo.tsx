import React, { FC, useState } from 'react';
import { Tab, TabsBar, TabContent, useStyles } from '@grafana/ui';
import { TabKeys } from './UIDemo.types';
import { getStyles } from './UIDemo.styles';

const tabs = [
  {
    label: 'Inputs',
    key: TabKeys.inputs,
    component: TabKeys.inputs,
  },
  {
    label: 'Modals',
    key: TabKeys.modals,
    component: TabKeys.modals,
  },
  {
    label: 'Icons',
    key: 'icons',
    component: TabKeys.icons,
  },
];

export const UIDemo: FC = () => {
  const [activeTab, setActiveTab] = useState<string>(TabKeys.inputs);
  const styles = useStyles(getStyles);

  return (
    <section className={styles.page}>
      <h2>UI Component Demo</h2>
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
        <div>{tabs.find((tab) => tab.key === activeTab)!.component}</div>
      </TabContent>
    </section>
  );
};

UIDemo.displayName = 'UIDemo';
