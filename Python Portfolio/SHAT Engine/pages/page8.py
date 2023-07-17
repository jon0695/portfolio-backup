from pages.page import Page


class Page8(Page):
    def __init__(self):
        super().__init__(g_connected_pages, g_text_content, "Scream", "You Have Perished.")

    def exited(self):
        super().exited()
        self.text_content = g_text_content_2
        self.connected_pages = []
        self.set_game_over()


g_text_content = """
You let out the loudest scream you've ever known. (you surprise even yourself with the sheer terror in your voice)
When you do you notice an abrupt and panicked sounding shuffle from behind you! You turn around and peer into the
seemingly endless darkness!"""

g_text_content_2 = """
Feeling a sense of deja vu, you take a deep breath, and are about to scream at the top of your lungs.
Just then, you feel something cold cover your mouth, and a blade emerges from your upper torso."""

g_connected_pages = [1]
