from PIL import Image

im = Image.open('public/images/ww/logo_transparent.png')
bbox = im.getbbox()
cropped = im.crop(bbox)
w, h = cropped.size

# Extract horizontal spans
spans = []
for y in range(h):
    in_span = False
    start_x = 0
    for x in range(w):
        alpha = cropped.getpixel((x, y))[3]
        if alpha > 120 and not in_span:
            in_span = True
            start_x = x
        elif alpha <= 120 and in_span:
            in_span = False
            spans.append((start_x, y, x - start_x, 1))
    if in_span:
        spans.append((start_x, y, w - start_x, 1))

# Merge vertically adjacent spans with identical x and width
merged = []
spans_by_x_w = {}
for x, y, width, height in spans:
    key = (x, width)
    if key in spans_by_x_w and spans_by_x_w[key][-1][1] + spans_by_x_w[key][-1][3] == y:
        last = spans_by_x_w[key][-1]
        spans_by_x_w[key][-1] = (last[0], last[1], last[2], last[3] + 1)
    else:
        if key not in spans_by_x_w:
            spans_by_x_w[key] = []
        spans_by_x_w[key].append((x, y, width, height))

for key, span_list in spans_by_x_w.items():
    merged.extend(span_list)

print(f"Original spans: {len(spans)}, Merged rects: {len(merged)}")

# Generate SVG
rect_elements = '\n'.join([f'    <rect x="{x}" y="{y}" width="{width}" height="{height}" fill="currentColor" />' for x, y, width, height in merged])

svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" fill="none">
  <g fill="currentColor">
{rect_elements}
  </g>
</svg>'''

with open('public/images/ww/logo_ig_vector.svg', 'w') as f:
    f.write(svg_content)

print("Saved public/images/ww/logo_ig_vector.svg successfully!")
