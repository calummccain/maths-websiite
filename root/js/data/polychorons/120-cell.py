import numpy as np

cycles = [[1, 2, 3, 4], [2, 3, 4, 1], [3, 4, 1, 2], [4, 1, 2, 3]]
evenperm = [[1, 2, 3, 4], [1, 3, 4, 2], [1, 4, 2, 3],
            [2, 1, 4, 3], [2, 3, 1, 4], [2, 4, 3, 1],
            [3, 1, 2, 4], [3, 2, 4, 1], [3, 4, 1, 2],
            [4, 1, 3, 2], [4, 2, 1, 3], [4, 3, 2, 1]]

seed1 = ['1 / 2', '1 / 2', '1 / 2', '1 / 2']
seed2 = ['0', '0', '0', '1']
seed3 = ['0', '0', '0', '-1']
seed4 = ['1 / 2', 'p / 2', '1 / (2 * p)', '0']

f = open("/Users/calummccain/Documents/maths-website/maths-websiite/root/js/data/polychorons/120-cell.txt", "a")

n = 0

for i in range(16):
    vert = '"' + (3 - len(str(n)))*'0' + str(n) +  '"'
    x = (4 - len(bin(i)[2:]))*'0' + bin(i)[2:]
    vert += ': ['
    for j in range(4):
        if x[j] == '0':
            vert += seed1[j]
        else:
            vert += '-' + seed1[j]
        if j != 3:
            vert += ', '
    vert += '],\n'
    f.write(vert)
    n += 1

for perm in cycles:
    f.write('"' + (3 - len(str(n)))*'0' + str(n) + '": [' +
            seed2[perm[0] - 1] + ', ' + seed2[perm[1] - 1] + ', ' +
            seed2[perm[2] - 1] + ', ' + seed2[perm[3] - 1] + '],\n')
    n += 1
    f.write('"' + (3 - len(str(n)))*'0' + str(n) + '": [' +
            seed3[perm[0] - 1] + ', ' + seed3[perm[1] - 1] + ', ' +
            seed3[perm[2] - 1] + ', ' + seed3[perm[3] - 1] + '],\n')
    n += 1

for i in range(8):
    x = (3 - len(bin(i)[2:]))*'0' + bin(i)[2:]
    seed33 = []
    for j in range(3):
        if x[j] == '0':
            seed33.append(seed4[j])
        else:
            seed33.append('-' + seed4[j])
    seed33.append('0')
    for perm in evenperm:
        vert = '"' + ((3 - len(str(n)))*'0' + str(n) + '": [' + seed33[perm[0] - 1] + ', ' +
                seed33[perm[1] - 1] + ', ' + seed33[perm[2] - 1] + ', ' + seed33[perm[3] - 1] + '],\n')
        f.write(vert)
        n += 1

# lines_600 = []

# """
# for x in range(120):
#     for y in range(x + 1, 120):
#         dist = np.subtract(points_600[x], points_600[y])
#         if abs(np.linalg.norm(dist) - 1/p) < 0.0001:
#             lines_600.append([x, y])
# """

f.write('\n\n\n')

seed5 = ['0', '0', '2', '2']
seed6 = ['1', '1', '1', '(2 * p - 1)']
seed7 = ['p', 'p', 'p', '1 / (p ** 2)']
seed8 = ['1 / p', '1 / p', '1 / p', '(p ** 2)']

seed9 = ['0', '1 / (p ** 2)', '1', '(p ** 2)']
seed10 = ['0', '1 / p', 'p', '(2 * p - 1)']
seed11 = ['1 / p', '1', 'p', '2']

f.write('"000": [0, 0, 2, 2],\n')
f.write('"001": [0, 0, 2, -2],\n')
f.write('"002": [0, 0, -2, 2],\n')
f.write('"003": [0, 0, -2, -2],\n')
f.write('"004": [0, 2, 0, 2],\n')
f.write('"005": [0, 2, 0, -2],\n')
f.write('"006": [0, -2, 0, 2],\n')
f.write('"007": [0, -2, 0, -2],\n')
f.write('"008": [2, 0, 2, 0],\n')
f.write('"009": [2, 0, -2, 0],\n')
f.write('"010": [-2, 0, 2, 0],\n')
f.write('"011": [-2, 0, -2, 0],\n')
f.write('"012": [2, 0, 0, 2],\n')
f.write('"013": [2, 0, 0, -2],\n')
f.write('"014": [-2, 0, 0, 2],\n')
f.write('"015": [-2, 0, 0, -2],\n')
f.write('"016": [0, 2, 2, 0],\n')
f.write('"017": [0, 2, -2, 0],\n')
f.write('"018": [0, -2, 2, 0],\n')
f.write('"019": [0, -2, -2, 0],\n')
f.write('"020": [2, 2, 0, 0],\n')
f.write('"021": [2, -2, 0, 0],\n')
f.write('"022": [-2, 2, 0, 0],\n')
f.write('"023": [-2, -2, 0, 0],\n')

