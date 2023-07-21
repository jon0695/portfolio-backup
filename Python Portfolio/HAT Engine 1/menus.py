import renderer
from game_window import *


def play_loop(current_page, page_master):
    """(obj Page, ref page_master)
    The 'Main' loop for when the game is running and the player hasen't died.
    I'm not sure if it's better to pass a reference to 'page_master' here
    or to import it. But I'm pretty sure I should avoid redundant imports."""
    game_over = False
    while not game_over:
        renderer.render_page(current_page, page_master)
        
        user_input = stdscr.getkey()

        try:
            user_input = int(user_input)
        except ValueError:
            return user_input

        # In theory, all numbers below the len(array) are valid
        if len(current_page.connected_pages) >= user_input > 0:
            next_page_num = current_page.connected_pages[user_input - 1]
            current_page.exited()
            current_page = page_master.book[next_page_num]
            current_page.entered()
        else:
            renderer.render_screen("\nPlease pick a valid Option")
            stdscr.getkey()

        game_over = current_page.game_over

    # For game_over render
    renderer.render_page(current_page, page_master)
    stdscr.getkey()  
    return current_page


def death_loop(message):
    """The death screen gets its own function. It seems like a better solution than trying to force a page object to
    emulate this behaviour."""
    while True:
        renderer.render_screen("\n" + message + "\nWould you like to start again? (Y,N)")
        retry = stdscr.getkey().lower()
        if retry == "y":
            renderer.render_screen("\nYou feel yourself being pulled back.")
            stdscr.getkey()
            return True
        elif retry == "n":
            return False
        else:
            renderer.render_screen("\nI'm not sure what you meant by that...")
            stdscr.getkey()

