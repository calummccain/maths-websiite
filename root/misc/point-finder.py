
def w_bit(max):
    x = []
    for i in range(4, max):
        x += [i ** 2 - 16]
    return x


def xy_bit(max):
    x = []
    for i in range(0, max):
        for j in range(0, max):
            x += [6 * i ** 2 + 3 * j ** 2]
    return x


n = 1000

xy = xy_bit(n)
w = w_bit(n)

for i in w:
    if i in xy:
        a1 = w.index(i) + 4
        l = [j for j, var in enumerate(xy) if var == i]
        for a in l:
            a2 = a // n
            a3 = a % n
            print([a1, a2, a3, -a2])
            if a2 != 0:
                print([a1, -a2, a3, a2])
            if a3 != 0:
                print([a1, a2, -a3, -a2])
            if a2 != 0 and a3 != 0:
                print([a1, -a2, -a3, a2])
