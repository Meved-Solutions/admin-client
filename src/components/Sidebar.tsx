import { IoHomeOutline, IoLogOutOutline , IoBriefcaseOutline,IoPeopleOutline , IoPersonOutline ,IoSettingsOutline     } from 'react-icons/io5';
import { SiAwsorganizations } from "react-icons/si";
import { FiMessageSquare } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { Authenticated } from '@/atom';

const Sidebar = () => {

  const navigate = useNavigate();
  const setAuthenticated = useSetRecoilState(Authenticated);

  const navItems = [
    { name: 'Home', icon: IoHomeOutline, path: '/' },
    { name: 'Postings', icon: IoBriefcaseOutline , path: '/postings' },
    { name : 'Applicants' , icon : IoPersonOutline , path: '/applicants'  },
    { name: 'Organizations', icon: SiAwsorganizations, path: '/organizations' },
    { name: 'Settings', icon: IoSettingsOutline, path: '/settings' },
    // { name: 'Messages', icon: FiMessageSquare, path: '/messages' },  
    // { name : 'Employees', icon: IoPeopleOutline , path: '/employees'},
    { name: 'LogOut', icon: IoLogOutOutline  },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("_id");
    setAuthenticated(false);
    navigate('/auth')
  }

  return (
    <div className='shadow-lg h-screen bg-white'>
     <div className='flex flex-row justify-center pt-3  font-bold'>
        MVORG
      </div>
      <div className="pt-6 px-4">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
              item.name !== 'LogOut' ? (
                <Link key={item.name} to={item.path} className="flex flex-col items-center my-6 text-sm font-semibold text-gray-500 hover:text-gray-700">
                  <IconComponent className="my-1" size={26}/>
                  <h2>{item.name}</h2>
                </Link>
              ) : (
                <div key={item.name} className="flex flex-col items-center my-6 text-sm font-semibold text-gray-500 hover:text-gray-700" onClick={handleLogout}>
                  <IconComponent className="my-1" size={26}/>
                  <h2>{item.name}</h2>
                </div>
              )
            );
        })}
      </div>
    </div>
  )
}
export default Sidebar;