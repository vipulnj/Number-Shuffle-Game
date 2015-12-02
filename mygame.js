var diffLevel_global;
$(document).ready(function() {
	
	$('#playBtn').click(function(event) {
		var diffLevel = $('#diffSelector').val();
		var moves = $('#movesSelector').val();
		
		diffLevel_global = diffLevel;
		buildPuzzleArea(diffLevel);
		
		$(this).prop({			//this stands for playBtn
			disabled: 'true'
		});

		$('#diffSelector').prop('disabled', 'true');
		$('#movesSelector').prop('disabled', 'true');

		$('#checkIfYouWon').removeAttr('disabled');

		addRandomValues(diffLevel);
		findInitialEmptyCell(diffLevel);
		clickBoxAction(diffLevel,moves);
	});

	function buildPuzzleArea (diffLevel) {

		for (var i = 1; i <= diffLevel; i++) {
			var row = '<tr id = "row' + i + '"></tr>';
			$('#puzzle').append(row);
		};
		
		var helptip = "<h5>Refresh the page to start the game again</h5>";
		$(helptip).insertAfter('#chooseDifficulty');
		
		addCells(diffLevel);
	}

	function addCells(diffLevel){

		for (var i = 1; i <= diffLevel; i++) {
			for (var j = 1; j <= diffLevel; j++) {
				var cell = '<td id= "cell_' + i + "_" + j + '"></td>';
				$('#row'+i).append(cell);
			};
		};
	}

	function addRandomValues(diffLevel){

		var addNumbersArray = new Array();
		for (var i = 0; i < diffLevel*diffLevel; i++) {
			addNumbersArray[i] = genRandomInt(99,1);
		};

		var k = 1;	//we skip the first random number by adding k++ so that we get an empty box in the end
		for (var i = 1; i <= diffLevel; i++) {
			for (var j = 1; j <= diffLevel; j++) {
				$('#cell_'+i+'_'+j).html(addNumbersArray[k++]);	
			};
		};
	}

	function genRandomInt(high,low){
		high++;
		return Math.floor((Math.random())*(high-low))+low;
	}

	function findInitialEmptyCell(diffLevel){
		for (var i = 1; i <= diffLevel; i++) {
			for (var j = 1; j <= diffLevel; j++) {
				if($('#cell_'+i+'_'+j).html() === ''){
					emptycell_i = i;
					emptycell_j = j;
				}
			};
		};
	}

	function clickBoxAction(diffLevel,moves){
		$('td').click(function(event) {
			clickedBox = $(this).attr('id');
			var cellAdd = new Array();
			cellAdd = clickedBox.split('_');
			clicked_i = cellAdd[1];
			clicked_j = cellAdd[2];

			checkAdjBoxIfEmptyNswap(clicked_i,clicked_j,diffLevel,moves);
			checkIfWon_func();
		});
	}

	function checkAdjBoxIfEmptyNswap(clicked_i,clicked_j,diffLevel,moves){

		switch(moves)
		{
			case '1':
				//upper row checking
				if(parseInt(clicked_i) - 1 == emptycell_i && parseInt(clicked_j) - 1 == emptycell_j)
				{
					/*alert("entered NW box");*/
					var valueInBox = $('#cell_'+(parseInt(clicked_i))+'_'+clicked_j).html();
					$('#cell_'+emptycell_i+'_'+emptycell_j).html(valueInBox);
					$('#cell_'+(clicked_i)+'_'+clicked_j).html('');
					emptycell_i = parseInt(clicked_i);
					emptycell_j = parseInt(clicked_j);
				}
				
				if(parseInt(clicked_i) - 1 == emptycell_i && clicked_j == emptycell_j)
				{
					/*alert("entered N box");*/
					var valueInBox = $('#cell_'+(parseInt(clicked_i))+'_'+clicked_j).html();
					$('#cell_'+emptycell_i+'_'+emptycell_j).html(valueInBox);
					$('#cell_'+(clicked_i)+'_'+clicked_j).html('');
					emptycell_i = parseInt(clicked_i);
					emptycell_j = parseInt(clicked_j);
				}

				if(parseInt(clicked_i) - 1 == emptycell_i && parseInt(clicked_j) + 1 == emptycell_j)
				{
					/*alert("entered NE box");*/
					var valueInBox = $('#cell_'+(parseInt(clicked_i))+'_'+clicked_j).html();
					$('#cell_'+emptycell_i+'_'+emptycell_j).html(valueInBox);
					$('#cell_'+(clicked_i)+'_'+clicked_j).html('');
					emptycell_i = parseInt(clicked_i);
					emptycell_j = parseInt(clicked_j);
				}

				//same row
				if(clicked_i == emptycell_i && parseInt(clicked_j) - 1 == emptycell_j)
				{
					/*alert("entered E box");*/
					var valueInBox = $('#cell_'+(parseInt(clicked_i))+'_'+clicked_j).html();
					$('#cell_'+emptycell_i+'_'+emptycell_j).html(valueInBox);
					$('#cell_'+(clicked_i)+'_'+clicked_j).html('');
					emptycell_i = parseInt(clicked_i);
					emptycell_j = parseInt(clicked_j);
				}
				if(clicked_i == emptycell_i && parseInt(clicked_j) + 1 == emptycell_j)
				{
					/*alert("entered W box");*/
					var valueInBox = $('#cell_'+(parseInt(clicked_i))+'_'+clicked_j).html();
					$('#cell_'+emptycell_i+'_'+emptycell_j).html(valueInBox);
					$('#cell_'+(clicked_i)+'_'+clicked_j).html('');
					emptycell_i = parseInt(clicked_i);
					emptycell_j = parseInt(clicked_j);
				}

				//lower row
				if(parseInt(clicked_i) + 1 == emptycell_i && parseInt(clicked_j) - 1 == emptycell_j)
				{
					/*alert("entered SW box");*/
					var valueInBox = $('#cell_'+(parseInt(clicked_i))+'_'+clicked_j).html();
					$('#cell_'+emptycell_i+'_'+emptycell_j).html(valueInBox);
					$('#cell_'+(clicked_i)+'_'+clicked_j).html('');
					emptycell_i = parseInt(clicked_i);
					emptycell_j = parseInt(clicked_j);
				}

				if(parseInt(clicked_i) + 1 == emptycell_i && clicked_j == emptycell_j)
				{
					/*alert("entered S box");*/
					var valueInBox = $('#cell_'+(parseInt(clicked_i))+'_'+clicked_j).html();
					$('#cell_'+emptycell_i+'_'+emptycell_j).html(valueInBox);
					$('#cell_'+(clicked_i)+'_'+clicked_j).html('');
					emptycell_i = parseInt(clicked_i);
					emptycell_j = parseInt(clicked_j);
				}

				if(parseInt(clicked_i) + 1 == emptycell_i && parseInt(clicked_j) + 1 == emptycell_j)
				{
					/*alert("entered SW box");*/
					var valueInBox = $('#cell_'+(parseInt(clicked_i))+'_'+clicked_j).html();
					$('#cell_'+emptycell_i+'_'+emptycell_j).html(valueInBox);
					$('#cell_'+(clicked_i)+'_'+clicked_j).html('');
					emptycell_i = parseInt(clicked_i);
					emptycell_j = parseInt(clicked_j);
				}
			
			break;

			case '2':
				//box above
				if(parseInt(clicked_i) - 1 == emptycell_i && clicked_j == emptycell_j)
				{
					/*alert("entered N box");*/
					var valueInBox = $('#cell_'+(parseInt(clicked_i))+'_'+clicked_j).html();
					$('#cell_'+emptycell_i+'_'+emptycell_j).html(valueInBox);
					$('#cell_'+(clicked_i)+'_'+clicked_j).html('');
					emptycell_i = parseInt(clicked_i);
					emptycell_j = parseInt(clicked_j);
				}
				
				//box to the left
				if(clicked_i == emptycell_i && parseInt(clicked_j) - 1 == emptycell_j)
				{
					/*alert("entered E box");*/
					var valueInBox = $('#cell_'+(parseInt(clicked_i))+'_'+clicked_j).html();
					$('#cell_'+emptycell_i+'_'+emptycell_j).html(valueInBox);
					$('#cell_'+(clicked_i)+'_'+clicked_j).html('');
					emptycell_i = parseInt(clicked_i);
					emptycell_j = parseInt(clicked_j);
				}

				//box to the right
				if(clicked_i == emptycell_i && parseInt(clicked_j) + 1 == emptycell_j)
				{
					/*alert("entered W box");*/
					var valueInBox = $('#cell_'+(parseInt(clicked_i))+'_'+clicked_j).html();
					$('#cell_'+emptycell_i+'_'+emptycell_j).html(valueInBox);
					$('#cell_'+(clicked_i)+'_'+clicked_j).html('');
					emptycell_i = parseInt(clicked_i);
					emptycell_j = parseInt(clicked_j);
				}

				//box below
				if(parseInt(clicked_i) + 1 == emptycell_i && clicked_j == emptycell_j)
				{
					/*alert("entered S box");*/
					var valueInBox = $('#cell_'+(parseInt(clicked_i))+'_'+clicked_j).html();
					$('#cell_'+emptycell_i+'_'+emptycell_j).html(valueInBox);
					$('#cell_'+(clicked_i)+'_'+clicked_j).html('');
					emptycell_i = parseInt(clicked_i);
					emptycell_j = parseInt(clicked_j);
				}
			
			break;

			default: break;
		}
	}

	/*$('#checkIfYouWon').click(*/
	function checkIfWon_func() {
		/*alert("entring checkIfWon");*/
		var valuesArray = new Array();
		for (var i = 1; i <= diffLevel_global; i++) {
			/*alert(diffLevel_global);*/
			for (var j = 1; j <= diffLevel_global; j++)
			{
				if(!($('#cell_'+i+'_'+j).html() == '')){
					valuesArray.push(($('#cell_'+i+'_'+j).html()));
					var lastValuePushed = $('#cell_'+i+'_'+j).html();
				}
				else
				{
					valuesArray.push(lastValuePushed);
				}
			};
		};
		/*alert(valuesArray.toString());*/

		var isWinner = false;
		var i = 0;

		/*alert(valuesArray.toString());*/
		for (var i = 0; i < valuesArray.length; i++) {
			if(i == valuesArray.length-1)
				break;	//next value i.e valuesArray[i+1] will be undefined
			if(parseInt(valuesArray[i]) <= parseInt(valuesArray[i+1]))
			{
				isWinner = true;
				/*alert(valuesArray[i]+","+valuesArray[i+1]+","+isWinner);*/
			}
			else
			{
				isWinner = false;
				/*alert(valuesArray[i]+","+valuesArray[i+1]+","+isWinner);*/
				break;
			}
		};
		
		if(isWinner == true)
		{
			$('.keepTryingMsg').remove();
			var gameStatus = '<h2 id="congoMsg">CONGRATULATIONS!! You win!</h2>';
			$(gameStatus).insertAfter('#puzzle');
			blinkEffect('#congoMsg');
			$('#howToPlay').delay(1000).fadeOut('slow');

		}
		/*else if(isWinner == false)
		{
			var gameStatus = '<h3 id="keepTrying" class="keepTryingMsg">Not there yet. Keep trying..</h3>';
			$(gameStatus).insertAfter('#puzzle');
			$('#keepTrying').fadeIn(3000).delay(1000).fadeOut("slow");
		}*/
	}
	/*);*/
	
	function blinkEffect(selector){
		$(selector).fadeOut('slow', function() {
			$(this).fadeIn('slow', function() {
				blinkEffect(this);
			});
		});
	}

});