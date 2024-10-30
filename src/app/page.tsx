import AuthScreen from "./auth/component/AuthScreen";

export default function Home() {
  return (
    <div className=" w-full h-full  flex flex-col max-w-7xl mx-auto justify-center items-center gap-4 ">
      <h1 className="text-6xl font-bold">UniCollab</h1>
      <AuthScreen />
    </div>
  );
}
