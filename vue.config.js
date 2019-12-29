const path = require('path');
const fs = require('fs');

module.exports = {
    pluginOptions: {
        quasar: {
            importStrategy: 'manual',
            rtlSupport: false
        },
        'serve-api-mocks': {
            base: '/api',
            routes: [
                {
                    path: '/records',
                    callback(req, res) {
                        const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'api/records/GET.json'),
                            { encoding: 'utf-8' }));
                        const page = parseInt(req.query.page || 1);
                        const pagesize = parseInt(req.query.size || 10);
                        data.hits.hits = [...Array(pagesize)
                            .keys()]
                            .map(x => (x + 1 + pagesize * (page - 1)).toString())
                            .map(x => ({
                                'created': '2019-12-01T23:48:10.851166+00:00',
                                'id': x,
                                'links': {
                                    'self': 'https://restaurovani.vscht.cz/api/drafts/restorations/objects/' + x,
                                },
                                'metadata': {
                                    '$schema': 'https://restaurovani.vscht.cz/schemas/draft/krokd/restoration-object-v1.0.0.json',
                                    'id': x,
                                    'title': 'Object ' + x,
                                    'thumbnail': 'https://cis-login.vscht.cz/static/web/logo_small.png',
                                    'creator': ["John", "Mary", "Peter", "Jane"][parseInt(x)%4] + " " + ["Brown", "Black", "White", "Red", "Yellow", "Blue", "Green", "Gray", "Violet"][parseInt(x)%9]
                                }
                            }));
                        res
                            .status(200)
                            .json(data)
                            .end();
                    },
                }
            ]
        }
    },
    configureWebpack(cfg) {
        cfg.resolve.alias['@oarepo/invenio-quasar'] =
            path.join(__dirname, 'library/index.js');
    },
    transpileDependencies: [
        'quasar'
    ],
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        disableHostCheck: true
    },
    baseUrl: './'
};

