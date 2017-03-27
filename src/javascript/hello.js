class Movie {
	constructor(id, title, pubYear, rating){
  	this.id = id;
  	this.title = title;
  	this.pubYear = pubYear;
  	this.rating = rating;
  }
}

class Store {
	constructor() {
  	this.data = [
    	new Movie(1,"mov_1",1990,4.5),
      new Movie(2,"mov_2",1991,4.6),
      new Movie(3,"mov_3",1992,4.7),
      new Movie(4,"mov_4",1993,4.8),
      new Movie(5,"mov_5",1994,4.9)
    ];
  }
  addMovie(movie) {
  	this.data.push(movie);
  }
  removeLast() {
  	this.data.pop();
  }
  reset() {
  	this.data = [
    	new Movie(1,"mov_1",1990,4.5),
      new Movie(2,"mov_2",1991,4.6),
      new Movie(3,"mov_3",1992,4.7),
      new Movie(4,"mov_4",1993,4.8),
      new Movie(5,"mov_5",1994,4.9)
    ];
  }
  exists(id) {
  	return this.data.map((i) => i.id).indexOf(parseInt(id)) > -1;
  }

}

class Main{
	constructor(element, store){
  	this.element = element;
    this.store = store;
  }
  render(){
  	$("#tab tbody tr").remove();
  	for (var i=0; i < this.store.data.length; i++) {
      $(this.element).find('tbody').append(
        $('<tr data-toggle="modal" data-target="#formDialog">')
          .append($('<td>').text(this.store.data[i].id))
          .append($('<td>').text(this.store.data[i].title))
          .append($('<td>').text(this.store.data[i].pubYear))
          .append($('<td>').text(this.store.data[i].rating))
      )
    }
  }
  getObj(id) {
  	for( let i=0; i<this.store.data.length;i++){
    	if(id == this.store.data[i].id){
      	return this.store.data[i];
      }
    }
		
  }
  addMovie(idInput, titleInput, pubYearInput, ratingInput) {
  	if (this.store.exists(idInput)) {
    	alert("Existed id");
      return false;
    } else {
    	var movie = new Movie(idInput,titleInput,pubYearInput,ratingInput);
  		this.store.addMovie(movie);
      return true;
    }
  }
  updateMovie(idInput,titleInput, pubYearInput, ratingInput, store) {
  	for( let i=0; i<this.store.data.length;i++){
    	if(idInput == this.store.data[i].id){
      	this.store.data[i].title = titleInput;
          this.store.data[i].pubYear = pubYearInput;
          this.store.data[i].rating = ratingInput;
          return true;
      }
    }        
  }

  removeLast() {
  	this.store.removeLast();
    console.log(main.store.data);
  }
  reset() {
  	this.store.reset();
  }
  
  ascending(col) {
		this.store.data.sort(function(a, b){return a[col] > b[col]});
	}
  
  descending(col) {
    this.store.data.sort(function(a, b){return b[col] > a[col]});
	}
}

class Util{
 static checkId(store, idInput){
	if(idInput === ""){
  	$("#idInput").attr("required", true);
    return false;
  }else{
  	if(!$.isNumeric(idInput)){
      	alert("Id should be a number");
        return false;
    	}
  	}
    return true;
	}

  static checkTitle(titleInput){
    if(titleInput === ""){
      $("#titleInput").attr("required", true);
      return false;
    }else{
      return true;
    }
  }

  static checkYear(pubYearInput){
    var year = new Date().getFullYear();
    if(pubYearInput === ""){
      $("#pubYearInput").attr("required", true);
      return false;
    }else{
      if($.isNumeric(pubYearInput) && 1900 < pubYearInput <= year){
      	return true;
      }else{
        alert("Wrong published year");
        return false;
      }
    }
	
}

  static checkRating(ratingInput){
    if(ratingInput === ""){
      return true;
    }else{
      if($.isNumeric(ratingInput)&& 0<=ratingInput){
      //var newIdInput = parseInt(idInput);
      	return true;   
      }else{
        alert("Invalid rating");
        return false;
      }
    }
  }
  
  static checkRemoveId(store, remInput){
	  //var remInput = $("#removeIdInput").val();
		if(remInput === ""){
  		alert("Please enter an id");
  	}else{
  		if($.isNumeric(remInput)){
				var a = parseInt(remInput);
  			var x = 0;
				for(var i=0; i < store.data.length; i++){
      		if(a === store.data[i].id){
        		store.data.splice(i,1);
            return store.data;
            //displayArr(arr);
        	}else{
        		x++;
       			if(x == store.data.length){
          		alert("This id is not existed");
          	}
        	}  
     		}
    	}else{
      	alert("Id should be a number");
    	}
  	}
	}
  
}
var store = new Store();
var main = new Main("#tab", store);
var state;

main.render();

$("#reset").on("click", function(){
	main.reset();
  main.render();
})

$("#remove").on("click", function () {
	main.removeLast();
  main.render();
})

$("#add").on("click", function () {
	state = "add";
  $("#idInput").attr("required", false);
  $("#titleInput").attr("required", false);
  $("#pubYearInput").attr("required", false);
  $('#idInput').attr('readonly', false);
  $("#idInput").val("");
  $("#titleInput").val("");
  $("#pubYearInput").val("");
  $("#ratingInput").val("");
})

$("tbody").on("click", function(e){
	state = "update";
	var firstCell = $(e.target).closest('tr').children('td').first();	
	var id = firstCell.text();
  console.log(id);
	var obj = main.getObj(id);
  $('#idInput').attr('readonly', true);
	$("#idInput").val(obj.id);
	$("#titleInput").val(obj.title);
	$("#pubYearInput").val(obj.pubYear);
	$("#ratingInput").val(obj.rating);
});

$("removeById").on("click", function(){
	 $("#removeIdInput").val("");
});

$("#submit").on("click", function(){
	var idInput = $("#idInput").val();
  var titleInput = $("#titleInput").val();
  var pubYearInput = $("#pubYearInput").val();
  var ratingInput = $("#ratingInput").val();
  var ok = true;
  if (!Util.checkId(store, idInput)) ok = false;
  if (!Util.checkTitle(titleInput)) ok = false;
  if (!Util.checkYear(pubYearInput)) ok = false;
  if (!Util.checkRating(ratingInput)) ok = false;
  if(state == "add"){
    if (ok) {
      var addSucess = main.addMovie(idInput, titleInput, pubYearInput, ratingInput);
      if (addSucess) {
        $("#formDialog").modal('hide');
        alert(JSON.stringify(store.data));
        main.render();
      } else {
        console.log("cannot add id: " + idInput);
      }
    } else {
      console.log("Check failed");
    }
  }
  if(state == "update"){
  	var updateSucess = main.updateMovie(idInput, titleInput, pubYearInput, ratingInput, store);
  	if (updateSucess) {
        $("#formDialog").modal('hide');
        main.render();
      } else {
        console.log("cannot update id: " + idInput);
      }
  } else {
		console.log("Check failed");
  }
})

$("#submitRemove").on("click", function(){
	var remInput = $("#removeIdInput").val();
  var a = Util.checkRemoveId(store, remInput);
  if(a == undefined){
  
  }else{
  	$("#removeInput").modal('hide');
    $("#removeIdInput").val("");
  	main.render();
  }
})

$("#sortbtn").on("click", function(){
  var colInput = $('#colOption option:selected').attr('value');
  if($("#asc").is(':selected')){
    main.ascending(colInput);
  }else if($("#des").is(':selected')){
    main.descending(colInput);
  }else{
    main.ascending(colInput);
  }
  main.render();
})