/* Dev-time module loader for design-system HTML previews.
   The compiler ships a generated _ds_bundle.js, but these pages must also render when
   opened straight from the filesystem. dsLoad() fetches .jsx sources, transpiles them
   with Babel standalone (JSX + CommonJS interop) and resolves relative imports, so the
   same component files are the single source of truth in both cases.

   Paths are kept document-relative throughout (never absolutised via new URL) because
   the preview sandbox serves from an opaque origin where absolute fetches never settle. */
(function () {
  var registry = {};
  var pending = {};

  function normalize(path) {
    var parts = path.split("/");
    var out = [];
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      if (p === "" || p === ".") continue;
      if (p === ".." && out.length && out[out.length - 1] !== "..") out.pop();
      else out.push(p);
    }
    return out.join("/");
  }

  function resolve(base, spec) {
    var dir = base.indexOf("/") === -1 ? "" : base.slice(0, base.lastIndexOf("/"));
    return normalize(dir ? dir + "/" + spec : spec);
  }

  function loadModule(path) {
    if (registry[path]) return Promise.resolve(registry[path]);
    if (pending[path]) return pending[path];
    pending[path] = fetch(path)
      .then(function (r) {
        if (!r.ok) throw new Error("ds-dev-loader: cannot fetch " + path + " (" + r.status + ")");
        return r.text();
      })
      .then(function (src) {
        var deps = [];
        var re = /from\s*["']([^"']+)["']/g;
        var m;
        while ((m = re.exec(src))) if (deps.indexOf(m[1]) === -1) deps.push(m[1]);
        var map = {};
        return Promise.all(
          deps.map(function (d) {
            if (d === "react") { map[d] = window.React; return null; }
            if (d.indexOf("react-dom") === 0) { map[d] = window.ReactDOM; return null; }
            return loadModule(resolve(path, d)).then(function (mod) { map[d] = mod; });
          })
        )
          .then(function () {
            var code = window.Babel.transform(src, {
              presets: ["react"],
              plugins: ["transform-modules-commonjs"],
              filename: path,
            }).code;
            var moduleObj = { exports: {} };
            function require(d) {
              if (!(d in map)) throw new Error("ds-dev-loader: unresolved import " + d + " in " + path);
              return map[d];
            }
            new Function("require", "module", "exports", "React", code)(
              require, moduleObj, moduleObj.exports, window.React
            );
            registry[path] = moduleObj.exports;
            return moduleObj.exports;
          });
      });
    return pending[path];
  }

  window.dsLoad = function (paths) {
    return Promise.all(
      paths.map(function (p) { return loadModule(normalize(p)); })
    ).then(function (mods) {
      var out = {};
      mods.forEach(function (m) {
        Object.keys(m).forEach(function (k) { if (k !== "__esModule") out[k] = m[k]; });
      });
      return out;
    });
  };
})();
