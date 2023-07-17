from pages.page import Page


class Page4(Page):
    
    def __init__(self):
        super().__init__(g_connected_pages, g_text_content, "Walk Into The Void", "You Have Perished.")


g_text_content = """
As you venture forth into the Void with boundless determination you feel your foot brush against something.
But before you've even really noticed this, BOOM!"""

g_connected_pages = []
