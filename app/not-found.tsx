import Link from 'next/link';

const NotFound = () => {
  return (
    <>
      <div>
        <div className="bg-[url('../public/hsLogoSm.jpeg')] bg-cover bg-top bg-no-repeat pb-[50px] min-[640px]:bg-[url('../public/hsLogoLg.jpeg')]">
          <div className="">
            <Link
              href="/"
              className="relative mx-auto flex h-[180px] w-[753px] max-w-[80%] items-center justify-center bg-contain focus:outline-none min-[640px]:h-[250px] min-[960px]:h-[280px]"
            >
              <img src="logo.png" alt="Hearthstone logo" />
            </Link>
          </div>
        </div>
        <div
          style={{ backgroundPosition: 'center -2px' }}
          className="relative mb-[-118px] ml-0 h-[96px] -translate-y-1/2 bg-[url('../public/ParchmentTop.png')] after:absolute after:right-[-25px] after:top-0 after:h-full after:w-0 after:bg-[url('../public/ParchmentTopRight.png')] after:bg-center after:content-[''] min-[992px]:h-[143px] min-[992px]:w-[calc(100%-25px)] min-[992px]:after:w-[120px]"
        />
      </div>

      <div className="relative mx-auto min-h-[500px] max-w-[986px] px-[1em] text-center">
        <h1 className="font-serif text-[37px] font-bold text-blue min-[375px]:text-[48px]">404</h1>
        <h3 className="font-serif text-[22px] font-bold text-blue min-[375px]:text-[31px]">
          Page not found.
        </h3>
        <p>
          It was probably a temporal rift, or unstable apparatus malfunction, or arcane spillover,
          or dragon attack, or fractured political agreement, or…
        </p>
        <div>
          <img src="errorBg.png" alt="Page not found" className="mx-auto" />
        </div>
      </div>
    </>
  );
};

export default NotFound;
