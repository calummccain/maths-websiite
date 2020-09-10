import numpy as np


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


n = 30


def xyz(max):
    l = []
    for x in range(0, max):
        for y in range(-max, max):
            for z in range(-max, max):
                a = x + y - z
                if a >= 0:
                    if a * (a + 8) - 3 * (x ** 2 + y ** 2 + z ** 2) == 0:
                        b = [a + 4, x, y, z]
                        b.sort(reverse=True)
                        print(b)


v = np.asarray([[2*np.sqrt(6)], [2 * np.sqrt(6)/3], [0], [0]])
w = np.asarray([[2*np.sqrt(6)], [0], [2 * np.sqrt(6)/3], [0]])
x = np.asarray([[2*np.sqrt(6)], [0], [0], [2 * np.sqrt(6)/3]])

a = np.asarray([
    [1, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 1]
])

b = np.asarray([
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 1],
    [0, 0, 1, 0]
])

d = 0.25 * np.asarray([
    [5, -3, -3, 3],
    [1, 1, -3, 3],
    [1, -3, 1, 3],
    [-1, 3, 3, 1]
])

e = np.asarray([
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
])

matrices = [a, b, a.dot(b), b.dot(a), a.dot(b.dot(a))]
mat_letters = ['a', 'b', 'ab', 'ba', 'aba']
# print(matrices)

# print(d.dot(v))

def ring(r):

    rings = [[v, w, x]]
    centers = [v, w, x]
    names = [['', 'a', 'ba']]
    faces = ['', 'a', 'ba']
    i = 0

    while i < r:

        new_ring = []
        new_name = []

        # reflect previoius layer in d
        for j in range(len(rings[i])):

            if not any((np.linalg.norm(d.dot(rings[i][j]) - x) < 0.001) for x in centers):

                centers.append(d.dot(rings[i][j]))
                new_ring.append(d.dot(rings[i][j]))
                faces.append('d' + names[i][j])
                new_name.append('d' + names[i][j])

        # rotate new_ring
        for j in range(len(new_ring)):

            for k in range(5):

                test_center = matrices[k].dot(new_ring[j])
                # print(test_center)

                if not any((np.linalg.norm(test_center - x) < 0.001) for x in centers):

                    centers.append(test_center)
                    new_ring.append(test_center)
                    new_name.append(mat_letters[k] + new_name[j])
                    faces.append(mat_letters[k] + new_name[j])

        rings.append(new_ring)
        names.append(new_name)

        i += 1

    return faces


print(ring(15), len(ring(15)))

# xyz(n)

# xy = xy_bit(n)
# w = w_bit(n)

# for i in w:
#     if i in xy:
#         a1 = w.index(i) + 4
#         l = [j for j, var in enumerate(xy) if var == i]
#         for a in l:
#             a2 = a // n
#             a3 = a % n
#             print([a1, a2, a3, -a2])
#             if a2 != 0:
#                 print([a1, -a2, a3, a2])
#             if a3 != 0:
#                 print([a1, a2, -a3, -a2])
#             if a2 != 0 and a3 != 0:
#                 print([a1, -a2, -a3, a2])
