import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-slate-100 text-gray-300 py-10 shadow-lg flex sm:block ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flex container for responsiveness */}
        <div className="flex flex-col sm:flex-row sm:justify-between">
          {/* Company Information */}
          <div className="mb-6 sm:mb-0">
            <h2 className="text-2xl font-semibold text-black mb-2">
              INFO SHARE{" "}
            </h2>
            <p className="text-black">
              {" "}
              <span>
                <MdLocationOn className="inline text-md" />
              </span>
              <a
                href="https://maps.app.goo.gl/ufgDVMpYN15FHfxm9"
                className="text-blue-700 underline mx-2"
                target="__blank"
              >
                Bhaktapur, Nepal
              </a>
            </p>
            <span className="text-black">
              {" "}
              <MdEmail className="inline text-md" />
              <a
                className="text-blue-700 underline mx-2"
                href="mailto:developerklinton@gmail.com"
              >
                developerklinton@gmail.com
              </a>{" "}
            </span>
          </div>

          {/* Links Section */}
          <div className="flex flex-col sm:flex-row sm:space-x-12">
            <div className="mb-6 sm:mb-0">
              <h3 className="text-lg font-semibold text-black mb-2">
                Quick Links
              </h3>
              <ul>
                <li>
                  <Link to="/">
                    <span className=" text-blue-700 underline">Home</span>
                  </Link>
                </li>

                <Link to={"/signup"}>
                  <span className="underline text-blue-700">Sign up</span>
                </Link>

                <li>
                  <Link to="/login">
                    <span className="underline text-blue-700">Login</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="mt-6 sm:mt-0">
            <h3 className="text-lg font-semibold text-black mb-2 ">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com"
                target="_blank "
                className="hover:text-white"
              >
                <FaFacebook className="text-black text-md" />
              </a>
              <a
                href="https://www.x.com"
                target="_blank "
                className="hover:text-white"
              >
                <FaXTwitter className="text-black text-md" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank "
                className="hover:text-white"
              >
                <FaInstagram className="text-black text-md" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank "
                className="hover:text-white"
              >
                <FaLinkedin className="text-black text-md" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} INFO SHARE All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
