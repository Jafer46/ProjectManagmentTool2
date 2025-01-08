import loadingIcon from "../assets/loading.png";

export default function Loading() {
  return (
    <div className="h-lvh w-full flex justify-center items-center">
      <img src={loadingIcon} alt="loading" className="animate-spin " />
    </div>
  );
}
