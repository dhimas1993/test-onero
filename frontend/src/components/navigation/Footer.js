import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const FooterPage = () => {
  return (
    <div className="">
    <MDBFooter color="black" className="font-small pt-4 mt-4">
        <div className="container">
        <MDBCol className="container text-center text-md-left">
            <MDBRow>
                <MDBCol md="8">
                        <h5 className="title">KEBUNKELAPA.ID</h5>
                        <p>
                            Berdasarkan filosofi pohon kelapa yang indetik dengan tropis dan kehangatan mentari yang bersinar di balik awan yang berkumpul bersama memghiasi gemerlap cakrawala,
                            keindahan pohon kelapa yang mengmenggambarkan semangat untuk berkembang dalam berbagai keadaan, seperti halnya pohon kelapa yang bisa tumbuh di berbagai jenis tanah,
                            . Pohon kelapa bisa tumbuh di tanah yang kering seperti pantai dan bisa tumbuh di pegunungan yang bertekstur tanah, selain itu bisa menghasilkan buah yang sama khasiatnya
                            di berbagai jenis tanah
                        </p>
                </MDBCol>
                <MDBCol md="2" className="text-center ">
                    <h5 className="title mb-3">Links</h5>
                    <ul className="text-left">
                        <li className="list-unstyled">
                            <a href="https://www.facebook.com/dhimashertianto"><img src="https://i.ibb.co/Lh6tZrv/facebook-1.png" alt="facebook-1" />      Facebook </a>
                        </li>
                        <li className="list-unstyled my-2">
                            <a href='https://github.com/dhimas1993'><img src="https://i.ibb.co/JQ0K1g8/github-1.png" alt="github-1" /> Github</a>
                        </li>
                        <li className="list-unstyled my-2">
                            <a href="https://www.instagram.com/kebunkelapa.id"><img src="https://i.ibb.co/dQt6wyd/instagram-1.png" alt="instagram-1" /> Instagram</a>
                        </li>
                    </ul>
                </MDBCol>
                <MDBCol md="2" className="text-center ">
                    <h5 className="title mb-3">Links</h5>
                    <ul className="text-left">
                        <li className="list-unstyled">
                            <a href='https://www.linkedin.com/in/dhimas-hertianto-b0b911118/'><img src="https://i.ibb.co/WHttwB0/linkedin-1.png" alt="linkedin-1" /> linkedin</a>
                           
                        </li>
                        <li className="list-unstyled my-2">
                            <a href='https://wa.me/6281218302334'><img src="https://i.ibb.co/WDhYjVH/whatsapp-1.png" alt="whatsapp-1" /> whatsapp</a>
                        </li>
                        <li className="list-unstyled">
                            <a href='mailto:dhimashertianto@gmail.com'><img src="https://i.ibb.co/bHgWh4v/google-plus-1.png" alt="google-plus-1" /> Email</a>
                        </li>
                    </ul>
                </MDBCol>
            </MDBRow>
        </MDBCol>
        </div>
        <div className="footer-copyright text-center py-3">
            <MDBContainer fluid>
                &copy; {new Date().getFullYear()} Copyright: <a href="https://www.instagram.com/dhimasherti"> KEBUNKELAPA.ID </a>
            </MDBContainer>
        </div>
    </MDBFooter>
    </div>
  );
}

export default FooterPage;