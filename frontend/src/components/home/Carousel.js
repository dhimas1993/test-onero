import React, { Component } from 'react';
import {
  Carousel
} from 'react-bootstrap';
import foto from '../../photo/Corousel 1.jpg'
import foto1 from '../../photo/corousel 2.jpg'
import foto2 from '../../photo/corousel 3.jpg'
import foto3 from '../../photo/corousel 4.jpg'

class carousel extends Component {
    render () {
        return (
            <div className="">
                <Carousel>
                    <Carousel.Item>
                            <img
                            className="d-block w-100" 
                            src={foto}
                            alt="First slide"
                            />
                        <Carousel.Caption>
                            <h3></h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src={foto1}
                            alt="Third slide"
                            />
                        <Carousel.Caption>
                            <h3></h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src={foto2}
                            alt="Third slide"
                            />

                        <Carousel.Caption>
                            <h3></h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src={foto3}
                            alt="Third slide"
                            />

                        <Carousel.Caption>
                            <h3></h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        )
    }
}
export default carousel;