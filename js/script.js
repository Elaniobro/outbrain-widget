(function() {

    function jsonP() {
  // Set up API paramters
    var iFrameURL = document.querySelector('#obIframe').getAttribute("src"),
        parm = {
          url: iFrameURL,
          widgetJSId: 'AR_1',
          key: 'NANOWDGT01',
          idx: 1,
          format: 'json',
          callback: 'related'
        },
        str = ''; // String for the parameters to append.

    // Serialize the parmemters to append to the API call
    for(var key in parm){
      if (str !=''){
        str += "&";
      }
      str += key + "=" + parm[key];
    }

    // Inject JSON(P)
    res = document.createElement('script');
    res.type = 'text/javascript';
    res.src = 'http://odb.outbrain.com/utils/get?' + str;
    document.head.appendChild(res);

    // Callback JSON(P)
    related = function(res) {
      // Error Messaging
      if (!res) {
        return;
      }
      else {
        // Configure DOM
        var response = res.response.documents.doc,
            obWidgetList = document.querySelector('#ob-widget ul'),
            template = document.querySelector('#ob-template').innerHTML,
            data = response;

        // Mustache Template
        output = Mustache.render(template, data);  
        obWidgetList.innerHTML = output;
      }

      // Create Obj with links
      var obLinks = document.querySelectorAll('a.link');

      // Itterate over the obLinks obj to bind click event.
      for (link in obLinks){

        // Type Check
        if( typeof obLinks[link] === 'number'){
          break;
        }

        // Binding click event
        obLinks[link].addEventListener("click", function relatedLinks(){
          iFrameURL = this.getAttribute('data-link'); // Reset the iFrameURL var
          document.querySelector('#obIframe').src = iFrameURL; // Reset the iframe src to the iFrameURL var
          jsonP(); // Call the JSON(P) function.
        }, false);
      }    
    };

  }
  jsonP();
})();