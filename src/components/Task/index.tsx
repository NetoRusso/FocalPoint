'use client';
import { useEffect, useState } from 'react';
import Button from '../Button';
import Style from './Task.module.scss';
import List from '../List';
import { v4 as uuidv4 } from 'uuid';
import { ITask } from '@/types/task';
import Modal from '../Modal';

const Task = () => {

  const [tasks, setTasks] = useState<ITask[]>([]);
  const [start, setStart] = useState<boolean>(false);

  const exempleTasks = [
    {
      task: 'Lavar as mãos',
      id: uuidv4(),
      completed: false
    },
    {
      task: 'Fazer um bolo',
      id: uuidv4(),
      completed: false
    },
    {
      task: 'Lavar a louça',
      id: uuidv4(),
      completed: false
    },
    {
      task: 'Levar o lixo para fora',
      id: uuidv4(),
      completed: true
    },
  ]

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (!storedTasks) {
      setTasks(exempleTasks);
      localStorage.setItem('tasks', JSON.stringify(exempleTasks));
      setStart(true);
    } else if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
      setStart(true);
    }
  }, []);

  
  useEffect(() => {
    if (start) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks, start]);


  function runArray(id: string) {
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex !== -1) {
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex].completed = !updatedTasks[taskIndex].completed;
      setTasks(updatedTasks);
    }
  };

  const [showModal, setShowModal] = useState<boolean>(false);

  const onAddTask = (title: string) => {
    const newTask: ITask = {
      task: title,
      id: uuidv4(),
      completed: false
    };
    setTasks([...tasks, newTask]);
  };

  const onDeleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };



  return (
    <section aria-label="Tarefas do dia" className={Style.task}>
      <div className={Style.taskContainer}>
        <div className={Style.taskActive}>
          <h3>Suas tarefas de hoje</h3>
          <List
            list={tasks.filter(task => !task.completed)}
            operation={runArray}
            onDeleteTask={onDeleteTask}
          />
        </div>
        <div className={Style.taskInactive}>
          <h3>Tarefas finalizadas</h3>
          <List
            list={tasks.filter(task => task.completed)}
            operation={runArray}
            onDeleteTask={onDeleteTask}
            classe='finished'
          />
        </div>
      </div>
      <Button
        classe='standard'
        type='button'
        onClick={() => { setShowModal(true) }}
      >
        Adicionar nova tarefa
      </Button>
      {
        showModal && (
          <Modal classe='newTask' onClose={() => { setShowModal(false) }} onAddTask={onAddTask} />
        )
      }
    </section>
  );
}

export default Task;