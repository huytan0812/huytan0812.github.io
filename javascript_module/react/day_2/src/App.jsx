import './App.css';
import Menu from './Menu';
import Banner from './Banner';
import Students from './Students';

function App() {
  const StudentsList = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    age: 14 + Math.floor(Math.random() * 3),
    name: `Văn ${String.fromCharCode(65 + i)}`,
    gender: Math.random() < 0.5 ? "male" : "female",
    score: Math.floor(Math.random() * 51) + 50,
  }));

  return (
    <>
      <Menu/>
      <Banner/>
      <Students students = { StudentsList }/>
    </>
  )
}

export default App
