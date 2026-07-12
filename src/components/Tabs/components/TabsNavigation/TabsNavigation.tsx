import './TabsNavigation.scss';
import clsx from 'clsx';
import { getId, getTabsElementIds } from '@/utils/tabs';

import type { TabItem } from '@/components/Tabs/Tabs';
import { useLayoutEffect, useRef, useState } from 'react';

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
  const titleFormatted = getId(title);
  const titleId = `${titleFormatted}-title`;

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const navigationRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const resizeTimeoutRef = useRef<number | null>(null);

  const [indicatorPos, setIndicatorPos] = useState({
    width: 0,
    left: 0,
  });

  function updateIndicatorPos() {
    const activeButton = buttonRefs.current[activeTabIndex];

    if (!activeButton) return;

    setIndicatorPos({
      width: activeButton.offsetWidth,
      left: activeButton.offsetLeft,
    });
  }

  useLayoutEffect(() => {
    updateIndicatorPos();

    function handleResize() {
      setIsResizing(true);
      updateIndicatorPos();

      if (resizeTimeoutRef.current) {
        window.clearTimeout(resizeTimeoutRef.current);
      }

      resizeTimeoutRef.current = window.setTimeout(() => {
        updateIndicatorPos();
        setIsResizing(false);
      }, 150);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      if (resizeTimeoutRef.current) {
        window.clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [activeTabIndex, items.length]);

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
      className={clsx(className, 'tabs-navigation', {
        'is-resizing': isResizing,
      })}
      role="tablist"
      ref={navigationRef}
      aria-labelledby={titleId}
      onKeyDown={handleKeyDown}
    >
      <h3 className="visually-hidden" id={titleId}>
        {title}
      </h3>
      <div
        className="tabs-navigation__indicator"
        style={{
          width: indicatorPos.width,
          left: indicatorPos.left,
        }}
      />
      {items.map((item, index) => {
        const { buttonId, contentId } = getTabsElementIds(item.id);
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
            key={item.id}
            onClick={() => activateTab(index)}
          >
            {item.title}
          </button>
        );
      })}
    </div>
  );
}
