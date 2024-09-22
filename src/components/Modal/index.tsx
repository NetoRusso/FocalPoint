import { useState } from 'react';
import Button from '../Button';
import Style from './Modal.module.scss';

interface Props {
  classe: 'newTask' | 'deleteTask';
  onClose: () => void;
  onAddTask?: (title: string) => void ;
  onDeleteTask?: () => void;

}

const Modal = ({ classe, onClose, onAddTask= onClose, onDeleteTask= onClose }: Props) => {

  const [title, setTitle] = useState<string>('');


  return (
    classe === 'newTask' ?
      <div className={Style.modalContainer} data-testid='modal-criar-tarefa'>
        <div className={Style.modal} />
        <div className={Style.modalContent}>
          <h3>Nova Tarefa</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            onAddTask(title);
            onClose();
          }}>
            <div className={Style.inputBox}>
              <label htmlFor="title">Titulo</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                placeholder='Digite'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className={Style.buttonsBox}>
              <Button
                classe='cancel'
                type='button'
                onClick={onClose}
              >
                Cancelar
              </Button>
              <Button
                classe='miniStandard'
                type='submit'
                dataTestid='btn-criar-tarefa'
              >
                Adicionar
              </Button>
            </div>
          </form>
        </div>
      </div>
      : classe === 'deleteTask' ?
        <div className={Style.modalContainer} data-testid='modal-deletar-tarefa'>
          <div className={Style.modal} />
          <div className={Style.modalContent}>
            <h3 data-testid="titulo-deletar-tarefa">Deletar Tarefa</h3>
            <p data-testid="texto-deletar-tarefa" className={Style.text}>Tem certeza que você deseja deletar essa tarefa?</p>
            <div className={Style.buttonsBox}>
              <Button
                classe='cancel'
                type='button'
              >
                Cancelar
              </Button>
              <Button
                classe='delete'
                type='button'
                onClick={() => { 
                  onDeleteTask();
                  onClose();
                }}
                dataTestid='btn-deletar-tarefa'
              >
                Deletar
              </Button>
            </div>
          </div>
        </div>
        :
        <div className={Style.modalContainer}>
          <div className={Style.modal} />
        </div>
  )



};

export default Modal;
