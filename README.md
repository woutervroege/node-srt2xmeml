## srt2xmeml
parse directory of srt files to xmeml (Apple Final Cut Pro) files


### Installation

    $ npm install -g srt2xmeml


### Default usage
	/* parse all files in directory */
	srt2xmeml --dir /Users/johndoe/Documents/subtitles/
	

### Options

###### Custom timebase (fps) - default = 25

    --timebase 30

###### Custom frame width - default = 1920
      
    --width 1920
    
###### Custom frame height - default = 1080
      
    --height 1080

###### NTSC - default = FALSE

    --ntsc TRUE

###### Codec - default = "Apple ProRes 422"

    --codec "Apple ProRes 4444"

###### Font - default = "Helvetica CY"

	--font "Georgia" 

###### Font size - default = 23

	--fontSize 18 

###### Anamorphic - default = FALSE

	--anamorphic TRUE 

###### Pixel aspect ratio - default = Square

	--pixelaspectratio "4:3"


### License

(The MIT License)

Copyright (c) 2014 Wouter Vroege

 Permission is hereby granted, free of charge, to any person
 obtaining a copy of this software and associated documentation
 files (the "Software"), to deal in the Software without
 restriction, including without limitation the rights to use,
 copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following
 conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 OTHER DEALINGS IN THE SOFTWARE.