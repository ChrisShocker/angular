import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  template: `
    <div class="container">
      <svg
        width="250px"
        height="250px"
        viewBox="0 0 1000 1000"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <title>badge</title>
        <desc>Created with Sketch.</desc>
        <defs></defs>
        <g
          id="badge"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <polygon
            id="Path-2"
            fill="#412846"
            points="500.96252 11 44 169.619503 109.419009 775.863609 500.96252 989.147518"
          ></polygon>
          <polygon
            id="Path-2"
            fill="#4B314F"
            points="499 11 955.96252 169.619503 890.543511 775.863609 499 989.147518"
          ></polygon>
          <path
            d="M727.748042,345.712306 L727.66634,345.452948 C748.53141,368.675743 759.248655,396.250955 759.818077,428.178583 C760.387499,460.10621 749.670253,493.785553 727.419362,529.113702 C744.049216,516.186231 763.254044,488.280572 784.970754,445.720993 C794.352489,531.973497 759.496406,597.488822 680.07676,642.358274 C705.433171,640.019987 739.098221,623.326102 780.852373,592.218304 C736.295204,699.492316 654.368246,756.091448 535.071499,762.0157 C419.779066,761.984828 345.090509,692.70063 345.149347,692.744623 C297.749003,655.853422 265.136294,609.356006 247.420657,553.461194 C219.071352,522.501468 218.788687,519.181412 215.864399,506.810213 C212.94011,494.439015 217.711589,490.983038 226.016225,478.877684 C231.552649,470.807448 232.857288,459.198337 230.012754,444.257657 C222.955013,434.470009 218.890643,419.140866 217.819642,398.270229 C217.819642,388.184149 224.550937,377.542369 238.013526,366.344888 C251.476116,355.147407 259.735587,346.535764 262.727877,340.60672 C265.010137,337.374281 265.891913,323.360897 265.373204,298.56657 C265.233841,274.213659 278.755317,260.964316 305.93763,258.818543 C346.7111,255.599883 369.705986,224.934529 382.516256,210.988846 C391.056436,201.691724 403.695194,197.172941 419.636711,197.086041 C442.079696,196.034098 462.499977,204.637166 480.091445,222.390999 C523.906033,220.124746 568.786858,231.940816 614.26226,257.53906 C678.886453,295.927519 714.155144,337.500002 720.068335,382.04686 C713.141516,440.672126 634.388911,439.139539 484.158007,377.434888 C405.540854,399.703741 366.890462,447.959933 368.174379,522.203462 C368.120638,590.331666 401.093921,639.837612 466.867448,670.671325 C434.809471,639.197634 421.156861,612.743966 425.754563,590.835913 C492.434057,669.802565 568.387234,699.317583 653.4812,679.387085 C615.964887,680.696908 586.248445,668.625202 563.883439,642.99059 C621.400796,641.592694 675.697848,614.89246 726.828497,562.61827 C697.312743,586.105598 666.427352,594.999478 633.726894,589.404987 C722.294422,519.773811 753.634804,438.542918 727.748042,345.712306 Z M567,335 C574.179702,335 580,329.179702 580,322 C580,314.820298 574.179702,309 567,309 C559.820298,309 554,314.820298 554,322 C554,329.179702 559.820298,335 567,335 Z"
            id="Combined-Shape"
            fill="#BA2BD2"
          ></path>
        </g>
      </svg>
      <h1>Pluralsight Angular NgRx Fundamentals</h1>
      <h2>Duncan Hunter @dunchunter</h2>
    </div>
  `,
})
export class HomeComponent {
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.subscribe((state) =>
      console.log('Log Store From Home: ', state)
    );
  }
}
