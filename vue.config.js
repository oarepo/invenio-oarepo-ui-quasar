const path = require('path');
const fs = require('fs');

function generateRecord(recordId) {
    return {
        'created': '2019-12-01T23:48:10.851166+00:00',
        'id': recordId,
        'links': {
            'self': 'https://restaurovani.vscht.cz/api/drafts/restorations/objects/' + recordId,
            'ui': '/records/' + recordId,
        },
        'metadata': {
            '$schema': 'https://restaurovani.vscht.cz/schemas/draft/krokd/restoration-object-v1.0.0.json',
            'id': recordId,
            'title': 'Object ' + recordId,
            'thumbnail': 'https://cis-login.vscht.cz/static/web/logo_small.png',
            'creator': ["John", "Mary", "Peter", "Jane"][parseInt(recordId)%4] + " " +
                ["Brown", "Black", "White", "Red", "Yellow", "Blue", "Green", "Gray", "Violet"][parseInt(recordId)%9],
            'location': {
                street: 'Technicka',
                number: recordId,
                city: 'Prague',
                zipcode: 19000
            }
        }
    }
}

module.exports = {
    pluginOptions: {
        quasar: {
            importStrategy: 'manual',
            rtlSupport: false
        },
        'serve-api-mocks': {
            base: '/demo-invenio-quasar/api',
            routes: [
                {
                    path: '/records/:recordId',
                    callback(req, res) {
                        console.log(req.params)
                        res
                            .status(200)
                            .json(generateRecord(req.params.recordId))
                            .end();
                    },
                },
                {
                    path: '/records',
                    callback(req, res) {
                        const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'demo-invenio-quasar/api/records/GET.json'),
                            { encoding: 'utf-8' }));
                        const page = parseInt(req.query.page || 1);
                        const pagesize = parseInt(req.query.size || 10);
                        data.hits.hits = [...Array(pagesize)
                            .keys()]
                            .map(x => (x + 1 + pagesize * (page - 1)).toString())
                            .map(x => generateRecord(x));
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
        disableHostCheck: true,
        before: function(app/*, server, compiler*/) {
            const morgan = require("morgan");
            app.use(morgan('combined'));
        }
    },
    publicPath: process.env.DEMO_DEPLOY_PATH || './'
};

