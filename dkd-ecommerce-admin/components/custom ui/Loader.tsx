import Image from "next/image";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen relative">
      <div className="absolute z-0">
        <Image
          src="/standalone-logo.png"
          alt="Logo"
          width={250} 
          height={250} 
          className="opacity-50"
        />
      </div>
      
      <div className="rounded-full h-20 w-20 bg-blue-2 animate-ping z-10"></div>
    </div>
  );
}

export default Loader;