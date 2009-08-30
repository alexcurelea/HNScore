// ==UserScript==
// @name           HNScore
// @namespace      me.alexc
// @description    See ratio between story comments and votes on HN.
// @include        http://news.ycombinator.*/
// ==/UserScript==


var rows = document.getElementsByTagName("td");

for (var i=0; i<rows.length; i++)
{
	var row = rows[i];
	if (row.className == "subtext") {		
		scoreNode = row.childNodes[0];
		commentsNode = row.childNodes[4];
		
		score = scoreNode.innerHTML.match(/\d+/)[0];
		commentsR = commentsNode.innerHTML.match(/\d+/);
		if (commentsR)
			comments = commentsR[0]; 
		else
			comments = 1;
		
		ratio = score / comments;

		if (score > 4) {	// arbitrary
			// Prepare ratio element
			ratioNode = document.createElement('span');
			ratioNode.innerHTML = ratio.toFixed(1) + " ratio. ";
			
			if (ratio < 1) {
				style = "font-size:6pt; color:red;";
			} else if (ratio < 5) {
				style = "font-size:7pt";
			} else if (ratio < 10) {
				style = "font-size:8pt; color:black;";
			} else {
				style = "font-size:8pt; color:black; font-weight:bold;";
			}
			
			row.setAttribute("style", style);
	
			// Insert before story score
			row.insertBefore(ratioNode, scoreNode);
		}
	}
}



