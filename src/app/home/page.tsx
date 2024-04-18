import Contactall from "../components/contactall";
import About from "./component/About";
import Advantages from "./component/Advantages";
import Client from "./component/Client";
import Header from "./component/Header";
import Product from "./component/Product";
import Service from "./component/Service";

const Homepage = () => {
    return (
        <main>
            <Header />
            <About />
            <Service />

            <Product />
            {/* <Advantages /> */}
            {/* <Client /> */}
            <Contactall />
        </main>
    );
};

export default Homepage;
