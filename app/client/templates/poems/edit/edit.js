/*****************************************************************************/
/* Edit: Event Handlers */
/*****************************************************************************/
Template.Edit.events({
  "click .remove": function () {
    if (confirm("remove the poem \"" + poem.displayTitle() + "\" forever?")) {
      Router.go('poems');
      //alert("ok")
      Poems.remove(poem._id)
    }
  },  
  "paste input[name^=lines][name$=text]": function (event) {
        console.log('paste');
        e=event.originalEvent;
        if (e.clipboardData) {
            console.log('event.clipboardData');
            if (e.clipboardData.types) {
                console.log('event.clipboardData.types');

                // Look for a types property that is undefined
                if (!isArray(e.clipboardData.types)) {
                    console.log('event.clipboardData.types is undefined');
                }

                // Loop the data store in type and display it
                var i = 0;
                while (i < e.clipboardData.types.length) {
                    var key = e.clipboardData.types[i];
                    var val = e.clipboardData.getData(key);
                    console.log((i + 1) + ': ' + key + ' - ' + val);
                    i++;

                    if (key == "text/plain") {
                      /***************************************** DO THE WORK ******************/

                      arrayOfLines = val.match(/[^\r\n]+/g);
                      newLines = []
                      arrayOfLines.forEach(function (text,i) {
                        text = text.trim()
                        console.log(i)
                        console.log(text)
                        newLines.push({
                          text: text
                        })

                        if (i == 0) {
                            setTimeout(function(){
                              $(event.target).val(text)
                            },500)                          
                        }
                        else {
                          setTimeout(function(){
                            $(".autoform-add-item[data-autoform-field=lines]").trigger('click')
                            setTimeout(function(){
                              $("input[data-schema-key^=lines][data-schema-key$=text]").last().val(text)
                            },500)
                          },i*1000)
                        }

                      })
                      console.log(newLines)
                      console.log("THIS IS")
                      console.log(this)
                      console.log("EVENT IS")
                      console.log(event)                      
                      //addLineToPoem()

                      /***************************************** END **************************/
                    }
                }

            } else {
                // Look for access to data if types array is missing 
                var text = e.clipboardData.getData('text/plain');
                var url = e.clipboardData.getData('text/uri-list');
                var html = e.clipboardData.getData('text/html');
                console.log('text/plain - ' + text);
                if (url !== undefined) {
                    console.log('text/uri-list - ' + url);
                }
                if (html !== undefined) {
                    console.log('text/html - ' + html);
                }
            }
        }

        // IE event is attached to the window object
        if (window.clipboardData) {
            console.log('window.clipboardData');
            // The schema is fixed
            var text = window.clipboardData.getData('Text');
            var url = window.clipboardData.getData('URL');
            console.log('Text - ' + text);
            if (url !== null) {
                console.log('URL - ' + url);
            }
        }  
    }
});

function isArray(obj) {
    return obj && !(obj.propertyIsEnumerable('length')) && 
        typeof obj === 'object' && typeof obj.length === 'number';
};  

/*****************************************************************************/
/* Edit: Helpers */
/*****************************************************************************/
Template.Edit.helpers({
  poem: function () {
    var id = Router.current().params._id
    if (id) {
      poem = Poems.findOne( { _id: id } )
      console.log(poem)
      return poem
    }
  },
  addLineToPoem: function() {
    console.log(poem)
  }
});

/*****************************************************************************/
/* Edit: Lifecycle Hooks */
/*****************************************************************************/
Template.Edit.created = function () {
};

Template.Edit.rendered = function () {
};

Template.Edit.destroyed = function () {
};
