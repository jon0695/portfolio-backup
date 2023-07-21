import os, sys, time, curses
from io import TextIOBase, StringIO
from game_window import *


"""This file is meant to hold the functions for rendering text to the screen."""
def render_page(page, page_master):
    """(obj Page, ref page_master)
    Specialized rendering function. Expedites rendering of 'Page' objects by building
    a large string from relivent data."""
    dialog_queue = page.get_text() + "\n\n"
    length = len(page.connected_pages)
    
    choices_queue = ""
    if length != 0:
        choices_queue += "You Can | \n"
        i = 0
        for page_num in page.connected_pages:
            i += 1
            choices_queue += str(i) + " : " + page_master.book[page_num].choice_text + "\n"
        choices_queue += page.addendum +"\n:"

    render_queue = [dialog_queue, choices_queue]

    #We'll see how long keeping this hardcoded makes sense.
    render_screen(render_queue[0])
    render_screen(render_queue[1],clear=False)


def render_screen(render_queue:str, speed=10, clear=True):
    """(str, *int(ms), *boolean)
    The Heart of the renderer. Lets you set the speed of each letter being printed, and if the screen should be cleared before rendering."""
    if clear: stdscr.clear()
    try:
        stdscr.nodelay(True)
        for index in range(len(render_queue)):
            letter = render_queue[index]
            stdscr.addstr(letter)
            if impatient():
                quick_render(render_queue,index)
                break
            stdscr.refresh()
            # I'm still not happy that i'm telling the entire program to stop and wait just to draw things a bit nicer
            # Since it prevents me from reading interupts for those few miliseconds.
            curses.napms(speed)
        stdscr.nodelay(False)
    except Exception as e:
        raise e


def quick_render(queue, index): 
    remaining_queue = queue[index+1:]
    stdscr.addstr(remaining_queue)


def wordwrap_needed():
    pass


def impatient():
    try:
        impatience = stdscr.getkey()  #getkey raises an error if there is no input, if 'nodelay' is set to True it will check for input the moment it is called.
        return True
    except:
        return False


def open_input(prompt=":"):
    return input(prompt)
