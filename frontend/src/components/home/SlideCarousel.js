import React, { Component } from 'react';
import InfiniteCarousel from 'react-leaf-carousel'

import foto from '../picture/Photo/photo carousel/Corousel 1.jpg'
import foto1 from '../picture/Photo/photo carousel/corousel 2.jpg'
import foto2 from '../picture/Photo/photo carousel/corousel 3.jpg'
import foto3 from '../picture/Photo/photo carousel/corousel 4.jpg'


class SlideCarousel extends Component {
    render () {
        return (
            <div className="container my-3">
                <InfiniteCarousel
                    breakpoints={[
                    {
                        breakpoint: 500,
                        settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        },
                    },
                    {
                        breakpoint: 768,
                        settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        },
                    },
                    ]}
                    dots={true}
                    showSides={true}
                    sidesOpacity={.5}
                    sideSize={.1}
                    slidesToScroll={1}
                    slidesToShow={5}
                    scrollOnDevice={true}
                >
                    <div>
                    <img
                        alt=''
                        src={foto1}
                    />
                    </div>
                    <div>
                    <img
                        alt=''
                        src={foto2}
                    />
                    </div>
                    <div>
                    <img
                        alt=''
                        src={foto1}
                    />
                    </div>
                    <div>
                    <img
                        alt=''
                        src={foto2}
                    />
                    </div>
                    <div>
                    <img
                        alt=''
                        src={foto1}
                    />
                    </div>
                    <div>
                    <img
                        alt=''
                        src={foto2}
                    />
                    </div>
                </InfiniteCarousel>
            </div>
        )
    }
}

export default SlideCarousel