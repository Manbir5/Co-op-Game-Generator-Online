from PIL import Image

import time

file_path = "image_transformer_pipe.txt"

# Process user requests until they press Ctrl + C
while True:
	
	try:
		# Source: https://stackoverflow.com/a/54278929
		with open('image_transformer_pipe.txt', 'r+') as pipe_file:
			line = ""
			
			for line in pipe_file:
				pass
			last_line = line
			
			data = last_line.split("|")
			
			# If last line of the file begins with IN, then process the user request
			if data[0].strip() == "IN":
				# Output message string containing resized image filenames	
				out_str = '\nOUT'
			
				end_index = len(data)
				
				# Go through the list of images and resize each
				for i in range(1, end_index):
					image_data = data[i].split(",")
					
					new_width = 0
					new_height = 0
					img_name = ""
					new_img_name = ""
					
					try:
						if len(image_data) != 3:
							out_str += " | ERROR"
						
						new_width = int(image_data[0])
						new_height = int(image_data[1])
						img_name = image_data[2].replace('"', '').lstrip(' ').rstrip(' ')
						new_img_name = "resized_" + img_name
					
					except:
						out_str += " | ERROR PARSING USER REQUEST!"
						break

					try:			
						# Opens and resizes the image
						# and creates the new resized image
						with Image.open(img_name)	as img:
							new_img = img.resize((new_width, new_height))
							new_img.save(new_img_name)
						
							out_str += ' | "' + new_img_name + '"'
						
					except:
						out_str += " | ERROR RESIZING IMAGE: " + img_name
						break
					
				# Write the outputted resized images
				pipe_file.write(out_str)
				
	except FileNotFoundError:
		pass
	
	time.sleep(1)
	
	