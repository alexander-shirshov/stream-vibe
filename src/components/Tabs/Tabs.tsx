import './Tabs.scss';
import clsx from 'clsx';
import { getTabsElementIds } from '@/utils/tabs';

export type TabItem = {
  id: string;
  title: string;
  isActive?: boolean;
  children: React.ReactNode;
};

export type TabsProps = {
  className?: string;
  activeTabIndex: number;
  items: TabItem[];
};

export default function Tabs({ className, activeTabIndex, items }: TabsProps) {
  return (
    <div className={clsx(className, 'tabs')}>
      <div className="tabs__body">
        {items.map((item, index) => {
          const { children, id } = item;
          const isActive = index === activeTabIndex;

          const { buttonId, contentId } = getTabsElementIds(id);

          return (
            <div
              className={clsx('tabs__content', {
                'is-active': isActive,
              })}
              role="tabpanel"
              hidden={!isActive}
              id={contentId}
              aria-labelledby={buttonId}
              tabIndex={0}
              key={id}
            >
              {children}
            </div>
          );
        })}
      </div>
    </div>
  );
}
