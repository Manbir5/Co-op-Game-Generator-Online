import os
import requests
from bs4 import BeautifulSoup
from watchdog.observers import Observer
from watchdog.events import PatternMatchingEventHandler
import time
from random import randrange

def image_downloader(url, folder):
    """This function downloads the image on the inputted url to a specified folder and returns the file's name or invalid
    if it was not possible. This function takes two parameters. It takes a url in a string format and a folder name."""

    # Need to store directory's location for when it changes due to the creation of a new folder.

    current_dir = os.getcwd()

    # creates a new folder for the images

    try:
        os.mkdir(os.path.join(os.getcwd(), folder))
    except:
        pass

    os.chdir(os.path.join(os.getcwd(), folder))
    request = requests.get(url)
    soup = BeautifulSoup(request.text, "html.parser")

    # This function will only takes images that have defined width and height attributes.

    images = soup.find_all("img", width=True, height=True)

    item = (randrange(10000))

    # The below loop goes through the images on the url (img tag) by their order of appearance and it will take the first
    # image that is more than 90 x 90. It will take the alternative name of the image as a name for the file. If the
    # alternative name has a .jpg or .png ending (like Wikipedia), it is removed. Image is saved as a .jpg in
    # specified folder.

    for element in images:
        link = element["src"]
        if int(element["width"]) > 90 and int(element["height"]) > 90 and (link[-3:] == "png" or link[-3:] == "jpg" or link[-3:] == "peg"):
            if link.startswith("//"):
                link = "http:" + link
            alt = element["alt"]
            if alt == "" or alt is None:
                alt = folder + str(item)
            if "png" in alt or "jpg" in alt:
                alt = alt[:-4]
            if "jpeg" in alt:
                alt = alt[:-5]
            with open(alt.replace(" ", "_").replace("/", "") + '.png', 'wb') as file:
                image_request = requests.get(link)
                file.write(image_request.content)
            alt = alt.replace(" ", "_").replace("/", "")
            file.close()
            os.chdir(current_dir)
            return alt

    # Changing pointer to stored directory.

    os.chdir(current_dir)
    invalid = "Invalid"
    return invalid

def on_modified(event):
    """This function is called whenever a modification is done on the specified image.txt file. It takes an event as its
      only parameter. It gets the last line in the image.txt file and checks if it is a url. If it is a url, this function
       will call the image_downloader function to save the image and get a file name. Lastly, it writes an error message
       in the image.txt file if there are any errors.Otherwise, it writes the file name to the same file.  """
    current_dir = os.getcwd()
    line = ""
    with open(os.path.join(os.getcwd(), "images.txt"), "r") as file2:
        for line in file2:
            pass
        url = line
    file2.close()
    if "http" in url:
        try:
            name = image_downloader(url,"images")
        except:
            os.chdir(current_dir)
            name = "ERROR Please enter a valid site. This request was not successful"
        if name == "Invalid":
            string_to_print = "ERROR: Please enter a valid site. This request was not successful"
            name = string_to_print
        with open("./images.txt", "a") as file3:
            file3.write("\n" + name)
        file3.close()

# Creating variables to store parameters for PatternMatchingEventHandler and calling it.

if __name__ =="__main__":
    patterns = ["*images.txt"]
    ignore_patterns = None
    ignore_directories = False
    case_sensitive = True
    my_event_handler = PatternMatchingEventHandler(patterns,ignore_patterns,ignore_directories,case_sensitive)


# Making sure that the on_modified function is called whenever there is a change to the image.txt file.

my_event_handler.on_modified = on_modified
path = "."
recursion = False
my_observer = Observer()
my_observer.schedule(my_event_handler, path, recursive = recursion)

# Below code is to run the function continuously until it is manually stopped.

my_observer.start()
try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    my_observer.stop()
    my_observer.join()