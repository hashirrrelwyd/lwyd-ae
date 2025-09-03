import { useNavigate } from "react-router-dom";

export default function NavItem({ text, link, href, className = "" }) {
  const navigate = useNavigate();
  return (
    <li className={`${className} cursor-pointer`}>
      <a
        href={href}
        onClick={() => link && navigate(link)}
        className="relative block overflow-hidden h-[1.2em] group"
      >
        {/* Default text */}
        <span className="block transition-transform duration-300 group-hover:-translate-y-full text-white">
          {text}
        </span>

        {/* Rolling text */}
        <span className="absolute left-0 top-0 w-full translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-[#ffcc00]">
          {text}
        </span>
      </a>
    </li>
  );
}
