import './Tags.scss';

type TagsProps = {
  tags: string[];
};

export default function Tags({ tags }: TagsProps) {
  return (
    <div className="tags">
      <ul className="tags__list">
        {tags.map((tag, index) => (
          <li className="tags__item" key={`${tag}-${index}`}>
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}
