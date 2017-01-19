require 'set'
def four_sum(arr, target)
  results = {}
  # Key is count of how many integers have been summed.
  # Val is a set of remainders at that count.
  3.times { |i| results[i+1] = Set.new }

  arr.each do |n|
    # If the remainder exists at count 3, adding one more number is our result.
    return true if results[3].include?(n)

    # If not, add the new remainder for each element in counts 1 and 2 at one higher.
    (1..2).each do |i|
      results_dup = results[i].dup
      results_dup.each do |m|
        results[i + 1].add(m - n)
      end
    end
    # Make sure you add the element to our count 1!
    results[1].add(target - n)
  end

  false
end
