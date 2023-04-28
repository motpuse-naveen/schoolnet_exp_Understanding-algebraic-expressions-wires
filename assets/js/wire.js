 // create wires initally in 4 different color....

var wireMCArray = [redWire_mc, greenWire_mc, blueWire_mc, purpleWire_mc ]
var exprVarNameArray= ["a", "b", "c", "d"]
var wireLengthArray= [5, 6,7, 8]
var exprConstant= 0
var clsUtils;
var countside;
var count=0;
var getNumberArray=new Array();
var getfinalArray=new Array();
//var chamber_mc=$("#chamber_mc");
//var chamberX = Number(chamber_mc.x + 50);
//var chamberY = Number(chamber_mc.y + 25);
//console.log("chamberX", chamberX, chamberY)


// shuffle array//
function shuffleArray(inputArray){
    inputArray.sort(()=> Math.random() - 0.5);
}
shuffleArray(wireLengthArray);
//////End///////////

for (var  i = 0; i <= 3; i++) {
	wireMCArray[i].width = wireLengthArray[i]*10
	wireMCArray[i].realWidth = wireLengthArray[i]
}

var exprOrderArray = [0,1,2,3]
var exprCoeffArray = [1,1,1,1]

var curQtnNo = 1
var totalQtns  = 1
var correctQtns = 0
score_txt = "" + correctQtns + "/" + totalQtns
$("#score_txt").text(score_txt);
var noOfTerms
var valueOfExpr = 0

/*for (var  i= 0; i <= 3; i++) {
	wireMCArray[i].isDraggable = false
	//wireMCArray[i].style.display= 'none';
}
unitWire_mc.isDraggable = false
//unitWire_mc.style.display= 'none';*/

var tempWireArray = new Array();
var chamberLocationArray = new Array();

resetExperiment()

function resetExperiment() {
	var mStr = ""
	
	curQtnNo = 1
	totalQtns = 1
	correctQtns = 0
	score_txt= "" + correctQtns + "/" + totalQtns;
	
	$("#score_txt").val(score_txt);
	$("#next_btn").hide();
	newQuestion()
}

function newQuestion() {
		var mStr;
		
		shuffleArray(exprOrderArray);		
		shuffleArray(wireLengthArray);	
		for (var i = 0; i <= 3; i++) {
		$("#length" + (i+1) + "_txt").text(wireLengthArray[i] + " cm");
		wireMCArray[i].style.width=wireLengthArray[i]*10 + "px"
	}
	qNo_txt = "Q." + curQtnNo;
	$("#qNo_txt").html(qNo_txt);
	$("#OK_btn").show();
	$("#correct_mc").hide();
	$("#wrong_mc").hide();

	noOfTerms = parseInt(Math.random() * 3) + 2
	mStr = ""
	valueOfExpr = 0
	fillExprCoeffArray()
	//console.log("count.length", count.length)
	while (chamberLocationArray.length > 0) {
		chamberLocationArray.pop()
		//console.log("ddddd");
	}
	



	for (var i = 0; i <noOfTerms; i++) {
		if (exprCoeffArray[i] > 1) {
			mStr = mStr + exprCoeffArray[i]
		}

		mStr = mStr + exprVarNameArray[exprOrderArray[i]]
		//console.log("exprCoeffArray[i]", exprCoeffArray[i]);

		valueOfExpr = valueOfExpr + exprCoeffArray[i] * wireLengthArray[exprOrderArray[i]]
		mStr = mStr + " + "
		//console.log("exprCoeffArray[i]", valueOfExpr, exprCoeffArray[i] , wireLengthArray[exprOrderArray[i]]);
	}
	if (exprConstant >= 1) {
		mStr = mStr + exprConstant 
	

		valueOfExpr = valueOfExpr + exprConstant
		mStr = mStr + " + "
		
	}
	
	mStr = mStr.substr(0, mStr.length - 3)
	$("#next_btn").hide();
	qtn_txt = mStr
	//console.log("qtn_txt", qtn_txt);
	$("#qtn_txt").html(qtn_txt);
	
	displayChamberExpr()
}

