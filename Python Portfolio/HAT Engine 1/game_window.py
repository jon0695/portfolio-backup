import curses

max_width = 75

screen = curses.initscr()
curses.cbreak()
curses.noecho()
stdscr = screen.subpad(0,max_width,0,0)
# Pads are like windows but scrollable. So in theory setting the height to 0 shouldn't matter. It should add new lines after hitting the max width.

if curses.can_change_color():
    pass


def d_echo():
    curses.noecho()

def e_echo():
    curses.echo()