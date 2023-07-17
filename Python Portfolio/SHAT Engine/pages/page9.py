from pages.page import Page


class Page9(Page):
    
    def __init__(self):
        super().__init__(g_connected_pages, g_text_content, "Interact With Console", "You've WON!")


g_text_content = """
You push a few random buttons on the console. Miraculously, something whirrs to life inside the wall and the door opens!
You walk through and win the game!"""

g_connected_pages = []
