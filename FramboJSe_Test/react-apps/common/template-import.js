//const getImport = document.querySelector('#react-head');
//console.log(getImport);

//// Clone the <template> in the import.
//const template = getImport.import.querySelector('#head-template');
//const clone = document.importNode(template.content, true);

//document.head.appendChild(clone);


const tags = 
      '<script src="/system/3rd-parties/system/system.js"></script>'
    + '<script src="/system/config.sys.js"></script>'
    + '<script src="/system/3rd-parties/babel/babel.min.js"></script>'
    //+ '<script src="/system/3rd-parties/react/react.development.js"></script>'
    //+ '<script src="/system/3rd-parties/react/react-dom.development.js"></script>'

    + '<link type="text/css" rel="stylesheet" href="/system/resources/css/overrides.sys.css" />'
    + '<link type="text/css" rel="stylesheet" href="/system/resources/css/typographics.sys.css" />'
    + '<link type="text/css" rel="stylesheet" href="/system/resources/css/structural.sys.css" />'
    + '<link type="text/css" rel="stylesheet" href="/private/resources/css/overrides.pvt.css" />'
    + '<link type="text/css" rel="stylesheet" href="/private/resources/css/typographics.pvt.css" />'
    + '<link type="text/css" rel="stylesheet" href="/private/resources/css/application.pvt.css" />';


document.head.innerHTML = document.head.innerHTML + tags;