import { IoMdClose } from 'react-icons/io';
import Navbar from './Navbar';
import { useEffect, useRef } from 'react';

interface Props {
  isSidebarVisible: boolean;
  setIsSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function Sidebar({ isSidebarVisible, setIsSidebarVisible }: Props) {
  const sideBarRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement) {
        const sidebarClicked = sideBarRef.current?.contains(e.target);

        if (!sidebarClicked) setIsSidebarVisible(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => document.removeEventListener('click', handleOutsideClick);
  }, [setIsSidebarVisible]);

  return (
    <aside
      ref={sideBarRef}
      className={`fixed top-0 left-0 flex flex-col w-[300px] h-screen bg-gray-800 text-white
              grow-0 shrink-0 xl:static xl:translate-x-0 transition-transform ease-in-out duration-300 ${
                isSidebarVisible ? 'translate-x-0' : '-translate-x-full'
              }`}
    >
      <IoMdClose
        className='absolute top-2 left-[265px] text-2xl cursor-pointer xl:hidden'
        onClick={() => setIsSidebarVisible(false)}
      />
      <h3 className='border-b h-[150px]'>NAVBAR HEADER</h3>
      <Navbar setIsSidebarVisible={setIsSidebarVisible} />
    </aside>
  );
}
export default Sidebar;
