import Header from "@/components/header";
export default async function ICLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col">
      <Header />
      <div className="px-4 py-2 flex-1 overflow-auto">{children}</div>
    </div>
  );
}
