from .A1 import *
from .A2 import *
from .B1 import *
from .B2 import *
from .C1 import *


def getCERF(word):
    if word in A1:
        return 'A1'
    elif word in A2:
        return 'A2'
    elif word in B1:
        return 'B1'
    elif word in B2:
        return 'B2'
    elif word in C1:
        return 'C1'
    else:
        return 'OL'
