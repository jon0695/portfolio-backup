from pages.page import Page


class Page5(Page):
    
    def __init__(self):
        super().__init__(g_connected_pages, g_text_content, "Wait For A Bit")


g_text_content = """
You decide to wait around for a minute or two. Perhaps to regain your bearings. After what seems like only a moment, 
you notice you can't hear anything anymore. Waiting a bit longer, now you notice that the room has gotten rather cold
in the last minute or so. The light suddenly dims and disappears. Thinking about it though, has it really only been
a minute? It's getting harder to remember..."""

g_connected_pages = [5, 6, 7]
