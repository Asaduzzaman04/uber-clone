import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa6";
import logo from "../assets/uber_icon.png";
import Button from "./Button";

const Hero = () => {
  return (
    <section className="min-h-screen home_background flex flex-col justify-between pt-10 ">
      {/* Uber logo */}
      <div className="z-10 ">
        <img src={logo} alt="Uber Logo" className="w-26 h-10" />
      </div>

      {/* Bottom white section with continue button */}
      <div className="bg-white py-8 px-4  w-full">
        <div className=" mx-auto flex justify-center">
          <Link to="/select-role">
            <Button
              classes={
                "ustify-center items-center gap-3  flex bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800  text-2xl group"
              }
            >
              {"continue"}{" "}
              <FaArrowRight className="group-hover:translate-x-5 transition-all duration-200 ease-linear" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
