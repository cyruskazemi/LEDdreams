/**
* 
* Color code generator taken from http://www.paulirish.com/2009/random-hex-color-code-snippets/#comment-931662323
* 
*/

(function(){
	// Intialize variables
	var 	
	audio = document.getElementById('audio'),	
	waveform = document.getElementById('waveform'),
	ctx = waveform.getContext('2d'),
	interval = 1,
	waveformShapes = [1, 2, 4, 8, 16, 32, 64],
	dancer, kick;

	// Utility functions
	function getLargestValueInArray(array) {
		var highest = array[0];
		for(var i = 1; i < array.length; i++) {
			if(array[i] > highest) {
				highest = array[i];
			}
		}
		return highest;
	}

	function getRandomElementInArray(array) {
		return array[Math.floor(Math.random() * array.length)];
	}

	function changeWaveformShape() {
		interval = getRandomElementInArray(waveformShapes);	
	}

	// Extend Dancer
	Dancer.prototype.coloredWaveform = function ( canvasEl, options ) {
		options = options || {};
		var
		  ctx     = canvasEl.getContext( '2d' ),
		  h       = canvasEl.height,
		  w       = canvasEl.width,
		  width   = options.width || 2,
		  spacing = options.spacing || 0,
		  count   = options.count || 256;

		this.bind( 'update', function() {		
			if(Date.now() % 2 == 0){ 
			  var waveform = this.getWaveform();
			  ctx.clearRect( 0, 0, w, h );
			  var x = 0, y = 0;
			  ctx.fillStyle="#ffffff";
			  for ( var i = 0, l = waveform.length; i < l && i < count; i++, x += spacing + width) {
			  	y = Math.floor(( h / 2 ) - waveform[ i ] * ( h / 2 ));
			  	if(i % interval == 0) {
			  		var rectangleWidth = spacing + width;
			  		var rectangleHeight = Math.floor(h - 2 * y);
			  		(Math.random().toString(16) + '000000').slice(2, 8)
			  		ctx.fillStyle = '#' + (Math.floor( waveform[i] * 16777215).toString(16) + '00000').slice(2,8);
			  		ctx.fillRect(x, y, rectangleWidth, rectangleHeight);
			  	}	    		  	
			  }
			}
		});
		return this;
	};

	// Set up Dancer
	Dancer.setOptions({
	  flashSWF : 'js/lib/soundmanager2.swf',
	  flashJS  : 'js/lib/soundmanager2.js'
	});

	dancer = new Dancer();

	kick = dancer.createKick({	
		onKick: function(mag) {
			changeWaveformShape();
		}
	}).on();

	dancer
		.load(audio)
		.coloredWaveform( waveform, { width: 4, count: 256});

	Dancer.isSupported() || loaded();
  !dancer.isLoaded() ? dancer.bind( 'loaded', loaded ) : loaded();
	
	// Loading
	function loaded () {
    var
      controls = document.getElementById('controls'),
      supported = Dancer.isSupported(),
      p;

    if (!supported) {
      p = document.createElement('p');
      p.appendChild( document.createTextNode('Your browser does not currently support either Web Audio API or Audio Data API. Simulation may be borked. Upgrade your browser for maximum satisfaction. Beep bop boop bop.'));
      controls.appendChild(p);
    }

		document.getElementById('play').addEventListener('click', function() { 
			dancer.play(); 
		});

		document.getElementById('pause').addEventListener('click', function() { 
			dancer.pause(); 
		});
	}
})();


