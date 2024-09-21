import Image from 'next/image';
import Style from './Header.module.scss';
import logo from '@/assets/logo.svg';
import Calendar from './Calendar';

interface Props {
  userName: string;
}

const Header = ({ userName }: Props) => {

  return (
    <header className={Style.header}>
      <div className={Style.container}>
        <Image src={logo} alt="Logo do aplicativo FocalPoint" className={Style.logo} />
        <h2 className={Style.title}>Bem vindo de volta, <span>{userName}</span></h2>
        <Calendar />
      </div>
      <hr className={Style.hr} />
    </header>
  )
};

export default Header;
