import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Loader.css';

const Loader = ({ className, size, fullSize }) => (
  <div
    className={classnames(className, { [styles.fullSize]: fullSize })}
    style={{
      left: fullSize ? `calc(50% - ${size / 2}px)` : `${size}px`,
      top: fullSize ? `calc(50% - ${size / 2}px)` : `${size}px`,
    }}
  >
    <div
      className={`${styles.loader} relative`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <svg className={styles.circular} viewBox="25 25 50 50">
        <circle
          className={styles.path}
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
      </svg>
    </div>
  </div>
);

Loader.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
  fullSize: PropTypes.bool,
};

Loader.defaultProps = {
  className: '',
  size: 46,
  fullSize: false,
};


export default Loader;
