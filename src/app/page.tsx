import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col h-screen gap-10  items-center justify-center ">
     
        <h1>Welcome to home page</h1>
        <div className="flex gap-3 justify-center items-center ">
          <Link href={'/login'} className="p-2 rounded-md bg-white text-black"> Login </Link>
          <Link href={'/signup'} className="p-2 rounded-md bg-white text-black"> signup </Link>
        </div>
      
    </main>
  );
}
