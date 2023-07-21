import renderer
from pages import page_master
from menus import *


def main_loop():
    """The Heart of the entire program"""
    current_page = page_master.book[0]
    while True:
        flag = play_loop(current_page, page_master)

        if isinstance(flag, str):
            renderer.render_screen("Quitter...",300)
            break

        if death_loop(flag.message):
            page_master.reinit()
            current_page = page_master.book[1]
            continue
        else:
            break


try:
    main_loop()
except Exception as e:
    curses.endwin()
    print("Raising an error")
    raise e
finally:
    curses.endwin()
