import './DetailsBlockSkeleton.scss';
export default function DetailsBlockSkeleton() {
  return (
    <section className="details-block-skeleton container">
      <div className="details-block-skeleton__item--main"></div>
      <div className="details-block-skeleton__item--aside"></div>
      <div className="details-block-skeleton__item--main"></div>
      <div className="details-block-skeleton__item--main"></div>
    </section>
  );
}
