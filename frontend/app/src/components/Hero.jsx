import { Link } from "react-router";
import logo from '../assets/uber_icon.png'

const Hero = () => {
  return (
    <section className="min-h-screen home_background flex flex-col justify-between pt-10 ">
      {/* Uber logo */}
      <div className="z-10 ">
        <img
          src={logo}
          alt="Uber Logo" 
          className="w-26 h-10"
        />
      </div>


      {/* Bottom white section with continue button */}
      <div className="bg-white py-8 px-4  w-full">
        <div className=" mx-auto flex justify-center">
          <Link
            to="/select-role"
            className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors inline-block"
          >
            Continue
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
