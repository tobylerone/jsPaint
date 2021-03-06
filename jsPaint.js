/* Parker Case
 * JS Paint
 */

if(window.addEventListener) {
	window.addEventListener('load', function () {
		var canvas, context, tool;

		function init () {
			//Get that canvas!
			canvas=document.getElementById('imageView');
			if(!canvas) {
				alert('No canvas element found!');
				return;
			}
			if(!canvas.getContext) {
				alert('No canvas getContext found!');
				return;
			}
			context = canvas.getContext('2d');
			if(!context) {
				alert('No 2d canvas context found!');
				return;
			}

			//Get that brush!
			tool = new tool_brush();
            
            var cSS = new changeStrokeStyle('colorChooser', Array('red','orange','yellow','green','blue','indigo','violet'));
            cSS.appendColorSelectors(20,20);

			//add listeners
			canvas.addEventListener('mousedown', ev_canvas, false);
			canvas.addEventListener('mousemove', ev_canvas, false);
			canvas.addEventListener('mouseup', ev_canvas, false);
            //stopping the line when a user leaves the canvas
            canvas.addEventListener('mouseleave', leaveCanvas, false);
		}

		// This painting tool works like a drawing pencil which tracks the mouse 
		// movements.
		function tool_brush () {
			var tool = this;
			this.started = false;

			// This is called when you start holding down the mouse button.
			// This starts the pencil drawing.
			this.mousedown = function (ev) {
				context.beginPath();
				context.moveTo(ev._x, ev._y);
				tool.started = true;
			};

			// This function is called every time you move the mouse. Obviously, it only 
			// draws if the tool.started state is set to true (when you are holding down 
			// the mouse button).
			this.mousemove = function (ev) {
				if (tool.started) {
					context.lineTo(ev._x, ev._y);
					context.lineWidth=15;
					context.lineCap='round';
					context.lineJoin='round';
					context.stroke();
				}
			};

			// This is called when you release the mouse button.
			this.mouseup = function (ev) {
				if (tool.started) {
					tool.mousemove(ev);
					tool.started = false;
				}
			}
		}

		// The general-purpose event handler. This function just determines the mouse 
		// position relative to the canvas element.
		function ev_canvas (ev) {
			if (ev.layerX || ev.layerX == 0) { // Firefox
				ev._x = ev.layerX;
				ev._y = ev.layerY;
			} else if (ev.offsetX || ev.offsetX == 0) { // Opera
				ev._x = ev.offsetX;
				ev._y = ev.offsetY;
			}

			// Call the event handler of the tool.
			var func = tool[ev.type];
			if (func) {
				func(ev);
			}
		}
        
        function leaveCanvas(){
            context.beginPath();
        }
        
        function changeStrokeStyle(parentId, standardColors){
           var parent = document.getElementById(parentId);
           
           this.appendColorSelectors = function(width, height){
               for(var i = 0, length = standardColors.length; i<length; i++){
                   var color = document.createElement('div');
                   color.style.background = standardColors[i];
                   color.style.width = width+'px';
                   color.id = standardColors[i];
                   color.style.height = height+'px';
                   color.style.display = 'inline-block';
                   parent.appendChild(color);
                   
                   color.addEventListener('mousedown',function(e){
                       context.strokeStyle = e.target.id;
                   });
               }
           }
        }

		init();

	}, false); 
}