function fillExprCoeffArray() {
	var mNo;
	var mCount; 
	
	while (true) {
		mCount = 0

		for (var i = 0; i <noOfTerms; i++) {
			mNo = parseInt(Math.random() * 20) - 15
			
			mNo = Math.max(mNo, 1)
			exprCoeffArray[i] = mNo
			mCount = mCount + mNo
			
		}
		
		exprConstant = parseInt(Math.random()*4)
		//console.log("exprConstant", exprConstant)
		mCount = mCount + exprConstant
		if (mCount <= 10) {
			break;
		}
	}
}

	function clickpassValue() {
		//console.log("correctQtns:::::"+ correctQtns);
	$(this).hide();
	$("#btn_stop").show();
	if (evaluateAnswer()) {
		console.log("fffff");
		correctQtns++;
		score_txt = "" + correctQtns + "/" + totalQtns
		console.log("score_txt", score_txt, correctQtns)
		$("#score_txt").html(score_txt);
		$("#correct_mc").show();
	}
	else {
		
		$("#wrong_mc").show();
		//correctQtns;
		//score_txt = "" + correctQtns + "/" + totalQtns;
		//$("#score_txt").html(score_txt);
		//console.log("score_txt111", score_txt, correctQtns)
		

	
	}
	freezeAllBodies()
	$("#btn_procedure").attr('disabled','disabled');
	$("#btn_calculations").attr('disabled','disabled');
}
	

	function setSplitIndividualId() {
	curQtnNo++;
	totalQtns++;
	count=0;
	getNumberArray=[];
	score_txt= "" + correctQtns + "/" + totalQtns
	$("#score_txt").html(score_txt);
	$("#chamber_mc_active").empty();
	$(".sticks").draggable({ disabled: false });
	$("#blocker_chamber").css('display', 'none');
	$("#btn_stop").hide();
	//$("#btn_info").attr('disabled','disabled');
	$("#btn_procedure").removeAttr('disabled');
	$("#btn_calculations").attr('disabled','disabled');
	newQuestion()
	
	
	 
	}
	
	function resetquestions() {
	
	curQtnNo = 1
	totalQtns = 1
	correctQtns = 0
	count=0;
	getNumberArray=[];
	score_txt= "" + correctQtns + "/" + totalQtns;
	$("#score_txt").html(score_txt);
	$("#chamber_mc_active").empty();
	$("#btn_stop").hide();
	$("#btn_calculations").attr('disabled','disabled');
	newQuestion()
	
	}

	
	
	
	$(document).ready(function() {
	//var drag;
	$('.sticks').draggable({
		helper: 'clone',
		scroll: false,
        zIndex: '5000',
		containment: "#wrapper_continer",
		//appendTo: '#chamber_mc_active'
	});
	
	
	$('#chamber_mc_active').droppable({
	  
	  drop: function(event, ui) {
		var droppable = $(this);
		var draggable = ui.draggable;
		
		// Move draggable into droppable
		//var drag = $('#chamber_mc_active').has(ui.draggable).length ? draggable : draggable.clone().removeClass("sticks").draggable({
			
			//revert: "invalid",
			//stack: ".sticks",
			// helper: 'clone'
			//appendTo: '#chamber_mc_dummy',
			
				
		 //});
		 
		 if ($(ui.draggable).hasClass('new')) {
            $('.new').draggable({
                revert: true
            });
		 
        } else {
			drag = $('#chamber_mc_active').has(ui.draggable).length ? draggable : draggable.clone().removeClass("sticks").draggable({
				 helper: "original",
				
				 
				 out: function (event, ui) {
				$(ui.draggable).fadeOut(500, function () {
			count--;
			var elem = ui.draggable[0].getAttribute('data-id');
			getNumberArray.splice(getNumberArray.indexOf(elem), 1);
			chamberLocationArray.splice(count,1);
			if(count==0)
			{
				//console.log("activity");
				$("#btn_procedure").attr('disabled','disabled');
				$("#btn_calculations").attr('disabled','disabled');
				getNumberArray=[];
				chamberLocationArray=[];
				
			}
			
            $(this).remove();
			displayChamberExpr();
			
			
			
        });
		}
		
				}).addClass('new');
			
			draggable.css({
			float: 'left',
			
			});	
			
			
				
				
				$("#btn_procedure").removeAttr('disabled');
				$("#btn_calculations").removeAttr('disabled');
				console.log("counter", count)
				if(count<=9)
				{
				count++;
				drag.appendTo(droppable);
				getNumberArray.push(drag.attr("data-id"));
				console.log("counteractibtare");
				addToChamber();
			
			}
        }
		
		},
		
		out: function (event, ui) {
			if($(ui.draggable).hasClass("new"))
			{
			$(ui.draggable).fadeOut(500, function () {
			count--;
			var elem = ui.draggable[0].getAttribute('data-id');
			getNumberArray.splice(getNumberArray.indexOf(elem), 1);
			chamberLocationArray.splice(count,1);
			if(count==0)
			{
				//console.log("activity");
				$("#btn_procedure").attr('disabled','disabled');
				$("#btn_calculations").attr('disabled','disabled');
				getNumberArray=[];
				chamberLocationArray=[];
				
			}
			
            $(this).remove();
			displayChamberExpr();
			
			
			
        });
		}
		}
		
		
		
		});
		
		
  });
  
  
  function removeToChamber() {
	if (chamberLocationArray.length ==1) {
		return false;
	}
	chamberLocationArray.push(count+1)
	displayChamberExpr();
	return true;
	
}

  function addToChamber() {
	 // console.log(wireMCArray)
	 console.log("countcountcountcount", chamberLocationArray);
	if (chamberLocationArray.length >= 10) {
		
		return false;
	}
	
	chamberLocationArray.push(count-1)
	
	displayChamberExpr();
	return true;
}

  function displayChamberExpr() {
	var mStr = ""
	var mTotalLength = 0
	var mCurWireCount = 0
	var mNo
	
	for (var i = 0; i <= 3; i++) {
		mCurWireCount = 0
		//console.log("hamberLocationArray.length", chamberLocationArray.length)
		for (var j=0; j < chamberLocationArray.length; j++) {
			if (getNumberArray[j] == exprOrderArray[i]) {
				mCurWireCount++;
				mTotalLength = mTotalLength + wireLengthArray[exprOrderArray[i]]
				console.log("getNumberArray[j]", getNumberArray[j], mCurWireCount)
			}
		}

		if (mCurWireCount == 1) {
			mStr = mStr + exprVarNameArray[exprOrderArray[i]] + " + "
		}
		if (mCurWireCount > 1) {
			mStr = mStr + mCurWireCount + exprVarNameArray[exprOrderArray[i]] + " + "
		}
		
	}


	mCurWireCount = 0 // UnitWires
	for (var j= 0; j < chamberLocationArray.length; j++) {
		if ((getNumberArray[j]) == 4) {
			mCurWireCount++
			mTotalLength = mTotalLength + 1
			//console.log("mTotalLength",mTotalLength, mCurWireCount)
		}
	}

	if (mCurWireCount >= 1) {

		mStr = mStr + mCurWireCount + " + "
		//console.log("mTotalLengthmStrmStrmStr",mStr)
	}
		

	if (mTotalLength == 0) {
		mStr = ""
	}
	else {
		mStr = mStr.substr(0, mStr.length - 3)
		mStr = mStr + " = " + mTotalLength
		//console.log("mTotalLengthmStrmStrmStrwww",mStr, mTotalLength)
	}
	//chamber_mc.chamberExpr_txt.text = mStr
	chamberExpr_txt = mStr
	$("#chamberExpr_txt").html(chamberExpr_txt);
}


