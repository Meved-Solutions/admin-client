import { IoLogOutOutline, IoBriefcaseOutline, IoPersonOutline } from 'react-icons/io5';
import { SiAwsorganizations } from 'react-icons/si';
import { Link, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { Authenticated } from '@/atom';

interface NavItem {
  name: string;
  icon: React.ComponentType<{ size: number }>;
  path?: string;
}


interface IconWrapperProps {
  icon: React.ComponentType<{ size: number }>;
  className?: string;
  size: number;
}


const IconWrapper: React.FC<IconWrapperProps> = ({ icon: Icon, className, size }) => {
  //@ts-ignore
  return <Icon className={className} size={size} />;
};


const Sidebar = () => {
  const navigate = useNavigate();
  const setAuthenticated = useSetRecoilState(Authenticated);

  const navItems: NavItem[] = [
    { name: 'Postings', icon: IoBriefcaseOutline, path: '/postings' },
    { name: 'Applicants', icon: IoPersonOutline, path: '/applicants' },
    { name: 'Organizations', icon: SiAwsorganizations, path: '/organizations' },
    { name: 'LogOut', icon: IoLogOutOutline },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('_id');
    setAuthenticated(false);
    navigate('/auth');
  };

  return (
    <div className='shadow-lg h-screen bg-white'>
      <div className='flex flex-row justify-center pt-3 font-bold'>
        MVORG
      </div>
      <div className='pt-6 px-4'>
        {navItems.map((item) => {
          return item.path ? (
            <Link
              key={item.name}
              to={item.path}
              className='flex flex-col items-center my-6 text-sm font-semibold text-gray-500 hover:text-gray-700'
            > 
              <IconWrapper icon={item.icon} className='my-1' size={26} />
              <h2>{item.name}</h2>
            </Link>
          ) : (
            <div
              key={item.name}
              className='flex flex-col items-center my-6 text-sm font-semibold text-gray-500 hover:text-gray-700'
              onClick={handleLogout}
            >
              <IconWrapper icon={item.icon} className='my-1' size={26} />
              <h2>{item.name}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;