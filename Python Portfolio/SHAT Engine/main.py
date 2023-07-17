from pages import page_master
from menus import *

"""The Heart of the entire program!!! The irony here is that it's
very probable this 'loop' will only exicute once."""
def main_loop():
    current_page = page_master.book[0]
    while True:
        flag = play_loop(current_page, page_master)

        if isinstance(flag, str):
            print("Quitter")
            break

        if death_loop(flag.message):
            page_master.reinit()
            current_page = page_master.book[1]
            continue
        else:
            break

"""Final thoughts JD 7-17-2023 -- If someone wanted to add functionality to track character stats to this program it would be very easy.
Actually sitting down and building a game using this engine would be relativly simple if it's limits were understood. But it would
probably be a boring game because of those limits. The most difficult part would likely be keeping track of all the pages and how
they relate to eachother without ruining every other page. Every new page would need to be added to the end to avoid changing the indexes
as right now they are tightly bound to the engine's core functions. In theory it would be better if the page_master held a 'map' of the whole thing and
gave out the indexes as it instanced the pages, which would likely be done using page ids which i haven't added. This would also add considerable
overhead when starting the game. Writing a terminal game in python doesn't really make much sense when all of the most interesting things
you could do with the concept would require it's own curated window. To make it more interesting than a learning project I mean. I really REALLY
wanted to use keyboard interupts to make the program more reactive,(like knowing when the player is getting tired of waiting for the screen to draw)
but doing this without importing non-standard libraries would go WAY beyond what I'm trying to do. Pygame does look neat though."""

main_loop()
