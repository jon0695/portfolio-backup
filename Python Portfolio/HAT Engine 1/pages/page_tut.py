from pages.page import Page  # Every Page needs to import the base page

"""This is a copy of Page2, which I will use to illustrate how to build new pages, as well as explain how this engine
works."""


# Every Page needs a distinct name, the number here might not be the literal page number.
class Page2(Page):
    """Template used to learn page building. Has MANY comments"""
    """ You can use your own naming convention, as long as you remember what index the page is stored at in
    'page_master.book' """

    def __init__(self):
        super().__init__(g_connected_pages, g_text_content, "Start The Game")

        """Every page NEEDS 3 things. 
        
        1.The list of connected pages indexes, 
        2.The main dialog that the game will display during rendering,(which is shown when this page is loaded)
        3.And the text that will summarize this decision (which is shown on adjacent pages).
        
        (*optional)4.Game Over dialog(win or lose)
        *required if the player can game over on a given page.
        """

    def exited(self):
        super().exited()
        self.choice_text = "Look Deeper"
        """This is an example of how we can use the exited() method to change a page in response to
        the player's movements. If the player returns here, the 'Start The Game' text will have
        been changed. 
        
        This is done by overriding the method declared in the 'page.py' file, which
        runs just after the player leaves a page. We then run the 'page' version while adding our
        own code. It's important to continue using the original method in addition to our own to 
        maintain expected functionality elsewhere in the engine."""

        """Other methods can be overriden as well, as long as the first line is 'super().method_name()"""


"""Defining these attributes at the bottom of the page, generally, makes the page easier to read."""
g_text_content = """
Suddenly you find yourself in black void. You can feel the dark surrounding you. As you glance around,
you can make out a speck of light in the distance.

You hear something echoing out there..."""

g_connected_pages = [2, 3, 4]
"""If this list is empty, the game is over, and the """

"""Every page you create needs to be added into the page_master.book list in order to use it."""
