import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { Github, Instagram, Linkedin, Mail, X } from "lucide-react";
import Link from "next/link";

export default function Page() {
    return (
        <div className="flex flex-col items-center mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-center mb-4">Contact</h1>
            <p className="text-center mb-8">Don't hesitate to reach out!</p>

            <div className="flex flex-col items-center justify-center space-y-4 w-80">
                <a
                    href="tel:+91-7251859585"
                    className="w-full bg-red-400 hover:bg-red-500 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline flex gap-2 items-center"
                >
                    <FaPhoneAlt />
                    +91 7251859585
                </a>
                <a
                    href="mailto:vermasaiyam9@gmail.com@gmail.com"
                    className="w-full bg-red-400 hover:bg-red-500 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline flex gap-2 items-center"
                >
                    <MdEmail />
                    vermasaiyam9@gmail.com
                </a>
                <a
                    href="https://www.google.com/maps/place/Meerut,+India/@28.994939,77.699936,12z/data=!4m5!3m4!1s0x390d05f37a740361:0x19984d696c61640c!8m2!3d28.994939!4d77.699936"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-red-400 hover:bg-red-500 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline flex gap-2 items-center"
                >
                    <FaLocationDot />
                    Meerut, Uttar Pradesh, India
                </a>
            </div>

            <div className="flex flex-row gap-2 w-full items-center justify-center my-4">
                <Link href={"https://github.com/Vermasaiyam"} target="blank" title="Github" className="bg-white flex items-center justify-center hover:bg-gray-100 p-2 rounded-full">
                    <Github className="w-6 h-6" />
                </Link>
                <Link href={"https://www.linkedin.com/in/saiyam05/"} target="blank" title="LinkedIn" className="bg-white flex items-center justify-center hover:bg-gray-100 p-2 rounded-full">
                    <Linkedin className="w-6 h-6" />
                </Link>
                <Link href={"https://x.com/SaiyamVerm91813/"} target="blank" title="X" className="bg-white flex items-center justify-center hover:bg-gray-100 p-2 rounded-full">
                    <X className="w-6 h-6" />
                </Link>
                <Link href={"https://www.instagram.com/s.verma0504/"} target="blank" title="Instagram" className="bg-white flex items-center justify-center hover:bg-gray-100 p-2 rounded-full">
                    <Instagram className="w-6 h-6" />
                </Link>
            </div>
        </div>
    )
}