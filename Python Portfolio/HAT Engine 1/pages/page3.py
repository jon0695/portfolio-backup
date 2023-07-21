from pages.page import Page


class Page3(Page):
    
    def __init__(self):
        super().__init__(g_connected_pages, g_text_content, "Walk Towards The Light")


g_text_content = """
As you walk, you heard the echoing fade into the background as it's replaced with an electronic humming ahead of you. 
From the light speck, a metalic door slowly materializes into view, with walls of rough limestone slabs around it that
seem to make up the room, and lead out into the darkness.

There's a console, inset beside the door"""

g_connected_pages = [8, 4]
