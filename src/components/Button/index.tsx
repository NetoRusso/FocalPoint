"use client";
import Style from './Button.module.scss';
import classNames from 'classnames';

interface Props {
  children: React.ReactNode,
  type?: 'button' | 'submit' | 'reset' | undefined,
  classe?: 'standard' | 'miniStandard' | 'delete' | 'cancel' |undefined,
  onClick?: () => void,
}

const Button = ({ children, type, onClick, classe }: Props) => {
  return (
    <button onClick={onClick} type={type} className={classNames({
      [Style['button']]: true,
      [Style['buttonStandard']]: classe === 'standard',
      [Style['buttonMiniStandard']]: classe === 'miniStandard',
      [Style['buttonDelete']]: classe === 'delete',
      [Style['buttonCancel']]: classe === 'cancel',
    })}>
      {children}
    </button>
  )
};

export default Button;
