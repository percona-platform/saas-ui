import React, { FC, useCallback, useState } from 'react';
import { Tab, TabsBar, TabContent } from '@grafana/ui';
// import { logger } from '@percona/platform-core';
// import { Messages } from './UI.messages';

const initialTabs = [
  { label: 'Inputs', key: 'inputs', active: true },
  { label: 'Modals', key: 'modals', active: false },
  { label: 'Icons', key: 'icons', active: false },
];

export const UIDemo: FC = () => {
  const [tabs, setTabs] = useState(initialTabs);
  const onChangeTab = useCallback((idx) => () => {
    const stateTabs = tabs.map((tab, index) => ({ ...tab, active: index === idx }));

    setTabs(stateTabs);
  }, [tabs]);

  return (
    <section>
      <TabsBar>
        {tabs.map((tab, index) => (
          <Tab key={tab.key} label={tab.label} active={tab.active} onChangeTab={onChangeTab(index)} css="" />
        ))}
      </TabsBar>
      <TabContent>
        {tabs[0].active && (<div>{tabs[0].label}</div>)}
        {tabs[1].active && (<div>{tabs[1].label}</div>)}
        {tabs[2].active && (<div>{tabs[2].label}</div>)}
      </TabContent>
    </section>
  );
};

UIDemo.displayName = 'UIDemo';
