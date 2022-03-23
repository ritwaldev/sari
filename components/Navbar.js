import Image from "next/image";

const Navbar = () => {
  return (
    <div className="navbar d-flex align-items-center py-3">
      <Image src="/images/sary-logo.png" width={90} height={47} alt="logo" />
    </div>
  );
};

export default Navbar;
