import Header from "@/components/Header";
import Task from "@/components/Task";

export default function Home() {
  return (
    <div>
      <Header
        userName="Marcus"
      />
    <main className="principal">
      <Task />
    </main>

    </div>
  );
}
