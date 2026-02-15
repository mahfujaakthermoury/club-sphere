import {
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import footerLogo from "../assets/logo.png";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="w-full bg-[#e3dddd] pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-gray-800">
          {/* Brand Column */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-center gap-3">
              <Link to={'/'}><img
                src={footerLogo}
                className="w-28 h-23 rounded-lg "
                alt="ClubSphere Logo"
              /></Link>
            </div>
            <p className="leading-relaxed font-medium text-justify">
              ClubSphere makes groups and events simple to find and organize, allowing people common interests. </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-start gap-5 pl-10">
            <h5 className="font-bold text-xl tracking-wide">
              Contact
            </h5>
            <ul className=" flex flex-col gap-3 font-medium">
              <li>
                <Link
                  className="hover:text-white transition-all duration-300 flex items-center gap-2"
                >
                  Phone: +082715507
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white transition-all duration-300 flex items-center gap-2"
                >
                  Fax: +86 31 8888 6575
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white transition-all duration-300 flex items-center gap-2"
                >
                  E-mail: clubsphere@info.com
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white transition-all duration-300 flex items-center gap-2"
                >
                  Address: Dhaka, Bangladesh
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="flex flex-col items-start gap-5 pl-10">
            <h5 className="font-bold text-xl tracking-wide">
              Legal
            </h5>
            <ul className="flex flex-col gap-3 font-medium">
              <li>
                <Link
                  className="hover:text-white transition duration-300"
                >
                  Our all Services
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white transition duration-300"
                >
                  Cookie policy
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white transition duration-300"
                >
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white transition-all duration-300 flex items-center gap-2"
                >
                 The terms of use
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="flex flex-col items-start gap-5">
            <h5 className="font-bold text-xl tracking-wide">
              Connect With Us
            </h5>
            <p className="text-sm">
              Follow our social media for daily updates on new programs.
            </p>
            <ul className="flex items-center gap-4">
              <li>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#714747] border border-white/10 flex items-center justify-center text-[white] hover:bg-sky-500 hover:border-sky-500 transition-all duration-300 shadow-lg"
                >
                  <FaXTwitter size={18} />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#714747] border border-white/10 flex items-center justify-center text-white hover:bg-blue-700 hover:border-blue-700 transition-all duration-300 shadow-lg"
                >
                  <FaLinkedinIn size={18} />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#714747] border border-white/10 flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 shadow-lg"
                >
                  <FaFacebookF size={18} />
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@ClubSphere.com"
                  className="w-10 h-10 rounded-full bg-[#714747] border border-white/10 flex items-center justify-center text-white hover:bg-purple-600 hover:border-purple-600 transition-all duration-300 shadow-lg"
                >
                  <FaEnvelope size={18} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='bg-[#e3dddd]  px-20 py-5 text-center flex justify-around'>
          <p>Copyright © {new Date().getFullYear()} - All right reserved by <span className=" text-[#682626] font-bold">Club Sphere</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
