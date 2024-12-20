import Image from "next/image";

const Header = () => {
  return (
    <div className="h-28 w-full flex items-center justify-center bg-schwarzwald-green">
      <Image
        src="/logo.png"
        alt="Vaultone logo"
        width={271}
        height={36}
        priority
      />
    </div>
  );
};

export default Header;
