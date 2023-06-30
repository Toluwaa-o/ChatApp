import Navbar from "./components/Navbar";
import Texts from "./components/Texts";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col-reverse md:grid grid-cols-2 p-7 items-center">
        <Texts />
      </main>
    </>
  );
}
