function carregarEstados() {
    $("#cidades").html("");
    $.ajax("/estados.json").done(function(data) {
        $("#estados").html("");
        $("#estados").append('<option value="">[Selecione um estado]</option>')
        for (var i = 0; i < data.length; i++) {
            var key = Object.keys(data[i]);
            var value = data[i][key];

            $("#estados").append('<option value="' + key + '">' + value + '</option>');
        }
    });
}

$("#btnCarregarEstados").click(function() {
    carregarEstados();
});


$("#estados").change(function() {
    var estado = $("#estados").val();

    $.ajax("/cidades.json?estado=" + estado).done(function(data) {
        $("#cidades").html("");
        for (var i = 0; i < data.length; i++) {
            $("#cidades").append('<option value="' + data[i] + '">' + data[i] + '</option>');
        }
    });
});