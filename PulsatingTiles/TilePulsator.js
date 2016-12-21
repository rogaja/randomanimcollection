
function TilePulsator(tilesize,numtiles){

	this.tilesize = tilesize;
	this.delta = 0;
	this.deltachange = 0.03;
	this.numtiles = numtiles;
    this.halfnumtiles = ((this.numtiles-1)/2)
    this.totalsize = (this.numtiles)*this.tilesize;
    this.shift = 0;
    this.xtoyratio = 0.5;
	this.draw = function(){

		for(var y = 0;y < this.numtiles;y++){
			//Basically the size of the tile is determined by the the position of the the tile and the delta value(this.delta)
			//We first shift the y value by half and take the absolute value of that result
			//This gives us a value that ranges from 0(center) to (numberoftiles/2) so the result grows as we move away from the center in either directiobn
			 var ydist = abs(y-this.halfnumtiles);
			 //here we map the above result to the range of 0 to PI.
			 var yangle = map(ydist,0,this.halfnumtiles,0,PI);

			for(var x = 0;x <  this.numtiles;x++){
				
				 var xdist = abs(x-this.halfnumtiles);
				 var xangle = map(xdist,0,this.halfnumtiles,0,PI);
				 //ratio determines how much each in movement of y x influences the size of the tile
				 // if the ration is 1 then the tiles only change as x changes so it will look like two waves moving horizontally outwards
				 var totalx = (xangle*this.xtoyratio+yangle*(1-this.xtoyratio));
				 //We use a sine wave because we want a wave of growth travel outwards and because i like sinewaves
				 var size = this.tilesize*(sin(((totalx-this.delta)+this.shift))+1)/2;
				// The rects are drawn this.tilesize apart from each other in both x and y direction
				// However if the actual size(variable size) is not the same as this.tilesize then there will be a gap between the current tile and the next one to the right;
				// So first we calculate that gap and then divided by half. This means when we shift rect by half the gap to the right, the gap will be equidistant
				// around the rect instead of just to the right
				 var gap = (this.tilesize-size)/2;
				
				 
				 //I choose the formulas at random. you can change them to what ever you like
				 r = map(sin(xangle-this.delta),-1,1,0,255);
				 g = map(sin(yangle-this.delta),-1,1,0,50);
				 b = map(size,0,this.tilesize,0,200);
				 
				 

				push();
				fill(r,g,b);
				rect(x*this.tilesize+gap,y*this.tilesize+gap,size,size);
				
				pop();
				
			}
		}
		

	};
		this.update = function(){
			this.delta += this.deltachange;
			if(this.delta >= TWO_PI)
				this.delta = 0;
		

	};
	this.drawSineWave = function(){
		var graph2x = this.totalsize;
		var graph1x = this.totalsize*2;
		beginShape();
		for(var y = 0;y < this.numtiles;y++){

			 var ydist = abs(y-this.halfnumtiles);

			 var yangle = map(ydist,0,this.halfnumtiles,0,PI);

			for(var x = 0;x <  this.numtiles;x++){
				
				 var xdist = abs(x-this.halfnumtiles);
				 var xangle = map(xdist,0,this.halfnumtiles,0,PI);
				 //We use a sine wave because we want a wave of growth travel outwards and because i like sinewaves
				 var vx = (xangle*0.5+yangle*0.5)
				 var ax = map(vx,0,PI,0,1000);
				 var vy = (sin((vx)+PI-this.delta)+1)/2;
				 
				 

				
				curveVertex(graph2x+(graph2x-ax),vy*this.totalsize/2+this.totalsize/2);

				
				
				
			}
		}
		endShape();
		push();
		line(graph2x,this.totalsize,graph1x,this.totalsize);
		textSize(32);
		for(var i = 0;i <= this.halfnumtiles;i++){
			var vx = map(i,0,this.halfnumtiles,0,500);
			text(i,graph2x+(graph2x-vx),this.totalsize+50);
		}
		pop();
		textSize(32);
		text("Distance from the center",this.totalsize,this.totalsize+100);
		
		beginShape();
		for(var y = 0;y < this.numtiles;y++){

			 var ydist = abs(y-this.halfnumtiles);

			 var yangle = map(ydist,0,this.halfnumtiles,0,PI);

			for(var x = 0;x <  this.numtiles;x++){
				
				 var xdist = abs(x-this.halfnumtiles);
				 var xangle = map(xdist,0,this.halfnumtiles,0,PI);
				 //We use a sine wave because we want a wave of growth travel outwards and because i like sinewaves
				 var vx = (xangle*0.5+yangle*0.5)
				 var ax = map(vx,0,PI,0,1000);
				 var vy = (sin((vx)+PI-this.delta)+1)/2;
				 
				 

				
				curveVertex(ax+graph1x,vy*this.totalsize/2+this.totalsize/2);

				
				
				
			}
		}
		endShape();
		push();
		line(graph1x,0,graph1x,this.totalsize);
		line(graph1x,this.totalsize,graph1x*2,this.totalsize);
		textSize(32);
		for(var i = 0;i <= this.halfnumtiles;i++){
			var vx = map(i,0,this.halfnumtiles,0,500);
			text(i,graph1x+vx,this.totalsize+50);
		}
		pop();
		textSize(32);
		text("Distance from the center this graph. ",this.totalsize,this.totalsize+100);
	}
	


}