var canvas = new fabric.Canvas("canvas");
canvas.backgroundColor = '#fff';
canvas.renderAll();
$('#bg_color').on('input', function() { 
    canvas.backgroundColor = $('#bg_color').val();
    canvas.renderAll();
});

/*Add image into canvas */
document.getElementById("uploader").onchange = function(e) {
    var reader = new FileReader();
    reader.onload = function(e) {
      var image = new Image();
      image.src = e.target.result;
      image.onload = function() {
        var img = new fabric.Image(image);
        img.set({
          left: 100,
          top: 60
        });
        img.scaleToWidth(200);
        canvas.add(img).setActiveObject(img).renderAll();
      }
    }
    reader.readAsDataURL(e.target.files[0]);
  }

/* Add text into canvas */
$('#btn_add_new').click(function(e) {
    e.preventDefault();
    if($('#new_text').val() !== '')
    {
        var newText = new fabric.IText($('#new_text').val(), { 
            fontFamily: "Arial", 
            right:0,
            left:0,
            fontSize: 20,
            textAlign: "center",
            fill: '#000',
        });
        canvas.add(newText);
        canvas.renderAll();
        $('#new_text').val('');
        renderLayers();
    }
});


function renderLayers(){
    $("#layers").html("");
    var layers = canvas.getObjects();
    for(var i=0; i<layers.length; i++)
    {
        $('#layers').append('<li class="list-group-item">'+layers[i].text+'<a onClick="removeLayers('+i+')" class="btn btn-sm btn-warning pull-right">X</a></li>')
    }
}
function removeLayers(index){
    canvas.getObjects()[index].remove();
    renderLayers();
}
canvas.on('object:modified', function(){
    renderLayers();
});

/* save image */
const downloadButton = document.getElementById("download");
downloadButton.addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = canvas.toDataURL();
    link.download = `img-generator-${new Date().getTime()}.png`;
    link.click();
});


/*delete image */
$('#remove').click(function(){
    var object = canvas.getActiveObject();
    if (!object){
        alert('Please select the element to remove');
        return '';
    }
    canvas.remove(object);
});

