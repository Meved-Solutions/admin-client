import { IoHomeOutline, IoLogOutOutline , IoBriefcaseOutline  } from 'react-icons/io5';
import { SiAwsorganizations } from "react-icons/si";

const navItems = [
  { name: 'Home', icon: IoHomeOutline, path: '/' },
  { name: 'Postings', icon: IoBriefcaseOutline , path: '/postings' },
  { name: 'Organizations', icon: SiAwsorganizations, path: '/organizations' },
  { name: 'LogOut', icon: IoLogOutOutline  },
];

const Sidebar = () => {

  return (
    <div className='shadow-lg h-screen'>
      <div className='flex flex-row justify-center pt-3 text-3xl font-bold'>
        MVA
      </div>
      <div className="pt-6 px-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <div key={item.name} className="flex flex-col items-center my-6 text-sm font-semibold text-gray-500 hover:text-gray-700">
              <a href={item.path}><IconComponent className="my-1" size={26}/></a>
              <h2>{item.name}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;