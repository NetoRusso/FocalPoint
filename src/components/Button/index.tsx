"use client";
import Style from './Button.module.scss';
import classNames from 'classnames';

interface Props {
  children: React.ReactNode,
  type?: 'button' | 'submit' | 'reset' | undefined,
  classe?: 'standard' | 'miniStandard' | 'delete' | 'cancel' |undefined,
  onClick?: () => void,
  dataTestid?: string,
}

const Button = ({ children, type, onClick, classe, dataTestid }: Props) => {
  return (
    <button onClick={onClick} type={type} className={classNames({
      [Style['button']]: true,
      [Style['buttonStandard']]: classe === 'standard',
      [Style['buttonMiniStandard']]: classe === 'miniStandard',
      [Style['buttonDelete']]: classe === 'delete',
      [Style['buttonCancel']]: classe === 'cancel',
    })}
      data-testid={dataTestid}
    >
      {children}
    </button>
  )
};

export default Button;
