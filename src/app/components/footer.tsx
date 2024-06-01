import Image from "next/image";
import React from "react";
import { FaTwitter } from "react-icons/fa";
import { FaDribbble, FaFacebook, FaGithub, FaInstagram } from "react-icons/fa6";
const Footersection = () => {
  return (
    <footer className="bg-gray-900">
      <div className=" mx-10 space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="text-teal-600">
              <Image
                src={"/image/logoSNB1putih.png"}
                width={300}
                height={300}
                alt="logo snb"
              />
            </div>
            <p className="mt-4 text-white flex text-start">
            SNB, penyedia terkemuka dalam solusi inovatif, berdedikasi untuk meningkatkan pengalaman digital Anda.
            </p>

            <ul className="mt-8 flex gap-6">
              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-white transition hover:opacity-75"
                >
                  <span className="sr-only">Facebook</span>

                  <FaFacebook />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-white transition hover:opacity-75"
                >
                  <span className="sr-only">Instagram</span>

                  <FaInstagram />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-white transition hover:opacity-75"
                >
                  <span className="sr-only">Twitter</span>
                  <FaTwitter />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-white transition hover:opacity-75"
                >
                  <span className="sr-only">GitHub</span>

                  <FaGithub />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-white transition hover:opacity-75"
                >
                  <span className="sr-only">Dribbble</span>

                  <FaDribbble />
                </a>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
            <div>
              <p className="font-medium text-white">Product</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a
                    href="/product-detail"
                    className="text-white transition hover:opacity-75"
                  >
                    {" "}
                    SIMRS{" "}
                  </a>
                </li>
                <li>
                  <a
                                      href="/product-detail"

                    className="text-white transition hover:opacity-75"
                  >
                    {" "}
                    SIM-Klinik{" "}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-white">Perusahaan</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a
                    href="/about"
                    className="text-white transition hover:opacity-75"
                  >
                    {" "}
                    Tentang{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="/service"
                    className="text-white transition hover:opacity-75"
                  >
                    {" "}
                  Servis{" "}
                  </a>
                </li>

                <li>
                  <a
                    href='/product'
                    className="text-white transition hover:opacity-75"
                  >
                    {" "}
                    Produk{" "}
                  </a>
                </li>
                <li>
                  <a
                    href="/news"
                    className="text-white transition hover:opacity-75"
                  >
                    {" "}
                    Berita{" "}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-white">Pusat Bantuan</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a
                    href="/contact"
                    className="text-white transition hover:opacity-75"
                  >
                    {" "}
                    Hubungi Kami{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="/service"
                    className="text-white transition hover:opacity-75"
                  >
                    {" "}
                    FAQs{" "}
                  </a>
                </li>

              </ul>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500">
          &copy; 2024. PT. Solusi Nusantara Berdikari. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footersection;
