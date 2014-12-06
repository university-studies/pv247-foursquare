var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/Spec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

requirejs.config({
    // Karma serves files from '/base'

    paths: {
        angular: '/base/lib/angular',
        angularResource: '/base/lib/angular-resource',
        angularMocks: '/base/lib/angular-mocks',
        uiBootstrap: '/base/lib/ui-bootstrap-tpls-0.11.2'
    },

    baseUrl: '/base/site',

    shim: {
        'angular': {'exports': 'angular'},
        'angularResource': ['angular'],
        'uiBootstrap': {
            deps: ['angular'],
            exports: 'uiBootstrap'
        },
            'angularMocks': {
                deps: ['angular'],
                'exports': 'angular.mock'
            }
        },

    /**
    Nacita vsetky subory
    */
    deps: tests,
    callback: window.__karma__.start
});