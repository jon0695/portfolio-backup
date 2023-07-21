
from pages.page1 import Page1  # Intro Screen
from pages.page2 import Page2  # Game Start
from pages.page3 import Page3  # Towards The Light
from pages.page4 import Page4  # Towards The Void
from pages.page5 import Page5  # Wait in the Void
from pages.page6 import Page6  # Panic in the Void
from pages.page7 import Page7  # Wait in the Void MORE
from pages.page8 import Page8  # Scream/death after Page5
from pages.page9 import Page9  # WIN (by walking forward)

book = [
    Page1(), Page2(), Page3(), Page4(), 
    Page5(), Page6(), Page7(), Page8(), 
    Page9()]


def reinit():
    for page in book:
        page.__init__()

