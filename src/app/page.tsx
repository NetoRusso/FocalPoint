'use client'
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import Task from "@/components/Task";
import { useEffect, useState } from "react";

export default function Home() {

  const [open, setOpen] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserName(storedUser);
      setOpen(false);
    }
  },[])

  return (
    <div>
      <Header
        userName={userName}
      />
    <main className="principal">
      <Task />
    </main>
    {
      open && <Modal classe="newUser" onClose={() => setOpen(false) } setUserName={setUserName} userName={userName}/>

    }
    </div>
  );
}
