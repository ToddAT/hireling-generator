import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Carousel } from 'react-bootstrap';
import IndexCard from './indexCard';

class RetainerCarousel extends Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      index: 0,
      direction: null
    };
  }

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  }

  render() {
    const { index, direction } = this.state;

    const carouselItems = this.props.population.map((r) =>
      <Carousel.Item>
        <IndexCard></IndexCard>
        <Carousel.Caption>
          <h3>{ r.name }</h3>
          <p>{ r.occupation.Name }</p>
        </Carousel.Caption>
      </Carousel.Item>
    );

    return (
       <Carousel
        activeIndex={index}
        direction={direction}
        onSelect={this.handleSelect}
      >
        { carouselItems }
      </Carousel>
  );
  }
}

const propTypes = {
  'population': PropTypes.array.isRequired,
};

export default RetainerCarousel;