from pages.page import Page


class Page6(Page):
    
    def __init__(self):
        super().__init__(g_connected_pages, g_text_content, "Panic", "Your Heart Stopped From Sheer Terror.")


g_text_content = """
You Panic...!!!"""

g_connected_pages = []