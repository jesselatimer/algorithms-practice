# This was my initial response, but it fails to account for a few cases: when the number of atoms in the molecule is more than one digit, when a molecule ends on a end-paren, etc.
# It also doesn't have any validation, and assumes that the input is correctly syntaxed.


from collections import defaultdict

def parse_molecule(molecule, idx=0):
  output = defaultdict(int)
  current_el = ''
  sub_output = None

  while idx < len(molecule):
    char = molecule[idx]
    molecule

    if char in ['[', '(', '{']:
      if current_el:
        output[current_el] += 1
        current_el = ''
      sub_output, idx = parse_molecule(molecule, idx=idx + 1)
      
    elif char in [']', ')', '}']:
      if current_el:
        output[current_el] += 1
      return output, idx

    elif sub_output:
      for key, val in sub_output.iteritems():
        mult = int(char) if char.isdigit() else 1
        output[key] += (val * mult)
      sub_output = None
    
    elif char.isdigit():
      if current_el:
        output[current_el] += int(char)
        current_el = ''

    elif char.isupper():
      if current_el:
        output[current_el] += 1
      current_el = char

    elif char.islower():
      if current_el:
        current_el += char
        
    idx += 1

  
  if current_el:
    output[current_el] += 1 
  
  return output
   

print parse_molecule('H2O')  # {H: 2, O: 1}
print parse_molecule('Mg(OH)2')  # {Mg: 1, O: 2, H: 2}
print parse_molecule('K4[ON(SO3)2]2')  # {K: 4, O: 14, N: 2, S: 4}
