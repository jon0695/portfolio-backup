class Page:
    """The Base Object used for every screen in the game. Call them 'rooms' or 'pages' or 'places'
    their purpose remains the same. If this program gets big enough I should rename them to be
    more generic like rooms though. 'pages' is a bit more specific to My particular application."""
    def __init__(self, c_pages, text_content, choice_text, message="REPLACE THIS YOU DINGUS"):
        self.connected_pages = c_pages
        self.text_content = text_content
        self.choice_text = choice_text
        self.message = message
        self.addendum = "\n-What will you do?-"
        self.walked = False
        self.game_over = False

        self.set_game_over()

    def set_game_over(self):
        if len(self.connected_pages) == 0:
            self.game_over = True
            return
        else:
            self.game_over = False
            return

    def get_text(self):
        return self.text_content

# At the moment I rely on the 'play_loop' to exicute this. I should figure out how hooks are supposed to work...
# -pn It might be better to use a 'list' to track who is in the room and call a function when they are added or removed
# SO the player object would call 'enter()' on the room and pass themself in the method, then call 'exit()' to leave.
# 'exited()' and 'entered()' would never be called from outside
    def exited(self):
        self.walked = True

    def entered(self):
        pass


