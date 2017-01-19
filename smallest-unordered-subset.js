// Given an array as input, return the length of the smallest contiguous subset
// that you would need to sort in order to end up with a sorted array.
// Example `lengthOfSmallestUnorderedSubset([1, 2, 5, 4, 6])` should return 2,
// because it needs to reorder the subset [5, 4].

// Naive solution in O(n log n) time and O(n) space if you sort a duplicated
// array and compare each array at each index.

// The below solution is O(n) time and O(1) space, was my first attempt.

const lengthOfSmallestUnorderedSubset = (array) => {
  let startIdx, endIdx;
  let max = array[0];
  array.forEach((current, i) => {
    // If current element is larger than next element, we know it's unordered.
    let next = array[i + 1];
    if (current > next) {
      if (!startIdx) { startIdx = i; }
      for(let j = startIdx; j >= 0; j--) {
        if (array[j] > next) {
          startIdx = j;
        } else {
          break;
        }
      }
    }
    // If current element is smaller than max, we know it's unordered.
    if (current > max) {
      max = current;
    } else if (current < max) {
      endIdx = i;
    }
  });

  if (!startIdx || !endIdx) { return 0; }
  return (endIdx + 1) - startIdx;
};


// Another, shorter way to do it below. Only iterates through the array one
// time.

const lengthOfSmallestUnorderedSubset2 = (array) => {
  let startIdx, endIdx;
  let max = array[0];
  let min = array[array.length -1];
  // We'll use a single for-loop to move both left-to-right and right-to-left.
  for (let i = 0; i < array.length; i++) {
    // `i` is trying to find the last spot in the array that is unordered.
    if (array[i] > max) {
      max = array[i];
    } else if (array[i] < max) {
      endIdx = i;
    }

    // `j` is trying to grab the first spot in the array that is unordered.
    let j = array.length - i - 1;
    if (array[j] < min) {
      min = array[j];
    } else if (array[j] > min) {
      startIdx = j;
    }
  }

  if (!startIdx || !endIdx) { return 0; }
  return (endIdx + 1) - startIdx;
};
