import {
  FaAddressCard,
  FaAffiliatetheme,
  FaAnchor,
  FaCalendarCheck,
  FaFileInvoiceDollar,
  FaFileMedical,
  FaHospital,
  FaPills,
  FaVials,
} from "react-icons/fa6";

export const dataNav = [
  {
    title: "Tentang",
    link: "/about",
  },
  {
    title: "Servis",
    link: "/service",
  },
  {
    title: "Produk",
    link: "/product",
    list: [
      {
        item: {
          title: "SIMRS",
          link: "/",
        },
      },
      {
        item: {
          title: "E-KLINIK",
          link: "/",
        },
      },
      {
        item: {
          title: "E-PUSKESMAS",
          link: "/",
        },
      },
    ],
  },
  {
    title: "Berita",
    link: "/news",
  },
  {
    title: "Hubungi Kami",
    link: "/contact",
  },
];

export const dataAdvantages = [
  {
    title: "Integrated Hospital Information Systems",
    icon: FaHospital,
    description:
      "Optimize hospital operations with our comprehensive information systems designed for seamless healthcare management.",
  },
  {
    title: "Electronic Medical Records",
    icon: FaFileMedical,
    description:
      "Secure and efficient management of patient records to enhance the quality of care and operational efficiency.",
  },
  {
    title: "Appointment Scheduling",
    icon: FaCalendarCheck,
    description:
      "Streamline the appointment process with our intuitive scheduling system, improving patient satisfaction and staff productivity.",
  },
  {
    title: "Pharmacy Management",
    icon: FaPills,
    description:
      "Automate pharmacy operations, from inventory management to prescription filling, for increased accuracy and efficiency.",
  },
  {
    title: "Billing and Invoicing",
    icon: FaFileInvoiceDollar,
    description:
      "Simplify financial processes with our integrated billing and invoicing system, designed to reduce errors and enhance revenue cycle management.",
  },
  {
    title: "Laboratory Information System",
    icon: FaVials,
    description:
      "Enhance laboratory operations with our comprehensive system, ensuring accurate test management and regulatory compliance.",
  },
];

export const dataService = [
  {
    data: "120",
    client: "Lorem Ipsum",
    title: "Tailor made",
    description:
"Healthtechs didevelop sesuai dengan kebutuhan Anda. Sehingga Anda lebih efektif dan efisien dalam bekerja",    icon: FaHospital,
  },
  {
    data: "90",
    client: "Lorem Ipsum",
    title: "Tampilan responsif",
    description:
      "Tampilan antarmuka yang responsif bisa dibuka menggunakan perangkat mobile, tablet, maupun desktop ",
    icon: FaFileMedical,
  },
  {
    data: "150",
    client: "Lorem Ipsum",
    title: "Kemudahan Impelementasi",
    description:
      "Kemudahan dalam implementasi aplikasi didukung oleh tim yang profesional dan berpengalaman      ",
    icon: FaCalendarCheck,
  },
  {
    data: "90",
    client: "Lorem Ipsum",
    title: "Cloud Based / On Premise",
    description:
      " Healthtechs dapat diinstal dalam layanan cloud maupun pada server fisik yang dimiliki fasyankes      ",
    icon: FaPills,
  },
  {
    data: "150",
    client: "Lorem Ipsum",
    title: "Ringan dan cepat",
    description:
      " Kinerja aplikasi yang responsif dengan kebutuhan sumber daya komputasi minimal, memberikan pengalaman pengguna yang efisien dan nyaman.      ",
    icon: FaFileInvoiceDollar,
  },
  {
    data: "90",
    client: "Lorem Ipsum",

    title: "Integrasi",
    description:
      "Healthtechs dapat terintegrasi dengan seluruh instansi yang ada seperti BPJS Kesehatan, Kemenkes RI, dll.      ",
    icon: FaVials,
  },
];
