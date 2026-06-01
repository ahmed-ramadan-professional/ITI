import { Link } from 'react-router-dom';
import mark from '../../assets/logforge-mark.png';

export function Logo({ link = true, large = false }) {
  const content = (
    <>
      <img className={`brand-mark ${large ? 'brand-mark-lg' : ''}`} src={mark} alt="" />
      <span>LogForge</span>
    </>
  );

  return link ? (
    <Link className="brand" to="/applications">
      {content}
    </Link>
  ) : (
    <div className="brand">{content}</div>
  );
}
