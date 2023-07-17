import os, sys, time
from io import TextIOBase, StringIO


"""This file is meant to hold the functions for rendering text to the screen."""
def render_page(page, page_master):
    """(obj Page, ref page_master)
    Specialized rendering function. Expedites of 'Page' objects."""
    render_queue = page.get_text() + "\n\n"
    length = len(page.connected_pages)
    
    if length != 0:
        render_queue += "You Can | \n"
        i = 0
        for page_num in page.connected_pages:
            i += 1
            render_queue += str(i) + " : " + page_master.book[page_num].choice_text + "\n"
        render_queue += page.addendum  # Having the page define the addendum gives me more options for contextual output.

    render_screen(render_queue)


#TODO I NEED a way to prevent the user from entering characters while the screen is busy drawing. 
# It seems like this might be a limit with the standard terminal application. I might need to build my
# own detecated window to control this, which would make this an independant app. It's funny because
# if i'm building my own window to run the game that starts raising other questions, like,
#'Why is this program text only?' since it would be way more intuitive to have a full
#GUI.
def render_screen(render_queue:str, speed=0.01, clear=True):
    """(str, *float, *boolean)
    The Heart of the renderer. Lets you set the speed of each letter being printed, and if the screen should be cleared before rendering."""
    if clear: cls()  # Check if I should clear the screen for this call. Mainly for special cases.
    i = 0
    for letter in render_queue:
        i+=1  # I have no reason for this yet. But tracking things is usually helpful?
        time.sleep(speed)
        sys.stdout.write(letter)  # Found the way to write directly to the screen instead of using 'print()'. This gives me options.
        sys.stdout.flush()  # NEED to call this or else it STILL prints the entire line at once...
          


def cls():  # I can't check if this works on MAC, but I've been told it does.
    if os.name == "nt":
        os.system("cls")
    else:
        os.system("clear")