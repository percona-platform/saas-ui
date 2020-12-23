import React, { FC, useCallback } from 'react';
import { Redirect, Route, Switch, useLocation, useHistory } from 'react-router-dom';
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
  path: string;
}

type Tabstrip = Record<TabstripKey, TabstripTab>;

const tabs: Tabstrip = {
  [TabKeys.inputs]: {
    label: 'Form Elements',
    key: TabKeys.inputs,
    path: `/ui/${TabKeys.inputs}`,
  },
  [TabKeys.overlays]: {
    label: 'Overlays',
    key: TabKeys.overlays,
    path: `/ui/${TabKeys.overlays}`,
  },
  [TabKeys.buttons]:{
    label: 'Buttons',
    key: TabKeys.buttons,
    path: `/ui/${TabKeys.buttons}`,
  },
};

export const UIDemo: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const styles = useStyles(getStyles);
  const onChangeTab = useCallback((key: TabstripKey) => () => {
    history.push(tabs[key].path);
  }, [history]);

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
              active={tab.path === location.pathname}
              onChangeTab={onChangeTab(tab.key)}
              css=""
            />
          ))}
        </TabsBar>
        <TabContent>
          <Switch>
            <Route exact path={tabs.inputs.path}>
              <TextInputFields />
            </Route>
            <Route exact path={tabs.overlays.path} />
            <Route exact path={tabs.buttons.path}>
              <RadioButtonGroups />
            </Route>
            <Redirect to={tabs.inputs.path} />
          </Switch>
        </TabContent>
      </div>
    </PrivateLayout>
  );
};

UIDemo.displayName = 'UIDemo';
