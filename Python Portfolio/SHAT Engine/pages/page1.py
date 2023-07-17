from pages.page import Page


class Page1(Page):
    
    def __init__(self):
        self.connected_pages = [1]
        super().__init__(g_connected_pages, g_text_content, "")


g_text_content = """
Welcome to Jon's 'Choose-Your-Own-Adventure' Portfolio project!
Enter a number to pick from the list of options!
Any input that isn't a number will quit the game!"""

g_connected_pages = [1]
