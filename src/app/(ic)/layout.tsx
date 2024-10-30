import Header from "@/components/header";
export default async function ICLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" w-full h-full flex flex-col">
      {/* <Header /> */}
      <div className="p-2 h-[100%] flex">{children}</div>
    </div>
  );
}
