type TabsElementIds = {
  buttonId: string;
  contentId: string;
};

export const getIdFromTitle = (title: string): string => {
  return title.toLocaleLowerCase().replaceAll(' ', '-');
};

export const getTabsElementsIdsFromTitle = (title: string): TabsElementIds => {
  const titleFormatted = getIdFromTitle(title);

  return {
    buttonId: `${titleFormatted}-tab`,
    contentId: `${titleFormatted}-tabpanel`,
  };
};
