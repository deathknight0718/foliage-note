def extract_value:
  if type == "object" and .t == "MetaInlines" then
    .c | map(
      if .t == "Str" then .c
      elif .t == "Space" then " "
      else ""
      end
    ) | add
  elif type == "object" and .t == "MetaList" then
    .c | map(extract_value)
  else
    .
  end;

.meta | {
  title: (.title | extract_value),
  author: (.author | extract_value),
  date: (.date | extract_value),
  tags: (.tags | extract_value),
  categories: (.categories | extract_value)
}