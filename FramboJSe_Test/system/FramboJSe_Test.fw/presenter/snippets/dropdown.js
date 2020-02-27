// dropdown.js -> "dropdown" snippet management file
// target:  <snp_dropdown />
// funct.:  Generazione di un pannello dropdown
// output:  panel
define([], function () {

    var _ITEMNAME = 'dropdown';												    // Item's name
    var _ITEMTAG = 'snp_';														// Item's tag prefix

    return {
        itemName: _ITEMNAME,
        itemTag: _ITEMTAG,
        BuildHtml: buildHtml
    }


    // FUNCTION: buildHtml
    //  builds the snippet's HTML code 
    // PARAMS:
    //  tagPars : tag's custom parameters (in JSON format)
    //  pbAttrs : the "public" attributes to be applied to the most external element of the snippet
    //              pbAttrs[0] : extension of "class" attribute,
    //              pbAttrs[1] : all others attributes 
    // RETURN:
    //  myHtml  : HTML formatted code as simple text (syncronous mode) or promise (asyncronous mode)
    function buildHtml(tagPars, pbAttrs) {

        //verificare l'importazione di bootstrap

        var myHtml = '';
        var childHtml = '';
        if (tagPars.title === undefined) {
            tagPars.title = '';
        }
        tagPars.subTitle = '';
        var icon_type1 = 'fas fa-chevron-down';											// font awesome icon
        var icon_type2 = 'fa fa-caret-down';
        var icon1_default_class = 'float-right dropdown-ico';
        var icon2_default_class = 'dropdown-ico';
        var priority = 0;
        var icon = icon_type1;          //set default
        var dropdownTag = _ITEMTAG + _ITEMNAME;
        var snp_dropdownLength = $(dropdownTag).length;

        if (tagPars.icon_type === 'primary') {
            icon = icon_type1;
        } else if (tagPars.icon_type === 'secondary') {
            icon = icon_type2;
        }

        //check for nested dropdowns
        if (snp_dropdownLength > 1) {
            for (var i = 0; i < snp_dropdownLength; i++) {
                if ($(dropdownTag).children()[i].localName === dropdownTag) {
                    priority = 2;

                    icon = icon_type2;

                    var childChild = $(dropdownTag).children()[i].innerHTML;
                    var stretchedTitle = getTrunkedTitle(tagPars.subTitle);

                    // HTML definition
                    childHtml += '<div class="panel margin-b-30 padding-v-10">';
                    childHtml += '  <a class="panel-toggle panel-title collapsed" data-toggle="collapse" data-target="#panel-' + stretchedTitle.toLowerCase().replace(/ /g, "") + '" aria-expanded="false">';
                    childHtml += '    <i class="' + icon_type2 + ' ' + icon2_default_class + '"></i>';
                    childHtml += tagPars.subTitle;
                    childHtml += '  </a>';
                    childHtml += '  <div id="panel-' + stretchedTitle.toLowerCase().replace(/ /g, "") + '" class="panel-content collapse">';
                    if (childChild) {
                        childHtml += childChild;
                    }
                    childHtml += '  </div>';
                    childHtml += '</div>';
                }
            }
            priority = 1;
            if (priority === 1) {
                icon = icon_type1;
                var childParent = $(_ITEMTAG + _ITEMNAME)[0].innerHTML;

                // HTML definition
                myHtml += '<div class="card ' + pbAttrs[0].replace(/ /g, "") + '" id="' + tagPars.title.toLowerCase().replace(/ /g, "") + '">';
                myHtml += '<' + tagPars.tag + ' class="card-header btnMain ' + pbAttrs[0] + ' dropdown-panel dropdown-toggle collapsed"' +
                    'id="' + tagPars.title.toLowerCase().replace(/ /g, "") + 'Header" data-toggle="collapse" data-target="#' + tagPars.title.toLowerCase().replace(/ /g, "") + 'Body" aria-expanded="false">' + tagPars.title +
                    '<i class="' + icon + ' ' + icon1_default_class + '" ></i>' +
                    '</' + tagPars.tag + '>';
                myHtml += '<div id="' + tagPars.title.toLowerCase().replace(/ /g, "") + 'Body" class="padding-t-10 collapse show" aria-labelledby="' + tagPars.title.toLowerCase().replace(/ /g, "") + 'Header">' +
                    '<div class="card-body">';
                if (childHtml) {
                    myHtml += childHtml;
                }
                myHtml += '</div>';
                myHtml += '</div>';
                myHtml += '</div>';
            } 
        }

        // Return value
        return new Promise((resolve, reject) => { resolve(myHtml) });
    }

    function getTrunkedTitle(str) {
        return str.replace(/:/g, "").split(/\s+/).slice(0, 3).join(" ");
    }
});
