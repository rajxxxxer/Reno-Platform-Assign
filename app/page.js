
import Link from "next/link";
import ShinyButton from "./components/ShinyButton.jsx";


export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-100">
     
      <section className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-800">
          Welcome to <span className="text-blue-600">School Management App</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Easily create and manage schools in one place.
        </p>

        <div className="flex gap-6 flex-col sm:flex-row cursor-pointer">
          <Link
            href="/add-school"
            className="cursor-pointer"
           
          >
            
            <ShinyButton  cl="bg-gradient-to-r from-[#417DF6] to-[#8E37EB]" val={"➕ Create School"} />
          </Link>
          <Link

            href="/show-schools"
            className="cursor-pointer"
          >
           <ShinyButton val={"🏫 View Schools"} />
          </Link>
        </div>
      </section>
    </div>
  );
}