function evaluateAnswer() {
	var mStr= ""
	var mTotalLength = 0
	var mCurWireCount = 0
	var mNo 
	
	for (var i = 0; i <= 3; i++) {
		mCurWireCount = 0
		for (var j = 0; j <= 9; j++) {
			if (chamberLocationArray[j] != null) {
				if ( Number(getNumberArray[j]) == exprOrderArray[i]) {
					mCurWireCount++
					mTotalLength = mTotalLength + wireLengthArray[exprOrderArray[i]]
				}
			}
		}
		
		if ((i < noOfTerms) && (mCurWireCount != exprCoeffArray[i] ) ) {
			return false
		}
		
		if ((i >= noOfTerms) && (mCurWireCount != 0 ) ){
			return false
		}

	}


	mCurWireCount = 0  //StandAloneToffees
	for (var j = 0; j <= 9; j++) {
		if (chamberLocationArray[j] != null) {
			if (getNumberArray[j] == 4) {
				mCurWireCount++
				mTotalLength = mTotalLength + 1
			}
		}
	}
	
	if (mCurWireCount != exprConstant) {
		return false
	}
	

	
	return true

}

function freezeAllBodies() {
	$(".sticks").draggable({ disabled: true });
	$("#blocker_chamber").css('display', 'block');
	//$("#chamber_mc").draggable({ disabled: true });  
	//$("#chamber_mc_dummy").draggable({ disabled: true }); 
}

$(".more").click(function () {
   //$('.currentContent .currentContentDesc').html($('.popuptext p').html())  
   var content = $(".currentContent .currentContentDesc").html();
	$(".popuptext span").html(content);
   //console.log(content);
   $(".popuptext").css("display","block");
   $(".blocker1").css("display","block");
   $(".closebtn").css("display","block")
   
   
});

$(".closebtn").click(function () {
   //$('.currentContent .currentContentDesc').html($('.popuptext p').html())  
   $(".popuptext").css("display","none");
   $(".blocker1").css("display","none");
   $(".closebtn").css("display"," none")
   
});












  
	
	
			
	
	



















