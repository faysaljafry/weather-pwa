if (!self.define) {
  const e = (e) => {
      'require' !== e && (e += '.js');
      let i = Promise.resolve();
      return (
        n[e] ||
          (i = new Promise(async (i) => {
            if ('document' in self) {
              const n = document.createElement('script');
              (n.src = e), document.head.appendChild(n), (n.onload = i);
            } else importScripts(e), i();
          })),
        i.then(() => {
          if (!n[e]) throw new Error(`Module ${e} didn’t register its module`);
          return n[e];
        })
      );
    },
    i = (i, n) => {
      Promise.all(i.map(e)).then((e) => n(1 === e.length ? e[0] : e));
    },
    n = { require: Promise.resolve(i) };
  self.define = (i, r, c) => {
    n[i] ||
      (n[i] = Promise.resolve().then(() => {
        let n = {};
        const s = { uri: location.origin + i.slice(1) };
        return Promise.all(
          r.map((i) => {
            switch (i) {
              case 'exports':
                return n;
              case 'module':
                return s;
              default:
                return e(i);
            }
          })
        ).then((e) => {
          const i = c(...e);
          return n.default || (n.default = i), n;
        });
      }));
  };
}
define('./service-worker.js', ['./workbox-543be79b'], function (e) {
  'use strict';
  self.addEventListener('message', (e) => {
    e.data && 'SKIP_WAITING' === e.data.type && self.skipWaiting();
  }),
    e.precacheAndRoute(
      [
        { url: 'css/app.93a42e67.css', revision: null },
        { url: 'favicon.ico', revision: '1ba2ae710d927f13d483fd5d1e548c9b' },
        {
          url: 'img/icons/apple-touch-icon.png',
          revision: '66830ea6be8e7e94fb55df9f7b778f2e',
        },
        {
          url: 'img/icons/icon120.png',
          revision: '936d6e411cabd71f0e627011c3f18fe2',
        },
        {
          url: 'img/icons/icon150.png',
          revision: '058a3335d15a3eb84e7ae3707ba09620',
        },
        {
          url: 'img/icons/icon152.png',
          revision: '1a034e64d80905128113e5272a5ab95e',
        },
        {
          url: 'img/icons/icon16.png',
          revision: '4bb1a55479d61843b89a2fdafa7849b3',
        },
        {
          url: 'img/icons/icon180.png',
          revision: 'c43cd371a49ee4ca17ab3a60e72bdd51',
        },
        {
          url: 'img/icons/icon192.png',
          revision: 'f130a0b70e386170cf6f011c0ca8c4f4',
        },
        {
          url: 'img/icons/icon32.png',
          revision: '98b614336d9a12cb3f7bedb001da6fca',
        },
        {
          url: 'img/icons/icon512.png',
          revision: '0ff1bc4d14e5c9abcacba7c600d97814',
        },
        {
          url: 'img/icons/icon60.png',
          revision: '9a2b5c0f19de617685b7b5b42464e7db',
        },
        {
          url: 'img/icons/icon76.png',
          revision: 'af28d69d59284dd202aa55e57227b11b',
        },
        {
          url: 'img/icons/msapplication-icon-144x144.png',
          revision: 'b89032a4a5a1879f30ba05a13947f26f',
        },
        {
          url: 'img/icons/safari-pinned-tab.svg',
          revision: '4e857233cbd3bb2d2db4f78bed62a52f',
        },
        { url: 'index.html', revision: '9c0fd5f944cc7d8087417f6560097025' },
        { url: 'js/app.20485f0e.js', revision: null },
        { url: 'js/chunk-vendors.23fbd908.js', revision: null },
        { url: 'manifest.json', revision: '5236286ea72ed65dbec3b6a0af9834c5' },
        {
          url: 'precache-manifest.78ce0b2db48421b299d52ef323da225b.js',
          revision: '78ce0b2db48421b299d52ef323da225b',
        },
        { url: 'robots.txt', revision: 'b6216d61c03e6ce0c9aea6ca7808f7ca' },
        {
          url: 'service-worker.js',
          revision: 'd93f6afeceebac80de2cfff5b5a5a08f',
        },
      ],
      {}
    );
});
//# sourceMappingURL=service-worker.js.map
