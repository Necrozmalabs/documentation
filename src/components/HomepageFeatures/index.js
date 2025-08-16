import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
  title: 'High Accuracy Experiments',
  Svg: require('@site/static/img/experiment.svg').default,
  description: (
    <>
      Conduct experiments with exceptional precision, ensuring reliable and reproducible results for advanced scientific research.
    </>
  ),
},
{
  title: 'Leverage Julia for Computation',
  Svg: require('@site/static/img/programming.svg').default,
  description: (
    <>
      Utilize the power of the Julia programming language to perform high-performance computations and simulations efficiently.
    </>
  ),
},
{
  title: 'Detailed Experiment Analysis',
  Svg: require('@site/static/img/details.svg').default,
  description: (
    <>
      Track and analyze each step of your experiments in depth, gaining insights into the process and identifying key patterns.
    </>
  ),
},

];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    
    <section className={styles.features}>
      {/* <div className="svg-row-container">
  <svg role="img" src="/img/1.svg" alt="SVG 1" />
  <img role="img" src="/img/2.svg" alt="SVG 2" />
  <img role="img" src="/img/3.svg" alt="SVG 3" />
</div> */}

      <div className="container">
        <h1 className='h1' style={{marginBottom:"80px"}}>Build For Researchers, By Researchers</h1>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
