from pages.page import Page


class Page_Num(Page):

    def __init__(self):
        super().__init__(g_connected_pages, g_text_content, "", "Game Over")

    def exited(self):
        super().exited()

    def entered(self):
        super().entered()


g_text_content = """
Temporary text!Temporary text!Temporary text!Temporary text!Temporary text!
Temporary text!Temporary text!Temporary text!Temporary text!Temporary text!
Temporary text!Temporary text!Temporary text!Temporary text!Temporary text!"""

g_connected_pages = []