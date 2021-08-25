import Link from "next/link";

interface Props {
  currentPage: string;
}

const Header: React.FC<Props> = ({ currentPage }: Props) => {
  return (
    <div className="fixed top-0 w-full z-50 pt-6 left-[50%] -translate-x-1/2 color-invert max-w-[100rem] px-[5vw] font-medium">
      <div className="flex items-center justify-between page-container">
        <Link href="/">
          <a className="text-xl">Tic Socket Toe</a>
        </Link>

        <div className="flex items-center justify-end space-x-6 text-xl">
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
};
export default Header;