m = 24

for x in [seed6, seed7, seed8]:
    for perm in cycles:
        w = [x[perm[0] - 1], x[perm[1] - 1], x[perm[2] - 1], x[perm[3] - 1]]
        for i in range(16):
            y = (4 - len(bin(i)[2:]))*'0' + bin(i)[2:]
            vert = '"' + (3 - len(str(m)))*'0' + str(m) +  '"' + ': ['
            for j in range(4):
                if y[j] == '0':
                    vert += w[j]
                else:
                    vert += '-' + w[j]
                if j != 3:
                    vert += ', '
            vert += '],\n'
            f.write(vert)
            m += 1

for y in [seed9, seed10]:
    for i in range(8):
        x = (3 - len(bin(i)[2:]))*'0' + bin(i)[2:]
        v = ['0']
        for j in range(3):
            if x[j] == '0':
                v.append(y[j + 1])
            else:
                v.append('-' + y[j + 1])
        for perm in evenperm:
            vert = '"' + ((3 - len(str(m)))*'0' + str(m) + '": [' + v[perm[0] - 1] + ', ' +
                    v[perm[1] - 1] + ', ' + v[perm[2] - 1] + ', ' + v[perm[3] - 1] + '],\n')
            f.write(vert)
            m += 1

for y in [seed11]:
    for i in range(16):
        x = (4 - len(bin(i)[2:]))*'0' + bin(i)[2:]
        v = []
        for j in range(4):
            if x[j] == '0':
                v.append(y[j])
            else:
                v.append('-' + y[j])
        for perm in evenperm:
            vert = '"' + ((3 - len(str(m)))*'0' + str(m) + '": [' + v[perm[0] - 1] + ', ' +
                    v[perm[1] - 1] + ', ' + v[perm[2] - 1] + ', ' + v[perm[3] - 1] + '],\n')
            f.write(vert)
            m += 1
# """
# lines_120 = []

# for x in range(600):
#     for y in range(x + 1, 600):
#         dist = np.subtract(points_120[x], points_120[y])
#         if abs(np.linalg.norm(dist) - 2/(p**2)) < 0.0001:
#             lines_120.append([x, y])

# def dodecahedron_points(centre):

#     dodeca = []
#     for x in range(600):
#         dist = np.subtract(points_120[x], (p**2)*points_600[centre])
#         if abs(np.linalg.norm(dist) - np.sqrt(3)/p) < 0.0001:
#             dodeca.append(x)

#     return dodeca

# def dodecahedron_lines(centre):

#     dodeca_lines = []
#     for x in range(20):
#         for y in range(x + 1, 20):
#             dist = np.subtract(points_120[dodecahedron_points(centre)[x]],
#                                points_120[dodecahedron_points(centre)[y]])
#             if abs(np.linalg.norm(dist) - 2/(p**2)) < 0.0001:
#                 dodeca_lines.append([dodecahedron_points(centre)[x],
#                                      dodecahedron_points(centre)[y]])

#     return dodeca_lines

# def dodecahedron_points_gen(centre):

#     dodeca = []
#     for x in range(600):
#         dist = np.subtract(points_120[x], (p**2)*centre)
#         if abs(np.linalg.norm(dist) - np.sqrt(3)/p) < 0.0001:
#             dodeca.append(x)

#     return dodeca

# def dodecahedron_lines_gen(centre):

#     dodeca_lines = []
#     for x in range(20):
#         for y in range(x + 1, 20):
#             dist = np.subtract(points_120[dodecahedron_points_gen(centre)[x]],
#                                points_120[dodecahedron_points_gen(centre)[y]])
#             if abs(np.linalg.norm(dist) - 2/(p**2)) < 0.0001:
#                 dodeca_lines.append([dodecahedron_points_gen(centre)[x],
#                                      dodecahedron_points_gen(centre)[y]])

#     return dodeca_lines
# """
