# Given an input of a matrix and two points in the matrix (upper left and lower
# right), return the sum of everything in that square.

# If the matrix is read-heavy (didn't change often), then it makes sense to
# memoize the matrix and get some number of O(1) sum lookups. A new class would
# have to be instantiated every time the matrix changed.

class RectangleSummer
  def initialize(matrix)
    @sum_matrix = memoize_sum(matrix)
  end

  def sum(x, y)
    @sum_matrix[x][y]
  end

  def rect_sum(upper_left, lower_right)
    x, y = upper_left
    i, j = lower_right
    sum = @sum_matrix[i + 1, j + 1]
    sum -= @sum_matrix[x + 1, i + 1]
    sum -= @sum_matrix[i + 1, x]
    sum += @sum_matrix[x, y]
  end

  private

  def memoize_sum(matrix)
    # Add a buffer to the top and left because we check those squares to find
    # the sum, so we don't have to specially check for the first row/column.
    sum_matrix = Array.new(matrix.length + 1) { Array.new(matrix.length + 1) {0} }
    matrix.each_with_index do |row, i|
      row.each_with_index do |el, j|
        sum_matrix[i + 1][j + 1] = (sum_matrix[i + 1][j] +
          sum_matrix[i][j + 1] + el - sum_matrix[i][j])
      end
    end
    sum_matrix
  end
end
