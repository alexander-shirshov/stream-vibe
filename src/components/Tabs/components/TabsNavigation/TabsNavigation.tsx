import './TabsNavigation.scss';
import clsx from 'clsx';
import { getIdFromTitle, getTabsElementsIdsFromTitle } from '@/utils/tabs';

import type { TabItem } from '@/components/Tabs/Tabs';
import { useRef } from 'react';

type TabsNavigationProps = {
  className?: string;
  items: TabItem[];
  title: string;
  activeTabIndex: number;
  onChange: (index: number) => void;
};

export default function TabsNavigation({
  className,
  title,
  items,
  activeTabIndex,
  onChange,
}: TabsNavigationProps) {
  const titleFormatted = getIdFromTitle(title);
  const titleId = `${titleFormatted}-title`;

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function activateTab(index: number) {
    onChange(index);
    buttonRefs.current[index]?.focus();
  }

  function goPrev() {
    const newIndex = activeTabIndex === 0 ? items.length - 1 : activeTabIndex - 1;
    activateTab(newIndex);
  }

  function goNext() {
    const newIndex = activeTabIndex === items.length - 1 ? 0 : activeTabIndex + 1;
    activateTab(newIndex);
  }

  function goFirst() {
    if (activeTabIndex === 0) return;
    activateTab(0);
  }

  function goLast() {
    if (activeTabIndex === items.length - 1) return;
    activateTab(items.length - 1);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    //mac
    if (e.metaKey && e.key === 'ArrowLeft') {
      e.preventDefault();
      goFirst();
      return;
    }

    if (e.metaKey && e.key === 'ArrowRight') {
      e.preventDefault();
      goLast();
      return;
    }

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        goPrev();
        break;

      case 'ArrowRight':
        e.preventDefault();
        goNext();
        break;

      case 'Home':
        e.preventDefault();
        goFirst();
        break;

      case 'End':
        e.preventDefault();
        goLast();
        break;

      default:
        break;
    }
  };

  return (
    <div
      className={clsx(className, 'tabs-navigation')}
      role="tablist"
      aria-labelledby={titleId}
      onKeyDown={handleKeyDown}
    >
      <h3 className="visually-hidden" id={titleId}>
        {title}
      </h3>
      {items.map((item, index) => {
        const { buttonId, contentId } = getTabsElementsIdsFromTitle(item.title);
        const isActive = index === activeTabIndex;

        return (
          <button
            className={clsx('tabs-navigation__button', {
              'is-active': isActive,
            })}
            ref={el => {
              buttonRefs.current[index] = el;
            }}
            type="button"
            id={buttonId}
            aria-controls={contentId}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            key={item.title}
            onClick={() => activateTab(index)}
          >
            {item.title}
          </button>
        );
      })}
    </div>
  );
}
