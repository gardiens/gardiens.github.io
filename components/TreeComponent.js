
import Pythagoras from "./Tree";


import React, { Component, useRef, useState, useEffect } from 'react';
import { select as d3select, mouse as d3mouse, scaleLinear } from 'd3';

class TreeContainer extends Component {

    state = {
        currentMax: 0,
        baseW: 60,
        heightFactor: 0,
        lean: 0
    };

    running = false;
    realMax = 9;
    svgRef = React.createRef();

    componentDidMount() {
        d3select(this.svgRef.current)
            .on("mousemove", this.onMouseMove.bind(this))
            .on("touchmove", this.onMouseMove.bind(this));

        this.next();
    }

    next() {
        const { currentMax } = this.state;

        if (currentMax < this.realMax) {
            this.setState({ currentMax: currentMax + 1 });
            setTimeout(this.next.bind(this), 500);
        }
    }

    // Throttling approach borrowed from Vue fork
    // https://github.com/yyx990803/vue-fractal/blob/master/src/App.vue
    // rAF makes it slower than just throttling on React update
    onMouseMove(event) {
        if (this.running) return;
        this.running = true;

        const [x, y] = d3mouse(this.svgRef.current),
            scaleFactor = scaleLinear()
                .domain([this.props.height, 0])
                .range([0, 0.5]),
            scaleLean = scaleLinear()
                .domain([0, this.props.width / 2, this.props.width])
                .range([0.2, 0, -0.2]);

        this.setState({
            heightFactor: scaleFactor(y),
            lean: scaleLean(x)
        });
        this.running = false;
    }
    
    render() {
        return (
            <>
                <svg
                    ref={this.svgRef}
                    width={this.props.width}
                    height={this.props.height}
                    style={{ border: "hidden lightgray", borderRadius: "80px" }}
                >
                    <Pythagoras
                        w={this.state.baseW}
                        h={this.state.baseW}
                        heightFactor={this.state.heightFactor}
                        lean={this.state.lean}
                        x={this.props.width / 2 - this.state.baseW/2}
                        y={this.props.height - 2*this.state.baseW}
                        lvl={0}
                        maxlvl={this.state.currentMax}
                    />
                </svg>
            </>
        );
    }
}

const isBrowser = () => typeof window !== 'undefined';

const TreeComponent = props => {
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // holds the timer for setTimeout and clearInterval
  let movement_timer = null;

  // the number of ms the window size must stay the same size before the
  // dimension state variable is reset
  const RESET_TIMEOUT = 100;

  const test_dimensions = () => {
    // For some reason targetRef.current.getBoundingClientRect was not available
    // I found this worked for me, but unfortunately I can't find the
    // documentation to explain this experience
    if (targetRef.current) {
      setDimensions({
        width: Math.min(targetRef.current.offsetWidth,800),
        height: 400,
      });
    }
  };

  // This sets the dimensions on the first render
  useEffect(() => {
    test_dimensions();
  }, []);

  // every time the window is resized, the timer is cleared and set again
  // the net effect is the component will only reset after the window size
  // is at rest for the duration set in RESET_TIMEOUT.  This prevents rapid
  // redrawing of the component for more complex components such as charts
  if (isBrowser()) {
    window.addEventListener("resize", () => {
        clearInterval(movement_timer);
        movement_timer = setTimeout(test_dimensions, RESET_TIMEOUT);
    });
  }

  return (
    <div ref={targetRef}>
        <TreeContainer {...dimensions} />
    </div>
  );
};


/*
class TreeContainer extends Component {

    state = {
        currentMax: 0,
        baseW: 60,
        heightFactor: 0,
        lean: 0
    };
    running = false;
    realMax = 11;
    svg = d3select("body").select("svg");
        
    componentDidMount() {

        this.svg.on("mousemove", this.onMouseMove.bind(this))
           .on("touchmove", this.onMouseMove.bind(this));
        

        this.next();
    }

    next() {
        const { currentMax } = this.state;

        if (currentMax < this.realMax) {
            this.setState({ currentMax: currentMax + 1 });
            setTimeout(this.next.bind(this), 500);
        }
    }

    // Throttling approach borrowed from Vue fork
    // https://github.com/yyx990803/vue-fractal/blob/master/src/App.vue
    // rAF makes it slower than just throttling on React update
    onMouseMove(event) {
        if (this.running) return;
        this.running = true;

        const [x, y] = d3mouse(this.svg),
            scaleFactor = scaleLinear()
                .domain([this.props.height, 0])
                .range([0, 0.5]),
            scaleLean = scaleLinear()
                .domain([0, this.props.width / 2, this.props.width])
                .range([0.2, 0, -0.2]);

        this.setState({
            heightFactor: scaleFactor(y),
            lean: scaleLean(x)
        });
        this.running = false;
    }
    
    render() {
        return (
            <>
                <svg
                    width={this.props.width}
                    height={this.props.height}
                    style={{ border: "hidden lightgray", borderRadius: "80px" }}
                >
                    <Pythagoras
                        w={this.state.baseW}
                        h={this.state.baseW}
                        heightFactor={this.state.heightFactor}
                        lean={this.state.lean}
                        x={this.props.width / 2 - this.state.baseW/2}
                        y={this.props.height - 2*this.state.baseW}
                        lvl={0}
                        maxlvl={this.state.currentMax}
                    />
                </svg>
            </>
        );
    }
}

const isBrowser = () => typeof window !== 'undefined';

const TreeComponent = props => {
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // holds the timer for setTimeout and clearInterval
  let movement_timer = null;

  // the number of ms the window size must stay the same size before the
  // dimension state variable is reset
  const RESET_TIMEOUT = 100;

  const test_dimensions = () => {
    // For some reason targetRef.current.getBoundingClientRect was not available
    // I found this worked for me, but unfortunately I can't find the
    // documentation to explain this experience
    if (targetRef.current) {
      setDimensions({
        width: Math.min(targetRef.current.offsetWidth,800),
        height: 400,
      });
    }
  };

  // This sets the dimensions on the first render
  useLayoutEffect(() => {
    test_dimensions();
  }, []);

  // every time the window is resized, the timer is cleared and set again
  // the net effect is the component will only reset after the window size
  // is at rest for the duration set in RESET_TIMEOUT.  This prevents rapid
  // redrawing of the component for more complex components such as charts
  if (isBrowser()) {
    window.addEventListener("resize", () => {
        clearInterval(movement_timer);
        movement_timer = setTimeout(test_dimensions, RESET_TIMEOUT);
    });
    }

  return (
    <div ref={targetRef}>
        <TreeContainer {...dimensions} />
    </div>
  );
};
*/

export default TreeComponent;
/*
export default function TreeComponent() {
    return(
        <></>
    );
};*/