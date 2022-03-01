module.exports = {
    webpack: {
        configure: (webpackConfig) => {
            return {
                ...webpackConfig,
               
                devtool: 'eval',
            }
        }
    }
};