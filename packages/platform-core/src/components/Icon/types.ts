export type AvailableIcons = 'toolbarAdd' | 'toolbarDelete' | 'toolbarEnable' | 'toolbarDisable';

export type Icons = {
  [I in AvailableIcons]: React.ElementType;
}
