const process = () => {
  return {
    code: `module.exports = {};`,
  };
};

const getCacheKey = () => {
  return 'svgTransform';
};

export { process, getCacheKey };
