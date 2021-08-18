import Link from "next/link";

interface Props {
  children?: React.ReactNode,
  currentPage: string;
}

const Header: React.FC = ({ currentPage }: Props) => {
  return (
    <div className="relative z-50 pt-6 mx-auto color-invert max-w-[100rem] px-[5vw] font-medium">
      <div className="flex items-center justify-between page-container">
        <Link href="/">
          <a className="flex-1 text-xl">Tic Socket Toe</a>
        </Link>

        <div className="items-center justify-end flex-1 hidden space-x-6 text-xl md:flex">
          <Link href={currentPage} locale="en">
            <a>En</a>
          </Link>
          <Link href={currentPage} locale="ru">
            <a>Ru</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default  Header