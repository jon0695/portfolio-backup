from pages.page import Page


class Page2(Page):
    
    def __init__(self):
        super().__init__(g_connected_pages, g_text_content, "Start The Game")

    def exited(self):
        super().exited()
        self.choice_text = "Look Deeper"


g_text_content = """
Suddenly you find yourself in black void. You can feel the dark surrounding you. As you glance around,
you can make out a speck of light in the distance.

You hear something echoing out there..."""

g_connected_pages = [2, 3, 4]
