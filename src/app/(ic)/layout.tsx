import Header from "@/components/header";
export default function ICLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="flex-1  justify-center items-center w-full flex flex-col">
      {/* <Header /> */}
      <div className="px-4 py-2 flex-1 overflow-auto w-full  max-w-7xl justify-center ">{children}</div>
    </div>
  );
}
