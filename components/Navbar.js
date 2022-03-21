import Image from "next/image";

const Navbar = () => {
  return (
    <div className="navbar d-flex align-items-center py-3 rounded-4">
      <Image src="/images/sary-logo.png" width={90} height={47} />
    </div>
  );
};

export default Navbar;
