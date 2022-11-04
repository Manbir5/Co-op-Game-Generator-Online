# Co-op-Game-Generator-Online

A trial version can be seen on manbirsingh.ca

This is the code for a website that generates a random co-op game after the user has selected their criteria.

This is a web application that allows a user to select criteria on the home page. They can select the console type, the co-op type, and the genre they are looking for. After pressing submit, the web application will provide a game title that matches this criteria and a picture of the game.

This application uses databases to hold the information about the game and uses two seperate microservices for the images.

It currently only allows one selection per criteria. The databases currently hold 10 games. 


How to use:

1. Use npm install to install the required modules. 
2. The microservices have already been set up within this project. Use python to run public/image_downloader.py and image.transformer.py in parallel proocess. 
This ensures that both microservices are working.
3. Run node main.js 6013
4. Talk to the host and provide your ip address. It is needed to provide access to the go daddy databases when this is tested locally. This would be changed if the program
is hosted online.
5. This program currently only works with one selection per criteria. If at least one option for each criteria is not selected, then the program will not let you proceed forward. 
6. Press submit to get the results and wait 3 seconds for the image to be downloaded and transformed. 
