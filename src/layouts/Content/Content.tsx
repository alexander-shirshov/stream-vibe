import clsx from 'clsx';
import './Content.scss';

type ContentProps = {
  children: React.ReactNode;
  needResetPaddingTop?: boolean;
};

export default function Content({ children, needResetPaddingTop = false }: ContentProps) {
  return (
    <main className={clsx('content', needResetPaddingTop && 'content--reset-padding-top')}>
      {children}
    </main>
  );
}
