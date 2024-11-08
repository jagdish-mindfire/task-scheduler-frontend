import { TailSpin } from 'react-loader-spinner'

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-4 ">
      {/* Loader in the middle of the screen */}
      <div className="flex items-center justify-center flex-grow">
        <TailSpin
          visible={true}
          height="80"
          width="80"
          color="#000"
          ariaLabel="tail-spin-loading"
          radius="3"
        />
      </div>

      {/* Logo at the bottom of the screen */}
      {/* <div className="w-full flex items-center justify-center mb-4">
        <img src={Logo} alt="Logo" className="h-12 md:h-16 lg:h-20" />
      </div> */}
    </div>
  )
}

export default Loader
