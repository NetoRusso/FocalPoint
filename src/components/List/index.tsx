'use client';
import { useState } from 'react';
import Image from 'next/image';
import Style from './List.module.scss';
import { ITask } from '@/types/task';
import trash from '@/assets/trash.svg';
import classNames from 'classnames';
import Modal from '../Modal';


interface Props {
  list: ITask[];
  operation: (id: string) => void;
  onDeleteTask: (id: string) => void;
  classe?: string; 
}

const List = ({ list, operation, onDeleteTask, classe }: Props) => {

  const [showModal, setShowModal] = useState<boolean>(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState<string>('');


  return (
    <ul className={classNames({
      [Style['list']]: true,
      [Style['finished']]: classe === 'finished',
    })}>
      {list.map((item: ITask) => (

        <li key={item.id} className={classNames({
          [Style['item']]: true,
          [Style['itemCompleted']]: item.completed,

        })}>
          <div>
            <label htmlFor='complete'>
              <input name='complete' id='complete' type='checkbox' checked={item.completed? true : false} onChange={() => operation(item.id)} />
            </label>
            {item.task}
          </div>
          <Image src={trash} alt='Icone de lixeira'  onClick={() => {
            setTaskIdToDelete(item.id);
            setShowModal(true);
          }}/>
        </li>
      ))}
    {showModal && (<Modal classe='deleteTask' onClose={() => setShowModal(false)} onDeleteTask={() => onDeleteTask(taskIdToDelete)} />)}
    </ul>
  )
}

export default List;
