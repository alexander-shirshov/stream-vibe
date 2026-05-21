type TabsElementIds = {
  buttonId: string;
  contentId: string;
};

export const getId = (title: string): string => {
  return title.toLocaleLowerCase().replaceAll(' ', '-');
};

export const getTabsElementIds = (id: string): TabsElementIds => {
  const titleFormatted = getId(id);

  return {
    buttonId: `${titleFormatted}-tab`,
    contentId: `${titleFormatted}-tabpanel`,
  };
};
