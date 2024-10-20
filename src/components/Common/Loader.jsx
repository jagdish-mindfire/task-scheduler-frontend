import { TailSpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
    <TailSpin
      visible={true}
      height="80"
      width="80"
      color="#000"
      ariaLabel="tail-spin-loading"
      radius="3"
    />
  </div>
  
  );
};

export default Loader;
