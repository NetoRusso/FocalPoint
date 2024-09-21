"use client";
import { useEffect, useState } from "react";


const Calendar = () => { 

  const [date, setDate] = useState('');

  useEffect(() => {
    const data = new Date();
    const day = data.getDate().toString().padStart(2, '0');
    const month = [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ][data.getMonth()];
    const year = data.getFullYear();
    const dayWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'][data.getDay()];
    setDate(`${dayWeek}, ${day} de ${month} de ${year}`);
  },[]);

  return (
    <div>
      
      <p>{date}</p>
    </div>
  )
};

export default Calendar;
